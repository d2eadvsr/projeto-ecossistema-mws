import pb from '@/lib/pocketbase/client'

export const getPatients = async () => {
  return await pb.collection('patients').getFullList({
    expand: 'user',
    sort: '-created',
  })
}

export const getPatientByUserId = async (userId: string) => {
  return await pb.collection('patients').getFirstListItem(`user = "${userId}"`, {
    expand: 'user',
  })
}
