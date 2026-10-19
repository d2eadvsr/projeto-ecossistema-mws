# Documentação de Engenharia Reversa — Perfil Mentor

**Perfil:** Mentor Clínico MWS (Especialista em Planejamento Lingual)  
**Rota Base:** `/mentor`  
**Credenciais de Teste:**

- `mentor.breno@mws.com` / `Skip@Pass` (Dr. Breno — Mentor Padrão)
- `mentor.aldir@mws.com` / `Skip@Pass` (Dr. Aldir)
- `mentor.flavio@mws.com` / `Skip@Pass` (Dr. Flávio)  
  **Role no Sistema:** `mentor`  
  **Versão Documentada:** `v0.0.45` (conforme `package.json`)  
  **Data da Documentação:** Fevereiro de 2026

---

## 1. Menu e Navegação do Perfil

No componente de navegação (`src/components/Navigation.tsx`), os itens da Sidebar e BottomNav para a role `mentor` são:

| Ordem | Rótulo Exibido            | Rota                      |     Ícone     | Descrição                                                                                          |
| :---: | :------------------------ | :------------------------ | :-----------: | :------------------------------------------------------------------------------------------------- |
|   1   | **Painel de Casos**       | `/mentor`                 |  `Sparkles`   | Fila de casos atribuídos, elaboração de planejamento lingual, aprovação e devolução ao laboratório |
|   2   | **Minha Disponibilidade** | `/mentor/disponibilidade` | `CalendarOff` | Gestão de bloqueios temporários (férias, congressos, licenças) para recebimento de novos casos     |
|   3   | **Meu Perfil**            | `/mentor/perfil`          |  `UserCheck`  | Dados cadastrais, bio, especialidades, estatísticas clínicas e status de disponibilidade           |

---

## 2. Detalhamento por Tela

### 2.1. Tela: Painel de Casos (Dashboard do Mentor)

- **Arquivo:** `src/pages/Mentor/Dashboard.tsx`
- **Rota:** `/mentor`
- **Origem da Navegação:** Login como `mentor` (`/login`), item "Painel de Casos" na sidebar, ou rota `/dashboard`.

#### (b) Informações Exibidas

- **Aviso de Ausência/Bloqueio Ativo (quando aplicável):**
  - Alerta amarelo/amber: _"Você possui um bloqueio de ausência ativo: [Motivo] até [Data Fim]. Novos casos não serão direcionados a você até o retorno."_ com link para gerenciar disponibilidade.
- **Cabeçalho:**
  - Título: `"Painel do Mentor — [Nome do Mentor]"` (ex.: Dr. Breno).
  - Subtítulo: `"Supervisão clínica, elaboração de planejamentos ortodônticos linguais e devolução técnica ao Laboratório MWS."`
  - Badge de status: `"Disponível para Novos Casos"` (verde) ou `"Em Período de Ausência"` (âmbar).
- **4 Cards de KPIs de Produtividade do Mentor:**
  1. _Fila de Espera (Aguardando Análise):_ contagem de casos com status `aguardando_analise`.
  2. _Em Elaboração de Planejamento:_ contagem de casos com status `em_analise`.
  3. _Planejamentos Concluídos:_ contagem de casos com status `planejamento_elaborado` ou `planejamento_entregue`.
  4. _Casos Ativos Sob Minha Mentoria:_ total de casos atribuídos ao mentor logado.
- **Barra de Pesquisa e Filtros de Estado:**
  - Campo de busca textual (por paciente, protocolo ou ID).
  - Seletor de filtro de status:
    - `"Todos os Casos"`
    - `"Aguardando Análise"`
    - `"Em Elaboração"`
    - `"Planejamento Concluído"`
    - `"Entregue ao Ortodontista"`
