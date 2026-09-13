// Sistema de Pontuação e Programa de Fidelidade Magic Wire
// Terminologia padronizada: tecnologia = fio / fio lingual / Magic Wire | profissional = ortodontista

export type TierLevel = 'bronze' | 'prata' | 'ouro' | 'platina' | 'diamante'

export interface PointsCategory {
  id: TierLevel
  name: string
  minPoints: number
  maxPoints: number | null
  badgeColor: string
  textColor: string
  borderColor: string
  bgLight: string
  accentColor: string
  benefits: string[]
  iconName: string
}

export interface PointEarningAction {
  id: string
  title: string
  points: number
  description: string
  category: 'rotina' | 'engajamento' | 'indicacao'
  timing: 'imediato' | 'externo'
  icon: string
  badgeText?: string
}

export interface PointHistoryItem {
  id: string
  title: string
  actionType: string
  points: number
  date: string
  status: 'creditado' | 'em_analise'
  timing: 'imediato' | 'externo'
  note?: string
}

export interface PatientPointsProfile {
  patientId: string
  patientName: string
  totalPoints: number
  referralCode: string
  history: PointHistoryItem[]
}

// 5 Categorias do Programa de Fidelidade:
// Bronze: 0 - 999
// Prata: 1.000 - 1.499 (Maria Eduarda inicia aqui com 1.240 pts)
// Ouro: 1.500 - 2.999 (Faltam 260 pts para Ouro)
// Platina: 3.000 - 4.999
// Diamante: 5.000+
export const REWARDS_TIERS: PointsCategory[] = [
  {
    id: 'bronze',
    name: 'Bronze',
    minPoints: 0,
    maxPoints: 999,
    badgeColor: 'bg-amber-700 text-white',
    textColor: 'text-amber-800',
    borderColor: 'border-amber-300',
    bgLight: 'bg-amber-50',
    accentColor: '#B45309',
    iconName: 'Shield',
    benefits: [
      'Acesso ao clube de vantagens Magic Wire',
      'Lembretes inteligentes de consulta no app',
      'Suporte direto via canal de atendimento da clínica',
    ],
  },
  {
    id: 'prata',
    name: 'Prata',
    minPoints: 1000,
    maxPoints: 1499,
    badgeColor: 'bg-slate-500 text-white',
    textColor: 'text-slate-700',
    borderColor: 'border-slate-300',
    bgLight: 'bg-slate-50',
    accentColor: '#64748B',
    iconName: 'Medal',
    benefits: [
      'Todos os benefícios Bronze',
      'Kit de higiene e passa-fio lingual exclusivo',
      'Desconto de 5% em manutenções ou produtos parceiros',
      'Prioridade moderada em reagendamentos',
    ],
  },
  {
    id: 'ouro',
    name: 'Ouro',
    minPoints: 1500,
    maxPoints: 2999,
    badgeColor: 'bg-amber-500 text-white',
    textColor: 'text-amber-700',
    borderColor: 'border-amber-400',
    bgLight: 'bg-amber-50/70',
    accentColor: '#F59E0B',
    iconName: 'Trophy',
    benefits: [
      'Todos os benefícios Prata',
      'Brinde especial Magic Wire na troca de arco lingual',
      'Check-in preferencial na recepção da clínica credenciada',
      'Desconto de 10% na contenção fixa de conclusão',
      'Pontuação em dobro em campanhas selecionadas',
    ],
  },
  {
    id: 'platina',
    name: 'Platina',
    minPoints: 3000,
    maxPoints: 4999,
    badgeColor: 'bg-cyan-600 text-white',
    textColor: 'text-cyan-800',
    borderColor: 'border-cyan-300',
    bgLight: 'bg-cyan-50',
    accentColor: '#0891B2',
    iconName: 'Award',
    benefits: [
      'Todos os benefícios Ouro',
      'Isenção da taxa de confecção da 1ª contenção lingual',
      'Atendimento VIP com canal direto com a consultoria do tratamento',
      'Acesso antecipado a novas tecnologias e acessórios do ecossistema',
    ],
  },
  {
    id: 'diamante',
    name: 'Diamante',
    minPoints: 5000,
    maxPoints: null,
    badgeColor: 'bg-emerald-600 text-white',
    textColor: 'text-emerald-800',
    borderColor: 'border-emerald-400',
    bgLight: 'bg-emerald-50',
    accentColor: '#059669',
    iconName: 'Crown',
    benefits: [
      'Todos os benefícios Platina',
      'Contenção lingual vitalícia ou bônus integral no plano final',
      'Kit de clareamento supervisionado pelo seu ortodontista credenciado',
      'Embaixador oficial Magic Wire com experiências exclusivas',
    ],
  },
]

