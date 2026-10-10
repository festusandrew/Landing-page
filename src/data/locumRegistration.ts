export type RegCountry = 'IE' | 'EN' | 'SC' | 'WA' | 'NI';
export type OccupationKey = 'pharmacist' | 'gp' | 'nurse' | 'hca' | 'optometrist' | 'dispenser' | 'trainee' | 'ahp' | 'dentist';
export type RegistrationField = {
  body: string; acronym: string; label: string; url: string;
  required: boolean; kind: 'professional' | 'training';
};
export type RegistrationRoute = {
  field: RegistrationField | null;
  guidance: string;
  needsQualification: boolean;
  needsACTEvidence: boolean;
  verificationStatus: 'pending-professional-register-check' | 'pending-training-check' | 'pending-qualification-check';
};

export const REG_COUNTRIES: Record<RegCountry, {
  name: string; vetting: string; vettingUrl: string; payrollId: string; rightToWork: string;
}> = {
  IE: { name: 'Republic of Ireland', vetting: 'Garda vetting, where the role requires it', vettingUrl: 'https://vetting.garda.ie/', payrollId: 'PPS Number', rightToWork: 'Irish / EU / EEA / Swiss citizen or valid Irish permission to work' },
  EN: { name: 'England', vetting: 'Role-appropriate DBS check; level and barred-list eligibility must be confirmed', vettingUrl: 'https://www.gov.uk/government/organisations/disclosure-and-barring-service', payrollId: 'National Insurance Number', rightToWork: 'British / Irish citizen or valid UK permission to work' },
  SC: { name: 'Scotland', vetting: 'PVG scheme membership is required for regulated roles; assess the duties', vettingUrl: 'https://www.mygov.scot/pvg-scheme', payrollId: 'National Insurance Number', rightToWork: 'British / Irish citizen or valid UK permission to work' },
  WA: { name: 'Wales', vetting: 'Role-appropriate DBS check; level and barred-list eligibility must be confirmed', vettingUrl: 'https://www.gov.uk/government/organisations/disclosure-and-barring-service', payrollId: 'National Insurance Number', rightToWork: 'British / Irish citizen or valid UK permission to work' },
  NI: { name: 'Northern Ireland', vetting: 'Role-appropriate AccessNI check; level and eligibility must be confirmed', vettingUrl: 'https://www.nidirect.gov.uk/campaigns/accessni-criminal-record-checks', payrollId: 'National Insurance Number', rightToWork: 'British / Irish citizen or valid UK permission to work' },
};

export const REG_OCCUPATIONS: { key: OccupationKey; name: string; specialisations: string[] }[] = [
  { key: 'pharmacist', name: 'Locum Pharmacist', specialisations: ['Community Pharmacy', 'Hospital Pharmacy', 'Pharmacy Clinic / PGD', 'Wholesale / Distribution', 'Prescribing Pharmacist'] },
  { key: 'gp', name: 'Locum GP & Doctor', specialisations: ['General Practice', 'Out-of-Hours', 'Urgent Care', 'Occupational Health', 'Sexual Health', 'Dermatology (GPwSI)'] },
  { key: 'nurse', name: 'Agency Nurse / Midwife', specialisations: ['General Nursing', 'Mental Health', 'Paediatric', 'Theatre / Scrub', 'ICU / Critical Care', 'A&E', 'Midwifery', 'Community'] },
  { key: 'hca', name: 'Agency HCA', specialisations: ['Elderly / Nursing Home', 'Acute Hospital', 'Home Care', 'Disability Support', 'Mental Health Support'] },
  { key: 'optometrist', name: 'Locum Optometrist', specialisations: ['Community Optometry', 'Hospital Optometry', 'Contact Lenses', 'Low Vision', 'Independent Prescribing'] },
  { key: 'dispenser', name: 'Locum Dispenser / ACT', specialisations: ['Dispensing', 'Pharmacy Technician', 'Accuracy Checking', 'Community Pharmacy', 'Hospital Pharmacy'] },
  { key: 'trainee', name: 'Locum Pre-reg Pharmacist / Foundation Trainee', specialisations: ['Foundation Training', 'University Placement', 'Supervised Pharmacy Training'] },
  { key: 'ahp', name: 'Allied Health Professional', specialisations: ['Physiotherapy', 'Radiography', 'Occupational Therapy', 'Speech & Language Therapy', 'Dietetics', 'Podiatry'] },
  { key: 'dentist', name: 'Dentist', specialisations: ['General Dentistry', 'Orthodontics', 'Oral Surgery', 'Endodontics', 'Community Dental'] },
];

