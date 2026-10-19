# Perfil: Time ADM MWS (Administração Geral da Plataforma)

> **Documento de Engenharia Reversa do Perfil Time ADM MWS**  
> **Versão do Projeto:** 0.0.46+  
> **Data:** 03/03/2026  
> **Status:** Documentação canônica derivada por leitura do código-fonte e componentes em `src/pages/Admin/`, `src/App.tsx`, `src/components/Navigation.tsx` e `src/components/Layout.tsx`.  
> **Regra Terminológica Estrita:** É terminantemente proibido o uso dos termos proibidos pela plataforma MWS. Utiliza-se exclusivamente **Fio Mágico / Fio Lingual Customizado MWS** e **Ortodontista**.

---

## 1. Identificação e Autenticação do Perfil

- **Perfil no Sistema:** Time ADM MWS (`admin`)
- **Login de Teste (Atalho Rápido na Tela `/login`):**
  - **Identificador / E-mail:** `adm_mws` (ou botão de preenchimento rápido "Time ADM MWS")
  - **Senha de Teste:** `Skip@Pass`
  - **Role de Acesso:** `admin` (armazenado em `localStorage.getItem('mws_user')` e gerenciado via `useAuth`)
- **Ponto de Entrada Inicial:** `/admin` (redirecionado automaticamente para `AdminDashboard` via rota protegida `ProtectedRoute` com `allowedRoles={['admin']}`).

---

## 2. Menu Completo do Perfil na Sidebar

O menu do Time ADM MWS é renderizado condicionalmente pelo componente `src/components/Navigation.tsx` quando `user.role === 'admin'`. O layout padrão utiliza a sidebar fixa desktop com fundo verde escuro MWS (`#0d3b2e`), logotipo dourado com símbolo geométrico e escrita "MAGIC WIRE SYSTEM", badges de apoio e menu colapsável em dispositivos móveis.

### Lista Canônica de Itens de Menu (Ordem Exibida na Sidebar)

| #   | Rótulo no Menu             | Rota (`path`)          | Ícone Lucide      | Componente React       | Descrição Funcional                                                                                                                                                                                                                                   |
| --- | -------------------------- | ---------------------- | ----------------- | ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | **Dashboard Geral**        | `/admin`               | `LayoutDashboard` | `AdminDashboard`       | Visão executiva consolidada: KPIs da rede, pipeline de esteira laboratorial, evolução gráfica mensal e fila de ações imediatas.                                                                                                                       |
| 2   | **Ortodontistas**          | `/admin/ortodontistas` | `Users`           | `AdminDentists`        | Gestão de credenciamento dos 182 licenciados, avaliação de fichas de adesão, fluxo de contratos CLM (minuta c1, disparo c2, validação c4) e moderação de perfis públicos.                                                                             |
| 3   | **Mentores MWS**           | `/admin/mentores`      | `GraduationCap`   | `AdminMentors`         | Gestão do corpo docente sênior, cadastro/edição de mentores, períodos de bloqueio/férias e toggle global da regra de atribuição ("Permitir escolha de mentor pelo ortodontista").                                                                     |
| 4   | **Supervisão de Casos**    | `/admin/casos`         | `FileText`        | `AdminCases`           | Monitoramento dos 54 casos clínicos na esteira, catalogação com metadados para IA (ref. b6 da planilha), mentores responsáveis e emissão de boletos laboratoriais (ref. b91).                                                                         |
| 5   | **Pacientes & Mobilidade** | `/admin/mobilidade`    | `MapPin`          | `AdminPatientsLeads`   | Gestão de leads comerciais da plataforma (450 no funil, atribuição geográfica) e governança completa do fluxo de mobilidade de pacientes em viagem (agendamento na nova localidade, liberação temporária de prontuário, split de R$ 250 e revogação). |
| 6   | **Financeiro & Split**     | `/admin/financeiro`    | `DollarSign`      | `AdminFinancial`       | Conciliação de taxas de licenciamento (R$ 24k por ortodontista), boletos emitidos/liquidados e regra de split da 1ª consulta (R$ 100 ortodontista / R$ 50 marketing Murilo / R$ 50 vendas locais).                                                    |
| 7   | **Logística de Fios**      | `/admin/logistica`     | `Truck`           | `AdminLogistics`       | Rastreamento e liberação de expedição física de Kits de Fios Linguais Customizados e templates de colagem robótica via transportadoras e portadores próprios.                                                                                         |
| 8   | **Programas de Expansão**  | `/admin/programas`     | `Megaphone`       | `AdminPrograms`        | Gestão de ofertas e retornos dos pacotes de expansão: Programa de MKT & Vendas (parceria Murilo) e Programa de Gestão de Consultório (integração via API homologada).                                                                                 |
| 9   | **Qualidade & SLAs**       | `/admin/qualidade`     | `ShieldCheck`     | `AdminQuality`         | Monitoramento contínuo de satisfação dos pacientes (NPS 88 na Zona de Excelência por marcos: 1ª consulta b16, manutenções b19 e conclusão b21), tempos de resposta ADM e SLA do laboratório.                                                          |
| 10  | **Escola & Fórum**         | `/admin/escola`        | `BookOpen`        | `AdminSchoolCommunity` | Gestão dos cursos EAD de certificação oficial da técnica lingual MWS, cronograma de imersões presenciais hands-on em SP e moderação do fórum clínico com fixação de tópicos.                                                                          |

