# Documentação de Engenharia Reversa — Perfil Ortodontista

**Perfil:** Ortodontista Credenciado MWS  
**Rota Base:** `/dentist` (e atalhos legados compatíveis `/dashboard`, `/cases`, `/financing`, `/marketing`)  
**Credencial de Teste:** `dentist@magicwire.com` / `Skip@Pass` (Dr. Roberto Fernandes)  
**Role no Sistema:** `dentist`  
**Versão Documentada:** `v0.0.45` (conforme `package.json`)  
**Data da Documentação:** Fevereiro de 2026

---

## 1. Menu e Navegação do Perfil

No componente de navegação (`src/components/Navigation.tsx`), a sidebar e a bottom nav para a role `dentist` disponibilizam 15 telas e submódulos completos para a gestão da clínica lingual:

| Ordem | Rótulo Exibido       | Rota                      |       Ícone       | Descrição                                                                              |
| :---: | :------------------- | :------------------------ | :---------------: | :------------------------------------------------------------------------------------- |
|   1   | **Painel**           | `/dentist`                | `LayoutDashboard` | Dashboard com resumo de pacientes e casos pendentes                                    |
|   2   | **Casos Clínicos**   | `/dentist/cases`          |   `FolderOpen`    | Esteira bidirecional de casos com escolha de mentor e aprovação de planejamento        |
|   3   | **Chat Laboratório** | `/dentist/chat-lab`       |  `MessageSquare`  | Mensageria contextualizada com técnicos e projetistas 3D do Laboratório Central        |
|   4   | **Pacientes**        | `/dentist/patients`       |      `Users`      | Gestão de base, distribuição por status, pasta individual e ciclo de manutenções       |
|   5   | **Agenda**           | `/dentist/agenda`         |  `CalendarClock`  | Agenda de consultas, agendamentos e horários clínicos                                  |
|   6   | **Prontuário**       | `/dentist/medical-record` |  `ClipboardList`  | Prontuário digital com linha do tempo de procedimentos                                 |
|   7   | **Financeiro**       | `/dentist/financing`      |   `DollarSign`    | Painel financeiro em 4 caixas (Faturamento, Custos Lab, Resultado Bruto e Manutenções) |
|   8   | **SLAs**             | `/dentist/slas`           |      `Clock`      | Monitoramento de prazos de retorno e análise laboratorial                              |
|   9   | **Programas**        | `/dentist/programs`       |      `Award`      | Programas de relacionamento e benefícios da rede credenciada                           |
|  10   | **Qualidade**        | `/dentist/quality`        |   `CheckSquare`   | Indicadores de conformidade clínica e satisfação de pacientes                          |
|  11   | **Escola MWS**       | `/dentist/school`         |  `GraduationCap`  | Cursos, capacitações e certificações em ortodontia lingual                             |
|  12   | **Comunidade**       | `/dentist/community`      |      `Globe`      | Fórum de casos clínicos e troca de experiências entre ortodontistas                    |
|  13   | **Indicações**       | `/dentist/referrals`      |    `UserPlus`     | Rede de cooperação e encaminhamento geográfico de pacientes                            |
|  14   | **Perfil Público**   | `/dentist/profile`        |    `UserCheck`    | Página pública do especialista, fotos da clínica, bio e agendamento para leads         |
|  15   | **Configurações**    | `/dentist/settings`       |    `Settings`     | Dados do consultório, equipe, notificações e preferências da conta                     |

---

## 2. Detalhamento por Tela

### 2.1. Tela: Painel (Dashboard do Ortodontista)

- **Arquivo:** `src/pages/Dentist/Dashboard.tsx`
- **Rota:** `/dentist` (e `/dashboard`)
- **Origem da Navegação:** Login como `dentist`, item "Painel" na barra de navegação.

#### (b) Informações Exibidas

- **Cabeçalho:**
  - Avatar com foto ou inicial do ortodontista (ex.: Dr. Roberto).
  - Título: `"Olá, [Nome do Ortodontista]"` (padrão: "Olá, Dr. Roberto Fernandes").
  - Subtítulo: `"Bem-vindo ao seu painel clínico."`