const field = (body: string, acronym: string, label: string, url: string): RegistrationField => ({ body, acronym, label, url, required: true, kind: 'professional' });
const GPHC = field('General Pharmaceutical Council', 'GPhC', 'GPhC Registration Number', 'https://www.pharmacyregulation.org/registers');
const PSI = field('Pharmaceutical Society of Ireland', 'PSI', 'PSI Registration Number', 'https://www.psi.ie/search-registers');
const PSNI = field('Pharmaceutical Society of Northern Ireland', 'PSNI', 'PSNI Registration Number', 'https://www.psni.org.uk/registration/pharmacist-registration/');
const UK_GMC = field('General Medical Council', 'GMC', 'GMC Number', 'https://www.gmc-uk.org/registration-and-licensing/our-registers');
const UK_NMC = field('Nursing and Midwifery Council', 'NMC', 'NMC PIN', 'https://www.nmc.org.uk/registration/search-the-register/');
const UK_GOC = field('General Optical Council', 'GOC', 'GOC Number', 'https://optical.org/');
const IE_IMC = field('Medical Council of Ireland', 'Medical Council', 'Irish Medical Council Registration Number', 'https://www.medicalcouncil.ie/public-information/check-the-register/');
const IE_NMBI = field('Nursing and Midwifery Board of Ireland', 'NMBI', 'NMBI Registration Number / PIN', 'https://www.nmbi.ie/Registration');
const IE_CORU = field('CORU', 'CORU', 'CORU Registration Number', 'https://coru.ie/');

export const SOCIAL_CARE_REGULATORS: Partial<Record<RegCountry, RegistrationField>> = {
  SC: field('Scottish Social Services Council', 'SSSC', 'SSSC Registration Number', 'https://www.sssc.uk.com/registration/'),
  WA: field('Social Care Wales', 'Social Care Wales', 'Social Care Wales Registration Number', 'https://socialcare.wales/registration'),
  NI: field('Northern Ireland Social Care Council', 'NISCC', 'NISCC Registration Number', 'https://niscc.info/who-can-register/'),
};

export function getRoleOptions(country: RegCountry, occupation: OccupationKey): { value: string; label: string }[] {
  if (occupation === 'dispenser') return [
    ...(country === 'IE' ? [{ value: 'assistant', label: 'PSI-registered pharmaceutical assistant' }] : country !== 'NI' ? [{ value: 'technician', label: 'GPhC-registered pharmacy technician (including ACT)' }] : []),
    { value: 'dispenser', label: country === 'IE' || country === 'NI' ? 'Pharmacy technician / dispenser — qualification review' : 'Dispenser — qualification review' },
    { value: 'act', label: 'ACT — qualification and accreditation review' },
  ];
  if (occupation === 'hca' && SOCIAL_CARE_REGULATORS[country]) return [
    { value: 'registered', label: `Registered with ${SOCIAL_CARE_REGULATORS[country]!.acronym} for this role` },
    { value: 'pending', label: 'Registration application pending' },
    { value: 'not-applicable', label: 'Registration not required for this role — employer to confirm' },
    { value: 'unsure', label: 'Unsure — role-specific review needed' },
  ];
  if (occupation === 'trainee') return [
    { value: 'issued', label: 'I have a regulator / training reference' },
    { value: 'pending', label: 'Not issued / unsure — training provider to confirm' },
  ];
  return [];
}

