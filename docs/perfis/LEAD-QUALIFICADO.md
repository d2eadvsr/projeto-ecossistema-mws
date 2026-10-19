# Documentação de Engenharia Reversa — Perfil Lead Qualificado

**Perfil:** Lead Qualificado (Paciente Interessado em Tratamento Lingual)  
**Rota Base:** `/lead`  
**Credencial de Teste:** `marcos.andrade@email.com` / `Skip@Pass`  
**Role no Sistema:** `lead`  
**Versão Documentada:** `v0.0.45` (conforme `package.json`)  
**Data da Documentação:** Fevereiro de 2026

---

## 1. Menu e Navegação do Perfil

No componente principal de navegação (`src/components/Navigation.tsx`), os itens da Sidebar e BottomNav para a role `lead` são os seguintes:

| Ordem | Rótulo Exibido          | Rota                 |      Ícone      | Descrição                                                          |
| :---: | :---------------------- | :------------------- | :-------------: | :----------------------------------------------------------------- |
|   1   | **Meu Tratamento**      | `/lead`              |   `Sparkles`    | Dashboard com funil de 5 etapas, status atual e resumo do caso     |
|   2   | **Minha Consulta**      | `/lead/consulta`     | `CalendarCheck` | Agendamento, confirmação e preparo para a 1ª consulta de avaliação |
|   3   | **Meu Ortodontista**    | `/lead/ortodontista` |   `UserCheck`   | Perfil público e credenciamento do ortodontista atribuído          |
|   4   | **Valores & Orçamento** | `/lead/orcamento`    |  `DollarSign`   | Proposta financeira, simulação MWS Pay em 10x e garantias          |
|   5   | **A Tecnologia**        | `/lead/tecnologia`   |      `Cpu`      | Educativo sobre 3ª geração da ortodontia (fio lingual robótico)    |

---

## 2. Detalhamento por Tela

### 2.1. Tela: Meu Tratamento (Dashboard do Lead)

- **Arquivo:** `src/pages/Lead/Dashboard.tsx`
- **Rota:** `/lead`
- **Origem da Navegação:** Login como `lead` (`/login`), item "Meu Tratamento" na sidebar, ou redirecionamento de `/dashboard`.

#### (b) Informações Exibidas

- **Cabeçalho:**
  - Título: `"Olá, Marcos Andrade 👋"`
  - Badge de status: `"Etapa 2 de 5 • Consulta Agendada"` (verde/emerald).
  - Subtítulo: `"Bem-vindo ao seu portal Magic Wire. Aqui você acompanha cada etapa da sua jornada com a tecnologia invisível de 3ª geração."`
- **Card Hero — Status Atual da Jornada:**
  - Tag: `"SEU STATUS ATUAL"` com ícone `Clock`.
  - Título: `"1ª Consulta de Avaliação Confirmada"`
  - Descrição: `"Sua primeira consulta com o Dr. Gustavo Siqueira está confirmada para 12/03/2026 às 14:30 na Clínica OrthoDesign Cambuí (Campinas/SP)."`
  - Badges de destaque:
    - `"Escaneamento Intraoral 3D Incluso"`
    - `"Atendimento Presencial Oficial"`
  - Botões de ação direta: `"Ver Detalhes da Consulta"` e `"Conhecer Meu Ortodontista"`.
- **Card da Linha do Tempo / Funil do Lead (5 Etapas):**
  - Título: `"Sua Jornada até o Início do Tratamento"` com ícone `Layers`.
  - Barra de progresso visual (40% concluído).
  - Lista das 5 etapas (`MOCK_FUNNEL_STEPS`):
    1. _Etapa 1: Cadastro & Qualificação_ — Status: Concluída (`completed`) em 01/03/2026. "Perfil cadastrado e aprovado pelo Time ADM MWS".
    2. _Etapa 2: Agendamento da Avaliação_ — Status: Atual (`current`) em 03/03/2026. "Consulta marcada com especialista credenciado".
    3. _Etapa 3: 1ª Consulta & Escaneamento 3D_ — Status: Pendente (`upcoming`). "Escaneamento digital e fotos intraorais na clínica".
    4. _Etapa 4: Proposta & Aprovação do Fio Mágico_ — Status: Pendente (`upcoming`). "Validação do planejamento robótico e condições de pagamento".
    5. _Etapa 5: Início do Tratamento (Instalação Lingual)_ — Status: Pendente (`upcoming`). "Instalação do fio invisível personalizado pelo lado interno dos dentes".
