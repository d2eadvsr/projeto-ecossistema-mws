export interface MetricSummary {
  label: string
  value: string | number
  sublabel?: string
  trend?: string
  positive?: boolean
}

// 1. Ortodontistas: total 182
// 160 credenciados ativos + 10 em análise de adesão + 8 aguardando assinatura + 4 com pendência de docs = 182
// Perfis públicos submetidos para aprovação: 6 pendentes de moderação
export interface AdminDentist {
  id: string
  name: string
  cro: string
  uf: string
  email: string
  phone: string
  city: string
  submissionDate: string
  status: 'aprovado' | 'em_analise' | 'contrato_pendente' | 'documentacao_pendente'
  contractStatus: 'assinado' | 'aguardando_assinatura' | 'gerado' | 'nao_gerado'
  publicProfileStatus: 'publicado' | 'pendente_avaliacao' | 'rascunho' | 'rejeitado'
  clinicName: string
  casesCount: number
  programMkt: 'contratado' | 'rejeitado' | 'ofertado' | 'sem_oferta'
  programGestao: 'contratado' | 'rejeitado' | 'ofertado' | 'sem_oferta'
  licensePaid: boolean
}

export const MOCK_ADMIN_DENTISTS: AdminDentist[] = [
  {
    id: 'DENT-001',
    name: 'Dra. Camila Vasconcelos',
    cro: 'SP-109432',
    uf: 'SP',
    email: 'camila.vasconcelos@orto.com.br',
    phone: '(11) 98765-4321',
    city: 'São Paulo - Jardins',
    submissionDate: '24/02/2026',
    status: 'em_analise',
    contractStatus: 'nao_gerado',
    publicProfileStatus: 'pendente_avaliacao',
    clinicName: 'Clínica Vasconcelos Ortodontia Estética',
    casesCount: 0,
    programMkt: 'ofertado',
    programGestao: 'ofertado',
    licensePaid: true,
  },
  {
    id: 'DENT-002',
    name: 'Dr. Roberto Takahashi',
    cro: 'SP-98214',
    uf: 'SP',
    email: 'roberto.takahashi@orto.com.br',
    phone: '(11) 97654-3210',
    city: 'São Paulo - Moema',
    submissionDate: '23/02/2026',
    status: 'contrato_pendente',
    contractStatus: 'aguardando_assinatura',
    publicProfileStatus: 'pendente_avaliacao',
    clinicName: 'Takahashi Facial & Smile',
    casesCount: 0,
    programMkt: 'contratado',
    programGestao: 'ofertado',
    licensePaid: true,
  },
  {
    id: 'DENT-003',
    name: 'Dra. Beatriz Fontana',
    cro: 'RJ-76120',
    uf: 'RJ',
    email: 'beatriz.fontana@orto.com.br',
    phone: '(21) 99123-4567',
    city: 'Rio de Janeiro - Barra da Tijuca',
    submissionDate: '21/02/2026',
    status: 'documentacao_pendente',
    contractStatus: 'nao_gerado',
    publicProfileStatus: 'rascunho',
    clinicName: 'Fontana Odonto Lingual',
    casesCount: 0,
    programMkt: 'sem_oferta',
    programGestao: 'sem_oferta',
    licensePaid: false,
  },
  {
    id: 'DENT-004',
    name: 'Dr. Leonardo Duarte',
    cro: 'MG-54210',
    uf: 'MG',
    email: 'leonardo.duarte@orto.com.br',
    phone: '(31) 98834-5678',
    city: 'Belo Horizonte - Savassi',
    submissionDate: '10/01/2026',
    status: 'aprovado',
    contractStatus: 'assinado',
    publicProfileStatus: 'publicado',
    clinicName: 'Instituto Duarte de Ortodontia',
    casesCount: 18,
    programMkt: 'contratado',
    programGestao: 'contratado',
    licensePaid: true,
  },
  {
    id: 'DENT-005',
    name: 'Dra. Vanessa Meirelles',
    cro: 'PR-43901',
    uf: 'PR',
    email: 'vanessa.meirelles@orto.com.br',
    phone: '(41) 99765-8901',
    city: 'Curitiba - Batel',
    submissionDate: '15/01/2026',
    status: 'aprovado',
    contractStatus: 'assinado',
    publicProfileStatus: 'publicado',
    clinicName: 'Meirelles Ortodontia Invisível',
    casesCount: 14,
    programMkt: 'contratado',
    programGestao: 'rejeitado',
    licensePaid: true,
  },
  {
    id: 'DENT-006',
    name: 'Dr. Gustavo Siqueira',
    cro: 'SP-88301',
    uf: 'SP',
    email: 'gustavo.siqueira@orto.com.br',
    phone: '(19) 99456-7890',
    city: 'Campinas - Cambuí',
    submissionDate: '05/02/2026',
    status: 'aprovado',
    contractStatus: 'assinado',
    publicProfileStatus: 'pendente_avaliacao',
    clinicName: 'Siqueira Odontologia Robótica',
    casesCount: 7,
    programMkt: 'ofertado',
    programGestao: 'sem_oferta',
    licensePaid: true,
  },
  {
    id: 'DENT-007',
    name: 'Dra. Fernanda Albuquerque',
    cro: 'RS-33412',
    uf: 'RS',
    email: 'fernanda.albuquerque@orto.com.br',
    phone: '(51) 98123-9988',
    city: 'Porto Alegre - Moinhos de Vento',
    submissionDate: '12/02/2026',
    status: 'aprovado',
    contractStatus: 'assinado',
    publicProfileStatus: 'publicado',
    clinicName: 'Albuquerque Lingual Center',
    casesCount: 9,
    programMkt: 'rejeitado',
    programGestao: 'contratado',
    licensePaid: true,
  },
]

