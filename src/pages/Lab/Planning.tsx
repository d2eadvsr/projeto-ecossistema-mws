import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
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
  Sparkles,
  CheckCircle2,
  Clock,
  Search,
  Filter,
  UserCheck,
  MessageSquare,
  Edit3,
  ThumbsUp,
  AlertCircle,
  FileText,
  Send,
  Layers,
  Calendar,
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { LabClinicalCase, MOCK_LAB_CASES, MOCK_LAB_TEAM } from './mockData'

export default function LabPlanning() {
  // Lista dos casos em "Planejamento Elaborado" (14) e "Planejamento Entregue" (10) = 24 casos
  const [cases, setCases] = useState<LabClinicalCase[]>(
    MOCK_LAB_CASES.filter(
      (c) => c.status === 'Planejamento Elaborado' || c.status === 'Planejamento Entregue',
    ),
  )

  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<
    'all' | 'Planejamento Elaborado' | 'Planejamento Entregue'
  >('all')
  const [mentorFilter, setMentorFilter] = useState<string>('all')

  // Modal para editar Notas do Mentor & Registrar Devolutiva do Ortodontista
  const [selectedCase, setSelectedCase] = useState<LabClinicalCase | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [mentorNotes, setMentorNotes] = useState('')
  const [techNotes, setTechNotes] = useState('')
  const [dentistFeedback, setDentistFeedback] = useState<
    'pendente' | 'aprovado' | 'ajustes_solicitados'
  >('pendente')
  const [dentistFeedbackNotes, setDentistFeedbackNotes] = useState('')

  const { toast } = useToast()

  const mentorsList = MOCK_LAB_TEAM.filter((m) => m.role === 'Planejador & Mentor')

  const filteredCases = cases.filter((c) => {
    const matchesSearch =
      c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.dentistName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.mentorAssigned.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === 'all' || c.status === statusFilter
    const matchesMentor = mentorFilter === 'all' || c.mentorAssigned === mentorFilter

    return matchesSearch && matchesStatus && matchesMentor
  })

  const countElaborado = cases.filter((c) => c.status === 'Planejamento Elaborado').length
  const countEntregue = cases.filter((c) => c.status === 'Planejamento Entregue').length

  const handleOpenEdit = (c: LabClinicalCase) => {
    setSelectedCase(c)
    setMentorNotes(c.mentorClinicalNotes || '')
    setTechNotes(c.technicianNotes || '')
    setDentistFeedback(c.dentistFeedbackStatus || 'pendente')
    setDentistFeedbackNotes(c.dentistFeedbackNotes || '')
    setIsModalOpen(true)
  }

  const handleSaveMentorship = () => {
    if (!selectedCase) return

    setCases((prev) =>
      prev.map((c) => {
        if (c.id !== selectedCase.id) return c
        const newStatus =
          dentistFeedback === 'aprovado' && c.status === 'Planejamento Elaborado'
            ? 'Planejamento Entregue'
            : c.status

        return {
          ...c,
          status: newStatus,
          mentorClinicalNotes: mentorNotes,
          technicianNotes: techNotes,
          dentistFeedbackStatus: dentistFeedback,
          dentistFeedbackNotes: dentistFeedbackNotes,
          feedbackDate:
            dentistFeedback !== 'pendente' && !c.feedbackDate
              ? new Date().toLocaleDateString('pt-BR')
              : c.feedbackDate,
        }
      }),
    )

    toast({
      title: 'Planejamento & Mentoria Atualizados!',
      description: `Notas do mentor e devolutiva do ortodontista registradas para o caso ${selectedCase.id}.`,
    })

    setIsModalOpen(false)
  }

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto animate-fade-in-up">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
            Planejamento & Mentoria Clínica MWS
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">
            Acompanhamento dos casos com planejamento elaborado e entregue ao ortodontista
            demandante.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="text-xs bg-purple-50 text-purple-800 border-purple-200 py-1 px-3 font-semibold"
          >
            Elaborados: {countElaborado}
          </Badge>
          <Badge
            variant="outline"
            className="text-xs bg-emerald-50 text-emerald-800 border-emerald-200 py-1 px-3 font-semibold"
          >
            Entregues: {countEntregue}
          </Badge>
        </div>
      </div>

      {/* Caixa Regra de Negócio: Mentor do Caso */}
      <div className="p-4 rounded-xl border border-purple-200 bg-purple-50/50 flex items-start gap-3 text-xs text-purple-950">
        <Sparkles className="w-5 h-5 text-purple-700 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold text-sm">
            Regra do Ecossistema MWS — Responsável pelo Planejamento é o Mentor:
          </p>
          <p className="text-purple-900 leading-relaxed">
            A partir da entrega do planejamento técnico ao ortodontista demandante, o planejador
            sênior do laboratório passa a ser formalmente o <strong>MENTOR clínico</strong> daquele
            caso durante toda a condução ortodôntica. Todas as notas clínicas e dobras robóticas são
            chanceladas por ele.
          </p>
        </div>
      </div>

      {/* Filtros e Busca */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Buscar por código, paciente, ortodontista ou mentor..."
            className="pl-9 h-9 text-xs"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap text-xs">
          <Button
            variant={statusFilter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setStatusFilter('all')}
            className={
              statusFilter === 'all' ? 'bg-slate-900 text-white text-xs h-7' : 'text-xs h-7'
            }
          >
            Todos ({cases.length})
          </Button>
          <Button
            variant={statusFilter === 'Planejamento Elaborado' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setStatusFilter('Planejamento Elaborado')}
            className={
              statusFilter === 'Planejamento Elaborado'
                ? 'bg-purple-700 text-white text-xs h-7'
                : 'text-xs h-7 text-purple-700'
            }
          >
            Elaborados ({countElaborado})
          </Button>
          <Button
            variant={statusFilter === 'Planejamento Entregue' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setStatusFilter('Planejamento Entregue')}
            className={
              statusFilter === 'Planejamento Entregue'
                ? 'bg-emerald-700 text-white text-xs h-7'
                : 'text-xs h-7 text-emerald-700'
            }
          >
            Entregues ({countEntregue})
          </Button>
        </div>
      </div>

      {/* Lista de Casos com Mentoria */}
      <div className="grid gap-4">
        {filteredCases.map((c) => (
          <Card
            key={c.id}
            className="border-slate-200 shadow-xs hover:border-slate-300 transition-all bg-white"
          >
            <CardContent className="p-5 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                      {c.id}
                    </span>
                    <h3 className="font-bold text-base text-slate-900">{c.patientName}</h3>
                    <Badge
                      variant="outline"
                      className="text-xs bg-emerald-50 text-emerald-800 border-emerald-300"
                    >
                      {c.protocol}
                    </Badge>
                    {c.status === 'Planejamento Elaborado' ? (
                      <Badge className="bg-purple-100 text-purple-800 border-purple-300">
                        Planejamento Elaborado
                      </Badge>
                    ) : (
                      <Badge className="bg-emerald-100 text-emerald-800 border-emerald-300">
                        Planejamento Entregue
                      </Badge>
                    )}
                  </div>

                  <p className="text-xs text-slate-600">
                    <strong>Ortodontista Demandante:</strong> {c.dentistName} ({c.dentistCity} •{' '}
                    {c.dentistCro})
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    className="bg-slate-900 hover:bg-emerald-700 text-white text-xs h-8"
                    onClick={() => handleOpenEdit(c)}
                  >
                    <Edit3 className="w-3.5 h-3.5 mr-1" /> Editar Notas & Devolutiva
                  </Button>
                </div>
              </div>

              {/* Informações da Mentoria e Devolutiva do Ortodontista */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs pt-2 border-t border-slate-100">
                <div className="p-3 bg-purple-50/50 rounded-lg border border-purple-100 space-y-1">
                  <span className="text-purple-700 font-bold block text-[11px] flex items-center gap-1">
                    <UserCheck className="w-3.5 h-3.5" /> Mentor do Caso:
                  </span>
                  <p className="font-semibold text-slate-900">{c.mentorAssigned}</p>
                  <p className="text-[11px] text-slate-500">Técnico Lab: {c.technicianAssigned}</p>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80 space-y-1">
                  <span className="text-slate-500 font-bold block text-[11px] flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5 text-emerald-600" /> Prescrição de Fios MWS:
                  </span>
                  <p className="font-medium text-slate-800 line-clamp-1">{c.wireType}</p>
                  <p className="text-[11px] text-slate-500 line-clamp-1">{c.wireGauges}</p>
                </div>

                <div className="p-3 rounded-lg border space-y-1 bg-white">
                  <span className="text-slate-500 font-bold block text-[11px] flex items-center gap-1">
                    <MessageSquare className="w-3.5 h-3.5 text-blue-600" /> Retorno do Ortodontista:
                  </span>
                  {c.dentistFeedbackStatus === 'aprovado' ? (
                    <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
                      <ThumbsUp className="w-3.5 h-3.5" /> Planejamento Aprovado (
                      {c.feedbackDate || 'Concluído'})
                    </div>
                  ) : c.dentistFeedbackStatus === 'ajustes_solicitados' ? (
                    <div className="flex items-center gap-1.5 text-amber-700 font-bold">
                      <AlertCircle className="w-3.5 h-3.5" /> Ajustes Solicitados
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-slate-500 font-medium">
                      <Clock className="w-3.5 h-3.5" /> Aguardando Avaliação do Dentista
                    </div>
                  )}
                  {c.dentistFeedbackNotes && (
                    <p className="text-[11px] text-slate-600 line-clamp-1 italic">
                      "{c.dentistFeedbackNotes}"
                    </p>
                  )}
                </div>
              </div>

              {/* Caixas de Texto com as Notas do Técnico e do Mentor */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-1">
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="font-bold text-slate-700 block text-[11px] mb-1">
                    Nota do Técnico Lab (Orientações de Execução):
                  </span>
                  <p className="text-slate-600 leading-relaxed text-[11px]">
                    {c.technicianNotes || 'Nenhuma nota técnica registrada ainda.'}
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-emerald-50/40 border border-emerald-200">
                  <span className="font-bold text-emerald-900 block text-[11px] mb-1">
                    Nota Clínica do seu Mentor (Orientações Clínicas):
                  </span>
                  <p className="text-emerald-950 leading-relaxed text-[11px]">
                    {c.mentorClinicalNotes || 'Nenhuma nota clínica do mentor registrada ainda.'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal para Editar Notas do Mentor e Devolutiva */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-base font-bold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-600" />
              Gestão de Mentoria & Devolutiva do Ortodontista
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-500">
              Caso: {selectedCase?.id} • Paciente: {selectedCase?.patientName} • Ortodontista:{' '}
              {selectedCase?.dentistName}
            </DialogDescription>
          </DialogHeader>

          {selectedCase && (
            <div className="space-y-4 pt-2 text-xs">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                <p>
                  <strong>Mentor Oficial do Caso:</strong> {selectedCase.mentorAssigned}
                </p>
                <p>
                  <strong>Protocolo MWS:</strong> {selectedCase.protocol} •{' '}
                  <strong>Fio Prescrito:</strong> {selectedCase.wireType}
                </p>
              </div>

              {/* Devolutiva do Ortodontista */}
              <div className="space-y-2 p-3 rounded-lg border border-blue-200 bg-blue-50/40">
                <label className="font-bold text-blue-950 text-xs block">
                  Registrar Devolutiva do Ortodontista Demandante:
                </label>
                <div className="flex gap-2 flex-wrap">
                  <button
                    type="button"
                    onClick={() => setDentistFeedback('pendente')}
                    className={`px-3 py-1.5 rounded text-xs font-semibold border ${
                      dentistFeedback === 'pendente'
                        ? 'bg-slate-800 text-white border-slate-800'
                        : 'bg-white text-slate-700 border-slate-300'
                    }`}
                  >
                    Pendente de Avaliação
                  </button>
                  <button
                    type="button"
                    onClick={() => setDentistFeedback('aprovado')}
                    className={`px-3 py-1.5 rounded text-xs font-semibold border ${
                      dentistFeedback === 'aprovado'
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'bg-white text-emerald-800 border-emerald-300'
                    }`}
                  >
                    Aprovado pelo Ortodontista (Liberar Fios)
                  </button>
                  <button
                    type="button"
                    onClick={() => setDentistFeedback('ajustes_solicitados')}
                    className={`px-3 py-1.5 rounded text-xs font-semibold border ${
                      dentistFeedback === 'ajustes_solicitados'
                        ? 'bg-amber-600 text-white border-amber-600'
                        : 'bg-white text-amber-800 border-amber-300'
                    }`}
                  >
                    Ajustes Solicitados
                  </button>
                </div>

                <Textarea
                  placeholder="Observações da devolutiva do ortodontista (ex: solicitou platô menor, aprovou sem ressalvas, etc.)..."
                  value={dentistFeedbackNotes}
                  onChange={(e) => setDentistFeedbackNotes(e.target.value)}
                  className="text-xs min-h-[60px] bg-white border-blue-200 mt-2"
                />
              </div>

              {/* Edição da Nota Clínica do Mentor */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-800 text-xs block">
                  Nota Clínica do seu Mentor (Informações Complementares):
                </label>
                <Textarea
                  value={mentorNotes}
                  onChange={(e) => setMentorNotes(e.target.value)}
                  placeholder="Orientações clínicas adicionais, protocolo de ancoragem lingual, sequência sugerida..."
                  className="text-xs min-h-[90px]"
                />
              </div>

              {/* Edição da Nota do Técnico Lab */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-800 text-xs block">
                  Nota do Técnico Lab (Orientações de Execução):
                </label>
                <Textarea
                  value={techNotes}
                  onChange={(e) => setTechNotes(e.target.value)}
                  placeholder="Orientações laboratoriais, parâmetros de dobras robóticas, detalhes do guia de colagem indireta..."
                  className="text-xs min-h-[90px]"
                />
              </div>

              <DialogFooter className="pt-2">
                <Button variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>
                  Cancelar
                </Button>
                <Button
                  size="sm"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                  onClick={handleSaveMentorship}
                >
                  <Send className="w-3.5 h-3.5 mr-1" /> Salvar Alterações
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
