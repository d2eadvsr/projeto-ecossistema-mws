import { useAuth } from '@/hooks/use-auth'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { CalendarClock, CreditCard, Activity, CheckCircle2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'

const mockAppointment = {
  date: '18 de Julho, 2026',
  time: '14:00',
  professional: 'Dra. Aline Costa',
  type: 'Acompanhamento - Fase 2',
}

const mockInstallments = [
  {
    id: '1',
    description: 'Parcela 3/10',
    amount: 'R$ 350,00',
    status: 'pending',
    dueDate: '20/07',
  },
  { id: '2', description: 'Parcela 2/10', amount: 'R$ 350,00', status: 'paid', dueDate: '20/06' },
  { id: '3', description: 'Parcela 1/10', amount: 'R$ 350,00', status: 'paid', dueDate: '20/05' },
]

const treatmentPhases = [
  { name: 'Consulta', completed: true, current: false },
  { name: 'Planejamento', completed: true, current: false },
  { name: 'Instalação', completed: true, current: false },
  { name: 'Fase 2', completed: false, current: true },
  { name: 'Final', completed: false, current: false },
]

export default function PatientDashboard() {
  const { user } = useAuth()

  const avatarUrl = user?.avatar
    ? `${import.meta.env.VITE_POCKETBASE_URL}/api/files/${user.collectionId || '_pb_users_auth_'}/${user.id}/${user.avatar}`
    : undefined

  const pendingPayments = mockInstallments.filter((i) => i.status === 'pending').length
  const totalPaid = mockInstallments.filter((i) => i.status === 'paid').length
  const progress = 40

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-4xl mx-auto animate-fade-in-up">
      <div className="flex items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={avatarUrl} />
          <AvatarFallback className="bg-emerald-100 text-emerald-700 text-xl font-bold">
            {user?.name?.charAt(0) || 'P'}
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
            Olá, {user?.name || 'Paciente'}
          </h1>
          <p className="text-slate-500">Bem-vindo(a) ao seu tratamento Magic Wire.</p>
        </div>
      </div>

      <Card className="border-emerald-200 bg-emerald-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-emerald-900">
            <Activity className="h-5 w-5" />
            Progresso do Tratamento
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between text-sm font-medium text-emerald-900">
            <span>Fase 2 de 5</span>
            <span>{progress}%</span>
          </div>
          <Progress
            value={progress}
            className="h-3 bg-emerald-200"
            indicatorClassName="bg-emerald-600"
          />
          <div className="flex justify-between items-start pt-2">
            {treatmentPhases.map((phase, i) => (
              <div key={i} className="flex flex-col items-center gap-1 flex-1">
                <div
                  className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center text-xs',
                    phase.completed
                      ? 'bg-emerald-600 text-white'
                      : phase.current
                        ? 'bg-emerald-400 text-white ring-4 ring-emerald-200'
                        : 'bg-slate-200 text-slate-400',
                  )}
                >
                  {phase.completed ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                </div>
                <span
                  className={cn(
                    'text-[10px] text-center',
                    phase.current ? 'font-bold text-emerald-700' : 'text-slate-500',
                  )}
                >
                  {phase.name}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <CalendarClock className="h-5 w-5 text-blue-600" />
            Próxima Consulta
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-lg font-bold text-slate-900">{mockAppointment.date}</p>
              <p className="text-slate-600">
                {mockAppointment.time} • {mockAppointment.professional}
              </p>
              <p className="text-sm text-slate-500">{mockAppointment.type}</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-xl bg-blue-50 flex flex-col items-center justify-center">
                <span className="text-xs text-blue-600 font-medium">Jul</span>
                <span className="text-2xl font-bold text-blue-700">18</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <CreditCard className="h-5 w-5 text-purple-600" />
            Resumo Financeiro
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 rounded-lg bg-emerald-50">
              <p className="text-sm text-slate-500">Pagas</p>
              <p className="text-xl font-bold text-emerald-700">{totalPaid}/10</p>
            </div>
            <div className="p-3 rounded-lg bg-amber-50">
              <p className="text-sm text-slate-500">Pendentes</p>
              <p className="text-xl font-bold text-amber-700">{pendingPayments}</p>
            </div>
          </div>
          {mockInstallments.map((inst) => (
            <div
              key={inst.id}
              className="flex items-center justify-between p-3 rounded-lg bg-slate-50"
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    'w-2 h-2 rounded-full',
                    inst.status === 'paid' ? 'bg-emerald-500' : 'bg-amber-500',
                  )}
                />
                <div>
                  <p className="font-medium text-slate-900 text-sm">{inst.description}</p>
                  <p className="text-xs text-slate-500">Vencimento: {inst.dueDate}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-slate-900 text-sm">{inst.amount}</p>
                <p
                  className={cn(
                    'text-xs font-medium',
                    inst.status === 'paid' ? 'text-emerald-600' : 'text-amber-600',
                  )}
                >
                  {inst.status === 'paid' ? 'Pago' : 'Pendente'}
                </p>
              </div>
            </div>
          ))}
          <Link
            to="/patient/payments"
            className="block text-center text-sm font-medium text-emerald-600 hover:text-emerald-700 pt-2"
          >
            Ver todos os pagamentos
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
