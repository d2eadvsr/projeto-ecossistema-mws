routerAdd(
  'POST',
  '/backend/v1/simulate-credit',
  (e) => {
    const body = e.requestInfo().body || {}
    const amount = body.amount || 0

    if (!amount || amount <= 0) {
      return e.badRequestError('Amount is required and must be greater than 0')
    }

    // Simulate Fintech API delay
    const approved = Math.random() > 0.1 // 90% approval rate

    try {
      const events = $app.findCollectionByNameOrId('events')
      const ev = new Record(events)
      ev.set('event_name', 'credit.requested')
      ev.set('payload', { amount, approved })
      ev.set('source', 'fintech_simulator')
      $app.save(ev)
    } catch (err) {
      console.log('Event log failed', err.message)
    }

    return e.json(200, {
      status: approved ? 'approved' : 'rejected',
      limit: approved ? amount * 1.2 : 0,
      installments: approved ? [6, 12, 24] : [],
      message: approved
        ? 'Crédito pré-aprovado com sucesso!'
        : 'Não foi possível aprovar o crédito no momento.',
    })
  },
  $apis.requireAuth(),
)