// 2. Pacientes & Leads: total leads gerados = 450
// 180 leads qualificados + 140 consultas agendadas + 100 convertidos em caso + 30 perdidos = 450
export interface AdminLead {
  id: string
  name: string
  email: string
  phone: string
  city: string
  source: 'Instagram ADS' | 'Google Search' | 'Portal Orgânico' | 'Indicação'
  status: 'novo' | 'em_atendimento' | 'agendado' | 'convertido'
  assignedDentistId?: string
  assignedDentistName?: string
  date: string
  region: string
  firstConsultationValue: number
}

export const MOCK_ADMIN_LEADS: AdminLead[] = [
  {
    id: 'LEAD-101',
    name: 'Mariana Pires',
    email: 'mariana.pires@gmail.com',
    phone: '(11) 97123-0044',
    city: 'São Paulo - SP',
    source: 'Instagram ADS',
    status: 'novo',
    date: '25/02/2026',
    region: 'Zona Sul - SP',
    firstConsultationValue: 200,
  },
  {
    id: 'LEAD-102',
    name: 'Carlos Eduardo Nogueira',
    email: 'carlos.en@yahoo.com.br',
    phone: '(11) 98456-1122',
    city: 'São Paulo - SP',
    source: 'Instagram ADS',
    status: 'em_atendimento',
    date: '25/02/2026',
    region: 'Zona Oeste - SP',
    firstConsultationValue: 200,
  },
  {
    id: 'LEAD-103',
    name: 'Juliana Paes Costa',
    email: 'ju.costa@hotmail.com',
    phone: '(21) 99345-6677',
    city: 'Rio de Janeiro - RJ',
    source: 'Portal Orgânico',
    status: 'agendado',
    assignedDentistId: 'DENT-003',
    assignedDentistName: 'Dra. Beatriz Fontana',
    date: '24/02/2026',
    region: 'Barra da Tijuca',
    firstConsultationValue: 200,
  },
  {
    id: 'LEAD-104',
    name: 'Lucas Martins Silveira',
    email: 'lucas.ms@outlook.com',
    phone: '(31) 98711-2233',
    city: 'Belo Horizonte - MG',
    source: 'Instagram ADS',
    status: 'convertido',
    assignedDentistId: 'DENT-004',
    assignedDentistName: 'Dr. Leonardo Duarte',
    date: '22/02/2026',
    region: 'Savassi',
    firstConsultationValue: 200,
  },
  {
    id: 'LEAD-105',
    name: 'Patricia Gomes',
    email: 'patricia.gomes@gmail.com',
    phone: '(41) 99822-3344',
    city: 'Curitiba - PR',
    source: 'Google Search',
    status: 'agendado',
    assignedDentistId: 'DENT-005',
    assignedDentistName: 'Dra. Vanessa Meirelles',
    date: '24/02/2026',
    region: 'Batel',
    firstConsultationValue: 200,
  },
]

