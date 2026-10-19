import assert from 'node:assert/strict';
import test from 'node:test';
import {
  REG_COUNTRIES, REG_OCCUPATIONS, canContinueRegistration, clearRegistrationFields,
  getRegistrationRoute, getRoleOptions, type OccupationKey, type RegCountry,
} from './locumRegistration';

const countries = Object.keys(REG_COUNTRIES) as RegCountry[];
const expected: Record<RegCountry, Record<string, string>> = {
  IE: { pharmacist: 'PSI', gp: 'Medical Council', nurse: 'NMBI', optometrist: 'CORU', ahp: 'CORU', dentist: 'Dental Council' },
  EN: { pharmacist: 'GPhC', gp: 'GMC', nurse: 'NMC', optometrist: 'GOC', ahp: 'HCPC', dentist: 'GDC' },
  SC: { pharmacist: 'GPhC', gp: 'GMC', nurse: 'NMC', optometrist: 'GOC', ahp: 'HCPC', dentist: 'GDC' },
  WA: { pharmacist: 'GPhC', gp: 'GMC', nurse: 'NMC', optometrist: 'GOC', ahp: 'HCPC', dentist: 'GDC' },
  NI: { pharmacist: 'PSNI', gp: 'GMC', nurse: 'NMC', optometrist: 'GOC', ahp: 'HCPC', dentist: 'GDC' },
};
function formFor(occupation: OccupationKey) {
  return { specialisation: REG_OCCUPATIONS.find(item => item.key === occupation)!.specialisations[0], qualification: 'Qualification evidence to review', trainingProvider: 'Training provider and placement to review' };
}

