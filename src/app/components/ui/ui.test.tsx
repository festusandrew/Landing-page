import assert from "node:assert/strict"
import test from "node:test"
import { renderToStaticMarkup } from "react-dom/server"
import { Calendar } from "./calendar"
import { PaginationNext, PaginationPrevious } from "./pagination"

test("Calendar renders the supported DayPicker month and navigation API", () => {
  const markup = renderToStaticMarkup(
    <Calendar mode="single" month={new Date(2026, 6, 1)} selected={new Date(2026, 6, 27)} />,
  )

  assert.match(markup, /July 2026/)
  assert.match(markup, /aria-label="[^"]*previous[^"]*month/i)
  assert.match(markup, /aria-label="[^"]*next[^"]*month/i)
  assert.match(markup, /aria-selected="true"|data-selected="true"/)
})

test("Pagination controls default to the standard button size", () => {
  for (const control of [
    <PaginationPrevious key="previous" href="/page/1" />,
    <PaginationNext key="next" href="/page/3" />,
  ]) {
    const markup = renderToStaticMarkup(control)
    assert.match(markup, /class="[^"]*\bh-9\b/)
    assert.doesNotMatch(markup, /\ssize="/)
  }
})

test("Pagination respects an explicitly selected size and accessible label", () => {
  const markup = renderToStaticMarkup(
    <PaginationPrevious href="/page/1" size="sm" aria-label="Older results" />,
  )

  assert.match(markup, /class="[^"]*\bh-8\b/)
  assert.doesNotMatch(markup, /class="[^"]*\bh-9\b/)
  assert.match(markup, /aria-label="Older results"/)
})
