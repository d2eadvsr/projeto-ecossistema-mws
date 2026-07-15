onRecordAfterUpdateSuccess((e) => {
  const newStatus = e.record.getString('status')
  const oldStatus = e.record.original().getString('status')

  if (newStatus === 'delivered' && oldStatus !== 'delivered') {
    const events = $app.findCollectionByNameOrId('events')
    const event = new Record(events)
    event.set('event_name', 'case.delivered')
    event.set('payload', { case_id: e.record.id })
    event.set('source', 'system')
    $app.save(event)

    $app
      .logger()
      .info('NPS trigger: Case delivered, patient should be notified.', 'case_id', e.record.id)
  }
  e.next()
}, 'clinical_cases')
