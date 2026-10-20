import assert from "node:assert/strict"
import test from "node:test"
import {
  getRecommendedRoles,
  getRoleDetails,
  getRoleReference,
  type RecruitmentRole,
} from "./recruitmentRoleDetails"

const role = (overrides: Partial<RecruitmentRole> = {}): RecruitmentRole => ({
  title: "Care Assistant",
  location: "Dublin",
  type: "Contract",
  sector: "Healthcare",
  salary: "€13.50–€15/hr",
  desc: "QQI Level 5 Care Skills required. Early, late, and weekend shifts available.",
  ...overrides,
})

test("Role references are stable against the original role collection", () => {
  const first = role()
  const second = role({ location: "Edinburgh" })
  const roles = [first, second]
  assert.equal(getRoleReference(first, roles), "MPR-0001")
  assert.equal(getRoleReference(second, roles), "MPR-0002")
  assert.equal(getRoleReference(role(), roles), "")
})

test("Recommendations exclude the current role, prioritise relevant matches and do not mutate the list", () => {
  const current = role()
  const differentSector = role({
    title: "Warehouse Operative",
    sector: "Logistics",
    location: "Dublin",
  })
  const differentRegion = role({ location: "Edinburgh", type: "Permanent" })
  const sameRegion = role({
    title: "Staff Nurse (General)",
    location: "Cork",
    type: "Permanent",
  })
  const roles = [current, differentSector, differentRegion, sameRegion]
  assert.deepEqual(getRecommendedRoles(current, roles), [
    sameRegion,
    differentRegion,
    differentSector,
  ])
  assert.deepEqual(roles, [
    current,
    differentSector,
    differentRegion,
    sameRegion,
  ])
  assert.equal(getRecommendedRoles(current, roles, 1).length, 1)
})

test("Irish care qualifications are not assigned to Scottish roles", () => {
  const irish = getRoleDetails(role())
  const scottish = getRoleDetails(
    role({
      location: "Edinburgh",
      desc: "Illustrative care role in Scotland.",
    }),
  )
  assert.equal(irish.region, "Ireland")
  assert.equal(scottish.region, "Scotland")
  assert(irish.qualifications.some((item) => item.includes("QQI")))
  assert(!scottish.qualifications.some((item) => item.includes("QQI")))
})

test("UK nations and Irish registration requirements are kept distinct", () => {
  const belfast = getRoleDetails(
    role({ title: "Staff Nurse", location: "Belfast" }),
  )
  const cork = getRoleDetails(
    role({ title: "Staff Nurse (General)", location: "Cork" }),
  )
  assert.equal(belfast.region, "Northern Ireland")
  assert(belfast.qualifications.some((item) => item.includes("NMC")))
  assert(cork.qualifications.some((item) => item.includes("NMBI")))
  assert.equal(
    getRoleDetails(role({ location: "Manchester" })).region,
    "England",
  )
  assert.equal(getRoleDetails(role({ location: "Cardiff" })).region, "Wales")
})

test("Contract terms use supplied details instead of inventing a duration", () => {
  assert.match(
    getRoleDetails(role({ desc: "6-month rolling contract with renewal." }))
      .duration,
    /6-month/,
  )
  assert.match(
    getRoleDetails(role({ type: "Permanent" })).duration,
    /Permanent/,
  )
  assert.match(
    getRoleDetails(role({ desc: "Contract role." })).duration,
    /to be confirmed/,
  )
})

test("The overview preserves the original brief and missing application details remain explicit", () => {
  const example = role()
  const details = getRoleDetails(example)
  assert.equal(details.overview[0], example.desc)
  assert(details.responsibilities.length > 0)
  assert(details.qualifications.length > 0)
  assert(
    details.applicationDetails.some(
      ([label, value]) =>
        label === "Closing date" && value.includes("Not supplied"),
    ),
  )
  assert(
    details.applicationDetails.some(
      ([label, value]) =>
        label === "Application process" && value.includes("not connected"),
    ),
  )
})
