import pb from '@/lib/pocketbase/client'

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
  status: 'analyzing' | 'production' | 'delivered'
  notes?: string
  sla_deadline?: string
}) => pb.collection('clinical_cases').create(data)

export const updateCase = (
  id: string,
  data: Partial<{
    dentist: string
    patient: string
    status: 'analyzing' | 'production' | 'delivered'
    notes: string
    sla_deadline: string
  }>,
) => pb.collection('clinical_cases').update(id, data)

export const deleteCase = (id: string) => pb.collection('clinical_cases').delete(id)
