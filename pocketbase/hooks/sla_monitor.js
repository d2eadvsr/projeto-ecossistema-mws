cronAdd('sla_monitor', '0 8 * * *', () => {
  const cases = $app.findRecordsByFilter(
    'clinical_cases',
    "sla_deadline < @now && status != 'delivered'",
    '',
    100,
    0,
  )
  for (const c of cases) {
    $app.logger().warn('SLA breached for case', 'case_id', c.id)
  }
})
