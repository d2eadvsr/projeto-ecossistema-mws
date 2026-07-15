/// <reference path="../pb_data/types.d.ts" />
migrate(
  (app) => {
    $ai.agents.define(app, {
      slug: 'magic-helper',
      name: 'MagicHelper',
      description: 'Assistant for Dentists',
      systemPrompt:
        'You are a helpful assistant for dentists using the Magic Wire platform. Help them with clinical document uploads, generating marketing content, and classifying cases. Be concise and professional. Respond in Portuguese.',
      tier: 'fast',
    })
  },
  (app) => {
    $ai.agents.delete(app, 'magic-helper')
  },
)
