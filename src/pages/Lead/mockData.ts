export interface LeadFunnelStatus {
  step: number
  title: string
  label: string
  description: string
  date?: string
  status: 'completed' | 'current' | 'pending'
}

export interface LeadDentistProfile {
  id: string
  name: string
  cro: string
  specialty: string
  clinicName: string
  address: string
  neighborhood: string
  city: string
  state: string
  cep: string
  phone: string
  whatsapp: string
  email: string
  avatarUrl: string
  rating: number
  reviewsCount: number
  bio: string
  nps: number
  differentialBadge: string
  openingHours: string
  experienceYears: number
  treatedCases: number
}

export interface LeadAppointment {
  id: string
  date: string
  time: string
  weekday: string
  clinicName: string
  dentistName: string
  cro: string
  address: string
  status: 'agendada' | 'confirmada' | 'reagendamento_solicitado' | 'realizada'
  consultationValue: number
  splitInfo: {
    dentist: number
    marketing: number
    sales: number
  }
  chiefComplaint: string
  whatToExpect: Array<{
    title: string
    description: string
  }>
  instructions: string[]
}

export interface LeadTreatmentBudget {
  id: string
  issuedAt: string
  validUntil: string
  status: 'disponivel' | 'aceito' | 'em_analise' | 'expirado'
  protocolClass: 'Classe I' | 'Classe II' | 'Classe III' | 'Classe IV' | 'Classe V'
  protocolName: string
  estimatedMonths: number
  treatmentGoal: string
  suggestedMwsPrice: number
  finalPrice: number
  discountValue: number
  paymentOptions: {
    cash: {
      price: number
      discountPercent: number
      method: string
    }
    installment: {
      entryFee: number
      installmentsCount: number
      installmentValue: number
      totalValue: number
      paymentMethod: string
    }
  }
  breakdown: Array<{
    item: string
    description: string
    included: boolean
  }>
  includedBenefits: string[]
}

export interface LeadCurrentUser {
  id: string
  name: string
  email: string
  phone: string
  city: string
  state: string
  neighborhood: string
  funnelStatus:
    | 'novo'
    | 'qualificado'
    | 'consulta_agendada'
    | 'orcamento_elaborado'
    | 'convertido'
    | 'perdido'
  funnelLabel: string
  leadOrigin: string
  createdAt: string
  assignedDentist: LeadDentistProfile
  appointment: LeadAppointment
  budget: LeadTreatmentBudget
}