> **Nota sobre rotas adicionais registradas em `App.tsx`:**
>
> - `/admin/rbac` (`AdminRBAC`): Tela de console da matriz de papéis e perfis RBAC (RNF-044). Acessível via rota direta.
> - O componente `AdminLab` existe em `src/pages/Admin/Lab.tsx` como protótipo kanban do laboratório interno, mas a esteira de casos oficial do admin opera em `/admin/casos` (`AdminCases`).

---

## 3. Padrão Visual e Identidade da Marca MWS

Todas as telas do perfil Time ADM MWS seguem a diretriz institucional obrigatória:

1. **Fundo Claro das Telas:** `bg-slate-50` ou `bg-background` (`#f8fafc` / `#ffffff`), assegurando legibilidade de tabelas, relatórios e dashboards analíticos.
2. **Verde Escuro MWS (`#0d3b2e` / `#124d3d` / `#082019`):** Restrito estritamente a testeiras de destaque, sidebars institucionais, rodapés e botões primários de ação (`bg-primary`, botões de aprovação e filtros selecionados).
3. **Acentos em Dourado Metálico / Ouro MWS:** Utilizados em contornos sutis (`border-gold/30`), ícones nobres, badges de destaque de governança e gradientes dos avatares de mentores seniores.
4. **Logotipo MWS institucional:** Componente centralizado `MWSLogo` em SVG vetorial de precisão, composto pelo pictograma geométrico em gradiente dourado metálico e o lettering estilizado `"MAGIC WIRE SYSTEM"` com o subtítulo `"INVISIBLE LINGUAL ORTHODONTICS"`.
5. **Tipografia e Badges Técnicos:** Uso extensivo de fontes monoespaçadas para códigos de protocolo, CROs, números de remessa e boletos; badges semânticos com paleta verde esmeralda (aprovado/concluído/liquidado), azul (em análise/transporte/API), âmbar (pendente/atenção) e vermelho (documentação pendente/atrasado).

---

## 4. Detalhamento Tela a Tela (Por Engenharia Reversa)

---

### 4.1. Dashboard Geral MWS (`/admin` • `AdminDashboard.tsx`)

#### A. Cabeçalho e Identificação

- **Título Literal:** `Painel Geral de Controle MWS`
- **Subtítulo Literal:** `Visão consolidada da rede credenciada de ortodontistas, casos clínicos, esteira laboratorial e saúde financeira da operadora.`
- **Badge Superior:** `Visão Executiva • Ecossistema MWS`

#### B. Métricas e KPIs Principais (4 Cards Superiores)

1. **Rede de Ortodontistas:**
   - Valor: `182`
   - Subtexto: `160 credenciados ativos`
   - Indicador: `+12 este mês` (tendência positiva)
   - Ícone: `Users` (fundo esmeralda)
2. **Faturamento Total MWS:**
   - Valor: `R$ 4.368.000,00`
   - Subtexto: `Adesões (R$24k) + Casos`
   - Indicador: `+18.4% vs mês anterior` (tendência positiva)
   - Ícone: `DollarSign` (fundo azul)
3. **Casos Clínicos na Esteira:**
   - Valor: `54`
   - Subtexto: `100% catalogados p/ IA e Mentoria`
   - Indicador: `3 casos próximos do limite SLA` (alerta âmbar)
   - Ícone: `Layers` (fundo roxo)
4. **NPS Global da Rede:**
   - Valor: `88`
   - Subtexto: `Pacientes e Ortodontistas`
   - Indicador: `Zona de Excelência` (CheckCircle2 verde)
   - Ícone: `ShieldCheck` (fundo esmeralda)

#### C. Pipeline da Esteira Laboratorial MWS

Distribuição canônica dos 54 casos clínicos ativos pelos 4 status canônicos:

- **Aguardando Análise:** `12` (Triagem inicial)
- **Em Análise Técnica:** `18` (Mentoria ativa)
- **Planej. Elaborado:** `14` (Aguardando ortodontista)
- **Planej. Entregue:** `10` (Liberados p/ confecção do fio lingual)

#### D. Gráfico de Evolução

- **Componente:** `BarChart` com `ChartContainer` responsivo (`ResponsiveContainer`).
- **Título:** `Evolução Mensal de Casos e Faturamento (R$ mil)`.
- **Série Temporal (6 meses):**
  - Set/25: 18 casos, R$ 140k
  - Out/25: 24 casos, R$ 195k
  - Nov/25: 32 casos, R$ 260k
  - Dez/25: 41 casos, R$ 330k
  - Jan/26: 48 casos, R$ 390k
  - Fev/26: 54 casos, R$ 445k

#### E. Fila de Ações Imediatas do Time ADM

1. **10 Novas Fichas de Adesão:** Ortodontistas aguardando avaliação de perfil e validação de CRO. Botão: `Avaliar` (redireciona para `/admin/ortodontistas`).
2. **6 Perfis Públicos Submetidos:** Fotos, biografia e endereço para aprovação antes de publicar no portal. Botão: `Revisar` (redireciona para `/admin/ortodontistas`).
3. **2 Mobilidades Geográficas:** Pacientes solicitando manutenção do Fio Mágico em outra localidade/cidade. Botão: `Agendar` (redireciona para `/admin/mobilidade`).
4. **1 Insumo Fio Mágico Pendente:** Aprovar liberação de envio do Kit Lingual Customizado (São Paulo). Botão: `Liberar` (redireciona para `/admin/logistica`).
5. **Métrica de Desempenho:** Tempo médio de resposta ADM: `2.4 horas` (SLA Meta: 4h).

