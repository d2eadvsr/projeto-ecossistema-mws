export type PatientStatus = 'em-planejamento' | 'planejados' | 'em-tratamento' | 'concluidos'

export interface MaintenanceRecord {
  number: number
  label: string
  date: string
  procedure: string
  observations: string
  nextDate?: string
}

export interface DentistPatient {
  id: string
  name: string
  age: number
  phone: string
  email: string
  protocol: string
  status: PatientStatus
  statusLabel: string
  currentMaintenanceNumber?: number // 1..6 para quem está em tratamento
  currentMaintenanceLabel?: string // '1ª Manutenção', etc.
  totalMaintenances?: number
  labResponseDate: string | null
  firstConsultationDate: string | null
  lastConsultationDate: string | null
  startDate: string
  notes?: string
  maintenancesHistory: MaintenanceRecord[]
}

export const STATUS_CONFIG: Record<
  PatientStatus,
  {
    key: PatientStatus
    label: string
    badgeColor: string
    borderHoverColor: string
    textColor: string
    bgColor: string
    iconBgColor: string
    description: string
  }
> = {
  'em-planejamento': {
    key: 'em-planejamento',
    label: 'Em Planejamento',
    badgeColor: 'border-amber-300 bg-amber-50 text-amber-800',
    borderHoverColor: 'hover:border-amber-400 hover:shadow-amber-100',
    textColor: 'text-amber-700',
    bgColor: 'bg-amber-50',
    iconBgColor: 'bg-amber-100 text-amber-700',
    description: 'Enviados ao laboratório MWS, aguardando aprovação do planejamento 3D.',
  },
  planejados: {
    key: 'planejados',
    label: 'Planejados',
    badgeColor: 'border-blue-300 bg-blue-50 text-blue-800',
    borderHoverColor: 'hover:border-blue-400 hover:shadow-blue-100',
    textColor: 'text-blue-700',
    bgColor: 'bg-blue-50',
    iconBgColor: 'bg-blue-100 text-blue-700',
    description: 'Resposta do laboratório aprovada, prontos para instalação do fio lingual.',
  },
  'em-tratamento': {
    key: 'em-tratamento',
    label: 'Em Tratamento',
    badgeColor: 'border-purple-300 bg-purple-50 text-purple-800',
    borderHoverColor: 'hover:border-purple-400 hover:shadow-purple-100',
    textColor: 'text-purple-700',
    bgColor: 'bg-purple-50',
    iconBgColor: 'bg-purple-100 text-purple-700',
    description: 'Aparelho lingual instalado, em ciclo ativo de manutenções programadas.',
  },
  concluidos: {
    key: 'concluidos',
    label: 'Concluídos',
    badgeColor: 'border-emerald-300 bg-emerald-50 text-emerald-800',
    borderHoverColor: 'hover:border-emerald-400 hover:shadow-emerald-100',
    textColor: 'text-emerald-700',
    bgColor: 'bg-emerald-50',
    iconBgColor: 'bg-emerald-100 text-emerald-700',
    description: 'Tratamento ortodôntico finalizado com sucesso e contenção instalada.',
  },
}

