import pb from '@/lib/pocketbase/client'

export const logEvent = async (eventName: string, payload: any, source: string = 'frontend') => {
  try {
    await pb.collection('events').create({
      event_name: eventName,
      payload,
      source,
    })
  } catch (error) {
    console.error('Failed to log event', error)
  }
}