#### F. Módulos Operacionais Rápidos (Cards de Acesso Direto)

- **Financeiro & Split:** Adesões de R$ 24k, Boletos e Repasse R$100 / R$50 (`/admin/financeiro`).
- **Logística & Fios Mágicos:** Rastreamento e aprovação de envio de insumos (`/admin/logistica`).
- **Programas de Expansão:** MKT, Vendas Locais e Gestão Integrada via API (`/admin/programas`).
- **Escola MWS & Fórum:** Moderação de cursos, imersões e comunidade (`/admin/escola`).

---

### 4.2. Gestão de Ortodontistas Licenciados (`/admin/ortodontistas` • `AdminDentists.tsx`)

#### A. Cabeçalho e Filtros

- **Título Literal:** `Gestão de Ortodontistas Licenciados`
- **Subtítulo Literal:** `Avaliação de ficha de adesão, gestão de contratos (CLM), moderação de perfis públicos e credenciamento.`
- **Busca:** Campo de texto por nome, CRO, clínica ou cidade.
- **Botões de Filtro:** `Todos (182)`, `Em Análise`, `Contrato Pendente`, `Credenciados Ativos`.

#### B. KPIs da Base

- **Total na Base Licenciada:** `182` (160 credenciados ativos na rede).
- **Fichas em Análise:** `10` (aguardando validação de perfil e CRO).
- **Contratos Pendentes:** `8` (assinatura digital SaaS em curso).
- **Perfis Públicos p/ Avaliação:** `6` (submetidos pelos ortodontistas).

#### C. Tabela de Ortodontistas Credenciados

Colunas:

1. `Ortodontista / Clínica`: Nome completo e nome fantasia da clínica.
2. `CRO / Região`: Número de registro no CRO e cidade de atendimento.
3. `Taxa R$ 24k`: Badge `Pago (R$ 24k)` ou `Pendente`.
4. `Status Adesão`: Badges `Credenciado` (verde), `Em Análise` (âmbar), `Contrato` (azul) ou `Docs Pendentes` (vermelho).
5. `Contrato (CLM)`: Indicador `Assinado`, `Aguardando`, `Gerado (c1)` ou `Não gerado`.
6. `Perfil Público`: Badge `Publicado`, `Avaliar Perfil` (com efeito de pulso) ou `Rascunho`.
7. `Casos`: Quantidade de casos clínicos ativos do ortodontista.
8. `Ações ADM`:
   - Botão `Ficha` (abre modal de detalhes de adesão).
   - Botão `Perfil` (abre modal de moderação do perfil público quando pendente).
   - Botão `Contrato` (abre modal de fluxo CLM quando não assinado).

#### D. Modais Operacionais da Tela

1. **Modal de Ficha de Adesão do Ortodontista:**
   - Exibe dados cadastrais completos, CRO, telefone, clínica, e-mail e cidade.
   - Lista de documentos obrigatórios anexados: _Diploma & Especialização_, _Carteira do CRO_ e _Comprovante de Endereço_ (todos checados como Válidos).
   - Painel do status da taxa de licenciamento MWS (R$ 24.000,00) via Fintech integrada.
   - Ação ADM: Botão `Aprovar Adesão & Gerar Contrato (c1)`.
2. **Modal de Fluxo do Contrato de Licenciamento (CLM):**
   - Integração com SaaS de assinatura eletrônica.
   - Três passos controlados pelo Time ADM:
     - `(c1)` Gerar minuta com dados do ortodontista (concluído automaticamente com cláusulas de PI).
     - `(c2)` Enviar para assinatura do ortodontista (botão `Disparar (c2)`).
     - `(c4)` Conferir contrato assinado e concluir credenciamento (botão `Concluir (c4)`).
3. **Modal de Moderação de Perfil Público:**
   - Avaliação da biografia submetida, foto/avatar e dados de endereço da clínica.
   - Ação ADM: Botões `Solicitar Ajustes` ou `Aprovar e Publicar no Portal` (disponibiliza imediatamente o ortodontista para buscas públicas de leads e pacientes).

---

### 4.3. Cadastro e Manutenção de Mentores (`/admin/mentores` • `AdminMentors.tsx`)

#### A. Cabeçalho e Regra Global de Distribuição

- **Título Literal:** `Cadastro e Manutenção de Mentores`
- **Subtítulo Literal:** `Gerencie os ortodontistas seniores responsáveis pela análise clínica, elaboração de planejamentos de casos e direcionamento da esteira.`
- **Badge de Destaque:** `Corpo Docente & Mentores MWS • Gestão ADM`
- **Botão Primário:** `+ Cadastrar Novo Mentor`

#### B. Box de Configuração: Toggle Global de Escolha do Mentor

- **Título da Regra:** `Regra de Distribuição de Casos Clínicos`
- **Texto Descritivo Literal:** `"Permitir escolha de mentor pelo ortodontista: quando ativado, os ortodontistas poderão sinalizar sua preferência de mentor ao abrir um caso clínico (filtrando apenas mentores disponíveis na data). Ao desativar, a seleção manual fica oculta e a esteira distribui a demanda automaticamente entre os mentores disponíveis."`
- **Controle:** Switch com rótulo `Escolha pelo Ortodontista`.
- **Badges de Estado:** `Escolha Habilitada` (quando ativo) ou `Atribuição Automática` (quando inativo).
- **Persistência:** Sincronizado via `saveMentorSettings` em `localStorage` (`mws_mentor_settings`).

