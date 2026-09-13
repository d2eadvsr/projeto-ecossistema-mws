migrate(
  (app) => {
    // Update dentist test user email and name if it exists with old email
    try {
      const record = app.findAuthRecordByEmail('_pb_users_auth_', 'dentist@magicwire.com')
      record.setEmail('ortodontista@magicwire.com')
      record.set('name', 'Ortodontista')
      record.setPassword('Skip@Pass')
      record.setVerified(true)
      record.set('role', 'dentist')
      record.set('status', 'active')
      app.save(record)
    } catch (_) {
      // If dentist@magicwire.com doesn't exist, ensure ortodontista@magicwire.com exists
      try {
        const record = app.findAuthRecordByEmail('_pb_users_auth_', 'ortodontista@magicwire.com')
        record.set('name', 'Ortodontista')
        record.setPassword('Skip@Pass')
        record.setVerified(true)
        record.set('role', 'dentist')
        record.set('status', 'active')
        app.save(record)
      } catch (_) {
        const users = app.findCollectionByNameOrId('_pb_users_auth_')
        const record = new Record(users)
        record.setEmail('ortodontista@magicwire.com')
        record.setPassword('Skip@Pass')
        record.setVerified(true)
        record.set('name', 'Ortodontista')
        record.set('role', 'dentist')
        record.set('status', 'active')
        app.save(record)
      }
    }
  },
  (app) => {
    try {
      const record = app.findAuthRecordByEmail('_pb_users_auth_', 'ortodontista@magicwire.com')
      record.setEmail('dentist@magicwire.com')
      record.set('name', 'Dentista')
      app.save(record)
    } catch (_) {}
  },
)
