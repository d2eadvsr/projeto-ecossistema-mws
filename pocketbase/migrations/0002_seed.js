migrate(
  (app) => {
    const users = app.findCollectionByNameOrId('_pb_users_auth_')

    try {
      app.findAuthRecordByEmail('_pb_users_auth_', 'daniel.elias@d2eadvisory.com.br')
      return // already seeded
    } catch (_) {}

    // Admin
    const admin = new Record(users)
    admin.setEmail('daniel.elias@d2eadvisory.com.br')
    admin.setPassword('Skip@Pass')
    admin.setVerified(true)
    admin.set('name', 'Daniel Elias')
    admin.set('role', 'manager')
    admin.set('status', 'active')
    app.save(admin)

    // Dentists
    const dentistsData = [
      { name: 'Dr. Aline', email: 'aline@example.com', nps: 90, status: 'active' },
      { name: 'Dr. Bruno', email: 'bruno@example.com', nps: 65, status: 'active' },
      { name: 'Dr. Carlos', email: 'carlos@example.com', nps: 45, status: 'suspended' },
    ]

    const dentistsCol = app.findCollectionByNameOrId('dentists')
    const dentistsRecords = []

    for (const d of dentistsData) {
      const u = new Record(users)
      u.setEmail(d.email)
      u.setPassword('Skip@Pass')
      u.setVerified(true)
      u.set('name', d.name)
      u.set('role', 'dentist')
      u.set('status', d.status)
      app.save(u)

      const dent = new Record(dentistsCol)
      dent.set('user', u.id)
      dent.set('cro', 'CRO-' + Math.floor(Math.random() * 100000))
      dent.set('specialization', 'Ortodontia')
      dent.set('nps_score', d.nps)
      dent.set('license_status', d.status)
      app.save(dent)
      dentistsRecords.push(dent)
    }

    // Patients
    const patientsCol = app.findCollectionByNameOrId('patients')
    const patientsRecords = []
    for (let i = 1; i <= 5; i++) {
      const u = new Record(users)
      u.setEmail(`paciente${i}@example.com`)
      u.setPassword('Skip@Pass')
      u.setVerified(true)
      u.set('name', `Paciente ${i}`)
      u.set('role', 'patient')
      u.set('status', 'active')
      app.save(u)

      const pat = new Record(patientsCol)
      pat.set('user', u.id)
      pat.set('document_id', 'CPF-00' + i)
      pat.set('credit_status', 'approved')
      pat.set('treatment_progress', i * 20)
      app.save(pat)
      patientsRecords.push(pat)
    }

    // Cases
    const casesCol = app.findCollectionByNameOrId('clinical_cases')
    const statuses = ['analyzing', 'production', 'delivered', 'analyzing', 'production']

    for (let i = 0; i < 5; i++) {
      const c = new Record(casesCol)
      c.set('dentist', dentistsRecords[i % 3].id)
      c.set('patient', patientsRecords[i].id)
      c.set('status', statuses[i])
      const d = new Date()
      d.setDate(d.getDate() + i * 2)
      c.set('sla_deadline', d.toISOString())
      app.save(c)
    }
  },
  (app) => {
    // Not rolling back seed data automatically to avoid data loss during dev
  },
)