#### C. KPIs do Corpo Docente

- **Total de Mentores:** Total cadastrado (ex: 3 mentores: Prof. Dr. Marcelo Carvalho, Dra. Helena Barreto e Dr. Fernando Prado, além de Breno, Aldir e Flávio).
- **Casos Ativos em Mentoria:** Soma da carga em tempo real.
- **Total Histórico Concluído:** Volume total de planejamentos entregues.
- **Períodos de Bloqueio:** Intervalos de indisponibilidade/férias ativos.

#### D. Tabela de Mentores

Colunas:

1. `Mentor / Especialidades`: Avatar com gradiente verde/ouro, nome e tags de especialidades (ex: _Ortodontia Lingual Customizada_, _Biomecânica Robótica_).
2. `Contato / CRO`: CRO oficial e e-mail institucional.
3. `Cidade`: Localidade base do mentor.
4. `Carga Ativa`: Barra de progresso visual mostrando casos ativos vs. capacidade máxima (ex: `8 / 15 casos`).
5. `Histórico`: Total de planejamentos elaborados.
6. `Status`: Badge `Ativo` com indicador de bloqueios de agenda se houver, ou `Inativo`.
7. `Ações ADM`: Botão `Editar` e botão de toggle rápido `Pausar / Ativar`.

#### E. Modal de Cadastro/Edição de Mentor

Formulário completo com campos: Nome completo com titulação, E-mail, CRO, Telefone, Localização, Capacidade máxima de casos simultâneos, Especialidades (separadas por vírgula), Minibiografia e Status (`ativo` ou `inativo`).

---

### 4.4. Supervisão de Casos Clínicos & IA (`/admin/casos` • `AdminCases.tsx`)

#### A. Cabeçalho e Diretriz de IA & Mentoria

- **Título Literal:** `Supervisão da Esteira de Casos Clínicos`
- **Subtítulo Literal:** `Acompanhamento dos 54 casos clínicos em andamento, conformidade de prazos laboratoriais (SLAs) e emissão de boletos de produção.`
- **Banner de IA (Planilha Ref. b6, b7):**
  - Título: `Catalogação para Treinamento da IA MWS (Ref. b6 da Planilha):`
  - Texto Literal: `"Todos os 54 casos clínicos recebidos são catalogados com metadados para servir de base de aprendizado para a IA da Magic Wire. Mesmo com o avanço da IA, haverá sempre o acompanhamento de um Mentor Ortodontista sênior durante todo o tratamento — do planejamento à conclusão."`

#### B. Métricas da Esteira (Status Oficiais MWS)

- **Aguardando Análise Técnica:** `12` (Triagem laboratorial inicial).
- **Em Análise Técnica:** `18` (Mentoria e confecção do planejamento).
- **Planejamento Elaborado:** `14` (Aguardando aprovação do ortodontista).
- **Planejamento Entregue:** `10` (Liberados para confecção dos fios customizados).
- **Total de Casos Ativos:** `54`.

#### C. Lista de Casos e Ações Administrativas

Cards detalhados para cada caso clínico (`CAS-2026-001` a `CAS-2026-006`...):

- Informações: Código do caso, nome do paciente, nome do ortodontista responsável, cidade e **Protocolo MWS** (Classes I, II, III, IV ou V).
- Painel de Metadados:
  - _Mentor Responsável_: Identificação do mentor sênior alocado.
  - _Status Aprendizado IA_: `Catalogado p/ Treinamento` ou `Em Processamento de Arquivos`.
  - _SLA de Entrega_: Data limite do compromisso técnico.
- Faturamento do Caso (Ref. b91 da planilha):
  - Se aguardando boleto: Botão `Emitir Boleto (b91)`.
  - Se emitido: Badge `Boleto Gerado (R$ X.XXX,XX)`.

#### D. Modal de Emissão de Boleto Laboratorial (Ref. b91)

Exibe resumo do caso, protocolo, valor estabelecido, vencimento padrão (D+5 dias via Fintech integrada) e botão de confirmação `Confirmar e Emitir Boleto`.

---

### 4.5. Pacientes, Leads & Mobilidade Geográfica (`/admin/mobilidade` • `AdminPatientsLeads.tsx`)

A tela conta com um alternador de abas no cabeçalho: `Leads & Pacientes (450)` e `Mobilidade Geográfica (3)`.

#### A. Aba "Leads & Pacientes"

1. **Métricas do Funil de Aquisição Comercial:**
   - Total de Leads Gerados: `450` (Campanhas Instagram ADS, Google e Portal Orgânico).
   - Leads Qualificados: `180` (40% de taxa de qualificação).
   - 1ª Consulta Agendada: `140` (Split de R$ 200).
   - Casos Convertidos: `100` (Iniciaram tratamento lingual Magic Wire).
   - Leads Perdidos: `30`.
