import pb from '@/lib/pocketbase/client'

export type CaseStatus = 'sent_to_lab' | 'lab_responded' | 'in_treatment' | 'concluded'

export interface CaseCounts {
  totalPatients: number
  emAndamento: {
    emPlanejamento: number
    planejados: number
    emTratamento: number
  }
  concluidos: {
    total: number
    aparelhoColocado: number
    manutencoesProgramadas: number[]
  }
}

export const getCases = (filter?: string, expand?: string) =>
  pb.collection('clinical_cases').getFullList({ filter, expand })

export const getDentistCases = (dentistId: string) =>
  pb.collection('clinical_cases').getFullList({
    filter: `dentist = "${dentistId}"`,
    expand: 'patient',
  })

export const getCase = (id: string, expand?: string) =>
  pb.collection('clinical_cases').getOne(id, { expand })

export const createCase = (data: {
  dentist: string
  patient: string
  status: CaseStatus
  notes?: string
  sla_deadline?: string
  lab_response_date?: string
  first_consultation_date?: string
  last_consultation_date?: string
  consultation_count?: number
}) => pb.collection('clinical_cases').create(data)

export const updateCase = (
  id: string,
  data: Partial<{
    dentist: string
    patient: string
    status: CaseStatus
    notes: string
    sla_deadline: string
    lab_response_date: string
    first_consultation_date: string
    last_consultation_date: string
    consultation_count: number
  }>,
) => pb.collection('clinical_cases').update(id, data)

export const deleteCase = (id: string) => pb.collection('clinical_cases').delete(id)

export const getCaseCounts = async (dentistId: string): Promise<CaseCounts> => {
  const cases = await pb.collection('clinical_cases').getFullList({
    filter: `dentist = "${dentistId}"`,
  })

  const anyCases = cases as any[]
  const distinctPatients = new Set(anyCases.map((c) => c.patient))

  const emPlanejamento = anyCases.filter((c) => !c.lab_response_date)
  const planejados = anyCases.filter((c) => c.lab_response_date && !c.first_consultation_date)
  const emTratamento = anyCases.filter(
    (c) => c.first_consultation_date && !c.last_consultation_date,
  )
  const concluidos = anyCases.filter((c) => c.last_consultation_date)

  const aparelhoColocado = concluidos.filter(
    (c) => c.first_consultation_date && (c.consultation_count || 0) === 0,
  )

  const manutencoes = [1, 2, 3, 4, 5, 6].map(
    (n) => concluidos.filter((c) => (c.consultation_count || 0) === n).length,
  )

  return {
    totalPatients: distinctPatients.size,
    emAndamento: {
      emPlanejamento: emPlanejamento.length,
      planejados: planejados.length,
      emTratamento: emTratamento.length,
    },
    concluidos: {
      total: concluidos.length,
      aparelhoColocado: aparelhoColocado.length,
      manutencoesProgramadas: manutencoes,
    },
  }
}
