# Especificação de Requisitos do Sistema — Ecossistema MWS (Magic Wire System)

> **Documento de Engenharia Reversa e Especificação Técnica Fiel**  
> **Versão do Código:** v0.0.44  
> **Data:** Setembro de 2026  
> **Finalidade:** Servir como especificação exaustiva para replicação _ipsis litteris_ de todo o produto, perfis, regras de negócio, telas, fluxos, componentes visuais e backend em outra conta ou projeto Skip.

---

## Sumário

1. [Visão Geral do Produto e Domínio Clínico](#1-visão-geral-do-produto-e-domínio-clínico)
2. [Atores e Perfis de Acesso](#2-atores-e-perfis-de-acesso)
3. [Matriz de Rotas e Telas por Perfil](#3-matriz-de-rotas-e-telas-por-perfil)
4. [Regras de Negócio Globais e Específicas](#4-regras-de-negócio-globais-e-específicas)
5. [Requisitos Funcionais por Módulo / Perfil](#5-requisitos-funcionais-por-módulo--perfil)
   - 5.1 [Autenticação e Controle de Sessão](#51-autenticação-e-controle-de-sessão)
   - 5.2 [Perfil Ortodontista (App & Portal Clínico)](#52-perfil-ortodontista-app--portal-clínico)
   - 5.3 [Perfil Paciente (App do Paciente)](#53-perfil-paciente-app-do-paciente)
   - 5.4 [Perfil Mentor (Portal de Mentoria MWS)](#54-perfil-mentor-portal-de-mentoria-mws)
   - 5.5 [Perfil Time ADM MWS (Console Administrativo)](#55-perfil-time-adm-mws-console-administrativo)
   - 5.6 [Perfil Laboratório MWS (Produção & Engenharia)](#56-perfil-laboratório-mws-produção--engenharia)
   - 5.7 [Perfil Lead Qualificado (Funil do Paciente)](#57-perfil-lead-qualificado-funil-do-paciente)
6. [Estrutura da Esteira Técnica e Ciclo de Vida dos Casos](#6-estrutura-da-esteira-técnica-e-ciclo-de-vida-dos-casos)
7. [Requisitos Técnicos e Arquitetura do Software](#7-requisitos-técnicos-e-arquitetura-do-software)
8. [Estrutura de Banco de Dados e Migrações PocketBase](#8-estrutura-de-banco-de-dados-e-migrações-pocketbase)
9. [Requisitos Não Funcionais e Identidade Visual (v0.0.41+)](#9-requisitos-não-funcionais-e-identidade-visual-v0041)
10. [Convenções de Linguagem Institucional](#10-convenções-de-linguagem-institucional)
11. [Contas de Teste e Credenciais Mock](#11-contas-de-teste-e-credenciais-mock)
12. [Estado Atual, Pendências e Repositórios](#12-estado-atual-pendências-e-repositórios)

---

## 1. Visão Geral do Produto e Domínio Clínico

O **Ecossistema MWS (Magic Wire System)** é uma plataforma web integrada de gestão clínica, planejamento biomecânico e manufatura robótica voltada exclusivamente para a **3ª Geração da Ortodontia**.

### Domínio Clínico: A Verdadeira Ortodontia Invisível

- **O que é o Magic Wire:** Trata-se de um sistema de fios ortodônticos linguais (fixados exclusivamente na face interna/palatina dos dentes). Diferente de alinhadores plásticos termoformados e de braquetes vestibulares convencionais, o Magic Wire permanece 100% invisível externamente durante todo o tratamento.
- **Manufatura Robótica:** Os arcos linguais são conformados sob medida por células industriais CNC multieixo (braços robóticos) a partir do escaneamento intraoral tridimensional (STL/PLY) e tomografia/radiografia do paciente. Utilizam ligas avançadas termoativadas de Níquel-Titânio com Cobre (_Copper NiTi_) e Titânio-Molibdênio (_TMA_).
- **Modelo de Mentoria Integrada:** Casos clínicos submetidos pelos ortodontistas credenciados são obrigatoriamente planejados por **Mentores Clínicos** especialistas da MWS (profissionais de referência: Dr. Breno, Dr. Aldir, Dr. Flávio, Prof. Dr. Marcelo Carvalho), garantindo segurança biomecânica, protocolo calibrado (Classes I a V) e previsibilidade.
- **Ecossistema Integrado:** Conecta 6 pontas em uma única esteira digital: o **Ortodontista**, o **Paciente**, o **Mentor**, o **Laboratório**, o **Time ADM** e o **Lead Qualificado**.

---

## 2. Atores e Perfis de Acesso

O sistema possui controle de acesso baseado em papéis (RBAC - Role-Based Access Control) que direciona o usuário autenticado para a sua interface dedicada e restringe a visibilidade de rotas:

| Identificador do Perfil | Papel no Domínio     | Rota Inicial Pós-Login | Descrição de Acesso                                                                                                                                                                    |
| ----------------------- | -------------------- | ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `dentist`               | **Ortodontista**     | `/dentist/dashboard`   | Acesso completo a casos, pacientes, agenda, prontuários, financeiro, escola e comunidade.                                                                                              |
| `patient`               | **Paciente**         | `/patient/dashboard`   | Visualização de evolução, linha do tempo dos fios, agendamentos, pagamentos, fotos e programa de pontos.                                                                               |
| `mentor`                | **Mentor Clínico**   | `/mentor/dashboard`    | Kanban de mentoria, elaboração de planejamento, notas técnicas, redirecionamento de casos e agenda de disponibilidade.                                                                 |
| `admin`                 | **Time ADM MWS**     | `/admin/dashboard`     | Gestão central: credenciamento de ortodontistas, aprovação de remessas/logística, conciliação financeira/boletos, mobilidade geográfica, programas de expansão e controle de mentores. |
| `lab`                   | **Laboratório**      | `/lab/dashboard`       | Triagem de casos, esteira de 4 status, manufatura robótica CNC, métricas de SLA operacional e equipe técnica.                                                                          |
| `lead`                  | **Lead Qualificado** | `/lead/dashboard`      | Paciente em fase de conversão: perfil do ortodontista atribuído, primeira consulta, prévia de orçamento e conteúdo tecnológico.                                                        |

---

## 3. Matriz de Rotas e Telas por Perfil

### 3.1 Rotas Públicas e Comuns

- `/login`: Tela de autenticação com suporte a e-mail/identificador curto e senha, além de botões de atalho rápido de preenchimento ("Entrar como Ortodontista", "Entrar como Paciente", "Entrar como Time ADM", "Entrar como Mentor", "Entrar como Lead").
- `/signup`: Cadastro de novos ortodontistas/usuários.
- `/unauthorized`: Tela de acesso negado quando o perfil autenticado não possui permissão para a rota.
- `*`: Página 404 (NotFound).

### 3.2 Perfil Ortodontista (`dentist`) — 17 Telas

| Rota                                  | Componente                  | Descrição Funcional                                                                                                                                  |
| ------------------------------------- | --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/dentist/dashboard`                  | `DentistDashboard`          | Métricas principais (casos ativos, faturamento, NPS), avisos críticos, atalhos rápidos e resumo da agenda do dia.                                    |
| `/dentist/cases`                      | `DentistCases`              | Gestão de casos clínicos em tabela e kanban, criação de novo caso com upload de STL/exames, seletor de protocolo e indicação de mentor preferencial. |
| `/dentist/patients`                   | `DentistPatients`           | Ficha e lista geral de pacientes vinculados ao consultório, com filtros por status de tratamento.                                                    |
| `/dentist/patients-by-status/:status` | `DentistPatientsByStatus`   | Visão filtrada de pacientes de acordo com o estágio clínico (alinhamento, retração, finalização etc.).                                               |
| `/dentist/patient-detail/:id`         | `DentistPatientDetail`      | Detalhe completo do paciente: dados demográficos, histórico, contatos e atalhos clínicos.                                                            |
| `/dentist/medical-record`             | `DentistMedicalRecord`      | Prontuário digital com odontograma/diagrama lingual, registro de sessões de manutenção e histórico de procedimentos.                                 |
| `/dentist/financing`                  | `DentistFinancing`          | Painel financeiro do consultório: comissões, saldo a receber, demonstrativo mensal fixo e filtros de transações.                                     |
| `/dentist/maintenance-details`        | `DentistMaintenanceDetails` | Detalhamento dos custos e repasses de manutenções periódicas executadas no mês.                                                                      |
| `/dentist/agenda`                     | `DentistAgenda`             | Calendário e grade de horários de consultas de manutenção e novas instalações.                                                                       |
| `/dentist/chat-lab`                   | `DentistChatLab`            | Canal de comunicação direta em tempo real com os técnicos de bancada e engenheiros do laboratório MWS.                                               |
| `/dentist/slas`                       | `DentistSlas`               | Monitoramento dos prazos acordados com o laboratório para confecção e entrega de cada fio lingual.                                                   |
| `/dentist/public-profile`             | `DentistPublicProfile`      | Perfil público institucional do ortodontista exibido para leads e pacientes da sua região.                                                           |
| `/dentist/referrals`                  | `DentistReferrals`          | Gestão e acompanhamento de indicações de novos pacientes e colegas profissionais.                                                                    |
| `/dentist/programs`                   | `DentistPrograms`           | Acesso aos programas de capacitação e pacotes de impulsionamento/vendas da MWS.                                                                      |
| `/dentist/school`                     | `DentistSchool`             | Escola MWS: módulos de capacitação EAD, vídeos técnicos de colagem indireta e certificações.                                                         |
| `/dentist/community`                  | `DentistCommunity`          | Fórum clínico exclusivo entre ortodontistas credenciados e mentores para discussão de casos complexos.                                               |
| `/dentist/quality`                    | `DentistQuality`            | Indicadores de qualidade técnica, NPS dos próprios pacientes e taxa de conformidade dos fios.                                                        |
| `/dentist/onboarding`                 | `DentistOnboarding`         | Passo a passo de integração do novo ortodontista ao protocolo Magic Wire.                                                                            |
| `/dentist/settings`                   | `DentistSettings`           | Configurações do consultório, notificações e horários de atendimento.                                                                                |

### 3.3 Perfil Paciente (`patient`) — 6 Telas

| Rota                    | Componente            | Descrição Funcional                                                                                                                                                                          |
| ----------------------- | --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/patient/dashboard`    | `PatientDashboard`    | Visão geral da evolução do tratamento, dias de uso, tempo restante estimado, próximas consultas e alternador de perfil (Maria Eduarda vs Lucas Ferreira).                                    |
| `/patient/treatment`    | `PatientTreatment`    | Prontuário do paciente: timeline das 8 sessões pós-aquisição (Instalação + 6 Manutenções + Conclusão), fotos intraorais, documentos em anexo (laudos/garantia) e termos aceitos (TCLE).      |
| `/patient/appointments` | `PatientAppointments` | Gestão de agendamentos: consultas futuras com preparação, histórico de consultas realizadas, solicitação de novo horário e gatilho de pesquisa NPS por consulta.                             |
| `/patient/payments`     | `PatientPayments`     | Portal financeiro do paciente: contrato ativo, status das parcelas (0 a 10), cópia de código PIX Copia e Cola, código de barras de boletos e download de recibos/NFS-e.                      |
| `/patient/points`       | `PatientPoints`       | Programa de Pontos MWS: saldo, categoria (Bronze a Diamante), barra de progresso, ações recomendadas, catálogo de pontuação, código de indicação com atalho WhatsApp e histórico de extrato. |
| `/patient/profile`      | `PatientProfile`      | Dados cadastrais, contato de emergência com edição em modal, histórico médico, exames 3D e termos de consentimento LGPD.                                                                     |
| `/patient/search`       | `PatientSearch`       | Busca de ortodontistas credenciados próximos por CEP/bairro para pacientes que buscam atendimento ou segunda opinião.                                                                        |

### 3.4 Perfil Mentor (`mentor`) — 3 Telas Principais

| Rota                   | Componente           | Descrição Funcional                                                                                                                                                                                                                                                                            |
| ---------------------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/mentor/dashboard`    | `MentorDashboard`    | Kanban completo de mentoria em 4 colunas ("Aguardando análise", "Em análise", "Em planejamento", "Planejamento entregue"), métricas de carga e SLA, gaveta/modal de elaboração de planejamento técnico (notas, manutenções, preço sugerido) e modal de redirecionamento de caso com auditoria. |
| `/mentor/availability` | `MentorAvailability` | Calendário e gestão de intervalos de indisponibilidade (estilo booking) para férias, congressos ou sobrecarga de agenda, impactando diretamente a distribuição de casos.                                                                                                                       |
| `/mentor/profile`      | `MentorProfilePage`  | Perfil do mentor com métricas consolidadas (casos orientados, taxa de aprovação de primeira, tempo médio de análise, NPS atribuído pelos ortodontistas) e biografia acadêmica.                                                                                                                 |

### 3.5 Perfil Time ADM MWS (`admin`) — 10 Telas

| Rota                      | Componente             | Descrição Funcional                                                                                                                                                                                                                                       |
| ------------------------- | ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/admin/dashboard`        | `AdminDashboard`       | Torre de controle geral da MWS: receita bruta, faturamento financiado, contagem de ortodontistas licenciados (182), casos ativos (54), alertas de conformidade e feed de atividades.                                                                      |
| `/admin/dentists`         | `AdminDentists`        | Ficha de credenciamento e triagem de ortodontistas: aprovação de cadastros, validação documental de CRO/diploma, status da chave PIX e ativação no diretório nacional.                                                                                    |
| `/admin/cases`            | `AdminCases`           | Supervisão global de todos os casos da rede: filtro por protocolo (Classes I a V), status técnico e reatribuição administrativa.                                                                                                                          |
| `/admin/financial`        | `AdminFinancial`       | Conciliação e esteira de boletos: aprovação e emissão de boletos de entrada dos pacientes (split do pacote MWS), liquidação de parcelas e visualização de inadimplência.                                                                                  |
| `/admin/logistics`        | `AdminLogistics`       | Logística & expedição de Fios Mágicos: aprovação de envio de kits customizados saídos da manufatura robótica e rastreamento Sedex/transportadora até o consultório.                                                                                       |
| `/admin/patients-leads`   | `AdminPatientsLeads`   | Gestão do funil nacional de leads (Instagram ADS/portal), atribuição geográfica a ortodontistas e fluxo de **Mobilidade Geográfica** (agendamento em outra cidade, liberação temporária de prontuário, split financeiro de R$ 250 e revogação de acesso). |
| `/admin/programs`         | `AdminPrograms`        | Gestão dos programas de expansão: Pacote de Marketing & Vendas (parceria Murilo / divisão de R$ 200 da 1ª consulta em R$ 100 ortodontista / R$ 50 time MKT / R$ 50 vendas SP) e Programa de Gestão via API parceira.                                      |
| `/admin/mentors`          | `AdminMentors`         | Painel de controle da mentoria: toggle global "Permitir escolha de mentor pelo ortodontista", monitoramento da carga de trabalho dos mentores e auditoria de redirecionamentos.                                                                           |
| `/admin/school-community` | `AdminSchoolCommunity` | Moderação do fórum clínico (fixação de tópicos, aprovação) e publicação de novos cursos na Escola MWS.                                                                                                                                                    |
| `/admin/quality`          | `AdminQuality`         | Dashboard executivo de qualidade: NPS contínuo da rede (1ª consulta, manutenções, conclusão), tempos de resposta e conformidade de fabricação.                                                                                                            |
| `/admin/rbac`             | `AdminRBAC`            | Matriz de perfis cadastrados e níveis de permissão (RNF-044).                                                                                                                                                                                             |

### 3.6 Perfil Laboratório MWS (`lab`) — 7 Telas

| Rota              | Componente      | Descrição Funcional                                                                                                                                                          |
| ----------------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/lab/dashboard`  | `LabDashboard`  | Visão executiva da fábrica: capacidade robótica diária, ordens em andamento, casos na esteira técnica e taxa de retrabalho.                                                  |
| `/lab/cases`      | `LabCases`      | Fila oficial de casos clínicos em 4 status técnicos (Aguardando Análise → Em Análise → Planejamento Elaborado → Planejamento Entregue) com alternador entre Kanban e Tabela. |
| `/lab/planning`   | `LabPlanning`   | Módulo de elaboração de planejamento técnico pelo planejador/mentor: registro de orientações de dobras, calibres e retorno de aprovação do ortodontista demandante.          |
| `/lab/production` | `LabProduction` | Esteira de 4 etapas de manufatura robótica CNC: 1. Dobragem & Modelagem Robótica → 2. Acabamento & Eletropolimento → 3. CQ Laser 3D → 4. Pronto para Expedição.              |
| `/lab/sla`        | `LabSla`        | Monitoramento analítico de cumprimento de prazos de entrega e alertas vermelhos de estouro de SLA operacional.                                                               |
| `/lab/team`       | `LabTeam`       | Gestão da escala dos técnicos de robótica e mentores, com barra de ocupação/capacidade individual e métricas de produtividade mensal.                                        |
| `/lab/settings`   | `LabSettings`   | Parâmetros de fábrica: capacidade diária de fios, contagem de células CNC ativas, dados cadastrais da unidade e regras de disparo de alertas.                                |

### 3.7 Perfil Lead Qualificado (`lead`) — 5 Telas

| Rota                 | Componente            | Descrição Funcional                                                                                                                                                                         |
| -------------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/lead/dashboard`    | `LeadDashboard`       | Painel do lead qualificado: status atual no funil de 5 etapas, card de destaque com acesso rápido e métricas do ecossistema nacional.                                                       |
| `/lead/consulta`     | `LeadAppointmentPage` | Detalhes da 1ª consulta de avaliação (presencial, escaneamento 3D, split transparente de R$ 200), confirmação de presença, solicitação de reagendamento e orientações pré-consulta.         |
| `/lead/orcamento`    | `LeadBudget`          | Proposta comercial oficial: classificação clínica (Protocolo MWS Classe I a V), meses previstos, tabela de parcelamento em 12x ou à vista com desconto, botão de aceite e envio de dúvidas. |
| `/lead/ortodontista` | `LeadDentist`         | Perfil público completo do ortodontista atribuído pelo Time ADM (CRO, endereço no mapa, anos de experiência, bio, fotos e botão de contato WhatsApp).                                       |
| `/lead/tecnologia`   | `LeadTechnology`      | Seção educativa com os 4 pilares da 3ª geração ortodôntica, comparativo histórico com aparelhos convencionais e alinhadores plásticos, e FAQ.                                               |

---

## 4. Regras de Negócio Globais e Específicas

### 4.1 Regra de Negócio: Esteira de Mentoria (4 Status Oficiais)

A esteira de mentoria opera sob uma máquina de estados estrita:

1. **Aguardando análise:** Caso submetido pelo ortodontista com arquivos STL e ficha clínica preenchida. Caso novo aguardando início da revisão pelo mentor designado.
2. **Em análise:** Mentor assumiu o caso e está estudando a oclusão, apinhamento e viabilidade dos movimentos linguais.
3. **Em planejamento:** Mentor está configurando o setup digital, definindo a sequência de arcos (calibres, ligas) e redigindo a nota técnica orientativa.
4. **Planejamento entregue:** Planejamento concluído e devolvido para a interface do ortodontista demandante com notas, estimativa de manutenções e valor sugerido para aprovação clínica antes da dobra robótica.

### 4.2 Regra de Negócio: Elaboração de Planejamento pelo Mentor

Ao concluir a análise, o mentor deve obrigatoriamente preencher:

- **Nota Técnica / Clínica:** Orientações detalhadas para o ortodontista (ex.: necessidade de desgaste interproximal/IPR prévio, mecânica elástica auxiliar, cuidados na ancoragem molar).
- **Número Estimado de Manutenções:** Quantidade prevista de visitas clínicas necessárias para conclusão do protocolo (ex.: 8 a 14 manutenções).
- **Valor Sugerido:** Faixa de honorários recomendada pela MWS com base na complexidade do protocolo (Classes I a V).

### 4.3 Regra de Negócio: Redirecionamento de Casos com Auditoria

- Um mentor pode redirecionar um caso para outro mentor por motivo de **sobrecarga de trabalho**, **conflito de agenda** ou **complexidade anatômica específica**.
- O sistema registra um log de auditoria imutável contendo:
  - `fromMentorId` e `fromMentorName` (mentor de origem)
  - `toMentorId` e `toMentorName` (mentor de destino)
  - `date` (data/hora do redirecionamento)
  - `reason` (justificativa obrigatória preenchida no ato)
- Após o redirecionamento, o caso passa imediatamente para a fila do novo mentor e o nome deste passa a figurar oficialmente como autor da recomendação.

### 4.4 Regra de Negócio: Disponibilidade de Agenda do Mentor (Booking)

- Mentores cadastram períodos de indisponibilidade (data inicial, data final e motivo, ex.: "Congresso Internacional", "Férias").
- **Gatilho de Bloqueio:** Na tela de abertura de caso pelo ortodontista, qualquer mentor que esteja com período de indisponibilidade ativo na data corrente é automaticamente omitido da lista de seleção.

### 4.5 Regra de Negócio: Escolha de Mentor pelo Ortodontista (Preferência vs Garantia)

- No momento da abertura do caso clínico (`/dentist/cases`), se a configuração administrativa permitir, o ortodontista pode selecionar um mentor de sua preferência.
- O sistema exibe obrigatoriamente a advertência legal:
  > _"A escolha do mentor é uma preferência e não garantia que será atendido por ele."_
- A listagem exibe apenas mentores ativos e disponíveis na data.
- Se o ortodontista selecionar "Sem preferência (distribuição automática MWS)", o sistema aloca o caso com base no menor número de casos ativos por mentor.

### 4.6 Regra de Negócio: Toggle Administrativo de Escolha de Mentor

- No portal do Time ADM (`/admin/mentors`), existe um switch master com a label:
  > **"Permitir escolha de mentor pelo ortodontista"** (padrão: **ativado**).
- Quando desativado pelo Time ADM, o campo de escolha de mentor desaparece completamente do formulário de criação de caso do ortodontista, e a alocação passa a ser 100% interna e automatizada.

### 4.7 Regra de Negócio: Nome Real do Mentor na Recomendação

- O nome real do mentor responsável (Dr. Breno, Dr. Aldir, Dr. Flávio, Prof. Dr. Marcelo Carvalho) deve ser exibido com destaque na caixa de "Recomendação do Mentor" e nos relatórios de planejamento entregues ao ortodontista, inclusive após eventuais redirecionamentos.

### 4.8 Regra de Negócio: Terminologia e Linguagem Mandatória

- **Zero uso da palavra "alinhador" ou "alinhadores"** no contexto do tratamento Magic Wire. Magic Wire é um fio ortodôntico interno/lingual invisível e robotizado.
- **Uso estrito de "Ortodontista"** (com "O" maiúsculo no contexto de tratamento credenciado) em substituição genérica ao termo "dentista" nas telas e comunicações clínicas.

### 4.9 Regra de Negócio: Mobilidade Geográfica de Pacientes

- Caso um paciente em tratamento precise realizar uma manutenção em outra cidade (ex.: viagem a trabalho ou mudança):
  1. O Time ADM MWS recebe a solicitação (`/admin/patients-leads`).
  2. ADM localiza e agenda a consulta em um ortodontista credenciado na cidade de destino.
  3. ADM libera **acesso temporário** ao prontuário digital e diagrama lingual do paciente para o profissional de destino.
  4. Realizado o atendimento, o ADM processa o split financeiro: credita **R$ 250,00** para o ortodontista receptor e debita **R$ 250,00** do ortodontista de origem.
  5. O acesso temporário ao prontuário é **revogado imediatamente**.

### 4.10 Regra de Negócio: Divisão Financeira do Pacote de Vendas (Murilo / MWS)

- Da taxa cobrada na 1ª consulta de avaliação do lead (R$ 200,00):
  - **R$ 100,00:** Repassados ao Ortodontista Licenciado da região (honorários da consulta e escaneamento).
  - **R$ 50,00:** Repassados ao parceiro de tráfego e marketing (Murilo) para campanhas regionais.
  - **R$ 50,00:** Repassados à equipe comercial e time de vendas central (SP) pelo acolhimento e agendamento do lead.

---

## 5. Requisitos Funcionais por Módulo / Perfil

### 5.1 Autenticação e Controle de Sessão

- **RF-AUTH-001 (Identificadores de Login Curtos):** O sistema deve permitir autenticação por e-mail ou por identificador curto institucional:
  - Time ADM: identificador `adm_mws` ou e-mail `adm@magicwire.com`.
  - Ortodontista: e-mail `ortodontista@magicwire.com`.
  - Mentor: e-mail `mentor@magicwire.com`.
  - Paciente: e-mail `paciente@magicwire.com` ou `maria.silva@email.com`.
  - Laboratório: e-mail `lab@magicwire.com`.
  - Lead Qualificado: e-mail `lead.teste@mws.com.br` ou `lead@magicwire.com`.
- **RF-AUTH-002 (Senha Padrão de Homologação):** Todos os usuários mockados e de teste possuem a senha padrão `Skip@Pass`.
- **RF-AUTH-003 (Atalhos Rápidos de Acesso):** A tela `/login` deve oferecer botões rápidos que preenchem instantaneamente as credenciais do perfil desejado e acionam a autenticação com um clique.
- **RF-AUTH-004 (Sessão Mockada com Fallback):** Caso o backend PocketBase esteja inacessível ou em provisionamento, o hook `useAuth` autentica localmente contra a base de usuários simulados, persistindo a sessão em `localStorage` com chave `mws_mock_user`.
- **RF-AUTH-005 (Proteção de Rotas RBAC):** O componente `ProtectedRoute` deve interceptar acessos a rotas não autorizadas para o papel do usuário logado, redirecionando para `/unauthorized` ou para a página de login.

---

### 5.2 Perfil Ortodontista (App & Portal Clínico)

- **RF-DENT-001 (Dashboard Clínico):** Exibir cards com total de casos ativos, pacientes em alinhamento, receita estimada do mês e pontuação de NPS da clínica.
- **RF-DENT-002 (Criação de Novo Caso):** Formulário modal com campos:
  - Nome completo do paciente, idade, sexo e queixa principal.
  - Seleção do Protocolo MWS sugerido (Classe I: Leve, Classe II: Moderada, Classe III: Avançada, Classe IV: Complexa, Classe V: Cirúrgica/Especial).
  - Área de upload de arquivos de escaneamento 3D (`.stl`, `.ply`, `.obj`) e radiografias (`.pdf`, `.jpg`).
  - Campo de seleção de Mentor Preferencial (respeitando a disponibilidade na data e o toggle administrativo do ADM).
  - Checkbox de declaração de consentimento e ciência do ortodontista.
- **RF-DENT-003 (Visualização de Casos - Kanban e Tabela):** Permitir alternar a listagem de casos clínicos entre visão em tabela e colunas kanban de status.
- **RF-DENT-004 (Ficha e Detalhe do Paciente):** Exibir linha do tempo dos atendimentos, dados de contato, atalho para abrir o prontuário digital e histórico de prescrições.
- **RF-DENT-005 (Prontuário Digital Lingual):** Odontograma com identificação das faces linguais dos dentes, marcação de stops mecânicos instalados e notas de cada sessão de ativação.
- **RF-DENT-006 (Painel Financeiro & Demonstrativo Mensal Fixo):**
  - Exibir demonstrativo financeiro detalhado com chave fixa de competência (Fevereiro/2026), listando receita de instalações, comissões de manutenções e saldo líquido.
  - Modal de extrato detalhado com opção de exportação em PDF/relatório.
- **RF-DENT-007 (Chat com Laboratório):** Janela de mensagens com histórico categorizado por caso clínico, com envio de notas e esclarecimento de dúvidas sobre dobras robóticas.
- **RF-DENT-008 (Acompanhamento de SLAs do Lab):** Quadro de alertas com contadores regressivos para entrega dos fios pelo laboratório em cada caso aberto.
- **RF-DENT-009 (Escola MWS EAD):** Acesso à listagem de cursos de certificação em ortodontia lingual, com vídeo-aulas, apostilas e indicador de progresso da capacitação.
- **RF-DENT-010 (Comunidade Clínica):** Fórum de discussão técnica onde ortodontistas publicam dúvidas de planejamento e mentores respondem com referências biomecânicas.

---

### 5.3 Perfil Paciente (App do Paciente)

- **RF-PAT-001 (Alternador de Pacientes de Teste):** Permitir alternar na interface entre **Maria Eduarda** (cenário paciente em manutenção avançada / pagamento via Fintech) e **Lucas Ferreira** (cenário início de tratamento / pagamento particular).
- **RF-PAT-002 (Status dos Arcos Linguais):** Exibir no dashboard o status individualizado do Arco Superior e do Arco Inferior (tipo de liga, calibre instalado, data da instalação e data da próxima ativação).
- **RF-PAT-003 (Timeline das 8 Sessões Pós-Aquisição):**
  - Mapear as 8 etapas estruturadas: 1. Instalação → 2. 1ª Manutenção → 3. 2ª Manutenção → 4. 3ª Manutenção → 5. 4ª Manutenção → 6. 5ª Manutenção → 7. 6ª Manutenção → 8. Conclusão.
  - Para cada sessão realizada, exibir: data, notas do ortodontista, fotos intraorais anexadas, laudos em PDF e termos de consentimento assinados.
- **RF-PAT-004 (Avaliação de Consulta NPS Integrada):**
  - Ao lado de cada consulta realizada, exibir botão para responder a **Pesquisa de Satisfação / NPS** daquela sessão específica.
  - Perguntas contemplam: nível de dor/desconforto (1 a 5), adaptação da fala, pontualidade do consultório, nota geral (0 a 10) e campo de texto livre para elogios ou observações.
  - Respostas salvas geram pontuação automática no programa de pontos e alimentam o dashboard de qualidade da rede.
- **RF-PAT-005 (Gestão de Parcelas & Boletos MWS):**
  - Listagem das 10 parcelas do contrato (status: paga, pendente, em atraso).
  - Cópia do código **PIX Copia e Cola** com um clique para parcelas a vencer.
  - Cópia da linha digitável do boleto bancário.
  - Download em PDF do comprovante fiscal (NFS-e) de parcelas já liquidadas.
- **RF-PAT-006 (Programa de Pontos & Clube Fidelidade MWS):**
  - Exibir pontuação acumulada e categoria atual: **Bronze** (0 a 499 pts), **Prata** (500 a 999 pts), **Ouro** (1.000 a 1.999 pts), **Platina** (2.000 a 2.999 pts), **Diamante** (3.000+ pts).
  - Barra de progresso visual exibindo quantos pontos faltam para a próxima categoria.
  - Modal "Tabela de Categorias" com todos os tiers e benefícios (descontos em clareamento, contenção gratuita, kits de higiene).
  - Modal "Tabela de Pontuação" com catálogo completo de formas de ganho (manutenção no prazo, envio de foto de acompanhamento, resposta a pesquisas, indicação de amigo).
  - Bloco de **Indicação de Amigo**: código exclusivo do paciente, botão de copiar link oficial de cadastro e botão direto de disparo de convite via WhatsApp com mensagem pré-formatada.
  - Histórico de extrato de pontos com data, descrição da ação e pontuação creditada.
- **RF-PAT-007 (Edição de Contato e Documentos Pessoais):** Permitir atualizar telefone e contato de emergência no perfil, além de realizar upload de exames e radiografias complementares.

---

### 5.4 Perfil Mentor (Portal de Mentoria MWS)

- **RF-MENT-001 (Kanban da Esteira de Mentoria):**
  - Exibir as 4 colunas oficiais: "Aguardando análise", "Em análise", "Em planejamento", "Planejamento entregue".
  - Cada card exibe: ID do caso (ex.: CAS-2026-084), nome e idade do paciente, protocolo clínico, ortodontista demandante e cidade, e status do SLA de análise.
- **RF-MENT-002 (Elaboração de Planejamento):**
  - Modal acessível a partir do card do caso.
  - Campo de texto rico para a **Nota Técnica / Clínica** do mentor.
  - Campo numérico para a **Estimativa de Manutenções**.
  - Campo monetário para a **Faixa de Valor Sugerido** ao paciente.
  - Botão de envio que move o caso para "Planejamento entregue" e notifica o ortodontista.
- **RF-MENT-003 (Redirecionamento de Casos entre Mentores):**
  - Botão "Redirecionar Caso" presente em cada card.
  - Modal com seleção do mentor de destino (apenas mentores cadastrados e ativos).
  - Campo obrigatório de texto: "Motivo do redirecionamento".
  - Gravação automática no histórico do caso (`CaseRedirectionLog`), persistindo data, mentor emissor, mentor receptor e justificativa.
- **RF-MENT-004 (Controle de Disponibilidade de Agenda / Booking):**
  - Formulário para registrar períodos de indisponibilidade (Data Início, Data Fim, Motivo, ex.: "Congresso ABORL").
  - Listagem de períodos cadastrados com opção de exclusão/cancelamento.
  - Sincronização imediata com a lista de mentores elegíveis exibida aos ortodontistas na abertura de casos.
- **RF-MENT-005 (Perfil do Mentor & Métricas de Desempenho):**
  - Exibição de estatísticas: total de casos planejados, tempo médio de entrega (horas), índice de aprovação sem refação e NPS médio atribuído pelos ortodontistas assistidos.

---

### 5.5 Perfil Time ADM MWS (Console Administrativo)

- **RF-ADM-001 (Credenciamento de Ortodontistas):**
  - Tabela com todos os 182 ortodontistas da base.
  - Filtros por status de licença (ativo, em análise, suspenso).
  - Modal de conferência documental: validação de CRO, certificados de imersão e aprovação para recebimento de leads da plataforma.
- **RF-ADM-002 (Gestão Central de Casos Clínicos):** Visão macro de todos os 54 casos ativos da rede, com identificação do protocolo, ortodontista e mentor atribuído.
- **RF-ADM-003 (Conciliação Financeira & Emissão de Boletos):**
  - Módulo de aprovação de boletos de entrada dos tratamentos.
  - Visualização dos splits da 1ª consulta (R$ 100 orto / R$ 50 MKT / R$ 50 comercial).
  - Painel de repasses e monitoramento de recebíveis.
- **RF-ADM-004 (Expedição Logística de Fios Mágicos):**
  - Gestão dos lotes de fios produzidos pelo laboratório que aguardam liberação de envio.
  - Botão administrativo "Aprovar e Liberar Envio".
  - Atribuição de código de rastreamento Sedex e transportadora vinculada ao caso.
- **RF-ADM-005 (Atribuição de Leads & Mobilidade Geográfica):**
  - Lista de novos leads gerados por tráfego com botão para atribuir ao ortodontista credenciado mais próximo geograficamente.
  - Painel de solicitações de **Mobilidade Geográfica**:
    - Passo 1: Agendamento da consulta na clínica de destino.
    - Passo 2: Liberação de acesso temporário ao prontuário.
    - Passo 3: Execução do split financeiro (crédito de R$ 250 para quem atendeu, débito de R$ 250 para a clínica de origem).
    - Passo 4: Revogação automática do acesso ao prontuário digital.
- **RF-ADM-006 (Programas de Expansão - Marketing & Gestão API):**
  - Aba 1: Pacote de Marketing & Vendas (parceiro Murilo) com métricas de adesão (98 contratados, 45 ofertados, 39 rejeitados).
  - Aba 2: Programa de Gestão via API com status de integração dos consultórios (84 integrados, 62 em teste, 36 legado).
- **RF-ADM-007 (Controle Master de Mentoria):**
  - Toggle administrativo: **"Permitir escolha de mentor pelo ortodontista"** (liga/desliga global).
  - Monitoramento da taxa de ocupação dos mentores para prevenção de gargalos operacionais.
- **RF-ADM-008 (Auditoria & Painel de Qualidade Global):**
  - Monitoramento contínuo do NPS da rede dividido por marcos: 1ª Consulta (b16), Manutenções (b19) e Conclusão do Tratamento (b21).
  - Feed em tempo real de depoimentos e avaliações dos pacientes.

---

### 5.6 Perfil Laboratório MWS (Produção & Engenharia)

- **RF-LAB-001 (Esteira Técnica de 4 Status):**
  - Gerenciamento dos casos nas colunas: Aguardando Análise Técnica → Em Análise Técnica → Planejamento Elaborado → Planejamento Entregue.
  - Botões de avanço rápido de etapa com registro automático de timestamps.
- **RF-LAB-002 (Planejamento & Devolutiva do Ortodontista):**
  - Registro de especificações de calibres dos fios linguais para as arcadas superior e inferior.
  - Visualização da devolutiva do ortodontista (Aprovado, Ajustes Solicitados, Pendente).
- **RF-LAB-003 (Manufatura Robótica CNC - 4 Etapas):**
  - Acompanhamento das ordens de dobra robotizada:
    1. Dobragem & Modelagem Robótica (células CNC KUKA-MW).
    2. Acabamento & Eletropolimento (alívio térmico).
    3. Controle de Qualidade (Inspeção a Laser 3D).
    4. Pronto para Expedição (kit estéril lacrado com guia de colagem indireta).
- **RF-LAB-004 (Indicadores de SLA Operacional):**
  - Meta de 24 horas para triagem e análise técnica.
  - Alerta visual vermelho para casos com estouro de prazo de entrega.
- **RF-LAB-005 (Dimensionamento de Equipe e Capacidade):**
  - Cadastro de técnicos e mentores com controle de capacidade máxima (casos simultâneos) e registro de produtividade mensal.
  - Ajuste de parâmetros de fábrica (meta diária de fios customizados).

---

### 5.7 Perfil Lead Qualificado (Funil do Paciente)

- **RF-LEAD-001 (Funil Visual de 5 Etapas):**
  - Exibição do progresso do paciente na esteira comercial:
    1. Cadastro Realizado.
    2. Ortodontista Atribuído.
    3. Primeira Consulta Agendada.
    4. Orçamento Disponibilizado.
    5. Início do Tratamento (Instalação dos Fios).
- **RF-LEAD-002 (Página da Primeira Consulta):**
  - Exibição de data, horário, clínica e especialista responsável.
  - Explicação do investimento (R$ 200,00) e do escaneamento intraoral 3D sem custos adicionais.
  - Botão de confirmação de presença e formulário modal para solicitar reagendamento.
  - Alternador de teste para simular o estado vazio ("Sem consulta agendada").
- **RF-LEAD-003 (Proposta de Orçamento do Tratamento):**
  - Classificação no Protocolo MWS oficial (Classe I a V) e prazo estimado em meses.
  - Tabela comparativa entre pagamento à vista (com desconto adicional) ou parcelamento em entrada + 12 parcelas sem juros.
  - Lista de itens inclusos (fios customizados, colagem indireta, manutenções previstas e contenção).
  - Botão "Aceitar Orçamento & Iniciar Tratamento" e modal de envio de dúvidas diretamente ao ortodontista.
  - Alternador de teste para simular o estado vazio ("Orçamento ainda não emitido").
- **RF-LEAD-004 (Perfil do Ortodontista Credenciado):** Visualização dos dados do especialista da região, avaliações de outros pacientes, endereço completo com mapa ilustrado e botão de contato no WhatsApp.
- **RF-LEAD-005 (Seção Educativa de Tecnologia):** Explicação da diferença entre ortodontia de 1ª geração (aparelhos fixos convencionais), 2ª geração (sistemas plásticos removíveis) e 3ª geração (Magic Wire - fios linguais robotizados 100% invisíveis).

---

## 6. Estrutura da Esteira Técnica e Ciclo de Vida dos Casos

O ciclo de vida completo de um caso clínico no Ecossistema MWS obedece ao fluxo ilustrado a seguir:

```
[Lead / Paciente]
       │
       ▼ (1. Cadastro & Qualificação)
[Time ADM] ──(Atribuição Geográfica)──► [Ortodontista Licenciado]
                                                │
                                                ▼ (2. 1ª Consulta & Escaneamento 3D)
                                        [Abertura de Caso Clínico]
                                                │ (Upload STL + Preferência de Mentor)
                                                ▼
                                    [Esteira de Mentoria MWS]
                                    ├─ 1. Aguardando Análise
                                    ├─ 2. Em Análise
                                    ├─ 3. Em Planejamento
                                    └─ 4. Planejamento Entregue
                                                │ (Devolutiva do Ortodontista)
                                                ▼
                                    [Manufatura Robótica CNC]
                                    ├─ 1. Dobragem & Modelagem Robótica
                                    ├─ 2. Acabamento & Eletropolimento
                                    ├─ 3. CQ Laser 3D
                                    └─ 4. Pronto p/ Expedição
                                                │
                                                ▼
                                    [Logística & Envio Time ADM] ──(Sedex com Rastreio)──► [Consultório]
                                                                                                  │
                                                                                                  ▼
                                                                                        [Instalação & Manutenções]
                                                                                        (8 Sessões com NPS e Pontos)
```

---

## 7. Requisitos Técnicos e Arquitetura do Software

### 7.1 Stack Tecnológica

- **Linguagem:** TypeScript 5.x / JavaScript ES2022.
- **Frontend Core:** React 18 (SPA - Single Page Application) inicializado via Vite.
- **Roteamento:** React Router DOM v6 com roteamento declarativo e rotas protegidas em `src/App.tsx`.
- **Estilização:** Tailwind CSS v3 com variáveis HSL para tema institucional.
- **Design System / Componentes:** Kit completo de primitivos `@/components/ui/` baseado no padrão shadcn/ui e Radix UI (Button, Card, Dialog, Badge, Tabs, Progress, Avatar, Input, Textarea, Switch, Table, Accordion etc.).
- **Ícones:** Pacote `lucide-react`.
- **Notificações:** Hook unificado `use-toast` com componente Toast customizado.
- **Backend Oficial:** Skip Cloud provisionado sobre PocketBase, com client instanciado em `src/lib/pocketbase/client.ts`.
- **Persistência Híbrida:** Clientes de API PocketBase integrados em `src/services/` com fallback automático para mocks em memória e `localStorage` para tolerância a falhas e testes off-grid.

### 7.2 Estrutura do Diretório de Código

```
├── docs/
│   └── REQUISITOS-MWS.md             # Especificação completa do produto
├── pocketbase/
│   └── migrations/                   # 17 migrações JavaScript do banco PocketBase
├── public/                           # Assets estáticos e ícones públicos
├── src/
│   ├── assets/                       # Documentos de apoio e atas de alinhamento
│   ├── components/
│   │   ├── ui/                       # Primitivos shadcn/ui
│   │   ├── Layout.tsx                # Shell da aplicação (Sidebar + Header + Content)
│   │   ├── Navigation.tsx            # Navegação lateral e barra inferior mobile
│   │   ├── MWSLogo.tsx               # Logotipo institucional com gradiente metálico
│   │   └── ProtectedRoute.tsx        # Controle de acesso por perfil (RBAC)
│   ├── hooks/
│   │   ├── use-auth.tsx              # Provedor de contexto de autenticação e sessão
│   │   ├── use-toast.ts              # Disparo de notificações na interface
│   │   └── use-mobile.tsx            # Detecção de telas móveis
│   ├── lib/
│   │   ├── pocketbase/client.ts      # Instância do SDK PocketBase
│   │   └── utils.ts                  # Utilitário cn (clsx + tailwind-merge)
│   ├── pages/
│   │   ├── Admin/                    # 10 telas do Time ADM + mockData.ts
│   │   ├── Dentist/                  # 17 telas do Ortodontista + mockPatients.ts + financingData.ts
│   │   ├── Lab/                      # 7 telas do Laboratório + mockData.ts
│   │   ├── Lead/                     # 5 telas do Lead Qualificado + mockData.ts
│   │   ├── Mentor/                   # 3 telas do Mentor + mockData.ts
│   │   ├── Patient/                  # 6 telas do Paciente + pointsData.ts + surveyData.ts
│   │   ├── Login.tsx                 # Autenticação central com atalhos de perfil
│   │   ├── SignUp.tsx                # Cadastro inicial
│   │   └── Unauthorized.tsx          # Acesso negado
│   ├── services/                     # Integração com coleções PocketBase
│   ├── App.tsx                       # Declaração de todas as rotas da aplicação
│   ├── main.css                      # Estilos globais e tokens de cores Tailwind
│   └── main.tsx                      # Bootstrap React
```

---

## 8. Estrutura de Banco de Dados e Migrações PocketBase

O backend Skip Cloud do ecossistema possui 17 migrações sequenciais em `pocketbase/migrations/` que estruturam coleções, papéis e sementes de dados:

| Arquivo da Migração                         | Objetivo e Estrutura Criada                                                                                                                                                                                                                 |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `0001_modify_users.js`                      | Modifica a coleção de sistema `users`, adicionando o campo `role` como select (`dentist`, `patient`, `admin`, `lab`, `mentor`, `lead`) com regra padrão `dentist`, além de campos demográficos adicionais.                                  |
| `0002_create_entities.js`                   | Cria as coleções fundamentais do ecossistema: `dentists` (dados profissionais, CRO, clínica), `patients` (dados clínicos, histórico) e `clinical_cases` (registro do caso, status, protocolo).                                              |
| `0003_create_events.js`                     | Cria a coleção de telemetria `events` para rastreamento de ações do usuário, onboarding e auditoria.                                                                                                                                        |
| `0004_define_agent.js`                      | Configuração de integração de assistente de inteligência artificial Skip AI.                                                                                                                                                                |
| `0011_seed_data.js`                         | Popula dados iniciais de demonstração para ortodontistas, pacientes e casos clínicos.                                                                                                                                                       |
| `0012_seed_test_accounts.js`                | Cria e garante as contas de teste padrão do sistema com a credencial `Skip@Pass` para `admin`, `dentist`, `patient` e `lab`.                                                                                                                |
| `0013_add_lead_role_and_seed.js`            | Adiciona formalmente a role `lead` ao enum de usuários e cria a conta de teste `lead.teste@mws.com.br` vinculada ao ortodontista credenciado.                                                                                               |
| `0013_update_clinical_cases.js`             | Expande os campos da coleção `clinical_cases` para suportar calibres de fios, notas clínicas, mentor atribuído e status avançados.                                                                                                          |
| `0014_seed_case_data.js`                    | Insere casos clínicos de teste simulando diferentes protocolos (Classe I a Classe V).                                                                                                                                                       |
| `0015_add_unique_rule.js`                   | Cria índices únicos e regras de integridade relacional.                                                                                                                                                                                     |
| `0016_update_dentist_test_account_email.js` | Atualiza e padroniza a conta do ortodontista de testes para o e-mail oficial `ortodontista@magicwire.com`.                                                                                                                                  |
| `0017_add_mentor_role_and_seed.js`          | Adiciona formalmente a role `mentor` à coleção `users`, expande as coleções com suporte a notas de mentoria e sementeia a conta de teste do mentor (`mentor@magicwire.com` com senha `Skip@Pass`), além dos mentores Breno, Aldir e Flávio. |

---

## 9. Requisitos Não Funcionais e Identidade Visual (v0.0.41+)

O design system e o padrão visual do Ecossistema MWS seguem estritamente as diretrizes da versão institucional vigente:

### 9.1 Padrão Cromático

- **Verde Escuro Institucional (`#0d3b2e` / `bg-emerald-950` / `bg-[#0d3b2e]`):**
  - **Uso Restrito:** Aplicado unicamente em testeiras superiores (topbars), barras de navegação lateral (sidebars), cabeçalhos de destaque hero, rodapés, botões de ação primária e acentos de destaque.
  - **Proibição Absoluta:** O fundo geral das páginas **NUNCA** deve ser totalmente verde escuro. O plano de fundo de todas as telas é obrigatoriamente **CLARO** (`bg-slate-50`, `bg-slate-100/70` ou `bg-white`).
- **Gradiente Dourado Metálico:**
  - Inspirado na identidade visual do site oficial (_magicwire.com.br_).
  - Composto pela progressão harmônica: Ouro Claro (`#F5E6A3`) ➔ Ouro Nobre (`#D4AF37`) ➔ Ouro Médio (`#AA7C11`) ➔ Bronze Envelhecido (`#8B6914`).
  - Utilizado em logotipos, insígnias de certificação, selos de qualidade e categorias premium (Ouro/Diamante).
- **Cores Semânticas de Apoio:**
  - Sucesso / Concluído: Verde Esmeralda (`bg-emerald-600`, `text-emerald-800`, `bg-emerald-50`).
  - Alerta / Em Análise: Âmbar (`bg-amber-500`, `text-amber-800`, `bg-amber-50`).
  - Crítico / Atraso de SLA: Vermelho Alaranjado (`bg-red-600`, `text-red-800`, `bg-red-50`).
  - Mentoria & Planejamento: Roxo / Violeta Nobre (`bg-purple-700`, `text-purple-800`, `bg-purple-50`).

### 9.2 Logotipo Institucional (`MWSLogo.tsx`)

- O componente oficial de marca exibe o símbolo gráfico em gradiente dourado metálico acompanhado obrigatoriamente pela inscrição:
  - Título Principal: **MAGIC WIRE SYSTEM** _(Atenção: NÃO grafar "Magic Wire Technic")_.
  - Subtítulo Institucional: **A Verdadeira Ortodontia Invisível**.
- Suporta variações com fundo claro (`darkText={true}`) e fundo escuro (`darkText={false}`).

### 9.3 Responsividade e Usabilidade

- A interface deve ser 100% responsiva (Mobile, Tablet, Desktop).
- Em telas pequenas (`< 768px`), a barra lateral se recolhe automaticamente e a navegação principal é fornecida pelo componente `BottomNav` fixado no rodapé com ícones de toque otimizado.

---

## 10. Convenções de Linguagem Institucional

Para garantir a coerência da marca e o alinhamento com a propriedade intelectual da Magic Wire:

| Termo Proibido / Inadequado | Termo Obrigatório no Ecossistema MWS          | Motivo Clínico e Institucional                                                                                            |
| --------------------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Alinhador / Alinhadores     | **Fio Mágico** ou **Fio Lingual Customizado** | O sistema MWS não é alinhador plástico removível; trata-se de um arco metálico contínuo lingual de 3ª geração.            |
| Dentista                    | **Ortodontista** (com O maiúsculo)            | A rede credenciada é formada exclusivamente por especialistas pós-graduados em ortodontia e treinados na técnica lingual. |
| Aparelho Convencional       | **Sistema Lingual Invisível**                 | Diferenciação direta de aparelhos vestibulares com braquetes visíveis.                                                    |
| Magic Wire Technic          | **Magic Wire System (MWS)**                   | Nomenclatura consolidada da marca e do ecossistema de software.                                                           |

---

## 11. Contas de Teste e Credenciais Mock

Para validação em ambientes de homologação ou replicação em nova conta Skip, as seguintes contas estão pré-configuradas (todas com a mesma senha de acesso):

| Perfil               | E-mail de Teste              | Identificador Curto Alternativo | Senha Padrão | Nome de Exibição               |
| -------------------- | ---------------------------- | ------------------------------- | ------------ | ------------------------------ |
| **Ortodontista**     | `ortodontista@magicwire.com` | `ortodontista`                  | `Skip@Pass`  | Dra. Aline Costa               |
| **Mentor Clínico**   | `mentor@magicwire.com`       | `mentor`                        | `Skip@Pass`  | Dr. Breno / Mentor MWS         |
| **Time ADM MWS**     | `adm@magicwire.com`          | `adm_mws`                       | `Skip@Pass`  | Equipe ADM Central             |
| **Paciente**         | `paciente@magicwire.com`     | `paciente`                      | `Skip@Pass`  | Maria Eduarda Santos           |
| **Laboratório**      | `lab@magicwire.com`          | `lab`                           | `Skip@Pass`  | Laboratório Robótico Central   |
| **Lead Qualificado** | `lead.teste@mws.com.br`      | `lead`                          | `Skip@Pass`  | Marcos Andrade (Lead Campinas) |

_Nota sobre persistência: As sessões utilizam o client PocketBase padrão e contam com fallback no hook `useAuth` armazenado no `localStorage` do navegador, permitindo a navegação e o teste imediato de todas as telas mesmo sem conectividade de backend ativa._

---

## 12. Estado Atual, Pendências e Repositórios

### 12.1 Versão e Código Fonte

- **Versão Atual da Aplicação:** `v0.0.44`.
- **Repositórios GitHub Oficiais com o Código Fonte Atualizado:**
  - Repositório Principal: `d2eadvsr/projeto-ecossistema-mws`
  - Organização Institucional: `ecossistemamws/ecossistema-mws-app`

### 12.2 Registro de Incidente Técnico e Bloqueio de Provisionamento

- **Conta Skip de Destino:** `emilenemarilia-cb86f`.
- **Problema Detectado:** O provisionamento do container backend na conta de destino retornou erro interno de plataforma (_"Project not found"_ durante o handshake de sync).
- **Medida Adotada:** Chamado de suporte de engenharia aberto na plataforma Skip para destravar o provisionamento do projeto de destino.
- **Passos para Replicação quando Liberado:**
  1. Conectar a nova conta ou projeto Skip ao repositório GitHub (`ecossistemamws/ecossistema-mws-app`).
  2. Executar a esteira de migrações (`0001` a `0017`) contidas em `pocketbase/migrations/`.
  3. Validar a inicialização do client em `src/lib/pocketbase/client.ts`.
  4. Executar `run_qa` para atestar lint, build e tipos TypeScript.
  5. Validar o acesso através das credenciais de teste listadas na Seção 11 deste documento.
