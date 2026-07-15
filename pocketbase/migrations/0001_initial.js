migrate(
  (app) => {
    const users = app.findCollectionByNameOrId('_pb_users_auth_')
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
    users.fields.add(
      new SelectField({ name: 'status', values: ['active', 'suspended'], maxSelect: 1 }),
    )
    app.save(users)

    const dentists = new Collection({
      name: 'dentists',
      type: 'base',
      listRule: "@request.auth.id != ''",
      viewRule: "@request.auth.id != ''",
      createRule: "@request.auth.id != ''",
      updateRule: "@request.auth.id != ''",
      deleteRule: null,
      fields: [
        {
          name: 'user',
          type: 'relation',
          collectionId: '_pb_users_auth_',
          maxSelect: 1,
          required: true,
        },
        { name: 'cro', type: 'text' },
        { name: 'specialization', type: 'text' },
        { name: 'nps_score', type: 'number' },
        {
          name: 'license_status',
          type: 'select',
          values: ['pending', 'active', 'suspended'],
          maxSelect: 1,
        },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
    })
    app.save(dentists)

    const patients = new Collection({
      name: 'patients',
      type: 'base',
      listRule: "@request.auth.id != ''",
      viewRule: "@request.auth.id != ''",
      createRule: "@request.auth.id != ''",
      updateRule: "@request.auth.id != ''",
      deleteRule: null,
      fields: [
        {
          name: 'user',
          type: 'relation',
          collectionId: '_pb_users_auth_',
          maxSelect: 1,
          required: true,
        },
        { name: 'document_id', type: 'text' },
        {
          name: 'credit_status',
          type: 'select',
          values: ['pending', 'approved', 'rejected'],
          maxSelect: 1,
        },
        { name: 'treatment_progress', type: 'number' },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
    })
    app.save(patients)

    const cases = new Collection({
      name: 'clinical_cases',
      type: 'base',
      listRule: "@request.auth.id != ''",
      viewRule: "@request.auth.id != ''",
      createRule: "@request.auth.id != ''",
      updateRule: "@request.auth.id != ''",
      deleteRule: null,
      fields: [
        {
          name: 'dentist',
          type: 'relation',
          collectionId: dentists.id,
          maxSelect: 1,
          required: true,
        },
        {
          name: 'patient',
          type: 'relation',
          collectionId: patients.id,
          maxSelect: 1,
          required: true,
        },
        {
          name: 'status',
          type: 'select',
          values: ['analyzing', 'production', 'delivered'],
          maxSelect: 1,
        },
        { name: 'sla_deadline', type: 'date' },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
    })
    app.save(cases)

    const files = new Collection({
      name: 'case_files',
      type: 'base',
      listRule: "@request.auth.id != ''",
      viewRule: "@request.auth.id != ''",
      createRule: "@request.auth.id != ''",
      updateRule: "@request.auth.id != ''",
      deleteRule: null,
      fields: [
        { name: 'case', type: 'relation', collectionId: cases.id, maxSelect: 1, required: true },
        { name: 'file', type: 'file', maxSelect: 1, maxSize: 52428800 },
        { name: 'type', type: 'select', values: ['photo', 'radio', 'stl'], maxSelect: 1 },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
    })
    app.save(files)

    const nps = new Collection({
      name: 'nps_responses',
      type: 'base',
      listRule: "@request.auth.id != ''",
      viewRule: "@request.auth.id != ''",
      createRule: "@request.auth.id != ''",
      updateRule: "@request.auth.id != ''",
      deleteRule: null,
      fields: [
        { name: 'case', type: 'relation', collectionId: cases.id, maxSelect: 1, required: true },
        { name: 'score', type: 'number' },
        { name: 'comment', type: 'text' },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
    })
    app.save(nps)

    const events = new Collection({
      name: 'events',
      type: 'base',
      listRule: "@request.auth.id != ''",
      viewRule: "@request.auth.id != ''",
      createRule: "@request.auth.id != ''",
      updateRule: "@request.auth.id != ''",
      deleteRule: null,
      fields: [
        { name: 'event_name', type: 'text', required: true },
        { name: 'payload', type: 'json' },
        { name: 'source', type: 'text' },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
    })
    app.save(events)
  },
  (app) => {
    const collections = [
      'events',
      'nps_responses',
      'case_files',
      'clinical_cases',
      'patients',
      'dentists',
    ]
    for (const c of collections) {
      try {
        app.delete(app.findCollectionByNameOrId(c))
      } catch (_) {}
    }
  },
)
