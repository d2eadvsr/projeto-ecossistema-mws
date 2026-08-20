import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Plus,
  Search,
  FlaskConical,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  Send,
  MessageSquare,
  Sparkles,
  ArrowRight,
  Filter,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { Link } from 'react-router-dom'

interface ClinicalCase {
  id: string
  patientName: string
  protocol: string
  stage:
    | 'enviado_lab'
    | 'analise_lab'
    | 'planejamento_pronto'
    | 'em_producao'
    | 'enviado_clinica'
    | 'entregue'
  slaDeadline: string
  submissionDate: string
  labFeedback?: string
  alignerCount?: number
  currentStep?: string
  notes?: string
}

const MOCK_CLINICAL_CASES: ClinicalCase[] = [
  {
    id: 'CAS-2026-001',
    patientName: 'Maria Silva',
    protocol: 'Protocolo Avançado (Classe II)',
    stage: 'em_producao',
    slaDeadline: '28/02/2026',
    submissionDate: '15/02/2026',
    labFeedback: 'Setup 3D aprovado. 18 alinhadores superiores e 14 inferiores em termoformagem.',
    alignerCount: 18,
    currentStep: 'Termoformagem e recorte a laser',
    notes: 'Prioridade no fechamento de diastema superior.',
  },
  {
    id: 'CAS-2026-002',
    patientName: 'João Santos',
    protocol: 'Protocolo Standard (Leve Apinhamento)',
    stage: 'planejamento_pronto',
    slaDeadline: '01/03/2026',
    submissionDate: '20/02/2026',
    labFeedback:
      'Planejamento digital finalizado pelo técnico Dr. Alexandre. Aguardando sua validação 3D.',
    alignerCount: 10,
    currentStep: 'Aguardando Aprovação do Dentista',
    notes: 'Avaliar desgastes IPR recomendados nos dentes 31-41.',
  },
  {
    id: 'CAS-2026-003',
    patientName: 'Ana Costa',
    protocol: 'Protocolo Standard',
    stage: 'enviado_clinica',
    slaDeadline: '24/02/2026',
    submissionDate: '08/02/2026',
    labFeedback:
      'Kit completo despachado via transportadora parceira. Código de rastreio: MWS-998273.',
    alignerCount: 12,
    currentStep: 'Em Trânsito para o Consultório',
    notes: 'Inclui kit de attachments e gabarito.',
  },
  {
    id: 'CAS-2026-004',
    patientName: 'Pedro Lima',
    protocol: 'Protocolo Estético Teens',
    stage: 'analise_lab',
    slaDeadline: '03/03/2026',
    submissionDate: '22/02/2026',
    labFeedback:
      'Escaneamento intraoral recebido com ótima definição. Segmentação de arcada em andamento.',
    currentStep: 'Segmentação e Limpeza de STL',
    notes: 'Paciente em fase final de dentição mista.',
  },
  {
    id: 'CAS-2026-005',
    patientName: 'Carla Souza',
    protocol: 'Protocolo Avançado (Mordida Aberta)',
    stage: 'enviado_lab',
    slaDeadline: '05/03/2026',
    submissionDate: '24/02/2026',
    labFeedback: 'Caso recebido na fila de triagem técnica do laboratório MWS.',
    currentStep: 'Triagem e Checagem de Fotos',
    notes: 'Fotos extras anexadas no prontuário.',
  },
  {
    id: 'CAS-2026-006',
    patientName: 'Bruno Almeida',
    protocol: 'Protocolo Standard',
    stage: 'entregue',
    slaDeadline: '10/02/2026',
    submissionDate: '25/01/2026',
    labFeedback: 'Caso recebido na clínica e primeira consulta já realizada.',
    alignerCount: 14,
    currentStep: 'Finalizado e em uso pelo paciente',
    notes: 'Paciente muito satisfeito com a estética.',
  },
]

const stageConfig: Record<
  ClinicalCase['stage'],
  { label: string; badgeClass: string; stepNumber: number }
> = {
  enviado_lab: {
    label: 'Enviado ao Lab',
    badgeClass: 'bg-slate-100 text-slate-800 border-slate-300',
    stepNumber: 1,
  },
  analise_lab: {
    label: 'Em Análise Técnica',
    badgeClass: 'bg-amber-100 text-amber-800 border-amber-300',
    stepNumber: 2,
  },
  planejamento_pronto: {
    label: 'Setup Pronto (Aprovar)',
    badgeClass: 'bg-purple-100 text-purple-800 border-purple-300 animate-pulse',
    stepNumber: 3,
  },
  em_producao: {
    label: 'Em Produção 3D',
    badgeClass: 'bg-blue-100 text-blue-800 border-blue-300',
    stepNumber: 4,
  },
  enviado_clinica: {
    label: 'Em Trânsito / Entrega',
    badgeClass: 'bg-cyan-100 text-cyan-800 border-cyan-300',
    stepNumber: 5,
  },
  entregue: {
    label: 'Entregue / Concluído',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    stepNumber: 6,
  },
}

