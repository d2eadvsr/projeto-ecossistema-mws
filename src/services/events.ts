import pb from '@/lib/pocketbase/client'

export const getEvents = (filter?: string) => pb.collection('events').getFullList({ filter })

export const createEvent = (data: { event_name: string; payload?: any; source?: string }) =>
  pb.collection('events').create(data)
