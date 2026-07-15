import pb from '@/lib/pocketbase/client'

export const getDentists = async () => {
  return await pb.collection('dentists').getFullList({
    expand: 'user',
    sort: '-created',
  })
}

export const getDentistByUserId = async (userId: string) => {
  return await pb.collection('dentists').getFirstListItem(`user = "${userId}"`, {
    expand: 'user',
  })
}
