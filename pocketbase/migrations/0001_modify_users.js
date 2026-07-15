migrate(
  (app) => {
    let users
    try {
      users = app.findCollectionByNameOrId('_pb_users_auth_')
    } catch {
      users = app.findCollectionByNameOrId('_pb_Users_Auth_')
    }

    if (!users.fields.getByName('role')) {
      users.fields.add(
        new SelectField({
          name: 'role',
          values: [
            'patient',
            'dentist',
            'assistant',
            'manager',
            'finance',
            'support',
            'lab',
            'fintech',
            'juridico',
          ],
          maxSelect: 1,
        }),
      )
    }

    if (!users.fields.getByName('status')) {
      users.fields.add(
        new SelectField({
          name: 'status',
          values: ['active', 'suspended'],
          maxSelect: 1,
        }),
      )
    }

    app.save(users)
  },
  (app) => {
    let users
    try {
      users = app.findCollectionByNameOrId('_pb_users_auth_')
    } catch {
      users = app.findCollectionByNameOrId('_pb_Users_Auth_')
    }
    users.fields.removeByName('role')
    users.fields.removeByName('status')
    app.save(users)
  },
)