// 3. Mobilidade Geográfica (transferência de ortodontista / manutenção em viagem)
export interface GeographicMobilityRequest {
  id: string
  patientId: string
  patientName: string
  originDentistId: string
  originDentistName: string
  originCity: string
  targetCity: string
  temporaryOrPermanent: 'manutencao_temporaria' | 'transferencia_definitiva'
  reason: string
  status:
    | 'solicitado'
    | 'dentista_designado'
    | 'consulta_agendada'
    | 'acesso_liberado'
    | 'concluido'
  assignedDentistId?: string
  assignedDentistName?: string
  consultationDate?: string
  proceduresDone?: string
  creditGeneratedToTarget?: number
  debitGeneratedToOrigin?: number
  accessRevoked?: boolean
}

export const MOCK_MOBILITY_REQUESTS: GeographicMobilityRequest[] = [
  {
    id: 'MOB-2026-001',
    patientId: 'PAT-401',
    patientName: 'Carla Mendes',
    originDentistId: 'DENT-004',
    originDentistName: 'Dr. Leonardo Duarte',
    originCity: 'Belo Horizonte - MG',
    targetCity: 'São Paulo - SP',
    temporaryOrPermanent: 'manutencao_temporaria',
    reason: 'Viagem de trabalho prolongada (30 dias). Necessita ajuste no arco lingual 3.',
    status: 'consulta_agendada',
    assignedDentistId: 'DENT-002',
    assignedDentistName: 'Dr. Roberto Takahashi',
    consultationDate: '03/03/2026 às 15:00',
    creditGeneratedToTarget: 250,
    debitGeneratedToOrigin: 250,
    accessRevoked: false,
  },
  {
    id: 'MOB-2026-002',
    patientId: 'PAT-402',
    patientName: 'Bruno Almeida',
    originDentistId: 'DENT-005',
    originDentistName: 'Dra. Vanessa Meirelles',
    originCity: 'Curitiba - PR',
    targetCity: 'Rio de Janeiro - RJ',
    temporaryOrPermanent: 'transferencia_definitiva',
    reason: 'Mudança de domicílio profissional para o Rio de Janeiro.',
    status: 'solicitado',
    creditGeneratedToTarget: 0,
    debitGeneratedToOrigin: 0,
    accessRevoked: false,
  },
  {
    id: 'MOB-2026-003',
    patientId: 'PAT-403',
    patientName: 'Fernanda Rocha',
    originDentistId: 'DENT-007',
    originDentistName: 'Dra. Fernanda Albuquerque',
    originCity: 'Porto Alegre - RS',
    targetCity: 'Campinas - SP',
    temporaryOrPermanent: 'manutencao_temporaria',
    reason: 'Manutenção periódica 5 durante congresso.',
    status: 'concluido',
    assignedDentistId: 'DENT-006',
    assignedDentistName: 'Dr. Gustavo Siqueira',
    consultationDate: '15/02/2026',
    proceduresDone:
      'Ativação do fio lingual customizado MWS superior e verificação de pontos de contato.',
    creditGeneratedToTarget: 250,
    debitGeneratedToOrigin: 250,
    accessRevoked: true,
  },
]

// 4. Casos Clínicos & Integração Laboratório: total 54 casos ativos
// 12 Aguardando Análise Técnica + 18 Em Análise Técnica + 14 Planejamento Elaborado + 10 Planejamento Entregue = 54
export interface AdminClinicalCase {
  id: string
  patientName: string
  dentistId: string
  dentistName: string
  dentistCity: string
  protocol: 'Classe I' | 'Classe II' | 'Classe III' | 'Classe IV' | 'Classe V'
  stage:
    | 'aguardando_analise_tecnica'
    | 'em_analise_tecnica'
    | 'planejamento_elaborado'
    | 'planejamento_entregue'
  submissionDate: string
  slaDeadline: string
  mentorAssigned: string
  aiReadinessStatus: 'catalogado_ia' | 'em_processamento' | 'pendente_metadados'
  notes: string
  billingStatus: 'aguardando_boleto' | 'boleto_emitido' | 'pago' | 'split_realizado'
  boletoValue: number
}