- **2 Cards de KPIs Principais:**
  1. _Total de Pacientes:_ contagem total cadastrada (ex.: 4 pacientes no mock inicial).
  2. _Casos Pendentes:_ pacientes em análise ou tratamento ativo (ex.: 3 casos pendentes).
- **Card de Pacientes Recentes:**
  - Link de atalho `"Ver todos →"` direcionando para `/dentist/patients`.
  - Lista de pacientes com avatar, nome, status (ex.: "Em Tratamento", "Em Análise", "Finalizado") e barra de progresso individual em percentual (ex.: 60%, 10%, 100%, 45%).

#### (c) Funcionalidades

- Acompanhar a visão geral de pacientes cadastrados e casos ativos.
- Acessar rapidamente a pasta dos pacientes.

#### (d) Navegações

- Clicar em `"Ver todos"` → rota `/dentist/patients`.

#### (e) Disposição / Layout

- Container `max-w-6xl mx-auto space-y-6`.
- Grid superior de 2 cards e card largo inferior de listagem.

---

### 2.2. Tela: Casos Clínicos & Integração Laboratório

- **Arquivo:** `src/pages/Dentist/Cases.tsx`
- **Rota:** `/dentist/cases` (e `/cases`)
- **Origem da Navegação:** Menu lateral "Casos Clínicos", botão no Dashboard ou links de prontuário.

#### (b) Informações Exibidas

- **Cabeçalho:**
  - Título: `"Casos Clínicos & Integração Laboratório"`
  - Subtítulo: `"Acompanhe o fluxo bidirecional de análise do caso, planejamento lingual MWS e retorno do laboratório para o ortodontista."`
  - Botões de ação:
    - `"Falar com o Laboratório"` com ícone `MessageSquare` (link para `/dentist/chat-lab`).
    - `"Novo Caso Clínico"` com ícone `Plus` (abre Dialog de criação).
- **4 Caixas de Métricas da Esteira Oficial MWS:**
  1. _Aguardando Análise Técnica:_ contagem de casos na fila inicial de triagem (badge slate).
  2. _Em Análise Técnica:_ casos sob revisão do técnico/mentor (badge âmbar).
  3. _Aguardando Aprovação:_ planejamentos prontos aguardando aprovação do ortodontista (badge roxo/purple).
  4. _Planejamento Entregue:_ planejamentos validados e liberados (badge esmeralda).
- **Filtros e Busca:**
  - Campo de busca textual por paciente, ID ou protocolo.
  - Botões de filtro rápido por status: `Todos`, `Aguardando Análise`, `Em Análise`, `Aguardando Aprovação`, `Entregues`.
- **Lista de Cartões de Casos Clínicos:**
  - Cada caso exibe:
    - ID do caso (ex.: `CAS-2026-001`).
    - Nome do paciente e Protocolo MWS (`Classe I` a `Classe V`).
    - Badge de status oficial com código de cores.
    - Prazo de SLA (ex.: `28/02/2026`) e data de submissão.
    - Mentor Responsável (ex.: `Dr. Breno`, `Dr. Flávio`, `Dr. Aldir`).
    - Alerta textual de preferência e redirecionamento de mentor (quando aplicável).
    - Resumo das 3 notas do fluxo bidirecional:
      - _(a) Nota Clínica do Ortodontista (Abertura):_ queixa e expectativas.
      - _(b) Nota Técnica do Laboratório (Planejamento):_ parâmetros do fio lingual.
      - _(c) Recomendação do Mentor Clínico:_ conduta recomendada.
    - Botões de Ação por Caso:
      - `"Ver Detalhes do Caso"` (abre Dialog completo).
      - `"Aprovar Planejamento"` (quando em `planejamento_elaborado` — aprova o caso e notifica o laboratório via toast).
      - `"Falar no Chat"` (abre `/dentist/chat-lab?caseId=...&patient=...`).
- **Modal de Abertura de Novo Caso Clínico:**
  - Nome do Paciente (input obrigatório).
  - Protocolo MWS (select com Classe I, II, III, IV, V).
  - **Campo "Escolher Mentor (Preferência)":**
    - Exibido condicionalmente quando o toggle do Time ADM (`allowDentistMentorChoice`) está ativado.
    - Badge: `"N disponível(is) hoje"` (filtra mentores sem bloqueio de ausência na data atual).
    - Select com a lista de mentores disponíveis com especialidade e cidade.
    - **Texto institucional obrigatório:** _“A escolha do mentor é uma preferência e não garante que o caso será atendido por ele.”_
  - Campo de Notas Clínicas Iniciais do Ortodontista.
