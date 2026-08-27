import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  FileText,
  Search,
  Plus,
  Clock,
  Calendar,
  AlertCircle,
  Activity,
  CheckCircle2,
  Stethoscope,
  Paperclip,
  ChevronRight,
  Sparkles,
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useToast } from '@/hooks/use-toast'

interface MedicalRecordEntry {
  id: string
  date: string
  procedure: string
  treatmentStage?: string
  observations: string
  dentistName: string
  nextSteps?: string
  prescriptions?: string
}

interface PatientRecord {
  id: string
  name: string
  age: number
  phone: string
  currentProtocol: string
  totalStages: number
  currentStage: number
  startDate: string
  records: MedicalRecordEntry[]
}

const MOCK_PATIENT_RECORDS: PatientRecord[] = [
  {
    id: 'p-1',
    name: 'Maria Silva',
    age: 28,
    phone: '(11) 98765-4321',
    currentProtocol: 'Magic Wire Protocolo Avançado',
    totalStages: 18,
    currentStage: 4,
    startDate: '10/01/2026',
    records: [
      {
        id: 'rec-1',
        date: '24/02/2026',
        procedure: 'Instalação do Fio Magic Wire 04 e Checagem Lingual',
        treatmentStage: 'Etapa 04 / 18',
        observations:
          'Paciente relata excelente adaptação. Fio lingual perfeitamente posicionado. Ótima higiene.',
        dentistName: 'Dr. Roberto Fernandes',
        nextSteps: 'Retorno em 15 dias para ativação do fio na etapa 05.',
      },
      {
        id: 'rec-2',
        date: '10/02/2026',
        procedure: 'Desgaste Interproximal (IPR) 0.2mm',
        treatmentStage: 'Etapa 03 / 18',
        observations:
          'Realizado IPR entre 31-41 e 32-31 conforme guia laboratorial. Aplicação de flúor tópica.',
        dentistName: 'Dr. Roberto Fernandes',
        nextSteps: 'Avançar para etapa 04 no dia 24/02.',
      },
      {
        id: 'rec-3',
        date: '10/01/2026',
        procedure: 'Colagem dos Brackets Linguais e Instalação do Fio Inicial',
        treatmentStage: 'Etapa 01 / 18',
        observations:
          'Instalação com sucesso do dispositivo lingual. Instruções completas de uso e higienização repassadas.',
        dentistName: 'Dr. Roberto Fernandes',
      },
    ],
  },
  {
    id: 'p-2',
    name: 'João Santos',
    age: 34,
    phone: '(11) 97654-3210',
    currentProtocol: 'Magic Wire Standard',
    totalStages: 10,
    currentStage: 1,
    startDate: '15/02/2026',
    records: [
      {
        id: 'rec-4',
        date: '20/02/2026',
        procedure: 'Escaneamento Intraoral 3D & Tomografia',
        observations:
          'Escaneamento de alta resolução superior e inferior com registro de mordida em cêntrica.',
        dentistName: 'Dr. Roberto Fernandes',
        nextSteps: 'Envio ao laboratório MWS para confecção do setup 3D.',
      },
    ],
  },
  {
    id: 'p-3',
    name: 'Ana Costa',
    age: 22,
    phone: '(11) 96543-2109',
    currentProtocol: 'Magic Wire Teens (Classe I)',
    totalStages: 14,
    currentStage: 14,
    startDate: '15/08/2025',
    records: [
      {
        id: 'rec-5',
        date: '18/02/2026',
        procedure: 'Avaliação Final de Oclusão & Escaneamento para Contenção',
        treatmentStage: 'Etapa 14 / 14 (Conclusão)',
        observations:
          'Caso finalizado com fechamento total de espaços e guia canina perfeita. Paciente super satisfeita.',
        dentistName: 'Dr. Roberto Fernandes',
        nextSteps: 'Entrega da contenção definitiva Vivera em 7 dias.',
      },
    ],
  },
]

