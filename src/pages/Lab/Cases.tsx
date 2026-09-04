import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  Search,
  Filter,
  Clock,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  AlertTriangle,
  Play,
  Check,
  Send,
  Eye,
  Activity,
  Layers,
  Calendar,
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { LabCaseStatus, LabClinicalCase, MOCK_LAB_CASES, MOCK_LAB_TEAM } from './mockData'

const STATUS_COLUMNS: {
  status: LabCaseStatus
  label: string
  bg: string
  border: string
  badgeBg: string
  badgeText: string
  nextAction?: {
    nextStatus: LabCaseStatus
    buttonLabel: string
    icon: typeof Play
  }
}[] = [
  {
    status: 'Aguardando Análise Técnica',
    label: 'Aguardando Análise Técnica',
    bg: 'bg-slate-50/70',
    border: 'border-slate-200',
    badgeBg: 'bg-slate-100',
    badgeText: 'text-slate-800',
    nextAction: {
      nextStatus: 'Em Análise Técnica',
      buttonLabel: 'Iniciar Análise Técnica',
      icon: Play,
    },
  },
  {
    status: 'Em Análise Técnica',
    label: 'Em Análise Técnica',
    bg: 'bg-amber-50/40',
    border: 'border-amber-200',
    badgeBg: 'bg-amber-100',
    badgeText: 'text-amber-800',
    nextAction: {
      nextStatus: 'Planejamento Elaborado',
      buttonLabel: 'Concluir Planejamento',
      icon: Sparkles,
    },
  },
  {
    status: 'Planejamento Elaborado',
    label: 'Planejamento Elaborado',
    bg: 'bg-purple-50/40',
    border: 'border-purple-200',
    badgeBg: 'bg-purple-100',
    badgeText: 'text-purple-800',
    nextAction: {
      nextStatus: 'Planejamento Entregue',
      buttonLabel: 'Entregar Planejamento ao Ortodontista',
      icon: Send,
    },
  },
  {
    status: 'Planejamento Entregue',
    label: 'Planejamento Entregue',
    bg: 'bg-emerald-50/40',
    border: 'border-emerald-200',
    badgeBg: 'bg-emerald-100',
    badgeText: 'text-emerald-800',
  },
]

