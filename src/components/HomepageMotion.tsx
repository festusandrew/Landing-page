import { Fragment, useRef, type ReactNode, type RefObject } from "react"
import { m, useReducedMotion, useScroll, useTransform, type Variants } from "motion/react"

/** Shared easing for homepage motion: a quick start that settles softly. */
export const homepageEase = [0.22, 1, 0.36, 1] as const

/** Reveals play once, as an element's top edge passes ~88% of the viewport height. */
const revealViewport = { once: true, margin: "0px 0px -12% 0px" } as const

/** Marks reveal targets so print and focus styles can force them visible. */
const revealMarker = { "data-home-reveal": "" } as const

/** Unknown preferences (before hydration, or in tests) count as reduced motion. */
export function useHomepageReducedMotion() {
  return useReducedMotion() !== false
}

export const homepageHeroSequence: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.08 } },
}

export const homepageHeroItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: homepageEase },
  },
}

/**
 * Root props that start a reveal when the element scrolls into view. With reduced
 * motion the element and its children simply render in their final state.
 */
function revealRoot(reducedMotion: boolean, variants: Variants) {
  if (reducedMotion) return revealMarker
  return {
    ...revealMarker,
    variants,
    initial: "hidden",
    whileInView: "visible",
    viewport: revealViewport,
  } as const
}

/** Plays its motion children in reading order once the element scrolls into view. */
export function revealGroup(reducedMotion: boolean, { delay = 0, stagger = 0.1 } = {}) {
  return revealRoot(reducedMotion, {
    hidden: {},
    visible: { transition: { delayChildren: delay, staggerChildren: stagger } },
  })
}

/**
 * A card that rises into view after `delay`, then plays its children. Put hover
 * motion on a child element: on hover-out, a value animated here would replay the
 * reveal transition, including its delay.
 */
export function revealCard(reducedMotion: boolean, delay = 0) {
  return revealRoot(reducedMotion, {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.85, ease: homepageEase, delay, delayChildren: delay + 0.25 },
    },
  })
}

/** A photo frame that wipes open from its bottom edge, then settles its image and copy. */
export function revealImage(reducedMotion: boolean, delay = 0) {
  return revealRoot(reducedMotion, {
    hidden: { clipPath: "inset(100% 0% 0% 0%)" },
    visible: {
      clipPath: "inset(0% 0% 0% 0%)",
      // A lingering clip would also hide focus outlines drawn outside the frame.
      transitionEnd: { clipPath: "none" },
      transition: {
        duration: 1.2,
        ease: homepageEase,
        delay,
        delayChildren: delay,
        staggerChildren: 0.35,
      },
    },
  })
}

/** A child that rises into place when its reveal sequence reaches it. */
export const revealItem = {
  ...revealMarker,
  variants: {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: homepageEase } },
  } satisfies Variants,
}

/** A divider that draws itself from the left edge. */
export const revealDraw = {
  ...revealMarker,
  variants: {
    hidden: { scaleX: 0 },
    visible: { scaleX: 1, transition: { duration: 1.1, ease: homepageEase } },
  } satisfies Variants,
}

/** A small accent, such as an icon tile, that springs into place. */
export const revealPop = {
  ...revealMarker,
  variants: {
    hidden: { opacity: 0, scale: 0.6 },
    visible: { opacity: 1, scale: 1, transition: { type: "spring", duration: 0.7, bounce: 0.35 } },
  } satisfies Variants,
}

const lineRise: Variants = {
  hidden: { y: "115%" },
  visible: { y: "0%", transition: { duration: 0.95, ease: homepageEase } },
}

/**
 * Splits a heading into lines that each rise out of their own clipped row. Place it
 * inside a reveal sequence: every line takes the next step of the parent's stagger.
 */
export function RevealLines({ lines }: { lines: readonly ReactNode[] }) {
  return (
    <>
      {lines.map((line, index) => (
        <Fragment key={index}>
          {/* A real space keeps the heading's text readable as one sentence. */}
          {index > 0 && " "}
          <span className="homepage-line-mask">
            <m.span {...revealMarker} variants={lineRise}>
              {line}
            </m.span>
          </span>
        </Fragment>
      ))}
    </>
  )
}

const imageSettle: Variants = {
  hidden: { scale: 1.16 },
  visible: { scale: 1, transition: { duration: 1.6, ease: homepageEase } },
}

/**
 * Lets an image drift `distance` percent against the scroll while its frame crosses
 * the viewport, and settle from a slight zoom when a parent reveal plays. The frame
 * must clip its overflow.
 */
export function ParallaxLayer({
  children,
  className,
  distance = 4,
}: {
  children: ReactNode
  className?: string
  distance?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reducedMotion = useHomepageReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], [`${-distance}%`, `${distance}%`])

  if (reducedMotion) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    )
  }

  return (
    // Overscale by the drift on each edge, plus 1%, so the frame never shows a gap.
    <m.div ref={ref} className={className} style={{ y, scale: 1 + (distance * 2 + 1) / 100 }}>
      <m.div className="h-full w-full" variants={imageSettle}>
        {children}
      </m.div>
    </m.div>
  )
}

/**
 * Scroll-linked exit for the hero: its content drifts down and fades while the glow
 * blooms, so the sections below appear to slide over it.
 */
export function useHeroScrollAway(target: RefObject<HTMLElement | null>, reducedMotion: boolean) {
  const { scrollYProgress } = useScroll({ target, offset: ["start start", "end start"] })
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 120])
  const contentOpacity = useTransform(scrollYProgress, [0.1, 0.65], [1, 0])
  const glowScale = useTransform(scrollYProgress, [0, 1], [1, 1.15])

  if (reducedMotion) return { content: undefined, glow: undefined }
  return { content: { y: contentY, opacity: contentOpacity }, glow: { scale: glowScale } }
}
