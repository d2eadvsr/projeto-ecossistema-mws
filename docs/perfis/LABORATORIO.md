# Documentação de Engenharia Reversa — Perfil Laboratório

**Perfil:** Laboratório Central MWS (Esteira Técnica, Planejamento & Manufatura Robótica)  
**Rota Base:** `/lab`  
**Credencial de Teste:** `lab@magicwire.com` / `Skip@Pass`  
**Role no Sistema:** `lab`  
**Versão Documentada:** `v0.0.45` (conforme `package.json`)  
**Data da Documentação:** Fevereiro de 2026

---

## 1. Menu e Navegação do Perfil

No componente principal de navegação (`src/components/Navigation.tsx`), a sidebar e bottom nav do perfil `lab` contam com 7 itens especializados na esteira industrial e ortodôntica:

| Ordem | Rótulo Exibido        | Rota              |       Ícone       | Descrição                                                         |
| :---: | :-------------------- | :---------------- | :---------------: | :---------------------------------------------------------------- |
|   1   | **Painel Geral**      | `/lab`            | `LayoutDashboard` | Visão executiva de volumes, alertas de SLA e produtividade diária |
|   2   | **Fila de Casos**     | `/lab/cases`      |   `FolderOpen`    | Esteira oficial de 4 status com visão Kanban e Tabela             |
|   3   | **Planejamentos 3D**  | `/lab/planning`   |  `FlaskConical`   | Setup virtual, diagramação de dobras linguais e parecer técnico   |
|   4   | **Produção Robótica** | `/lab/production` |       `Cpu`       | Células CNC multieixo conformando fios Copper NiTi e TMA          |
|   5   | **Equipe Técnica**    | `/lab/team`       |      `Users`      | Técnicos e projetistas de colagem indireta                        |
|   6   | **Indicadores SLA**   | `/lab/sla`        |      `Clock`      | Metas de 48h/72h e conformidade de prazos                         |
|   7   | **Configurações**     | `/lab/settings`   |    `Settings`     | Parâmetros de fábrica, impressoras 3D e integrações               |

---

## 2. Detalhamento por Tela

### 2.1. Tela: Painel Geral (Dashboard do Laboratório)

- **Arquivo:** `src/pages/Lab/Dashboard.tsx`
- **Rota:** `/lab`
- **Origem da Navegação:** Login com role `lab` (`/login`), item "Painel Geral" na barra de navegação, ou redirecionamento de `/dashboard`.

#### (b) Informações Exibidas

- **Cabeçalho:**
  - Título: `"Painel de Controle do Laboratório MWS"`
  - Subtítulo: `"Visão executiva da esteira técnica, planejamento e produção robótica de Fios Mágicos."`
  - Badge superior: `"Laboratório Central Brasil • São Paulo/SP"`.
- **4 Cards de KPIs de Volume & Operação:**
  1. _Total de Casos na Esteira:_ contagem total de casos ativos (ex.: 24 casos).
  2. _Casos em Análise Técnica:_ casos sob revisão dos técnicos projetistas (ex.: 8 casos).
  3. _Lotes em Fabricação Robótica:_ ordens nas células CNC de dobra de fios (ex.: 6 ordens).
  4. _Conformidade Geral de SLA:_ taxa percentual de entrega no prazo (ex.: 96.4%).
- **Gráficos e Indicadores Visuais:**
  - _Distribuição por Status da Esteira:_ barras com volume em `Aguardando Análise Técnica`, `Em Análise Técnica`, `Planejamento Elaborado` e `Planejamento Entregue`.
  - _Produtividade Semanal do Laboratório:_ curva de casos recebidos vs. planejamentos finalizados nos últimos 7 dias.
- **Tabela de Casos Críticos / Próximos do Vencimento de SLA:**
  - Exibição dos casos com menos de 12h de SLA ou atrasados, com indicação de paciente, ortodontista solicitante e mentor atribuído.
- **Atalhos Rápidos de Operação:**
  - Botões de acesso direto: `"Ver Fila de Casos Completa"`, `"Acessar Planejamento 3D"`, `"Células Robóticas"`.

#### (c) Funcionalidades

- Monitoramento em tempo real do fluxo de casos clínicos recebidos dos ortodontistas credenciados.
- Identificação instantânea de gargalos operacionais e alertas visuais de SLA.
- Navegação em um clique para as etapas especializadas do laboratório.

