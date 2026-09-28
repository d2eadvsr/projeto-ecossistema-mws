// Tipos e Mock Data Oficiais do Perfil Mentor MWS

export type MentorCaseStatus =
  | 'aguardando_analise' // Casos que chegaram na esteira e ninguém pegou
  | 'em_analise' // Mentor aceitou e está analisando
  | 'em_planejamento' // Elaborando diagrama, nota técnica e cálculo
  | 'planejamento_entregue' // Devolvido ao ortodontista para aprovação

export interface CaseRedirectionLog {
  id: string
  fromMentorId: string
  fromMentorName: string
  toMentorId: string
  toMentorName: string
  reason: string
  date: string
}

export interface MentorUnavailablePeriod {
  id: string
  mentorId: string
  startDate: string // YYYY-MM-DD
  endDate: string // YYYY-MM-DD
  reason?: string
  createdAt: string
}

export interface MentorProfile {
  id: string
  name: string
  email: string
  phone: string
  cro: string
  specialties: string[]
  bio: string
  avatarUrl?: string
  status: 'ativo' | 'inativo'
  location: string
  totalCasesMentored: number
  activeCasesCount: number
  capacity: number
}

export interface MentorCase {
  id: string
  patientName: string
  dentistId: string
  dentistName: string
  dentistCity: string
  protocol: 'Classe I' | 'Classe II' | 'Classe III' | 'Classe IV' | 'Classe V'
  status: MentorCaseStatus
  submissionDate: string // YYYY-MM-DD
  slaDeadline: string // YYYY-MM-DD
  priority: 'normal' | 'urgente'
  clinicalNotes: string // Nota clínica da abertura (pelo ortodontista)

  // Atribuição de Mentor
  assignedMentorId?: string | null
  assignedMentorName?: string | null
  preferredMentorId?: string | null

  // Planejamento técnico elaborado pelo mentor
  technicalPlanningNote?: string
  estimatedMaintenances?: number
  suggestedFee?: number // Valor sugerido do tratamento / planejamento
  plannedDate?: string

  // Histórico de redirecionamentos
  redirectionHistory: CaseRedirectionLog[]
}

// Chaves de persistência no LocalStorage
const STORAGE_MENTORS_KEY = 'mws_mentors_data_v1'
const STORAGE_PERIODS_KEY = 'mws_mentor_unavailable_periods_v1'
const STORAGE_CASES_KEY = 'mws_mentor_cases_v1'
const STORAGE_SETTINGS_KEY = 'mws_mentor_admin_settings_v1'

export interface MentorSettings {
  allowDentistMentorChoice: boolean // Toggle ADM: padrão ativado
}

// 1. Mentores iniciais citados na reunião (Dr. Breno, Dr. Aldir, Dr. Flávio)
export const INITIAL_MENTORS: MentorProfile[] = [
  {
    id: 'men-breno',
    name: 'Dr. Breno',
    email: 'mentor@magicwire.com',
    phone: '(11) 98877-6655',
    cro: 'SP-CD-89231',
    specialties: [
      'Ortodontia Lingual Customizada',
      'Biomecânica Tridimensional MWS',
      'Casos Complexos de Classe II',
    ],
    bio: 'Ortodontista com mais de 16 anos de prática clínica exclusiva em Ortodontia Lingual. Mentor sênior pioneiro na concepção e validação do fio mágico interno e dos diagramas robóticos tridimensionais.',
    status: 'ativo',
    location: 'São Paulo - SP',
    totalCasesMentored: 142,
    activeCasesCount: 5,
    capacity: 15,
  },
  {
    id: 'men-aldir',
    name: 'Dr. Aldir',
    email: 'aldir.mentor@magicwire.com',
    phone: '(21) 97766-5544',
    cro: 'RJ-CD-67120',
    specialties: [
      'Ortodontia Invisível de 3ª Geração',
      'Expansão e Fechamento de Espaços',
      'Ortopedia Facial Lingual',
    ],
    bio: 'Especialista e Mestre em Ortodontia. Focado na padronização de protocolos clínicos e mentoria de ortodontistas credenciados no ecossistema MWS em todo o território nacional.',
    status: 'ativo',
    location: 'Rio de Janeiro - RJ',
    totalCasesMentored: 118,
    activeCasesCount: 4,
    capacity: 15,
  },
  {
    id: 'men-flavio',
    name: 'Dr. Flávio',
    email: 'flavio.mentor@magicwire.com',
    phone: '(31) 99655-4433',
    cro: 'MG-CD-54312',
    specialties: [
      'Biomecânica de Fios NiTi Copper',
      'Correção de Mordidas Abertas e Cruzadas',
      'Planejamento Digital e Diagramação',
    ],
    bio: 'Doutor em Biomecânica Odontológica. Professor de cursos de imersão lingual e responsável pela tutoria técnica e acompanhamento dos casos mais desafiadores da rede credenciada.',
    status: 'ativo',
    location: 'Belo Horizonte - MG',
    totalCasesMentored: 97,
    activeCasesCount: 3,
    capacity: 15,
  },
]

