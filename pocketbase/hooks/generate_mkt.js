routerAdd(
  'POST',
  '/backend/v1/mkt-generate',
  (e) => {
    try {
      const body = e.requestInfo().body || {}
      const topic = body.topic || 'dicas de ortodontia'

      // Using Skip AI Gateway via Agent
      const result = $ai.agent('magic-helper').chat({
        user_id: e.auth?.id || 'anonymous',
        message: `Crie um post curto para Instagram sobre: ${topic}`,
      })

      try {
        const events = $app.findCollectionByNameOrId('events')
        const ev = new Record(events)
        ev.set('event_name', 'content.generated')
        ev.set('payload', { topic })
        ev.set('source', 'mkt_tool')
        $app.save(ev)
      } catch (err) {
        console.log('Event log failed', err.message)
      }

      return e.json(200, { content: result.content })
    } catch (err) {
      console.log('MKT generation error:', err.message)
      return e.internalServerError('Falha ao gerar conteúdo')
    }
  },
  $apis.requireAuth(),
)