2. **Fila de Indicação & Atribuição Geográfica de Pacientes:**
   - Tabela com: Nome do lead, contato, canal de origem, localidade solicitada/bairro, ortodontista atribuído e valor da 1ª consulta (R$ 200,00 fixo).
   - Badges de Status: `Novo Lead`, `Em Atendimento`, `Agendado`, `Convertido`.
   - Ação ADM: Botão `Atribuir` (abre modal para selecionar o ortodontista credenciado mais próximo da região do lead e consolidar o vínculo).

#### B. Aba "Mobilidade Geográfica"

1. **Banner Didático do Fluxo de Mobilidade MWS:**
   - Texto Literal: `"O paciente pode solicitar manutenções periódicas ou transferência definitiva em outra localidade (ex: viagens de trabalho). O Time ADM MWS é o responsável por: agendar na outra cidade, liberar acesso pontual ao prontuário digital, e pós-consulta creditar o ortodontista receptor e debitar o ortodontista de origem (R$ 250), finalizando com a revogação do acesso."`
2. **Lista de Solicitações de Mobilidade (`MOB-2026-001` a `003`):**
   - Dados do Caso: Paciente, ortodontista de origem e cidade, cidade solicitada de destino, motivo relatado pelo paciente e tipo (`Manutenção Temporária (Viagem)` ou `Transferência Definitiva`).
   - Painel Visual de 4 Etapas Obrigatórias ADM:
     1. _Agendamento na nova localidade_ (definição do ortodontista receptor).
     2. _Acesso ao Prontuário_ (liberação temporária para consulta e diagramas linguais).
     3. _Split Pós-Consulta_ (`+R$250 Destino / -R$250 Origem`).
     4. _Revogação do Acesso_ (bloqueio do prontuário com auditoria concluída).
   - Ação ADM: Botão `Gerenciar Etapas ADM` que abre modal com os gatilhos sequenciais das etapas.

---

### 4.6. Conciliação Financeira & Split de Consultas (`/admin/financeiro` • `AdminFinancial.tsx`)

#### A. Cabeçalho e Métricas Centrais da Operadora

- **Título Literal:** `Gestão Financeira & Conciliação de Splits`
- **Subtítulo Literal:** `Acompanhamento de liquidação de adesões (R$ 24k), boletos de produção e split automatizado de 1ª consulta.`
- **4 Cards Financeiros:**
  1. _Faturamento Consolidado MWS:_ `R$ 4.368.000,00` (Adesões pagas + produção de fios).
  2. _Split Repassado a Ortodontistas:_ `R$ 1.954.200,00` (Repasse automático sem bitributação via Fintech).
  3. _Custos de Laboratório:_ `R$ 1.285.000,00` (Fios customizados e mentoria).
  4. _Resultado Líquido MWS:_ `R$ 1.128.800,00` (Margem líquida da operadora).

#### B. Box Didático da Regra do Split (Conforme Planilha de Negócio)

- **Título Literal:** `Regra do Split Pacote de Vendas (Conforme Planilha de Negócio)`
- **Subtítulo Literal:** `Solução para impulsionamento regional que o ortodontista não domina: divisão dos R$ 200 da 1ª consulta`
- **Estrutura dos 3 Componentes:**
  1. `R$ 100,00 (50%) — Ortodontista Licenciado`: Honorários da 1ª consulta clínica realizada no consultório.
  2. `R$ 50,00 (25%) — Time de Marketing (Murilo / MWS)`: Reinvestimento em tráfego pago regional e aquisição contínua de novos leads.
  3. `R$ 50,00 (25%) — Time de Vendas da Plataforma`: Equipe de SDRs e especialistas de conversão em SP para atendimento e agendamento rápido.

#### C. Tabela de Boletos & Cobranças Registradas

- **Colunas:** ID/Favorecido, Tipo (Ortodontista, Laboratório, MWS Operação), Descrição da Cobrança, Valor (R$), Data de Emissão, Vencimento e Status (`Liquidado`, `Emitido`, `Atrasado`).
- **Exemplos Canônicos:** Taxa Única de Adesão ao Licenciamento MWS de R$ 24.000,00 e Boletos de Casos Clínicos (ex: R$ 2.450,00).
- **Filtros:** Campo de busca e filtro por status (`Todos`, `Liquidados`, `Emitidos`, `Atrasados`).

---

### 4.7. Expedição Logística de Fios MWS (`/admin/logistica` • `AdminLogistics.tsx`)

#### A. Cabeçalho e Visão Operacional

- **Título Literal:** `Logística & Rastreamento de Insumos`
- **Subtítulo Literal:** `Controle de expedição de Kits de Fios Mágicos Customizados, insumos linguais e templates de colagem indireta.`
- **Métricas de Expedição (4 Cards):**
  - Remessas em Trânsito: `14` (Sedex, Loggi, Jadlog e Portadores).
  - Aguardando Liberação ADM: `1` (Pronto no lab para despacho).
  - Entregas Este Mês: `48` (Cumprimento de prazos clínicos).
  - SLA de Entrega Médio: `2.8 dias` (Meta: 4 dias úteis).

#### B. Lista de Remessas e Ações de Despacho

- Tabela/Cards de remessas (`LOG-8801` a `8804`):
  - Vínculo com caso clínico e nome do paciente.
  - Ortodontista e clínica de destino com cidade e UF.
  - Conteúdo exato do pacote (ex: _Kit Magic Wire Lingual 0.014 NiTi + Template de Colagem Robótica_, _Fios 0.016x0.022 TMA_).
  - Código de rastreamento com link da transportadora homologada.
  - Previsão estimada de entrega.
