migrate(
  (app) => {
    if (!app.hasTable('clinical_cases')) {
      var collection = new Collection({
        name: 'clinical_cases',
        type: 'base',
        listRule: "@request.auth.id != ''",
        viewRule: "@request.auth.id != ''",
        createRule: "@request.auth.id != ''",
        updateRule: "@request.auth.id != ''",
        deleteRule: "@request.auth.id != ''",
        fields: [
          {
            name: 'status',
            type: 'select',
            values: ['sent_to_lab', 'lab_responded', 'in_treatment', 'concluded'],
            maxSelect: 1,
          },
          { name: 'notes', type: 'text' },
          { name: 'sla_deadline', type: 'date' },
          { name: 'lab_response_date', type: 'date' },
          { name: 'first_consultation_date', type: 'date' },
          { name: 'last_consultation_date', type: 'date' },
          { name: 'consultation_count', type: 'number' },
          { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
          { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
        ],
        indexes: [],
      })
      app.save(collection)
    }

    var col = app.findCollectionByNameOrId('clinical_cases')

    if (col.fields.getByName('status')) {
      col.fields.removeByName('status')
    }
    col.fields.add(
      new SelectField({
        name: 'status',
        values: ['sent_to_lab', 'lab_responded', 'in_treatment', 'concluded'],
        maxSelect: 1,
      }),
    )

    if (!col.fields.getByName('lab_response_date')) {
      col.fields.add(new DateField({ name: 'lab_response_date' }))
    }
    if (!col.fields.getByName('first_consultation_date')) {
      col.fields.add(new DateField({ name: 'first_consultation_date' }))
    }
    if (!col.fields.getByName('last_consultation_date')) {
      col.fields.add(new DateField({ name: 'last_consultation_date' }))
    }
    if (!col.fields.getByName('consultation_count')) {
      col.fields.add(new NumberField({ name: 'consultation_count' }))
    }
    if (!col.fields.getByName('created')) {
      col.fields.add(new AutodateField({ name: 'created', onCreate: true, onUpdate: false }))
    }
    if (!col.fields.getByName('updated')) {
      col.fields.add(new AutodateField({ name: 'updated', onCreate: true, onUpdate: true }))
    }

    app.save(col)
  },
  (app) => {
    if (!app.hasTable('clinical_cases')) return
    var col = app.findCollectionByNameOrId('clinical_cases')
    ;[
      'lab_response_date',
      'first_consultation_date',
      'last_consultation_date',
      'consultation_count',
    ].forEach(function (f) {
      if (col.fields.getByName(f)) col.fields.removeByName(f)
    })
    app.save(col)
  },
)
