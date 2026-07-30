import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { Card, CardContent } from '@/components/ui/card'
import { Users, Activity, CheckCircle2, FileText, Wrench, Calendar } from 'lucide-react'
import { getDentistByUserId } from '@/services/dentists'
import { getCaseCounts, type CaseCounts } from '@/services/cases'
import { useRealtime } from '@/hooks/use-realtime'
import { Skeleton } from '@/components/ui/skeleton'

const MANUTENCAO_LABELS = [
  '1ª Manutenção',
  '2ª Manutenção',
  '3ª Manutenção',
  '4ª Manutenção',
  '5ª Manutenção',
  '6ª Manutenção',
]

export default function DentistPatients() {
  const { user } = useAuth()
  const [counts, setCounts] = useState<CaseCounts | null>(null)
  const [loading, setLoading] = useState(true)

  const loadData = async () => {
    if (!user) return
    try {
      const dentist = await getDentistByUserId(user.id)
      const c = await getCaseCounts(dentist.id)
      setCounts(c)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [user])

  useRealtime('clinical_cases', () => {
    loadData()
  })

  if (loading) {
    return (
      <div className="p-4 md:p-8 space-y-6 max-w-5xl mx-auto">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-28 w-full" />
        <Skeleton className="h-28 w-full" />
        <Skeleton className="h-48 w-full" />
      </div>
    )
  }

  if (!counts) {
    return (
      <div className="p-4 md:p-8 text-center text-slate-500 max-w-md mx-auto mt-20">
        <Users className="w-12 h-12 mx-auto mb-4 text-slate-300" />
        <p>Não foi possível carregar os dados dos pacientes.</p>
        <p className="text-sm mt-2">Verifique se seu perfil de dentista está configurado.</p>
      </div>
    )
  }

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

      <div className="space-y-3">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Activity className="w-5 h-5 text-blue-600" />
          Casos EM ANDAMENTO
        </h2>
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
      </div>

      <div className="space-y-3">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          Casos CONCLUÍDOS
        </h2>
        <Card>
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
                {counts.concluidos.aparelhoColocado}
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
                      {counts.concluidos.manutencoesProgramadas[i]}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
