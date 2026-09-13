import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Plus,
  CheckCircle2,
  AlertCircle,
  CalendarCheck,
  CalendarDays,
  BellRing,
  Phone,
  MessageCircle,
  Navigation as NavIcon,
  Sparkles,
  Stethoscope,
  Info,
  CalendarX2,
  MessageSquareHeart,
  Star,
  Check,
  Lock,
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useToast } from '@/hooks/use-toast'
import {
  PatientConsultationSurvey,
  PatientSurveyResponse,
  loadPatientSurveys,
  savePatientSurveys,
  getActivePatientId,
} from './surveyData'
import { SurveyModal } from './SurveyModal'

interface Appointment {
  id: string
  date: string
  rawDate: string
  time: string
  doctorName: string
  doctorRole: string
  doctorAvatar?: string
  clinicName: string
  address: string
  type: string
  status: 'confirmed' | 'pending_confirmation' | 'completed' | 'rescheduled'
  notes?: string
  preparationTips?: string[]
}

// Consultas para o cenário Maria Eduarda (pat-01): 3 realizadas (todas avaliadas) + consultas futuras
const MOCK_UPCOMING_APPOINTMENTS_PAT1: Appointment[] = [
  {
    id: 'apt-001',
    date: '18 de Julho de 2026',
    rawDate: '2026-07-18',
    time: '14:00',
    doctorName: 'Dra. Aline Costa',
    doctorRole: 'Ortodontista Especialista MWS',
    doctorAvatar: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=1',
    clinicName: 'Clínica OrthoDesign Jardins',
    address: 'Av. Paulista, 1842 - Cj 112, Bela Vista - São Paulo/SP',
    type: '3ª Manutenção (Checagem de Alinhamento)',
    status: 'confirmed',
    notes: 'Avaliação da conformação do arco inferior e ativação de torque anterior.',
    preparationTips: [
      'Realizar escovação caprichada e uso do passa-fio lingual antes da consulta',
      'Chegar com 10 minutos de antecedência para recepção',
    ],
  },
  {
    id: 'apt-002',
    date: '22 de Agosto de 2026',
    rawDate: '2026-08-22',
    time: '10:30',
    doctorName: 'Dra. Aline Costa',
    doctorRole: 'Ortodontista Especialista MWS',
    doctorAvatar: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=1',
    clinicName: 'Clínica OrthoDesign Jardins',
    address: 'Av. Paulista, 1842 - Cj 112, Bela Vista - São Paulo/SP',
    type: '4ª Manutenção (Ajuste de Torque Lingual)',
    status: 'pending_confirmation',
    notes: 'Substituição do arco de NiTi pelo fio lingual de nivelamento avançado.',
    preparationTips: [
      'Sessão com duração estimada de 45 minutos',
      'Trazer dúvidas anotadas sobre a adaptação da mordida',
    ],
  },
]

// Histórico de 3 consultas pós-aquisição realizadas da Maria Eduarda (Instalação + 1ª e 2ª Manutenções)
const MOCK_PAST_APPOINTMENTS_PAT1: Appointment[] = [
  {
    id: 'apt-c3',
    date: '28 de Março de 2026',
    rawDate: '2026-03-28',
    time: '11:00',
    doctorName: 'Dra. Aline Costa',
    doctorRole: 'Ortodontista Especialista MWS',
    doctorAvatar: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=1',
    clinicName: 'Clínica OrthoDesign Jardins',
    address: 'Av. Paulista, 1842 - Cj 112, Bela Vista - São Paulo/SP',
    type: '2ª Manutenção (Refinamento Biomecânico)',
    status: 'completed',
    notes: 'Desrotacionamento favorável dos incisivos superiores com arco lingual termoativado.',
  },
  {
    id: 'apt-c2',
    date: '20 de Fevereiro de 2026',
    rawDate: '2026-02-20',
    time: '14:30',
    doctorName: 'Dra. Aline Costa',
    doctorRole: 'Ortodontista Especialista MWS',
    doctorAvatar: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=1',
    clinicName: 'Clínica OrthoDesign Jardins',
    address: 'Av. Paulista, 1842 - Cj 112, Bela Vista - São Paulo/SP',
    type: '1ª Manutenção (Ativação Lingual Inicial)',
    status: 'completed',
    notes: 'Ativação e checagem de alinhamento lingual. Excelente resposta tecidual.',
  },
  {
    id: 'apt-c1',
    date: '15 de Janeiro de 2026',
    rawDate: '2026-01-15',
    time: '09:00',
    doctorName: 'Dra. Aline Costa',
    doctorRole: 'Ortodontista Especialista MWS',
    doctorAvatar: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=1',
    clinicName: 'Clínica OrthoDesign Jardins',
    address: 'Av. Paulista, 1842 - Cj 112, Bela Vista - São Paulo/SP',
    type: 'Instalação do Fio Lingual Magic Wire',
    status: 'completed',
    notes: 'Colagem de precisão lingual e instalação dos arcos superior e inferior.',
  },
]