export default function LabCases() {
  const [cases, setCases] = useState<LabClinicalCase[]>(MOCK_LAB_CASES)
  const [searchTerm, setSearchTerm] = useState('')
  const [protocolFilter, setProtocolFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban')

  // Modal de Detalhe e Edição Técnica do Caso
  const [selectedCase, setSelectedCase] = useState<LabClinicalCase | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [editTechNotes, setEditTechNotes] = useState('')
  const [editMentorNotes, setEditMentorNotes] = useState('')
  const [selectedMentor, setSelectedMentor] = useState('')
  const [selectedTechnician, setSelectedTechnician] = useState('')

  const { toast } = useToast()

  const mentorsList = MOCK_LAB_TEAM.filter((m) => m.role === 'Planejador & Mentor')
  const techList = MOCK_LAB_TEAM.filter(
    (m) => m.role === 'Técnico Especialista' || m.role === 'Especialista em Robótica',
  )

  // Filtragem dos casos
  const filteredCases = cases.filter((c) => {
    const matchesSearch =
      c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.dentistName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.dentistCity.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.protocol.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesProtocol = protocolFilter === 'all' || c.protocol === protocolFilter
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter

    return matchesSearch && matchesProtocol && matchesStatus
  })

  // Mover caso de etapa
  const handleAdvanceStatus = (caseId: string, newStatus: LabCaseStatus) => {
    setCases((prev) =>
      prev.map((c) => {
        if (c.id !== caseId) return c
        const updatedMentor =
          newStatus === 'Planejamento Entregue' &&
          c.mentorAssigned === 'Fila de Distribuição de Mentoria'
            ? 'Prof. Dr. Marcelo Carvalho'
            : c.mentorAssigned
        return {
          ...c,
          status: newStatus,
          mentorAssigned: updatedMentor,
        }
      }),
    )

    toast({
      title: 'Esteira Atualizada!',
      description: `O caso ${caseId} avançou para "${newStatus}".`,
    })

    if (selectedCase && selectedCase.id === caseId) {
      setSelectedCase((prev) => (prev ? { ...prev, status: newStatus } : null))
    }
  }

  // Abrir Modal de Detalhe
  const handleOpenDetail = (c: LabClinicalCase) => {
    setSelectedCase(c)
    setEditTechNotes(c.technicianNotes || '')
    setEditMentorNotes(c.mentorClinicalNotes || '')
    setSelectedMentor(c.mentorAssigned)
    setSelectedTechnician(c.technicianAssigned)
    setIsDetailOpen(true)
  }

  // Salvar Notas do Técnico e do Mentor
  const handleSaveNotes = () => {
    if (!selectedCase) return

    setCases((prev) =>
      prev.map((c) =>
        c.id === selectedCase.id
          ? {
              ...c,
              technicianNotes: editTechNotes,
              mentorClinicalNotes: editMentorNotes,
              mentorAssigned: selectedMentor || c.mentorAssigned,
              technicianAssigned: selectedTechnician || c.technicianAssigned,
            }
          : c,
      ),
    )

    toast({
      title: 'Notas e Planejamento Salvos!',
      description: `Orientações técnicas e notas clínicas salvas para o caso ${selectedCase.id}.`,
    })

    setIsDetailOpen(false)
  }

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto animate-fade-in-up">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
            Fila de Casos / Esteira Técnica MWS
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">
            Fluxo oficial de 4 status: Aguardando Análise → Em Análise → Planejamento Elaborado →
            Planejamento Entregue.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-slate-100 p-1 rounded-lg border border-slate-200 flex items-center text-xs">
            <button
              onClick={() => setViewMode('kanban')}
              className={`px-3 py-1 rounded font-medium transition-all ${
                viewMode === 'kanban'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Visão Kanban
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1 rounded font-medium transition-all ${
                viewMode === 'list'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Visão Tabela ({filteredCases.length})
            </button>
          </div>
        </div>
      </div>

      {/* Barra de Filtros e Busca */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Buscar por código (CAS-2026-...), paciente, dentista, cidade..."
            className="pl-9 h-9 text-xs"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap text-xs">
          <span className="text-slate-400 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Protocolo:
          </span>
          {['all', 'Classe I', 'Classe II', 'Classe III', 'Classe IV', 'Classe V'].map((p) => (
            <Button
              key={p}
              variant={protocolFilter === p ? 'default' : 'outline'}
              size="sm"
              onClick={() => setProtocolFilter(p)}
              className={
                protocolFilter === p
                  ? 'bg-slate-900 text-white text-xs h-7 px-2.5'
                  : 'text-xs h-7 px-2.5 text-slate-600'
              }
            >
              {p === 'all' ? 'Todos Protocolos' : p}
            </Button>
          ))}
        </div>
      </div>

      {/* Visão KANBAN (4 Colunas Oficiais MWS) */}
      {viewMode === 'kanban' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 items-start">
          {STATUS_COLUMNS.map((col) => {
            const colCases = filteredCases.filter((c) => c.status === col.status)
            return (
              <div
                key={col.status}
                className={`rounded-xl border ${col.border} ${col.bg} p-3.5 flex flex-col min-h-[550px] shadow-xs`}
              >
                {/* Cabeçalho da Coluna */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-200/60 mb-3">
                  <div>
                    <h3 className="font-bold text-xs text-slate-900 leading-tight">{col.label}</h3>
                  </div>
                  <Badge
                    variant="outline"
                    className={`${col.badgeBg} ${col.badgeText} text-xs font-bold`}
                  >
                    {colCases.length}
                  </Badge>
                </div>

                {/* Lista de Cartões da Coluna */}
                <div className="space-y-3 flex-1 overflow-y-auto max-h-[calc(100vh-280px)] pr-1">
                  {colCases.map((c) => (
                    <Card
                      key={c.id}
                      className="border-slate-200 shadow-xs hover:shadow-md transition-all bg-white cursor-pointer group"
                      onClick={() => handleOpenDetail(c)}
                    >
                      <CardContent className="p-3.5 space-y-2.5">
                        {/* Topo do Cartão: Código + SLA */}
                        <div className="flex items-center justify-between gap-1">
                          <span className="font-mono text-[11px] font-bold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded">
                            {c.id}
                          </span>
                          {c.slaStatus === 'estourado' ? (
                            <Badge className="bg-red-600 text-white text-[10px] px-1.5 py-0 flex items-center gap-1">
                              <AlertTriangle className="w-2.5 h-2.5" /> SLA Atrasado
                            </Badge>
                          ) : c.slaStatus === 'alerta' ? (
                            <Badge className="bg-amber-500 text-white text-[10px] px-1.5 py-0">
                              SLA: {c.slaHoursLeft}h
                            </Badge>
                          ) : (
                            <span className="text-[10px] text-slate-500 font-medium">
                              SLA: {c.slaDeadline}
                            </span>
                          )}
                        </div>

                        {/* Paciente e Protocolo */}
                        <div>
                          <h4 className="font-bold text-xs text-slate-900 group-hover:text-emerald-700 transition-colors">
                            {c.patientName} ({c.patientAge} anos)
                          </h4>
                          <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                            <strong>Dentista:</strong> {c.dentistName}
                          </p>
                          <p className="text-[10px] text-slate-400">{c.dentistCity}</p>
                        </div>

                        {/* Badges de Protocolo e Fio */}
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <Badge
                            variant="outline"
                            className="text-[10px] font-semibold bg-emerald-50 text-emerald-800 border-emerald-300"
                          >
                            {c.protocol}
                          </Badge>
                          <span className="text-[10px] text-slate-500 truncate max-w-[140px]">
                            {c.wireType}
                          </span>
                        </div>

                        {/* Mentor Atribuído */}
                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
                          <span className="truncate max-w-[130px]">
                            <strong>Mentor:</strong> {c.mentorAssigned}
                          </span>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-6 px-1.5 text-[10px] text-slate-600 hover:text-emerald-700"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleOpenDetail(c)
                            }}
                          >
                            <Eye className="w-3 h-3 mr-1" /> Ver Detalhes
                          </Button>
                        </div>

                        {/* Ação de Avançar Status */}
                        {col.nextAction && (
                          <Button
                            size="sm"
                            className="w-full h-7 text-[11px] bg-slate-900 hover:bg-emerald-700 text-white mt-1 transition-colors flex items-center justify-center gap-1.5"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleAdvanceStatus(c.id, col.nextAction!.nextStatus)
                            }}
                          >
                            <col.nextAction.icon className="w-3 h-3" />
                            {col.nextAction.buttonLabel}
                          </Button>
                        )}

                        {col.status === 'Planejamento Entregue' && (
                          <div className="w-full text-center py-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 rounded border border-emerald-200 flex items-center justify-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            Entregue • Robô Liberado
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}

                  {colCases.length === 0 && (
                    <div className="text-center py-12 text-xs text-slate-400 border border-dashed border-slate-200 rounded-lg">
                      Nenhum caso nesta etapa
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        /* Visão em Tabela */
        <Card className="border-slate-200">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 font-semibold uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="p-3">Código</th>
                    <th className="p-3">Paciente</th>
                    <th className="p-3">Ortodontista Demandante</th>
                    <th className="p-3">Protocolo MWS</th>
                    <th className="p-3">Status Oficial</th>
                    <th className="p-3">Mentor Responsável</th>
                    <th className="p-3">SLA</th>
                    <th className="p-3 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredCases.map((c) => (
                    <tr key={c.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="p-3 font-mono font-bold text-slate-700">{c.id}</td>
                      <td className="p-3 font-medium text-slate-900">
                        {c.patientName} <span className="text-slate-400">({c.patientAge}a)</span>
                      </td>
                      <td className="p-3 text-slate-600">
                        <div className="font-semibold text-slate-800">{c.dentistName}</div>
                        <div className="text-[10px] text-slate-400">{c.dentistCity}</div>
                      </td>
                      <td className="p-3">
                        <Badge
                          variant="outline"
                          className="text-[10px] bg-emerald-50 text-emerald-800 border-emerald-300"
                        >
                          {c.protocol}
                        </Badge>
                      </td>
                      <td className="p-3">
                        <Badge
                          variant="outline"
                          className={
                            c.status === 'Aguardando Análise Técnica'
                              ? 'bg-slate-100 text-slate-800 border-slate-300'
                              : c.status === 'Em Análise Técnica'
                                ? 'bg-amber-100 text-amber-800 border-amber-300'
                                : c.status === 'Planejamento Elaborado'
                                  ? 'bg-purple-100 text-purple-800 border-purple-300'
                                  : 'bg-emerald-100 text-emerald-800 border-emerald-300'
                          }
                        >
                          {c.status}
                        </Badge>
                      </td>
                      <td className="p-3 text-slate-700 font-medium">{c.mentorAssigned}</td>
                      <td className="p-3">
                        {c.slaStatus === 'estourado' ? (
                          <span className="text-red-600 font-bold flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3" /> Atrasado (
                            {Math.abs(c.slaHoursLeft)}h)
                          </span>
                        ) : c.slaStatus === 'alerta' ? (
                          <span className="text-amber-700 font-semibold">
                            {c.slaHoursLeft}h restantes
                          </span>
                        ) : (
                          <span className="text-slate-500">{c.slaDeadline}</span>
                        )}
                      </td>
                      <td className="p-3 text-right">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 text-xs"
                          onClick={() => handleOpenDetail(c)}
                        >
                          <Eye className="w-3.5 h-3.5 mr-1" /> Detalhes
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Modal / Painel de Detalhes Técnicos e Clínicos do Caso */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center justify-between pr-6">
              <div>
                <DialogTitle className="text-lg font-bold flex items-center gap-2">
                  <span className="font-mono text-emerald-700">{selectedCase?.id}</span>
                  <span>• {selectedCase?.patientName}</span>
                </DialogTitle>
                <DialogDescription className="text-xs text-slate-500">
                  Abertura de Caso Clínico MWS • Ortodontista: {selectedCase?.dentistName} (
                  {selectedCase?.dentistCro})
                </DialogDescription>
              </div>
              <Badge
                variant="outline"
                className="text-xs font-bold bg-emerald-50 text-emerald-800 border-emerald-300"
              >
                {selectedCase?.protocol}
              </Badge>
            </div>
          </DialogHeader>

          {selectedCase && (
            <div className="space-y-4 pt-2 text-xs">
              {/* Barra de Status e Transição Rápida */}
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-slate-500 block text-[11px]">Status Atual na Esteira:</span>
                  <span className="font-bold text-slate-900 text-sm">{selectedCase.status}</span>
                </div>

                <div className="flex items-center gap-2">
                  {selectedCase.status === 'Aguardando Análise Técnica' && (
                    <Button
                      size="sm"
                      className="bg-amber-600 hover:bg-amber-700 text-white text-xs h-8"
                      onClick={() => handleAdvanceStatus(selectedCase.id, 'Em Análise Técnica')}
                    >
                      <Play className="w-3.5 h-3.5 mr-1" /> Iniciar Análise Técnica
                    </Button>
                  )}
                  {selectedCase.status === 'Em Análise Técnica' && (
                    <Button
                      size="sm"
                      className="bg-purple-600 hover:bg-purple-700 text-white text-xs h-8"
                      onClick={() => handleAdvanceStatus(selectedCase.id, 'Planejamento Elaborado')}
                    >
                      <Sparkles className="w-3.5 h-3.5 mr-1" /> Concluir Planejamento
                    </Button>
                  )}
                  {selectedCase.status === 'Planejamento Elaborado' && (
                    <Button
                      size="sm"
                      className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs h-8"
                      onClick={() => handleAdvanceStatus(selectedCase.id, 'Planejamento Entregue')}
                    >
                      <Send className="w-3.5 h-3.5 mr-1" /> Entregar Planejamento ao Ortodontista
                    </Button>
                  )}
                  {selectedCase.status === 'Planejamento Entregue' && (
                    <Badge className="bg-emerald-100 text-emerald-800 border-emerald-300 py-1.5 px-3">
                      <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" /> Planejamento Entregue e
                      Liberado
                    </Badge>
                  )}
                </div>
              </div>

              {/* Seção 1: Observações Clínicas & Queixa Principal (Enviada pelo Ortodontista) */}
              <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/40 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-blue-950 flex items-center gap-1.5 text-xs">
                    <Calendar className="w-3.5 h-3.5 text-blue-700" />
                    Observações Clínicas & Queixa Principal (Enviada pelo Ortodontista)
                  </h4>
                  <span className="text-[10px] text-blue-800">
                    Submetido em: {selectedCase.submissionDate}
                  </span>
                </div>
                <div className="space-y-1.5 text-slate-800">
                  <p>
                    <strong>Queixa Principal:</strong> {selectedCase.chiefComplaint}
                  </p>
                  <p>
                    <strong>Observações Clínicas do Ortodontista:</strong>{' '}
                    {selectedCase.clinicalObservations}
                  </p>
                </div>
              </div>

              {/* Seção 2: Especificações Técnicas MWS (Arcos, Fios e Calibres) */}
              <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-3">
                <h4 className="font-bold text-slate-900 flex items-center gap-1.5 text-xs">
                  <Layers className="w-3.5 h-3.5 text-emerald-600" />
                  Especificações Técnicas de Fio Lingual Customizado (MWS 3ª Geração)
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-2.5 rounded bg-slate-50 border border-slate-100 space-y-1">
                    <span className="text-slate-400 block text-[10px]">Arcada Superior:</span>
                    <p className="font-medium text-slate-800">{selectedCase.upperArchDetails}</p>
                  </div>
                  <div className="p-2.5 rounded bg-slate-50 border border-slate-100 space-y-1">
                    <span className="text-slate-400 block text-[10px]">Arcada Inferior:</span>
                    <p className="font-medium text-slate-800">{selectedCase.lowerArchDetails}</p>
                  </div>
                  <div className="p-2.5 rounded bg-slate-50 border border-slate-100 space-y-1">
                    <span className="text-slate-400 block text-[10px]">
                      Tipo de Fio & Liga Robótica:
                    </span>
                    <p className="font-semibold text-emerald-800">{selectedCase.wireType}</p>
                  </div>
                  <div className="p-2.5 rounded bg-slate-50 border border-slate-100 space-y-1">
                    <span className="text-slate-400 block text-[10px]">
                      Calibres de Fio NiTi Copper / TMA:
                    </span>
                    <p className="font-medium text-slate-800">{selectedCase.wireGauges}</p>
                  </div>
                </div>
                <div className="p-2.5 rounded bg-slate-50 border border-slate-100 space-y-1 text-xs">
                  <span className="text-slate-400 block text-[10px]">
                    Stops Linguais, Platôs e Ancoragem:
                  </span>
                  <p className="font-medium text-slate-800">{selectedCase.stopsAndAttachments}</p>
                </div>
              </div>

              {/* Seção 3: Atribuição de Técnico e Mentor Responsável */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-700">
                    Técnico Lab Responsável:
                  </label>
                  <select
                    value={selectedTechnician}
                    onChange={(e) => setSelectedTechnician(e.target.value)}
                    className="w-full h-8 text-xs rounded border border-slate-300 bg-white px-2 focus:ring-1 focus:ring-emerald-500"
                  >
                    <option value="Não atribuído">Não atribuído</option>
                    {techList.map((t) => (
                      <option key={t.id} value={`${t.name} (${t.role})`}>
                        {t.name} - {t.role}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-700">
                    Mentor Responsável pelo Caso:
                  </label>
                  <select
                    value={selectedMentor}
                    onChange={(e) => setSelectedMentor(e.target.value)}
                    className="w-full h-8 text-xs rounded border border-slate-300 bg-white px-2 focus:ring-1 focus:ring-emerald-500"
                  >
                    <option value="Fila de Distribuição de Mentoria">Fila de Distribuição</option>
                    {mentorsList.map((m) => (
                      <option key={m.id} value={m.name}>
                        {m.name} ({m.specialty.substring(0, 32)}...)
                      </option>
                    ))}
                  </select>
                  <span className="text-[10px] text-slate-400 block">
                    * O responsável pelo planejamento passa a ser o MENTOR oficial do caso.
                  </span>
                </div>
              </div>

              {/* Seção 4: Campos Editáveis de Notas do Lab e Mentoria */}
              <div className="space-y-3 pt-1">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-slate-800 flex items-center gap-1.5 text-xs">
                      <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                      Nota do Técnico Lab (Planejamento Elaborado e Orientações de Execução):
                    </label>
                    <span className="text-[10px] text-slate-400">Editável pelo Lab</span>
                  </div>
                  <Textarea
                    placeholder="Descreva as orientações de execução, sequência de arcos linguais, dobras compensatórias de 1ª/2ª/3ª ordem e protocolo de colagem..."
                    value={editTechNotes}
                    onChange={(e) => setEditTechNotes(e.target.value)}
                    className="text-xs min-h-[85px] border-slate-200"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-slate-800 flex items-center gap-1.5 text-xs">
                      <Activity className="w-3.5 h-3.5 text-emerald-600" />
                      Nota Clínica do seu Mentor (Informações Complementares ao Ortodontista):
                    </label>
                    <span className="text-[10px] text-slate-400">Visível ao Ortodontista</span>
                  </div>
                  <Textarea
                    placeholder="Instruções clínicas de acompanhamento, cuidados na primeira ativação, controle de ancoragem e alertas de biomecânica..."
                    value={editMentorNotes}
                    onChange={(e) => setEditMentorNotes(e.target.value)}
                    className="text-xs min-h-[85px] border-slate-200"
                  />
                </div>
              </div>

              <DialogFooter className="pt-2">
                <Button variant="outline" size="sm" onClick={() => setIsDetailOpen(false)}>
                  Fechar
                </Button>
                <Button
                  size="sm"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                  onClick={handleSaveNotes}
                >
                  <Check className="w-3.5 h-3.5 mr-1" /> Salvar Notas e Planejamento
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
