# Locum shift summary and account-only pay

Public shift fixtures use `PublicLocumShift` from
`src/data/locumShiftPresentation.ts`. They intentionally have **no hourly rate,
gross-pay total or private pay metadata**. Employer-entered draft rates are
separate from the public browsing feed.

The browsing list, selected-shift summary and application preview display an
account-only pay message. Public pay sorting/filtering and pay-bearing email
sharing have been removed. Registration preview completion does not unlock pay.
Do not add a local-storage, query-parameter or client-only “signed in” flag to
pretend that access has been authorised.

## Production dependency

Authentication is still a frontend preview. Actual member pay access requires:

1. A genuine server-validated account/session.
2. A private pay endpoint that checks permission before returning shift rates.
3. Public listing endpoints that omit pay, with pay filtering/sorting restricted
   to the authorised server-side flow.
4. Appropriate cache, logging and transport controls.

Until these are connected, pay remains locked for everyone in this preview.
This UI is not a substitute for server-side authorisation.

## Reference content and maps

The Cumbria example follows the supplied screenshot: pharmacist, England,
Monday 12 October 2026, 08:00–18:00, Columbus and example availability. It is
labelled as a reference-based sample, not a verified third-party vacancy.
Competitor branding, contact numbers and company details are not substituted
for MployUs contact information.

The location panel embeds OpenStreetMap without an API key. Coordinates are
general area centres, including the Barrow-in-Furness area for the Cumbria
example. No exact employer address or workplace marker is claimed. Users
should confirm the address and arrival instructions before booking.

Focused checks:
`pnpm exec tsx --test src/data/locumShiftPresentation.test.ts`.