- **Listagem de Casos Clínicos Atribuídos:**
  - Cada card de caso exibe:
    - ID do caso (ex.: `CAS-2026-001`).
    - Nome do paciente e Protocolo MWS (`Classe I`, `Classe II`, `Classe III`, `Classe IV`, `Classe V`).
    - Badges de status semânticos:
      - `Aguardando Análise` (bg-amber-100 / text-amber-800).
      - `Em Análise Clínica` (bg-blue-100 / text-blue-800).
      - `Planejamento Concluído` (bg-emerald-100 / text-emerald-800).
      - `Entregue` (bg-slate-100 / text-slate-700).
    - Data de submissão e prazo limite de SLA.
    - Indicador de Preferência/Redirecionamento:
      - Se foi escolha do ortodontista: _"Preferência solicitada pelo ortodontista"_.
      - Se foi redirecionado pelo ADM: badge `"Redirecionado pelo ADM"` com justificativa exibida (ex.: sobrecarga ou ausência do mentor original).
    - Ortodontista solicitante e clínica de origem.
    - Resumo das notas clínicas anteriores:
      - _Nota do Ortodontista:_ queixa principal, expectativa estética e prioridades biomecânicas.
      - _Nota do Laboratório:_ parâmetros de colagem indireta e sequência de arcos sugerida.
      - _Nota do Mentor:_ parecer emitido pelo próprio mentor (quando preenchido).
    - Botões de Ação por Caso:
      - `"Iniciar Elaboração"` (muda status para `em_analise`).
      - `"Elaborar / Editar Planejamento"` (abre o Drawer/Modal completo de planejamento).
      - `"Ver Detalhes do Caso"` (abre gaveta de visualização).
- **Modal / Drawer de Elaboração do Planejamento Clínico Lingual:**
  - Cabeçalho com dados do paciente, ID do caso e protocolo.
  - _Seção 1 — Visualização dos Arquivos do Caso:_
    - Links/Badges para modelos digitais: `Escaneamento Intraoral Superior (.STL)`, `Escaneamento Inferior (.STL)`, `Fotos Intraorais`, `Telerradiografia e Cefalometria`.
  - _Seção 2 — Formulário de Planejamento Técnico:_
    - Sequência de Fios Linguais Recomendada: seleção de calibres (ex.: `0.012 Copper NiTi`, `0.014 NiTi`, `0.016x0.022 Aço`, etc.).
    - Recomendações de Ancoragem e Mecânica: campo de texto detalhado para stops linguais, elásticos intermaxilares e ancoragem esquelética (mini-implantes se necessário).
    - Nota Clínica do Mentor (Texto Oficial para o Ortodontista): parecer clínico minucioso com orientações de colagem, cuidados na ativação e checkpoints de consulta.
    - Alerta de Atenção Especial: checkbox e campo para observações críticas de segurança biológica.
  - Botões de ação no Modal:
    - `"Salvar Rascunho"`: preserva o texto no localStorage sem alterar o status.
    - `"Concluir Planejamento & Devolver ao Laboratório"`: valida os campos obrigatórios, atualiza o caso para `planejamento_elaborado`, registra timestamp e notifica o ortodontista e o laboratório com toast de sucesso.

#### (c) Funcionalidades

- Filtrar casos por busca textual e estado da esteira de planejamento.
- Iniciar a análise clínica de um caso recém-chegado.
- Elaborar e assinar digitalmente o parecer ortodôntico lingual com recomendações técnicas.
- Devolver o caso aprovado para o fluxo do Laboratório Central MWS.
- Salvar rascunhos automáticos de notas clínicas no `localStorage`.
- Consultar o histórico de redirecionamentos de casos transferidos por sobrecarga ou férias.

#### (d) Navegações

- Clicar no link de alerta de ausência → navega para `/mentor/disponibilidade`.
- Clicar nos botões de ação do card → abre drawer/modal inline na mesma tela sem perda de contexto.
- Menu lateral para alternar entre `/mentor`, `/mentor/disponibilidade` e `/mentor/perfil`.

#### (e) Disposição / Layout