export const MOCK_LEAD_USER: LeadCurrentUser = {
  id: 'LEAD-2026-CAMPINAS-08',
  name: 'Marcos Andrade',
  email: 'lead.teste@mws.com.br',
  phone: '(19) 98765-4321',
  city: 'Campinas',
  state: 'SP',
  neighborhood: 'Cambuí',
  funnelStatus: 'consulta_agendada',
  funnelLabel: 'Primeira Consulta Agendada',
  leadOrigin: 'Instagram ADS',
  createdAt: '18/02/2026',
  assignedDentist: {
    id: 'DENT-006',
    name: 'Dr. Gustavo Siqueira',
    cro: 'CRO-SP 88.301',
    specialty: 'Ortodontia Lingual & Tecnologia Robótica MWS',
    clinicName: 'Siqueira Odontologia Robótica',
    address: 'Rua Coronel Quirino, 1420 - Sala 62',
    neighborhood: 'Cambuí',
    city: 'Campinas',
    state: 'SP',
    cep: '13025-002',
    phone: '(19) 3251-4080',
    whatsapp: '5519994567890',
    email: 'gustavo.siqueira@orto.com.br',
    avatarUrl: 'https://img.usecurling.com/ppl/medium?gender=male&seed=44',
    rating: 4.96,
    reviewsCount: 128,
    bio: 'Especialista credenciado Magic Wire System em Campinas/SP com mais de 14 anos de experiência clínica. Mestre em Ortodontia com certificação avançada em fixação lingual indireta robotizada.',
    nps: 98,
    differentialBadge: 'Ortodontista Credenciado Ouro MWS (182 Credenciados)',
    openingHours: 'Segunda a Sexta, das 08h às 19h | Sábados, das 08h às 13h',
    experienceYears: 14,
    treatedCases: 340,
  },
  appointment: {
    id: 'APT-MWS-2026-99',
    date: '10/03/2026',
    time: '14:30',
    weekday: 'Terça-feira',
    clinicName: 'Siqueira Odontologia Robótica - Cambuí',
    dentistName: 'Dr. Gustavo Siqueira',
    cro: 'CRO-SP 88.301',
    address: 'Rua Coronel Quirino, 1420 - Sala 62 - Cambuí, Campinas - SP',
    status: 'agendada',
    consultationValue: 200,
    splitInfo: {
      dentist: 100,
      marketing: 50,
      sales: 50,
    },
    chiefComplaint:
      'Queixa principal: apinhamento anteroinferior e mordida profunda, buscando discrição absoluta sem nada colado na frente dos dentes.',
    whatToExpect: [
      {
        title: '1. Avaliação Clínica e Queixa Principal',
        description:
          'O ortodontista examina detalhadamente sua saúde bucal, sorriso e histórico para entender seus objetivos com discrição total.',
      },
      {
        title: '2. Escaneamento Digital Intraoral 3D',
        description:
          'Mapeamento tridimensional de todos os seus dentes sem moldagens desconfortáveis, enviando o modelo diretamente ao Laboratório MWS.',
      },
      {
        title: '3. Análise do Protocolo MWS (Classe I a V)',
        description:
          'Determinação do protocolo clínico adequado ao seu grau de correção para planejar o fio lingual robótico customizado.',
      },
      {
        title: '4. Elaboração do Orçamento Personalizado',
        description:
          'Apresentação de valores, tempo estimado de tratamento e planos de pagamento aprovados pelo ecossistema MWS.',
      },
    ],
    instructions: [
      'Chegue com 15 minutos de antecedência para recepção e preenchimento da ficha digital.',
      'Traga documento com foto e exames odontológicos ou radiografias recentes se possuir.',
      'A consulta tem duração média de 45 a 60 minutos.',
      'Estacionamento conveniado no local (Edifício Helbor Cambuí).',
    ],
  },
  budget: {
    id: 'ORC-2026-8831',
    issuedAt: '28/02/2026',
    validUntil: '15/03/2026',
    status: 'disponivel',
    protocolClass: 'Classe II',
    protocolName: 'Protocolo MWS Classe II (Correção Moderada com Dobras Robotizadas)',
    estimatedMonths: 12,
    treatmentGoal:
      'Correção de apinhamento moderado e restabelecimento de guia canina via fios linguais de níquel-titânio termoativados conformados por robôs industriais.',
    suggestedMwsPrice: 9400,
    finalPrice: 8900,
    discountValue: 500,
    paymentOptions: {
      cash: {
        price: 8455,
        discountPercent: 5,
        method: 'À vista via Pix ou Boleto Bancário com 5% de desconto',
      },
      installment: {
        entryFee: 1500,
        installmentsCount: 12,
        installmentValue: 616.67,
        totalValue: 8900,
        paymentMethod:
          'Entrada de R$ 1.500 no boleto + 12x de R$ 616,67 no cartão de crédito ou boleto split MWS',
      },
    },
    breakdown: [
      {
        item: 'Planejamento Digital e Mentoria Clínica MWS',
        description:
          'Simulação 3D, diagramação de forças linguais e acompanhamento com mentores ortodônticos seniores do comitê científico.',
        included: true,
      },
      {
        item: 'Fabricação Robótica Customizada no Laboratório MWS',
        description:
          'Conformação automatizada dos fios linguais de alta precisão em liga nobre de níquel-titânio e guias de colagem indireta.',
        included: true,
      },
      {
        item: 'Guia de Colagem Indireta de Alta Precisão',
        description:
          'Garante posicionamento milimétrico dos attachments pelo lado interno dos dentes com conforto na instalação.',
        included: true,
      },
      {
        item: 'Consultas de Acompanhamento e Manutenções',
        description:
          'Todas as consultas de ativação e acompanhamento periódicas com o Dr. Gustavo Siqueira em Campinas.',
        included: true,
      },
      {
        item: 'Garantia e Mobilidade Geográfica Nacional',
        description:
          'Suporte em mais de 182 ortodontistas credenciados em todo o território nacional se você viajar ou mudar de cidade.',
        included: true,
      },
    ],
    includedBenefits: [
      'Tratamento 100% invisível — nada colado na face frontal dos dentes',
      'Fio Mágico de 3ª Geração: forças biológicas leves e contínuas',
      'Liberdade total para sorrir, falar e participar de reuniões sem aparelhos visíveis',
      'Higienização desimpedida e sem risco de perda ou esquecimento em restaurantes',
      'Split financeiro oficial emitido diretamente pelo Time ADM MWS',
    ],
  },
}

export const MOCK_FUNNEL_STEPS: LeadFunnelStatus[] = [
  {
    step: 1,
    title: 'Lead Recebido',
    label: 'Formulário Preenchido',
    description:
      'Cadastro realizado via campanhas oficiais (Instagram ADS). 450 leads gerados na base geral.',
    date: '18/02/2026',
    status: 'completed',
  },
  {
    step: 2,
    title: 'Qualificação Time ADM',
    label: 'Lead Qualificado',
    description:
      'Time ADM MWS validou o perfil e interesse no Fio Mágico (180 leads qualificados no funil).',
    date: '19/02/2026',
    status: 'completed',
  },
  {
    step: 3,
    title: 'Atribuição Local',
    label: 'Ortodontista Designado',
    description:
      'Atribuído ao Dr. Gustavo Siqueira (Campinas/SP) na rede de 182 ortodontistas credenciados.',
    date: '20/02/2026',
    status: 'completed',
  },
  {
    step: 4,
    title: 'Primeira Consulta',
    label: 'Consulta Agendada',
    description:
      'Avaliação clínica e escaneamento 3D agendados para 10/03/2026 às 14:30 (140 agendados no funil).',
    date: '10/03/2026',
    status: 'current',
  },
  {
    step: 5,
    title: 'Orçamento MWS',
    label: 'Protocolo & Valores',
    description:
      'Apresentação do Caso Clínico (Protocolo Classe II) e plano de pagamento personalizado.',
    date: 'Pós-consulta',
    status: 'pending',
  },
  {
    step: 6,
    title: 'Início do Tratamento',
    label: 'Conversão em Paciente',
    description:
      'Assinatura, emissão do boleto de entrada/split pelo Time ADM e início do Fio Mágico.',
    date: 'Aguardando',
    status: 'pending',
  },
]