// 2. Períodos de indisponibilidade iniciais
// Dr. Breno possui indisponibilidade futura (ex: nos próximos dias) para demonstrar a regra de filtragem na abertura
const getTodayIso = () => new Date().toISOString().split('T')[0]
const addDaysIso = (days: number) => {
  const d = new Date()
  d.setDate(d.getDate() + days)
  return d.toISOString().split('T')[0]
}

export const INITIAL_UNAVAILABLE_PERIODS: MentorUnavailablePeriod[] = [
  {
    id: 'unav-001',
    mentorId: 'men-breno',
    startDate: addDaysIso(10), // Intervalo futuro para demonstração da agenda
    endDate: addDaysIso(20),
    reason: 'Participação em congresso internacional de Ortodontia Lingual',
    createdAt: getTodayIso(),
  },
]

// 3. Casos clínicos iniciais mockados nos 4 status do kanban
// Inclui caso com histórico de redirecionamento (Dr. Breno -> Dr. Aldir)
export const INITIAL_MENTOR_CASES: MentorCase[] = [
  // 1. Aguardando Análise (recém-chegados sem aceitação)
  {
    id: 'CAS-2026-101',
    patientName: 'Gabriela Vasconcelos',
    dentistId: 'DENT-004',
    dentistName: 'Dr. Leonardo Duarte',
    dentistCity: 'Belo Horizonte - MG',
    protocol: 'Classe II',
    status: 'aguardando_analise',
    submissionDate: addDaysIso(-1),
    slaDeadline: addDaysIso(2),
    priority: 'urgente',
    clinicalNotes:
      'Paciente adulta com queixa de sobremordida acentuada e apinhamento superior moderado. Deseja máxima discrição lingual com o fio mágico interno.',
    assignedMentorId: null,
    assignedMentorName: null,
    preferredMentorId: 'men-breno',
    redirectionHistory: [],
  },
  {
    id: 'CAS-2026-102',
    patientName: 'Rodrigo Medeiros',
    dentistId: 'DENT-002',
    dentistName: 'Dr. Roberto Takahashi',
    dentistCity: 'São Paulo - SP',
    protocol: 'Classe I',
    status: 'aguardando_analise',
    submissionDate: addDaysIso(0),
    slaDeadline: addDaysIso(3),
    priority: 'normal',
    clinicalNotes:
      'Leve rotação nos incisivos laterais superiores. Solicitado diagrama lingual contínuo com stops customizados.',
    assignedMentorId: null,
    assignedMentorName: null,
    preferredMentorId: 'men-flavio',
    redirectionHistory: [],
  },

  // 2. Em Análise
  {
    id: 'CAS-2026-103',
    patientName: 'Juliana Paes Costa',
    dentistId: 'DENT-005',
    dentistName: 'Dra. Vanessa Meirelles',
    dentistCity: 'Curitiba - PR',
    protocol: 'Classe III',
    status: 'em_analise',
    submissionDate: addDaysIso(-2),
    slaDeadline: addDaysIso(1),
    priority: 'normal',
    clinicalNotes:
      'Mordida cruzada anterior dentária com compensação lingual. Escaneamentos STL importados na íntegra.',
    assignedMentorId: 'men-breno',
    assignedMentorName: 'Dr. Breno',
    preferredMentorId: 'men-breno',
    redirectionHistory: [],
  },

  // 3. Em Planejamento (com histórico de redirecionamento Dr. Breno -> Dr. Aldir)
  {
    id: 'CAS-2026-104',
    patientName: 'Lucas Ferreira Mendes',
    dentistId: 'DENT-006',
    dentistName: 'Dr. Gustavo Siqueira',
    dentistCity: 'Campinas - SP',
    protocol: 'Classe II',
    status: 'em_planejamento',
    submissionDate: addDaysIso(-3),
    slaDeadline: addDaysIso(1),
    priority: 'urgente',
    clinicalNotes:
      'Distalização sequencial dos molares superiores associada à ancoragem lingual MWS.',
    assignedMentorId: 'men-aldir',
    assignedMentorName: 'Dr. Aldir',
    preferredMentorId: 'men-breno',
    redirectionHistory: [
      {
        id: 'red-001',
        fromMentorId: 'men-breno',
        fromMentorName: 'Dr. Breno',
        toMentorId: 'men-aldir',
        toMentorName: 'Dr. Aldir',
        reason:
          'Sobrecarga de casos simultâneos na esteira e compromisso clínico presencial na semana.',
        date: addDaysIso(-1),
      },
    ],
  },
  {
    id: 'CAS-2026-105',
    patientName: 'Mariana Duarte',
    dentistId: 'DENT-007',
    dentistName: 'Dra. Fernanda Albuquerque',
    dentistCity: 'Porto Alegre - RS',
    protocol: 'Classe I',
    status: 'em_planejamento',
    submissionDate: addDaysIso(-2),
    slaDeadline: addDaysIso(2),
    priority: 'normal',
    clinicalNotes:
      'Fechamento de diastemas anteriores e correção da curva de Spee inferior com arco lingual customizado.',
    assignedMentorId: 'men-flavio',
    assignedMentorName: 'Dr. Flávio',
    preferredMentorId: 'men-flavio',
    redirectionHistory: [],
  },

  // 4. Planejamento Entregue (devolvido ao ortodontista para aprovação)
  {
    id: 'CAS-2026-106',
    patientName: 'Carlos Eduardo Nogueira',
    dentistId: 'DENT-004',
    dentistName: 'Dr. Leonardo Duarte',
    dentistCity: 'Belo Horizonte - MG',
    protocol: 'Classe IV',
    status: 'planejamento_entregue',
    submissionDate: addDaysIso(-5),
    slaDeadline: addDaysIso(-1),
    priority: 'normal',
    clinicalNotes:
      'Assimetria de arco e mordida profunda. Requer torque lingual passivo nos anteriores superiores.',
    assignedMentorId: 'men-breno',
    assignedMentorName: 'Dr. Breno',
    preferredMentorId: 'men-breno',
    technicalPlanningNote:
      'Planejamento lingual MWS estruturado em 3 fases mecânicas. Fase 1: nivelamento e descompensação com arco 0.014 NiTi lingual; Fase 2: retração anterior com arco 0.016x0.022 CuNiTi conformação robótica; Fase 3: finalização oclusal e intercuspidação com arcos TMA. Sequência de colagem indireta com guias 3D anexada.',
    estimatedMaintenances: 8,
    suggestedFee: 9200.0,
    plannedDate: addDaysIso(-1),
    redirectionHistory: [],
  },
  {
    id: 'CAS-2026-107',
    patientName: 'Beatriz Vasques',
    dentistId: 'DENT-002',
    dentistName: 'Dr. Roberto Takahashi',
    dentistCity: 'São Paulo - SP',
    protocol: 'Classe II',
    status: 'planejamento_entregue',
    submissionDate: addDaysIso(-6),
    slaDeadline: addDaysIso(-2),
    priority: 'normal',
    clinicalNotes:
      'Correção de relação molar de Classe II com mecânica lingual contínua e sem necessidade de exodontias.',
    assignedMentorId: 'men-aldir',
    assignedMentorName: 'Dr. Aldir',
    preferredMentorId: 'men-aldir',
    technicalPlanningNote:
      'Planejamento aprovado para execução robótica. Prescrição de 7 manutenções clínicas estimadas. Iniciar com nivelamento suave de ambos os arcos para preservar ancoragem cortical posterior.',
    estimatedMaintenances: 7,
    suggestedFee: 8500.0,
    plannedDate: addDaysIso(-2),
    redirectionHistory: [],
  },
]