// Lista oficial de ações que geram pontos
export const POINT_ACTIONS_CATALOG: PointEarningAction[] = [
  {
    id: 'act-agendamento',
    title: 'Agendamento de consulta',
    points: 30,
    description: 'Solicitar ou agendar sua consulta de manutenção preventiva pelo app.',
    category: 'rotina',
    timing: 'imediato',
    icon: 'CalendarPlus',
    badgeText: 'Imediato',
  },
  {
    id: 'act-confirmacao',
    title: 'Confirmação de presença',
    points: 20,
    description: 'Confirmar sua ida com antecedência ao receber o lembrete da clínica.',
    category: 'rotina',
    timing: 'imediato',
    icon: 'CheckCircle2',
    badgeText: 'Imediato',
  },
  {
    id: 'act-comparecimento',
    title: 'Comparecimento na data e hora agendada',
    points: 40,
    description: 'Pontualidade na clínica credenciada para ativação ou troca do fio lingual.',
    category: 'rotina',
    timing: 'imediato',
    icon: 'Clock',
    badgeText: 'Imediato',
  },
  {
    id: 'act-avaliacao',
    title: 'Avaliação da consulta / Responder pesquisa',
    points: 50,
    description: 'Avaliar o atendimento e registrar seu feedback após a sessão realizada.',
    category: 'engajamento',
    timing: 'imediato',
    icon: 'MessageSquareHeart',
    badgeText: 'Imediato',
  },
  {
    id: 'act-perfil',
    title: 'Manter dados do perfil completos',
    points: 25,
    description: 'Preencher endereço, contatos atualizados e informações cadastrais.',
    category: 'engajamento',
    timing: 'imediato',
    icon: 'UserCheck',
    badgeText: 'Imediato',
  },
  {
    id: 'act-evolucao-foto',
    title: 'Enviar foto de evolução no Meu Tratamento',
    points: 35,
    description: 'Registrar sua evolução com fotos do sorriso no módulo de acompanhamento.',
    category: 'engajamento',
    timing: 'imediato',
    icon: 'Camera',
    badgeText: 'Imediato',
  },
  {
    id: 'act-indicacao',
    title: 'Convite de amigos (Indicação cadastrada)',
    points: 500,
    description:
      'Indicar um amigo que instale o aplicativo e conclua o cadastro com seu link de convite.',
    category: 'indicacao',
    timing: 'externo',
    icon: 'Gift',
    badgeText: 'Recompensa Alta (+500)',
  },
]

// Mock de dados dos pacientes:
// Maria Eduarda: 1.240 pontos -> Categoria Prata -> Faltam 260 pontos para Ouro (1.500)
// Lucas Ferreira: 1.820 pontos -> Categoria Ouro -> Faltam 1.180 pontos para Platina (3.000)
export const INITIAL_PATIENT_POINTS_MAP: Record<string, PatientPointsProfile> = {
  'pat-01': {
    patientId: 'pat-01',
    patientName: 'Maria Eduarda Silva',
    totalPoints: 1240,
    referralCode: 'MARIA-MWS26',
    history: [
      {
        id: 'pts-h1',
        title: 'Avaliação da 2ª Manutenção',
        actionType: 'act-avaliacao',
        points: 50,
        date: '29/03/2026',
        status: 'creditado',
        timing: 'imediato',
        note: 'Pesquisa respondida no app com nota máxima',
      },
      {
        id: 'pts-h2',
        title: 'Comparecimento pontual na clínica',
        actionType: 'act-comparecimento',
        points: 40,
        date: '28/03/2026',
        status: 'creditado',
        timing: 'imediato',
        note: 'Sessão de refinamento biomecânico',
      },
      {
        id: 'pts-h3',
        title: 'Confirmação de presença antecipada',
        actionType: 'act-confirmacao',
        points: 20,
        date: '25/03/2026',
        status: 'creditado',
        timing: 'imediato',
        note: 'Check-in realizado com 3 dias de antecedência',
      },
      {
        id: 'pts-h4',
        title: 'Indicação de amigo (Juliana Costa)',
        actionType: 'act-indicacao',
        points: 500,
        date: '10/03/2026',
        status: 'creditado',
        timing: 'externo',
        note: 'Amigo concluiu cadastro através do link gerado no app',
      },
      {
        id: 'pts-h5',
        title: 'Avaliação da 1ª Manutenção',
        actionType: 'act-avaliacao',
        points: 50,
        date: '21/02/2026',
        status: 'creditado',
        timing: 'imediato',
        note: 'Pesquisa de acompanhamento pós-ativação do fio',
      },
      {
        id: 'pts-h6',
        title: 'Comparecimento pontual na clínica',
        actionType: 'act-comparecimento',
        points: 40,
        date: '20/02/2026',
        status: 'creditado',
        timing: 'imediato',
        note: '1ª Manutenção lingual concluída com sucesso',
      },
      {
        id: 'pts-h7',
        title: 'Confirmação de presença antecipada',
        actionType: 'act-confirmacao',
        points: 20,
        date: '18/02/2026',
        status: 'creditado',
        timing: 'imediato',
      },
      {
        id: 'pts-h8',
        title: 'Indicação de amigo (Camila Rocha)',
        actionType: 'act-indicacao',
        points: 500,
        date: '02/02/2026',
        status: 'creditado',
        timing: 'externo',
        note: 'Amigo concluiu cadastro através do link gerado no app',
      },
      {
        id: 'pts-h9',
        title: 'Cadastro inicial completo',
        actionType: 'act-perfil',
        points: 20,
        date: '15/01/2026',
        status: 'creditado',
        timing: 'imediato',
      },
    ],
  },
  'pat-02': {
    patientId: 'pat-02',
    patientName: 'Lucas Ferreira',
    totalPoints: 1820,
    referralCode: 'LUCAS-MWS26',
    history: [
      {
        id: 'pts-h201',
        title: 'Avaliação da 3ª Manutenção',
        actionType: 'act-avaliacao',
        points: 50,
        date: '31/05/2026',
        status: 'creditado',
        timing: 'imediato',
        note: 'Pesquisa pós-consulta respondida',
      },
      {
        id: 'pts-h202',
        title: 'Comparecimento pontual na clínica',
        actionType: 'act-comparecimento',
        points: 40,
        date: '30/05/2026',
        status: 'creditado',
        timing: 'imediato',
      },
      {
        id: 'pts-h203',
        title: 'Indicação de amigo (Rafael Silveira)',
        actionType: 'act-indicacao',
        points: 500,
        date: '12/05/2026',
        status: 'creditado',
        timing: 'externo',
      },
      {
        id: 'pts-h204',
        title: 'Indicação de amigo (Bruna Melo)',
        actionType: 'act-indicacao',
        points: 500,
        date: '18/04/2026',
        status: 'creditado',
        timing: 'externo',
      },
      {
        id: 'pts-h205',
        title: 'Indicação de amigo (Rodrigo Souza)',
        actionType: 'act-indicacao',
        points: 500,
        date: '20/03/2026',
        status: 'creditado',
        timing: 'externo',
      },
      {
        id: 'pts-h206',
        title: 'Agendamento e presença em consultas',
        actionType: 'act-rotina',
        points: 230,
        date: '15/03/2026',
        status: 'creditado',
        timing: 'imediato',
      },
    ],
  },
}

