routerAdd(
  'POST',
  '/backend/v1/ai-support',
  (e) => {
    const body = e.requestInfo().body || {}
    const message = body.message
    if (!message) return e.badRequestError('missing message')

    const result = $ai.agent('magic-helper').chat({
      user_id: e.auth?.id || 'anonymous',
      conversation_id: body.conversation_id || null,
      message,
    })

    return e.json(200, result)
  },
  $apis.requireAuth(),
)
