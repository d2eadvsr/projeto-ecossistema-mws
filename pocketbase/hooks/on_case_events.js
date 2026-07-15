onRecordAfterUpdateSuccess((e) => {
  const isDelivered = e.record.getString('status') === 'delivered'
  const wasDelivered = e.record.original().getString('status') === 'delivered'

  if (isDelivered && !wasDelivered) {
    try {
      const events = $app.findCollectionByNameOrId('events')
      const ev = new Record(events)
      ev.set('event_name', 'case.delivered')
      ev.set('payload', { case_id: e.record.id, timestamp: new Date().toISOString() })
      ev.set('source', 'system_hook')
      $app.save(ev)

      // Simulate NPS trigger via event
      const npsEv = new Record(events)
      npsEv.set('event_name', 'nps.triggered')
      npsEv.set('payload', { case_id: e.record.id, patient_id: e.record.getString('patient_id') })
      npsEv.set('source', 'system_hook')
      $app.save(npsEv)
    } catch (err) {
      console.log('Error logging case delivery event', err.message)
    }
  }

  e.next()
}, 'clinical_cases')

onRecordAfterCreateSuccess((e) => {
  try {
    const events = $app.findCollectionByNameOrId('events')
    const ev = new Record(events)
    ev.set('event_name', 'case.opened')
    ev.set('payload', { case_id: e.record.id })
    ev.set('source', 'system_hook')
    $app.save(ev)
  } catch (err) {
    console.log('Error logging case opened event', err.message)
  }
  e.next()
}, 'clinical_cases')
