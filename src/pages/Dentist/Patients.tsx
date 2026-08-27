import { Users, Activity, CheckCircle2, FileText, Wrench, Calendar } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const MANUTENCAO_LABELS = [
  '1ª Manutenção',
  '2ª Manutenção',
  '3ª Manutenção',
  '4ª Manutenção',
  '5ª Manutenção',
  '6ª Manutenção',
]

interface MockPatient {
  id: string
  name: string
  lab_response_date: string | null
  first_consultation_date: string | null
  last_consultation_date: string | null
  consultation_count: number
}

// Backend integration will replace this mock data later.
const MOCK_PATIENTS: MockPatient[] = [
  // 2 EM PLANEJAMENTO (lab_response_date: null, first_consultation_date: null, last_consultation_date: null)
  {
    id: '1',
    name: 'Maria Silva',
    lab_response_date: null,
    first_consultation_date: null,
    last_consultation_date: null,
    consultation_count: 0,
  },
  {
    id: '2',
    name: 'João Santos',
    lab_response_date: null,
    first_consultation_date: null,
    last_consultation_date: null,
    consultation_count: 0,
  },
  // 2 PLANEJADOS (lab_response_date set, first_consultation_date: null, last_consultation_date: null)
  {
    id: '3',
    name: 'Ana Costa',
    lab_response_date: '2026-01-15',
    first_consultation_date: null,
    last_consultation_date: null,
    consultation_count: 0,
  },
  {
    id: '4',
    name: 'Pedro Lima',
    lab_response_date: '2026-01-20',
    first_consultation_date: null,
    last_consultation_date: null,
    consultation_count: 0,
  },
  // 5 EM TRATAMENTO / Aparelho Colocado (first_consultation_date set, last_consultation_date: null)
  // Manutenções: 1ª: 1, 2ª: 1, 3ª: 0, 4ª: 0, 5ª: 2, 6ª: 1 (soma = 5)
  {
    id: '5',
    name: 'Carla Mendes',
    lab_response_date: '2025-10-10',
    first_consultation_date: '2025-10-25',
    last_consultation_date: null,
    consultation_count: 1, // 1ª Manutenção
  },
  {
    id: '6',
    name: 'Bruno Almeida',
    lab_response_date: '2025-09-01',
    first_consultation_date: '2025-09-15',
    last_consultation_date: null,
    consultation_count: 2, // 2ª Manutenção
  },
  {
    id: '7',
    name: 'Fernanda Rocha',
    lab_response_date: '2025-06-15',
    first_consultation_date: '2025-07-01',
    last_consultation_date: null,
    consultation_count: 5, // 5ª Manutenção (1/2)
  },
  {
    id: '8',
    name: 'Lucas Pereira',
    lab_response_date: '2025-06-10',
    first_consultation_date: '2025-06-25',
    last_consultation_date: null,
    consultation_count: 5, // 5ª Manutenção (2/2)
  },
  {
    id: '9',
    name: 'Juliana Martins',
    lab_response_date: '2025-05-01',
    first_consultation_date: '2025-05-15',
    last_consultation_date: null,
    consultation_count: 6, // 6ª Manutenção
  },
  // 1 CONCLUÍDO (last_consultation_date set)
  {
    id: '10',
    name: 'Ricardo Tavares',
    lab_response_date: '2025-01-01',
    first_consultation_date: '2025-01-15',
    last_consultation_date: '2026-01-10',
    consultation_count: 6,
  },
]

