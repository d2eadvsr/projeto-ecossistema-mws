import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Link } from 'react-router-dom'
import {
  CalendarClock,
  Plus,
  Calendar as CalendarIcon,
  Clock,
  User,
  CheckCircle2,
  AlertCircle,
  Video,
  MapPin,
  Filter,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'

interface Appointment {
  id: string
  time: string
  duration: string
  patient: string
  patientPhone: string
  type: string
  status: 'confirmado' | 'em_espera' | 'concluido' | 'cancelado'
  mode: 'presencial' | 'teleorientacao'
  room?: string
  notes?: string
}

const INITIAL_TODAY_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt-1',
    time: '08:30',
    duration: '30 min',
    patient: 'Maria Silva',
    patientPhone: '(11) 98765-4321',
    type: 'Instalação de Novo Alinhador (Etapa 4)',
    status: 'confirmado',
    mode: 'presencial',
    room: 'Consultório 1',
    notes: 'Verificar adaptação da placa superior',
  },
  {
    id: 'apt-2',
    time: '09:30',
    duration: '45 min',
    patient: 'João Santos',
    patientPhone: '(11) 97654-3210',
    type: '1ª Consulta de Avaliação e Escaneamento 3D',
    status: 'confirmado',
    mode: 'presencial',
    room: 'Consultório 1',
    notes: 'Paciente indicado pelo Dr. Carlos',
  },
  {
    id: 'apt-3',
    time: '11:00',
    duration: '20 min',
    patient: 'Ana Costa',
    patientPhone: '(11) 96543-2109',
    type: 'Teleorientação - Checagem de Desconforto',
    status: 'confirmado',
    mode: 'teleorientacao',
    notes: 'Dúvida sobre uso de elásticos intermaxilares',
  },
  {
    id: 'apt-4',
    time: '14:00',
    duration: '30 min',
    patient: 'Pedro Lima',
    patientPhone: '(11) 95432-1098',
    type: 'Manutenção Preventiva / IPR',
    status: 'em_espera',
    mode: 'presencial',
    room: 'Consultório 2',
    notes: 'Trazer kit com elásticos adicionais',
  },
  {
    id: 'apt-5',
    time: '15:30',
    duration: '30 min',
    patient: 'Carla Souza',
    patientPhone: '(11) 94321-0987',
    type: 'Entrega de Contenção Vivera',
    status: 'confirmado',
    mode: 'presencial',
    room: 'Consultório 1',
  },
  {
    id: 'apt-6',
    time: '16:45',
    duration: '30 min',
    patient: 'Bruno Almeida',
    patientPhone: '(11) 93210-9876',
    type: 'Checagem de Evolução (Alinhador 8/14)',
    status: 'confirmado',
    mode: 'presencial',
    room: 'Consultório 1',
  },
]

const UPCOMING_DAYS = [
  { day: 'Amanhã', date: '25/02', count: 5 },
  { day: 'Quarta', date: '26/02', count: 7 },
  { day: 'Quinta', date: '27/02', count: 4 },
  { day: 'Sexta', date: '28/02', count: 6 },
]

