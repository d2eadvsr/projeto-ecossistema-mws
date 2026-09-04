import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  CalendarCheck,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  Calendar,
  Sparkles,
  Phone,
  Navigation,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { MOCK_LEAD_USER } from './mockData'

export default function LeadAppointmentPage() {
  const { toast } = useToast()
  const [appointment, setAppointment] = useState(MOCK_LEAD_USER.appointment)
  const dentist = MOCK_LEAD_USER.assignedDentist

  // Estado para simular sem agendamento (toggle para testar estado vazio)
  const [hasAppointment, setHasAppointment] = useState(true)

  // Modais mockados
  const [isRescheduleOpen, setIsRescheduleOpen] = useState(false)
  const [newDate, setNewDate] = useState('2026-03-17')
  const [newTime, setNewTime] = useState('15:00')
  const [rescheduleReason, setRescheduleReason] = useState('')

  const [isScheduleNewOpen, setIsScheduleNewOpen] = useState(false)
  const [schedulePreference, setSchedulePreference] = useState('Tarde (14h às 18h)')

  const handleConfirmAttendance = () => {
    setAppointment((prev) => ({
      ...prev,
      status: 'confirmada',
    }))
    toast({
      title: 'Presença Confirmada!',
      description: `Sua consulta do dia ${appointment.date} foi confirmada na clínica do ${appointment.dentistName}.`,
    })
  }

  const handleRescheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsRescheduleOpen(false)
    setAppointment((prev) => ({
      ...prev,
      date: '17/03/2026',
      time: newTime,
      weekday: 'Terça-feira',
      status: 'reagendamento_solicitado',
    }))
    toast({
      title: 'Solicitação de Reagendamento Enviada',
      description: `O consultório do ${dentist.name} recebeu seu pedido para 17/03/2026 às ${newTime} e responderá via WhatsApp.`,
    })
  }

  const handleScheduleNew = (e: React.FormEvent) => {
    e.preventDefault()
    setIsScheduleNewOpen(false)
    setHasAppointment(true)
    setAppointment((prev) => ({
      ...prev,
      date: '15/03/2026',
      time: '14:00',
      weekday: 'Domingo',
      status: 'agendada',
    }))
    toast({
      title: 'Consulta Agendada!',
      description: 'Sua solicitação de primeira consulta foi registrada com sucesso.',
    })
  }

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-6xl mx-auto animate-fade-in-up">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
              Minha Primeira Consulta
            </h1>
            {hasAppointment && (
              <Badge
                className={
                  appointment.status === 'confirmada'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-amber-100 text-amber-800 border-amber-300'
                }
              >
                {appointment.status === 'confirmada'
                  ? 'Presença Confirmada'
                  : 'Aguardando Confirmação'}
              </Badge>
            )}
          </div>
          <p className="text-slate-500 mt-1 text-sm">
            Avaliação clínica, escaneamento intraoral 3D e elaboração do orçamento do Fio Mágico.
          </p>
        </div>

        {/* Botão de teste para alternar entre com consulta e sem consulta */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-xs text-slate-500 hover:text-slate-900"
            onClick={() => setHasAppointment(!hasAppointment)}
          >
            {hasAppointment ? 'Simular: Sem Consulta Agendada' : 'Simular: Com Consulta'}
          </Button>
        </div>
      </div>

      {/* ESTADO VAZIO: caso não haja consulta agendada */}
      {!hasAppointment ? (
        <Card className="border-dashed border-2 border-slate-300 p-8 text-center space-y-4 bg-slate-50/50">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
            <Calendar className="w-8 h-8" />
          </div>
          <div className="max-w-md mx-auto space-y-2">
            <h3 className="text-xl font-bold text-slate-900">Nenhuma consulta agendada ainda</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Você já é um <strong>Lead Qualificado</strong> e foi atribuído ao{' '}
              <strong>{dentist.name}</strong> em Campinas. Agende agora sua avaliação para mapear
              sua queixa e fazer o escaneamento 3D.
            </p>
          </div>
          <div className="pt-2">
            <Button
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-6"
              onClick={() => setIsScheduleNewOpen(true)}
            >
              <CalendarCheck className="w-4 h-4 mr-2" /> Agendar Minha Primeira Avaliação (R$ 200)
            </Button>
          </div>
        </Card>
      ) : (
        /* ESTADO COM CONSULTA AGENDADA */
        <div className="space-y-6">
          {/* Card Principal de Destaque da Consulta */}
          <Card className="border-emerald-200 bg-gradient-to-br from-emerald-50/70 via-white to-slate-50 shadow-sm overflow-hidden">
            <CardHeader className="border-b border-slate-200/60 pb-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
                      Consulta Presencial de Avaliação
                    </span>
                    <Badge
                      variant="outline"
                      className="border-emerald-600 text-emerald-700 bg-emerald-50"
                    >
                      Split MWS Oficial
                    </Badge>
                  </div>
                  <CardTitle className="text-xl md:text-2xl text-slate-900">
                    {appointment.weekday}, {appointment.date} às {appointment.time}
                  </CardTitle>
                </div>

                <div className="flex flex-col sm:items-end">
                  <span className="text-xs text-slate-500">Investimento da Consulta:</span>
                  <span className="text-2xl font-bold text-slate-900">
                    R$ {appointment.consultationValue},00
                  </span>
                  <span className="text-[11px] text-emerald-700">
                    Split transparente (R$ 100 dentista / R$ 50 mkt / R$ 50 vendas)
                  </span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6 space-y-6">
              {/* Grid com Profissional, Local e Horário */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs space-y-1">
                  <span className="text-xs text-slate-500 font-medium">
                    Ortodontista Responsável
                  </span>
                  <p className="text-sm font-bold text-slate-900">{appointment.dentistName}</p>
                  <p className="text-xs text-emerald-700 font-medium">{appointment.cro}</p>
                  <Link
                    to="/lead/ortodontista"
                    className="text-[11px] text-slate-500 hover:text-emerald-700 underline block pt-1"
                  >
                    Ver perfil do especialista →
                  </Link>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs space-y-1">
                  <span className="text-xs text-slate-500 font-medium">Clínica & Endereço</span>
                  <p className="text-sm font-bold text-slate-900 truncate">
                    {appointment.clinicName}
                  </p>
                  <p className="text-xs text-slate-600 line-clamp-2">{appointment.address}</p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs space-y-1">
                  <span className="text-xs text-slate-500 font-medium">Duração & Formato</span>
                  <p className="text-sm font-bold text-slate-900">Presencial (~50 min)</p>
                  <p className="text-xs text-slate-600">Avaliação clínica + Escaneamento 3D</p>
                </div>
              </div>

              {/* Botões de Ação: Confirmar Presença e Reagendar */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-200/60">
                <div className="flex items-center gap-2">
                  <a
                    href={`https://wa.me/${dentist.whatsapp}?text=Ol%C3%A1%20Dr.%20Gustavo,%20gostaria%20de%20tirar%20uma%20d%C3%BAvida%20sobre%20minha%20primeira%20consulta%20MWS.`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" size="sm" className="text-xs border-slate-300">
                      <Phone className="w-3.5 h-3.5 mr-1.5 text-emerald-600" /> Falar com a Recepção
                    </Button>
                  </a>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs border-slate-300"
                    onClick={() => setIsRescheduleOpen(true)}
                  >
                    <Clock className="w-3.5 h-3.5 mr-1.5 text-slate-600" /> Solicitar Reagendamento
                  </Button>
                </div>

                {appointment.status !== 'confirmada' ? (
                  <Button
                    onClick={handleConfirmAttendance}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs px-5 shadow"
                  >
                    <CheckCircle2 className="w-4 h-4 mr-2" /> Confirmar Minha Presença
                  </Button>
                ) : (
                  <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-100 px-3 py-1.5 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Presença confirmada no sistema
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* O Que Esperar na Primeira Consulta */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card className="border-slate-200 shadow-sm">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-emerald-600" />
                    <CardTitle className="text-lg text-slate-900">
                      O Que Esperar na Sua Primeira Consulta
                    </CardTitle>
                  </div>
                  <CardDescription>
                    Entenda como funciona o primeiro contato no ecossistema Magic Wire
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {appointment.whatToExpect.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1"
                      >
                        <h4 className="text-xs font-bold text-slate-900 flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                            {idx + 1}
                          </span>
                          {item.title}
                        </h4>
                        <p className="text-xs text-slate-600 pl-7 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-950 flex items-start gap-2.5">
                    <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-emerald-900 block mb-0.5">
                        Transparência e Sem Compromisso de Fechamento:
                      </span>
                      <p className="text-emerald-800 leading-relaxed">
                        A primeira consulta serve para diagnosticar a viabilidade do Fio Mágico e
                        apresentar seu plano personalizado (Protocolo MWS Classe I a V). A decisão
                        final sobre iniciar o tratamento é 100% sua.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Instruções de Chegada e Preparação */}
            <div className="space-y-6">
              <Card className="border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-base text-slate-900">Orientações para o Dia</CardTitle>
                  <CardDescription>Como se preparar para a visita</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <ul className="text-xs space-y-2.5 text-slate-700">
                    {appointment.instructions.map((inst, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{inst}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-3 border-t border-slate-100">
                    <span className="text-xs font-semibold text-slate-500 block mb-1">
                      Localização da Clínica:
                    </span>
                    <p className="text-xs text-slate-700 font-medium">{appointment.clinicName}</p>
                    <p className="text-xs text-slate-500">{appointment.address}</p>

                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(appointment.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-3 w-full"
                    >
                      <Button variant="outline" className="w-full text-xs">
                        <Navigation className="w-3.5 h-3.5 mr-1.5" /> Rotas no Google Maps
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>

              {/* Card Próxima Etapa: Orçamento */}
              <Card className="border-emerald-100 bg-emerald-900 text-white shadow-sm">
                <CardContent className="p-5 space-y-3">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                      Próxima Etapa
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-white">Elaboração do Seu Orçamento</h4>
                  <p className="text-xs text-emerald-100 leading-relaxed">
                    Assim que o escaneamento 3D for realizado, o Dr. Gustavo liberará a proposta
                    detalhada do seu Fio Mágico.
                  </p>
                  <Link to="/lead/orcamento" className="block pt-1">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="w-full text-xs bg-white text-slate-900 hover:bg-slate-100 font-medium"
                    >
                      Ver Prévia do Orçamento <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}

      {/* MODAL MOCKADO: Reagendamento */}
      <Dialog open={isRescheduleOpen} onOpenChange={setIsRescheduleOpen}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle>Solicitar Reagendamento</DialogTitle>
            <DialogDescription>
              Escolha a nova data e horário preferenciais para a sua primeira consulta com o Dr.
              Gustavo Siqueira.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleRescheduleSubmit} className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="resched-date">Nova Data Preferencial</Label>
              <Input
                id="resched-date"
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="resched-time">Novo Horário Preferencial</Label>
              <Input
                id="resched-time"
                type="time"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="resched-reason">Motivo do Reagendamento (opcional)</Label>
              <Textarea
                id="resched-reason"
                placeholder="Ex: Conflito de horário de trabalho, viagem..."
                value={rescheduleReason}
                onChange={(e) => setRescheduleReason(e.target.value)}
                rows={3}
              />
            </div>
            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" onClick={() => setIsRescheduleOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                Enviar Solicitação
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* MODAL MOCKADO: Agendar Nova Consulta (caso estado vazio) */}
      <Dialog open={isScheduleNewOpen} onOpenChange={setIsScheduleNewOpen}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle>Agendar Primeira Consulta</DialogTitle>
            <DialogDescription>
              Envie sua preferência de turno para a recepção da Siqueira Odontologia Robótica.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleScheduleNew} className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="sched-dentist">Ortodontista Credenciado</Label>
              <Input id="sched-dentist" value={`${dentist.name} (${dentist.cro})`} disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sched-pref">Período de Preferência</Label>
              <select
                id="sched-pref"
                value={schedulePreference}
                onChange={(e) => setSchedulePreference(e.target.value)}
                className="w-full rounded-md border border-input bg-background p-2.5 text-sm"
              >
                <option value="Manhã (08h às 12h)">Manhã (08h às 12h)</option>
                <option value="Tarde (14h às 18h)">Tarde (14h às 18h)</option>
                <option value="Sábado de manhã">Sábado de manhã</option>
              </select>
            </div>
            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" onClick={() => setIsScheduleNewOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                Confirmar Agendamento (R$ 200)
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