// Consultas para o segundo cenário (Lucas Ferreira - 4 realizadas)
const MOCK_UPCOMING_APPOINTMENTS_PAT2: Appointment[] = [
  {
    id: 'apt-201',
    date: '25 de Julho de 2026',
    rawDate: '2026-07-25',
    time: '15:00',
    doctorName: 'Dra. Aline Costa',
    doctorRole: 'Ortodontista Especialista MWS',
    doctorAvatar: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=1',
    clinicName: 'Clínica OrthoDesign Jardins',
    address: 'Av. Paulista, 1842 - Cj 112, Bela Vista - São Paulo/SP',
    type: '4ª Manutenção (Ajuste de Torque Lingual)',
    status: 'confirmed',
    notes: 'Ajuste de torque lingual e conferência de alinhamento.',
  },
]

const MOCK_PAST_APPOINTMENTS_PAT2: Appointment[] = [
  {
    id: 'apt-p2-c4',
    date: '30 de Maio de 2026',
    rawDate: '2026-05-30',
    time: '11:00',
    doctorName: 'Dra. Aline Costa',
    doctorRole: 'Ortodontista Especialista MWS',
    doctorAvatar: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=1',
    clinicName: 'Clínica OrthoDesign Jardins',
    address: 'Av. Paulista, 1842 - Cj 112, Bela Vista - São Paulo/SP',
    type: '3ª Manutenção (Acompanhamento da Evolução)',
    status: 'completed',
    notes: 'Evolução consistente dos movimentos sem interferências.',
  },
  {
    id: 'apt-p2-c3',
    date: '22 de Abril de 2026',
    rawDate: '2026-04-22',
    time: '14:00',
    doctorName: 'Dra. Aline Costa',
    doctorRole: 'Ortodontista Especialista MWS',
    doctorAvatar: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=1',
    clinicName: 'Clínica OrthoDesign Jardins',
    address: 'Av. Paulista, 1842 - Cj 112, Bela Vista - São Paulo/SP',
    type: '2ª Manutenção (Refinamento Biomecânico)',
    status: 'completed',
    notes: 'Troca de ligaduras linguais e conferência de oclusão.',
  },
  {
    id: 'apt-p2-c2',
    date: '15 de Março de 2026',
    rawDate: '2026-03-15',
    time: '10:00',
    doctorName: 'Dra. Aline Costa',
    doctorRole: 'Ortodontista Especialista MWS',
    doctorAvatar: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=1',
    clinicName: 'Clínica OrthoDesign Jardins',
    address: 'Av. Paulista, 1842 - Cj 112, Bela Vista - São Paulo/SP',
    type: '1ª Manutenção (Ativação Lingual Inicial)',
    status: 'completed',
    notes: 'Primeira checagem após instalação com adaptação excelente.',
  },
  {
    id: 'apt-p2-c1',
    date: '10 de Fevereiro de 2026',
    rawDate: '2026-02-10',
    time: '09:00',
    doctorName: 'Dra. Aline Costa',
    doctorRole: 'Ortodontista Especialista MWS',
    doctorAvatar: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=1',
    clinicName: 'Clínica OrthoDesign Jardins',
    address: 'Av. Paulista, 1842 - Cj 112, Bela Vista - São Paulo/SP',
    type: 'Instalação do Fio Lingual Magic Wire',
    status: 'completed',
    notes: 'Instalação completa do sistema lingual com guia de precisão.',
  },
]