#### (d) Navegações

- Botão `"Ver Fila de Casos Completa"` → `/lab/cases`.
- Botão `"Acessar Planejamento 3D"` → `/lab/planning`.
- Botão `"Células Robóticas"` → `/lab/production`.

#### (e) Disposição / Layout

- Grid de 4 KPIs no topo.
- Duas colunas com gráficos de status e produtividade.
- Card inferior largo com tabela de casos prioritários.

---

### 2.2. Tela: Fila de Casos / Esteira Técnica MWS

- **Arquivo:** `src/pages/Lab/Cases.tsx`
- **Rota:** `/lab/cases`
- **Origem da Navegação:** Menu lateral "Fila de Casos" ou links no Dashboard do Laboratório.

#### (b) Informações Exibidas

- **Cabeçalho:**
  - Título: `"Fila de Casos / Esteira Técnica MWS"`
  - Subtítulo: `"Fluxo oficial de 4 status: Aguardando Análise → Em Análise → Planejamento Elaborado → Planejamento Entregue."`
  - Alternador de visualização: botões `"Visão Kanban"` e `"Visão Tabela (N)"`.
- **Barra de Filtros e Busca:**
  - Input de busca por código (`CAS-2026-...`), paciente, ortodontista ou cidade.
  - Botões de filtro por Protocolo MWS: `Todos`, `Classe I`, `Classe II`, `Classe III`, `Classe IV`, `Classe V`.
- **Visão KANBAN (4 Colunas Oficiais MWS):**
  1. _Coluna 1: Aguardando Análise Técnica (Cinza/Slate)_
     - Cards de casos recém-submetidos pelo ortodontista.
     - Botão no card: `"Iniciar Análise"` (avança para Em Análise Técnica).
  2. _Coluna 2: Em Análise Técnica (Âmbar/Amarelo)_
     - Casos sob estudo cefalométrico e colagem virtual pelo técnico.
     - Botão no card: `"Concluir Planejamento"` (avança para Planejamento Elaborado).
  3. _Coluna 3: Planejamento Elaborado (Roxo/Purple)_
     - Casos prontos aguardando aprovação clínica final do ortodontista.
     - Botão no card: `"Marcar como Entregue"` (avança para Planejamento Entregue).
  4. _Coluna 4: Planejamento Entregue (Verde/Emerald)_
     - Casos aprovados e prontos para liberação fabril.
     - Badge no card: `"Entregue • Robô Liberado"`.
- **Conteúdo Interno de Cada Cartão Kanban:**
  - Código do caso (ex.: `CAS-2026-001`).
  - Badge de SLA: `"SLA Atrasado"` (vermelho), `"SLA: Nh"` (laranja) ou data de prazo.
  - Nome do paciente e idade.
  - Nome do ortodontista solicitante e cidade/UF.
  - Badges do Protocolo MWS e tipo de liga lingual recomendada.
  - Mentor clínico atribuído.
  - Botão `"Ver Detalhes"` com ícone de olho.
- **Visão em Tabela Alternativa:**
  - Colunas: Código, Paciente, Ortodontista Demandante, Protocolo, Status Oficial, Mentor Responsável, SLA e Ações.
- **Modal / Drawer de Detalhes Técnicos e Clínicos do Caso:**
  - Cabeçalho com ID, paciente, ortodontista demandante e CRO.
  - Barra de transição rápida de status da esteira.
  - Visualização de exames e arquivos STL recebidos.
  - _Campos de Edição do Laboratório:_
    - Seletor de Técnico Projetista Responsável.
    - Seletor de Mentor Responsável (Dr. Breno, Dr. Aldir, Dr. Flávio).
    - Campo de Notas Técnicas do Laboratório (`technicianNotes`): orientações para a colagem indireta e sequência de arcos.
    - Campo de Parecer Clínico do Mentor (`mentorClinicalNotes`).
  - Botão `"Salvar Alterações"` com feedback via toast.

#### (c) Funcionalidades

- Alternar instantaneamente entre a esteira visual Kanban e a listagem em Tabela.
- Filtrar casos em tempo real por protocolo e busca textual.
- Avançar status dos casos diretamente nos botões rápidos de cada coluna.
- Atribuir técnicos e mentores a casos clínicos.
- Preencher notas técnicas e salvar alterações sincronizadas no estado do laboratório.

