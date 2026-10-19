# Documentação de Engenharia Reversa — Perfil Paciente

**Perfil:** Paciente em Tratamento Ortodôntico Lingual MWS  
**Rota Base:** `/patient`  
**Credenciais de Teste:**

- `maria.silva@email.com` / `Skip@Pass` (Paciente 1 — Financiamento MWS / Fintech)
- `lucas.ferreira@email.com` / `Skip@Pass` (Paciente 2 — Pagamento Particular / Consultório)  
  **Role no Sistema:** `patient`  
  **Versão Documentada:** `v0.0.45` (conforme `package.json`)  
  **Data da Documentação:** Fevereiro de 2026

---

## 1. Menu e Navegação do Perfil

No componente de navegação (`src/components/Navigation.tsx`), os itens da Sidebar e BottomNav para a role `patient` são:

| Ordem | Rótulo Exibido      | Rota                    |      Ícone      | Descrição                                                                                                    |
| :---: | :------------------ | :---------------------- | :-------------: | :----------------------------------------------------------------------------------------------------------- |
|   1   | **Início**          | `/patient`              |     `Home`      | Dashboard com progresso do tratamento, próxima consulta, lembrete de pesquisas e resumo financeiro (se MWS)  |
|   2   | **Meu Tratamento**  | `/patient/treatment`    |   `Activity`    | Prontuário transparente: fios ativos, 8 sessões pós-aquisição com notas clínicas, documentos, fotos e termos |
|   3   | **Consultas**       | `/patient/appointments` | `CalendarClock` | Histórico de consultas, agendamentos, preparo e resposta a pesquisas de satisfação pós-consulta              |
|   4   | **Pagamentos**      | `/patient/payments`     |  `CreditCard`   | Boletos, parcelas, comprovantes e status financeiro (condicional ao plano de pagamento)                      |
|   5   | **Clube de Pontos** | `/patient/points`       |   `Sparkles`    | Programa de fidelidade MWS Points, missões diárias de cuidado lingual e resgate de recompensas               |
|   6   | **Meu Perfil**      | `/patient/profile`      |     `User`      | Dados cadastrais, endereço, contatos de emergência e histórico médico                                        |

---

## 2. Detalhamento por Tela

### 2.1. Tela: Início (Dashboard do Paciente)

- **Arquivo:** `src/pages/Patient/Dashboard.tsx`
- **Rota:** `/patient`
- **Origem da Navegação:** Login como `patient` (`/login`), item "Início" no menu, ou rota `/dashboard`.

#### (b) Informações Exibidas

- **Cabeçalho:**
  - Avatar com foto ou inicial, nome da paciente (ex.: `"Olá, Maria Eduarda Silva"`).
  - Badge de modalidade: `"Pagamento MWS/Fintech"` (verde) OU `"Paciente Particular"` (cinza).
  - Alternador de demonstração no cabeçalho: botões para simular visualização de Maria Eduarda (MWS) vs. Lucas Ferreira (Particular).
  - Subtítulo: `"Bem-vindo(a) ao seu tratamento Magic Wire Lingual."`
- **Lembrete Inteligente de Pesquisas:**
  - Quando há pesquisas pendentes de consultas _já realizadas_:
    - Banner âmbar/dourado: `"Você tem N pesquisa(s) pendente(s) de consultas já realizadas (X/8 respondidas)"`.
    - Tag: `"Lembrete Amigável"`.
    - Texto explícito de tranquilidade: _"Sua avaliação leva menos de 1 minuto e é essencial para acompanhar a evolução do seu tratamento. Este lembrete é apenas informativo e não impede novos agendamentos."_
    - Links de ação rápida: `"Responder em Consultas"` e `"Ver todas as pesquisas em Meu Tratamento"`.
    - Botão `X` para dispensar lembrete.
  - Quando todas as consultas realizadas já foram avaliadas:
    - Banner verde: `"Suas pesquisas estão todas em dia! (X/8 respondidas) • N de N realizadas avaliadas"`.
