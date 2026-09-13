import { useState } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import {
  ArrowLeft,
  ChevronRight,
  User,
  Calendar,
  Phone,
  Mail,
  FileText,
  Wrench,
  CheckCircle2,
  Clock,
  Sparkles,
  Layers,
  Plus,
  Activity,
  History,
  FolderOpen,
  ClipboardList,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
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
import { getDentistPatientById, STATUS_CONFIG, MaintenanceRecord } from './mockPatients'

export default function DentistPatientDetail() {
  const { id } = useParams<{ id: string }>()
  const { toast } = useToast()

  const initialPatient = id ? getDentistPatientById(id) : undefined

  const [patient, setPatient] = useState(initialPatient)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newProcedure, setNewProcedure] = useState('')
  const [newObservations, setNewObservations] = useState('')
  const [nextDate, setNextDate] = useState('')

  if (!patient) {
    return (
      <div className="p-8 text-center space-y-4 max-w-lg mx-auto">
        <h2 className="text-xl font-bold text-slate-900">Paciente não encontrado</h2>
        <p className="text-sm text-slate-500">
          O identificador informado não corresponde a nenhum paciente na base do ortodontista.
        </p>
        <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
          <Link to="/dentist/patients">Voltar para Pacientes</Link>
        </Button>
      </div>
    )
  }

  const config = STATUS_CONFIG[patient.status]
  const isEmTratamento = patient.status === 'em-tratamento'
  const isConcluido = patient.status === 'concluidos'

  const handleAddMaintenance = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newProcedure.trim() || !newObservations.trim()) return

    const nextNumber = (patient.currentMaintenanceNumber || patient.maintenancesHistory.length) + 1
    const newRecord: MaintenanceRecord = {
      number: nextNumber,
      label: `${nextNumber}ª Manutenção`,
      date: new Date().toLocaleDateString('pt-BR'),
      procedure: newProcedure,
      observations: newObservations,
      nextDate: nextDate || undefined,
    }

    setPatient({
      ...patient,
      currentMaintenanceNumber: nextNumber,
      currentMaintenanceLabel: `${nextNumber}ª Manutenção`,
      maintenancesHistory: [...patient.maintenancesHistory, newRecord],
    })

    setIsDialogOpen(false)
    setNewProcedure('')
    setNewObservations('')
    setNextDate('')

    toast({
      title: 'Manutenção Registrada com Sucesso!',
      description: `A ${nextNumber}ª Manutenção foi adicionada à pasta individual de ${patient.name}.`,
    })
  }

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-6xl mx-auto animate-fade-in-up">
      {/* Navegação Superior / Breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-slate-500 flex-wrap">
          <Link
            to="/dentist/patients"
            className="hover:text-emerald-700 transition-colors font-medium"
          >
            Pacientes
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link
            to={`/dentist/patients/status/${patient.status}`}
            className="hover:text-emerald-700 transition-colors font-medium"
          >
            {config.label}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-semibold text-slate-900">{patient.name}</span>
        </div>

        <Button
          asChild
          variant="outline"
          size="sm"
          className="self-start sm:self-auto border-slate-200 hover:bg-slate-100 text-xs font-semibold"
        >
          <Link to={`/dentist/patients/status/${patient.status}`}>
            <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
            Voltar para {config.label}
          </Link>
        </Button>
      </div>

      {/* Header do Paciente / Card Principal */}
      <Card className="border-slate-200 shadow-sm bg-gradient-to-r from-slate-50 via-white to-white">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start sm:items-center gap-4">
              <Avatar className="h-16 w-16 border-2 border-emerald-500/20 shadow-sm">
                <AvatarFallback className="bg-emerald-600 text-white font-bold text-xl">
                  {patient.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">
                    {patient.name}
                  </h1>
                  <Badge variant="outline" className={`text-xs font-bold ${config.badgeColor}`}>
                    {config.label}
                  </Badge>
                  {patient.currentMaintenanceLabel && (
                    <Badge className="bg-slate-900 text-white hover:bg-slate-800 text-xs font-semibold flex items-center gap-1.5">
                      <Wrench className="w-3.5 h-3.5 text-emerald-400" />
                      Manutenção atual: {patient.currentMaintenanceLabel}
                    </Badge>
                  )}
                </div>
                <p className="text-xs md:text-sm text-slate-600 font-medium">{patient.protocol}</p>
                <div className="flex items-center gap-4 text-xs text-slate-500 pt-1 flex-wrap">
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5" /> {patient.age} anos
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5" /> {patient.phone}
                  </span>
                  <span className="flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5" /> {patient.email}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> Início: {patient.startDate}
                  </span>
                </div>
              </div>
            </div>

            {/* Ações Rápidas */}
            <div className="flex flex-wrap sm:flex-nowrap gap-2 self-start md:self-center">
              <Button
                asChild
                variant="outline"
                size="sm"
                className="border-slate-200 hover:border-emerald-500 text-xs font-semibold"
              >
                <Link to="/dentist/medical-record">
                  <ClipboardList className="w-3.5 h-3.5 mr-1.5 text-emerald-600" />
                  Prontuário Digital
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="border-slate-200 hover:border-blue-500 text-xs font-semibold"
              >
                <Link to="/dentist/chat-lab">
                  <FolderOpen className="w-3.5 h-3.5 mr-1.5 text-blue-600" />
                  Chat Laboratório
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* BLOCO DE MANUTENÇÕES (Passa a viver aqui na pasta individual do paciente) */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Wrench className="w-5 h-5 text-emerald-600" />
              Ciclo de Manutenções Programadas
            </h2>
            <p className="text-xs text-slate-500">
              Acompanhamento de manutenções ortodônticas do aparelho lingual Magic Wire
            </p>
          </div>

          {isEmTratamento && (
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-xs font-semibold self-start sm:self-auto">
                  <Plus className="w-3.5 h-3.5 mr-1.5" />
                  Registrar Nova Manutenção
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Registrar Próxima Manutenção</DialogTitle>
                  <CardDescription>
                    Paciente: {patient.name} • Manutenção atual:{' '}
                    {patient.currentMaintenanceLabel || '1ª Manutenção'}
                  </CardDescription>
                </DialogHeader>
                <form onSubmit={handleAddMaintenance} className="space-y-4 pt-3">
                  <div className="space-y-2">
                    <Label htmlFor="proc">Procedimento Ortodôntico Realizado</Label>
                    <Input
                      id="proc"
                      placeholder="Ex: Ativação biomecânica, troca de arco lingual robótico..."
                      value={newProcedure}
                      onChange={(e) => setNewProcedure(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="obs">Observações Clínicas</Label>
                    <textarea
                      id="obs"
                      rows={3}
                      required
                      placeholder="Evolução do alinhamento lingual, oclusão e resposta tecidual..."
                      value={newObservations}
                      onChange={(e) => setNewObservations(e.target.value)}
                      className="w-full rounded-md border border-input bg-background p-2.5 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="next">Data da Próxima Consulta / Retorno</Label>
                    <Input
                      id="next"
                      placeholder="Ex: 30/03/2026"
                      value={nextDate}
                      onChange={(e) => setNextDate(e.target.value)}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-xs"
                  >
                    Salvar Manutenção na Pasta do Paciente
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          )}
        </div>

        {/* Card de Status da Manutenção Atual */}
        {isEmTratamento && (
          <Card className="border-purple-200 bg-purple-50/40 shadow-sm">
            <CardContent className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-purple-600 text-white flex items-center justify-center flex-shrink-0 font-extrabold text-lg">
                  {patient.currentMaintenanceNumber}ª
                </div>
                <div>
                  <p className="text-xs font-semibold text-purple-700 uppercase tracking-wider">
                    Manutenção Atual do Paciente
                  </p>
                  <p className="text-xl font-bold text-slate-900">
                    Manutenção atual: {patient.currentMaintenanceLabel}
                  </p>
                  <p className="text-xs text-slate-500">
                    Ciclo padrão de 6 manutenções do protocolo lingual Magic Wire
                  </p>
                </div>
              </div>

              {/* Indicador de progresso de 1 a 6 */}
              <div className="flex items-center gap-1.5 flex-wrap">
                {[1, 2, 3, 4, 5, 6].map((num) => {
                  const isPast = (patient.currentMaintenanceNumber || 0) > num
                  const isCurrent = (patient.currentMaintenanceNumber || 0) === num
                  return (
                    <div
                      key={num}
                      className={`w-9 h-9 rounded-lg flex flex-col items-center justify-center text-xs font-bold transition-all ${
                        isCurrent
                          ? 'bg-purple-600 text-white ring-2 ring-purple-300 ring-offset-1'
                          : isPast
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : 'bg-white border border-slate-200 text-slate-400'
                      }`}
                      title={`${num}ª Manutenção`}
                    >
                      <span>{num}ª</span>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {isConcluido && (
          <Card className="border-emerald-200 bg-emerald-50/50 shadow-sm">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">
                  Tratamento Concluído com Alta
                </p>
                <p className="text-lg font-bold text-slate-900">
                  Todas as 6 manutenções foram finalizadas com sucesso
                </p>
                <p className="text-xs text-slate-600">
                  Alta emitida em {patient.lastConsultationDate || '10/01/2026'}. Contenção lingual
                  instalada.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Histórico detalhado de manutenções realizadas */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="pb-3 border-b border-slate-100">
            <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
              <History className="w-4 h-4 text-emerald-600" />
              Histórico de Manutenções Realizadas ({patient.maintenancesHistory.length})
            </CardTitle>
            <CardDescription className="text-xs">
              Registro cronológico de ativações e acompanhamentos do aparelho lingual
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6">
            {patient.maintenancesHistory.length === 0 ? (
              <div className="text-center py-8 space-y-2">
                <Clock className="w-8 h-8 text-slate-300 mx-auto" />
                <p className="text-sm font-semibold text-slate-700">
                  {patient.status === 'em-planejamento'
                    ? 'Paciente na fase de planejamento 3D'
                    : 'Nenhuma manutenção realizada até o momento'}
                </p>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  {patient.status === 'em-planejamento'
                    ? 'As manutenções programadas serão iniciadas após aprovação do setup virtual e colagem do aparelho lingual.'
                    : 'A primeira manutenção será registrada na consulta de ativação do fio lingual.'}
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {patient.maintenancesHistory.map((m, idx) => (
                  <div
                    key={m.number}
                    className="relative pl-6 border-l-2 border-emerald-300 space-y-2"
                  >
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-emerald-600 border-2 border-white shadow-sm" />

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 text-xs font-bold">
                          {m.label}
                        </Badge>
                        <h3 className="text-sm font-bold text-slate-900">{m.procedure}</h3>
                      </div>
                      <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        {m.date}
                      </span>
                    </div>

                    <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
                      {m.observations}
                    </p>

                    {m.nextDate && (
                      <p className="text-[11px] text-emerald-800 font-medium bg-emerald-50/80 px-2.5 py-1 rounded inline-block">
                        📅 Próxima consulta prevista: {m.nextDate}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Informações complementares da pasta do paciente */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-slate-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-600" />
              Dados do Protocolo Ortodôntico
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-xs text-slate-600">
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-400">Tecnologia:</span>
              <span className="font-semibold text-slate-800">
                Magic Wire System (Lingual Invisível)
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-400">Tipo de Prescrição:</span>
              <span className="font-semibold text-slate-800">{patient.protocol}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-400">Resposta Lab MWS:</span>
              <span className="font-semibold text-slate-800">
                {patient.labResponseDate ? patient.labResponseDate : 'Aguardando laboratório'}
              </span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-400">Primeira Consulta (Instalação):</span>
              <span className="font-semibold text-slate-800">
                {patient.firstConsultationDate ? patient.firstConsultationDate : 'Não realizada'}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              Observações Clínicas Gerais
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-slate-600 leading-relaxed">
            {patient.notes ? (
              <p className="bg-slate-50 p-3 rounded border border-slate-100">{patient.notes}</p>
            ) : (
              <p className="text-slate-400 italic">Sem observações adicionais cadastradas.</p>
            )}
            <p className="text-[11px] text-slate-400 mt-3">
              Responsável clínico:{' '}
              <strong className="text-slate-600">Ortodontista Credenciado</strong>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