export const MOCK_ECOSYSTEM_METRICS = {
  totalLeads: 450,
  qualifiedLeads: 180,
  scheduledConsultations: 140,
  convertedPatients: 100,
  lostLeads: 30,
  accreditedDentists: 182,
  firstConsultationPrice: 200,
  consultationSplit: {
    dentist: 100,
    marketing: 50,
    sales: 50,
  },
}

export const MOCK_TECHNOLOGY_CONTENT = {
  hero: {
    badge: 'Ortodontia de 3ª Geração',
    title: 'Magic Wire: O Fio Mágico e Invisível da Ortodontia',
    subtitle:
      'Uma nova tecnologia mundial instalada exclusivamente pelo lado interno dos dentes. Sem aparelhos visíveis na frente do sorriso, sem peças plásticas para tirar na hora das refeições e com robótica industrial de precisão.',
  },
  pillars: [
    {
      title: '100% Invisível e Discreto',
      description:
        'Instalado na face lingual (lado interno dos dentes). Ninguém percebe que você está corrigindo seu sorriso, mesmo de perto.',
      icon: 'EyeOff',
    },
    {
      title: '3ª Geração da Ortodontia',
      description:
        'A 1ª geração foi o aparelho metálico visível; a 2ª geração dependia de trocar peças constantemente. A 3ª geração inaugurada pela Magic Wire combina o fio invisível interno com robótica e forças biológicas suaves contínuas.',
      icon: 'Sparkles',
    },
    {
      title: 'Fabricação Robótica no Laboratório MWS',
      description:
        'Cada arco e curva é dobrado sob medida por braços robóticos industriais com precisão micrométrica a partir do seu escaneamento 3D.',
      icon: 'Bot',
    },
    {
      title: 'Não Altera Sua Rotina',
      description:
        'Você não precisa se preocupar em retirar e colocar nada antes de comer, tomar um café ou discursar. Fica fixo com conforto e liberdade total.',
      icon: 'HeartHandshake',
    },
  ],
  funnelJourney: [
    {
      step: '01',
      title: 'Formulário de Interesse',
      desc: 'O lead conhece a tecnologia Magic Wire pelas campanhas digitais e preenche suas informações de contato e cidade.',
    },
    {
      step: '02',
      title: 'Qualificação Time ADM',
      desc: 'A equipe interna MWS analisa a necessidade ortodôntica e seleciona o especialista mais próximo entre os 182 credenciados.',
    },
    {
      step: '03',
      title: 'Primeira Consulta & Escaneamento',
      desc: 'Consulta presencial de avaliação clínica (R$ 200) com escaneamento digital 3D e definição do protocolo clínico.',
    },
    {
      step: '04',
      title: 'Orçamento Transparente',
      desc: 'O ortodontista define o Protocolo MWS (Classe I a V), tempo em meses e condições de pagamento parcelado ou à vista.',
    },
    {
      step: '05',
      title: 'Boleto Time ADM & Conversão',
      desc: 'Após a aprovação, o Time ADM MWS emite o boleto da entrada/split e os fios mágicos entram na linha robótica de produção.',
    },
  ],
  faq: [
    {
      q: 'O que diferencia a Magic Wire de outros tratamentos ortodônticos?',
      a: 'A Magic Wire é instalada na face lingual (lado interno dos dentes), tornando-se completamente invisível. Além disso, os fios são conformados roboticamente sob medida para sua anatomia, aplicando forças biológicas contínuas que respeitam seus tecidos bucais.',
    },
    {
      q: 'Incomoda a língua ou afeta a fala?',
      a: 'O perfil dos fios e dos dispositivos linguais MWS é ultrafino e anatômico. O período de adaptação costuma levar apenas de 2 a 5 dias, muito inferior ao de sistemas convencionais.',
    },
    {
      q: 'Qual o valor da primeira consulta e como funciona?',
      a: 'A primeira consulta tem o valor padrão de R$ 200 na rede credenciada MWS (com split de R$ 100 ao ortodontista, R$ 50 para marketing de geração de demanda e R$ 50 para suporte de vendas MWS). Ela inclui avaliação clínica completa e escaneamento digital 3D.',
    },
    {
      q: 'O que acontece após a primeira consulta?',
      a: 'Seu ortodontista apresentará o orçamento detalhado (Classificação do Protocolo MWS, tempo estimado em meses e formas de pagamento). Assim que você aceitar, você se torna oficialmente um paciente Magic Wire.',
    },
  ],
}
