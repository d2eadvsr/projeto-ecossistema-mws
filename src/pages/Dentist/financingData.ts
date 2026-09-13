// src/pages/Dentist/financingData.ts
// Dados mockados consistentes para o Painel Financeiro do Ortodontista MWS

export interface FinancialRecord {
  id: string
  patientName: string
  classification: string
  planning: string
  treatmentDuration: string
  paymentMethod: 'Particular' | 'MWS'
  fintechDetails?: {
    partner: string
    installments: string
    installmentValue: number
    paidInstallments: number
    totalInstallments: number
    delayedInstallments: number
    contractNumber: string
    status: 'Em dia' | 'Em atraso' | 'Quitado'
  }
  suggestedPriceMWS: number
  chargedPrice: number
  labCost: number
  date: string // YYYY-MM-DD
  closingMonth: string
  status: 'liquidado' | 'pendente' | 'processando'
}

export interface MaintenanceTransaction {
  id: string
  date: string // YYYY-MM-DD
  month: string // e.g. 'Fevereiro/2026'
  type: 'credit' | 'debit'
  amount: number // always 250.00
  patientName: string
  otherDentistName: string
  otherDentistCro: string
  otherDentistCity: string
  procedure: string
  justification: string
  status: 'liquidado' | 'pendente'
}

// Manutenções mockadas com valor fixo de R$ 250,00 entre ortodontistas da rede MWS
export const MOCK_MAINTENANCE_TRANSACTIONS: MaintenanceTransaction[] = [
  // Fevereiro / 2026 (mês atual fixo do painel)
  {
    id: 'MAN-2026-021',
    date: '2026-02-03',
    month: 'Fevereiro/2026',
    type: 'credit',
    amount: 250.0,
    patientName: 'Gustavo Mendonça',
    otherDentistName: 'Dra. Carolina Faria',
    otherDentistCro: 'CRO-SP 98214',
    otherDentistCity: 'Campinas - SP',
    procedure: 'Ativação e troca de ligaduras MWS lingual superior',
    justification: 'Paciente em trânsito profissional na região metropolitana',
    status: 'liquidado',
  },
  {
    id: 'MAN-2026-022',
    date: '2026-02-08',
    month: 'Fevereiro/2026',
    type: 'debit',
    amount: 250.0,
    patientName: 'Larissa Manoela Becker',
    otherDentistName: 'Dr. Roberto Takahashi',
    otherDentistCro: 'CRO-PR 45120',
    otherDentistCity: 'Curitiba - PR',
    procedure: 'Recolagem de bracket lingual e checagem de arco MWS',
    justification: 'Paciente em férias escolares atendida na rede credenciada MWS',
    status: 'liquidado',
  },
  {
    id: 'MAN-2026-023',
    date: '2026-02-14',
    month: 'Fevereiro/2026',
    type: 'credit',
    amount: 250.0,
    patientName: 'Felipe Albuquerque',
    otherDentistName: 'Dr. Matheus Silveira',
    otherDentistCro: 'CRO-RJ 67431',
    otherDentistCity: 'Rio de Janeiro - RJ',
    procedure: 'Ajuste de torque em arco lingual robotizado MWS',
    justification: 'Paciente em viagem de trabalho atendido no consultório credenciado',
    status: 'liquidado',
  },
  {
    id: 'MAN-2026-024',
    date: '2026-02-18',
    month: 'Fevereiro/2026',
    type: 'credit',
    amount: 250.0,
    patientName: 'Camila Guimarães',
    otherDentistName: 'Dra. Vanessa Rios',
    otherDentistCro: 'CRO-MG 33902',
    otherDentistCity: 'Belo Horizonte - MG',
    procedure: 'Manutenção de rotina e profilaxia peri-lingual',
    justification: 'Mudança temporária de cidade durante semestre letivo',
    status: 'liquidado',
  },
  {
    id: 'MAN-2026-025',
    date: '2026-02-22',
    month: 'Fevereiro/2026',
    type: 'debit',
    amount: 250.0,
    patientName: 'Thiago Nogueira',
    otherDentistName: 'Dr. Leonardo Vasconcelos',
    otherDentistCro: 'CRO-RS 88204',
    otherDentistCity: 'Porto Alegre - RS',
    procedure: 'Ajuste e ativação de mola lingual MWS',
    justification: 'Atendimento de intercorrência durante viagem ao sul',
    status: 'liquidado',
  },
  {
    id: 'MAN-2026-026',
    date: '2026-02-25',
    month: 'Fevereiro/2026',
    type: 'credit',
    amount: 250.0,
    patientName: 'Bruna Zanetti',
    otherDentistName: 'Dra. Patrícia Meirelles',
    otherDentistCro: 'CRO-DF 21459',
    otherDentistCity: 'Brasília - DF',
    procedure: 'Conferência de plano 3D e ativação do segmento lingual',
    justification: 'Transferência interestadual temporária autorizada no portal MWS',
    status: 'liquidado',
  },

  // Janeiro / 2026
  {
    id: 'MAN-2026-011',
    date: '2026-01-12',
    month: 'Janeiro/2026',
    type: 'credit',
    amount: 250.0,
    patientName: 'Marcelo Castro',
    otherDentistName: 'Dr. André Villela',
    otherDentistCro: 'CRO-SP 77103',
    otherDentistCity: 'Santos - SP',
    procedure: 'Manutenção preventiva em arco lingual MWS',
    justification: 'Atendimento na baixada santista',
    status: 'liquidado',
  },
  {
    id: 'MAN-2026-012',
    date: '2026-01-20',
    month: 'Janeiro/2026',
    type: 'debit',
    amount: 250.0,
    patientName: 'Sofia Andrade',
    otherDentistName: 'Dra. Helena Martins',
    otherDentistCro: 'CRO-SC 55192',
    otherDentistCity: 'Florianópolis - SC',
    procedure: 'Manutenção de rotina MWS',
    justification: 'Paciente em recesso de fim de ano em SC',
    status: 'liquidado',
  },

  // Dezembro / 2025
  {
    id: 'MAN-2025-121',
    date: '2025-12-15',
    month: 'Dezembro/2025',
    type: 'credit',
    amount: 250.0,
    patientName: 'Diego Brandão',
    otherDentistName: 'Dr. Paulo Siqueira',
    otherDentistCro: 'CRO-GO 33118',
    otherDentistCity: 'Goiânia - GO',
    procedure: 'Troca de segmento de nivelamento lingual MWS',
    justification: 'Visita de paciente à capital paulista',
    status: 'liquidado',
  },
]