export const MOCK_ADMIN_CASES: AdminClinicalCase[] = [
  {
    id: 'CAS-2026-001',
    patientName: 'Maria Silva',
    dentistId: 'DENT-004',
    dentistName: 'Dr. Leonardo Duarte',
    dentistCity: 'Belo Horizonte - MG',
    protocol: 'Classe II',
    stage: 'planejamento_elaborado',
    submissionDate: '15/02/2026',
    slaDeadline: '28/02/2026',
    mentorAssigned: 'Prof. Dr. Marcelo Carvalho',
    aiReadinessStatus: 'catalogado_ia',
    notes: 'Prioridade no fechamento de diastema com fios linguais customizados.',
    billingStatus: 'boleto_emitido',
    boletoValue: 2450.0,
  },
  {
    id: 'CAS-2026-002',
    patientName: 'João Santos',
    dentistId: 'DENT-002',
    dentistName: 'Dr. Roberto Takahashi',
    dentistCity: 'São Paulo - SP',
    protocol: 'Classe I',
    stage: 'planejamento_elaborado',
    submissionDate: '20/02/2026',
    slaDeadline: '01/03/2026',
    mentorAssigned: 'Dra. Helena Barreto',
    aiReadinessStatus: 'catalogado_ia',
    notes: 'Ancoragem lingual com diagrama de dobras robotizadas.',
    billingStatus: 'split_realizado',
    boletoValue: 2200.0,
  },
  {
    id: 'CAS-2026-003',
    patientName: 'Ana Costa',
    dentistId: 'DENT-005',
    dentistName: 'Dra. Vanessa Meirelles',
    dentistCity: 'Curitiba - PR',
    protocol: 'Classe III',
    stage: 'planejamento_entregue',
    submissionDate: '08/02/2026',
    slaDeadline: '24/02/2026',
    mentorAssigned: 'Prof. Dr. Marcelo Carvalho',
    aiReadinessStatus: 'catalogado_ia',
    notes: 'Compensação esquelética lingual com fios especiais de níquel-titânio.',
    billingStatus: 'split_realizado',
    boletoValue: 3100.0,
  },
  {
    id: 'CAS-2026-004',
    patientName: 'Pedro Lima',
    dentistId: 'DENT-006',
    dentistName: 'Dr. Gustavo Siqueira',
    dentistCity: 'Campinas - SP',
    protocol: 'Classe IV',
    stage: 'em_analise_tecnica',
    submissionDate: '22/02/2026',
    slaDeadline: '03/03/2026',
    mentorAssigned: 'Dr. Fernando Prado',
    aiReadinessStatus: 'em_processamento',
    notes: 'Diagramação de torque e colagem indireta guiada por computador.',
    billingStatus: 'aguardando_boleto',
    boletoValue: 2800.0,
  },
  {
    id: 'CAS-2026-005',
    patientName: 'Carla Souza',
    dentistId: 'DENT-007',
    dentistName: 'Dra. Fernanda Albuquerque',
    dentistCity: 'Porto Alegre - RS',
    protocol: 'Classe V',
    stage: 'aguardando_analise_tecnica',
    submissionDate: '24/02/2026',
    slaDeadline: '05/03/2026',
    mentorAssigned: 'Fila de Distribuição de Mentoria',
    aiReadinessStatus: 'pendente_metadados',
    notes: 'Caso complexo de assimetria. Aguarda alocação de mentor sênior.',
    billingStatus: 'aguardando_boleto',
    boletoValue: 3400.0,
  },
  {
    id: 'CAS-2026-006',
    patientName: 'Lucas Ferreira',
    dentistId: 'DENT-004',
    dentistName: 'Dr. Leonardo Duarte',
    dentistCity: 'Belo Horizonte - MG',
    protocol: 'Classe II',
    stage: 'planejamento_entregue',
    submissionDate: '10/01/2026',
    slaDeadline: '25/01/2026',
    mentorAssigned: 'Prof. Dr. Marcelo Carvalho',
    aiReadinessStatus: 'catalogado_ia',
    notes: 'Planejamento entregue. Aparelho lingual instalado.',
    billingStatus: 'split_realizado',
    boletoValue: 2600.0,
  },
]

// 5. Logística e Rastreamento de Insumos / Fios Mágicos
export interface AdminShipment {
  id: string
  caseId: string
  patientName: string
  dentistName: string
  destinationCity: string
  items: string
  shippingCarrier: string
  trackingCode: string
  dispatchDate: string
  estimatedDelivery: string
  status: 'aguardando_liberacao' | 'aprovado' | 'em_transporte' | 'entregue'
}