// -------------------------------------------------------------
// FUNÇÕES DE SERVIÇO / REPOSITÓRIO COM PERSISTÊNCIA EM LOCALSTORAGE
// -------------------------------------------------------------

export function loadMentors(): MentorProfile[] {
  try {
    const raw = localStorage.getItem(STORAGE_MENTORS_KEY)
    if (raw) return JSON.parse(raw)
  } catch (err) {
    console.error('Erro ao ler mentores do storage:', err)
  }
  saveMentors(INITIAL_MENTORS)
  return INITIAL_MENTORS
}

export function saveMentors(mentors: MentorProfile[]) {
  try {
    localStorage.setItem(STORAGE_MENTORS_KEY, JSON.stringify(mentors))
  } catch (err) {
    console.error('Erro ao salvar mentores no storage:', err)
  }
}

export function loadUnavailablePeriods(): MentorUnavailablePeriod[] {
  try {
    const raw = localStorage.getItem(STORAGE_PERIODS_KEY)
    if (raw) return JSON.parse(raw)
  } catch (err) {
    console.error('Erro ao ler periodos do storage:', err)
  }
  saveUnavailablePeriods(INITIAL_UNAVAILABLE_PERIODS)
  return INITIAL_UNAVAILABLE_PERIODS
}

export function saveUnavailablePeriods(periods: MentorUnavailablePeriod[]) {
  try {
    localStorage.setItem(STORAGE_PERIODS_KEY, JSON.stringify(periods))
  } catch (err) {
    console.error('Erro ao salvar periodos no storage:', err)
  }
}

