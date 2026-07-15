import pb from '@/lib/pocketbase/client'

export const getDentists = (filter?: string) => pb.collection('dentists').getFullList({ filter })

export const getDentist = (id: string) => pb.collection('dentists').getOne(id)

export const createDentist = (data: {
  user: string
  cro?: string
  specialization?: string
  nps_score?: number
  license_status?: 'pending' | 'active' | 'suspended'
}) => pb.collection('dentists').create(data)

export const updateDentist = (
  id: string,
  data: Partial<{
    user: string
    cro: string
    specialization: string
    nps_score: number
    license_status: 'pending' | 'active' | 'suspended'
  }>,
) => pb.collection('dentists').update(id, data)

export const deleteDentist = (id: string) => pb.collection('dentists').delete(id)
