migrate(
  (app) => {
    const users = app.findCollectionByNameOrId('_pb_users_auth_')

    // 1. Ensure 'lead' is in role select values
    const roleField = users.fields.getByName('role')
    if (roleField) {
      const currentValues = roleField.values || []
      if (!currentValues.includes('lead')) {
        roleField.values = [...currentValues, 'lead']
        app.save(users)
      }
    }

    // 2. Seed test account for Lead Qualificado
    const email = 'lead.teste@mws.com.br'
    let record
    try {
      record = app.findAuthRecordByEmail('_pb_users_auth_', email)
    } catch (_) {
      record = new Record(users)
      record.setEmail(email)
      record.setVerified(true)
    }
    record.setPassword('Skip@Pass')
    record.set('name', 'Marcos Andrade (Lead Qualificado)')
    record.set('role', 'lead')
    record.set('status', 'active')
    app.save(record)
  },
  (app) => {
    try {
      const record = app.findAuthRecordByEmail('_pb_users_auth_', 'lead.teste@mws.com.br')
      app.delete(record)
    } catch (_) {}
  },
)