export const MOCK_ADMIN_SHIPMENTS: AdminShipment[] = [
  {
    id: 'LOG-8801',
    caseId: 'CAS-2026-003',
    patientName: 'Ana Costa',
    dentistName: 'Dra. Vanessa Meirelles',
    destinationCity: 'Curitiba - PR',
    items: 'Kit Magic Wire Lingual 0.014 NiTi + Template de Colagem Robótica',
    shippingCarrier: 'Sedex Direto',
    trackingCode: 'MW94821039BR',
    dispatchDate: '25/02/2026',
    estimatedDelivery: '27/02/2026',
    status: 'em_transporte',
  },
  {
    id: 'LOG-8802',
    caseId: 'CAS-2026-006',
    patientName: 'Lucas Ferreira',
    dentistName: 'Dr. Leonardo Duarte',
    destinationCity: 'Belo Horizonte - MG',
    items: 'Kit Fios Customizados MWS Fio 0.016x0.022 TMA Lingual',
    shippingCarrier: 'Loggi Prime',
    trackingCode: 'LG33819203BR',
    dispatchDate: '18/02/2026',
    estimatedDelivery: '20/02/2026',
    status: 'entregue',
  },
  {
    id: 'LOG-8803',
    caseId: 'CAS-2026-001',
    patientName: 'Maria Silva',
    dentistName: 'Dr. Leonardo Duarte',
    destinationCity: 'Belo Horizonte - MG',
    items: 'Kit Inicial Magic Wire Fio Lingual Superior e Inferior + Acessórios',
    shippingCarrier: 'Jadlog Express',
    trackingCode: 'JD77192033BR',
    dispatchDate: '26/02/2026',
    estimatedDelivery: '02/03/2026',
    status: 'aprovado',
  },
  {
    id: 'LOG-8804',
    caseId: 'CAS-2026-002',
    patientName: 'João Santos',
    dentistName: 'Dr. Roberto Takahashi',
    destinationCity: 'São Paulo - SP',
    items: 'Kit Fios Mágicos Customizados MWS Arcada Superior',
    shippingCarrier: 'Portador Próprio MWS',
    trackingCode: 'INT-SP-044',
    dispatchDate: 'Pendente',
    estimatedDelivery: '03/03/2026',
    status: 'aguardando_liberacao',
  },
]

// 6. Financeiro & Split
// Licenciamento R$ 24k por ortodontista
// Split consulta de R$ 200: R$ 100 ortodontista, R$ 50 marketing, R$ 50 vendas
export interface FinancialBoleto {
  id: string
  recipientName: string
  recipientType: 'Ortodontista' | 'Laboratório' | 'MWS Operação'
  description: string
  amount: number
  issueDate: string
  dueDate: string
  status: 'liquidado' | 'emitido' | 'atrasado'
}

export const MOCK_ADMIN_BOLETOS: FinancialBoleto[] = [
  {
    id: 'BOL-901',
    recipientName: 'Dra. Camila Vasconcelos',
    recipientType: 'Ortodontista',
    description: 'Adesão de Licenciamento MWS (Taxa Única de Ingresso)',
    amount: 24000.0,
    issueDate: '24/02/2026',
    dueDate: '28/02/2026',
    status: 'liquidado',
  },
  {
    id: 'BOL-902',
    recipientName: 'Dr. Roberto Takahashi',
    recipientType: 'Ortodontista',
    description: 'Adesão de Licenciamento MWS (Taxa Única de Ingresso)',
    amount: 24000.0,
    issueDate: '23/02/2026',
    dueDate: '27/02/2026',
    status: 'liquidado',
  },
  {
    id: 'BOL-903',
    recipientName: 'Dr. Leonardo Duarte',
    recipientType: 'Ortodontista',
    description: 'Planejamento e Fabricação de Fios Customizados (Caso CAS-2026-001)',
    amount: 2450.0,
    issueDate: '20/02/2026',
    dueDate: '28/02/2026',
    status: 'emitido',
  },
  {
    id: 'BOL-904',
    recipientName: 'Dra. Beatriz Fontana',
    recipientType: 'Ortodontista',
    description: 'Adesão de Licenciamento MWS (Taxa Única de Ingresso)',
    amount: 24000.0,
    issueDate: '21/02/2026',
    dueDate: '25/02/2026',
    status: 'atrasado',
  },
]

// 7. Qualidade Global, NPS & SLAs da Rede
export interface NPSRecord {
  id: string
  patientName: string
  dentistName: string
  rating: number // 0-10
  type: 'Primeira Consulta' | 'Manutenção Contínua' | 'Conclusão de Tratamento'
  date: string
  comment: string
}