export function loadMentorCases(): MentorCase[] {
  try {
    const raw = localStorage.getItem(STORAGE_CASES_KEY)
    if (raw) return JSON.parse(raw)
  } catch (err) {
    console.error('Erro ao ler casos de mentor do storage:', err)
  }
  saveMentorCases(INITIAL_MENTOR_CASES)
  return INITIAL_MENTOR_CASES
}

export function saveMentorCases(cases: MentorCase[]) {
  try {
    localStorage.setItem(STORAGE_CASES_KEY, JSON.stringify(cases))
  } catch (err) {
    console.error('Erro ao salvar casos de mentor no storage:', err)
  }
}

export function loadMentorSettings(): MentorSettings {
  try {
    const raw = localStorage.getItem(STORAGE_SETTINGS_KEY)
    if (raw) return JSON.parse(raw)
  } catch (err) {
    console.error('Erro ao ler configuracoes de mentor do storage:', err)
  }
  const defaultSettings: MentorSettings = { allowDentistMentorChoice: true }
  saveMentorSettings(defaultSettings)
  return defaultSettings
}

export function saveMentorSettings(settings: MentorSettings) {
  try {
    localStorage.setItem(STORAGE_SETTINGS_KEY, JSON.stringify(settings))
  } catch (err) {
    console.error('Erro ao salvar configuracoes de mentor no storage:', err)
  }
}

/**
 * Verifica se um mentor está indisponível em uma data específica (YYYY-MM-DD)
 */
export function isMentorUnavailableOnDate(
  mentorId: string,
  targetDateIso: string,
  periods?: MentorUnavailablePeriod[],
): boolean {
  const allPeriods = periods || loadUnavailablePeriods()
  return allPeriods.some((p) => {
    if (p.mentorId !== mentorId) return false
    return targetDateIso >= p.startDate && targetDateIso <= p.endDate
  })
}

