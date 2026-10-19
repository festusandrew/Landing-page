# MployUs frontend

React 19, TypeScript, Vite and Tailwind CSS v4. This repository contains the
Ireland/UK marketing site and the Recruitment, Locum, software and studio
experiences built in Figma Make.

## Development

- Use Node **22.12 or newer**; `.mise.toml` selects Node 22.
- Use **pnpm 10.34.3**, pinned in `package.json` and `.mise.toml`.
- Install dependencies with `pnpm install --frozen-lockfile`.
- In Figma Make, the development server is already supervised. **Do not start a
  second server.** Edit source files and use the existing preview.
- Outside Make, `pnpm dev` starts Vite on `$PORT`, defaulting to `8443`.

No API keys or backend services are required to work on the frontend.

## Verification

```sh
pnpm run lint       # Strict TypeScript checking, including the UI library
pnpm run typecheck  # Explicit alias for the same TypeScript check
pnpm run test       # Node/tsx tests for registration, shifts, roles and UI adapters
pnpm run build      # Production Vite build using vite.figma.config.ts
pnpm run check      # lint + tests + build
```

`pnpm run test` discovers `.test.ts` and `.test.tsx` files recursively under
`src/` and `components/`, so tests can live beside pages, hooks and shared UI.
New tests should use the existing `node:test` and `node:assert/strict` pattern.
The current suite runs in Node; browser interaction tests need a separate
browser-capable harness.

For a focused test or watch loop:

```sh
pnpm exec tsx --test src/data/demoRequests.test.ts
pnpm exec tsx --test --watch src/data/demoRequests.test.ts
```

GitHub Actions runs `pnpm run check` on pushes and pull requests. This is a
quality-check workflow, not a deployment workflow.

Format intentionally selected files:

```sh
pnpm run format src/components/pages/YourPage.tsx
```

Oxfmt configuration lives in `.oxfmtrc.json`; generated assets and Figma
references are excluded by `.prettierignore`. Review formatting changes and
rerun `pnpm run check` before handing work over. Older reference and legacy files
have not been bulk-reformatted.

## Application map

| Location                  | Purpose                                                                                 |
| ------------------------- | --------------------------------------------------------------------------------------- |
| `src/main.tsx`            | Browser entry point and global stylesheet import                                        |
| `src/app/App.tsx`         | Canonical router, homepage and shared page/modal orchestration                          |
| `src/App.tsx`             | Compatibility default export; named `LegacyApp` preserves the historical implementation |
| `src/components/pages/`   | Locum, Recruitment, software, pricing and studio pages                                  |
| `src/components/modals/`  | Enquiry, demo, trial and related modal flows                                            |
| `src/app/components/ui/`  | Typed Radix/shadcn-style UI primitives for new frontend work                            |
| `components/ui/`          | Existing testimonial/marquee components and their UI dependencies                       |
| `src/data/`               | Static content, region-aware presentation/configuration and tests                       |
| `src/styles/`             | Tailwind, fonts, base theme and scoped brand overrides                                  |
| `src/imports/`, `public/` | Local design assets and frozen interface screenshots                                    |

The `@/` alias points to the **repository root**, not `src/`. Vite and TypeScript
use the same mapping. Keep existing import paths compatible when moving code.

Service pages, policy content and shared modals are loaded on demand through
React `lazy` and `Suspense`. New pages should follow this pattern instead of
being added to the initial bundle. Shared modals mount only when opened, so
their module context and transient form state start fresh for each request.

### Routes

- `/` — general landing page
- `/pricing`
- `/recruitment-software`
- `/care-management`
- `/recruitment-service`
- `/locum-provision`
- `/product-design`
- `/web-development`
- `/policies/:policy`

Recruitment and Locum have internal page states. Recruitment article and role
links also use their existing query parameters. Preserve these navigation
contracts, browser history and deep links when extracting smaller components.

## Design contracts

- Keep the current Figma-matched layouts and the shared main navbar on product pages.
- General landing/Product Design use navy `#0E162A`.
- Locum/Web Development use green `#368B62`; Recruitment uses magenta `#810161`.
- Care Management software uses blue `#1D4ED8`.
- Avoid shadows; use only necessary 1px borders at black 5% opacity.
- Reuse the existing font wiring in `src/styles/fonts.css` and
  `src/styles/recruitment-reference-fonts.css`. Some imported faces use
  composite family names, so replacing them with generic font classes can
  change the design.
- Keep portfolio carousels keyboard accessible, with hidden scrollbars and
  chevron controls. Preserve modal focus trapping, Escape dismissal and focus
  restoration.
- Use existing UI primitives before adding a new component library.

Calendar and chart wrappers target the installed DayPicker 9 and Recharts 3
APIs. Other major-version updates should include their adapters and tests,
not just a package-version change.

## Frontend state versus live services

This is **frontend-development ready**, not a connected production platform.
Forms and account flows currently keep transient React state. A completion
screen must not claim that a request was sent, a booking confirmed, a workspace
created or a professional verified when no corresponding service exists.

Before a public launch, connect and validate:

- Authentication, password recovery, OAuth, accounts and access permissions.
- Actual enquiries, applications, newsletter subscriptions, CV/media uploads,
  email/calendar delivery and booking persistence.
- Employer-approved jobs and shifts, real availability/pay and reviewed
  pricing, office details, testimonials and platform statistics.
- Regulator/compliance checks and reviewer-controlled approval. Entering a
  registration number is **not** verification.
- Consent/integration inventory, approved privacy/legal content and production
  deployment/SEO settings. Search indexing is currently disabled in the Make
  site configuration.

Never put private service credentials in browser code or `VITE_*` variables.
Integrations requiring secrets belong behind a server boundary.

### Locum and recruitment safeguards

- Temporary Locum shifts and permanent Recruitment roles remain separate.
  Permanent briefs go to the Recruitment team, not the shift-posting form.
- Shift pay stays locked while signed out; do not infer authorised pay access
  from a local registration form.
- Maps show a general area, not a verified workplace address.
- Country/profession-specific registration routes and alternative evidence
  paths must be retained.

Read `guidelines/LocumRegistrationRequirements.md` and
`guidelines/LocumShiftPayAccess.md` before changing these flows. Their data tests
are part of the standard check command.

## Manual smoke checks

After significant UI changes, check desktop and mobile layouts for all touched
routes, navbar/dropdown navigation, pricing/platform filters, portfolio
carousels and the full Back/Edit/Close modal journeys. Verify keyboard focus,
required fields, image loading and absence of horizontal overflow.

Bundle-size warnings are not suppressed. Before a production launch, review
the remaining entry-bundle warning and optimise the large reference imagery
against an agreed performance budget.

Large service-page modules and older marketing components can be extracted
incrementally as features evolve. Preserve the existing screenshots and
interactions rather than replacing them during unrelated refactors.