- **Modal de Detalhes do Caso:**
  - Exibição completa de arquivos STL, dados da arcada, histórico de redirecionamentos e botão de aprovação clínica.

#### (c) Funcionalidades

- Criar novo caso com indicação opcional de preferência de mentor clínico.
- Filtrar casos por protocolo, busca textual e status na esteira.
- Aprovar planejamentos 3D enviados pelo Laboratório Central e pelo Mentor.
- Transitar diretamente para o chat contextualizado daquele paciente.

#### (d) Navegações

- Clicar em `"Falar com o Laboratório"` → `/dentist/chat-lab`.
- Clicar no botão do chat do caso → `/dentist/chat-lab?caseId=CAS-2026-00X&patient=Nome`.

#### (e) Disposição / Layout

- 4 caixas de métricas no topo.
- Barra de pesquisa com filtros horizontais.
- Feed vertical de cards detalhados.
- Dialogs responsivos para abertura e visualização.

---

### 2.3. Tela: Chat Direto com o Laboratório

- **Arquivo:** `src/pages/Dentist/ChatLab.tsx`
- **Rota:** `/dentist/chat-lab`
- **Origem da Navegação:** Menu lateral, botões na tela de Casos e na pasta do paciente.

#### (b) Informações Exibidas

- **Cabeçalho:**
  - Título: `"Chat Direto com o Laboratório"`
  - Badge: `"Canal Técnico MWS"`.
  - Subtítulo: `"Comunicação em tempo real com os planejadores digitais e técnicos responsáveis pelos seus casos."`
- **Coluna Esquerda — Lista de Canais Contextualizados (`MOCK_CHANNELS`):**
  - Busca por caso ou técnico.
  - Canais por paciente/caso:
    - `Maria Silva (CAS-2026-001)` — Técnico: Dr. Alexandre (Técnico Lab 3D).
    - `João Santos (CAS-2026-002)` — Técnica: Dra. Camila (Planejadora Digital).
    - `Ana Costa (CAS-2026-003)` — Central de Logística MWS.
    - `Suporte Técnico Geral Lab` — Plantão Clínico MWS.
    - Canais adicionais criados dinamicamente via query params.
- **Coluna Direita — Área de Mensagens:**
  - Cabeçalho da conversa com identificação do paciente, código do caso e técnico responsável.
  - Botão de atalho `"Abrir no 3D"` com simulação via toast.
  - Linha do tempo de mensagens: balões do ortodontista (à direita) e do técnico/laboratório (à esquerda).
  - Suporte a anexos visuais (ex.: `setup_v2_ajuste_torque.png` de 1.8 MB).
  - Campo de digitação de texto com botão de clipe para anexos e botão de envio (`Send`).

#### (c) Funcionalidades

- Trocar mensagens técnicas com a equipe do Laboratório Central.
- Receber simulações e prints de setup 3D.
- Auto-resposta inteligente simulada do laboratório após 1.5s do envio.
- Abertura de canal contextualizado automaticamente via URL (`?caseId=...&patient=...`).

#### (d) Navegações

- Sem links de saída de rota; comunicação fluida dentro da mesma tela.

#### (e) Disposição / Layout

- Layout de mensageria moderno com duas colunas integradas de 4/12 (canais) e 8/12 (chat ativo).

---

### 2.4. Telas de Pacientes (Gestão, Status e Pasta Individual)

#### 2.4.1. Tela: Pacientes (Gestão Geral)

- **Arquivo:** `src/pages/Dentist/Patients.tsx`
- **Rota:** `/dentist/patients`
- **Informações Exibidas:**
  - Card Destaque: Total de Pacientes (`10` pacientes na base) com tag `"100% ativos na base"`.
  - 4 Cards Clicáveis de Status:
    1. _Em Planejamento_ (`2` casos) — Casos no laboratório aguardando aprovação 3D.
    2. _Planejados_ (`1` caso) — Aprovados aguardando início/instalação.
    3. _Em Tratamento_ (`6` pacientes) — Aparelho lingual instalado em manutenções.
    4. _Concluídos_ (`1` concluído) — Tratamento finalizado com alta clínica.
  - Tabela / Lista Geral com os 10 pacientes com nome, protocolo, idade, telefone, data de início e badge de manutenção atual (ex.: `3ª Manutenção`).
