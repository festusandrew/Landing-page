# Locum registration rules

The wizard is a **front-end registration preview**. Its configuration lives in
`src/data/locumRegistration.ts`; focused checks run with
`pnpm exec tsx --test src/data/locumRegistration.test.ts`.

## Jurisdiction and occupation

Collect the **country of practice**, not nationality: Republic of Ireland,
England, Scotland, Wales or Northern Ireland. Do not infer a UK nation from a
generic UK site preference.

| Occupation | Republic of Ireland | England / Scotland / Wales | Northern Ireland |
| --- | --- | --- | --- |
| Pharmacist | PSI | GPhC | PSNI |
| Doctor / GP | Medical Council of Ireland | GMC | GMC |
| Nurse / midwife | NMBI registration number / PIN | NMC PIN | NMC PIN |
| Optometrist | CORU | GOC | GOC |
| HCA | No universal HCA number | No universal HCA number | No universal HCA number |
| Dispenser / ACT | PSI applies to pharmaceutical assistants; other roles need qualification review | GPhC for registered pharmacy technicians; dispenser / ACT qualification routes also exist | Current role-specific registration and qualifications need PSNI / employer review |
| Trainee pharmacist | PSI / university / placement status review | GPhC foundation-training status review | PSNI pre-registration training status review |

Trainee identifiers must **not** be treated as pharmacist registration or
permission for independent locum practice. A regulator/training reference is
required when the applicant says one has been issued. Otherwise collect the
programme, provider, placement and status for review. The research did not
establish a universal mandatory format or identifier for every training route;
do not invent one or require a GPhC training number outside Great Britain.

ACT accreditation is not a universal regulator-issued ACT number. For GB
pharmacy technicians, choose the registered GPhC route. For Irish pharmaceutical
assistants, choose the PSI route. A registered pharmacy technician selecting
accuracy checking must supply both their registration number and ACT
qualification/competency evidence.

An HCA title does not settle social-care registration requirements. The wizard
supports role-specific SSSC (Scotland), Social Care Wales and NISCC paths.
Pending/not-applicable/unsure selections permit preparing an account preview,
**not** starting regulated work. Ireland's separately regulated social-care
worker title must not be equated with HCA.

## Safeguarding and verification

- Republic of Ireland: role-appropriate Garda vetting.
- England/Wales: appropriate DBS level and barred-list eligibility.
- Scotland: PVG membership is legally required for regulated roles; assess duties.
- Northern Ireland: appropriate AccessNI level and eligibility.
- Qualification, identity, employment history, references, right-to-work and
  relevant insurance requirements need role-specific review.
- Payroll IDs (PPS / National Insurance) are not professional IDs and are optional
  in this preview. A live service should collect them only when needed, securely.

Changing country, occupation or verification path clears dependent identifiers,
evidence and acknowledgements. All summaries retain a pending verification
status. Presence of an ID and ticking an acknowledgement never means verified.

**Production blocker:** live register/status checking and authorised compliance
review are not connected. Before placement, validate identity match, current
registration, appropriate division/licence/scope, restrictions and any relevant
training approval. Do not issue a verified badge or enable regulated shifts on
the basis of this preview alone.

## Official sources reviewed

- [PSA: GPhC](https://www.professionalstandards.org.uk/organisations-we-oversee/regulators/general-pharmaceutical-council-gphc) — pharmacists and pharmacy technicians in Great Britain.
- [PSA: PSNI](https://www.professionalstandards.org.uk/organisations-we-oversee/regulators/pharmaceutical-society-northern-ireland-psni) — pharmacists in Northern Ireland.
- [PSA: GMC](https://www.professionalstandards.org.uk/organisations-we-oversee/regulators/general-medical-council-gmc).
- [PSA: GOC](https://www.professionalstandards.org.uk/organisations-we-oversee/regulators/general-optical-council-goc) — optical professionals across the UK.
- [PSI registration](https://www.psi.ie/registration) and [pharmaceutical assistants](https://www.psi.ie/registration/pharmaceutical-assistants).
- [Medical Council: check the register](https://www.medicalcouncil.ie/public-information/check-the-register/).
- [NMBI registration](https://www.nmbi.ie/Registration).
- [NMC: search the register](https://www.nmc.org.uk/registration/search-the-register/).
- [CORU registration](https://coru.ie/health-and-social-care-professionals/registration/).
- [GOC](https://optical.org/).
- [Disclosure Scotland / PVG](https://www.mygov.scot/pvg-scheme).
- [Social Care Wales registration](https://socialcare.wales/registration).
- [NISCC: who can register](https://niscc.info/who-can-register/).

Some direct GPhC, PSNI, GMC and SSSC pages rejected automated access. PSA
regulator profiles corroborated the core GB/NI jurisdiction distinctions.
Role-specific and training requirements still need current regulator/employer
confirmation; this source review is not legal or regulatory approval.
