import { useState } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import {
  CalendarClock,
  CreditCard,
  Activity,
  CheckCircle2,
  ShieldCheck,
  Banknote,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'

export type PaymentMethod = 'mws' | 'particular'

export interface PatientProfileMock {
  id: string
  name: string
  paymentMethod: PaymentMethod
  paymentMethodLabel: string
  planName: string
  currentPhaseIndex: number
}

export const MOCK_PATIENTS_LIST: PatientProfileMock[] = [
  {
    id: 'pat-01',
    name: 'Maria Eduarda Silva',
    paymentMethod: 'mws',
    paymentMethodLabel: 'MWS / Fintech (Parcelamento em 10x)',
    planName: 'MWS Pay Direto',
    currentPhaseIndex: 3, // Manutenções (0-indexed: 0 Consulta de Avaliação, 1 Planejamento, 2 Instalação, 3 Manutenções, 4 Conclusão)
  },
  {
    id: 'pat-02',
    name: 'Lucas Ferreira',
    paymentMethod: 'particular',
    paymentMethodLabel: 'Particular / Direto no Consultório',
    planName: 'Particular',
    currentPhaseIndex: 3,
  },
]

const mockAppointment = {
  date: '18 de Julho, 2026',
  time: '14:00',
  professional: 'Dra. Aline Costa (Ortodontista)',
  type: 'Acompanhamento - Manutenções',
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

// Sequência exata solicitada:
// Consulta de Avaliação → Planejamento → Instalação → Manutenções → Conclusão
const treatmentPhases = [
  { name: 'Consulta de Avaliação', completed: true, current: false },
  { name: 'Planejamento', completed: true, current: false },
  { name: 'Instalação', completed: true, current: false },
  { name: 'Manutenções', completed: false, current: true },
  { name: 'Conclusão', completed: false, current: false },
]

export default function PatientDashboard() {
  const { user } = useAuth()
  const [selectedPatientId, setSelectedPatientId] = useState<string>(MOCK_PATIENTS_LIST[0].id)

  const currentPatient =
    MOCK_PATIENTS_LIST.find((p) => p.id === selectedPatientId) || MOCK_PATIENTS_LIST[0]

  // Se o usuário logado tiver paymentMethod no record, prioriza; senão usa o mock selecionado (mws por padrão)
  const effectivePaymentMethod: PaymentMethod =
    (user?.paymentMethod as PaymentMethod) || currentPatient.paymentMethod

  const avatarUrl = user?.avatar
    ? `${import.meta.env.VITE_POCKETBASE_URL}/api/files/${user.collectionId || '_pb_users_auth_'}/${user.id}/${user.avatar}`
    : undefined

  const pendingPayments = mockInstallments.filter((i) => i.status === 'pending').length
  const totalPaid = mockInstallments.filter((i) => i.status === 'paid').length
  const progress = 65

  // Bloco "Resumo Financeiro" deve ser exibido APENAS para pacientes cuja forma de pagamento seja via MWS/Fintech.
  // Pacientes particulares NÃO devem ver esse bloco no dashboard.
  const isMwsPayment = effectivePaymentMethod === 'mws'

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-4xl mx-auto animate-fade-in-up">
      {/* Header com avatar, nome e seletor para demonstração de perfil MWS vs Particular */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 border-2 border-emerald-200">
            <AvatarImage src={avatarUrl} />
            <AvatarFallback className="bg-emerald-100 text-emerald-700 text-xl font-bold">
              {user?.name?.charAt(0) || currentPatient.name.charAt(0) || 'P'}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
                Olá, {user?.name || currentPatient.name}
              </h1>
              <Badge
                variant="outline"
                className={cn(
                  'text-xs font-semibold',
                  isMwsPayment
                    ? 'border-emerald-300 bg-emerald-50 text-emerald-800'
                    : 'border-slate-300 bg-slate-100 text-slate-700',
                )}
              >
                {isMwsPayment ? 'Pagamento MWS/Fintech' : 'Paciente Particular'}
              </Badge>
            </div>
            <p className="text-slate-500 text-sm mt-0.5">
              Bem-vindo(a) ao seu tratamento Magic Wire Lingual.
            </p>
          </div>
        </div>

        {/* Alternador de demonstração: permite alternar entre paciente MWS e Particular */}
        <div className="flex items-center gap-2 self-start sm:self-center bg-slate-50 border border-slate-200 rounded-lg p-1.5 text-xs">
          <span className="text-slate-500 font-medium px-1">Visualização:</span>
          {MOCK_PATIENTS_LIST.map((pat) => (
            <button
              key={pat.id}
              type="button"
              onClick={() => setSelectedPatientId(pat.id)}
              className={cn(
                'px-2.5 py-1 rounded-md font-medium transition-colors text-xs',
                selectedPatientId === pat.id
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white',
              )}
            >
              {pat.paymentMethod === 'mws' ? 'MWS/Fintech' : 'Particular'}
            </button>
          ))}
        </div>
      </div>

      {/* 1. Barra de progresso do tratamento:
          Consulta de Avaliação → Planejamento → Instalação → Manutenções → Conclusão */}
      <Card className="border-emerald-200 bg-emerald-50/50 shadow-xs">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-emerald-950 text-base md:text-lg">
              <Activity className="h-5 w-5 text-emerald-600" />
              Progresso do Tratamento Magic Wire
            </CardTitle>
            <Badge className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs">
              Fase 4 de 5 • Manutenções
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between text-sm font-medium text-emerald-900">
            <span>Fase 4 de 5: Manutenções</span>
            <span className="font-bold">{progress}%</span>
          </div>
          <Progress value={progress} className="h-3 bg-emerald-200 [&>div]:bg-emerald-600" />
          <div className="grid grid-cols-5 gap-1 sm:gap-2 pt-2">
            {treatmentPhases.map((phase, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5 text-center">
                <div
                  className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all',
                    phase.completed
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : phase.current
                        ? 'bg-emerald-500 text-white ring-4 ring-emerald-200 font-bold'
                        : 'bg-slate-200 text-slate-400',
                  )}
                >
                  {phase.completed ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                </div>
                <span
                  className={cn(
                    'text-[10px] sm:text-xs leading-tight font-medium',
                    phase.current
                      ? 'font-bold text-emerald-800'
                      : phase.completed
                        ? 'text-emerald-700'
                        : 'text-slate-500',
                  )}
                >
                  {phase.name}
                </span>
                {phase.current && (
                  <span className="text-[9px] font-bold text-emerald-700 uppercase tracking-wider bg-emerald-100 px-1.5 py-0.2 rounded hidden sm:inline-block">
                    Atual
                  </span>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Próxima Consulta */}
      <Card className="border-slate-200 shadow-xs">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base md:text-lg">
            <CalendarClock className="h-5 w-5 text-blue-600" />
            Próxima Consulta
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-base sm:text-lg font-bold text-slate-900">
                {mockAppointment.date}
              </p>
              <p className="text-slate-600 text-sm">
                {mockAppointment.time} • {mockAppointment.professional}
              </p>
              <p className="text-xs text-slate-500">{mockAppointment.type}</p>
            </div>
            <div className="text-center shrink-0">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-blue-50 border border-blue-100 flex flex-col items-center justify-center">
                <span className="text-xs text-blue-600 font-semibold uppercase">Jul</span>
                <span className="text-xl sm:text-2xl font-bold text-blue-700">18</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 2. Bloco "Resumo Financeiro":
          Exibido APENAS para pacientes com forma de pagamento via MWS/Fintech.
          Pacientes particulares NÃO vêem esse bloco. */}
      {isMwsPayment ? (
        <Card className="border-purple-200 bg-gradient-to-br from-white to-purple-50/20 shadow-xs">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-base md:text-lg text-slate-900">
                <CreditCard className="h-5 w-5 text-purple-600" />
                Resumo Financeiro
              </CardTitle>
              <Badge
                variant="outline"
                className="border-purple-300 bg-purple-50 text-purple-800 text-xs font-semibold"
              >
                MWS / Fintech
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3.5 rounded-lg bg-emerald-50/80 border border-emerald-100">
                <p className="text-xs text-emerald-800 font-medium">Parcelas Pagas</p>
                <p className="text-xl font-bold text-emerald-700 mt-0.5">{totalPaid}/10</p>
              </div>
              <div className="p-3.5 rounded-lg bg-amber-50/80 border border-amber-100">
                <p className="text-xs text-amber-800 font-medium">Parcelas Pendentes</p>
                <p className="text-xl font-bold text-amber-700 mt-0.5">{pendingPayments}</p>
              </div>
            </div>

            <div className="space-y-2.5">
              {mockInstallments.map((inst) => (
                <div
                  key={inst.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        'w-2 h-2 rounded-full shrink-0',
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
            </div>

            <Link
              to="/patient/payments"
              className="block text-center text-sm font-medium text-purple-700 hover:text-purple-800 pt-1 transition-colors"
            >
              Ver todos os pagamentos e comprovantes →
            </Link>
          </CardContent>
        </Card>
      ) : (
        /* Card informativo para Paciente Particular: demonstra que o bloco MWS/Fintech está oculto */
        <Card className="border-dashed border-slate-300 bg-slate-50/60 shadow-xs">
          <CardContent className="p-4 sm:p-5 flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-slate-200 text-slate-700 flex items-center justify-center shrink-0">
              <Banknote className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-slate-900">
                  Paciente com Pagamento Particular
                </h4>
                <Badge variant="outline" className="text-[11px] border-slate-300 text-slate-600">
                  Particular
                </Badge>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                O bloco de Resumo Financeiro MWS/Fintech é exibido apenas para tratamentos
                contratados via financiamento MWS. O acerto de consultas e manutenções do seu plano
                é gerenciado diretamente com o consultório da sua ortodontista.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
