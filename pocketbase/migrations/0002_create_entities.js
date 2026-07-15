migrate(
  (app) => {
    // 1. Dentists
    const dentists = new Collection({
      name: 'dentists',
      type: 'base',
      listRule: '',
      viewRule: '',
      createRule: '',
      updateRule: '',
      deleteRule: '',
      fields: [
        {
          name: 'user_id',
          type: 'relation',
          required: true,
          collectionId: '_pb_users_auth_',
          maxSelect: 1,
        },
        { name: 'cro', type: 'text' },
        { name: 'specialization', type: 'text' },
        { name: 'nps_score', type: 'number' },
        {
          name: 'license_status',
          type: 'select',
          values: ['active', 'pending', 'suspended'],
          maxSelect: 1,
        },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
    })
    app.save(dentists)

    // 2. Patients
    const patients = new Collection({
      name: 'patients',
      type: 'base',
      listRule: '',
      viewRule: '',
      createRule: '',
      updateRule: '',
      deleteRule: '',
      fields: [
        {
          name: 'user_id',
          type: 'relation',
          required: true,
          collectionId: '_pb_users_auth_',
          maxSelect: 1,
        },
        { name: 'document_id', type: 'text' },
        {
          name: 'credit_status',
          type: 'select',
          values: ['approved', 'pending', 'rejected'],
          maxSelect: 1,
        },
        { name: 'treatment_progress', type: 'number' },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
    })
    app.save(patients)

    // 3. Clinical Cases
    const cases = new Collection({
      name: 'clinical_cases',
      type: 'base',
      listRule: '',
      viewRule: '',
      createRule: '',
      updateRule: '',
      deleteRule: '',
      fields: [
        {
          name: 'dentist_id',
          type: 'relation',
          required: true,
          collectionId: dentists.id,
          maxSelect: 1,
        },
        {
          name: 'patient_id',
          type: 'relation',
          required: true,
          collectionId: patients.id,
          maxSelect: 1,
        },
        {
          name: 'status',
          type: 'select',
          values: ['analyzing', 'in_production', 'delivered'],
          maxSelect: 1,
        },
        { name: 'notes', type: 'text' },
        { name: 'sla_deadline', type: 'date' },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
    })
    app.save(cases)

    // 4. Events
    const events = new Collection({
      name: 'events',
      type: 'base',
      listRule: '',
      viewRule: '',
      createRule: '',
      updateRule: '',
      deleteRule: '',
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
    app.delete(app.findCollectionByNameOrId('events'))
    app.delete(app.findCollectionByNameOrId('clinical_cases'))
    app.delete(app.findCollectionByNameOrId('patients'))
    app.delete(app.findCollectionByNameOrId('dentists'))
  },
)
