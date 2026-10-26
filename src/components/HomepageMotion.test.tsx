import assert from "node:assert/strict"
import test from "node:test"
import { m } from "motion/react"
import { renderToStaticMarkup } from "react-dom/server"
import { revealGroup, revealItem, RevealLines } from "./HomepageMotion"

const heading = ["Healthcare works better", "when we work together."]

function RevealSection({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <m.div {...revealGroup(reducedMotion)}>
      <m.p {...revealItem}>Meet MployUs</m.p>
      <h2>
        <RevealLines lines={heading} />
      </h2>
    </m.div>
  )
}

test("Homepage reveals start hidden until their section scrolls into view", () => {
  const markup = renderToStaticMarkup(<RevealSection reducedMotion={false} />)

  assert.match(markup, /<p[^>]*style="[^"]*opacity:0/)
  assert.equal(markup.match(/translateY\(115%\)/g)?.length, heading.length)
})

test("Reduced motion renders homepage reveals in their final state", () => {
  const markup = renderToStaticMarkup(<RevealSection reducedMotion />)

  assert.doesNotMatch(markup, /opacity:0|transform:/)
  assert.match(markup, /data-home-reveal=""/)
})

test("RevealLines keeps a split heading readable as one sentence", () => {
  const markup = renderToStaticMarkup(
    <h2>
      <RevealLines lines={heading} />
    </h2>,
  )

  assert.equal(markup.replace(/<[^>]+>/g, ""), "Healthcare works better when we work together.")
  assert.equal(markup.match(/class="homepage-line-mask"/g)?.length, heading.length)
})
