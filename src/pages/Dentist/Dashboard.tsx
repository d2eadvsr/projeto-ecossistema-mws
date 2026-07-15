import { useAuth } from '@/hooks/use-auth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FileText, Users, Star, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getDentistByUserId } from '@/services/dentists'
import { getDentistCases } from '@/services/cases'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'

export default function DentistDashboard() {
  const { user } = useAuth()
  const [dentist, setDentist] = useState<any>(null)
  const [cases, setCases] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          const d = await getDentistByUserId(user.id)
          setDentist(d)
          const c = await getDentistCases(d.id)
          setCases(c)
        } catch (error) {
          console.error(error)
        } finally {
          setLoading(false)
        }
      }
    }
    fetchData()
  }, [user])

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="grid gap-4 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-32 w-full rounded-xl" />
          ))}
        </div>
      </div>
    )
  }

  const activeCases = cases.filter((c) => c.status !== 'delivered').length

  return (
    <div className="p-6 md:p-8 space-y-8 animate-fade-in-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Olá, {user?.name}</h1>
          <p className="text-slate-500 mt-1">Acompanhe sua produção e avaliações.</p>
        </div>
      </div>

      {dentist?.license_status === 'pending' && (
        <Card className="border-amber-200 bg-amber-50">
          <CardHeader>
            <CardTitle className="text-amber-800 text-lg flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Onboarding Pendente
            </CardTitle>
            <CardDescription className="text-amber-700">
              Complete seu cadastro para assinar o contrato e começar a abrir casos clínicos. SLA:
              48h.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="bg-amber-600 hover:bg-amber-700 text-white">
              <Link to="/dentist/onboarding">
                Completar Cadastro <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Casos Ativos</CardTitle>
            <Users className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">{activeCases}</div>
            <p className="text-xs text-slate-500 mt-1">Em planejamento ou produção</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">NPS da Clínica</CardTitle>
            <Star className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <div className="text-3xl font-bold text-slate-900">{dentist?.nps_score || 0}</div>
              <Badge
                variant={dentist?.nps_score >= 70 ? 'default' : 'destructive'}
                className={dentist?.nps_score >= 70 ? 'bg-emerald-500' : ''}
              >
                {dentist?.nps_score >= 70 ? 'Excelente' : 'Atenção'}
              </Badge>
            </div>
            <p className="text-xs text-slate-500 mt-1">Baseado nos últimos 30 dias</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Status da Licença</CardTitle>
            <FileText className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold capitalize text-slate-900">
              {dentist?.license_status}
            </div>
            <p className="text-xs text-slate-500 mt-1">Renovação em 90 dias</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">Casos Recentes</h2>
          <Button variant="ghost" asChild>
            <Link to="/dentist/cases">Ver todos</Link>
          </Button>
        </div>
        <div className="grid gap-4">
          {cases.slice(0, 3).map((c) => (
            <Card
              key={c.id}
              className="p-4 flex items-center justify-between hover:border-emerald-200 transition-colors cursor-pointer"
            >
              <div>
                <h3 className="font-semibold text-slate-900">
                  {c.expand?.patient?.name || 'Paciente MW'}
                </h3>
                <p className="text-sm text-slate-500">ID: {c.id}</p>
              </div>
              <Badge variant="outline" className="capitalize bg-slate-50">
                {c.status}
              </Badge>
            </Card>
          ))}
          {cases.length === 0 && (
            <div className="text-center py-8 text-slate-500 bg-white rounded-xl border border-dashed border-slate-300">
              Nenhum caso encontrado.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