/**
 * Retorna somente os mentores ativos e disponíveis em uma determinada data (padrão: hoje)
 */
export function getAvailableMentorsForDate(
  dateIso?: string,
  mentorsList?: MentorProfile[],
  periodsList?: MentorUnavailablePeriod[],
): MentorProfile[] {
  const targetDate = dateIso || getTodayIso()
  const mentors = mentorsList || loadMentors()
  const periods = periodsList || loadUnavailablePeriods()

  return mentors.filter((m) => {
    if (m.status !== 'ativo') return false
    const unavailable = isMentorUnavailableOnDate(m.id, targetDate, periods)
    return !unavailable
  })
}

/**
 * Atualiza o planejamento técnico elaborado pelo mentor e devolve ao ortodontista (status: planejamento_entregue)
 */
export function submitTechnicalPlanning(
  caseId: string,
  planning: {
    technicalPlanningNote: string
    estimatedMaintenances: number
    suggestedFee: number
    mentorId: string
    mentorName: string
  },
): MentorCase | null {
  const cases = loadMentorCases()
  const idx = cases.findIndex((c) => c.id === caseId)
  if (idx === -1) return null

  const updated: MentorCase = {
    ...cases[idx],
    status: 'planejamento_entregue',
    assignedMentorId: planning.mentorId,
    assignedMentorName: planning.mentorName,
    technicalPlanningNote: planning.technicalPlanningNote,
    estimatedMaintenances: planning.estimatedMaintenances,
    suggestedFee: planning.suggestedFee,
    plannedDate: new Date().toLocaleDateString('pt-BR'),
  }

  cases[idx] = updated
  saveMentorCases(cases)
  return updated
}

/**
 * Redirecionamento de caso clínico:
 * Caso o mentor esteja sobrecarregado, transfere para outro mentor disponível e grava o log histórico.
 */
export function redirectMentorCase(
  caseId: string,
  fromMentor: { id: string; name: string },
  toMentor: { id: string; name: string },
  reason: string,
): MentorCase | null {
  const cases = loadMentorCases()
  const idx = cases.findIndex((c) => c.id === caseId)
  if (idx === -1) return null

  const targetCase = cases[idx]
  const newLog: CaseRedirectionLog = {
    id: `red-${Date.now()}`,
    fromMentorId: fromMentor.id,
    fromMentorName: fromMentor.name,
    toMentorId: toMentor.id,
    toMentorName: toMentor.name,
    reason,
    date: new Date().toLocaleDateString('pt-BR'),
  }

  const updated: MentorCase = {
    ...targetCase,
    assignedMentorId: toMentor.id,
    assignedMentorName: toMentor.name,
    // Mantém o status atual ou define como em_analise se estava em outra fase
    status: targetCase.status === 'aguardando_analise' ? 'em_analise' : targetCase.status,
    redirectionHistory: [newLog, ...targetCase.redirectionHistory],
  }

  cases[idx] = updated
  saveMentorCases(cases)
  return updated
}

/**
 * Assume um caso da fila "Aguardando análise"
 */
export function acceptCaseForAnalysis(
  caseId: string,
  mentor: { id: string; name: string },
): MentorCase | null {
  const cases = loadMentorCases()
  const idx = cases.findIndex((c) => c.id === caseId)
  if (idx === -1) return null

  const updated: MentorCase = {
    ...cases[idx],
    assignedMentorId: mentor.id,
    assignedMentorName: mentor.name,
    status: 'em_analise',
  }

  cases[idx] = updated
  saveMentorCases(cases)
  return updated
}

/**
 * Avança o caso de "Em análise" para "Em planejamento"
 */
export function moveToPlanningStage(caseId: string): MentorCase | null {
  const cases = loadMentorCases()
  const idx = cases.findIndex((c) => c.id === caseId)
  if (idx === -1) return null

  const updated: MentorCase = {
    ...cases[idx],
    status: 'em_planejamento',
  }

  cases[idx] = updated
  saveMentorCases(cases)
  return updated
}