#### (d) Navegações

- Sem links externos; modais abrem sobre a mesma tela.
- Integração direta com a tela de Produção Robótica após aprovação do caso.

#### (e) Disposição / Layout

- Layout Kanban em 4 colunas responsivas com rolagem vertical independente por coluna.
- Tabela zebrada e responsiva no modo lista.
- Modal largo com formulário em 2 colunas.

---

### 2.3. Tela: Planejamentos 3D (Setup Virtual & Biomecânica Lingual)

- **Arquivo:** `src/pages/Lab/Planning.tsx`
- **Rota:** `/lab/planning`
- **Origem da Navegação:** Menu "Planejamentos 3D" ou botão no Dashboard do Laboratório.

#### (b) Informações Exibidas

- **Cabeçalho:**
  - Título: `"Estação de Planejamento 3D & Setup Lingual"`
  - Subtítulo: `"Diagramação digital das dobras robóticas e validação do posicionamento dos stops linguais."`
  - Indicador: `"Módulo CAD/CAM MWS Lingual Studio v4.2"`.
- **Grid de Casos em Fase de Modelagem 3D:**
  - Seleção do caso em planejamento ativo.
  - Card com dados do paciente, telerradiografia e arquivos STL associados.
- **Simulador / Visualizador de Diagramação Lingual (Mockado):**
  - Arcada Superior e Inferior com marcação dos dentes e posições dos braquetes/stops linguais.
  - Tabela de Sequência de Arcos Programados:
    - 1º Arco: `0.012 Copper NiTi` (Alinhamento inicial / forças ultra-leves).
    - 2º Arco: `0.014 NiTi com Curva de Spee reversa`.
    - 3º Arco: `0.016x0.022 TMA Robótico` (Controle de torque e fechamento de espaços).
    - 4º Arco: `0.017x0.025 Aço Inox Lingual` (Finalização e estabilização).
- **Quadro de Parecer Técnico do Projetista:**
  - Parâmetros de colagem indireta, espessura da moldeira de transferência e guias de inserção.
- **Ações:**
  - `"Aprovar Diagramação 3D"`
  - `"Exportar G-Code para Célula Robótica CNC"`
  - `"Solicitar Revisão do Mentor Clínico"`

#### (c) Funcionalidades

- Simular e revisar a sequência de fios linguais customizados.
- Enviar arquivos técnicos para o robô de conformação CNC.
- Notificar o mentor do caso com solicitação de parecer clínico formal.

#### (d) Navegações

- Clicar em exportar direciona o caso para `/lab/production`.

#### (e) Disposição / Layout

- Layout em split-view: visualização digital/simulação à esquerda e parâmetros técnicos/formulário à direita.

---

### 2.4. Tela: Produção Robótica (Células CNC de Fios Mágicos)

- **Arquivo:** `src/pages/Lab/Production.tsx`
- **Rota:** `/lab/production`
- **Origem da Navegação:** Menu "Produção Robótica" ou atalho do Dashboard.

#### (b) Informações Exibidas

- **Cabeçalho:**
  - Selo pulsante: `"Manufatura Robótica CNC de Fios Mágicos"`
  - Título: `"Produção dos Fios Mágicos MWS"`
  - Subtítulo: `"Fila de fabricação robótica dos fios linguais customizados a partir dos planejamentos aprovados pelos ortodontistas."`
  - Badge de contagem: `"Total em Produção: N lotes"`.
- **Caixa Informativa da Tecnologia Industrial:**
  - Destaque com ícone `Cpu`:
    _"Os Fios Mágicos MWS são fabricados a partir de ligas avançadas de Níquel-Titânio enriquecido com Cobre (Copper NiTi) e Titânio-Molibdênio (TMA). Dobrados por células robóticas multieixo, são instalados pelo lado interno dos dentes, garantindo estética invisível real e movimentação biomecânica contínua com forças ultra-leves e biocompatíveis."_
- **Barra de Busca:**
  - Campo para pesquisar por lote (`ROB-2026-...`), paciente, caso clínico ou célula robótica.