- **Card Hero — Progresso do Tratamento Magic Wire:**
  - Título: `"Progresso do Tratamento Magic Wire"` com badge `"Fase 4 de 5 • Manutenções"`.
  - Indicador numérico de percentual (ex.: `38% concluído`).
  - Barra de progresso visual em verde esmeralda.
  - Régua das 5 fases sequenciais:
    1. _Consulta de Avaliação_ (Concluída)
    2. _Planejamento_ (Concluída)
    3. _Instalação_ (Concluída)
    4. _Manutenções_ (Fase Atual — Clicável com link para `/patient/treatment`)
    5. _Conclusão_ (Pendente)
  - Detalhamento das 8 consultas pós-aquisição que compõem o cálculo:
    - Texto: _"Cálculo do percentual: N de 8 consultas pós-aquisição realizadas (1 Instalação + 6 Manutenções + 1 Conclusão)."_
    - Botão sanfona: `"Ver as 8 consultas"` / `"Ocultar consultas"`.
    - Lista expansível com os 8 cards de sessões (Instalação, 1ª a 6ª Manutenções, Conclusão), com badges `Realizada`, `Agendada` ou `Pendente`.
- **Card — Próxima Consulta:**
  - Data: `"18 de Julho, 2026"` às `"14:00"`.
  - Profissional: Dra. Aline Costa (Ortodontista).
  - Tipo: `"Acompanhamento - Manutenções"`.
  - Bloco calendário visual no canto direito (`JUL / 18`).
- **Card — Resumo Financeiro (Regra de Exibição Condicional):**
  - **Exibido APENAS para Pacientes MWS/Fintech:**
    - Badge: `"MWS / Fintech"`.
    - Box de parcelas pagas (ex.: `2/10`) e parcelas pendentes (ex.: `1`).
    - Lista das 3 parcelas mais recentes com valor (`R$ 350,00`), vencimento e badge `Pago` (verde) ou `Pendente` (âmbar).
    - Link: `"Ver todos os pagamentos e comprovantes →"` para `/patient/payments`.
  - **Para Pacientes Particulares:**
    - O bloco de parcelas/boletos NÃO aparece. Em seu lugar, exibe card informativo discreto informando que acertos financeiros são feitos diretamente no consultório da ortodontista credenciada.

#### (c) Funcionalidades

- Alternar entre paciente MWS e particular para verificação de regras de negócio em tempo real.
- Responder pesquisas pendentes sem bloqueio burocrático de navegação.
- Expandir e recolher a lista das 8 consultas do ciclo de manutenções.
- Clicar no marcador "Manutenções" da régua de fases para abrir o prontuário completo.

#### (d) Navegações

- Clicar no link de responder pesquisas → rota `/patient/appointments` ou `/patient/treatment`.
- Clicar na fase Manutenções → rota `/patient/treatment`.
- Clicar em "Ver todos os pagamentos" → rota `/patient/payments`.

#### (e) Disposição / Layout

- Container `max-w-4xl mx-auto space-y-6`.
- Cabeçalho com perfil e switch de demonstração.
- Banner de lembrete no topo.
- Card largo de progresso com régua em 5 etapas e sanfona inferior.
- Card de próxima consulta e card financeiro empilhados.

---

### 2.2. Tela: Meu Tratamento (Prontuário Digital & Transparência)

- **Arquivo:** `src/pages/Patient/Treatment.tsx`
- **Rota:** `/patient/treatment`
- **Origem da Navegação:** Menu "Meu Tratamento", régua de fases do Dashboard, ou links de acompanhamento.

#### (b) Informações Exibidas

- **Cabeçalho:**
  - Título: `"Meu Tratamento Lingual Magic Wire"`
  - Subtítulo: `"Prontuário digital e histórico detalhado das sessões de instalação, manutenções e documentação clínica."`