- **Grid de 2 Colunas (Ortodontista Atribuído + Resumo Financeiro):**
  - _Coluna Esquerda — Meu Especialista Credenciado:_
    - Foto de perfil (Avatar), nome `"Dr. Gustavo Siqueira"`, CRO `"CRO-SP 52914"`.
    - Avaliação: `★ 4.9 (48 avaliações)` e `NPS 96%`.
    - Especialidade: `"Especialista em Ortodontia Lingual & MWS"`.
    - Clínica: `"Clínica OrthoDesign Cambuí"`.
    - Endereço: `"Rua Coronel Quirino, 1420 - Cambuí, Campinas - SP"`.
    - Botão: `"Ver Perfil Completo & Localização"` → rota `/lead/ortodontista`.
  - _Coluna Direita — Investimento Transparente MWS:_
    - Valor da 1ª Consulta: `R$ 150,00` ("inclui escaneamento intraoral tridimensional completo").
    - Previsão de Tratamento Lingual: `R$ 4.800 a R$ 7.200` ("estimativa média para casos Classe I e II").
    - Condição especial de parcelamento: `"Em até 10x sem juros no MWS Pay direto na clínica"`.
    - Botão: `"Ver Orçamento Detalhado"` → rota `/lead/orcamento`.
- **Banner Educativo Inferior:**
  - Chamada: `"Por que a 3ª Geração da Ortodontia é Única?"`
  - 3 destaques com ícones:
    - `EyeOff`: _"100% Invisível"_ — O fio é instalado por trás dos dentes; ninguém vê.
    - `Bot`: _"Precisão Robótica"_ — Arcos conformados por robôs no Laboratório Central MWS.
    - `ShieldCheck`: _"Sem Placas para Tirar"_ — Tratamento fixo contínuo sem risco de perda ou esquecimento.
  - Link: `"Entenda a Tecnologia Magic Wire"` → rota `/lead/tecnologia`.

#### (c) Funcionalidades

- Alternar e visualizar o progresso de 5 etapas do funil do paciente interessado.
- Acessar rapidamente o detalhe da consulta confirmada.
- Consultar os dados do ortodontista e clínica designados.
- Navegar para simulação de orçamento e conteúdo tecnológico explicativo.

#### (d) Navegações

- Clicar em `"Ver Detalhes da Consulta"` → navega para `/lead/consulta`.
- Clicar em `"Conhecer Meu Ortodontista"` → navega para `/lead/ortodontista`.
- Clicar em `"Ver Perfil Completo & Localização"` → navega para `/lead/ortodontista`.
- Clicar em `"Ver Orçamento Detalhado"` → navega para `/lead/orcamento`.
- Clicar em `"Entenda a Tecnologia Magic Wire"` → navega para `/lead/tecnologia`.

#### (e) Disposição / Layout

- Layout em container centralizado (`max-w-5xl mx-auto space-y-6`).
- Topo com saudação + badge.
- Card Hero em destaque com borda emerald suave.
- Card de progresso do funil com timeline vertical / cards de etapas.
- Grid responsivo de 2 colunas para Ortodontista e Orçamento.
- Banner informativo escuro/gradiente no rodapé.

---

### 2.2. Tela: Minha Consulta (Agendamento & Preparo)

- **Arquivo:** `src/pages/Lead/Appointment.tsx`
- **Rota:** `/lead/consulta`
- **Origem da Navegação:** Menu lateral "Minha Consulta", botão no Dashboard do Lead, ou links de chamada para ação em Tecnologia e Orçamento.

#### (b) Informações Exibidas

- **Cabeçalho:**
  - Título: `"Minha 1ª Consulta de Avaliação"`
  - Badge: `"Confirmada pela Clínica"` (verde/emerald).
  - Subtítulo: `"Seu primeiro passo rumo ao sorriso com o Fio Mágico Lingual invisível."`
  - Botão de ação: `"Confirmar Presença Antecipada"` (gera toast de confirmação instantânea).