- **Esteira de 4 Etapas da Produção Robótica:**
  1. _Etapa 1: Fila de Conformação CNC (`fila_cnc`)_ — Aguardando carga do diagrama G-Code na célula robótica. Botão: `"Iniciar Conformação"`.
  2. _Etapa 2: Conformação Robótica em Andamento (`conformacao_robotica`)_ — Braço robótico multieixo dobrando os arcos lingual superior e inferior. Botão: `"Finalizar e Ir p/ CQ"`.
  3. _Etapa 3: Tratamento Térmico & Controle de Qualidade (`tratamento_termico_cq`)_ — Validação dimensional ótica e termofixação da memória de forma. Botão: `"Liberar p/ Expedição"`.
  4. _Etapa 4: Pronto para Expedição (`pronto_expedicao`)_ — Embalado em envelope estéril com código de barras, pronto para envio ao consultório. Badge: `"Pronto p/ Expedição (Time ADM)"`.
- **Conteúdo dos Cards de Lotes de Produção:**
  - Código do lote de fabricação (ex.: `ROB-2026-001`).
  - Badge de prioridade: `Urgente` (vermelho), `Alta` (laranja) ou `Normal`.
  - Nome do paciente e código do caso clínico vinculado (`CAS-2026-...`).
  - Ortodontista e cidade.
  - Box com detalhes da liga: ex.: `Copper NiTi 35°C Ativo`, `Sup: 0.014 Lingual`, `Inf: 0.014 Lingual`.
  - Identificação da máquina: ex.: `Célula Robótica KUKA-02` e técnico operador.
- **Modal de Detalhe da Ordem Robótica:**
  - Exibe histórico completo, horários de início e término estimado, calibres exatos e assinatura técnica.

#### (c) Funcionalidades

- Avançar lotes de produção entre as 4 etapas industriais com um clique.
- Visualizar detalhes micrométricos de cada lote de fios linguais.
- Filtrar ordens ativas por busca instantânea.

#### (d) Navegações

- Sem redirecionamentos; atualizações ocorrem inline com feedback via toast.

#### (e) Disposição / Layout

- 4 colunas de esteira industrial lado a lado no desktop.
- Cards brancos com detalhes técnicos em caixas cinzas e verdes.

---

### 2.5. Tela: Equipe Técnica (Técnicos & Projetistas MWS)

- **Arquivo:** `src/pages/Lab/Team.tsx`
- **Rota:** `/lab/team`
- **Origem da Navegação:** Menu lateral "Equipe Técnica".

#### (b) Informações Exibidas

- **Cabeçalho:**
  - Título: `"Equipe Técnica & Operadores do Laboratório"`
  - Subtítulo: `"Especialistas em setup digital, colagem indireta e operadores de células robóticas de conformação."`
- **Grid de Membros da Equipe Técnica (`MOCK_LAB_TEAM`):**
  - Cada cartão exibe:
    - Avatar e nome do profissional (ex.: `Lucas Takahashi`, `Renata Meireles`, `Carlos Eduardo Pinheiro`).
    - Cargo / Função: `Projetista Sênior CAD/CAM`, `Técnica em Colagem Indireta Lingual`, `Especialista em Robótica CNC`.
    - Turno de trabalho e status de disponibilidade (`Disponível`, `Em Operação de Célula`, `Pausa`).
    - Total de casos planejados no mês e taxa de acerto dimensional (ex.: 99.2%).
- **Métricas da Equipe:**
  - Capacidade instalada do laboratório: até 120 planejamentos/mês por turno.

#### (c) Funcionalidades

- Consultar a escala e ocupação dos técnicos do laboratório.
- Identificar o responsável técnico por cada tipo de procedimento lingual.

#### (d) Navegações

- Links para atribuir casos na tela de casos (`/lab/cases`).

#### (e) Disposição / Layout

- Grid responsivo de 3 colunas de cards com foto, badges de competência e estatísticas.

---

### 2.6. Tela: Indicadores SLA (Metas de Qualidade & Entrega)

- **Arquivo:** `src/pages/Lab/Sla.tsx`
- **Rota:** `/lab/sla`
- **Origem da Navegação:** Menu lateral "Indicadores SLA".

#### (b) Informações Exibidas

- **Cabeçalho:**
  - Título: `"Indicadores de SLA & Cumprimento de Prazos"`
  - Subtítulo: `"Métricas de tempo de resposta da análise técnica, elaboração de planejamento e fabricação robótica."`
