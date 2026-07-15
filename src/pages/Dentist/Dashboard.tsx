import { useAuth } from '@/hooks/use-auth'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Users, FolderOpen, CalendarClock, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'

const mockPatients = [
  { id: '1', name: 'Maria Silva', status: 'Em Tratamento', progress: 60 },
  { id: '2', name: 'João Santos', status: 'Em Análise', progress: 10 },
  { id: '3', name: 'Ana Costa', status: 'Finalizado', progress: 100 },
  { id: '4', name: 'Pedro Lima', status: 'Em Tratamento', progress: 45 },
]

const mockAppointments = [
  { time: '09:00', patient: 'Maria Silva', type: 'Acompanhamento' },
  { time: '10:30', patient: 'João Santos', type: 'Instalação de Alinhador' },
  { time: '14:00', patient: 'Ana Costa', type: 'Consulta Final' },
]

export default function DentistDashboard() {
  const { user } = useAuth()

  const avatarUrl = user?.avatar
    ? `${import.meta.env.VITE_POCKETBASE_URL}/api/files/${user.collectionId || '_pb_users_auth_'}/${user.id}/${user.avatar}`
    : undefined

  const pendingCases = mockPatients.filter((p) => p.status !== 'Finalizado').length

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-6xl mx-auto animate-fade-in-up">
      <div className="flex items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={avatarUrl} />
          <AvatarFallback className="bg-emerald-100 text-emerald-700 text-xl font-bold">
            {user?.name?.charAt(0) || 'D'}
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
            Olá, {user?.name || 'Dentista'}
          </h1>
          <p className="text-slate-500">Bem-vindo ao seu painel clínico.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Total de Pacientes</CardTitle>
            <Users className="h-5 w-5 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">{mockPatients.length}</div>
            <p className="text-xs text-slate-500 mt-1">Pacientes ativos</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Casos Pendentes</CardTitle>
            <FolderOpen className="h-5 w-5 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">{pendingCases}</div>
            <p className="text-xs text-slate-500 mt-1">Em análise ou tratamento</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Consultas Hoje</CardTitle>
            <CalendarClock className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">{mockAppointments.length}</div>
            <p className="text-xs text-slate-500 mt-1">Agendadas para hoje</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Agenda de Hoje</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {mockAppointments.map((apt, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="text-sm font-bold text-emerald-600 w-12">{apt.time}</div>
                <div>
                  <p className="font-medium text-slate-900">{apt.patient}</p>
                  <p className="text-sm text-slate-500">{apt.type}</p>
                </div>
              </div>
              <Link
                to="/dentist/agenda"
                className="text-xs text-emerald-600 hover:text-emerald-700 font-medium"
              >
                Detalhes
              </Link>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">Pacientes Recentes</h2>
          <Link
            to="/dentist/patients"
            className="text-sm font-medium text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
          >
            Ver todos <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <Card>
          <CardContent className="p-0">
            {mockPatients.map((p, i) => (
              <div
                key={p.id}
                className={cn(
                  'flex items-center justify-between p-4',
                  i !== mockPatients.length - 1 && 'border-b border-slate-100',
                )}
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-slate-200 text-slate-600">
                      {p.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-slate-900">{p.name}</p>
                    <p className="text-sm text-slate-500">{p.status}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-slate-700">{p.progress}%</div>
                  <div className="w-24 h-1.5 bg-slate-200 rounded-full mt-1">
                    <div
                      className="h-full bg-emerald-500 rounded-full transition-all"
                      style={{ width: `${p.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