- Ação ADM: Quando em status `aguardando_liberacao`, botão primário verde `Aprovar e Liberar Envio` (muda para `aprovado` e gera código de rastreamento).

---

### 4.8. Programas MWS de Expansão e Marketing Murilo (`/admin/programas` • `AdminPrograms.tsx`)

A tela gerencia os dois principais programas estratégicos da plataforma através de abas no topo:

1. `MKT & Vendas (Murilo / MWS)`
2. `Programa de Gestão (Parceiro API)`

#### A. Aba "MKT & Vendas (Murilo / MWS)"

1. **Box de Estrutura do Pacote de Vendas (Citação direta da Planilha MWS):**
   - Título: `Solução de Vendas e Impulsionamento para os Licenciados`
   - Citação Literal: `"A proposta inicial é oferecer para o licenciado um pacote de vendas por meio do qual ele impulsione suas vendas localmente na região em que atende. Hoje é algo que o ortodontista não faz, não sabe fazer e não precisa contratar. Dos R$ 200,00 da consulta: R$ 100 para o licenciado e R$ 100 para marketing e vendas (R$ 50 para o time de MKT e R$ 50 para o time de vendas local de SP). Murilo é o parceiro ref. ao time de MKT para maximizar o resultado para os licenciados."`
   - Destaque dos blocos de R$ 100 (Ortodontista), R$ 50 (Time de MKT Murilo) e R$ 50 (Time de Vendas Plataforma SP).
2. **Métricas de Adesão ao Programa MKT:**
   - Licenciados com MKT Contratado: `98 (53.8%)`.
   - Ofertas Enviadas em Análise: `45 (24.7%)`.
   - Rejeitados / Tráfego Próprio: `39 (21.5%)`.
   - Total Consistente: `182` ortodontistas da base.
3. **Tabela de Acompanhamento das Ofertas:**
   - Colunas: Ortodontista, Cidade, Clínica, Status da Oferta MKT (`Contratado`, `Oferta Enviada`, `Rejeitado`, `Sem Oferta`).
   - Ações ADM:
     - Se `sem_oferta`: Botão `Oferecer Programa`.
     - Se `ofertado`: Botões `Contratou` (verde) ou `Rejeitou` (cinza com ícone de recusa).

#### B. Aba "Programa de Gestão (Parceiro API)"

1. **Banner do Programa:**
   - Título: `Programa de Gestão de Consultório MWS`
   - Descrição: Integração via API homologada para faturamento, prontuário eletrônico e controle de estoque sincronizados ao ecossistema Magic Wire.
2. **Métricas da Gestão API:**
   - Licenciados Integrados: `84 (46.1%)` (API ativa).
   - Ofertas em Andamento: `62 (34.1%)`.
   - Sistemas Próprios / Rejeitados: `36 (19.8%)`.
   - Total Consistente: `182`.
3. **Ações ADM:** Botões para enviar proposta de integração API e registrar retornos de aceite ou uso de software legado.

---

### 4.9. Dashboard Global de Qualidade & SLAs (`/admin/qualidade` • `AdminQuality.tsx`)

#### A. Cabeçalho e Métricas de Excelência

- **Título Literal:** `Dashboard Global de Qualidade & SLAs`
- **Subtítulo Literal:** `Monitoramento do NPS contínuo dos pacientes (1ª consulta, manutenções e conclusão) e tempos de resposta da rede.`
- **4 Caixas Principais:**
  1. _NPS Global da Rede:_ `88` (Zona de Excelência 85+).
  2. _SLA Médio do Laboratório:_ `4.2 dias` (Meta contratual: até 5 dias úteis).
  3. _Tempo de Resposta ADM:_ `2.4 horas` (Meta: até 4 horas).
  4. _Taxa de Conformidade Técnica:_ `98.5%` (Fios customizados lingual sem necessidade de refação).

#### B. Jornada de Avaliação do Paciente (NPS por Etapa - Planilha de Negócio)

Pontuações estratificadas pelos marcos do tratamento coletados no App do Paciente:

- **Ref. b16 • 1ª Consulta e Instalação:** `89.4` (Excelência — primeiras impressões e conforto inicial).
- **Ref. b19 • Manutenções Periódicas:** `87.1` (Excelência — acompanhamento contínuo da evolução clínica).
- **Ref. b21 • Conclusão do Tratamento:** `92.0` (Excelência Máxima — resultado final estético lingual e alinhamento).

#### C. Feed de Avaliações Recentes com Comentários

Feed em tempo real trazendo notas (0-10), etapa da avaliação, nome do paciente, ortodontista responsável e comentários textuais (ex: elogio à discrição total do fio por trás dos dentes e conforto).

---

### 4.10. Escola MWS & Moderação da Comunidade (`/admin/escola` • `AdminSchoolCommunity.tsx`)

A tela dispõe de alternador de abas: `Escola MWS (3)` e `Fórum & Comunidade (3)`.

#### A. Aba "Escola MWS"

1. **Métricas EAD e Hands-on:**
   - Ortodontistas em Treinamento Obrigatório: `182 Licenciados`.
   - Taxa Média de Conclusão: `89.6%`.
   - Imersões Presenciais Agendadas: `4 Turmas (SP)` (Hands-on de colagem robótica lingual).
