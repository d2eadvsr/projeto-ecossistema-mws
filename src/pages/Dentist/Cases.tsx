import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Plus,
  Search,
  FlaskConical,
  Clock,
  CheckCircle2,
  FileText,
  Send,
  MessageSquare,
  Sparkles,
  Info,
  Calendar,
  Lock,
  ExternalLink,
  ChevronRight,
  Eye,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { Link } from 'react-router-dom'

export type CaseStage =
  | 'aguardando_analise_tecnica'
  | 'em_analise_tecnica'
  | 'planejamento_elaborado'
  | 'planejamento_entregue'

export type MWSProtocol = 'Classe I' | 'Classe II' | 'Classe III' | 'Classe IV' | 'Classe V'

interface ClinicalCase {
  id: string
  patientName: string
  protocol: MWSProtocol
  stage: CaseStage
  slaDeadline: string
  submissionDate: string
  notes?: string // (a) Nota clínica do ortodontista (abertura)
  labFeedback?: string // (b) Nota técnica do laboratório (planejamento)
  mentorClinicalNote?: string // (c) Recomendação do mentor
  currentStep?: string
}

const MOCK_CLINICAL_CASES: ClinicalCase[] = [
  {
    id: 'CAS-2026-001',
    patientName: 'Maria Silva',
    protocol: 'Classe II',
    stage: 'planejamento_elaborado',
    slaDeadline: '28/02/2026',
    submissionDate: '15/02/2026',
    notes:
      'Prioridade no fechamento de diastema superior e correção de sobremordida com biomecânica lingual contínua.',
    labFeedback:
      'Prezado Dr., o planejamento deste caso foi elaborado considerando a necessidade de retração anterior. Sugiro iniciar pela arcada superior com o fio MWS de calibre 0.014. Acompanharei a evolução e estarei à disposição para quaisquer dúvidas.',
    mentorClinicalNote:
      'Recomendo atenção especial à região dos pré-molares inferiores durante a ativação. O paciente relatou sensibilidade nesta área — considerar ajuste de força nos primeiros 30 dias.',
    currentStep: 'Aguardando Aprovação',
  },
  {
    id: 'CAS-2026-002',
    patientName: 'João Santos',
    protocol: 'Classe I',
    stage: 'planejamento_elaborado',
    slaDeadline: '01/03/2026',
    submissionDate: '20/02/2026',
    notes:
      'Leve apinhamento ântero-inferior com queixa estética. Paciente optou por Magic Wire pela discrição interna.',
    labFeedback:
      'Prezado Dr., o planejamento deste caso foi elaborado considerando o alinhamento e nivelamento com ancoragem lingual MWS. Sequência sugerida de arcos internos anexada na documentação técnica.',
    mentorClinicalNote:
      'Verificar a colagem dos stops linguais nos molares superiores antes da inserção do primeiro arco.',
    currentStep: 'Aguardando Aprovação',
  },
  {
    id: 'CAS-2026-003',
    patientName: 'Ana Costa',
    protocol: 'Classe III',
    stage: 'planejamento_entregue',
    slaDeadline: '24/02/2026',
    submissionDate: '08/02/2026',
    notes: 'Mordida cruzada anterior compensada com mecânica lingual.',
    labFeedback:
      'Planejamento concluído e entregue com orientações completas de instalação do sistema de fios linguais customizados MWS.',
    mentorClinicalNote: 'Acompanhar torque dos incisivos superiores nas consultas de 45 e 90 dias.',
    currentStep: 'Planejamento Finalizado e Entregue',
  },
  {
    id: 'CAS-2026-004',
    patientName: 'Pedro Lima',
    protocol: 'Classe IV',
    stage: 'em_analise_tecnica',
    slaDeadline: '03/03/2026',
    submissionDate: '22/02/2026',
    notes: 'Paciente busca discrição total no tratamento com tecnologia por trás dos dentes.',
    labFeedback:
      'Escaneamento intraoral e telerradiografia sob análise da equipe técnica e do Mentor responsável.',
    mentorClinicalNote:
      'Em fase de avaliação da relação oclusal posterior para definição do diagrama de dobras do fio.',
    currentStep: 'Análise Cefalométrica e Diagramação Lingual',
  },
  {
    id: 'CAS-2026-005',
    patientName: 'Carla Souza',
    protocol: 'Classe V',
    stage: 'aguardando_analise_tecnica',
    slaDeadline: '05/03/2026',
    submissionDate: '24/02/2026',
    notes: 'Assimetria de arco e queixa na mastigação unilateral.',
    labFeedback:
      'Caso recebido e aguardando alocação do técnico/mentor para início da elaboração do plano de tratamento.',
    mentorClinicalNote: 'Mentor será designado assim que a triagem de documentação for concluída.',
    currentStep: 'Triagem Inicial de Arquivos STL e Fotos',
  },
  {
    id: 'CAS-2026-006',
    patientName: 'Bruno Almeida',
    protocol: 'Classe II',
    stage: 'planejamento_entregue',
    slaDeadline: '10/02/2026',
    submissionDate: '25/01/2026',
    notes: 'Correção de Classe II divisão 1 com expansão e retração lingual.',
    labFeedback:
      'Planejamento entregue e validado com sucesso. Protocolo de fios e acessórios MWS enviado ao consultório.',
    mentorClinicalNote: 'Recomendo rever a guia canina após a terceira troca de arcos programada.',
    currentStep: 'Planejamento Entregue e em Andamento Clínico',
  },
]