export default function DentistAgenda() {
  const [appointments, setAppointments] = useState<Appointment[]>(INITIAL_TODAY_APPOINTMENTS)
  const [filter, setFilter] = useState<'all' | 'confirmado' | 'presencial' | 'teleorientacao'>(
    'all',
  )
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newPatient, setNewPatient] = useState('')
  const [newTime, setNewTime] = useState('17:30')
  const [newType, setNewType] = useState('Consulta de Retorno')
  const [newMode, setNewMode] = useState<'presencial' | 'teleorientacao'>('presencial')
  const { toast } = useToast()

  const filteredAppointments = appointments.filter((apt) => {
    if (filter === 'confirmado') return apt.status === 'confirmado'
    if (filter === 'presencial') return apt.mode === 'presencial'
    if (filter === 'teleorientacao') return apt.mode === 'teleorientacao'
    return true
  })

  const handleAddAppointment = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newPatient.trim()) return

    const newApt: Appointment = {
      id: `apt-${Date.now()}`,
      time: newTime,
      duration: '30 min',
      patient: newPatient,
      patientPhone: '(11) 99999-0000',
      type: newType,
      status: 'confirmado',
      mode: newMode,
      room: newMode === 'presencial' ? 'Consultório 1' : undefined,
    }

    setAppointments((prev) => [...prev, newApt].sort((a, b) => a.time.localeCompare(b.time)))
    setIsDialogOpen(false)
    setNewPatient('')
    toast({
      title: 'Agendamento criado',
      description: `Consulta agendada para ${newPatient} às ${newTime}.`,
    })
  }

  const handleStatusChange = (id: string, newStatus: Appointment['status']) => {
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, status: newStatus } : apt)),
    )
    toast({
      title: 'Status atualizado',
      description: 'O status do compromisso foi atualizado com sucesso.',
    })
  }

  const totalHoje = appointments.length
  const confirmadas = appointments.filter((a) => a.status === 'confirmado').length
  const teleorientacoes = appointments.filter((a) => a.mode === 'teleorientacao').length

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-6xl mx-auto animate-fade-in-up">
      {/* Top bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Agenda & Consultas</h1>
            <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 font-semibold">
              Hoje
            </Badge>
          </div>
          <p className="text-slate-500 mt-1">
            Gestão completa dos seus atendimentos diários e programação semanal.
          </p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-emerald-600 hover:bg-emerald-700 shadow-sm">
              <Plus className="h-4 w-4 mr-2" /> Novo Agendamento
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[480px]">
            <DialogHeader>
              <DialogTitle>Novo Agendamento</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddAppointment} className="space-y-4 pt-3">
              <div className="space-y-2">
                <Label htmlFor="patient-name">Nome do Paciente</Label>
                <Input
                  id="patient-name"
                  value={newPatient}
                  onChange={(e) => setNewPatient(e.target.value)}
                  placeholder="Ex: Mariana Ribeiro"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="apt-time">Horário</Label>
                  <Input
                    id="apt-time"
                    type="time"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="apt-mode">Modalidade</Label>
                  <select
                    id="apt-mode"
                    value={newMode}
                    onChange={(e) => setNewMode(e.target.value as 'presencial' | 'teleorientacao')}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                  >
                    <option value="presencial">Presencial</option>
                    <option value="teleorientacao">Teleorientação</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="apt-type">Tipo de Procedimento / Consulta</Label>
                <select
                  id="apt-type"
                  value={newType}
                  onChange={(e) => setNewType(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                >
                  <option value="1ª Avaliação / Escaneamento">1ª Avaliação / Escaneamento</option>
                  <option value="Instalação de Alinhador">Instalação de Alinhador</option>
                  <option value="Manutenção / IPR / Attachments">
                    Manutenção / IPR / Attachments
                  </option>
                  <option value="Entrega de Contenção">Entrega de Contenção</option>
                  <option value="Teleorientação de Acompanhamento">
                    Teleorientação de Acompanhamento
                  </option>
                  <option value="Consulta de Retorno">Consulta de Retorno</option>
                </select>
              </div>

              <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">
                Confirmar Agendamento
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Highlights / Métricas de Hoje */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Consultas Agendadas Hoje
            </CardTitle>
            <CalendarClock className="h-5 w-5 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">{totalHoje}</div>
            <p className="text-xs text-slate-500 mt-1">{confirmadas} pacientes confirmados</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Presenciais vs Online
            </CardTitle>
            <Video className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">
              {totalHoje - teleorientacoes}{' '}
              <span className="text-lg font-normal text-slate-500">/ {teleorientacoes} online</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">Consultório físico & teleconsulta</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Próximos 4 Dias</CardTitle>
            <CalendarIcon className="h-5 w-5 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3 pt-1">
              {UPCOMING_DAYS.map((d) => (
                <div
                  key={d.day}
                  className="text-center flex-1 bg-slate-50 rounded p-1.5 border border-slate-100"
                >
                  <p className="text-[10px] text-slate-500 font-medium">{d.day}</p>
                  <p className="text-sm font-bold text-slate-800">{d.count}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de compromissos de hoje */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="border-b border-slate-100 pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <CardTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Clock className="w-5 h-5 text-emerald-600" />
                Compromissos do Dia
              </CardTitle>
              <p className="text-xs text-slate-500 mt-0.5">
                Organize seu dia clínico por horário e paciente
              </p>
            </div>

            {/* Filtros rápidos */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <Button
                variant={filter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('all')}
                className={
                  filter === 'all' ? 'bg-slate-800 hover:bg-slate-900 text-xs h-8' : 'text-xs h-8'
                }
              >
                Todos ({appointments.length})
              </Button>
              <Button
                variant={filter === 'confirmado' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('confirmado')}
                className={
                  filter === 'confirmado'
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-xs h-8'
                    : 'text-xs h-8'
                }
              >
                Confirmados
              </Button>
              <Button
                variant={filter === 'presencial' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('presencial')}
                className={
                  filter === 'presencial'
                    ? 'bg-blue-600 hover:bg-blue-700 text-xs h-8'
                    : 'text-xs h-8'
                }
              >
                Presencial
              </Button>
              <Button
                variant={filter === 'teleorientacao' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('teleorientacao')}
                className={
                  filter === 'teleorientacao'
                    ? 'bg-purple-600 hover:bg-purple-700 text-xs h-8'
                    : 'text-xs h-8'
                }
              >
                Online
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-4 sm:p-6 space-y-3">
          {filteredAppointments.map((apt) => (
            <div
              key={apt.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-slate-200 bg-white hover:border-emerald-300 hover:shadow-sm transition-all gap-4"
            >
              <div className="flex items-start sm:items-center gap-4">
                {/* Badge de Horário */}
                <div className="flex flex-col items-center justify-center w-16 h-16 rounded-xl bg-emerald-50 border border-emerald-200 flex-shrink-0">
                  <span className="text-base font-bold text-emerald-800">{apt.time}</span>
                  <span className="text-[10px] font-medium text-emerald-600">{apt.duration}</span>
                </div>

                {/* Informações da Consulta */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-slate-900 text-base">{apt.patient}</h3>
                    <Badge
                      variant="outline"
                      className={
                        apt.mode === 'teleorientacao'
                          ? 'border-purple-200 bg-purple-50 text-purple-700'
                          : 'border-slate-200 bg-slate-50 text-slate-700'
                      }
                    >
                      {apt.mode === 'teleorientacao' ? (
                        <span className="flex items-center gap-1">
                          <Video className="w-3 h-3" /> Teleorientação
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {apt.room || 'Presencial'}
                        </span>
                      )}
                    </Badge>

                    <Badge
                      className={
                        apt.status === 'confirmado'
                          ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-100'
                          : apt.status === 'em_espera'
                            ? 'bg-amber-100 text-amber-800 hover:bg-amber-100'
                            : apt.status === 'concluido'
                              ? 'bg-blue-100 text-blue-800 hover:bg-blue-100'
                              : 'bg-red-100 text-red-800 hover:bg-red-100'
                      }
                    >
                      {apt.status === 'confirmado'
                        ? 'Confirmado'
                        : apt.status === 'em_espera'
                          ? 'Em Espera'
                          : apt.status === 'concluido'
                            ? 'Atendido'
                            : 'Cancelado'}
                    </Badge>
                  </div>

                  <p className="text-sm font-medium text-slate-700">{apt.type}</p>

                  {apt.notes && (
                    <p className="text-xs text-slate-500 bg-slate-50 px-2 py-1 rounded inline-block">
                      Obs: {apt.notes}
                    </p>
                  )}
                </div>
              </div>

              {/* Ações */}
              <div className="flex items-center gap-2 self-end sm:self-center">
                {apt.status !== 'concluido' && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                    onClick={() => handleStatusChange(apt.id, 'concluido')}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Atender
                  </Button>
                )}
                <Link to="/dentist/patients">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-xs text-slate-600 hover:text-slate-900"
                  >
                    <User className="w-3.5 h-3.5 mr-1" /> Prontuário
                  </Button>
                </Link>
              </div>
            </div>
          ))}

          {filteredAppointments.length === 0 && (
            <div className="text-center py-10 bg-slate-50 rounded-xl border border-dashed border-slate-300">
              <CalendarClock className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-sm text-slate-600 font-medium">
                Nenhuma consulta encontrada com esse filtro.
              </p>
              <p className="text-xs text-slate-400">
                Altere o filtro acima ou crie um novo agendamento.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
