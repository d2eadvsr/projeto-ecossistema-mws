migrate((app) => {
  const users = app.findCollectionByNameOrId('_pb_users_auth_')
  const dentists = app.findCollectionByNameOrId('dentists')
  const patients = app.findCollectionByNameOrId('patients')
  const cases = app.findCollectionByNameOrId('clinical_cases')

  // Helper to create user
  const createUser = (email, name, role) => {
    try {
      return app.findAuthRecordByEmail('_pb_users_auth_', email)
    } catch (_) {
      const record = new Record(users)
      record.setEmail(email)
      record.setPassword('Skip@Pass')
      record.setVerified(true)
      record.set('name', name)
      record.set('role', role)
      record.set('status', 'active')
      app.save(record)
      return record
    }
  }

  // 1. Admin
  createUser('daniel.elias@d2eadvisory.com.br', 'Daniel Elias (Admin)', 'manager')

  // 2. Lab
  createUser('lab@magicwire.com', 'Lab Team', 'lab')

  // 3. Dentist
  const drUser = createUser('dentist@magicwire.com', 'Dr. Sarah Silva', 'dentist')
  let dentistProfile
  try {
    dentistProfile = app.findFirstRecordByData('dentists', 'user_id', drUser.id)
  } catch (_) {
    dentistProfile = new Record(dentists)
    dentistProfile.set('user_id', drUser.id)
    dentistProfile.set('cro', 'CRO-SP 12345')
    dentistProfile.set('specialization', 'Ortodontia')
    dentistProfile.set('nps_score', 92)
    dentistProfile.set('license_status', 'active')
    app.save(dentistProfile)
  }

  // 4. Patient
  const ptUser = createUser('patient@magicwire.com', 'João Paciente', 'patient')
  let patientProfile
  try {
    patientProfile = app.findFirstRecordByData('patients', 'user_id', ptUser.id)
  } catch (_) {
    patientProfile = new Record(patients)
    patientProfile.set('user_id', ptUser.id)
    patientProfile.set('document_id', '123.456.789-00')
    patientProfile.set('credit_status', 'approved')
    patientProfile.set('treatment_progress', 35)
    app.save(patientProfile)
  }

  // 5. Case
  try {
    app.findFirstRecordByData('clinical_cases', 'patient_id', patientProfile.id)
  } catch (_) {
    const clinicalCase = new Record(cases)
    clinicalCase.set('dentist_id', dentistProfile.id)
    clinicalCase.set('patient_id', patientProfile.id)
    clinicalCase.set('status', 'analyzing')
    clinicalCase.set('notes', 'Alinhamento superior necessário.')

    const futureDate = new Date()
    futureDate.setDate(futureDate.getDate() + 7)
    clinicalCase.set('sla_deadline', futureDate.toISOString().split('T')[0] + ' 12:00:00.000Z')
    app.save(clinicalCase)
  }
})