function computeCounts(patients: MockPatient[]) {
  const totalPatients = patients.length

  const emPlanejamento = patients.filter((p) => !p.lab_response_date).length
  const planejados = patients.filter(
    (p) => p.lab_response_date && !p.first_consultation_date,
  ).length
  const emTratamento = patients.filter(
    (p) => p.first_consultation_date && !p.last_consultation_date,
  ).length

  // Aparelho Colocado = pacientes em tratamento com primeira consulta realizada (= 5)
  const emTratamentoPatients = patients.filter(
    (p) => p.first_consultation_date && !p.last_consultation_date,
  )
  const aparelhoColocado = emTratamentoPatients.length

  const manutencoesProgramadas = [1, 2, 3, 4, 5, 6].map(
    (n) => emTratamentoPatients.filter((p) => p.consultation_count === n).length,
  )

  const concluidos = patients.filter((p) => p.last_consultation_date).length

  return {
    totalPatients,
    emAndamento: {
      emPlanejamento,
      planejados,
      emTratamento,
      aparelhoColocado,
      manutencoesProgramadas,
    },
    concluidos: {
      total: concluidos,
    },
  }
}

export default function DentistPatients() {
  const counts = computeCounts(MOCK_PATIENTS)

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-5xl mx-auto animate-fade-in-up">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Pacientes</h1>
        <p className="text-slate-500">Visão geral dos seus pacientes e casos clínicos.</p>
      </div>

      <Card className="border-emerald-200 bg-emerald-50">
        <CardContent className="flex items-center gap-4 p-6">
          <div className="w-14 h-14 rounded-xl bg-emerald-600 flex items-center justify-center flex-shrink-0">
            <Users className="w-7 h-7 text-white" />
          </div>
          <div>
            <p className="text-sm font-medium text-emerald-700">Total de Pacientes</p>
            <p className="text-3xl font-bold text-slate-900">{counts.totalPatients}</p>
            <p className="text-xs text-slate-500">Pacientes únicos desde seu credenciamento</p>
          </div>
        </CardContent>
      </Card>

      {/* Casos EM ANDAMENTO */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Activity className="w-5 h-5 text-blue-600" />
          Casos EM ANDAMENTO
        </h2>

        {/* 3 cards de status de planejamento/tratamento */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-amber-200">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-4 h-4 text-amber-600" />
                <span className="text-sm font-medium text-amber-700">EM PLANEJAMENTO</span>
              </div>
              <p className="text-2xl font-bold text-slate-900">
                {counts.emAndamento.emPlanejamento}
              </p>
              <p className="text-xs text-slate-500">Enviados ao lab, sem resposta</p>
            </CardContent>
          </Card>
          <Card className="border-blue-200">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-700">PLANEJADOS</span>
              </div>
              <p className="text-2xl font-bold text-slate-900">{counts.emAndamento.planejados}</p>
              <p className="text-xs text-slate-500">Resposta do lab recebida</p>
            </CardContent>
          </Card>
          <Card className="border-purple-200">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium text-purple-700">EM TRATAMENTO</span>
              </div>
              <p className="text-2xl font-bold text-slate-900">{counts.emAndamento.emTratamento}</p>
              <p className="text-xs text-slate-500">Paciente em atendimento</p>
            </CardContent>
          </Card>
        </div>

        {/* Aparelho Colocado & Manutenções Programadas (agora dentro de EM ANDAMENTO) */}
        <Card className="border-slate-200">
          <CardContent className="p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <Wrench className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700">Aparelho Colocado</p>
                  <p className="text-xs text-slate-500">Primeira consulta realizada</p>
                </div>
              </div>
              <p className="text-2xl font-bold text-slate-900">
                {counts.emAndamento.aparelhoColocado}
              </p>
            </div>

            <div className="border-t border-slate-100 pt-4">
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-slate-700">Manutenções Programadas</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                {MANUTENCAO_LABELS.map((label, i) => (
                  <div key={label} className="rounded-lg bg-slate-50 p-3 text-center">
                    <p className="text-xs text-slate-500 mb-1">{label}</p>
                    <p className="text-xl font-bold text-slate-900">
                      {counts.emAndamento.manutencoesProgramadas[i]}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Casos CONCLUÍDOS */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          Casos CONCLUÍDOS
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-emerald-200">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span className="text-sm font-medium text-emerald-700">CONCLUÍDO</span>
              </div>
              <p className="text-2xl font-bold text-slate-900">{counts.concluidos.total}</p>
              <p className="text-xs text-slate-500">
                Paciente já realizou a última consulta do tratamento
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
