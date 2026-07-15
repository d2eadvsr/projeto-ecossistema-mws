import pb from '@/lib/pocketbase/client'

export const getCases = async () => {
  return await pb.collection('clinical_cases').getFullList({
    expand: 'dentist,patient',
    sort: '-created',
  })
}

export const getDentistCases = async (dentistId: string) => {
  return await pb.collection('clinical_cases').getFullList({
    filter: `dentist = "${dentistId}"`,
    expand: 'patient',
    sort: '-created',
  })
}

export const getPatientCases = async (patientId: string) => {
  return await pb.collection('clinical_cases').getFullList({
    filter: `patient = "${patientId}"`,
    expand: 'dentist',
    sort: '-created',
  })
}

export const createCase = async (data: any) => {
  return await pb.collection('clinical_cases').create(data)
}

export const updateCaseStatus = async (id: string, status: string) => {
  return await pb.collection('clinical_cases').update(id, { status })
}
