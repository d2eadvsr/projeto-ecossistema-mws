onRecordAfterCreateSuccess((e) => {
  const events = $app.findCollectionByNameOrId('events')
  const event = new Record(events)
  event.set('event_name', 'case.opened')
  event.set('payload', {
    caseId: e.record.id,
    dentist: e.record.getString('dentist'),
    patient: e.record.getString('patient'),
  })
  event.set('source', 'system')
  $app.save(event)
  return e.next()
}, 'clinical_cases')