const POINTS_STORAGE_PREFIX = 'mws_patient_points_v1_'

export function loadPatientPoints(patientId: string): PatientPointsProfile {
  const key = `${POINTS_STORAGE_PREFIX}${patientId}`
  try {
    const raw = localStorage.getItem(key)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (parsed && typeof parsed.totalPoints === 'number') {
        return parsed
      }
    }
  } catch {
    // fallback
  }
  return INITIAL_PATIENT_POINTS_MAP[patientId] || INITIAL_PATIENT_POINTS_MAP['pat-01']
}

export function savePatientPoints(profile: PatientPointsProfile): void {
  const key = `${POINTS_STORAGE_PREFIX}${profile.patientId}`
  try {
    localStorage.setItem(key, JSON.stringify(profile))
    window.dispatchEvent(
      new CustomEvent('mws-points-updated', { detail: { patientId: profile.patientId } }),
    )
  } catch {
    // ignore
  }
}

// Helpers de cálculo de categoria e progresso
export function getCurrentTier(points: number): PointsCategory {
  for (let i = REWARDS_TIERS.length - 1; i >= 0; i--) {
    if (points >= REWARDS_TIERS[i].minPoints) {
      return REWARDS_TIERS[i]
    }
  }
  return REWARDS_TIERS[0]
}

export function getNextTier(points: number): PointsCategory | null {
  const current = getCurrentTier(points)
  const currentIndex = REWARDS_TIERS.findIndex((t) => t.id === current.id)
  if (currentIndex < REWARDS_TIERS.length - 1) {
    return REWARDS_TIERS[currentIndex + 1]
  }
  return null
}

export function getTierProgress(points: number): {
  currentTier: PointsCategory
  nextTier: PointsCategory | null
  pointsNeeded: number
  progressPercent: number
} {
  const currentTier = getCurrentTier(points)
  const nextTier = getNextTier(points)

  if (!nextTier) {
    return {
      currentTier,
      nextTier: null,
      pointsNeeded: 0,
      progressPercent: 100,
    }
  }

  const tierBase = currentTier.minPoints
  const target = nextTier.minPoints
  const pointsNeeded = Math.max(0, target - points)
  const range = target - tierBase
  const progress = Math.min(100, Math.max(0, Math.round(((points - tierBase) / range) * 100)))

  return {
    currentTier,
    nextTier,
    pointsNeeded,
    progressPercent: progress,
  }
}

// Retorna as principais ações recomendadas para atingir a próxima categoria com maior rapidez
export function getFastestActionsToNextTier(pointsNeeded: number): PointEarningAction[] {
  // Ordena por maior pontuação (ex: convite de amigo +500, avaliação +50, comparecimento +40, etc.)
  const sorted = [...POINT_ACTIONS_CATALOG].sort((a, b) => b.points - a.points)
  // Retorna as 3 principais
  return sorted.slice(0, 3)
}
