import assert from "node:assert/strict"
import test from "node:test"
import { getModalTone } from "./modalTones"

test("Shared modals follow each page's brand colour", () => {
  for (const [view, tone] of [
    ["home", "navy"],
    ["pricing", "navy"],
    ["locum-provision", "green"],
    ["web-development", "green"],
    ["recruitment-service", "magenta"],
    ["care-management", "blue"],
    ["unknown", "navy"],
  ] as const) {
    assert.equal(getModalTone(view), tone)
  }
})