// Lista de transações/orçamentos do Ortodontista
// Atenção: paymentMethod deve ser SOMENTE 'Particular' ou 'MWS'
export const MOCK_FINANCIAL_RECORDS: FinancialRecord[] = [
  {
    id: 'ORC-1001',
    patientName: 'Maria Silva',
    classification: 'Classe II div 1',
    planning: 'Magic Wire Dual Arch + Mini-implante',
    treatmentDuration: '14 meses',
    paymentMethod: 'Particular',
    suggestedPriceMWS: 7200.0,
    chargedPrice: 7500.0,
    labCost: 1950.0,
    date: '2026-02-04',
    closingMonth: 'Fevereiro/2026',
    status: 'liquidado',
  },
  {
    id: 'ORC-1002',
    patientName: 'João Santos',
    classification: 'Classe I com Apinhamento',
    planning: 'Magic Wire Premium Dual Arch',
    treatmentDuration: '10 meses',
    paymentMethod: 'Particular',
    suggestedPriceMWS: 5400.0,
    chargedPrice: 5200.0,
    labCost: 1400.0,
    date: '2026-02-09',
    closingMonth: 'Fevereiro/2026',
    status: 'liquidado',
  },
  {
    id: 'ORC-1003',
    patientName: 'Ana Costa',
    classification: 'Classe III Leve',
    planning: 'Expansão Guiada + Fios Linguais Customizados MWS',
    treatmentDuration: '18 meses',
    paymentMethod: 'MWS',
    fintechDetails: {
      partner: 'Fintech Parceira MWS Crédito',
      installments: '24x de R$ 442,80',
      installmentValue: 442.8,
      paidInstallments: 3,
      totalInstallments: 24,
      delayedInstallments: 0,
      contractNumber: 'MWS-FT-2026-0988',
      status: 'Em dia',
    },
    suggestedPriceMWS: 8900.0,
    chargedPrice: 9200.0,
    labCost: 2400.0,
    date: '2026-02-12',
    closingMonth: 'Fevereiro/2026',
    status: 'liquidado',
  },
  {
    id: 'ORC-1004',
    patientName: 'Pedro Lima',
    classification: 'Mordida Cruzada Posterior',
    planning: 'Disjuntor Híbrido + Magic Wire Lingual',
    treatmentDuration: '12 meses',
    paymentMethod: 'MWS',
    fintechDetails: {
      partner: 'Fintech Parceira MWS Crédito',
      installments: '18x de R$ 416,50',
      installmentValue: 416.5,
      paidInstallments: 1,
      totalInstallments: 18,
      delayedInstallments: 0,
      contractNumber: 'MWS-FT-2026-1044',
      status: 'Em dia',
    },
    suggestedPriceMWS: 6500.0,
    chargedPrice: 6500.0,
    labCost: 1700.0,
    date: '2026-02-17',
    closingMonth: 'Fevereiro/2026',
    status: 'pendente',
  },
  {
    id: 'ORC-1005',
    patientName: 'Carla Souza',
    classification: 'Classe II div 2',
    planning: 'Correção Sequenciada de Torques MWS',
    treatmentDuration: '16 meses',
    paymentMethod: 'MWS',
    fintechDetails: {
      partner: 'Fintech Parceira MWS Crédito',
      installments: '12x de R$ 769,50',
      installmentValue: 769.5,
      paidInstallments: 2,
      totalInstallments: 12,
      delayedInstallments: 0,
      contractNumber: 'MWS-FT-2026-1102',
      status: 'Em dia',
    },
    suggestedPriceMWS: 7800.0,
    chargedPrice: 8100.0,
    labCost: 2100.0,
    date: '2026-02-21',
    closingMonth: 'Fevereiro/2026',
    status: 'processando',
  },
  {
    id: 'ORC-1006',
    patientName: 'Lucas Ferreira',
    classification: 'Mordida Aberta Anterior',
    planning: 'Intrusão Posterior + Magic Wire Lingual Robótico',
    treatmentDuration: '15 meses',
    paymentMethod: 'Particular',
    suggestedPriceMWS: 7600.0,
    chargedPrice: 7800.0,
    labCost: 2000.0,
    date: '2026-02-24',
    closingMonth: 'Fevereiro/2026',
    status: 'liquidado',
  },
  {
    id: 'ORC-1007',
    patientName: 'Beatriz Almeida',
    classification: 'Classe I com Diastemas',
    planning: 'Fechamento Estético Magic Wire Light',
    treatmentDuration: '8 meses',
    paymentMethod: 'Particular',
    suggestedPriceMWS: 4200.0,
    chargedPrice: 4200.0,
    labCost: 1100.0,
    date: '2026-02-26',
    closingMonth: 'Fevereiro/2026',
    status: 'liquidado',
  },
  // Registros de outros períodos para extrato customizado (Janeiro / 2026 e Dezembro / 2025)
  {
    id: 'ORC-1008',
    patientName: 'Juliana Pires',
    classification: 'Classe II div 1',
    planning: 'Magic Wire Dual Arch Premium',
    treatmentDuration: '12 meses',
    paymentMethod: 'MWS',
    fintechDetails: {
      partner: 'Fintech Parceira MWS Crédito',
      installments: '12x de R$ 684,00',
      installmentValue: 684.0,
      paidInstallments: 4,
      totalInstallments: 12,
      delayedInstallments: 0,
      contractNumber: 'MWS-FT-2026-0850',
      status: 'Em dia',
    },
    suggestedPriceMWS: 7200.0,
    chargedPrice: 7200.0,
    labCost: 1850.0,
    date: '2026-01-15',
    closingMonth: 'Janeiro/2026',
    status: 'liquidado',
  },
  {
    id: 'ORC-1009',
    patientName: 'Rafael Moreira',
    classification: 'Sobremordida Acentuada',
    planning: 'Intrusão Anterior + Fio MWS Customizado',
    treatmentDuration: '14 meses',
    paymentMethod: 'Particular',
    suggestedPriceMWS: 6800.0,
    chargedPrice: 6800.0,
    labCost: 1750.0,
    date: '2026-01-22',
    closingMonth: 'Janeiro/2026',
    status: 'liquidado',
  },
  {
    id: 'ORC-1010',
    patientName: 'Camila Duarte',
    classification: 'Classe I com Apinhamento Inferior',
    planning: 'Magic Wire Lingual Arcada Inferior',
    treatmentDuration: '6 meses',
    paymentMethod: 'Particular',
    suggestedPriceMWS: 3800.0,
    chargedPrice: 3800.0,
    labCost: 950.0,
    date: '2025-12-10',
    closingMonth: 'Dezembro/2025',
    status: 'liquidado',
  },
]