- **Card Hero da Consulta:**
  - Data: `"12 de Março de 2026"` com ícone de calendário.
  - Horário: `"14:30 (duração estimada de 45 minutos)"`.
  - Tipo de Procedimento: `"Consulta de Avaliação Clínica + Escaneamento Intraoral 3D MWS"`.
  - Valor da sessão: `R$ 150,00` (com badge `"Pago / Garantido via MWS"`).
  - Profissional: Dr. Gustavo Siqueira (CRO-SP 52914).
- **Grid de 2 Colunas (Localização & Como Chegar + O Que Esperar):**
  - _Coluna Esquerda — Localização da Clínica & Contato:_
    - Nome: `"Clínica OrthoDesign Cambuí"`.
    - Endereço: `"Rua Coronel Quirino, 1420 - Cambuí, Campinas - SP, CEP 13025-002"`.
    - Telefone: `(19) 3251-8840` / WhatsApp: `(19) 99876-5432`.
    - Mapa mockado interativo estilizado com ponto pulsante.
    - Botões de ação externa:
      - `"Abrir no Google Maps"` (link externo para `maps.google.com`).
      - `"Falar no WhatsApp da Clínica"` (link `wa.me/5519998765432`).
      - `"Copiar Endereço"` (copia para o clipboard).
  - _Coluna Direita — O Que Esperar Desta Primeira Consulta:_
    - 4 etapas sequenciais descritas:
      1. _Exame Clínico Detalhado:_ Análise da oclusão, queixa estética e viabilidade do fio lingual.
      2. _Escaneamento 3D sem Moldagens Desconfortáveis:_ Câmera intraoral que cria o gêmeo digital da arcada em minutos.
      3. _Simulação Digital Prévia:_ Visualização computadorizada da movimentação lingual sem braquetes visíveis.
      4. _Proposta de Tratamento & Parcelamento MWS:_ Plano personalizado com apresentação de valores e opções no boleto ou cartão.
- **Seção de Recomendações Pré-Consulta:**
  - Checklist de preparo: chegar com 10 minutos de antecedência, trazer exames radiográficos prévios caso possua, alimentar-se normalmente.
  - Card de Reagendamento amigável: aviso de que reagendamentos podem ser solicitados com até 24h de antecedência via WhatsApp.

#### (c) Funcionalidades

- Botão `"Confirmar Presença Antecipada"`: dispara toast avisando a clínica da presença do paciente.
- Botão `"Copiar Endereço"`: copia o logradouro completo para a área de transferência.
- Botão de contato direto via WhatsApp da clínica com mensagem pré-preenchida.
- Link direto para navegação no Google Maps com parâmetros da clínica.

#### (d) Navegações

- Clicar em `"Conhecer o Dr. Gustavo"` → rota `/lead/ortodontista`.
- Clicar em `"Ver Opções de Pagamento"` → rota `/lead/orcamento`.

#### (e) Disposição / Layout

- Grid de 2 colunas no desktop, empilhado no mobile.
- Bloco principal da consulta com status e horário em tamanho grande.
- Bloco de mapa e botões utilitários à esquerda; etapas clínicas e checklist à direita.

---

### 2.3. Tela: Meu Ortodontista (Perfil Público Credenciado)

- **Arquivo:** `src/pages/Lead/Dentist.tsx`
- **Rota:** `/lead/ortodontista`
- **Origem da Navegação:** Menu "Meu Ortodontista", links no Dashboard e tela de Consulta.

#### (b) Informações Exibidas

- **Cabeçalho:**
  - Título: `"Meu Ortodontista Credenciado"`
  - Badge: `"Atribuído ao seu perfil"`
  - Subtítulo: `"Especialista selecionado pelo Time ADM MWS com base na sua localização (Campinas/SP)."`
  - Botão WhatsApp: `"Contatar via WhatsApp"` (botão verde oficial `#25D366`).
- **Hero do Perfil do Especialista:**
  - Avatar com foto profissional, selo de verificação (`ShieldCheck`).
  - Nome: `"Dr. Gustavo Siqueira"`
  - Registro: `"CRO-SP 52914"`
  - Avaliação: `★ 4.9 (48 avaliações)` e `NPS 96%`.
  - Especialidade: `"Especialista em Ortodontia Lingual & MWS"`.
  - Clínica: `"Clínica OrthoDesign Cambuí"`.
  - Endereço: `"Rua Coronel Quirino, 1420, Cambuí - Campinas/SP"`.
  - Ações: `"Ver Minha Consulta"` e `"Copiar Endereço"`.