for (const country of countries) {
  for (const [occupation, authority] of Object.entries(expected[country])) {
    test(`${country} ${occupation}: ${authority}, number required, never verified by presence`, () => {
      const key = occupation as OccupationKey;
      const route = getRegistrationRoute(country, key);
      assert.equal(route.field?.acronym, authority);
      assert.equal(route.field?.required, true);
      assert.equal(canContinueRegistration(country, key, formFor(key)), false);
      assert.equal(canContinueRegistration(country, key, { ...formFor(key), regNumber: '   ' }), false);
      assert.equal(canContinueRegistration(country, key, { ...formFor(key), regNumber: 'Unverified identifier supplied' }), true);
      assert.equal(route.verificationStatus, 'pending-professional-register-check');
    });
  }
  test(`${country} HCA has an alternative route without a universal professional number`, () => {
    const registrationRole = getRoleOptions(country, 'hca').length ? 'unsure' : '';
    assert.equal(getRegistrationRoute(country, 'hca', registrationRole).field, null);
    assert.equal(canContinueRegistration(country, 'hca', { ...formFor('hca'), registrationRole }), true);
    assert.equal(canContinueRegistration(country, 'hca', { ...formFor('hca'), registrationRole, qualification: '' }), false);
  });
  test(`${country} ACT needs qualification and accreditation evidence, not an ACT number`, () => {
    assert.equal(getRegistrationRoute(country, 'dispenser', 'act').field, null);
    assert.equal(canContinueRegistration(country, 'dispenser', { ...formFor('dispenser'), registrationRole: 'act' }), false);
    assert.equal(canContinueRegistration(country, 'dispenser', { ...formFor('dispenser'), registrationRole: 'act', actEvidence: 'Awarding body and competency evidence to review' }), true);
  });
  test(`${country} trainee may use an alternative training-status path when no identifier is issued`, () => {
    const route = getRegistrationRoute(country, 'trainee', 'pending');
    assert.equal(route.field?.kind, 'training');
    assert.equal(route.field?.required, false);
    assert.equal(route.verificationStatus, 'pending-training-check');
    assert.equal(canContinueRegistration(country, 'trainee', { ...formFor('trainee'), registrationRole: 'pending' }), true);
    assert.equal(canContinueRegistration(country, 'trainee', { ...formFor('trainee'), registrationRole: 'pending', trainingProvider: '' }), false);
    assert.equal(canContinueRegistration(country, 'trainee', { ...formFor('trainee'), registrationRole: 'issued' }), false);
    assert.equal(route.field?.acronym, country === 'IE' ? 'PSI' : country === 'NI' ? 'PSNI' : 'GPhC');
  });
}
test('Great Britain pharmacy technicians require GPhC, dispensers can supply qualification evidence', () => {
  for (const country of ['EN', 'SC', 'WA'] as const) {
    assert.equal(getRegistrationRoute(country, 'dispenser', 'technician').field?.acronym, 'GPhC');
    assert.equal(canContinueRegistration(country, 'dispenser', { ...formFor('dispenser'), registrationRole: 'technician' }), false);
    assert.equal(canContinueRegistration(country, 'dispenser', { ...formFor('dispenser'), registrationRole: 'technician', regNumber: 'Unverified reference' }), true);
    assert.equal(canContinueRegistration(country, 'dispenser', { ...formFor('dispenser'), registrationRole: 'dispenser' }), true);
  }
});
test('Ireland pharmaceutical assistants require PSI; other dispensers are not assumed PSI registered', () => {
  assert.equal(getRegistrationRoute('IE', 'dispenser', 'assistant').field?.acronym, 'PSI');
  assert.equal(canContinueRegistration('IE', 'dispenser', { ...formFor('dispenser'), registrationRole: 'assistant' }), false);
  assert.equal(getRegistrationRoute('IE', 'dispenser', 'dispenser').field, null);
});
test('A registered pharmacy technician doing accuracy checking must supply both registration and ACT evidence', () => {
  const form = { ...formFor('dispenser'), registrationRole: 'technician', specialisation: 'Accuracy Checking', regNumber: 'Unverified reference' };
  assert.equal(canContinueRegistration('EN', 'dispenser', form), false);
  assert.equal(canContinueRegistration('EN', 'dispenser', { ...form, actEvidence: 'Accreditation and competency evidence to review' }), true);
  assert.equal(getRegistrationRoute('EN', 'dispenser', 'technician', true).field?.acronym, 'GPhC');
});
test('Northern Ireland does not silently reuse the GB pharmacy-technician route', () => {
  assert.equal(getRoleOptions('NI', 'dispenser').some(option => option.value === 'technician'), false);
  assert.equal(canContinueRegistration('NI', 'dispenser', { ...formFor('dispenser'), registrationRole: 'technician', regNumber: '12345' }), false);
});
test('Social-care-specific HCA registrations require their number only on the registered route', () => {
  for (const [country, regulator] of [['SC', 'SSSC'], ['WA', 'Social Care Wales'], ['NI', 'NISCC']] as const) {
    assert.equal(getRegistrationRoute(country, 'hca', 'registered').field?.acronym, regulator);
    assert.equal(canContinueRegistration(country, 'hca', { ...formFor('hca'), registrationRole: 'registered' }), false);
    assert.equal(canContinueRegistration(country, 'hca', { ...formFor('hca'), registrationRole: 'pending' }), true);
  }
});
test('Changing context clears regulator-specific fields and payroll IDs while preserving contact details', () => {
  const cleared = clearRegistrationFields({ email: 'example@example.com', fullName: 'Example User', dob: '1990-01-01', city: 'Example city', regNumber: 'old number', registrationRole: 'technician', specialisation: 'Pharmacy Technician', qualification: 'old qualification', trainingProvider: 'old training', actEvidence: 'old accreditation', nationalId: 'old payroll ID', rightToWork: 'old jurisdiction' });
  assert.deepEqual(cleared, { email: 'example@example.com', fullName: 'Example User', dob: '1990-01-01', city: 'Example city' });
});
test('Stale or invented role and specialisation values cannot bypass the registration step', () => {
  assert.equal(canContinueRegistration('EN', 'dispenser', { ...formFor('dispenser'), registrationRole: 'unknown' }), false);
  assert.equal(canContinueRegistration('IE', 'pharmacist', { specialisation: 'Optometry', regNumber: '12345' }), false);
  assert.equal(REG_OCCUPATIONS.find(item => item.key === 'ahp')!.specialisations.includes('Optometry'), false);
});