- **Grid de 2 Colunas no Topo (Profissionais & Fios Ativos):**
  - _Coluna Esquerda — Equipe Responsável:_
    - Dra. Aline Costa (CRO-SP 104.892, Clínica OrthoDesign Jardins).
    - Laboratório Central MWS (Técnico Responsável: Henrique Vasconcelos, Certificação #4412).
  - _Coluna Direita — Fios Linguais em Atividade na Boca:_
    - Arco Superior: `Fio Lingual MWS Customizado Termoativado (0.014" NiTi Copper)` — Instalado em 10/02/2026.
    - Arco Inferior: `Fio Lingual MWS Customizado com Dobras de 1ª Ordem (0.014" NiTi Flex)`.
- **As 8 Sessões do Ciclo Completo (Timeline Detalhada):**
  1. _Sessão 1: Instalação dos Fios Linguais (15/01/2026 - Realizada)_
     - Parecer clínico detalhado da ortodontista sobre colagem indireta e passividade dos fios.
     - Ações realizadas pelo dentista (checklist).
     - Feedback registrado da paciente.
     - Documentos anexados: `Comprovante_Instalacao_Protocolo_MWS.pdf`, `Guia_Higienizacao_Lingual.pdf`, `Certificado_Garantia_Fios.pdf`.
     - Galeria de fotos: Oclusal Superior, Oclusal Inferior, Sorriso Frontal Discreto.
     - Termos de consentimento assinados com hash criptográfico (ex.: `MWS-TCLE-840192-A`).
  2. _Sessão 2: 1ª Manutenção (20/02/2026 - Realizada)_
     - Análise do início do desrotacionamento dos laterais superiores.
     - 2 documentos anexados, 2 fotos intraorais e termo aceito.
  3. _Sessão 3: 2ª Manutenção (28/03/2026 - Realizada)_
     - Nivelamento e coordenação transversal dos arcos.
     - Relatório clínico e fotos enviadas pelo paciente.
  4. _Sessão 4: 3ª Manutenção (18/07/2026 - Agendada / Sessão Vigente)_
     - Orientações de preparo e planejamento para arcos retangulares.
  5. _Sessão 5: 4ª Manutenção (Previsão: Agosto/2026 - Pendente)_
  6. _Sessão 6: 5ª Manutenção (Previsão: Setembro/2026 - Pendente)_
  7. _Sessão 7: 6ª Manutenção (Previsão: Outubro/2026 - Pendente)_
  8. _Sessão 8: Conclusão & Contenção Fixa (Previsão: Novembro/2026 - Pendente)_
- **Visualizador de Fotos e Documentos Integrado:**
  - Clique na foto abre modal em alta resolução.
  - Botão para download de laudos e termos em PDF.
- **Modal de Pesquisa de Satisfação Embutido:**
  - Abre avaliação de 1 minuto para consultas realizadas que ainda não tenham sido respondidas.

#### (c) Funcionalidades

- Navegar por todas as 8 sessões com histórico de condutas clínicas e biomecânica lingual.
- Visualizar e baixar exames, laudos e termos com carimbo de tempo.
- Enviar fotos de autoacompanhamento pelo próprio aplicativo.
- Responder pesquisas de consulta diretamente do prontuário.

#### (d) Navegações

- Sem links externos; modais de imagem e questionário abrem inline.

#### (e) Disposição / Layout

- Hero duplo de profissionais e fios instalados.
- Linha do tempo vertical sanfonada com cartões ricos em informações, badges de estado e galerias de fotos.

---

### 2.3. Tela: Consultas (Agendamento & Avaliações)

- **Arquivo:** `src/pages/Patient/Appointments.tsx`
- **Rota:** `/patient/appointments`
- **Origem da Navegação:** Menu "Consultas", banner de lembrete do Dashboard.

#### (b) Informações Exibidas

- **Cabeçalho:**
  - Título: `"Minhas Consultas & Agendamentos"`
  - Subtítulo: `"Acompanhe suas consultas presenciais, horários marcados e responda às pesquisas de acompanhamento pós-sessão."`
  - Botão de ação: `"Solicitar Novo Horário de Manutenção"`.
- **Próxima Consulta Confirmada (Destaque):**
  - 3ª Manutenção: 18 de Julho de 2026 às 14:00 com Dra. Aline Costa.
  - Local: Clínica OrthoDesign Jardins (Rua Oscar Freire, 1200 - São Paulo/SP).
  - Botões: `"Adicionar ao Google Agenda"` e `"Confirmar Presença"`.
- **Histórico de Consultas Realizadas:**
  - Lista cronológica de consultas passadas.
  - Status da Pesquisa de Satisfação por consulta:
    - `"Pesquisa Respondida ★ 5.0"` (verde).
    - OU `"Responder Pesquisa Pendente"` (botão amarelo pulsante que abre o `SurveyModal`).
- **Instruções de Preparo para Consultas Linguais:**
  - Dicas de higiene antes da sessão, higienização com passa-fio e tempo recomendado de chegada.

#### (c) Funcionalidades

- Abrir o `SurveyModal` para responder o formulário de 4 perguntas com escala de estrelas e comentários.
- Adicionar compromisso ao calendário do celular/Google Agenda via link `.ics` ou URL do Google Calendar.
- Confirmar presença com antecedência.

#### (d) Navegações

- Abrir modal de pesquisa não altera a rota; após preenchimento os dados são persistidos no `localStorage` e evento disparado para atualizar o Dashboard e o Clube de Pontos.

#### (e) Disposição / Layout

- Card de próxima consulta no topo em destaque azul/esmeralda.
- Lista de consultas anteriores com botão de avaliação ao lado de cada uma.

---

### 2.4. Tela: Pagamentos (Boletos & Faturas MWS)

- **Arquivo:** `src/pages/Patient/Payments.tsx`
- **Rota:** `/patient/payments`
- **Origem da Navegação:** Menu "Pagamentos", link "Ver todos os pagamentos" no Dashboard.

#### (b) Informações Exibidas

- **Cabeçalho:**
  - Título: `"Pagamentos & Financeiro MWS"`
  - Subtítulo: `"Gestão das parcelas do tratamento contratado via MWS Pay / Financiamento."`
- **Resumo Geral:**
  - Valor total financiado: `R$ 3.500,00`.
  - Total de parcelas: `10 parcelas de R$ 350,00`.
  - Parcelas quitadas: `2 pagas (R$ 700,00)`.
  - Saldo devedor: `8 parcelas restantes (R$ 2.800,00)`.
- **Tabela de Parcelas:**
  - Número da parcela (ex.: Parcela 01 a 10).
  - Vencimento, Valor, Forma (Boleto/Cartão/PIX).
  - Status: `Pago` (verde), `Em Aberto / A Vencer` (âmbar), `Atrasado` (vermelho).
  - Botões de Ação por Boleto:
    - `"Copiar Linha Digitável"` (copia o código de barras).
    - `"Baixar Boleto PDF"` (download do documento).
    - `"Pagar com PIX"` (abre QR Code PIX).
- **Tratamento de Paciente Particular:**
  - Se o usuário for particular, esta tela exibe mensagem orientando que a gestão de cobrança do seu tratamento é realizada diretamente com o consultório privado da Dra. Aline Costa.

#### (c) Funcionalidades

- Copiar código de barras de boletos para o clipboard.
- Baixar recibos e comprovantes de pagamento de parcelas quitadas.
- Visualizar o histórico completo de faturas.

#### (d) Navegações

- Sem saída para rotas externas.

#### (e) Disposição / Layout

- 3 cards de resumo no topo (Total, Pago, Saldo Devedor).
- Tabela de faturas na base com botões de download e cópia de código.

---

### 2.5. Tela: Clube de Pontos (MWS Points & Recompensas)

- **Arquivo:** `src/pages/Patient/Points.tsx`
- **Rota:** `/patient/points`
- **Origem da Navegação:** Menu "Clube de Pontos" ou banner de pontuação.

#### (b) Informações Exibidas

- **Cabeçalho:**
  - Título: `"Clube de Pontos MWS"`
  - Subtítulo: `"Acumule pontos cuidando do seu sorriso lingual e troque por kits de higiene, descontos e experiências exclusivas."`
- **Card Hero da Pontuação do Paciente:**
  - Saldo atual: ex.: `1.450 Pontos MWS`.
  - Categoria Atual (Tier): `Bronze` → `Prata` → `Ouro` → `Diamante`.
  - Barra de progresso para a próxima categoria (ex.: faltam 550 pontos para a Categoria Ouro).
- **Missões & Atividades para Ganhar Pontos:**
  - Responder Pesquisa de Satisfação Pós-Consulta: `+100 Pontos`.
  - Comparecer à Consulta Sem Faltas ou Desmarques: `+150 Pontos`.
  - Enviar Foto de Acompanhamento Mensal pelo App: `+80 Pontos`.
  - Indicar um Amigo que Iniciar Tratamento Lingual: `+1.000 Pontos`.
- **Catálogo de Resgate de Recompensas:**
  - _Kit Escovação Lingual Premium MWS:_ `800 Pontos`.
  - _Higienizador Ultrassônico de Contenções:_ `1.500 Pontos`.
  - _Desconto de R$ 200 na Contenção Final:_ `2.500 Pontos`.
  - _Sessão de Clareamento Pós-Tratamento:_ `4.000 Pontos`.
- **Extrato de Pontos Recentes:**
  - Histórico de créditos e débitos com data e descrição da atividade.

#### (c) Funcionalidades

- Resgatar recompensas do catálogo com validação de saldo.
- Visualizar as missões disponíveis para acumular pontos.
- Consultar histórico de movimentações no programa de fidelidade.

#### (d) Navegações

- Sem links externos.

#### (e) Disposição / Layout

- Card de gradiente dourado/esmeralda no topo com saldo grande.
- Grid de missões e catálogo de recompensas em cards visuais.

---

### 2.6. Tela: Meu Perfil (Dados Cadastrais)

- **Arquivo:** `src/pages/Patient/Profile.tsx`
- **Rota:** `/patient/profile`
- **Origem da Navegação:** Menu "Meu Perfil".

#### (b) Informações Exibidas

- **Cabeçalho:**
  - Título: `"Meu Perfil Cadastral"`
  - Subtítulo: `"Seus dados pessoais, informações clínicas de contato e preferências de notificação."`
- **Dados Pessoais:**
  - Nome Completo, CPF, Data de Nascimento, E-mail, Telefone/WhatsApp.
  - Endereço residencial com CEP, cidade e estado.
- **Contato de Emergência:**
  - Nome do contato, parentesco e telefone.
- **Dados do Tratamento:**
  - Ortodontista responsável, clínica, data de início e previsão de término.
- **Preferências de Notificações:**
  - Lembretes de consultas por WhatsApp, e-mail sobre manutenções e avisos do Clube de Pontos.

#### (c) Funcionalidades

- Atualizar telefone, e-mail e endereço.
- Configurar canais de aviso de consulta.

#### (d) Navegações

- Sem saída para rotas externas.

#### (e) Disposição / Layout

- Formulário limpo organizado em cards de dados pessoais, emergência e preferências.

---

## 3. Padrão Visual Aplicado ao Perfil Paciente

- **Cores Institucionais:**
  - Verde Escuro MWS (`#0d3b2e` / `emerald-900`): barra superior, barra lateral de navegação e botões principais de ação.
  - Dourado Metálico / Âmbar (`#c69214` / `amber-500`): destaques do Clube de Pontos, estrelas de avaliação e lembretes amigáveis.
  - Roxo Suave (`purple-600` / `purple-50`): área financeira e MWS Pay.
  - Azul Médico (`blue-600` / `blue-50`): blocos de agendamentos e datas de consulta.
  - Fundo Claro (`bg-slate-50` / `white`): conforto visual, clareza e acolhimento para o paciente.
- **Componentes de Marca:**
  - `MWSLogo`: exibido no topo da navegação.
  - Badges de estado do tratamento claros e intuitivos (`Realizada`, `Agendada`, `Pendente`).

---

## 4. Dados Mockados vs. Backend Real

- **Dados Atuais (Mockados em `src/pages/Patient/`):**
  - `MOCK_PATIENTS_LIST`: Maria Eduarda (MWS Pay) e Lucas Ferreira (Particular) em `Dashboard.tsx`.
  - `maintenanceSessions`: as 8 sessões pós-aquisição detalhadas em `Treatment.tsx`.
  - `pointsData.ts`: catálogo de missões, histórico de pontuação e níveis do clube.
  - `surveyData.ts`: questionários de satisfação armazenados no `localStorage` com eventos customizados de sincronização.
- **Integração com PocketBase:**
  - Autenticação via `users` (`role === 'patient'`).
  - Em produção, integra-se com as coleções `patients`, `clinical_cases`, `consultations`, `treatment_sessions`, `surveys` e `financial_installments`.