- **Coluna de Bio, Experiência e Certificações:**
  - Texto biográfico completo sobre a formação do Dr. Gustavo, graduação pela Unicamp, especialização em ortodontia lingual e credenciamento oficial no Laboratório Central MWS.
  - 3 Caixas de Métricas do Doutor:
    - `+14 anos` de Experiência em Ortodontia.
    - `+320` Casos com Fios Mágicos tratados com sucesso.
    - `100%` Casos com Robótica MWS.
  - Diferenciais & Formação (Checkmarks):
    - Certificação Nível Master no Magic Wire System (Laboratório Central MWS).
    - Membro ativo da Associação Brasileira de Ortodontia Lingual (ABORL).
    - Clínica equipada com escâner intraoral 3D de última geração.
    - Integração direta com o Time ADM MWS para suporte de garantia nacional.
- **Avaliações Reais de Pacientes:**
  - Depoimento 1: _Camila Silveira (Campinas/SP)_ — "O Dr. Gustavo explicou todo o Fio Mágico e a instalação pelo lado de dentro foi super rápida. Ninguém no meu trabalho notou nada, nem na primeira semana!" (Classe II concluído em 11 meses).
  - Depoimento 2: _Rodrigo Bernardes (Paulínia/SP)_ — "Atendimento impecável na clínica do Cambuí. Não precisei me preocupar com peças para tirar na hora do almoço. Vale cada centavo pela liberdade e discrição." (Classe I concluído em 8 meses).
- **Coluna Lateral de Localização e Horários:**
  - Mini-mapa estilizado com pin pulsante.
  - Telefone, e-mail e horário de atendimento (`Segunda a Sexta: 08:00 às 18:30 | Sábados: 08:00 às 12:30`).
  - Botões: `"Abrir no Google Maps"` e `"Enviar Mensagem no WhatsApp"`.
  - Box explicativo: _"Rede Credenciada Oficial MWS — Dr. Gustavo faz parte dos 182 ortodontistas credenciados no Brasil treinados para instalação de fios linguais com fixação indireta e precisão robótica."_

#### (c) Funcionalidades

- Copiar endereço da clínica para a área de transferência com feedback via toast.
- Abertura direta do WhatsApp web/mobile com mensagem contextualizada para o Dr. Gustavo.
- Abertura direta no Google Maps com busca pelo endereço da clínica.

#### (d) Navegações

- Botão `"Ver Minha Consulta"` → navega para `/lead/consulta`.

#### (e) Disposição / Layout

- Card de topo (Hero) com foto grande e badges de reputação.
- Grade inferior de 2/3 (bio, experiência, depoimentos) e 1/3 (localização, contato, horários e selo da rede).

---

### 2.4. Tela: Valores & Orçamento (Transparência Financeira)

- **Arquivo:** `src/pages/Lead/Budget.tsx`
- **Rota:** `/lead/orcamento`
- **Origem da Navegação:** Menu "Valores & Orçamento", links no Dashboard e em Tecnologia.

#### (b) Informações Exibidas

- **Cabeçalho:**
  - Título: `"Transparência de Valores & Orçamento"`
  - Badge: `"Proposta Personalizada"`
  - Subtítulo: `"Entenda os custos, formas de pagamento facilitadas e tudo o que está incluso no tratamento Magic Wire."`
- **Card da 1ª Consulta de Avaliação:**
  - Valor fixo: `R$ 150,00`.
  - Inclusos: Exame clínico minucioso, Escaneamento Intraoral 3D Digital, Planejamento prévio e Simulação de movimentação lingual.
  - Vantagem de abatimento: _"Caso decida iniciar o tratamento, este valor de R$ 150 é 100% abatido da entrada ou do valor total."_
