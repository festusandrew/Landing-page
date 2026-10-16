# Project guidelines

This is the MployUs React 19 + Vite + Tailwind CSS v4 frontend. Read
`README.md` for the project map, commands and integration status.

## Development workflow

- Use Node 22.12+ and pnpm 10.34.3.
- Figma Make supervises the development server. Do not start a second server.
- `src/main.tsx` loads the canonical routed app in `src/app/App.tsx`.
  `src/App.tsx` forwards its default export and preserves a named legacy app.
- New pages and shared modals should load on demand, following the existing
  React `lazy`/`Suspense` boundaries.
- Prefer existing typed UI primitives in `src/app/components/ui/`. The `@/`
  alias refers to the repository root; preserve existing marquee/UI imports.
- Keep changes scoped. Extract large page components incrementally rather
  than replacing designs or deleting legacy/reference work.
- Run `pnpm run check` for changes spanning application behaviour or tooling.
  It runs strict TypeScript, tests and the prescribed production build.
- Format selected changed files with `pnpm run format <paths>`. Do not bulk
  format frozen design assets or imported reference components.
- Fix type errors and missing dependencies instead of excluding valid source
  or weakening strict TypeScript settings.

## Visual contracts

- Preserve the approved Figma layouts and the shared navbar on product pages.
- General landing/Product Design use `#0E162A`; Locum/Web Development use
  `#368B62`; Recruitment uses `#810161`; Care Management software uses `#1D4ED8`.
- Avoid shadows. Use only necessary 1px borders at black 5% opacity.
- Reuse the documented font faces, including their composite family names.
- Keep SVG assets local and preserve their intrinsic dimensions. Do not use
  expiring Figma asset URLs at runtime.
- Retain hidden carousel scrollbars, chevron controls and keyboard support.
- Preserve modal focus trapping, Escape dismissal and focus restoration.

## Data and safety

- The frontend is not a connected production platform. Never claim that an
  enquiry was submitted, an account created, an email sent or a booking
  confirmed unless the relevant service actually succeeded.
- Do not keep passwords in browser storage, URLs or logs. Clear them when a
  flow closes or completes.
- Private service credentials must never be shipped in browser code or
  `VITE_*` variables.
- Entering a professional number is not verification or placement approval.
- Temporary Locum shifts and permanent Recruitment roles remain separate.
  Permanent briefs go to the Recruitment team, not the Locum shift form.
- Keep shift pay locked while signed out and maps limited to a general area.
- Read the registration/pay-access guidelines and retain their tests when
  changing country-, role- or region-specific behaviour.

<!--

System Guidelines

Use this file to provide the AI with rules and guidelines you want it to follow.
This template outlines a few examples of things you can add. You can add your own sections and format it to suit your needs

TIP: More context isn't always better. It can confuse the LLM. Try and add the most important rules you need

# General guidelines

Any general rules you want the AI to follow.
For example:

* Only use absolute positioning when necessary. Opt for responsive and well structured layouts that use flexbox and grid by default
* Refactor code as you go to keep code clean
* Keep file sizes small and put helper functions and components in their own files.

--------------

# Design system guidelines
Rules for how the AI should make generations look like your company's design system

Additionally, if you select a design system to use in the prompt box, you can reference
your design system's components, tokens, variables and components.
For example:

* Use a base font-size of 14px
* Date formats should always be in the format “Jun 10”
* The bottom toolbar should only ever have a maximum of 4 items
* Never use the floating action button with the bottom toolbar
* Chips should always come in sets of 3 or more
* Don't use a dropdown if there are 2 or fewer options

You can also create sub sections and add more specific details
For example:


## Button
The Button component is a fundamental interactive element in our design system, designed to trigger actions or navigate
users through the application. It provides visual feedback and clear affordances to enhance user experience.

### Usage
Buttons should be used for important actions that users need to take, such as form submissions, confirming choices,
or initiating processes. They communicate interactivity and should have clear, action-oriented labels.

### Variants
* Primary Button
  * Purpose : Used for the main action in a section or page
  * Visual Style : Bold, filled with the primary brand color
  * Usage : One primary button per section to guide users toward the most important action
* Secondary Button
  * Purpose : Used for alternative or supporting actions
  * Visual Style : Outlined with the primary color, transparent background
  * Usage : Can appear alongside a primary button for less important actions
* Tertiary Button
  * Purpose : Used for the least important actions
  * Visual Style : Text-only with no border, using primary color
  * Usage : For actions that should be available but not emphasized
-->
