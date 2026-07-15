import pb from '@/lib/pocketbase/client'

export const getPatients = (filter?: string) => pb.collection('patients').getFullList({ filter })

export const getPatient = (id: string) => pb.collection('patients').getOne(id)

export const createPatient = (data: {
  user: string
  document_id?: string
  credit_status?: 'pending' | 'approved' | 'rejected'
  treatment_progress?: number
}) => pb.collection('patients').create(data)

export const updatePatient = (
  id: string,
  data: Partial<{
    user: string
    document_id: string
    credit_status: 'pending' | 'approved' | 'rejected'
    treatment_progress: number
  }>,
) => pb.collection('patients').update(id, data)

export const deletePatient = (id: string) => pb.collection('patients').delete(id)