2. **Catálogo de Cursos Obrigatórios e Avançados:**
   - `CRS-01`: _Certificação Oficial Magic Wire System - 3ª Geração da Ortodontia_ (Instrutores: Prof. Dr. Marcelo Carvalho & Mentores MWS • 8 módulos, 24 horas • 182 inscritos • 94% conclusão).
   - `CRS-02`: _Biomecânica de Fios Linguais Robóticos em Casos Complexos (Classe II e III)_ (Dra. Helena Barreto • 6 módulos, 16h).
   - `CRS-03`: _Protocolo de Colagem Indireta Guiada e Gestão de Stops Linguais_ (Dr. Fernando Prado • 4 módulos, 8h).
   - Ações ADM: Indicador de curso ativo ou botão `Publicar Curso`.

#### B. Aba "Fórum & Comunidade"

1. **Painel de Moderação Clínica:**
   - Moderação das discussões técnicas entre ortodontistas credenciados e mentores MWS.
   - Lista de tópicos com contagem de respostas, apoios/curtidas, autor e data da última atividade.
2. **Ações ADM:**
   - Botão `Fixar no Topo / Desafixar` (adiciona badge `Fixado pela ADM` em roxo).
   - Destaque para o tópico oficial: _"Guia de Boas Práticas: Como orientar o paciente no primeiro mês com Magic Wire"_ pelo Mentor Chefe.

---

### 4.11. Console RBAC de Perfis e Permissões (`/admin/rbac` • `AdminRBAC.tsx`)

- **Título Literal:** `Console RBAC`
- **Subtítulo Literal:** `Gestão de perfis e acessos (RNF-044).`
- **Matriz de Perfis Cadastrados:**
  1. _Paciente:_ App do Paciente — Acesso `L` (Leitura)
  2. _Ortodontista:_ App do Ortodontista + Portal Clínico — Acesso `C/E` (Criação/Edição)
  3. _Assistente:_ Apoio operacional — Acesso `C/E`
  4. _Gestor:_ Visão executiva — Acesso `L`
  5. _Financeiro:_ Cobranças, MRR — Acesso `C/E`
  6. _Suporte:_ Console RBAC, Tickets — Acesso `C/E/D`
  7. _Laboratório:_ Módulo lab — Acesso `C/E/D`
  8. _Fintech:_ Integração API — Acesso `API`
  9. _Jurídico:_ Contratos CLM — Acesso `L`

---

## 5. Mapeamento de Navegações Ida-e-Volta

```
                        ┌───────────────────────────────────────────────────────────────┐
                        │                       /login                                  │
                        │        (Atalho "Time ADM MWS" • adm_mws / Skip@Pass)         │
                        └──────────────────────────────┬────────────────────────────────┘
                                                       │
                                                       ▼
                        ┌───────────────────────────────────────────────────────────────┐
                        │                   /admin (Dashboard Geral)                    │
                        └───────┬──────────┬──────────┬──────────┬──────────┬───────────┘
                                │          │          │          │          │
         ┌──────────────────────┼──────────┴──────────┴──────────┼──────────┴──────────────────────┐
         ▼                      ▼                                ▼                                 ▼
┌──────────────────┐  ┌──────────────────┐             ┌──────────────────┐             ┌──────────────────┐
│/admin/ortodontistas│  │  /admin/mentores │             │   /admin/casos   │             │ /admin/mobilidade│
│   (182 Licenc.)  │  │(Corpo Docente MWS│             │ (54 Casos / IA)  │             │ (Leads / Viagem) │
└────────┬─────────┘  └────────┬─────────┘             └────────┬─────────┘             └────────┬─────────┘
         │                     │                                │                                │
         ├──────────────┐      │                                │                                │
         ▼              ▼      │                                ▼                                ▼
   [Modal Adesão] [Modal CLM]  │                        [Modal Boleto b91]              [Modal Split R$250]
   [Modal Perfil Público]      │                                │                                │
         │              │      │                                │                                │
         └──────────────┼──────┴────────────────────────────────┼────────────────────────────────┘
                        ▼                                       ▼
         ┌──────────────────────────────┐        ┌──────────────────────────────┐
         │     /admin/financeiro        │        │      /admin/logistica        │
         │  (Boletos, Splits R$100/50)  │        │   (Kits de Fios Customizados)│
         └──────────────┬───────────────┘        └──────────────┬───────────────┘
                        │                                       │
                        ▼                                       ▼
         ┌──────────────────────────────┐        ┌──────────────────────────────┐
         │      /admin/programas        │        │       /admin/qualidade       │
         │  (MKT Murilo & API Gestão)   │        │     (NPS 88 & SLAs de Rede)  │
         └──────────────┬───────────────┘        └──────────────┬───────────────┘
                        │                                       │
                        ▼                                       ▼
         ┌──────────────────────────────┐        ┌──────────────────────────────┐
         │       /admin/escola          │        │         /admin/rbac          │
         │   (Cursos EAD & Moderação)   │        │   (Matriz de Acessos RNF-044)│
         └──────────────────────────────┘        └──────────────────────────────┘
```

### Detalhamento das Ações e Destinos:

