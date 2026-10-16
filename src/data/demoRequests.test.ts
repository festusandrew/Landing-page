import assert from "node:assert/strict"
import test from "node:test"
import { DEMO_MODULES, getDemoModuleSelection } from "./demoRequests"

test("General demo requests select the complete module overview", () => {
  assert.deepEqual(
    getDemoModuleSelection("All Modules"),
    DEMO_MODULES.map((module) => module.id),
  )
})

test("Route identifiers and marketing labels select their intended module", () => {
  for (const [context, expected] of [
    ["recruitment-software", "recruitment"],
    ["Recruitment Software", "recruitment"],
    ["care-management", "care-management"],
    ["Care Management Software", "care-management"],
    ["locum-provision", "locums-staffing"],
    ["Locum Provision", "locums-staffing"],
    ["facility-management", "facility-management"],
    ["Facility Operations", "facility-management"],
  ]) {
    assert.deepEqual(getDemoModuleSelection(` ${context} `), [expected])
  }
})

test("Unrecognised enquiry contexts do not silently select an unrelated module", () => {
  for (const context of ["A case-study conversation", "__proto__", "constructor"]) {
    assert.deepEqual(
      getDemoModuleSelection(context),
      DEMO_MODULES.map((module) => module.id),
    )
  }
})

test("Every request receives its own module selection array", () => {
  const selection = getDemoModuleSelection("All Modules")
  selection.pop()
  assert.equal(getDemoModuleSelection("All Modules").length, DEMO_MODULES.length)
})