- **Estimativa Completa do Tratamento Lingual:**
  - Faixa estimada: `R$ 4.800,00 a R$ 7.200,00`.
  - Média da complexidade: `Classe I / II moderada`.
  - Duração estimada do tratamento: `8 a 14 meses`.
  - Comparativo de Custo-Benefício:
    - Aparelhos Visíveis Metálicos: menor custo inicial, mas alta interferência social, machucados frequentes na boca e visitas mensais demoradas.
    - Alinhadores Plásticos Removíveis: custo similar ou mais alto, exigência de 22h/dia de uso, risco de perda/troca de placas e paradas de mastigação.
    - Magic Wire System (3ª Geração): 100% invisível por trás dos dentes, forças suaves contínuas sem esquecimento, fabricação robótica sob medida.
- **Simulador de Parcelamento Interativo (MWS Pay):**
  - Slider / seletor de parcelas: de 1x até 10x sem juros (ou até 24x com juros reduzidos da fintech MWS Pay).
  - Exibição do valor da parcela simulada: ex. `10x de R$ 580,00 sem juros`.
  - Métodos de pagamento aceitos:
    - Cartão de Crédito em até 10x sem comprometer o limite total (recorrência MWS Pay).
    - Boleto Bancário parcelado via análise cadastral instantânea.
    - PIX com 5% de desconto para pagamento à vista.
- **Garantias & O Que Está Incluso:**
  - Selo de Garantia Nacional: se o paciente viajar ou mudar de cidade, o Time ADM MWS redireciona as manutenções para outro especialista credenciado sem perda do planejamento.
  - Fornecimento integral dos arcos de fios de alta tecnologia dobrados por robôs no Laboratório Central.
  - Kit de higienização lingual e contenção final incluída ao término do caso.

#### (c) Funcionalidades

- Alternar número de parcelas no simulador financeiro.
- Visualizar o cálculo em tempo real de parcelas no MWS Pay.
- Botão para tirar dúvidas sobre financiamento direto com a clínica.

#### (d) Navegações

- Botão `"Agendar Avaliação e Garantir Valor"` → rota `/lead/consulta`.
- Link para conhecer o ortodontista → rota `/lead/ortodontista`.

#### (e) Disposição / Layout

- Cards modulares com destaque visual para os números e valores.
- Tabela comparativa entre 1ª, 2ª e 3ª geração ortodôntica.
- Seletor de parcelamento com badges informativos de juros e carência.

---

### 2.5. Tela: A Tecnologia (Educativo sobre o Fio Lingual Robótico)

- **Arquivo:** `src/pages/Lead/Technology.tsx`
- **Rota:** `/lead/tecnologia`
- **Origem da Navegação:** Menu "A Tecnologia", links informativos no Dashboard e rodapé do Lead.

#### (b) Informações Exibidas

- **Hero Educativo em Gradiente Escuro:**
  - Badge: `"3ª Geração da Ortodontia • Fio Lingual Invisível Robótico"`
  - Título: `"A Revolução Silenciosa que Move Seus Dentes por Trás"`
  - Subtítulo: `"Esqueça braquetes colados na frente do sorriso ou placas plásticas que precisam ser retiradas para comer. Conheça a engenharia do Magic Wire System."`
  - Botões de ação: `"Agendar Minha Primeira Avaliação"` e `"Conhecer Meu Ortodontista Credenciado"`.
- **Os 4 Pilares da Tecnologia Magic Wire:**
  1. _Discrição Absoluta (Zero Visibilidade):_ Os fios e suportes ultra-baixos são fixados exclusivamente na face lingual (interna) dos dentes.
  2. _Forças Biológicas Leves e Contínuas:_ Ligas inteligentes de Níquel-Titânio com Cobre (Copper NiTi) que trabalham 24 horas por dia com movimentação constante e sem picos de dor.
  3. _Manufatura Robótica Micrométrica:_ Arcos conformados em células robóticas KUKA multieixo a partir do escaneamento digital do paciente, eliminando o erro manual.
  4. _Sem Interferência Social ou Alimentar:_ Não há necessidade de retirar dispositivos em restaurantes, reuniões de trabalho ou eventos sociais.
- **Quadro Comparativo das 3 Gerações da Ortodontia:**
  - _1ª Geração:_ Aparelhos convencionais metálicos/estéticos colados na frente dos dentes.
  - _2ª Geração:_ Alinhadores plásticos transparentes removíveis (exigem disciplina estrita de 22h diárias e retirada para comer).
  - _3ª Geração MWS:_ Fios inteligentes linguais fixados internamente com planejamento digital e mentoria clínica contínua.
