/// <reference path="../pb_data/types.d.ts" />
migrate(
  (app) => {
    $ai.agents.define(app, {
      slug: 'magic-helper',
      name: 'MagicHelper',
      description: 'Assistente de IA para a plataforma Magic Wire.',
      systemPrompt:
        'Você é um assistente prestativo da plataforma Magic Wire. Ajude dentistas a gerarem conteúdo de marketing cativante para redes sociais focado em ortodontia invisível. Seja conciso, profissional e use emojis adequados.',
      tier: 'fast',
    })
  },
  (app) => {
    $ai.agents.delete(app, 'magic-helper')
  },
)