- **3 Metas Oficiais de SLA do Laboratório Central:**
  1. _Triagem & Análise Inicial:_ Meta de até `24 horas` úteis (Índice atual: 98.2% dentro do prazo).
  2. _Elaboração do Planejamento 3D:_ Meta de até `48 horas` úteis (Índice atual: 95.8% dentro do prazo).
  3. _Conformação Robótica e Liberação Fabril:_ Meta de até `72 horas` úteis (Índice atual: 97.1% dentro do prazo).
- **Tabela de Auditoria de Desvios de Prazo:**
  - Relação de casos que extrapolaram a meta com justificativa técnica registrada (ex.: necessidade de reescaneamento pelo ortodontista ou ajuste de ancoragem solicitado pelo mentor).

#### (c) Funcionalidades

- Avaliação contínua dos índices de eficiência operacional do laboratório.
- Filtragem de desvios por motivo e período.

#### (d) Navegações

- Links para abrir o prontuário dos casos em atraso.

#### (e) Disposição / Layout

- Grid de cards de metas no topo e tabela analítica de auditoria na base.

---

### 2.7. Tela: Configurações do Laboratório

- **Arquivo:** `src/pages/Lab/Settings.tsx`
- **Rota:** `/lab/settings`
- **Origem da Navegação:** Menu lateral "Configurações".

#### (b) Informações Exibidas

- **Cabeçalho:**
  - Título: `"Configurações Operacionais do Laboratório"`
  - Subtítulo: `"Parâmetros técnicos de robôs CNC, impressoras 3D e integrações de arquivos STL."`
- **Seção de Células Robóticas CNC:**
  - Status das máquinas: `KUKA KR 6 R900 (Ativa)`, `ABB IRB 1200 (Ativa)`, `FANUC LR Mate (Manutenção Preventiva)`.
  - Calibração de eixos e diâmetros de fios suportados (`0.012` até `0.021x0.025`).
- **Parâmetros de Tolerância Micrométrica:**
  - Definição de tolerância dimensional aceitável (padrão: `±0.02 mm`).
- **Integração de Escaneamentos:**
  - Pastas de sincronização de escâneres intraorais (iTero, 3Shape, Medit, Carestream).

#### (c) Funcionalidades

- Alterar parâmetros operacionais e salvar preferências de calibragem.

#### (d) Navegações

- Sem navegação externa.

#### (e) Disposição / Layout

- Formulário modular em cartões verticais com switches e seletores.

---

## 3. Padrão Visual Aplicado ao Perfil Laboratório

- **Cores Principais:**
  - Verde Institucional MWS (`#0d3b2e` / `emerald-900`): menu lateral, testeira superior, botões de avanço de etapa e badges de liberação fabril.
  - Cinza Industrial & Slate (`slate-900`, `slate-700`, `slate-100`): cabeçalhos de tabelas, cartões de ordens robóticas e estrutura das colunas Kanban.
  - Âmbar / Ouro MWS (`amber-500` / `amber-100`): alertas de SLA e fases de análise clínica do mentor.
  - Roxo Técnico (`purple-600` / `purple-100`): status de planejamento elaborado aguardando validação ortodôntica.
  - Fundo Claro (`bg-slate-50` / `white`): máxima nitidez para manuseio técnico contínuo.
- **Componentes de Marca:**
  - `MWSLogo`: exibição do logotipo oficial com emblema dourado e inscrição em caixa alta.
  - Badges de calibres e materiais com visual de etiqueta industrial.

---

## 4. Dados Mockados vs. Backend Real

- **Dados Atuais (Mockados em `src/pages/Lab/mockData.ts`):**
  - `MOCK_LAB_CASES`: relação de 6 casos detalhados com histórico de SLA, ortodontista, mentor e notas técnicas.
  - `MOCK_ROBOTIC_ORDERS`: 6 lotes de produção robótica nas etapas fabris.
  - `MOCK_LAB_TEAM`: 6 profissionais da equipe técnica.
  - `MOCK_LAB_SLAS` e `MOCK_LAB_WEEKLY_PRODUCTIVITY`: métricas de performance.
- **Integração com PocketBase:**
  - Autenticação via `users` (`role === 'lab'`).
  - Em produção, alimenta-se das coleções `clinical_cases`, `robotic_orders`, `lab_team` e `sla_logs`.