- Container `max-w-6xl mx-auto space-y-6`.
- Grid de 4 KPIs no topo.
- Barra de busca e filtros alinhados horizontalmente.
- Feed vertical de cards detalhados para cada caso clínico.
- Dialog/Drawer responsivo com visualização de documentação em abas e formulário técnico vertical.

---

### 2.2. Tela: Minha Disponibilidade (Bloqueio de Ausência)

- **Arquivo:** `src/pages/Mentor/Availability.tsx`
- **Rota:** `/mentor/disponibilidade`
- **Origem da Navegação:** Menu lateral "Minha Disponibilidade" ou link de aviso no Dashboard do Mentor.

#### (b) Informações Exibidas

- **Cabeçalho:**
  - Título: `"Gestão de Disponibilidade & Ausências"`
  - Badge: `"Dr. Breno (Mentor)"`
  - Subtítulo: `"Defina seus períodos de ausência (férias, congressos, licenças). Durante esses intervalos, o sistema e o Time ADM redirecionarão novos casos para mentores disponíveis."`
- **Card de Status Atual de Disponibilidade:**
  - Indicador em tempo real:
    - `"Você está DISPONÍVEL para receber novos casos clínicos"` (em verde com ícone `CheckCircle2`).
    - OU `"Você está INDISPONÍVEL temporariamente (Bloqueio Vigente)"` (em âmbar com ícone `Clock`).
  - Total de períodos de bloqueio cadastrados: histórico de ausências passadas e agendadas.
- **Formulário de Cadastro de Novo Bloqueio de Ausência:**
  - Título: `"Programar Novo Período de Ausência"`
  - Campo _Data de Início_ (`startDate`): seleção de data.
  - Campo _Data de Término_ (`endDate`): seleção de data.
  - Campo _Motivo / Justificativa_ (`reason`): opções pré-definidas (`Férias Programadas`, `Congresso de Ortodontia`, `Licença Médica`, `Atividades Docentes`, `Outro`) e campo complementar.
  - Botão de submissão: `"Cadastrar Período de Ausência"` (com ícone `Plus`).
- **Tabela / Lista de Períodos de Ausência Cadastrados:**
  - Colunas: Data Início, Data Fim, Motivo, Status (`Vigente`, `Agendado`, `Concluído`) e Ações.
  - Botão de exclusão/cancelamento de período com confirmação e toast de atualização imediata.

#### (c) Funcionalidades

- Cadastrar novo intervalo de indisponibilidade com data de início, fim e motivo.
- Salvar os períodos de bloqueio na base persistida (`localStorage` via `saveUnavailablePeriods()`), refletindo instantaneamente no seletor de mentores da tela do ortodontista (`DentistCases`) e na esteira do Time ADM (`AdminMentors`).
- Cancelar ou excluir períodos de ausência agendados previamente.
- Visualizar o status dinâmico calculado com base na data de hoje.

#### (d) Navegações

- Sem links externos; mantém o usuário focado na configuração da sua agenda clínica.

#### (e) Disposição / Layout

- Grid de 2 colunas no desktop: formulário de cadastro à esquerda e histórico de ausências à direita (ou empilhado com card de status no topo).

---

### 2.3. Tela: Meu Perfil (Dados & Estatísticas do Mentor)

- **Arquivo:** `src/pages/Mentor/Profile.tsx`
- **Rota:** `/mentor/perfil`
- **Origem da Navegação:** Menu lateral "Meu Perfil".

#### (b) Informações Exibidas

- **Cabeçalho:**
  - Título: `"Perfil do Mentor Clínico"`
  - Subtítulo: `"Suas informações profissionais, especialidades cadastradas e métricas acumuladas de mentoria no Ecossistema MWS."`