export function getRegistrationRoute(country: RegCountry, occupation: OccupationKey, role = '', accuracyChecking = false): RegistrationRoute {
  const base: RegistrationRoute = { field: null, guidance: '', needsQualification: false, needsACTEvidence: false, verificationStatus: 'pending-qualification-check' };
  if (occupation === 'trainee') {
    const issuer = country === 'IE' ? PSI : country === 'NI' ? PSNI : GPHC;
    return { ...base, field: { ...issuer, label: country === 'IE' ? 'PSI / university training reference (if issued)' : country === 'NI' ? 'PSNI pre-registration training reference (if issued)' : 'GPhC Foundation Training Number (if issued)', url: country === 'IE' ? 'https://www.psi.ie/education-and-training' : country === 'NI' ? 'https://www.psni.org.uk/' : 'https://www.pharmacyregulation.org/', required: role === 'issued', kind: 'training' }, needsQualification: true, verificationStatus: 'pending-training-check', guidance: 'A training reference is not pharmacist registration. Confirm the identifier, programme, placement and current training status with the regulator and training provider. Trainees must not practise independently as locum pharmacists.' };
  }
  if (occupation === 'hca') {
    const social = SOCIAL_CARE_REGULATORS[country];
    return { ...base, field: social && role === 'registered' ? social : null, needsQualification: true, verificationStatus: social && role === 'registered' ? 'pending-professional-register-check' : base.verificationStatus, guidance: `There is no universal professional registration number for HCAs. Identity, qualifications, employment history and references need employer review.${social ? ` ${social.body} registration may be required for specific social-care roles; an HCA job title alone does not determine this.` : ''} ${country === 'SC' ? 'PVG membership is legally required for regulated roles in Scotland.' : 'Safeguarding checks must match the duties and location.'}` };
  }
  if (occupation === 'dispenser') {
    const applicable = country === 'IE' && role === 'assistant' ? { ...PSI, label: 'PSI Pharmaceutical Assistant Registration Number' } : country !== 'IE' && country !== 'NI' && role === 'technician' ? { ...GPHC, label: 'GPhC Pharmacy Technician Registration Number' } : null;
    return { ...base, field: applicable, needsQualification: true, needsACTEvidence: role === 'act' || accuracyChecking, verificationStatus: applicable ? 'pending-professional-register-check' : base.verificationStatus, guidance: `Registration depends on the actual role. ${country === 'IE' ? 'PSI registration applies to pharmaceutical assistants, not every pharmacy technician or dispenser.' : country === 'NI' ? 'Confirm current role-specific registration and qualification requirements with PSNI and the employer; do not default to a GPhC number.' : 'The pharmacy technician title requires GPhC registration. Dispenser and ACT routes require qualification and scope-of-practice review; a pharmacy technician must choose the registered route, including when working as an ACT.'} An ACT qualification is not a separate universal regulator-issued ACT number.` };
  }
  const standard = {
    pharmacist: country === 'IE' ? PSI : country === 'NI' ? PSNI : GPHC,
    gp: country === 'IE' ? IE_IMC : UK_GMC,
    nurse: country === 'IE' ? IE_NMBI : UK_NMC,
    optometrist: country === 'IE' ? IE_CORU : UK_GOC,
    ahp: country === 'IE' ? IE_CORU : field('Health and Care Professions Council', 'HCPC', 'HCPC Registration Number', 'https://www.hcpc-uk.org/check-the-register/'),
    dentist: country === 'IE' ? field('Dental Council of Ireland', 'Dental Council', 'Dental Council Registration Number', 'https://www.dentalcouncil.ie/') : field('General Dental Council', 'GDC', 'GDC Registration Number', 'https://www.gdc-uk.org/'),
  }[occupation];
  return { ...base, field: standard, verificationStatus: 'pending-professional-register-check', guidance: `Registration with ${standard.body} must be checked against the official register, including current status, identity, relevant register division and any restrictions.${occupation === 'gp' && country !== 'IE' ? ' Doctors also need the appropriate licence to practise; GP work may require GP-register and local eligibility checks.' : ''}${occupation === 'ahp' ? ' Confirm the register and protected title for the specific allied-health profession. Optometrists have their own occupation option.' : ''}` };
}

/** Collecting an identifier never promotes an applicant to a verified state. */
export function canContinueRegistration(country: RegCountry, occupation: OccupationKey, form: Record<string, string>): boolean {
  const route = getRegistrationRoute(country, occupation, form.registrationRole, form.specialisation === 'Accuracy Checking');
  const specialisations = REG_OCCUPATIONS.find(item => item.key === occupation)?.specialisations || [];
  return Boolean(
    specialisations.includes(form.specialisation?.trim() || '')
    && (!getRoleOptions(country, occupation).length || getRoleOptions(country, occupation).some(option => option.value === form.registrationRole))
    && (!route.field?.required || form.regNumber?.trim())
    && (!route.needsQualification || form.qualification?.trim())
    && (occupation !== 'trainee' || form.trainingProvider?.trim())
    && (!route.needsACTEvidence || form.actEvidence?.trim()),
  );
}

/** Changing jurisdiction or occupation must not recycle another regulator's number or acknowledgements. */
export function clearRegistrationFields(form: Record<string, string>): Record<string, string> {
  const next = { ...form };
  for (const key of ['regNumber', 'registrationRole', 'specialisation', 'qualification', 'trainingProvider', 'actEvidence', 'nationalId', 'rightToWork']) delete next[key];
  return next;
}