// Cálculos do mês fixo principal (Fevereiro/2026):
// Casos de Fevereiro/2026:
// 1001: 7.500 (lab 1.950)
// 1002: 5.200 (lab 1.400)
// 1003: 9.200 (lab 2.400)
// 1004: 6.500 (lab 1.700)
// 1005: 8.100 (lab 2.100)
// 1006: 7.800 (lab 2.000)
// 1007: 4.200 (lab 1.100)
// Faturamento Bruto = 48.500,00
// Custos de Laboratório = 12.650,00
// Resultado Mensal Bruto = 48.500,00 - 12.650,00 = 35.850,00
// Manutenções de Fevereiro/2026:
// 4 créditos x 250 = +1.000,00
// 2 débitos x 250 = -500,00
// Resultado de Manutenções = +500,00
// Repasse Líquido Final = Resultado Mensal Bruto + Resultado de Manutenções = 36.350,00

export const FIXED_MONTH_LABEL = 'Fevereiro/2026'
export const FIXED_MONTH_KEY = '2026-02'

export function getMonthMaintenanceTransactions(monthStr: string = FIXED_MONTH_LABEL) {
  return MOCK_MAINTENANCE_TRANSACTIONS.filter((m) => m.month === monthStr)
}

export function getMaintenanceSummary(monthStr: string = FIXED_MONTH_LABEL) {
  const list = getMonthMaintenanceTransactions(monthStr)
  const credits = list.filter((m) => m.type === 'credit')
  const debits = list.filter((m) => m.type === 'debit')
  const totalCredits = credits.reduce((acc, cur) => acc + cur.amount, 0)
  const totalDebits = debits.reduce((acc, cur) => acc + cur.amount, 0)
  const netResult = totalCredits - totalDebits

  return {
    month: monthStr,
    totalTransactions: list.length,
    creditsCount: credits.length,
    debitsCount: debits.length,
    totalCredits,
    totalDebits,
    netResult,
    transactions: list,
  }
}

export function getFixedMonthMetrics() {
  const febCases = MOCK_FINANCIAL_RECORDS.filter((c) => c.closingMonth === FIXED_MONTH_LABEL)
  const totalGross = febCases.reduce((acc, c) => acc + c.chargedPrice, 0) // 48.500
  const labCost = febCases.reduce((acc, c) => acc + c.labCost, 0) // 12.650
  const grossMonthlyResult = totalGross - labCost // 35.850

  const maintenanceSummary = getMaintenanceSummary(FIXED_MONTH_LABEL) // +500
  const totalNetFinal = grossMonthlyResult + maintenanceSummary.netResult // 36.350

  return {
    monthLabel: FIXED_MONTH_LABEL,
    totalGross,
    labCost,
    grossMonthlyResult,
    maintenanceResult: maintenanceSummary.netResult,
    maintenanceSummary,
    totalNetFinal,
    monthlyGrowth: '+18.4%',
  }
}
