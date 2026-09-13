export interface PatientSurveyQuestion {
  id: string
  label: string
  type: 'rating' | 'boolean' | 'text'
}

export interface PatientSurveyResponse {
  rating: number // 1 to 5
  comfortRating: number // 1 to 5
  npsScore: number // 0 to 10
  comments?: string
  answeredAt: string
}

export interface PatientConsultationSurvey {
  id: string
  consultationId: string
  consultationOrder: number
  consultationTitle: string
  consultationType: 'instalacao' | 'manutencao' | 'conclusao'
  consultationDate?: string
  consultationStatus: 'completed' | 'scheduled' | 'pending'
  isAnswered: boolean
  response?: PatientSurveyResponse
}

// 8 consultas pós-aquisição correspondentes à jornada do paciente:
// 1 Instalação + 6 Manutenções (1ª a 6ª) + 1 Conclusão
// Regra de consistência:
// O número de pesquisas respondidas deve ser derivado e coincidir exatamente com as consultas
// pós-aquisição já realizadas pelo paciente que foram avaliadas.
// Perfil Maria Eduarda (pat-01): 3 realizadas (Instalação + 1ª e 2ª Manutenções), todas as 3 avaliadas.
// Consultas futuras (3ª a 6ª Manutenções + Conclusão): 5 pendentes/agendadas, ainda não passíveis de avaliação.
// Perfil Lucas Ferreira (pat-02): 4 realizadas (Instalação + 1ª, 2ª e 3ª Manutenções), 4 avaliadas e 4 pendentes.
const STORAGE_PREFIX = 'mws_patient_surveys_v2_'

export const INITIAL_PATIENT_SURVEYS_PAT1: PatientConsultationSurvey[] = [
  {
    id: 'srv-1',
    consultationId: 'c-1',
    consultationOrder: 1,
    consultationTitle: 'Instalação do Fio Lingual',
    consultationType: 'instalacao',
    consultationDate: '15/01/2026',
    consultationStatus: 'completed',
    isAnswered: true,
    response: {
      rating: 5,
      comfortRating: 5,
      npsScore: 10,
      comments:
        'Instalação muito tranquila e a Dra. Aline foi super atenciosa ao explicar o fio lingual.',
      answeredAt: '16/01/2026',
    },
  },
  {
    id: 'srv-2',
    consultationId: 'c-2',
    consultationOrder: 2,
    consultationTitle: '1ª Manutenção',
    consultationType: 'manutencao',
    consultationDate: '20/02/2026',
    consultationStatus: 'completed',
    isAnswered: true,
    response: {
      rating: 5,
      comfortRating: 4,
      npsScore: 9,
      comments: 'Adaptação excelente aos fios linguais! Quase imperceptível no dia a dia.',
      answeredAt: '21/02/2026',
    },
  },
  {
    id: 'srv-3',
    consultationId: 'c-3',
    consultationOrder: 3,
    consultationTitle: '2ª Manutenção',
    consultationType: 'manutencao',
    consultationDate: '28/03/2026',
    consultationStatus: 'completed',
    isAnswered: true,
    response: {
      rating: 5,
      comfortRating: 5,
      npsScore: 10,
      comments:
        'Evolução muito rápida dos dentes da frente sem ninguém notar que estou de aparelho.',
      answeredAt: '29/03/2026',
    },
  },
  {
    id: 'srv-4',
    consultationId: 'c-4',
    consultationOrder: 4,
    consultationTitle: '3ª Manutenção (Checagem de Alinhamento)',
    consultationType: 'manutencao',
    consultationDate: '18/07/2026',
    consultationStatus: 'scheduled',
    isAnswered: false,
  },
  {
    id: 'srv-5',
    consultationId: 'c-5',
    consultationOrder: 5,
    consultationTitle: '4ª Manutenção (Ajuste de Torque Lingual)',
    consultationType: 'manutencao',
    consultationDate: 'Previsão: Agosto/2026',
    consultationStatus: 'pending',
    isAnswered: false,
  },
  {
    id: 'srv-6',
    consultationId: 'c-6',
    consultationOrder: 6,
    consultationTitle: '5ª Manutenção',
    consultationType: 'manutencao',
    consultationDate: 'Previsão: Setembro/2026',
    consultationStatus: 'pending',
    isAnswered: false,
  },
  {
    id: 'srv-7',
    consultationId: 'c-7',
    consultationOrder: 7,
    consultationTitle: '6ª Manutenção',
    consultationType: 'manutencao',
    consultationDate: 'Previsão: Outubro/2026',
    consultationStatus: 'pending',
    isAnswered: false,
  },
  {
    id: 'srv-8',
    consultationId: 'c-8',
    consultationOrder: 8,
    consultationTitle: 'Conclusão & Contenção Fixa',
    consultationType: 'conclusao',
    consultationDate: 'Previsão: Novembro/2026',
    consultationStatus: 'pending',
    isAnswered: false,
  },
]

