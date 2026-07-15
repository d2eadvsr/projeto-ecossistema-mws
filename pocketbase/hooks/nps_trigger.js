onRecordAfterUpdateSuccess((e) => {
  const statusChanged = e.record.getString('status') !== e.record.original().getString('status')
  if (statusChanged && e.record.getString('status') === 'delivered') {
    const events = $app.findCollectionByNameOrId('events')
    const event = new Record(events)
    event.set('event_name', 'case.delivered')
    event.set('payload', { caseId: e.record.id, patient: e.record.getString('patient') })
    event.set('source', 'nps_trigger')
    $app.save(event)
  }
  return e.next()
}, 'clinical_cases')