const stageConfig: Record<CaseStage, { label: string; badgeClass: string }> = {
  aguardando_analise_tecnica: {
    label: 'Aguardando Análise Técnica',
    badgeClass: 'bg-slate-100 text-slate-800 border-slate-300',
  },
  em_analise_tecnica: {
    label: 'Em Análise Técnica',
    badgeClass: 'bg-amber-100 text-amber-800 border-amber-300',
  },
  planejamento_elaborado: {
    label: 'Aguardando Aprovação',
    badgeClass: 'bg-purple-100 text-purple-800 border-purple-300',
  },
  planejamento_entregue: {
    label: 'Planejamento Entregue',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
  },
}

const MWS_PROTOCOLS: MWSProtocol[] = [
  'Classe I',
  'Classe II',
  'Classe III',
  'Classe IV',
  'Classe V',
]

export default function DentistCases() {
  const [cases, setCases] = useState<ClinicalCase[]>(MOCK_CLINICAL_CASES)
  const [searchTerm, setSearchTerm] = useState('')
  const [stageFilter, setStageFilter] = useState<string>('all')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newPatientName, setNewPatientName] = useState('')
  const [newProtocol, setNewProtocol] = useState<MWSProtocol>('Classe I')
  const [newNotes, setNewNotes] = useState('')

  // Modal de Detalhe do Caso Selecionado
  const [selectedCase, setSelectedCase] = useState<ClinicalCase | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)

  const { toast } = useToast()

  const handleOpenDetail = (c: ClinicalCase) => {
    setSelectedCase(c)
    setIsDetailOpen(true)
  }

  const handleApproveCase = (c: ClinicalCase) => {
    setCases((prev) =>
      prev.map((item) =>
        item.id === c.id
          ? {
              ...item,
              stage: 'planejamento_entregue',
              currentStep: 'Planejamento Aprovado pelo Ortodontista',
            }
          : item,
      ),
    )
    if (selectedCase?.id === c.id) {
      setSelectedCase((prev) =>
        prev
          ? {
              ...prev,
              stage: 'planejamento_entregue',
              currentStep: 'Planejamento Aprovado pelo Ortodontista',
            }
          : null,
      )
    }
    toast({
      title: 'Planejamento Aprovado!',
      description: `O planejamento do caso de ${c.patientName} foi aprovado com sucesso. Laboratório MWS notificado.`,
    })
  }

  const handleCreateCase = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newPatientName.trim()) return

    const newCase: ClinicalCase = {
      id: `CAS-2026-00${cases.length + 1}`,
      patientName: newPatientName,
      protocol: newProtocol,
      stage: 'aguardando_analise_tecnica',
      slaDeadline: '06/03/2026',
      submissionDate: new Date().toLocaleDateString('pt-BR'),
      notes: newNotes,
      labFeedback:
        'Caso recebido com sucesso na esteira do laboratório MWS. Em breve o técnico responsável anexará a nota técnica de planejamento.',
      mentorClinicalNote: 'Nota clínica do mentor será adicionada durante a análise do caso.',
      currentStep: 'Na fila de triagem técnica inicial',
    }

    setCases((prev) => [newCase, ...prev])
    setIsDialogOpen(false)
    setNewPatientName('')
    setNewNotes('')
    setNewProtocol('Classe I')
    toast({
      title: 'Caso clínico criado!',
      description: `Caso de ${newPatientName} enviado ao Laboratório MWS (${newProtocol}).`,
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

  // 4 caixas de métricas oficiais
  const countAguardandoAnalise = cases.filter(
    (c) => c.stage === 'aguardando_analise_tecnica',
  ).length
  const countEmAnalise = cases.filter((c) => c.stage === 'em_analise_tecnica').length
  const countAguardandoAprovacao = cases.filter((c) => c.stage === 'planejamento_elaborado').length
  const countPlanejamentosEntregues = cases.filter(
    (c) => c.stage === 'planejamento_entregue',
  ).length

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-6xl mx-auto animate-fade-in-up">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
            Casos Clínicos & Integração Laboratório
          </h1>
          <p className="text-slate-500 mt-1">
            Acompanhe o fluxo bidirecional de análise do caso, planejamento lingual MWS e retorno do
            laboratório para o ortodontista.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link to="/dentist/chat-lab">
            <Button variant="outline" className="border-slate-300">
              <MessageSquare className="h-4 w-4 mr-2 text-blue-600" /> Falar com o Laboratório
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
                <DialogTitle>Abertura de Caso Clínico pelo Ortodontista</DialogTitle>
                <DialogDescription>
                  Envie os dados do caso clínico e anote sua avaliação inicial para a esteira do
                  Laboratório MWS.
                </DialogDescription>
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
                    onChange={(e) => setNewProtocol(e.target.value as MWSProtocol)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                  >
                    {MWS_PROTOCOLS.map((protocol) => (
                      <option key={protocol} value={protocol}>
                        {protocol}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="case-notes">
                    Nota Clínica do Ortodontista (Abertura do Caso & Queixa)
                  </Label>
                  <Input
                    id="case-notes"
                    value={newNotes}
                    onChange={(e) => setNewNotes(e.target.value)}
                    placeholder="Ex: Alinhamento lingual anterior e retração com ancoragem lingual MWS"
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

      {/* 4 Caixas de Métricas no Topo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-slate-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-600 line-clamp-2">
                Casos Aguardando Análise
              </span>
              <Clock className="w-4 h-4 text-slate-500 shrink-0 ml-2" />
            </div>
            <p className="text-2xl font-bold text-slate-900 mt-2">{countAguardandoAnalise}</p>
            <p className="text-[11px] text-slate-500 mt-1 font-medium">
              Na fila de triagem técnica
            </p>
          </CardContent>
        </Card>

        <Card className="border-amber-200 bg-amber-50/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-amber-800 line-clamp-2">
                Casos em Análise
              </span>
              <FlaskConical className="w-4 h-4 text-amber-600 shrink-0 ml-2" />
            </div>
            <p className="text-2xl font-bold text-amber-900 mt-2">{countEmAnalise}</p>
            <p className="text-[11px] text-amber-700 mt-1 font-medium">
              Análise técnica e mentoria
            </p>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-purple-800 line-clamp-2">
                Casos com Planejamento Elaborado — Aguardando Aprovação
              </span>
              <Sparkles className="w-4 h-4 text-purple-600 shrink-0 ml-2" />
            </div>
            <p className="text-2xl font-bold text-purple-900 mt-2">{countAguardandoAprovacao}</p>
            <p className="text-[11px] text-purple-700 mt-1 font-medium">Aguardando sua aprovação</p>
          </CardContent>
        </Card>

        <Card className="border-emerald-200 bg-emerald-50/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-emerald-800 line-clamp-2">
                Casos com Planejamentos já Entregues
              </span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 ml-2" />
            </div>
            <p className="text-2xl font-bold text-emerald-900 mt-2">
              {countPlanejamentosEntregues}
            </p>
            <p className="text-[11px] text-emerald-700 mt-1 font-medium">Concluídos e liberados</p>
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
            variant={stageFilter === 'aguardando_analise_tecnica' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setStageFilter('aguardando_analise_tecnica')}
            className="text-xs"
          >
            Aguardando Análise ({countAguardandoAnalise})
          </Button>
          <Button
            variant={stageFilter === 'em_analise_tecnica' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setStageFilter('em_analise_tecnica')}
            className="text-xs"
          >
            Em Análise ({countEmAnalise})
          </Button>
          <Button
            variant={stageFilter === 'planejamento_elaborado' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setStageFilter('planejamento_elaborado')}
            className={
              stageFilter === 'planejamento_elaborado'
                ? 'bg-purple-600 hover:bg-purple-700 text-xs'
                : 'text-xs'
            }
          >
            Aguardando Aprovação ({countAguardandoAprovacao})
          </Button>
          <Button
            variant={stageFilter === 'planejamento_entregue' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setStageFilter('planejamento_entregue')}
            className={
              stageFilter === 'planejamento_entregue'
                ? 'bg-emerald-600 hover:bg-emerald-700 text-xs'
                : 'text-xs'
            }
          >
            Entregues ({countPlanejamentosEntregues})
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
                    <p className="text-sm font-medium text-emerald-700">
                      Protocolo MWS: {c.protocol}
                    </p>
                    <p className="text-xs text-slate-500">
                      Enviado pelo Ortodontista em: {c.submissionDate} • Prazo SLA Estimado:{' '}
                      <strong className="text-slate-700">{c.slaDeadline}</strong>
                    </p>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-center flex-wrap">
                    {c.stage === 'planejamento_elaborado' && (
                      <Button
                        size="sm"
                        className="bg-purple-600 hover:bg-purple-700 text-white shadow-sm"
                        onClick={() => handleApproveCase(c)}
                      >
                        <CheckCircle2 className="w-4 h-4 mr-1.5" /> Aprovar Planejamento
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs"
                      onClick={() => handleOpenDetail(c)}
                    >
                      <Eye className="w-3.5 h-3.5 mr-1 text-slate-500" /> Detalhe do Caso
                    </Button>
                    <Link
                      to={`/dentist/chat-lab?caseId=${encodeURIComponent(c.id)}&patient=${encodeURIComponent(c.patientName)}`}
                    >
                      <Button variant="outline" size="sm" className="text-xs">
                        <MessageSquare className="w-3.5 h-3.5 mr-1 text-blue-600" /> Falar com
                        Laboratório
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Box de Retorno / Interação do Laboratório & Mentoria */}
                {/* Sequência Cronológica de Notas: (a) Ortodontista -> (b) Lab -> (c) Mentor */}
                <div className="rounded-lg bg-slate-50 border border-slate-200/80 p-3.5 space-y-2.5">
                  <div className="flex items-center justify-between text-xs font-medium text-slate-700">
                    <span className="flex items-center gap-1.5 text-blue-700">
                      <FlaskConical className="w-4 h-4 text-blue-600" />
                      Status no Laboratório MWS:
                      <strong className="text-slate-900 font-semibold">{c.currentStep}</strong>
                    </span>
                    <span className="text-[11px] text-slate-500 font-normal">
                      Fluxo bidirecional: Ortodontista ↔ Laboratório
                    </span>
                  </div>

                  {/* (a) Nota clínica do ortodontista (abertura) */}
                  {c.notes && (
                    <div className="text-xs text-slate-700 bg-slate-100/80 p-2.5 rounded border border-slate-200/60 space-y-0.5">
                      <div className="flex items-center gap-1.5 font-semibold text-slate-800 text-[11px]">
                        <span>📌</span>
                        <span>1. Nota clínica do ortodontista (abertura):</span>
                      </div>
                      <p className="text-slate-600 text-[11px] leading-relaxed pl-5">{c.notes}</p>
                    </div>
                  )}

                  {/* (b) Nota técnica do laboratório (planejamento) - Somente leitura */}
                  {c.labFeedback && (
                    <div className="text-xs text-slate-700 bg-white p-2.5 rounded border border-blue-100 shadow-xs space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="flex items-center gap-1.5 font-semibold text-slate-800 text-[11px]">
                          💬 2. Nota técnica do laboratório (planejamento):
                        </span>
                        <span className="text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded flex items-center gap-1">
                          <Lock className="w-2.5 h-2.5" /> Leitura
                        </span>
                      </div>
                      <p className="text-slate-600 leading-relaxed text-xs">{c.labFeedback}</p>
                    </div>
                  )}

                  {/* (c) Recomendação do mentor */}
                  {c.mentorClinicalNote && (
                    <div className="text-xs text-purple-900 bg-purple-50/70 border border-purple-100 p-2.5 rounded leading-relaxed space-y-0.5">
                      <div className="flex items-center gap-1.5 font-semibold text-purple-950 text-[11px]">
                        <span>🧑‍⚕️</span>
                        <span>3. Recomendação do mentor:</span>
                      </div>
                      <p className="text-purple-900/90 text-[11px] leading-relaxed pl-5">
                        {c.mentorClinicalNote}
                      </p>
                    </div>
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

      {/* Modal de Detalhe do Caso (Item 3, 4 e 5) */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          {selectedCase && (
            <div className="space-y-6">
              <DialogHeader>
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      {selectedCase.id}
                    </span>
                    <DialogTitle className="text-xl font-bold text-slate-900">
                      Caso: {selectedCase.patientName}
                    </DialogTitle>
                  </div>
                  <Badge
                    variant="outline"
                    className={`font-semibold ${stageConfig[selectedCase.stage].badgeClass}`}
                  >
                    {stageConfig[selectedCase.stage].label}
                  </Badge>
                </div>
                <DialogDescription className="text-slate-500 text-xs">
                  Acompanhamento clínico e cronologia de notas técnicas do caso lingual MWS.
                </DialogDescription>
              </DialogHeader>

              {/* Informações Gerais do Caso */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200/80 text-xs">
                <div>
                  <span className="text-slate-500 block text-[11px]">Protocolo MWS</span>
                  <span className="font-semibold text-slate-900">{selectedCase.protocol}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">Envio Ortodontista</span>
                  <span className="font-semibold text-slate-900">
                    {selectedCase.submissionDate}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">Prazo SLA Lab</span>
                  <span className="font-semibold text-slate-900">{selectedCase.slaDeadline}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">Status Esteira</span>
                  <span className="font-semibold text-blue-700 truncate block">
                    {selectedCase.currentStep || 'Em processamento'}
                  </span>
                </div>
              </div>

              {/* Sequência Cronológica das Notas Técnicas:
                  (a) Nota clínica do ortodontista (abertura)
                  (b) Nota técnica do laboratório (planejamento)
                  (c) Recomendação do mentor */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-emerald-600" />
                    Cronologia das Notas Técnicas do Caso
                  </h4>
                  <span className="text-[11px] text-slate-500">Sequência lógica cronológica</span>
                </div>

                {/* (a) Nota clínica do ortodontista (abertura) */}
                <div className="p-3.5 rounded-lg border border-slate-200 bg-white space-y-1.5 shadow-2xs">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900 flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold flex items-center justify-center">
                        A
                      </span>
                      (a) Nota clínica do ortodontista (abertura)
                    </span>
                    <Badge
                      variant="outline"
                      className="text-[10px] text-emerald-700 border-emerald-200 bg-emerald-50"
                    >
                      Ortodontista Responsável
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-2.5 rounded border border-slate-100">
                    {selectedCase.notes || 'Nenhuma nota clínica cadastrada na abertura.'}
                  </p>
                </div>

                {/* (b) Nota técnica do laboratório (planejamento) - SOMENTE LEITURA */}
                <div className="p-3.5 rounded-lg border border-blue-200 bg-blue-50/30 space-y-2 shadow-2xs">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-blue-950 flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 text-[11px] font-bold flex items-center justify-center">
                        B
                      </span>
                      (b) Nota técnica do laboratório (planejamento)
                    </span>
                    <Badge
                      variant="outline"
                      className="text-[10px] text-blue-700 border-blue-200 bg-blue-50 flex items-center gap-1"
                    >
                      <Lock className="w-3 h-3" /> Somente Leitura
                    </Badge>
                  </div>

                  {/* Texto de apresentação (somente leitura, sem textarea/editor) */}
                  <div className="text-xs text-slate-800 leading-relaxed bg-white p-3 rounded border border-blue-100">
                    {selectedCase.labFeedback || 'Aguardando parecer do técnico do laboratório.'}
                  </div>

                  {/* Informação explícita de que a edição ocorre no local de cadastro (Laboratório) */}
                  <div className="flex items-start gap-2 p-2.5 rounded bg-amber-50 border border-amber-200 text-[11px] text-amber-900">
                    <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-semibold text-amber-950">Aviso informativo:</strong> A
                      edição da nota técnica do laboratório ocorre exclusivamente no local onde ela
                      é cadastrada (módulo do Laboratório / esteira técnica de planejamento), não
                      neste detalhe do caso do ortodontista.
                    </div>
                  </div>
                </div>

                {/* (c) Recomendação do mentor */}
                <div className="p-3.5 rounded-lg border border-purple-200 bg-purple-50/40 space-y-1.5 shadow-2xs">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-purple-950 flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-800 text-[11px] font-bold flex items-center justify-center">
                        C
                      </span>
                      (c) Recomendação do mentor
                    </span>
                    <Badge
                      variant="outline"
                      className="text-[10px] text-purple-700 border-purple-200 bg-purple-50"
                    >
                      Mentoria Clínica MWS
                    </Badge>
                  </div>
                  <p className="text-xs text-purple-950 leading-relaxed bg-white p-2.5 rounded border border-purple-100">
                    {selectedCase.mentorClinicalNote ||
                      'Aguardando recomendação do mentor designado.'}
                  </p>
                </div>
              </div>

              {/* Botões de Ação Contextualizados no Rodapé do Modal */}
              <div className="pt-2 border-t border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <Link
                  to={`/dentist/chat-lab?caseId=${encodeURIComponent(selectedCase.id)}&patient=${encodeURIComponent(selectedCase.patientName)}`}
                  onClick={() => setIsDetailOpen(false)}
                >
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto text-xs border-blue-300 text-blue-700 hover:bg-blue-50"
                  >
                    <MessageSquare className="w-4 h-4 mr-1.5 text-blue-600" />
                    Falar com Laboratório sobre {selectedCase.patientName}
                  </Button>
                </Link>

                <div className="flex items-center gap-2">
                  {selectedCase.stage === 'planejamento_elaborado' && (
                    <Button
                      size="sm"
                      className="bg-purple-600 hover:bg-purple-700 text-white"
                      onClick={() => handleApproveCase(selectedCase)}
                    >
                      <CheckCircle2 className="w-4 h-4 mr-1.5" /> Aprovar Planejamento
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs"
                    onClick={() => setIsDetailOpen(false)}
                  >
                    Fechar
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
