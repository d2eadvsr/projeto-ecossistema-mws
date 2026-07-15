routerAdd(
  'POST',
  '/backend/v1/simulate-credit',
  (e) => {
    const body = e.requestInfo().body || {}
    const amount = body.amount || 0
    if (amount <= 0) return e.badRequestError('invalid amount')

    const approved = Math.random() > 0.2

    return e.json(200, {
      approved,
      installments: approved ? 12 : 0,
      interestRate: 0.05,
    })
  },
  $apis.requireAuth(),
)