export const MOCK_NPS_RECORDS: NPSRecord[] = [
  {
    id: 'NPS-01',
    patientName: 'Carla Mendes',
    dentistName: 'Dr. Leonardo Duarte',
    rating: 10,
    type: 'Manutenção Contínua',
    date: '24/02/2026',
    comment: 'Maravilhoso! Ninguém percebe o fio porque fica por trás dos dentes. Conforto total.',
  },
  {
    id: 'NPS-02',
    patientName: 'Juliana Paes Costa',
    dentistName: 'Dra. Vanessa Meirelles',
    rating: 9,
    type: 'Primeira Consulta',
    date: '23/02/2026',
    comment: 'Atendimento pontual e explicação clara de como funciona o Fio Mágico MWS.',
  },
  {
    id: 'NPS-03',
    patientName: 'Ricardo Tavares',
    dentistName: 'Dr. Leonardo Duarte',
    rating: 10,
    type: 'Conclusão de Tratamento',
    date: '20/02/2026',
    comment: 'Tratamento finalizado em tempo recorde! Dentes perfeitamente alinhados.',
  },
  {
    id: 'NPS-04',
    patientName: 'Lucas Martins',
    dentistName: 'Dr. Gustavo Siqueira',
    rating: 8,
    type: 'Primeira Consulta',
    date: '18/02/2026',
    comment: 'Muito boa a tecnologia, só demorou um pouco na recepção da clínica.',
  },
]

// 8. Escola MWS & Comunidade
export interface SchoolCourse {
  id: string
  title: string
  instructor: string
  modulesCount: number
  duration: string
  category: 'Certificação Inicial' | 'Mecânica Avançada Lingual' | 'Biomecânica MWS'
  enrolledDentists: number
  completionRate: number
  status: 'ativo' | 'em_revisao' | 'rascunho'
}

export const MOCK_SCHOOL_COURSES: SchoolCourse[] = [
  {
    id: 'CRS-01',
    title: 'Certificação Oficial Magic Wire System - 3ª Geração da Ortodontia',
    instructor: 'Prof. Dr. Marcelo Carvalho & Mentores MWS',
    modulesCount: 8,
    duration: '24 horas',
    category: 'Certificação Inicial',
    enrolledDentists: 182,
    completionRate: 94,
    status: 'ativo',
  },
  {
    id: 'CRS-02',
    title: 'Biomecânica de Fios Linguais Robóticos em Casos Complexos (Classe II e III)',
    instructor: 'Dra. Helena Barreto',
    modulesCount: 6,
    duration: '16 horas',
    category: 'Biomecânica MWS',
    enrolledDentists: 120,
    completionRate: 78,
    status: 'ativo',
  },
  {
    id: 'CRS-03',
    title: 'Protocolo de Colagem Indireta Guiada e Gestão de Stops Linguais',
    instructor: 'Dr. Fernando Prado',
    modulesCount: 4,
    duration: '8 horas',
    category: 'Mecânica Avançada Lingual',
    enrolledDentists: 95,
    completionRate: 85,
    status: 'ativo',
  },
]

export interface CommunityTopic {
  id: string
  title: string
  authorName: string
  authorRole: string
  category: 'Dúvidas Clínicas' | 'Mentoria & Casos' | 'Dicas de Colagem'
  repliesCount: number
  likesCount: number
  lastActivity: string
  status: 'aberto' | 'resolvido' | 'fixado'
}

export const MOCK_COMMUNITY_TOPICS: CommunityTopic[] = [
  {
    id: 'TOP-101',
    title: 'Dúvida sobre sequência de fios linguais em mordida profunda',
    authorName: 'Dr. Gustavo Siqueira',
    authorRole: 'Ortodontista Licenciado',
    category: 'Dúvidas Clínicas',
    repliesCount: 7,
    likesCount: 15,
    lastActivity: 'Há 2 horas',
    status: 'resolvido',
  },
  {
    id: 'TOP-102',
    title: 'Guia de Boas Práticas: Como orientar o paciente no primeiro mês com Magic Wire',
    authorName: 'Prof. Dr. Marcelo Carvalho',
    authorRole: 'Mentor Chefe MWS',
    category: 'Mentoria & Casos',
    repliesCount: 24,
    likesCount: 62,
    lastActivity: 'Há 5 horas',
    status: 'fixado',
  },
  {
    id: 'TOP-103',
    title: 'Experiência clínica com dobras de 2ª ordem no Fio Mágico 0.016x0.022',
    authorName: 'Dra. Vanessa Meirelles',
    authorRole: 'Ortodontista Licenciada',
    category: 'Dicas de Colagem',
    repliesCount: 12,
    likesCount: 29,
    lastActivity: 'Ontem',
    status: 'aberto',
  },
]