- **Infográfico da Jornada Completa do Lead (5 Passos):**
  - Da qualificação online até a entrega do sorriso com contenção definitiva.
- **Bloco Fabril — Robôs Industriais no Laboratório MWS:**
  - Descrição das ligas termoativadas, precisão micrométrica e supervisão ortodôntica de alto nível.
  - Métricas nacionais do ecossistema: `182` Ortodontistas Credenciados, `+3.400` Leads Atendidos, `100%` Fio Instalado por Dentro, `R$ 150` 1ª Consulta com Escaneamento.
- **FAQ — Perguntas Frequentes:**
  - _O aparelho lingual machuca a língua ou atrapalha a fala?_ (Explicação sobre o perfil ultra-baixo dos suportes e adaptação fonética média de 3 a 5 dias).
  - _Qualquer pessoa pode usar o Fio Mágico?_ (Indicado para mais de 92% das más oclusões: apinhamentos, diastemas, Classe I, II e III).
  - _O tratamento é mais rápido que os aparelhos tradicionais?_ (Sim, devido à força contínua ininterrupta e desenho robótico sem atritos mecânicos desnecessários).
  - _O que acontece se eu me mudar de cidade durante o tratamento?_ (A garantia de mobilidade nacional MWS transfere o prontuário para outro ortodontista credenciado).

#### (c) Funcionalidades

- Leitura de conteúdo técnico mastigado para o paciente leigo.
- Botões de chamada para ação direta para agendar consulta ou tirar dúvidas de orçamento.

#### (d) Navegações

- Clicar em `"Agendar Minha Primeira Avaliação"` → rota `/lead/consulta`.
- Clicar em `"Conhecer Meu Ortodontista Credenciado"` → rota `/lead/ortodontista`.
- Clicar em `"Ver Orçamento & Tirar Dúvidas"` → rota `/lead/orcamento`.

#### (e) Disposição / Layout

- Hero impactante com fundo escuro (`bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950`).
- Grid de 4 cards para os pilares tecnológicos.
- Seção comparativa lado a lado em 3 colunas (1ª, 2ª e 3ª geração).
- Grid de 2 colunas para fábrica robótica e números do ecossistema.
- Grade de 2 colunas para os cards de perguntas e respostas (FAQ).

---

## 3. Padrão Visual Aplicado ao Perfil Lead

- **Cores Principais:**
  - Verde Escuro / Institucional (`#0d3b2e` / `emerald-900` / `emerald-950`): usado na testeira superior, na sidebar lateral, em botões de conversão e nos cards hero.
  - Acento Dourado / Ouro Metálico (`#c69214` / `amber-500` / `text-gold`): estrelas de avaliação, destaques de exclusividade e badges de tecnologia de 3ª geração.
  - Fundo das Telas: Claro e amigável (`bg-slate-50` / `white`), transmitindo limpeza, saúde e tranquilidade ao paciente.
  - Verde WhatsApp oficial (`#25D366` / hover `#1EBE5D`): botões dedicados de contato direto com a clínica.
- **Componentes de Marca:**
  - `MWSLogo`: exibido no topo da barra de navegação com a inscrição oficial `"MAGIC WIRE SYSTEM"` e subtítulo institucional.
  - Badges semânticos do Tailwind/shadcn com cantos arredondados, contrastes adequados e tipografia legível.

---

## 4. Dados Mockados vs. Backend Real

- **Dados Atuais (Mockados em `src/pages/Lead/mockData.ts`):**
  - `MOCK_LEAD_USER`: usuário fixo de demonstração (Marcos Andrade, Campinas/SP, etapa 2).
  - `MOCK_FUNNEL_STEPS`: as 5 fases do funil comercial e clínico do lead.
  - `MOCK_ECOSYSTEM_METRICS`: números de ortodontistas credenciados (182), leads atendidos e valores.
  - `MOCK_TECHNOLOGY_CONTENT`: textos educativos, pilares, comparativos e FAQ.
- **Integração com PocketBase:**
  - O login autentica via coleção `users` do PocketBase (`user.role === 'lead'`).
  - Em produção, os dados do lead serão lidos das coleções de leads qualificados (`leads`), atribuições de ortodontistas (`dentists`) e propostas orçamentárias geradas pelo Time ADM ou pelo próprio consultório.
