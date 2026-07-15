migrate(
  (app) => {
    const users = app.findCollectionByNameOrId('_pb_users_auth_')

    if (!users.fields.getByName('role')) {
      users.fields.add(
        new SelectField({
          name: 'role',
          values: [
            'admin',
            'manager',
            'operator',
            'patient',
            'dentist',
            'assistant',
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
    const users = app.findCollectionByNameOrId('_pb_users_auth_')
    users.fields.removeByName('role')
    users.fields.removeByName('status')
    app.save(users)
  },
)