- **Card Principal de Identificação Profissional:**
  - Avatar com foto, nome completo (ex.: `"Dr. Breno Silveira"`), titulação (`"Mentor Clínico Sênior MWS"`).
  - CRO e Região: ex.: `CRO-SP 48.219 • São Paulo / SP`.
  - E-mail institucional e telefone de contato.
  - Badges de Especialidades:
    - `"Ortodontia Lingual Avançada"`
    - `"Biomecânica Contínua MWS"`
    - `"Casos Complexos Classe II e III"`
- **Bio Profissional & Histórico Acadêmico:**
  - Texto descritivo da trajetória clínica, docência em cursos de pós-graduação e atuação no desenvolvimento dos protocolos de conformação robótica de fios linguais.
- **Métricas Acumuladas de Mentoria (Estatísticas do Mentor):**
  - `Total de Casos Mentorados:` número acumulado histórico (ex.: 284 casos).
  - `Tempo Médio de Resposta (SLA):` média de entrega do parecer clínico (ex.: 18 horas, dentro do SLA de 48h).
  - `Taxa de Aprovação na 1ª Versão:` porcentagem de casos aceitos de imediato pelo ortodontista (ex.: 94%).
  - `Índice de Satisfação dos Ortodontistas (CSAT):` avaliação média (ex.: 4.9 / 5.0).
- **Configuração de Notificações Clínicas:**
  - Toggles para receber alertas de novos casos por WhatsApp, e-mail institucional e notificações no sistema.

#### (c) Funcionalidades

- Edição de dados biográficos e preferências de contato.
- Consulta a indicadores transparentes de desempenho do próprio mentor.
- Alternância de canais de notificação para novos casos recebidos.

#### (d) Navegações

- Botão para visualizar casos ativos direciona para `/mentor`.

#### (e) Disposição / Layout

- Card de apresentação no topo com foto em destaque e badges dourados/verdes.
- Grid de 2 colunas: biografia e especialidades à esquerda; métricas de performance e configurações à direita.

---

## 3. Padrão Visual Aplicado ao Perfil Mentor

- **Cores Institucionais:**
  - Verde Escuro MWS (`#0d3b2e` / `emerald-900`): barra superior, barra lateral de navegação e botões principais de ação clínica.
  - Dourado Metálico / Ouro MWS (`#c69214` / `amber-500` / `border-amber-300`): insígnias de mentoria, cards de preferência solicitada pelo ortodontista e selos de excelência clínica.
  - Azul Técnico (`sky-600` / `blue-600`): badges de documentação digital, modelos STL e exames cefalométricos.
  - Fundo Claro (`bg-slate-50` / `white`): contraste máximo para leitura prolongada de prontuários clínicos e laudos técnicos.
- **Componentes de Marca:**
  - `MWSLogo`: presente na barra superior e sidebar, mantendo a consistência do ecossistema.
  - Badges de SLA: temporizadores com código de cores para cumprimento dos prazos de retorno ao laboratório.

---

## 4. Dados Mockados vs. Backend Real

- **Dados Atuais (Mockados em `src/pages/Mentor/mockData.ts`):**
  - Mentores cadastrados: `INITIAL_MENTORS` (Dr. Breno, Dr. Aldir, Dr. Flávio).
  - Casos clínicos: `INITIAL_MENTOR_CASES` sincronizados com os casos de `DentistCases.tsx` e `LabCases.tsx`.
  - Ausências programadas: `INITIAL_UNAVAILABLE_PERIODS`.
  - Configurações globais: `loadMentorSettings()` (toggle de escolha de mentor pelo ortodontista, ativado/desativado no Admin).
  - Persistência: camadas `localStorage` (`mws_mentors`, `mws_mentor_cases`, `mws_mentor_periods`, `mws_mentor_settings`) com métodos utilitários `saveMentors()`, `saveMentorCases()`, etc.
- **Integração com PocketBase:**
  - Autenticação via `users` com role `mentor`.
  - Migrações preparadas: tabelas `mentors`, `mentor_availabilities`, `clinical_cases` com campos `mentor_id`, `preferred_mentor_id` e `redirection_note`.
