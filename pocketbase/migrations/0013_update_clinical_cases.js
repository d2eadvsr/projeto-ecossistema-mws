migrate(
  (app) => {
    const col = app.findCollectionByNameOrId('clinical_cases')

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
    const col = app.findCollectionByNameOrId('clinical_cases')
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