export default function DentistMedicalRecord() {
  const [patients, setPatients] = useState<PatientRecord[]>(MOCK_PATIENT_RECORDS)
  const [selectedPatientId, setSelectedPatientId] = useState<string>('p-1')
  const [searchTerm, setSearchTerm] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const [newProcedure, setNewProcedure] = useState('')
  const [newStage, setNewStage] = useState('')
  const [newObservations, setNewObservations] = useState('')
  const [newNextSteps, setNewNextSteps] = useState('')
  const { toast } = useToast()

  const selectedPatient = patients.find((p) => p.id === selectedPatientId) || patients[0]

  const handleAddRecord = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newProcedure.trim() || !newObservations.trim()) return

    const newEntry: MedicalRecordEntry = {
      id: `rec-${Date.now()}`,
      date: new Date().toLocaleDateString('pt-BR'),
      procedure: newProcedure,
      treatmentStage: newStage || undefined,
      observations: newObservations,
      dentistName: 'Dr. Roberto Fernandes',
      nextSteps: newNextSteps || undefined,
    }

    setPatients((prev) =>
      prev.map((p) =>
        p.id === selectedPatientId ? { ...p, records: [newEntry, ...p.records] } : p,
      ),
    )

    setIsDialogOpen(false)
    setNewProcedure('')
    setNewStage('')
    setNewObservations('')
    setNewNextSteps('')

    toast({
      title: 'Evolução Clínica Registrada!',
      description: 'O prontuário digital foi atualizado e salvo com carimbo de data.',
    })
  }

  const filteredPatients = patients.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-6xl mx-auto animate-fade-in-up">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
              Prontuário Digital do Paciente
            </h1>
            <Badge className="bg-emerald-100 text-emerald-800">Assinatura Digital</Badge>
          </div>
          <p className="text-slate-500 mt-1">
            Histórico completo de evoluções clínicas, procedimentos realizados e planejamento
            ortodôntico.
          </p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="h-4 w-4 mr-2" /> Nova Evolução Clínica
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[540px]">
            <DialogHeader>
              <DialogTitle>Registrar Procedimento no Prontuário</DialogTitle>
              <CardDescription>Paciente: {selectedPatient?.name}</CardDescription>
            </DialogHeader>
            <form onSubmit={handleAddRecord} className="space-y-4 pt-3">
              <div className="space-y-2">
                <Label htmlFor="proc-name">Procedimento Realizado</Label>
                <Input
                  id="proc-name"
                  placeholder="Ex: Ativação de fio, IPR, colagem lingual..."
                  value={newProcedure}
                  onChange={(e) => setNewProcedure(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="proc-stage">Etapa / Fase Atual</Label>
                <Input
                  id="proc-stage"
                  placeholder="Ex: Etapa 05 / 18"
                  value={newStage}
                  onChange={(e) => setNewStage(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="proc-obs">Descrição Clínica & Anotações de Consulta</Label>
                <textarea
                  id="proc-obs"
                  rows={4}
                  required
                  placeholder="Descreva a evolução dentária, resposta biológica e queixas..."
                  value={newObservations}
                  onChange={(e) => setNewObservations(e.target.value)}
                  className="w-full rounded-md border border-input bg-background p-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="proc-next">Próximos Passos / Orientações</Label>
                <Input
                  id="proc-next"
                  placeholder="Ex: Retorno em 20 dias, uso de elástico classe II..."
                  value={newNextSteps}
                  onChange={(e) => setNewNextSteps(e.target.value)}
                />
              </div>

              <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">
                Salvar no Prontuário Digital
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Grid: Lista de Pacientes + Detalhes do Prontuário */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Coluna Esquerda: Lista de Pacientes */}
        <div className="md:col-span-4 space-y-4">
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-sm font-semibold text-slate-700">
                Selecionar Paciente
              </CardTitle>
              <div className="relative pt-2">
                <Search className="absolute left-3 top-4.5 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Buscar paciente..."
                  className="pl-9 text-xs h-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent className="p-2 space-y-1">
              {filteredPatients.map((p) => {
                const isSelected = p.id === selectedPatientId
                const progressPct = Math.round((p.currentStage / p.totalStages) * 100)
                return (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPatientId(p.id)}
                    className={`w-full text-left p-3 rounded-lg flex items-center justify-between transition-colors ${
                      isSelected
                        ? 'bg-emerald-50 text-emerald-950 border border-emerald-300'
                        : 'hover:bg-slate-100 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9 border border-slate-200">
                        <AvatarFallback className="bg-emerald-100 text-emerald-800 text-xs font-bold">
                          {p.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-xs font-bold leading-tight">{p.name}</p>
                        <p className="text-[11px] text-slate-500">
                          {p.currentStage}/{p.totalStages} etapas ({progressPct}%)
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </button>
                )
              })}
            </CardContent>
          </Card>
        </div>

        {/* Coluna Direita: Prontuário Ativo */}
        <div className="md:col-span-8 space-y-4">
          {/* Card Resumo do Paciente */}
          <Card className="border-emerald-200 bg-white shadow-sm">
            <CardContent className="p-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold text-slate-900">{selectedPatient.name}</h2>
                    <Badge
                      variant="outline"
                      className="text-xs border-emerald-300 text-emerald-700 bg-emerald-50"
                    >
                      {selectedPatient.currentProtocol}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    {selectedPatient.age} anos • {selectedPatient.phone} • Início do tratamento:{' '}
                    {selectedPatient.startDate}
                  </p>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-xs font-medium text-slate-500">
                    Progresso do Tratamento
                  </span>
                  <p className="text-lg font-bold text-emerald-700">
                    Etapa {selectedPatient.currentStage} de {selectedPatient.totalStages}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Linha do Tempo / Histórico de Evoluções */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-3 border-b border-slate-100">
              <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-600" />
                Histórico de Procedimentos e Evoluções ({selectedPatient.records.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 space-y-6">
              {selectedPatient.records.map((rec, index) => (
                <div key={rec.id} className="relative pl-6 border-l-2 border-emerald-200 space-y-2">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-emerald-600 border-2 border-white" />

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-sm font-bold text-slate-900">{rec.procedure}</h4>
                      {rec.treatmentStage && (
                        <Badge className="bg-slate-100 text-slate-700 hover:bg-slate-100 text-[10px]">
                          {rec.treatmentStage}
                        </Badge>
                      )}
                    </div>
                    <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" /> {rec.date}
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
                    {rec.observations}
                  </p>

                  {rec.nextSteps && (
                    <p className="text-xs text-emerald-800 font-medium bg-emerald-50/70 px-3 py-1.5 rounded">
                      👉 Próximos passos: {rec.nextSteps}
                    </p>
                  )}

                  <p className="text-[10px] text-slate-400">
                    Registrado por: <strong className="text-slate-600">{rec.dentistName}</strong>
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
