import assert from "node:assert/strict"
import test from "node:test"
import { getPublicShiftDate, getShiftAreaMap } from "./locumShiftPresentation"

test("The reference shift is Monday 12 October 2026, not August", () => {
  const date = getPublicShiftDate("Mon 12 Oct")
  assert.equal(date.iso, "2026-10-12")
  assert.match(date.long, /Monday/)
  assert.match(date.long, /12 October 2026/)
  assert.equal(date.short, "12/10/2026")
})
test("Existing July and August shift dates remain sortable", () => {
  assert.equal(getPublicShiftDate("Mon 27 Jul").iso, "2026-07-27")
  assert.equal(getPublicShiftDate("Sat 01 Aug").iso, "2026-08-01")
  assert(
    getPublicShiftDate("Wed 05 Aug").iso < getPublicShiftDate("Mon 12 Oct").iso,
  )
})
test("Malformed dates do not crash the summary", () => {
  assert.equal(getPublicShiftDate("Mon xx Oct").iso, "")
  assert.equal(getPublicShiftDate("").iso, "")
})
test("Every published shift area has a general-area map", () => {
  for (const location of [
    "Dublin 2, IE",
    "Dublin 24, IE",
    "Cork City, IE",
    "Galway, IE",
    "Limerick, IE",
    "Waterford, IE",
    "London W1, UK",
    "London W2, UK",
    "Manchester, UK",
    "Birmingham, UK",
    "Belfast, NI",
    "Glasgow, UK",
    "Cardiff, UK",
    "Cumbria, UK",
  ]) {
    const map = getShiftAreaMap(location)
    assert(map, location)
    const embed = new URL(map.embed)
    assert.equal(embed.hostname, "www.openstreetmap.org")
    assert.equal(embed.searchParams.get("layer"), "mapnik")
    assert(
      !embed.searchParams.has("marker"),
      "No exact workplace marker is claimed",
    )
    assert(!embed.href.includes("rate"), "Pay is not included in map requests")
  }
})
test("District-specific maps and unknown-area fallback are handled", () => {
  assert.notEqual(
    getShiftAreaMap("London W1, UK")!.embed,
    getShiftAreaMap("London W2, UK")!.embed,
  )
  assert.notEqual(
    getShiftAreaMap("Dublin 2, IE")!.embed,
    getShiftAreaMap("Dublin 24, IE")!.embed,
  )
  assert.equal(getShiftAreaMap("Unknown workplace"), null)
})