export default function DentistCases() {
  const [cases, setCases] = useState<ClinicalCase[]>(MOCK_CLINICAL_CASES)
  const [searchTerm, setSearchTerm] = useState('')
  const [stageFilter, setStageFilter] = useState<string>('all')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newPatientName, setNewPatientName] = useState('')
  const [newProtocol, setNewProtocol] = useState('Protocolo Standard')
  const [newNotes, setNewNotes] = useState('')
  const { toast } = useToast()

  const handleCreateCase = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newPatientName.trim()) return

    const newCase: ClinicalCase = {
      id: `CAS-2026-00${cases.length + 1}`,
      patientName: newPatientName,
      protocol: newProtocol,
      stage: 'enviado_lab',
      slaDeadline: '06/03/2026',
      submissionDate: new Date().toLocaleDateString('pt-BR'),
      labFeedback: 'Demanda enviada com sucesso para o laboratório digital MWS.',
      currentStep: 'Na fila de triagem inicial',
      notes: newNotes,
    }

    setCases((prev) => [newCase, ...prev])
    setIsDialogOpen(false)
    setNewPatientName('')
    setNewNotes('')
    toast({
      title: 'Caso clínico criado!',
      description: `Caso de ${newPatientName} enviado ao Laboratório MWS.`,
    })
  }

  const filteredCases = cases.filter((c) => {
    const matchesSearch =
      c.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.protocol.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStage = stageFilter === 'all' || c.stage === stageFilter
    return matchesSearch && matchesStage
  })

  const countEnviados = cases.filter(
    (c) => c.stage === 'enviado_lab' || c.stage === 'analise_lab',
  ).length
  const countAguardandoAprovacao = cases.filter((c) => c.stage === 'planejamento_pronto').length
  const countEmProducao = cases.filter(
    (c) => c.stage === 'em_producao' || c.stage === 'enviado_clinica',
  ).length
  const countEntregues = cases.filter((c) => c.stage === 'entregue').length

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-6xl mx-auto animate-fade-in-up">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
            Casos Clínicos & Integração Laboratório
          </h1>
          <p className="text-slate-500 mt-1">
            Acompanhe o fluxo de fabricação dos alinhadores, setups 3D e retorno do laboratório.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link to="/dentist/chat-lab">
            <Button variant="outline" className="border-slate-300">
              <MessageSquare className="h-4 w-4 mr-2 text-blue-600" /> Chat com o Lab
            </Button>
          </Link>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                <Plus className="h-4 w-4 mr-2" /> Novo Caso Clínico
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[480px]">
              <DialogHeader>
                <DialogTitle>Abertura de Caso Clínico</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreateCase} className="space-y-4 pt-3">
                <div className="space-y-2">
                  <Label htmlFor="case-patient">Nome do Paciente</Label>
                  <Input
                    id="case-patient"
                    value={newPatientName}
                    onChange={(e) => setNewPatientName(e.target.value)}
                    required
                    placeholder="Ex: Gabriela Castro"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="case-protocol">Protocolo MWS</Label>
                  <select
                    id="case-protocol"
                    value={newProtocol}
                    onChange={(e) => setNewProtocol(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                  >
                    <option value="Protocolo Standard">
                      Protocolo Standard (Até 14 alinhadores)
                    </option>
                    <option value="Protocolo Avançado">
                      Protocolo Avançado (Complexo / Classe II/III)
                    </option>
                    <option value="Protocolo Estético Teens">Protocolo Estético Teens</option>
                    <option value="Refinamento Adicional">Refinamento Adicional</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="case-notes">Observações Clínicas & Queixa Principal</Label>
                  <Input
                    id="case-notes"
                    value={newNotes}
                    onChange={(e) => setNewNotes(e.target.value)}
                    placeholder="Ex: Alinhamento anterior e retração de caninos"
                  />
                </div>
                <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">
                  <Send className="w-4 h-4 mr-2" /> Enviar para Laboratório MWS
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Pipeline / Indicadores com o Laboratório */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-slate-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">Em Análise Técnica</span>
              <FlaskConical className="w-4 h-4 text-amber-600" />
            </div>
            <p className="text-2xl font-bold text-slate-900 mt-2">{countEnviados}</p>
            <p className="text-[11px] text-amber-700 mt-1 font-medium">Triagem e setup inicial</p>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-purple-700">Setups para Aprovar</span>
              <Sparkles className="w-4 h-4 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-purple-900 mt-2">{countAguardandoAprovacao}</p>
            <p className="text-[11px] text-purple-700 mt-1 font-medium">Aguardando sua validação</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">Em Produção / Trânsito</span>
              <Clock className="w-4 h-4 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-slate-900 mt-2">{countEmProducao}</p>
            <p className="text-[11px] text-blue-700 mt-1 font-medium">Impressão 3D e expedição</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">Casos Entregues</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-2xl font-bold text-slate-900 mt-2">{countEntregues}</p>
            <p className="text-[11px] text-emerald-700 mt-1 font-medium">Prontos na clínica</p>
          </CardContent>
        </Card>
      </div>

      {/* Busca e Filtros */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Buscar por paciente, protocolo ou código do caso..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <Button
            variant={stageFilter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setStageFilter('all')}
            className={stageFilter === 'all' ? 'bg-slate-800 text-xs' : 'text-xs'}
          >
            Todos ({cases.length})
          </Button>
          <Button
            variant={stageFilter === 'planejamento_pronto' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setStageFilter('planejamento_pronto')}
            className={
              stageFilter === 'planejamento_pronto'
                ? 'bg-purple-600 hover:bg-purple-700 text-xs'
                : 'text-xs'
            }
          >
            Aprovação Pendente ({countAguardandoAprovacao})
          </Button>
          <Button
            variant={stageFilter === 'em_producao' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setStageFilter('em_producao')}
            className={
              stageFilter === 'em_producao' ? 'bg-blue-600 hover:bg-blue-700 text-xs' : 'text-xs'
            }
          >
            Em Produção
          </Button>
        </div>
      </div>

      {/* Lista de Casos */}
      <div className="grid gap-4">
        {filteredCases.map((c) => {
          const config = stageConfig[c.stage]
          return (
            <Card
              key={c.id}
              className="overflow-hidden hover:border-slate-300 transition-all shadow-sm"
            >
              <CardContent className="p-5 sm:p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        {c.id}
                      </span>
                      <h3 className="font-bold text-lg text-slate-900">{c.patientName}</h3>
                      <Badge variant="outline" className={`font-semibold ${config.badgeClass}`}>
                        {config.label}
                      </Badge>
                    </div>
                    <p className="text-sm font-medium text-emerald-700">{c.protocol}</p>
                    <p className="text-xs text-slate-500">
                      Enviado em: {c.submissionDate} • Prazo SLA Estimado:{' '}
                      <strong className="text-slate-700">{c.slaDeadline}</strong>
                    </p>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-center">
                    {c.stage === 'planejamento_pronto' && (
                      <Button
                        size="sm"
                        className="bg-purple-600 hover:bg-purple-700 text-white shadow-sm"
                        onClick={() =>
                          toast({
                            title: 'Setup 3D Aprovado!',
                            description: `O caso de ${c.patientName} foi liberado para impressão 3D no laboratório.`,
                          })
                        }
                      >
                        <CheckCircle2 className="w-4 h-4 mr-1.5" /> Aprovar Setup 3D
                      </Button>
                    )}
                    <Link to="/dentist/chat-lab">
                      <Button variant="outline" size="sm" className="text-xs">
                        <MessageSquare className="w-3.5 h-3.5 mr-1 text-slate-500" /> Falar com Lab
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Box de Retorno / Interação do Laboratório */}
                <div className="rounded-lg bg-slate-50 border border-slate-200/80 p-3.5 space-y-2">
                  <div className="flex items-center justify-between text-xs font-medium text-slate-700">
                    <span className="flex items-center gap-1.5 text-blue-700">
                      <FlaskConical className="w-4 h-4 text-blue-600" />
                      Status no Laboratório MWS:
                      <strong className="text-slate-900 font-semibold">{c.currentStep}</strong>
                    </span>
                    {c.alignerCount && (
                      <span className="text-slate-600 font-semibold">
                        {c.alignerCount} alinhadores programados
                      </span>
                    )}
                  </div>
                  {c.labFeedback && (
                    <p className="text-xs text-slate-600 leading-relaxed bg-white p-2.5 rounded border border-slate-100">
                      💬 <strong className="text-slate-800">Nota do Técnico Lab:</strong>{' '}
                      {c.labFeedback}
                    </p>
                  )}
                  {c.notes && (
                    <p className="text-[11px] text-slate-500">
                      📌 <span className="font-medium">Sua nota clínica:</span> {c.notes}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}

        {filteredCases.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-300">
            <FlaskConical className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-slate-800">
              Nenhum caso clínico encontrado
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              Tente buscar por outro termo ou cadastre uma nova demanda para o laboratório.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
