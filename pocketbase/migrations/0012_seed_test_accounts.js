migrate(
  (app) => {
    const users = app.findCollectionByNameOrId('_pb_users_auth_')

    const upsertUser = (email, name, role) => {
      let record
      try {
        record = app.findAuthRecordByEmail('_pb_users_auth_', email)
      } catch (_) {
        record = new Record(users)
        record.setEmail(email)
        record.setVerified(true)
      }
      // Always ensure the password is correct for the test accounts
      record.setPassword('Skip@Pass')
      record.set('name', name)
      record.set('role', role)
      record.set('status', 'active')
      app.save(record)
    }

    upsertUser('daniel.elias@d2eadvisory.com.br', 'Admin', 'admin')
    upsertUser('dentist@magicwire.com', 'Dentista', 'dentist')
    upsertUser('patient@magicwire.com', 'Paciente', 'patient')
    upsertUser('lab@magicwire.com', 'Lab', 'lab')
  },
  (app) => {
    // Down migration left empty to preserve the seeded data
  },
)
