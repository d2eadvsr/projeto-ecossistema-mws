routerAdd(
  'POST',
  '/backend/v1/generate-mkt',
  (e) => {
    const body = e.requestInfo().body || {}
    const topic = body.topic
    if (!topic) return e.badRequestError('missing topic')

    const reply = $ai.chat({
      model: 'fast',
      messages: [
        {
          role: 'system',
          content:
            'You are a marketing assistant for dentists. Generate social media posts in Portuguese.',
        },
        { role: 'user', content: `Generate a post about: ${topic}` },
      ],
    })
    return e.json(200, { content: reply.choices[0].message.content })
  },
  $apis.requireAuth(),
)