const statusConfig = {
  confirmed: {
    label: 'Confirmada',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
  },
  pending_confirmation: {
    label: 'Aguardando Confirmação',
    badgeClass: 'bg-amber-100 text-amber-800 border-amber-300',
  },
  completed: {
    label: 'Realizada',
    badgeClass: 'bg-slate-100 text-slate-800 border-slate-300',
  },
  rescheduled: {
    label: 'Reagendada',
    badgeClass: 'bg-blue-100 text-blue-800 border-blue-300',
  },
}

export default function PatientAppointments() {
  const currentPatientId = getActivePatientId()
  const isPat2 = currentPatientId === 'pat-02'

  const [upcoming, setUpcoming] = useState<Appointment[]>(
    isPat2 ? MOCK_UPCOMING_APPOINTMENTS_PAT2 : MOCK_UPCOMING_APPOINTMENTS_PAT1,
  )
  const [past, setPast] = useState<Appointment[]>(
    isPat2 ? MOCK_PAST_APPOINTMENTS_PAT2 : MOCK_PAST_APPOINTMENTS_PAT1,
  )
  const [surveys, setSurveys] = useState<PatientConsultationSurvey[]>(() =>
    loadPatientSurveys(currentPatientId),
  )
  const [activeSurvey, setActiveSurvey] = useState<PatientConsultationSurvey | null>(null)
  const [isSurveyModalOpen, setIsSurveyModalOpen] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [requestedDate, setRequestedDate] = useState('')
  const [requestedTime, setRequestedTime] = useState('14:00')
  const [appointmentReason, setAppointmentReason] = useState('Manutenção / Ativação de Fio Lingual')
  const [patientNotes, setPatientNotes] = useState('')
  const { toast } = useToast()

  useEffect(() => {
    const handleUpdate = () => {
      const pId = getActivePatientId()
      setSurveys(loadPatientSurveys(pId))
    }
    const handlePatientChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ patientId: string }>
      const pId = customEvent.detail?.patientId || getActivePatientId()
      if (pId === 'pat-02') {
        setUpcoming(MOCK_UPCOMING_APPOINTMENTS_PAT2)
        setPast(MOCK_PAST_APPOINTMENTS_PAT2)
      } else {
        setUpcoming(MOCK_UPCOMING_APPOINTMENTS_PAT1)
        setPast(MOCK_PAST_APPOINTMENTS_PAT1)
      }
      setSurveys(loadPatientSurveys(pId))
    }
    window.addEventListener('mws-surveys-updated', handleUpdate)
    window.addEventListener('mws-patient-changed', handlePatientChange)
    return () => {
      window.removeEventListener('mws-surveys-updated', handleUpdate)
      window.removeEventListener('mws-patient-changed', handlePatientChange)
    }
  }, [])

  const answeredSurveysCount = surveys.filter((s) => s.isAnswered).length
  const totalConsultationsCount = surveys.length // 8 consultas pós-aquisição
  const surveyProgressPercentage = Math.round(
    (answeredSurveysCount / totalConsultationsCount) * 100,
  )

  const handleOpenSurvey = (survey: PatientConsultationSurvey) => {
    setActiveSurvey(survey)
    setIsSurveyModalOpen(true)
  }

  const handleSubmitSurvey = (surveyId: string, response: PatientSurveyResponse) => {
    const pId = getActivePatientId()
    const updated = surveys.map((s) =>
      s.id === surveyId ? { ...s, isAnswered: true, response } : s,
    )
    setSurveys(updated)
    savePatientSurveys(updated, pId)
    toast({
      title: 'Pesquisa Enviada com Sucesso!',
      description:
        'Obrigado por avaliar sua consulta. Sua resposta ajuda no aperfeiçoamento contínuo.',
    })
  }

  // Mapeamento consistente de pesquisa para cada consulta da lista:
  // As consultas passadas (histórico) correspondem exatamente às consultas realizadas
  const getSurveyForUpcoming = (apt: Appointment, idx: number) => {
    // Para consultas futuras (3ª manutenção em diante no pat-01 ou 4ª no pat-02)
    if (apt.id === 'apt-001') return surveys.find((s) => s.consultationOrder === 4) // 3ª Manutenção
    if (apt.id === 'apt-002') return surveys.find((s) => s.consultationOrder === 5) // 4ª Manutenção
    if (apt.id === 'apt-201') return surveys.find((s) => s.consultationOrder === 5) // 4ª Manutenção (pat-02)
    return surveys[Math.min(past.length + idx, surveys.length - 1)]
  }

  const getSurveyForPast = (apt: Appointment, idx: number) => {
    // Mapeamento das consultas já realizadas para as pesquisas correspondentes:
    // apt-c3 (2ª manutenção) -> srv-3 (ordem 3)
    // apt-c2 (1ª manutenção) -> srv-2 (ordem 2)
    // apt-c1 (instalação) -> srv-1 (ordem 1)
    if (apt.id === 'apt-c3' || apt.id === 'apt-p2-c3')
      return surveys.find((s) => s.consultationOrder === 3)
    if (apt.id === 'apt-c2' || apt.id === 'apt-p2-c2')
      return surveys.find((s) => s.consultationOrder === 2)
    if (apt.id === 'apt-c1' || apt.id === 'apt-p2-c1')
      return surveys.find((s) => s.consultationOrder === 1)
    if (apt.id === 'apt-p2-c4') return surveys.find((s) => s.consultationOrder === 4)
    // fallback por índice invertido se a lista vier em ordem decrescente de data
    const order = past.length - idx
    return surveys.find((s) => s.consultationOrder === order) || surveys[idx]
  }

  const handleRequestAppointment = (e: React.FormEvent) => {
    e.preventDefault()
    if (!requestedDate) {
      toast({
        variant: 'destructive',
        title: 'Selecione uma data',
        description: 'Por favor, escolha uma data para a solicitação da sua consulta.',
      })
      return
    }

    const formattedDate = new Date(requestedDate + 'T12:00:00').toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })

    const newApt: Appointment = {
      id: `apt-${Date.now()}`,
      date: formattedDate,
      rawDate: requestedDate,
      time: requestedTime,
      doctorName: 'Dra. Aline Costa',
      doctorRole: 'Ortodontista Especialista MWS',
      doctorAvatar: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=1',
      clinicName: 'Clínica OrthoDesign Jardins',
      address: 'Av. Paulista, 1842 - Cj 112, Bela Vista - São Paulo/SP',
      type: appointmentReason,
      status: 'pending_confirmation',
      notes: patientNotes || 'Solicitação enviada pelo aplicativo do paciente.',
      preparationTips: [
        'A clínica entrará em contato via WhatsApp para confirmar o horário exato.',
        'Higienizar a face lingual dos dentes antes da consulta.',
      ],
    }

    setUpcoming((prev) => [newApt, ...prev])
    setIsDialogOpen(false)
    setRequestedDate('')
    setPatientNotes('')

    toast({
      title: 'Solicitação de Consulta Enviada!',
      description: `Sua solicitação para ${formattedDate} às ${requestedTime} foi recebida pela clínica.`,
    })
  }

  const handleConfirmArrival = (aptId: string) => {
    toast({
      title: 'Presença Confirmada!',
      description: 'A recepção da clínica foi avisada que você comparecerá à consulta.',
    })
  }

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-5xl mx-auto animate-fade-in-up">
      {/* Cabeçalho Principal */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
              Minhas Consultas
            </h1>
            <Badge className="bg-blue-100 text-blue-800 font-medium">Agendamento Online</Badge>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Gerencie suas sessões presenciais de ativação de fios linguais, revisões e histórico
            clínico.
          </p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-emerald-600 hover:bg-emerald-700 shadow-sm">
              <Plus className="w-4 h-4 mr-2" /> Solicitar Nova Consulta
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-slate-900">
                <CalendarCheck className="w-5 h-5 text-emerald-600" />
                Solicitar Horário de Consulta
              </DialogTitle>
              <DialogDescription>
                Escolha a data e motivo da consulta. A equipe da Dra. Aline confirmará o horário com
                você.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleRequestAppointment} className="space-y-4 pt-3">
              <div className="space-y-2">
                <Label htmlFor="apt-reason">Motivo da Consulta</Label>
                <select
                  id="apt-reason"
                  value={appointmentReason}
                  onChange={(e) => setAppointmentReason(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                >
                  <option value="Manutenção / Ativação de Fio Lingual">
                    Manutenção / Ativação de Fio Lingual
                  </option>
                  <option value="Avaliação de Evolução de Fase">
                    Avaliação de Evolução de Fase
                  </option>
                  <option value="Ajuste de Conforto Lingual">Ajuste de Conforto Lingual</option>
                  <option value="Urgência (Fio solto ou incômodo)">
                    Urgência (Fio solto ou incômodo)
                  </option>
                  <option value="Limpeza e Profilaxia Especial MWS">
                    Limpeza e Profilaxia Especial MWS
                  </option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="apt-date">Data Preferencial</Label>
                  <Input
                    id="apt-date"
                    type="date"
                    value={requestedDate}
                    onChange={(e) => setRequestedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="apt-time">Horário Preferencial</Label>
                  <select
                    id="apt-time"
                    value={requestedTime}
                    onChange={(e) => setRequestedTime(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                  >
                    <option value="09:00">09:00 (Manhã)</option>
                    <option value="10:30">10:30 (Manhã)</option>
                    <option value="14:00">14:00 (Tarde)</option>
                    <option value="15:30">15:30 (Tarde)</option>
                    <option value="17:00">17:00 (Tarde)</option>
                    <option value="18:30">18:30 (Noite)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="apt-notes">Observações ou Dúvidas para a Doutora</Label>
                <textarea
                  id="apt-notes"
                  rows={3}
                  placeholder="Ex: Gostaria de checar o fio lingual superior ou relatar sensibilidade..."
                  value={patientNotes}
                  onChange={(e) => setPatientNotes(e.target.value)}
                  className="w-full rounded-md border border-input bg-background p-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                />
              </div>

              <div className="bg-slate-50 p-3 rounded-lg text-xs text-slate-500 flex items-start gap-2 border border-slate-100">
                <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span>
                  Consultório: <strong>Clínica OrthoDesign Jardins</strong> (Av. Paulista, 1842). Em
                  caso de urgência imediata ligue: (11) 98765-4321.
                </span>
              </div>

              <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">
                Confirmar Solicitação de Agendamento
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* 2. Painel de Controle de Pesquisas Respondidas / Total de Consultas */}
      <Card className="border-emerald-200 bg-gradient-to-r from-emerald-50 via-teal-50/40 to-white shadow-xs">
        <CardContent className="p-4 sm:p-5 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start sm:items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <MessageSquareHeart className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-sm sm:text-base font-bold text-slate-900">
                    Painel de Pesquisas de Satisfação
                  </h3>
                  <Badge
                    variant="outline"
                    className="border-emerald-300 bg-white text-emerald-800 text-[11px] font-semibold"
                  >
                    Jornada de 8 Consultas
                  </Badge>
                </div>
                <p className="text-xs text-slate-600 mt-0.5">
                  Avalie o atendimento da sua ortodontista após cada consulta presencial concluída.
                </p>
              </div>
            </div>

            <div className="flex items-baseline gap-2 bg-white px-4 py-2 rounded-xl border border-emerald-200/80 shadow-2xs self-start sm:self-center shrink-0">
              <span className="text-xs text-slate-500 font-medium">Pesquisas Respondidas:</span>
              <span className="text-xl sm:text-2xl font-black text-emerald-800">
                {answeredSurveysCount}
                <span className="text-sm font-semibold text-slate-400">
                  /{totalConsultationsCount}
                </span>
              </span>
              <Badge className="bg-emerald-100 text-emerald-800 text-[10px] font-bold ml-1">
                {surveyProgressPercentage}%
              </Badge>
            </div>
          </div>

          <div className="space-y-1.5 pt-1">
            <div className="flex justify-between items-center text-xs text-slate-600">
              <span className="text-[11px] text-emerald-900 font-medium">
                Progresso das avaliações do tratamento
              </span>
              <span className="text-[11px] font-bold text-emerald-700">
                {answeredSurveysCount} de {totalConsultationsCount} consultas avaliadas
              </span>
            </div>
            <Progress
              value={surveyProgressPercentage}
              className="h-2.5 bg-emerald-100 [&>div]:bg-emerald-600 transition-all duration-500"
            />
          </div>
        </CardContent>
      </Card>

      {/* Cartões de Lembretes e Recomendações Rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-emerald-200 bg-emerald-50/40">
          <CardContent className="p-4 flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <BellRing className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-emerald-950">Lembrete Automático</h4>
              <p className="text-xs text-emerald-800">
                Você receberá um lembrete via SMS/WhatsApp 24 horas antes de cada consulta.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50/40">
          <CardContent className="p-4 flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-blue-950">Ativação dos Fios</h4>
              <p className="text-xs text-blue-800">
                Consultas duram em média 30 a 45 min para checagem da biomecânica lingual.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50/40">
          <CardContent className="p-4 flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-purple-600 text-white flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-purple-950">Local de Atendimento</h4>
              <p className="text-xs text-purple-800">
                Estacionamento conveniado no local (Edifício Paulista Center, subsolo 1).
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs: Próximas Consultas vs Histórico */}
      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="upcoming" className="flex items-center gap-2">
            <CalendarDays className="w-4 h-4" />
            Próximas Consultas ({upcoming.length})
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Histórico Realizado ({past.length})
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: Próximas Consultas */}
        <TabsContent value="upcoming" className="space-y-4 pt-4">
          {upcoming.map((apt, idx) => {
            const config = statusConfig[apt.status] || statusConfig.confirmed
            const survey = getSurveyForUpcoming(apt, idx)
            const isSurveyAnswered = survey?.isAnswered
            // Consultas futuras não aconteceram ainda: paciente só avalia após a realização
            const isCompletedApt = apt.status === 'completed'

            return (
              <Card
                key={apt.id}
                className="overflow-hidden border-slate-200 shadow-sm hover:border-slate-300 transition-all"
              >
                <CardContent className="p-5 sm:p-6 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge
                          variant="outline"
                          className={`font-semibold text-xs ${config.badgeClass}`}
                        >
                          {config.label}
                        </Badge>
                        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                          {apt.type}
                        </span>
                      </div>

                      <div className="flex items-baseline gap-2 pt-1">
                        <h3 className="text-xl font-bold text-slate-900">{apt.date}</h3>
                        <span className="text-lg font-bold text-emerald-700 flex items-center gap-1">
                          <Clock className="w-4 h-4" /> {apt.time}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 self-start sm:self-center">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleConfirmArrival(apt.id)}
                        className="text-xs border-emerald-300 text-emerald-800 hover:bg-emerald-50"
                      >
                        <CheckCircle2 className="w-4 h-4 mr-1 text-emerald-600" /> Confirmar
                        Presença
                      </Button>

                      {/* Botão "Responder Pesquisa" (ao lado do Confirmar Presença) */}
                      {isCompletedApt ? (
                        isSurveyAnswered ? (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => survey && handleOpenSurvey(survey)}
                            className="text-xs bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100"
                            title="Ver avaliação registrada"
                          >
                            <Check className="w-4 h-4 mr-1 text-emerald-600" /> Pesquisa Respondida
                            ({survey?.response?.rating}★)
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            onClick={() => survey && handleOpenSurvey(survey)}
                            className="text-xs bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs"
                          >
                            <MessageSquareHeart className="w-4 h-4 mr-1" /> Responder Pesquisa
                          </Button>
                        )
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          disabled
                          className="text-xs text-slate-400 border-slate-200 bg-slate-50 cursor-not-allowed"
                          title="A pesquisa será liberada após a realização da consulta presencial"
                        >
                          <Lock className="w-3.5 h-3.5 mr-1 text-slate-400" /> Responder Pesquisa
                          (Pendente)
                        </Button>
                      )}

                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          toast({
                            title: 'Contato da Clínica',
                            description:
                              'WhatsApp da Clínica OrthoDesign: (11) 98765-4321. Fale com a recepcionista.',
                          })
                        }}
                        className="text-xs text-slate-600"
                      >
                        <MessageCircle className="w-4 h-4 mr-1 text-emerald-600" /> Contato
                      </Button>
                    </div>
                  </div>

                  {/* Detalhes do Profissional e Local */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-11 w-11 border border-slate-200">
                        <AvatarImage src={apt.doctorAvatar} />
                        <AvatarFallback className="bg-emerald-100 text-emerald-700 font-bold">
                          AC
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-0.5">
                        <p className="text-xs font-semibold text-slate-500 uppercase">
                          Ortodontista
                        </p>
                        <p className="text-sm font-bold text-slate-900">{apt.doctorName}</p>
                        <p className="text-xs text-slate-500">{apt.doctorRole}</p>
                      </div>
                    </div>

                    <div className="space-y-1 text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100">
                      <p className="font-bold text-slate-900 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        {apt.clinicName}
                      </p>
                      <p className="text-slate-500 pl-5">{apt.address}</p>
                    </div>
                  </div>

                  {/* Notas e Orientações de Preparação */}
                  {apt.notes && (
                    <div className="bg-emerald-50/40 p-3 rounded-lg border border-emerald-100 text-xs text-slate-700">
                      <strong>Foco da Sessão:</strong> {apt.notes}
                    </div>
                  )}

                  {apt.preparationTips && apt.preparationTips.length > 0 && (
                    <div className="space-y-1">
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                        Recomendações para esta consulta:
                      </span>
                      <ul className="space-y-1">
                        {apt.preparationTips.map((tip, i) => (
                          <li key={i} className="text-xs text-slate-600 flex items-center gap-1.5">
                            <span className="text-emerald-600 font-bold">•</span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}

          {upcoming.length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-300">
              <CalendarX2 className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-semibold text-slate-800">
                Nenhuma consulta futura agendada
              </h3>
              <p className="text-sm text-slate-500 mt-1 max-w-md mx-auto">
                Mantenha suas ativações do fio lingual em dia. Clique no botão acima para solicitar
                um novo horário.
              </p>
            </div>
          )}
        </TabsContent>

        {/* Tab 2: Histórico de Consultas Realizadas */}
        <TabsContent value="history" className="space-y-4 pt-4">
          <div className="space-y-3">
            {past.map((apt, idx) => {
              const survey = getSurveyForPast(apt, idx)
              const isSurveyAnswered = survey?.isAnswered

              return (
                <Card
                  key={apt.id}
                  className="border-slate-200 hover:bg-slate-50/50 transition-colors"
                >
                  <CardContent className="p-4 sm:p-5">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge variant="outline" className="bg-slate-100 text-slate-700 text-xs">
                            Realizada
                          </Badge>
                          <span className="text-xs font-semibold text-slate-500">{apt.date}</span>
                          <span className="text-xs text-slate-400">• {apt.time}</span>
                          {isSurveyAnswered && (
                            <Badge className="bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] font-semibold">
                              <Star className="w-3 h-3 mr-1 fill-amber-400 text-amber-500 inline" />
                              Nota: {survey?.response?.rating}/5
                            </Badge>
                          )}
                        </div>
                        <h4 className="text-base font-bold text-slate-900">{apt.type}</h4>
                        <p className="text-xs text-slate-600">
                          Atendido por <strong>{apt.doctorName}</strong> na {apt.clinicName}
                        </p>
                      </div>

                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                        <div className="text-xs text-slate-500 max-w-sm bg-white p-3 rounded-lg border border-slate-100">
                          <p className="italic text-slate-700">&ldquo;{apt.notes}&rdquo;</p>
                        </div>

                        {/* Botão Responder Pesquisa na consulta realizada */}
                        {isSurveyAnswered ? (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => survey && handleOpenSurvey(survey)}
                            className="text-xs border-emerald-300 text-emerald-800 bg-emerald-50/70 hover:bg-emerald-100 shrink-0"
                            title="Ver detalhes da pesquisa enviada"
                          >
                            <Check className="w-3.5 h-3.5 mr-1 text-emerald-600" /> Ver Avaliação
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            onClick={() => survey && handleOpenSurvey(survey)}
                            className="text-xs bg-emerald-600 hover:bg-emerald-700 text-white shrink-0 shadow-xs"
                          >
                            <MessageSquareHeart className="w-3.5 h-3.5 mr-1.5" /> Responder Pesquisa
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>
      </Tabs>

      {/* Modal de Avaliação / Detalhe da Pesquisa */}
      <SurveyModal
        survey={activeSurvey}
        isOpen={isSurveyModalOpen}
        onClose={() => {
          setIsSurveyModalOpen(false)
          setActiveSurvey(null)
        }}
        onSubmit={handleSubmitSurvey}
      />
    </div>
  )
}
