import { useState, useEffect } from 'react'
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
  Clock,
  CircleDashed,
  ChevronDown,
  ChevronUp,
  Banknote,
  MessageSquareHeart,
  X,
  ArrowRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'
import {
  PatientConsultationSurvey,
  loadPatientSurveys,
  getActivePatientId,
  setActivePatientId,
} from './surveyData'

export type PaymentMethod = 'mws' | 'particular'

export type PostAcquisitionConsultationType = 'instalacao' | 'manutencao' | 'conclusao'

export interface PostAcquisitionConsultation {
  id: string
  order: number
  type: PostAcquisitionConsultationType
  title: string
  description: string
  date?: string
  status: 'completed' | 'scheduled' | 'pending'
}

export interface PatientProfileMock {
  id: string
  name: string
  paymentMethod: PaymentMethod
  paymentMethodLabel: string
  planName: string
  currentPhaseIndex: number
  postAcquisitionConsultations: PostAcquisitionConsultation[]
}

// 8 consultas pós-aquisição do protocolo Magic Wire:
// 1 Instalação + 6 Manutenções programadas (1ª a 6ª) + 1 Conclusão
export const DEFAULT_POST_ACQUISITION_CONSULTATIONS_PAT1: PostAcquisitionConsultation[] = [
  {
    id: 'c-1',
    order: 1,
    type: 'instalacao',
    title: 'Instalação',
    description: 'Instalação do fio Magic Wire lingual',
    date: '15/01/2026',
    status: 'completed',
  },
  {
    id: 'c-2',
    order: 2,
    type: 'manutencao',
    title: '1ª Manutenção',
    description: 'Ativação e checagem de alinhamento lingual',
    date: '20/02/2026',
    status: 'completed',
  },
  {
    id: 'c-3',
    order: 3,
    type: 'manutencao',
    title: '2ª Manutenção',
    description: 'Troca de segmento / refinamento biomecânico',
    date: '28/03/2026',
    status: 'completed',
  },
  {
    id: 'c-4',
    order: 4,
    type: 'manutencao',
    title: '3ª Manutenção',
    description: 'Acompanhamento da evolução dos movimentos',
    date: '18/07/2026',
    status: 'scheduled',
  },
  {
    id: 'c-5',
    order: 5,
    type: 'manutencao',
    title: '4ª Manutenção',
    description: 'Ajuste de torque e nivelamento lingual',
    status: 'pending',
  },
  {
    id: 'c-6',
    order: 6,
    type: 'manutencao',
    title: '5ª Manutenção',
    description: 'Fechamento de espaços e alinhamento',
    status: 'pending',
  },
  {
    id: 'c-7',
    order: 7,
    type: 'manutencao',
    title: '6ª Manutenção',
    description: 'Detalhamento oclusal e intercuspidação',
    status: 'pending',
  },
  {
    id: 'c-8',
    order: 8,
    type: 'conclusao',
    title: 'Conclusão',
    description: 'Finalização do caso e instalação da contenção fixa',
    status: 'pending',
  },
]

export const DEFAULT_POST_ACQUISITION_CONSULTATIONS_PAT2: PostAcquisitionConsultation[] = [
  {
    id: 'c-201',
    order: 1,
    type: 'instalacao',
    title: 'Instalação',
    description: 'Instalação do fio Magic Wire lingual',
    date: '10/02/2026',
    status: 'completed',
  },
  {
    id: 'c-202',
    order: 2,
    type: 'manutencao',
    title: '1ª Manutenção',
    description: 'Ativação e checagem de alinhamento lingual',
    date: '15/03/2026',
    status: 'completed',
  },
  {
    id: 'c-203',
    order: 3,
    type: 'manutencao',
    title: '2ª Manutenção',
    description: 'Troca de segmento / refinamento biomecânico',
    date: '22/04/2026',
    status: 'completed',
  },
  {
    id: 'c-204',
    order: 4,
    type: 'manutencao',
    title: '3ª Manutenção',
    description: 'Acompanhamento da evolução dos movimentos',
    date: '30/05/2026',
    status: 'completed',
  },
  {
    id: 'c-205',
    order: 5,
    type: 'manutencao',
    title: '4ª Manutenção',
    description: 'Ajuste de torque e nivelamento lingual',
    date: '25/07/2026',
    status: 'scheduled',
  },
  {
    id: 'c-206',
    order: 6,
    type: 'manutencao',
    title: '5ª Manutenção',
    description: 'Fechamento de espaços e alinhamento',
    status: 'pending',
  },
  {
    id: 'c-207',
    order: 7,
    type: 'manutencao',
    title: '6ª Manutenção',
    description: 'Detalhamento oclusal e intercuspidação',
    status: 'pending',
  },
  {
    id: 'c-208',
    order: 8,
    type: 'conclusao',
    title: 'Conclusão',
    description: 'Finalização do caso e instalação da contenção fixa',
    status: 'pending',
  },
]

