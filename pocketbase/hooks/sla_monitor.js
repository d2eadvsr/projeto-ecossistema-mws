onRecordAfterUpdateSuccess((e) => {
  const slaDeadlineStr = e.record.getString('sla_deadline')
  if (slaDeadlineStr) {
    const slaDeadline = new Date(slaDeadlineStr)
    if (slaDeadline < new Date() && e.record.getString('status') !== 'delivered') {
      console.log(`SLA breached for case ${e.record.id}`)
    }
  }
  return e.next()
}, 'clinical_cases')
