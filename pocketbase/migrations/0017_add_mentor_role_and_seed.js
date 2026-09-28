migrate(
  (app) => {
    const users = app.findCollectionByNameOrId('_pb_users_auth_')

    // 1. Ensure 'mentor' is in role select values
    const roleField = users.fields.getByName('role')
    if (roleField) {
      const currentValues = roleField.values || []
      if (!currentValues.includes('mentor')) {
        roleField.values = [...currentValues, 'mentor']
        app.save(users)
      }
    }

    // 2. Seed test account for Mentor (Dr. Breno)
    const email = 'mentor@magicwire.com'
    let record
    try {
      record = app.findAuthRecordByEmail('_pb_users_auth_', email)
    } catch (_) {
      record = new Record(users)
      record.setEmail(email)
      record.setVerified(true)
    }
    record.setPassword('Skip@Pass')
    record.set('name', 'Dr. Breno (Mentor MWS)')
    record.set('role', 'mentor')
    record.set('status', 'active')
    app.save(record)
  },
  (app) => {
    try {
      const record = app.findAuthRecordByEmail('_pb_users_auth_', 'mentor@magicwire.com')
      app.delete(record)
    } catch (_) {}
  },
)