- De `/admin` (Dashboard):
  - Botão "Avaliar" (Fichas) ➔ `/admin/ortodontistas`
  - Botão "Revisar" (Perfis) ➔ `/admin/ortodontistas`
  - Botão "Agendar" (Mobilidades) ➔ `/admin/mobilidade`
  - Botão "Liberar" (Logística de Insumos) ➔ `/admin/logistica`
  - Card "Financeiro & Split" ➔ `/admin/financeiro`
  - Card "Logística & Fios Mágicos" ➔ `/admin/logistica`
  - Card "Programas de Expansão" ➔ `/admin/programas`
  - Card "Escola MWS & Fórum" ➔ `/admin/escola`
  - Link "Ver todos" (Esteira) ➔ `/admin/casos`
- De qualquer tela administrativa:
  - Sidebar institucional permite salto direto de 1 clique para qualquer um dos 10 módulos.
  - Botão "Sair da Conta" no rodapé da sidebar revoga a autenticação (`logout()`) e redireciona para `/login`.

---

## 6. Mapeamento Técnico: Mock vs. Backend Real

| Entidade / Recurso                               | Status de Implementação Atual | Fonte de Dados / Mecanismo Técnico                               | Observações para Produção                                                                               |
| ------------------------------------------------ | ----------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| **Autenticação Admin**                           | Real / Persistente            | `useAuth`, `localStorage` e PocketBase client                    | Validação do perfil `admin` e token de sessão.                                                          |
| **Toggle "Escolha de Mentor pelo Ortodontista"** | Real no Front / Persistente   | `localStorage` (`mws_mentor_settings`)                           | Compartilhado em tempo real com o formulário de abertura de casos do ortodontista (`DentistCases.tsx`). |
| **Lista de Mentores e Bloqueios**                | Real no Front / Persistente   | `localStorage` (`mws_mentors_data`, `mws_mentor_periods`)        | CRUD funcional com persistência entre sessões e recarga de página.                                      |
| **Casos Clínicos Administrativos**               | Mock Analítico                | `src/pages/Admin/mockData.ts` (`MOCK_ADMIN_CASES`)               | Sincronização via PocketBase collection `cases` com metadados para IA.                                  |
| **Base de Ortodontistas Licenciados**            | Mock Analítico                | `src/pages/Admin/mockData.ts` (`MOCK_ADMIN_DENTISTS`)            | Integração planejada com coleção `dentists` e SaaS de CLM.                                              |
| **Fluxo de Contratos (c1, c2, c4)**              | Mock Interativo               | Estado React local (`AdminDentists.tsx`)                         | Em produção requer webhook de provedor de assinatura digital (ex: DocuSign/ClickSign).                  |
| **Mobilidade Geográfica & Split R$ 250**         | Mock Interativo               | Estado React local (`AdminPatientsLeads.tsx`)                    | Regra de negócio implementada na interface; requer gatilho de conta corrente na Fintech.                |
| **Leads & Funil de Aquisição (450)**             | Mock Analítico                | `src/pages/Admin/mockData.ts` (`MOCK_ADMIN_LEADS`)               | Atribuição manual funcional no estado React local com toasts de confirmação.                            |
| **Boletos e Splits Financeiros**                 | Mock Analítico                | `src/pages/Admin/mockData.ts` (`MOCK_ADMIN_BOLETOS`)             | Liquidação e filtros operando em memória.                                                               |
| **Logística e Expedição de Fios**                | Mock Interativo               | `src/pages/Admin/mockData.ts` (`MOCK_ADMIN_SHIPMENTS`)           | Ação de aprovação atualiza status para `aprovado` com geração de rastreio.                              |
| **Programas MKT & API Gestão**                   | Mock Interativo               | Estado React local (`AdminPrograms.tsx`)                         | Ações de oferta e registro de contratação/recusa ativas na interface.                                   |
| **Qualidade & Pesquisas NPS**                    | Mock Analítico                | `src/pages/Admin/mockData.ts` (`MOCK_NPS_RECORDS`)               | Reflete respostas submetidas no App do Paciente (`surveyData.ts`).                                      |
| **Escola & Fórum da Comunidade**                 | Mock Interativo               | `src/pages/Admin/mockData.ts` (`SchoolCourse`, `CommunityTopic`) | Fixação de tópicos e aprovação de cursos operantes no estado local.                                     |

---

## 7. Diretrizes para Replicação Ipsis Litteris

Para manter a conformidade absoluta do sistema:

1. **Terminologia Protegida:** Qualquer nova tela ou refatoração no módulo ADM deve manter a conformidade terminológica rígida da plataforma, utilizando sempre **Fio Mágico MWS** / **Fio Lingual Customizado** e **Ortodontista Credenciado**.
2. **Consistência Numérica:** Manter a coerência dos dados derivados da planilha de negócio:
   - 182 ortodontistas na base (160 ativos, 10 em análise, 8 em contrato, 4 pendentes de docs).
   - 54 casos clínicos ativos (12 aguardando análise + 18 em análise + 14 planejamento elaborado + 10 planejamento entregue).
   - 450 leads no funil de marketing (180 qualificados + 140 agendados + 100 convertidos + 30 perdidos).
   - Taxa de adesão de licenciamento fixada em R$ 24.000,00.
   - Valor fixado da 1ª consulta em R$ 200,00 (Split: R$ 100 ortodontista / R$ 50 marketing Murilo / R$ 50 vendas locais).
   - Split de mobilidade geográfica fixado em R$ 250,00 (+R$ 250 ortodontista destino / -R$ 250 ortodontista origem).
3. **Padrão de Componentes:** Uso estrito do kit `src/components/ui/` (Card, Badge, Button, Input, Dialog, Switch, Label) e ícones `lucide-react`.