export const INITIAL_PATIENT_SURVEYS_PAT2: PatientConsultationSurvey[] = [
  {
    id: 'srv-201',
    consultationId: 'c-201',
    consultationOrder: 1,
    consultationTitle: 'Instalação do Fio Lingual',
    consultationType: 'instalacao',
    consultationDate: '10/02/2026',
    consultationStatus: 'completed',
    isAnswered: true,
    response: {
      rating: 5,
      comfortRating: 5,
      npsScore: 10,
      comments: 'Excelente instalação, muito discreta e profissional.',
      answeredAt: '11/02/2026',
    },
  },
  {
    id: 'srv-202',
    consultationId: 'c-202',
    consultationOrder: 2,
    consultationTitle: '1ª Manutenção',
    consultationType: 'manutencao',
    consultationDate: '15/03/2026',
    consultationStatus: 'completed',
    isAnswered: true,
    response: {
      rating: 5,
      comfortRating: 4,
      npsScore: 9,
      comments: 'Ativação rápida e precisa com a Dra. Aline.',
      answeredAt: '16/03/2026',
    },
  },
  {
    id: 'srv-203',
    consultationId: 'c-203',
    consultationOrder: 3,
    consultationTitle: '2ª Manutenção',
    consultationType: 'manutencao',
    consultationDate: '22/04/2026',
    consultationStatus: 'completed',
    isAnswered: true,
    response: {
      rating: 5,
      comfortRating: 5,
      npsScore: 10,
      comments: 'Ótima evolução dos arcos linguais.',
      answeredAt: '23/04/2026',
    },
  },
  {
    id: 'srv-204',
    consultationId: 'c-204',
    consultationOrder: 4,
    consultationTitle: '3ª Manutenção',
    consultationType: 'manutencao',
    consultationDate: '30/05/2026',
    consultationStatus: 'completed',
    isAnswered: true,
    response: {
      rating: 5,
      comfortRating: 5,
      npsScore: 10,
      comments: 'Alinhamento avançando perfeitamente e sem desconforto.',
      answeredAt: '31/05/2026',
    },
  },
  {
    id: 'srv-205',
    consultationId: 'c-205',
    consultationOrder: 5,
    consultationTitle: '4ª Manutenção (Ajuste de Torque Lingual)',
    consultationType: 'manutencao',
    consultationDate: '25/07/2026',
    consultationStatus: 'scheduled',
    isAnswered: false,
  },
  {
    id: 'srv-206',
    consultationId: 'c-206',
    consultationOrder: 6,
    consultationTitle: '5ª Manutenção',
    consultationType: 'manutencao',
    consultationDate: 'Previsão: Agosto/2026',
    consultationStatus: 'pending',
    isAnswered: false,
  },
  {
    id: 'srv-207',
    consultationId: 'c-207',
    consultationOrder: 7,
    consultationTitle: '6ª Manutenção',
    consultationType: 'manutencao',
    consultationDate: 'Previsão: Setembro/2026',
    consultationStatus: 'pending',
    isAnswered: false,
  },
  {
    id: 'srv-208',
    consultationId: 'c-208',
    consultationOrder: 8,
    consultationTitle: 'Conclusão & Contenção Fixa',
    consultationType: 'conclusao',
    consultationDate: 'Previsão: Outubro/2026',
    consultationStatus: 'pending',
    isAnswered: false,
  },
]

// Compatibilidade direta com o mock principal (Maria Eduarda - 3 de 8 respondidas)
export const INITIAL_PATIENT_SURVEYS: PatientConsultationSurvey[] = INITIAL_PATIENT_SURVEYS_PAT1

const ACTIVE_PATIENT_KEY = 'mws_active_patient_id'

export function getActivePatientId(): string {
  try {
    return localStorage.getItem(ACTIVE_PATIENT_KEY) || 'pat-01'
  } catch {
    return 'pat-01'
  }
}

export function setActivePatientId(patientId: string): void {
  try {
    localStorage.setItem(ACTIVE_PATIENT_KEY, patientId)
    window.dispatchEvent(new CustomEvent('mws-patient-changed', { detail: { patientId } }))
  } catch {
    // ignore
  }
}

export function loadPatientSurveys(patientId?: string): PatientConsultationSurvey[] {
  const effectiveId = patientId || getActivePatientId()
  const storageKey = `${STORAGE_PREFIX}${effectiveId}`
  const initialData =
    effectiveId === 'pat-02' ? INITIAL_PATIENT_SURVEYS_PAT2 : INITIAL_PATIENT_SURVEYS_PAT1

  try {
    const raw = localStorage.getItem(storageKey)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed) && parsed.length === 8) {
        return parsed
      }
    }
  } catch {
    // fallback to initial
  }
  return initialData
}

export function savePatientSurveys(surveys: PatientConsultationSurvey[], patientId?: string): void {
  const effectiveId = patientId || getActivePatientId()
  const storageKey = `${STORAGE_PREFIX}${effectiveId}`
  try {
    localStorage.setItem(storageKey, JSON.stringify(surveys))
    window.dispatchEvent(new Event('mws-surveys-updated'))
  } catch {
    // ignore
  }
}
