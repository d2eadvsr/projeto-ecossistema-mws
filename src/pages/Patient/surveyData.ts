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
// No estado mock inicial de Maria Eduarda, para manter conformidade com a validação da sponsor
// e o exemplo citado (5/8 respondidas), mockamos as 5 primeiras com resposta e 3 pendentes.
const STORAGE_KEY = 'mws_patient_surveys_v1'

export const INITIAL_PATIENT_SURVEYS: PatientConsultationSurvey[] = [
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
    consultationDate: '25/04/2026',
    consultationStatus: 'completed',
    isAnswered: true,
    response: {
      rating: 5,
      comfortRating: 5,
      npsScore: 10,
      comments: 'Excelente consulta e pontualidade na Clínica OrthoDesign.',
      answeredAt: '26/04/2026',
    },
  },
  {
    id: 'srv-5',
    consultationId: 'c-5',
    consultationOrder: 5,
    consultationTitle: '4ª Manutenção (Ajuste de Torque Lingual)',
    consultationType: 'manutencao',
    consultationDate: '30/05/2026',
    consultationStatus: 'completed',
    isAnswered: true,
    response: {
      rating: 4,
      comfortRating: 4,
      npsScore: 9,
      comments: 'Ativação do fio lingual sem dor excessiva, mastigação preservada.',
      answeredAt: '01/06/2026',
    },
  },
  {
    id: 'srv-6',
    consultationId: 'c-6',
    consultationOrder: 6,
    consultationTitle: '5ª Manutenção',
    consultationType: 'manutencao',
    consultationDate: '18/07/2026',
    consultationStatus: 'scheduled',
    isAnswered: false,
  },
  {
    id: 'srv-7',
    consultationId: 'c-7',
    consultationOrder: 7,
    consultationTitle: '6ª Manutenção',
    consultationType: 'manutencao',
    consultationDate: 'Previsão: Agosto/2026',
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

export function loadPatientSurveys(): PatientConsultationSurvey[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed) && parsed.length === 8) {
        return parsed
      }
    }
  } catch {
    // fallback to initial
  }
  return INITIAL_PATIENT_SURVEYS
}

export function savePatientSurveys(surveys: PatientConsultationSurvey[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(surveys))
    window.dispatchEvent(new Event('mws-surveys-updated'))
  } catch {
    // ignore
  }
}