- **Navegações:**
  - Cards de status navegam para `/dentist/patients/status/[status]`.
  - Botão `"Abrir Pasta"` navega para `/dentist/patients/[id]`.

#### 2.4.2. Tela: Pacientes por Status

- **Arquivo:** `src/pages/Dentist/PatientStatusList.tsx`
- **Rota:** `/dentist/patients/status/:status`
- **Informações Exibidas:**
  - Breadcrumb de navegação (`Pacientes > Status > [Nome do Status]`).
  - Hero com contagem e descrição do estado clínico selecionado.
  - Abas rápidas para alternar entre os outros 3 status.
  - Listagem filtrada com busca por texto.
- **Navegações:**
  - Botão de retorno para `/dentist/patients`.
  - Botão `"Abrir Pasta Individual"` para `/dentist/patients/:id`.

#### 2.4.3. Tela: Pasta Individual do Paciente & Ciclo de Manutenções

- **Arquivo:** `src/pages/Dentist/PatientDetail.tsx`
- **Rota:** `/dentist/patients/:id`
- **Informações Exibidas:**
  - Card de identificação do paciente com foto, protocolo, idade, contatos e data de início.
  - Botões de atalho: `"Prontuário Digital"` (`/dentist/medical-record`) e `"Chat Laboratório"` (`/dentist/chat-lab`).
  - **Bloco Oficial de Manutenções:**
    - Exibe a manutenção vigente (ex.: `3ª Manutenção`) e régua de 1 a 6 do ciclo lingual padrão.
    - Botão `"Registrar Nova Manutenção"` (abre Dialog para preenchimento de procedimento, notas clínicas e data de retorno).
    - Linha do tempo com histórico detalhado de todas as manutenções já realizadas pelo paciente.
- **Funcionalidades:**
  - Registrar a próxima manutenção do paciente, salvando instantaneamente no histórico individual com feedback via toast.

---

### 2.5. Telas Financeiras do Ortodontista

#### 2.5.1. Tela: Painel Financeiro

- **Arquivo:** `src/pages/Dentist/Financing.tsx`
- **Rota:** `/dentist/financing` (e `/financing`)
- **Informações Exibidas:**
  - Badge do mês fixo de referência: `Fevereiro/2026 (Fixo)`.
  - Botões de ação: `"Extrato"` (abre `FinancialStatementModal`) e `"Solicitar Saque"` (dispara toast).
  - **As 4 Caixas da Sequência Lógica Oficial:**
    1. _Faturamento Bruto:_ `R$ 44.500,00` (+18.4% vs mês anterior).
    2. _Custos de Laboratório:_ `R$ 13.800,00` (split de fabricação 3D sem bitributação).
    3. _Resultado Mensal Bruto:_ `R$ 30.700,00` (Faturamento Bruto − Custos Lab).
    4. _Resultado de Manutenções:_ `+R$ 500,00` (4 créditos de R$ 250 e 2 débitos de R$ 250) — **Card Clicável com link para `/dentist/financing/manutencoes`**.
  - Faixa explicativa do **Total Líquido Consolidado do Mês:** `R$ 31.200,00` (Resultado Mensal Bruto + Resultado de Manutenções).
  - Tabela de Transações & Orçamentos:
    - Coluna _Forma de Pagamento_ estritamente com badges `Particular` ou `MWS` (com botão clicável para inspecionar split via fintech).
    - Preço sugerido MWS vs. Preço cobrado.
- **Navegações:**
  - Clicar no card 4 ou no botão da faixa → `/dentist/financing/manutencoes`.
  - Clicar em Extrato → abre modal na mesma tela.

#### 2.5.2. Tela: Resultado de Manutenções (Extrato Detalhado de R$ 250)