export const MOCK_PATIENTS_LIST: PatientProfileMock[] = [
  {
    id: 'pat-01',
    name: 'Maria Eduarda Silva',
    paymentMethod: 'mws',
    paymentMethodLabel: 'MWS / Fintech (Parcelamento em 10x)',
    planName: 'MWS Pay Direto',
    currentPhaseIndex: 3, // Manutenções (0-indexed: 0 Consulta de Avaliação, 1 Planejamento, 2 Instalação, 3 Manutenções, 4 Conclusão)
    postAcquisitionConsultations: DEFAULT_POST_ACQUISITION_CONSULTATIONS_PAT1,
  },
  {
    id: 'pat-02',
    name: 'Lucas Ferreira',
    paymentMethod: 'particular',
    paymentMethodLabel: 'Particular / Direto no Consultório',
    planName: 'Particular',
    currentPhaseIndex: 3,
    postAcquisitionConsultations: DEFAULT_POST_ACQUISITION_CONSULTATIONS_PAT2,
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
  const [selectedPatientId, setSelectedPatientId] = useState<string>(getActivePatientId)

  const currentPatient =
    MOCK_PATIENTS_LIST.find((p) => p.id === selectedPatientId) || MOCK_PATIENTS_LIST[0]

  const handleSelectPatient = (id: string) => {
    setSelectedPatientId(id)
    setActivePatientId(id)
    setSurveys(loadPatientSurveys(id))
  }

  // Se o usuário logado tiver paymentMethod no record, prioriza; senão usa o mock selecionado (mws por padrão)
  const effectivePaymentMethod: PaymentMethod =
    (user?.paymentMethod as PaymentMethod) || currentPatient.paymentMethod

  const avatarUrl = user?.avatar
    ? `${import.meta.env.VITE_POCKETBASE_URL}/api/files/${user.collectionId || '_pb_users_auth_'}/${user.id}/${user.avatar}`
    : undefined

  const [showConsultationsList, setShowConsultationsList] = useState(false)
  const [surveys, setSurveys] = useState<PatientConsultationSurvey[]>(() =>
    loadPatientSurveys(selectedPatientId),
  )
  const [isReminderDismissed, setIsReminderDismissed] = useState(false)

  useEffect(() => {
    const handleUpdate = () => {
      setSurveys(loadPatientSurveys(selectedPatientId))
    }
    const handlePatientChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ patientId: string }>
      if (customEvent.detail?.patientId) {
        setSelectedPatientId(customEvent.detail.patientId)
        setSurveys(loadPatientSurveys(customEvent.detail.patientId))
      }
    }
    window.addEventListener('mws-surveys-updated', handleUpdate)
    window.addEventListener('mws-patient-changed', handlePatientChange)
    return () => {
      window.removeEventListener('mws-surveys-updated', handleUpdate)
      window.removeEventListener('mws-patient-changed', handlePatientChange)
    }
  }, [selectedPatientId])

  const consultations = currentPatient.postAcquisitionConsultations
  const totalConsultations = consultations.length // 8
  const completedConsultations = consultations.filter((c) => c.status === 'completed').length
  const progressPercentage = Math.round((completedConsultations / totalConsultations) * 100)

  const answeredSurveysCount = surveys.filter((s) => s.isAnswered).length
  const totalConsultationsForSurveys = surveys.length
  const pendingSurveysCount = totalConsultationsForSurveys - answeredSurveysCount

  // Pesquisas pendentes de consultas JÁ REALIZADAS (para o lembrete inteligente):
  const pendingCompletedSurveysCount = surveys.filter(
    (s) => s.consultationStatus === 'completed' && !s.isAnswered,
  ).length

  const pendingPayments = mockInstallments.filter((i) => i.status === 'pending').length
  const totalPaid = mockInstallments.filter((i) => i.status === 'paid').length

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
              onClick={() => handleSelectPatient(pat.id)}
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

      {/* 4. Lembrete de Pesquisas:
          Regra de produto:
          O banner deve aparecer quando houver pesquisas pendentes de CONSULTAS JÁ REALIZADAS
          (e NÃO deve bloquear novas marcações — zero burocracia).
          Se não houver pesquisas pendentes de consultas realizadas (todas as realizadas já avaliadas),
          exibe que as avaliações estão em dia ou pode ser dispensado. */}
      {!isReminderDismissed &&
        (pendingCompletedSurveysCount > 0 ? (
          <div className="relative rounded-xl border border-amber-300 bg-gradient-to-r from-amber-50 via-orange-50/40 to-white p-4 shadow-xs animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                  <MessageSquareHeart className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-xs sm:text-sm font-bold text-amber-950">
                      Você tem {pendingCompletedSurveysCount} pesquisa(s) pendente(s) de consultas
                      já realizadas ({answeredSurveysCount}/{totalConsultationsForSurveys}{' '}
                      respondidas)
                    </h3>
                    <Badge className="bg-amber-100 text-amber-800 text-[10px] font-semibold border-amber-300">
                      Lembrete Amigável
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
                    Sua avaliação leva menos de 1 minuto e é essencial para acompanhar a evolução do
                    seu tratamento Magic Wire.
                    <span className="text-slate-500 block sm:inline sm:ml-1">
                      (Este lembrete é apenas informativo e não impede novos agendamentos).
                    </span>
                  </p>
                  <div className="pt-1.5 flex items-center gap-3">
                    <Link
                      to="/patient/appointments"
                      className="inline-flex items-center text-xs font-bold text-amber-800 hover:text-amber-900 hover:underline gap-1 group"
                    >
                      <span>Responder em Consultas</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                    <span className="text-slate-300">•</span>
                    <Link
                      to="/patient/treatment"
                      className="inline-flex items-center text-xs font-semibold text-slate-600 hover:text-amber-800 hover:underline"
                    >
                      Ver todas as pesquisas em Meu Tratamento
                    </Link>
                  </div>
                </div>
              </div>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setIsReminderDismissed(true)}
                className="h-7 w-7 text-slate-400 hover:text-slate-700 hover:bg-slate-100/80 shrink-0"
                title="Dispensar lembrete"
                aria-label="Dispensar lembrete de pesquisas"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="relative rounded-xl border border-emerald-200 bg-gradient-to-r from-emerald-50/70 via-teal-50/30 to-white p-4 shadow-xs animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-xs sm:text-sm font-bold text-emerald-950">
                      Suas pesquisas estão todas em dia! ({answeredSurveysCount}/
                      {totalConsultationsForSurveys} respondidas)
                    </h3>
                    <Badge className="bg-emerald-100 text-emerald-800 text-[10px] font-semibold border-emerald-300">
                      {completedConsultations} de {completedConsultations} realizadas avaliadas
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
                    Todas as {completedConsultations} consultas já realizadas foram avaliadas por
                    você. As {totalConsultationsForSurveys - completedConsultations} próximas
                    consultas serão liberadas para avaliação assim que forem realizadas.
                  </p>
                  <div className="pt-1 flex items-center gap-3">
                    <Link
                      to="/patient/treatment"
                      className="inline-flex items-center text-xs font-semibold text-emerald-700 hover:text-emerald-800 hover:underline gap-1 group"
                    >
                      <span>Consultar histórico em Meu Tratamento</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setIsReminderDismissed(true)}
                className="h-7 w-7 text-slate-400 hover:text-slate-700 hover:bg-slate-100/80 shrink-0"
                title="Dispensar aviso"
                aria-label="Dispensar aviso de pesquisas em dia"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}

      {/* 1. Barra de progresso do tratamento:
          Consulta de Avaliação → Planejamento → Instalação → Manutenções → Conclusão
          O percentual calcula APENAS as consultas pós-aquisição (1 instalação + 6 manutenções + 1 conclusão = 8 consultas). */}
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
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-sm font-medium text-emerald-900">
            <div className="flex items-center gap-2">
              <span>Fase 4 de 5: Manutenções</span>
              <span className="text-xs text-emerald-700 font-normal">
                ({completedConsultations} de {totalConsultations} consultas realizadas)
              </span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl sm:text-2xl font-extrabold text-emerald-800">
                {progressPercentage}%
              </span>
              <span className="text-xs text-emerald-600 font-medium">concluído</span>
            </div>
          </div>

          <Progress
            value={progressPercentage}
            className="h-3 bg-emerald-200 [&>div]:bg-emerald-600 transition-all duration-500"
          />

          <div className="grid grid-cols-5 gap-1 sm:gap-2 pt-2">
            {treatmentPhases.map((phase, i) => {
              const isMaintenance = phase.name === 'Manutenções'
              const content = (
                <div
                  className={cn(
                    'flex flex-col items-center gap-1.5 text-center w-full transition-all rounded-lg p-1',
                    isMaintenance &&
                      'hover:bg-emerald-100/70 cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500',
                  )}
                >
                  <div
                    className={cn(
                      'w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all',
                      phase.completed
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : phase.current
                          ? 'bg-emerald-500 text-white ring-4 ring-emerald-200 font-bold group-hover:scale-105 group-hover:ring-emerald-300'
                          : 'bg-slate-200 text-slate-400',
                    )}
                  >
                    {phase.completed ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                  </div>
                  <span
                    className={cn(
                      'text-[10px] sm:text-xs leading-tight font-medium flex items-center gap-0.5 justify-center',
                      phase.current
                        ? 'font-bold text-emerald-800 group-hover:text-emerald-900 group-hover:underline'
                        : phase.completed
                          ? 'text-emerald-700'
                          : 'text-slate-500',
                    )}
                  >
                    {phase.name}
                  </span>
                  {phase.current && (
                    <span className="text-[9px] font-bold text-emerald-700 uppercase tracking-wider bg-emerald-100 px-1.5 py-0.2 rounded hidden sm:inline-block group-hover:bg-emerald-200">
                      Atual
                    </span>
                  )}
                </div>
              )

              if (isMaintenance) {
                return (
                  <Link
                    key={i}
                    to="/patient/treatment"
                    title="Ver histórico completo de manutenções em Meu Tratamento"
                    aria-label="Ir para Meu Tratamento (Manutenções)"
                    className="block"
                  >
                    {content}
                  </Link>
                )
              }

              return <div key={i}>{content}</div>
            })}
          </div>

          {/* Detalhamento das 8 consultas pós-aquisição que compõem o percentual */}
          <div className="pt-2 border-t border-emerald-200/70">
            <div className="flex items-center justify-between">
              <p className="text-xs text-emerald-800/80">
                Cálculo do percentual:{' '}
                <strong className="text-emerald-950 font-semibold">
                  {completedConsultations} de {totalConsultations} consultas pós-aquisição
                </strong>{' '}
                realizadas (1 Instalação + 6 Manutenções + 1 Conclusão).
              </p>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowConsultationsList(!showConsultationsList)}
                className="text-xs text-emerald-800 hover:text-emerald-950 hover:bg-emerald-100/60 h-7 px-2 shrink-0 ml-2"
              >
                {showConsultationsList ? (
                  <>
                    <span>Ocultar consultas</span>
                    <ChevronUp className="w-3.5 h-3.5 ml-1" />
                  </>
                ) : (
                  <>
                    <span>Ver as {totalConsultations} consultas</span>
                    <ChevronDown className="w-3.5 h-3.5 ml-1" />
                  </>
                )}
              </Button>
            </div>

            {showConsultationsList && (
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 bg-white/70 p-3 rounded-lg border border-emerald-200/60 animate-in fade-in duration-200">
                {consultations.map((c) => {
                  const isCompleted = c.status === 'completed'
                  const isScheduled = c.status === 'scheduled'
                  return (
                    <div
                      key={c.id}
                      className={cn(
                        'flex items-center justify-between p-2 rounded-md border text-xs',
                        isCompleted
                          ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                          : isScheduled
                            ? 'bg-blue-50/70 border-blue-200 text-blue-900'
                            : 'bg-slate-50 border-slate-200 text-slate-600',
                      )}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        {isCompleted ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        ) : isScheduled ? (
                          <Clock className="w-4 h-4 text-blue-600 shrink-0" />
                        ) : (
                          <CircleDashed className="w-4 h-4 text-slate-400 shrink-0" />
                        )}
                        <div className="truncate">
                          <p className="font-semibold truncate">
                            {c.order}. {c.title}
                          </p>
                          <p className="text-[11px] opacity-75 truncate">{c.description}</p>
                        </div>
                      </div>
                      <div className="text-right shrink-0 ml-2">
                        <span
                          className={cn(
                            'inline-block px-1.5 py-0.5 rounded text-[10px] font-medium',
                            isCompleted
                              ? 'bg-emerald-100 text-emerald-800'
                              : isScheduled
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-slate-200/70 text-slate-600',
                          )}
                        >
                          {isCompleted
                            ? `Realizada${c.date ? ` • ${c.date}` : ''}`
                            : isScheduled
                              ? `Agendada${c.date ? ` • ${c.date}` : ''}`
                              : 'Pendente'}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
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
