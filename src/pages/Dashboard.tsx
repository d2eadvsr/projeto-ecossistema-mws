import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { getDashboardMetrics, getPatientProfile, getDentistProfile } from '@/services/api'
import { Users, TrendingUp, Activity, CheckCircle2 } from 'lucide-react'

export default function Dashboard() {
  const { user } = useAuth()
  const [metrics, setMetrics] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)

  useEffect(() => {
    if (user?.role === 'admin' || user?.role === 'manager' || user?.role === 'finance') {
      getDashboardMetrics().then(setMetrics)
    } else if (user?.role === 'patient') {
      getPatientProfile(user.id).then(setProfile)
    } else if (user?.role === 'dentist') {
      getDentistProfile(user.id).then(setProfile)
    }
  }, [user])

  if (user?.role === 'dentist') return <Navigate to="/dashboard/dentist" replace />
  if (user?.role === 'patient') return <Navigate to="/dashboard/patient" replace />

  const renderAdminDash = () => (
    <div className="space-y-6 animate-fade-in-up">
      <h2 className="text-3xl font-bold tracking-tight">KBI Executivo</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Mensal (MRR)</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {metrics?.mrr || '0'},00</div>
            <p className="text-xs text-muted-foreground">+20% em relação ao mês passado</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Licenciados Ativos</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics?.activeDentists || '0'}</div>
            <p className="text-xs text-muted-foreground">Em todo o território</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Casos em Produção</CardTitle>
            <Activity className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics?.totalCases || '0'}</div>
            <p className="text-xs text-muted-foreground">Acompanhamento lab</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderPatientDash = () => (
    <div className="space-y-6 animate-fade-in-up">
      <h2 className="text-3xl font-bold tracking-tight">Meu Tratamento</h2>
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle>Progresso do Alinhamento</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between text-sm font-medium">
            <span>Fase 2 de 5</span>
            <span>{profile?.treatment_progress || 0}%</span>
          </div>
          <Progress value={profile?.treatment_progress || 0} className="h-3" />
          <p className="text-sm text-muted-foreground mt-4">
            Próxima troca de alinhador em 4 dias.
          </p>
        </CardContent>
      </Card>
    </div>
  )

  const renderDentistDash = () => (
    <div className="space-y-6 animate-fade-in-up">
      <h2 className="text-3xl font-bold tracking-tight">Portal do Licenciado</h2>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Status da Licença</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div
                className={`w-3 h-3 rounded-full ${profile?.license_status === 'active' ? 'bg-primary' : 'bg-destructive'}`}
              />
              <span className="font-semibold text-lg capitalize">
                {profile?.license_status || 'Verificando'}
              </span>
            </div>
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <CheckCircle2 className="w-4 h-4 text-primary" /> Contrato CLM Assinado
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <CheckCircle2 className="w-4 h-4 text-primary" /> CRO Validado ({profile?.cro})
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Qualidade e NPS</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center h-32">
            <div className="text-5xl font-bold text-primary">{profile?.nps_score || '-'}</div>
            <p className="text-sm text-muted-foreground mt-2">Sua pontuação média</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  return (
    <div className="max-w-5xl mx-auto">
      {user?.role === 'admin' || user?.role === 'manager' || user?.role === 'finance'
        ? renderAdminDash()
        : null}
      {user?.role === 'patient' ? renderPatientDash() : null}
      {user?.role === 'dentist' ? renderDentistDash() : null}
      {user?.role === 'lab' ? (
        <div className="text-center py-20 animate-fade-in">
          <h2 className="text-2xl font-bold text-muted-foreground">
            Acesse o menu Produção Lab para visualizar a fila de casos.
          </h2>
        </div>
      ) : null}
    </div>
  )
}