- **Arquivo:** `src/pages/Dentist/MaintenanceDetails.tsx`
- **Rota:** `/dentist/financing/manutencoes`
- **Informações Exibidas:**
  - Breadcrumb com link de retorno para `/dentist/financing`.
  - **Banner explicativo da Regra de Negócio MWS:**
    - _Crédito de R$ 250,00:_ ao atender paciente em trânsito de outro ortodontista.
    - _Débito de R$ 250,00:_ quando um paciente seu é atendido por outro colega da rede credenciada.
  - 3 Cards de Resumo: Total em Créditos (`R$ 1.000,00`), Total em Débitos (`R$ 500,00`) e Resultado Líquido (`+R$ 500,00`).
  - Tabela analítica com ID da transação, data, paciente, ortodontista parceiro, procedimento, valor unitário e status liquidado.
- **Funcionalidades:**
  - Filtrar lançamentos por tipo (`Todos`, `Créditos`, `Débitos`), busca por nome e mês de fechamento.
  - Exportação de extrato em CSV/PDF via toast.

---

### 2.6. Demais Telas do Perfil Ortodontista

- **Agenda (`/dentist/agenda`):** Visualização de consultas diárias e semanais, horários de instalação de fios e retornos.
- **Prontuário Digital (`/dentist/medical-record`):** Histórico de procedimentos com suporte a registro de nova evolução clínica, etapa atual e orientações ao paciente.
- **SLAs (`/dentist/slas`):** Painel de conformidade dos prazos de entrega do Laboratório Central MWS.
- **Programas (`/dentist/programs`):** Vantagens da rede credenciada, pontuação e descontos em lotes fabris.
- **Qualidade (`/dentist/quality`):** Avaliações de NPS dos pacientes atendidos e índices de sucesso biomecânico.
- **Escola MWS (`/dentist/school`):** Catálogo de aulas e módulos sobre técnica lingual de 3ª geração.
- **Comunidade (`/dentist/community`):** Fórum científico com publicações de casos clínicos, fotos pré e pós e discussões técnicas.
- **Indicações (`/dentist/referrals`):** Rede de mobilidade geográfica e encaminhamento intermunicipal de pacientes.
- **Perfil Público (`/dentist/public-profile` ou `/dentist/profile`):** Página com visual profissional do consultório, fotos de casos, endereço e avaliações dos pacientes.
- **Configurações (`/dentist/settings`):** Dados de faturamento, horários de atendimento da clínica e segurança.

---

## 3. Padrão Visual Aplicado ao Perfil Ortodontista

- **Cores Principais:**
  - Verde Escuro / Institucional MWS (`#0d3b2e` / `emerald-900`): sidebar de navegação, cabeçalhos, botões primários de ação clínica e badges de aprovação.
  - Acento Dourado / Ouro Metálico (`#c69214` / `amber-500` / `border-amber-300`): destaques de escolha de mentor, alertas de preferência e estrelas de reputação.
  - Azul Técnico (`blue-600` / `blue-50`): canais do chat laboratorial e custos de fabricação 3D.
  - Roxo / Violeta (`purple-600` / `purple-50`): etapas de aprovação de planejamento e manutenções ativas do paciente.
  - Fundo Claro (`bg-slate-50` / `white`): contraste clínico limpo e agradável.
- **Componentes de Marca:**
  - `MWSLogo`: exibição oficial na sidebar com o símbolo circular dourado e inscrição "MAGIC WIRE SYSTEM".
  - Badges semânticos de protocolo (Classe I a V) e identificação de manutenções.

---

## 4. Dados Mockados vs. Backend Real

- **Dados Atuais (Mockados em `src/pages/Dentist/`):**
  - `MOCK_CLINICAL_CASES` em `Cases.tsx`: 6 casos detalhados com notas de ortodontista, laboratório e mentor.
  - `mockPatients.ts`: os 10 pacientes da base com status e histórico de manutenções.
  - `financingData.ts`: métricas do mês fixo de Fevereiro/2026 e lançamentos de R$ 250 de manutenções compartilhadas.
  - `mockData.ts` de Mentores: sincronizado para carregar disponibilidade e o toggle de escolha de mentor.
- **Integração com PocketBase:**
  - Autenticação via `users` (`role === 'dentist'`).
  - Em produção, integra-se com as coleções `dentists`, `patients`, `clinical_cases`, `financial_records`, `maintenance_transactions` e `chat_messages`.
