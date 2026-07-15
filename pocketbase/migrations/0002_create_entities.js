migrate(
  (app) => {
    // 1. Dentists
    let dentists
    try {
      dentists = app.findCollectionByNameOrId('dentists')
    } catch {
      try {
        dentists = app.findCollectionByNameOrId('Dentists')
      } catch {
        dentists = new Collection({
          name: 'dentists',
          type: 'base',
          listRule: '',
          viewRule: '',
          createRule: '',
          updateRule: '',
          deleteRule: '',
          fields: [
            {
              name: 'user',
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
              values: ['pending', 'active', 'suspended'],
              maxSelect: 1,
            },
          ],
        })
        app.save(dentists)
      }
    }

    // 2. Patients
    let patients
    try {
      patients = app.findCollectionByNameOrId('patients')
    } catch {
      try {
        patients = app.findCollectionByNameOrId('Patients')
      } catch {
        patients = new Collection({
          name: 'patients',
          type: 'base',
          listRule: '',
          viewRule: '',
          createRule: '',
          updateRule: '',
          deleteRule: '',
          fields: [
            {
              name: 'user',
              type: 'relation',
              required: true,
              collectionId: '_pb_users_auth_',
              maxSelect: 1,
            },
            { name: 'document_id', type: 'text' },
            {
              name: 'credit_status',
              type: 'select',
              values: ['pending', 'approved', 'rejected'],
              maxSelect: 1,
            },
            { name: 'treatment_progress', type: 'number' },
          ],
        })
        app.save(patients)
      }
    }

    // 3. Clinical Cases
    let cases
    try {
      cases = app.findCollectionByNameOrId('clinical_cases')
    } catch {
      try {
        cases = app.findCollectionByNameOrId('Clinical_Cases')
      } catch {
        cases = new Collection({
          name: 'clinical_cases',
          type: 'base',
          listRule: '',
          viewRule: '',
          createRule: '',
          updateRule: '',
          deleteRule: '',
          fields: [
            {
              name: 'dentist',
              type: 'relation',
              required: true,
              collectionId: dentists.id,
              maxSelect: 1,
            },
            {
              name: 'patient',
              type: 'relation',
              required: true,
              collectionId: patients.id,
              maxSelect: 1,
            },
            {
              name: 'status',
              type: 'select',
              values: ['analyzing', 'production', 'delivered'],
              maxSelect: 1,
            },
            { name: 'sla_deadline', type: 'date' },
          ],
        })
        app.save(cases)
      }
    }

    // Add missing notes field to clinical_cases
    if (!cases.fields.getByName('notes')) {
      cases.fields.add(new TextField({ name: 'notes' }))
      app.save(cases)
    }

    // 4. Events
    let events
    try {
      events = app.findCollectionByNameOrId('events')
    } catch {
      try {
        events = app.findCollectionByNameOrId('Events')
      } catch {
        events = new Collection({
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
          ],
        })
        app.save(events)
      }
    }
  },
  (app) => {
    try {
      const cases = app.findCollectionByNameOrId('clinical_cases')
      if (cases.fields.getByName('notes')) {
        cases.fields.removeByName('notes')
        app.save(cases)
      }
    } catch (_) {}
  },
)