// 10 Pacientes atendidos desde o licenciamento do ortodontista no Ecossistema Magic Wire
// Distribuição:
// - Em Planejamento: 2
// - Planejados: 2
// - Em Tratamento: 5 (1 na 1ª, 1 na 2ª, 2 na 5ª, 1 na 6ª Manutenção)
// - Concluídos: 1
// Total = 10
export const MOCK_DENTIST_PATIENTS: DentistPatient[] = [
  // 2 EM PLANEJAMENTO
  {
    id: '1',
    name: 'Maria Silva',
    age: 28,
    phone: '(11) 98765-4321',
    email: 'maria.silva@email.com',
    protocol: 'Magic Wire Protocolo Avançado (Lingual)',
    status: 'em-planejamento',
    statusLabel: 'Em Planejamento',
    labResponseDate: null,
    firstConsultationDate: null,
    lastConsultationDate: null,
    startDate: '12/02/2026',
    notes:
      'Escaneamento intraoral enviado para o Lab MWS. Aguardando setup virtual e guia lingual.',
    maintenancesHistory: [],
  },
  {
    id: '2',
    name: 'João Santos',
    age: 34,
    phone: '(11) 97654-3210',
    email: 'joao.santos@email.com',
    protocol: 'Magic Wire Standard (Lingual)',
    status: 'em-planejamento',
    statusLabel: 'Em Planejamento',
    labResponseDate: null,
    firstConsultationDate: null,
    lastConsultationDate: null,
    startDate: '18/02/2026',
    notes:
      'Documentação ortodôntica completa enviada. Aguardando proposta de setup do laboratório.',
    maintenancesHistory: [],
  },

  // 2 PLANEJADOS
  {
    id: '3',
    name: 'Ana Costa',
    age: 24,
    phone: '(11) 96543-2109',
    email: 'ana.costa@email.com',
    protocol: 'Magic Wire Teens & Adultos (Lingual)',
    status: 'planejados',
    statusLabel: 'Planejados',
    labResponseDate: '2026-01-15',
    firstConsultationDate: null,
    lastConsultationDate: null,
    startDate: '10/01/2026',
    notes:
      'Setup 3D aprovado pelo ortodontista. Fio de memória robótico em transporte para o consultório.',
    maintenancesHistory: [],
  },
  {
    id: '4',
    name: 'Pedro Lima',
    age: 31,
    phone: '(11) 95432-1098',
    email: 'pedro.lima@email.com',
    protocol: 'Magic Wire Standard (Lingual)',
    status: 'planejados',
    statusLabel: 'Planejados',
    labResponseDate: '2026-01-20',
    firstConsultationDate: null,
    lastConsultationDate: null,
    startDate: '15/01/2026',
    notes:
      'Planejamento aprovado. Agendamento da consulta de colagem do dispositivo lingual em andamento.',
    maintenancesHistory: [],
  },

  // 5 EM TRATAMENTO
  // Paciente 5: 1ª Manutenção
  {
    id: '5',
    name: 'Carla Mendes',
    age: 29,
    phone: '(11) 94321-0987',
    email: 'carla.mendes@email.com',
    protocol: 'Magic Wire Protocolo Avançado (Lingual)',
    status: 'em-tratamento',
    statusLabel: 'Em Tratamento',
    currentMaintenanceNumber: 1,
    currentMaintenanceLabel: '1ª Manutenção',
    totalMaintenances: 6,
    labResponseDate: '2025-10-10',
    firstConsultationDate: '2025-10-25',
    lastConsultationDate: null,
    startDate: '25/10/2025',
    notes:
      'Colagem lingual realizada com sucesso. Realizada a 1ª Manutenção para checagem da resposta biológica.',
    maintenancesHistory: [
      {
        number: 1,
        label: '1ª Manutenção',
        date: '20/11/2025',
        procedure: 'Ativação inicial do fio lingual e conferência de torques',
        observations:
          'Paciente adaptada confortavelmente ao fio interno lingual. Sem queixas de fala ou atrito.',
        nextDate: '20/12/2025',
      },
    ],
  },

  // Paciente 6: 2ª Manutenção
  {
    id: '6',
    name: 'Bruno Almeida',
    age: 38,
    phone: '(11) 93210-9876',
    email: 'bruno.almeida@email.com',
    protocol: 'Magic Wire Standard (Lingual)',
    status: 'em-tratamento',
    statusLabel: 'Em Tratamento',
    currentMaintenanceNumber: 2,
    currentMaintenanceLabel: '2ª Manutenção',
    totalMaintenances: 6,
    labResponseDate: '2025-09-01',
    firstConsultationDate: '2025-09-15',
    lastConsultationDate: null,
    startDate: '15/09/2025',
    notes:
      'Tratamento em excelente ritmo. 2ª Manutenção executada conforme protocolo de memória de forma.',
    maintenancesHistory: [
      {
        number: 1,
        label: '1ª Manutenção',
        date: '15/10/2025',
        procedure: 'Primeira checagem pós-colagem lingual e ajuste de oclusão',
        observations: 'Excelente resposta gengival e adaptação inicial completa.',
        nextDate: '18/11/2025',
      },
      {
        number: 2,
        label: '2ª Manutenção',
        date: '18/11/2025',
        procedure: 'Substituição para arco lingual robótico sequencial',
        observations: 'Nivelamento e alinhamento do arco inferior evoluindo de forma acelerada.',
        nextDate: '15/01/2026',
      },
    ],
  },

  // Paciente 7: 5ª Manutenção (1/2)
  {
    id: '7',
    name: 'Fernanda Rocha',
    age: 26,
    phone: '(11) 92109-8765',
    email: 'fernanda.rocha@email.com',
    protocol: 'Magic Wire Protocolo Avançado (Lingual)',
    status: 'em-tratamento',
    statusLabel: 'Em Tratamento',
    currentMaintenanceNumber: 5,
    currentMaintenanceLabel: '5ª Manutenção',
    totalMaintenances: 6,
    labResponseDate: '2025-06-15',
    firstConsultationDate: '2025-07-01',
    lastConsultationDate: null,
    startDate: '01/07/2025',
    notes: 'Fase de refinamento estético e finalização dos contatos oclusais posteriores.',
    maintenancesHistory: [
      {
        number: 1,
        label: '1ª Manutenção',
        date: '02/08/2025',
        procedure: 'Avaliação da colagem lingual inicial e instrução de higiene',
        observations: 'Adaptação excelente da mucosa lingual.',
      },
      {
        number: 2,
        label: '2ª Manutenção',
        date: '05/09/2025',
        procedure: 'Ativação biomecânica e desgastes compensatórios',
        observations: 'Alinhamento anterior consolidado.',
      },
      {
        number: 3,
        label: '3ª Manutenção',
        date: '10/10/2025',
        procedure: 'Instalação de fio lingual intermediário termoativado',
        observations: 'Fechamento de diastemas incisais.',
      },
      {
        number: 4,
        label: '4ª Manutenção',
        date: '15/11/2025',
        procedure: 'Ajuste de torque posterior e elásticos intermaxilares',
        observations: 'Encaixe de Classe I estabelecido.',
      },
      {
        number: 5,
        label: '5ª Manutenção',
        date: '15/01/2026',
        procedure: 'Refinamento do fio lingual estético e detalhamento incisal',
        observations:
          'Arcos nivelados, contatos bilaterais simétricos. Próxima consulta será a 6ª Manutenção para remoção e contenção.',
        nextDate: '01/03/2026',
      },
    ],
  },

  // Paciente 8: 5ª Manutenção (2/2)
  {
    id: '8',
    name: 'Lucas Pereira',
    age: 33,
    phone: '(11) 91098-7654',
    email: 'lucas.pereira@email.com',
    protocol: 'Magic Wire Standard (Lingual)',
    status: 'em-tratamento',
    statusLabel: 'Em Tratamento',
    currentMaintenanceNumber: 5,
    currentMaintenanceLabel: '5ª Manutenção',
    totalMaintenances: 6,
    labResponseDate: '2025-06-10',
    firstConsultationDate: '2025-06-25',
    lastConsultationDate: null,
    startDate: '25/06/2025',
    notes: 'Etapa avançada de finalização oclusal e assentamento.',
    maintenancesHistory: [
      {
        number: 1,
        label: '1ª Manutenção',
        date: '28/07/2025',
        procedure: 'Verificação do arco lingual 01',
        observations: 'Paciente relata total conforto e invisibilidade do aparelho.',
      },
      {
        number: 2,
        label: '2ª Manutenção',
        date: '30/08/2025',
        procedure: 'Ativação e conferência de apinhamento inferior',
        observations: 'Correção de apinhamento severo em 60 dias.',
      },
      {
        number: 3,
        label: '3ª Manutenção',
        date: '02/10/2025',
        procedure: 'IPR interproximal de 0.2mm e fio termoativado 02',
        observations: 'Espaços recuperados perfeitamente.',
      },
      {
        number: 4,
        label: '4ª Manutenção',
        date: '12/11/2025',
        procedure: 'Ajuste fino de rotações em pré-molares',
        observations: 'Guias laterais caninas estabelecidas.',
      },
      {
        number: 5,
        label: '5ª Manutenção',
        date: '10/01/2026',
        procedure: 'Fio de acabamento lingual e conferência oclusal com carbono',
        observations: 'Casamento oclusal perfeito. Resta apenas 1 manutenção para alta.',
        nextDate: '28/02/2026',
      },
    ],
  },

  // Paciente 9: 6ª Manutenção
  {
    id: '9',
    name: 'Juliana Martins',
    age: 27,
    phone: '(11) 90987-6543',
    email: 'juliana.martins@email.com',
    protocol: 'Magic Wire Protocolo Avançado (Lingual)',
    status: 'em-tratamento',
    statusLabel: 'Em Tratamento',
    currentMaintenanceNumber: 6,
    currentMaintenanceLabel: '6ª Manutenção',
    totalMaintenances: 6,
    labResponseDate: '2025-05-01',
    firstConsultationDate: '2025-05-15',
    lastConsultationDate: null,
    startDate: '15/05/2025',
    notes:
      'Paciente na 6ª Manutenção — última consulta ativa de tratamento lingual antes da alta definitiva.',
    maintenancesHistory: [
      {
        number: 1,
        label: '1ª Manutenção',
        date: '15/06/2025',
        procedure: 'Checagem do arco lingual inicial e torque',
        observations: 'Adaptação imediata, higiene perfeita.',
      },
      {
        number: 2,
        label: '2ª Manutenção',
        date: '20/07/2025',
        procedure: 'Ativação da mecânica lingual anterior',
        observations: 'Nivelamento superior alcançado.',
      },
      {
        number: 3,
        label: '3ª Manutenção',
        date: '25/08/2025',
        procedure: 'Substituição de arco lingual robótico',
        observations: 'Fechamento rápido de espaços.',
      },
      {
        number: 4,
        label: '4ª Manutenção',
        date: '02/10/2025',
        procedure: 'Detalhamento de torque incisivo',
        observations: 'Linha média coincidente.',
      },
      {
        number: 5,
        label: '5ª Manutenção',
        date: '15/11/2025',
        procedure: 'Assentamento oclusal e conferência de guias funcionais',
        observations: 'Estabilidade anatômica e estética impecável.',
      },
      {
        number: 6,
        label: '6ª Manutenção',
        date: '10/01/2026',
        procedure: 'Moldagem/Escaneamento para contenção fixa e remoção final programada',
        observations:
          'Realizada a 6ª manutenção. Prontuário pronto para formalização de alta na próxima sessão.',
        nextDate: '20/02/2026',
      },
    ],
  },

  // 1 CONCLUÍDO
  {
    id: '10',
    name: 'Ricardo Tavares',
    age: 41,
    phone: '(11) 99876-5432',
    email: 'ricardo.tavares@email.com',
    protocol: 'Magic Wire Standard (Lingual)',
    status: 'concluidos',
    statusLabel: 'Concluído',
    currentMaintenanceNumber: 6,
    currentMaintenanceLabel: '6ª Manutenção (Finalizada)',
    totalMaintenances: 6,
    labResponseDate: '2025-01-01',
    firstConsultationDate: '2025-01-15',
    lastConsultationDate: '2026-01-10',
    startDate: '15/01/2025',
    notes:
      'Tratamento ortodôntico 100% finalizado. Contenção lingual fixa 3x3 instalada e alta clínica emitida.',
    maintenancesHistory: [
      {
        number: 1,
        label: '1ª Manutenção',
        date: '15/02/2025',
        procedure: 'Checagem inicial pós-instalação lingual',
        observations: 'Início sem dores ou intercorrências.',
      },
      {
        number: 2,
        label: '2ª Manutenção',
        date: '20/04/2025',
        procedure: 'Ativação do segundo fio lingual de memória',
        observations: 'Correção de apinhamento anterior superior.',
      },
      {
        number: 3,
        label: '3ª Manutenção',
        date: '15/06/2025',
        procedure: 'Nivelamento e alinhamento dos arcos',
        observations: 'Oclusão harmônica em chave de molares.',
      },
      {
        number: 4,
        label: '4ª Manutenção',
        date: '20/08/2025',
        procedure: 'Refinamento estético das margens incisais',
        observations: 'Sorriso nivelado e estético.',
      },
      {
        number: 5,
        label: '5ª Manutenção',
        date: '25/10/2025',
        procedure: 'Conferência de estabilidade oclusal e guias de desoclusão',
        observations: 'Excelente resposta funcional.',
      },
      {
        number: 6,
        label: '6ª Manutenção',
        date: '10/01/2026',
        procedure: 'Remoção do aparelho lingual e instalação de contenção definitiva',
        observations:
          'Tratamento ortodôntico lingual concluído com sucesso total. Paciente liberado com fotos finais.',
      },
    ],
  },
]

export function getDentistPatientById(id: string): DentistPatient | undefined {
  return MOCK_DENTIST_PATIENTS.find((p) => p.id === id)
}

export function getDentistPatientsByStatus(status: PatientStatus): DentistPatient[] {
  return MOCK_DENTIST_PATIENTS.filter((p) => p.status === status)
}

export function getDentistCounts() {
  const emPlanejamento = MOCK_DENTIST_PATIENTS.filter((p) => p.status === 'em-planejamento').length
  const planejados = MOCK_DENTIST_PATIENTS.filter((p) => p.status === 'planejados').length
  const emTratamento = MOCK_DENTIST_PATIENTS.filter((p) => p.status === 'em-tratamento').length
  const concluidos = MOCK_DENTIST_PATIENTS.filter((p) => p.status === 'concluidos').length
  const total = MOCK_DENTIST_PATIENTS.length

  return {
    total,
    emPlanejamento,
    planejados,
    emTratamento,
    concluidos,
  }
}
