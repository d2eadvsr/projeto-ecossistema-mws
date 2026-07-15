import pb from '@/lib/pocketbase/client'

// Dentists
export const getDentistProfile = async (userId: string) => {
  try {
    return await pb.collection('dentists').getFirstListItem(`user_id="${userId}"`)
  } catch (e) {
    return null
  }
}

// Patients
export const getPatientProfile = async (userId: string) => {
  try {
    return await pb.collection('patients').getFirstListItem(`user_id="${userId}"`)
  } catch (e) {
    return null
  }
}

// Cases
export const getCases = async () => {
  return await pb
    .collection('clinical_cases')
    .getFullList({ expand: 'dentist_id.user_id,patient_id.user_id', sort: '-created' })
}

export const updateCaseStatus = async (id: string, status: string) => {
  return await pb.collection('clinical_cases').update(id, { status })
}

// Metrics (Simulated aggregation for Dashboard)
export const getDashboardMetrics = async () => {
  const events = await pb.collection('events').getFullList()
  const cases = await pb.collection('clinical_cases').getFullList()
  const dentists = await pb.collection('dentists').getFullList()

  return {
    totalCases: cases.length,
    activeDentists: dentists.filter((d) => d.license_status === 'active').length,
    eventsCount: events.length,
    mrr: dentists.filter((d) => d.license_status === 'active').length * 299, // Simulated MRR
  }
}

// Custom Routes
export const generateMarketingContent = async (topic: string) => {
  return await pb.send('/backend/v1/mkt-generate', {
    method: 'POST',
    body: JSON.stringify({ topic }),
    headers: { 'Content-Type': 'application/json' },
  })
}

export const simulateCredit = async (amount: number) => {
  return await pb.send('/backend/v1/simulate-credit', {
    method: 'POST',
    body: JSON.stringify({ amount }),
    headers: { 'Content-Type': 'application/json' },
  })
}
