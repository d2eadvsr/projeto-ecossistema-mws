import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  Clock,
  FlaskConical,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Send,
  UserCheck,
  Search,
  Filter,
  Eye,
  Calendar,
  AlertCircle,
  History,
  Layers,
  FileText,
  DollarSign,
  TrendingUp,
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { Link } from 'react-router-dom'
import {
  MentorCase,
  MentorProfile,
  loadMentorCases,
  loadMentors,
  saveMentorCases,
  acceptCaseForAnalysis,
  moveToPlanningStage,
  submitTechnicalPlanning,
  redirectMentorCase,
  loadUnavailablePeriods,
  isMentorUnavailableOnDate,
} from './mockData'

// Contexto do mentor logado (no protótipo: Dr. Breno)
export const CURRENT_MENTOR = {
  id: 'men-breno',
  name: 'Dr. Breno',
  email: 'mentor@magicwire.com',
}

const statusConfig: Record<
  MentorCase['status'],
  { label: string; badgeClass: string; icon: any; borderClass: string }
> = {
  aguardando_analise: {
    label: 'Aguardando Análise',
    badgeClass: 'bg-slate-100 text-slate-800 border-slate-300',
    icon: Clock,
    borderClass: 'border-slate-300',
  },
  em_analise: {
    label: 'Em Análise',
    badgeClass: 'bg-amber-100 text-amber-800 border-amber-300',
    icon: FlaskConical,
    borderClass: 'border-amber-300',
  },
  em_planejamento: {
    label: 'Em Planejamento',
    badgeClass: 'bg-purple-100 text-purple-800 border-purple-300',
    icon: Sparkles,
    borderClass: 'border-purple-300',
  },
  planejamento_entregue: {
    label: 'Planejamento Entregue',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    icon: CheckCircle2,
    borderClass: 'border-emerald-300',
  },
}

export default function MentorDashboard() {
  const [cases, setCases] = useState<MentorCase[]>([])
  const [mentors, setMentors] = useState<MentorProfile[]>([])
  const [filterView, setFilterView] = useState<'all' | 'my_cases'>('all')
  const [searchTerm, setSearchTerm] = useState('')

  // Modal 1: Detalhe do Caso Clínico
  const [selectedCase, setSelectedCase] = useState<MentorCase | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)

  // Modal 2: Elaborar / Registrar Planejamento Técnico
  const [isPlanningModalOpen, setIsPlanningModalOpen] = useState(false)
  const [planNote, setPlanNote] = useState('')
  const [planMaintenances, setPlanMaintenances] = useState<number>(8)
  const [planFee, setPlanFee] = useState<number>(8900)

  // Modal 3: Redirecionamento de Caso (quando sobrecarregado)
  const [isRedirectModalOpen, setIsRedirectModalOpen] = useState(false)
  const [redirectTargetMentorId, setRedirectTargetMentorId] = useState('')
  const [redirectReason, setRedirectReason] = useState('')

  const { toast } = useToast()

  const refreshData = () => {
    setCases(loadMentorCases())
    setMentors(loadMentors())
  }

  useEffect(() => {
    refreshData()
  }, [])

  // Contagens canônicas
  const aguardandoCases = cases.filter((c) => c.status === 'aguardando_analise')
  const emAnaliseCases = cases.filter((c) => c.status === 'em_analise')
  const emPlanejamentoCases = cases.filter((c) => c.status === 'em_planejamento')
  const entregueCases = cases.filter((c) => c.status === 'planejamento_entregue')

  // Ações do fluxo do mentor
  const handleAcceptCase = (c: MentorCase) => {
    const updated = acceptCaseForAnalysis(c.id, {
      id: CURRENT_MENTOR.id,
      name: CURRENT_MENTOR.name,
    })
    if (updated) {
      refreshData()
      if (selectedCase?.id === c.id) setSelectedCase(updated)
      toast({
        title: 'Caso aceito para análise!',
        description: `O caso de ${c.patientName} agora está sob sua responsabilidade técnica.`,
      })
    }
  }

  const handleStartPlanning = (c: MentorCase) => {
    const updated = moveToPlanningStage(c.id)
    if (updated) {
      refreshData()
      if (selectedCase?.id === c.id) setSelectedCase(updated)
      toast({
        title: 'Fase de planejamento iniciada!',
        description: `O caso de ${c.patientName} avançou para a elaboração do diagrama e nota técnica.`,
      })
    }
  }

  const handleOpenPlanningModal = (c: MentorCase) => {
    setSelectedCase(c)
    setPlanNote(
      c.technicalPlanningNote ||
        'Planejamento lingual MWS estruturado com foco na correção biomecânica tridimensional. Fase inicial com arco 0.014 NiTi lingual para alinhamento passivo. Ancoragem lingual contínua com diagrama customizado para preservação do torque anterior.',
    )
    setPlanMaintenances(c.estimatedMaintenances || 8)
    setPlanFee(c.suggestedFee || 8900)
    setIsPlanningModalOpen(true)
  }

  const handleSubmitPlanning = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedCase) return

    const updated = submitTechnicalPlanning(selectedCase.id, {
      technicalPlanningNote: planNote,
      estimatedMaintenances: Number(planMaintenances),
      suggestedFee: Number(planFee),
      mentorId: CURRENT_MENTOR.id,
      mentorName: CURRENT_MENTOR.name,
    })

    if (updated) {
      refreshData()
      setSelectedCase(updated)
      setIsPlanningModalOpen(false)
      toast({
        title: 'Planejamento entregue ao ortodontista!',
        description: `O caso de ${selectedCase.patientName} foi devolvido ao ortodontista com a nota técnica, ${planMaintenances} manutenções sugeridas e valor sugerido de R$ ${planFee.toLocaleString('pt-BR')}.`,
      })
    }
  }

  const handleOpenRedirectModal = (c: MentorCase) => {
    setSelectedCase(c)
    // Seleciona o primeiro mentor que não seja o mentor atual
    const periods = loadUnavailablePeriods()
    const today = new Date().toISOString().split('T')[0]
    const otherMentors = mentors.filter((m) => m.id !== CURRENT_MENTOR.id && m.status === 'ativo')
    const firstAvailable = otherMentors.find(
      (m) => !isMentorUnavailableOnDate(m.id, today, periods),
    )
    setRedirectTargetMentorId(firstAvailable?.id || otherMentors[0]?.id || '')
    setRedirectReason('')
    setIsRedirectModalOpen(true)
  }

  const handleConfirmRedirect = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedCase || !redirectTargetMentorId || !redirectReason.trim()) return

    const targetMentor = mentors.find((m) => m.id === redirectTargetMentorId)
    if (!targetMentor) return

    const updated = redirectMentorCase(
      selectedCase.id,
      { id: CURRENT_MENTOR.id, name: CURRENT_MENTOR.name },
      { id: targetMentor.id, name: targetMentor.name },
      redirectReason,
    )

    if (updated) {
      refreshData()
      setSelectedCase(updated)
      setIsRedirectModalOpen(false)
      toast({
        title: 'Caso clínico redirecionado com sucesso!',
        description: `O caso de ${selectedCase.patientName} foi transferido para ${targetMentor.name}. Motivo registrado no histórico.`,
      })
    }
  }

  const handleOpenDetail = (c: MentorCase) => {
    setSelectedCase(c)
    setIsDetailOpen(true)
  }

  // Filtragem dos casos exibidos
  const filterBySearch = (list: MentorCase[]) => {
    return list.filter((c) => {
      const matchSearch =
        c.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.dentistName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.protocol.toLowerCase().includes(searchTerm.toLowerCase())
      const matchScope =
        filterView === 'all' ||
        c.assignedMentorId === CURRENT_MENTOR.id ||
        c.preferredMentorId === CURRENT_MENTOR.id
      return matchSearch && matchScope
    })
  }

  const otherAvailableMentors = mentors.filter((m) => m.id !== CURRENT_MENTOR.id)

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto animate-fade-in-up">
      {/* Testeira de Contexto do Perfil Mentor */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
              Portal Web do Mentor • Ecossistema MWS
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 mt-1">
            Dashboard do Mentor
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">
            Bem-vindo, <strong>{CURRENT_MENTOR.name}</strong>. Como mentor clínico, você elabora os
            planejamentos biomecânicos e devolve as orientações aos ortodontistas credenciados.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button asChild variant="outline" size="sm" className="text-xs">
            <Link to="/mentor/disponibilidade">
              <Calendar className="w-3.5 h-3.5 mr-1 text-slate-600" /> Minha Agenda & Bloqueios
            </Link>
          </Button>
          <Button
            asChild
            size="sm"
            className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs"
          >
            <Link to="/mentor/perfil">
              <UserCheck className="w-3.5 h-3.5 mr-1" /> Meu Perfil
            </Link>
          </Button>
        </div>
      </div>

      {/* 4 Caixas de Status Oficiais do Kanban */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Aguardando Análise */}
        <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-600 uppercase tracking-wide">
                1. Aguardando Análise
              </span>
              <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <span className="text-3xl font-extrabold text-slate-900">
                {aguardandoCases.length}
              </span>
              <Badge variant="outline" className="text-[11px] bg-slate-50 text-slate-600">
                Fila Geral Aberta
              </Badge>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Casos recém-abertos que nenhum mentor absorveu ainda
            </p>
          </CardContent>
        </Card>

        {/* 2. Em Análise */}
        <Card className="border-amber-200 bg-amber-50/30 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-amber-800 uppercase tracking-wide">
                2. Em Análise
              </span>
              <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-700">
                <FlaskConical className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <span className="text-3xl font-extrabold text-amber-950">
                {emAnaliseCases.length}
              </span>
              <Badge
                variant="outline"
                className="text-[11px] bg-amber-100 text-amber-800 border-amber-300"
              >
                Sob Avaliação
              </Badge>
            </div>
            <p className="text-xs text-amber-900/80 mt-2">
              Casos aceitos pelo mentor para triagem clínica e STL
            </p>
          </CardContent>
        </Card>

        {/* 3. Em Planejamento */}
        <Card className="border-purple-200 bg-purple-50/30 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-purple-800 uppercase tracking-wide">
                3. Em Planejamento
              </span>
              <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center text-purple-700">
                <Sparkles className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <span className="text-3xl font-extrabold text-purple-950">
                {emPlanejamentoCases.length}
              </span>
              <Badge
                variant="outline"
                className="text-[11px] bg-purple-100 text-purple-800 border-purple-300"
              >
                Elaboração Técnica
              </Badge>
            </div>
            <p className="text-xs text-purple-900/80 mt-2">
              Mentor elaborando nota técnica, manutenções e valor sugerido
            </p>
          </CardContent>
        </Card>

        {/* 4. Planejamento Entregue */}
        <Card className="border-emerald-200 bg-emerald-50/40 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-emerald-800 uppercase tracking-wide">
                4. Planejamento Entregue
              </span>
              <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <span className="text-3xl font-extrabold text-emerald-950">
                {entregueCases.length}
              </span>
              <Badge
                variant="outline"
                className="text-[11px] bg-emerald-100 text-emerald-800 border-emerald-300"
              >
                Devolvido p/ Aprovação
              </Badge>
            </div>
            <p className="text-xs text-emerald-900/80 mt-2">
              Devolvidos ao ortodontista para validação e início do caso
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Barra de Filtros e Busca */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Buscar por paciente, código do caso, ortodontista ou protocolo..."
            className="pl-9 text-xs"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant={filterView === 'all' ? 'default' : 'outline'}
            onClick={() => setFilterView('all')}
            className={filterView === 'all' ? 'bg-slate-900 text-xs' : 'text-xs'}
          >
            Todos os Casos ({cases.length})
          </Button>
          <Button
            size="sm"
            variant={filterView === 'my_cases' ? 'default' : 'outline'}
            onClick={() => setFilterView('my_cases')}
            className={
              filterView === 'my_cases' ? 'bg-emerald-700 hover:bg-emerald-800 text-xs' : 'text-xs'
            }
          >
            Meus Casos ({CURRENT_MENTOR.name})
          </Button>
        </div>
      </div>

      {/* ESTEIRA KANBAN (4 COLUNAS MWS) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* COLUNA 1: Aguardando Análise */}
        <div className="space-y-3">
          <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-100 border border-slate-200">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-600" />
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                Aguardando Análise
              </h3>
            </div>
            <Badge className="bg-slate-200 text-slate-800 text-[11px] font-bold">
              {filterBySearch(aguardandoCases).length}
            </Badge>
          </div>

          <div className="space-y-2.5">
            {filterBySearch(aguardandoCases).map((c) => (
              <Card
                key={c.id}
                className="border-slate-200 hover:border-slate-300 shadow-xs hover:shadow-sm transition-all"
              >
                <CardContent className="p-3.5 space-y-2.5">
                  <div className="flex items-start justify-between gap-1.5">
                    <div>
                      <span className="font-mono text-[10px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                        {c.id}
                      </span>
                      <h4 className="font-bold text-xs text-slate-900 mt-1">{c.patientName}</h4>
                    </div>
                    {c.priority === 'urgente' && (
                      <Badge className="bg-red-50 text-red-700 border border-red-200 text-[10px]">
                        Urgente
                      </Badge>
                    )}
                  </div>

                  <p className="text-[11px] text-emerald-800 font-medium">
                    Protocolo: {c.protocol}
                  </p>
                  <p className="text-[11px] text-slate-500 line-clamp-2">
                    {c.dentistName} ({c.dentistCity})
                  </p>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-1">
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-[11px] h-7 px-2"
                      onClick={() => handleOpenDetail(c)}
                    >
                      <Eye className="w-3 h-3 mr-1" /> Detalhe
                    </Button>
                    <Button
                      size="sm"
                      className="bg-emerald-700 hover:bg-emerald-800 text-white text-[11px] h-7 px-2"
                      onClick={() => handleAcceptCase(c)}
                    >
                      <UserCheck className="w-3 h-3 mr-1" /> Assumir
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            {filterBySearch(aguardandoCases).length === 0 && (
              <div className="text-center py-8 px-3 rounded-lg border border-dashed border-slate-200 text-slate-400 text-xs">
                Nenhum caso aguardando
              </div>
            )}
          </div>
        </div>

        {/* COLUNA 2: Em Análise */}
        <div className="space-y-3">
          <div className="flex items-center justify-between p-2.5 rounded-lg bg-amber-50 border border-amber-200">
            <div className="flex items-center gap-2">
              <FlaskConical className="w-4 h-4 text-amber-700" />
              <h3 className="text-xs font-bold text-amber-900 uppercase tracking-wide">
                Em Análise
              </h3>
            </div>
            <Badge className="bg-amber-100 text-amber-900 border-amber-300 text-[11px] font-bold">
              {filterBySearch(emAnaliseCases).length}
            </Badge>
          </div>

          <div className="space-y-2.5">
            {filterBySearch(emAnaliseCases).map((c) => (
              <Card
                key={c.id}
                className="border-amber-200 bg-amber-50/20 hover:border-amber-300 shadow-xs hover:shadow-sm transition-all"
              >
                <CardContent className="p-3.5 space-y-2.5">
                  <div className="flex items-start justify-between gap-1.5">
                    <div>
                      <span className="font-mono text-[10px] font-bold text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded">
                        {c.id}
                      </span>
                      <h4 className="font-bold text-xs text-slate-900 mt-1">{c.patientName}</h4>
                    </div>
                    <Badge
                      variant="outline"
                      className="text-[10px] text-amber-800 border-amber-300"
                    >
                      {c.assignedMentorName || 'Sem mentor'}
                    </Badge>
                  </div>

                  <p className="text-[11px] text-emerald-800 font-medium">
                    Protocolo: {c.protocol}
                  </p>
                  <p className="text-[11px] text-slate-500 line-clamp-2">{c.clinicalNotes}</p>

                  <div className="pt-2 border-t border-amber-100 flex items-center justify-between gap-1 flex-wrap">
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-[11px] h-7 px-2"
                      onClick={() => handleOpenDetail(c)}
                    >
                      <Eye className="w-3 h-3 mr-1" /> Detalhe
                    </Button>
                    <div className="flex items-center gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-[11px] h-7 px-1.5 text-amber-800 hover:bg-amber-100"
                        title="Redirecionar se estiver sobrecarregado"
                        onClick={() => handleOpenRedirectModal(c)}
                      >
                        Repassar
                      </Button>
                      <Button
                        size="sm"
                        className="bg-purple-700 hover:bg-purple-800 text-white text-[11px] h-7 px-2"
                        onClick={() => handleStartPlanning(c)}
                      >
                        Planejar →
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {filterBySearch(emAnaliseCases).length === 0 && (
              <div className="text-center py-8 px-3 rounded-lg border border-dashed border-amber-200 text-amber-700/60 text-xs">
                Nenhum caso em análise
              </div>
            )}
          </div>
        </div>

        {/* COLUNA 3: Em Planejamento */}
        <div className="space-y-3">
          <div className="flex items-center justify-between p-2.5 rounded-lg bg-purple-50 border border-purple-200">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-700" />
              <h3 className="text-xs font-bold text-purple-900 uppercase tracking-wide">
                Em Planejamento
              </h3>
            </div>
            <Badge className="bg-purple-100 text-purple-900 border-purple-300 text-[11px] font-bold">
              {filterBySearch(emPlanejamentoCases).length}
            </Badge>
          </div>

          <div className="space-y-2.5">
            {filterBySearch(emPlanejamentoCases).map((c) => (
              <Card
                key={c.id}
                className="border-purple-200 bg-purple-50/20 hover:border-purple-300 shadow-xs hover:shadow-sm transition-all"
              >
                <CardContent className="p-3.5 space-y-2.5">
                  <div className="flex items-start justify-between gap-1.5">
                    <div>
                      <span className="font-mono text-[10px] font-bold text-purple-800 bg-purple-100 px-1.5 py-0.5 rounded">
                        {c.id}
                      </span>
                      <h4 className="font-bold text-xs text-slate-900 mt-1">{c.patientName}</h4>
                    </div>
                    <Badge
                      variant="outline"
                      className="text-[10px] text-purple-800 border-purple-300"
                    >
                      {c.assignedMentorName}
                    </Badge>
                  </div>

                  <p className="text-[11px] text-emerald-800 font-medium">
                    Protocolo: {c.protocol}
                  </p>

                  {/* Alerta de histórico de redirecionamento */}
                  {c.redirectionHistory.length > 0 && (
                    <div className="text-[10px] text-amber-800 bg-amber-50 p-1.5 rounded border border-amber-200 flex items-center gap-1">
                      <History className="w-3 h-3 shrink-0" />
                      <span>Redirecionado de {c.redirectionHistory[0].fromMentorName}</span>
                    </div>
                  )}

                  <div className="pt-2 border-t border-purple-100 flex items-center justify-between gap-1">
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-[11px] h-7 px-2"
                      onClick={() => handleOpenDetail(c)}
                    >
                      <Eye className="w-3 h-3 mr-1" /> Detalhe
                    </Button>
                    <div className="flex items-center gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-[11px] h-7 px-1.5 text-purple-800 hover:bg-purple-100"
                        title="Redirecionar se estiver sobrecarregado"
                        onClick={() => handleOpenRedirectModal(c)}
                      >
                        Repassar
                      </Button>
                      <Button
                        size="sm"
                        className="bg-purple-700 hover:bg-purple-800 text-white text-[11px] h-7 px-2"
                        onClick={() => handleOpenPlanningModal(c)}
                      >
                        <FileText className="w-3 h-3 mr-1" /> Elaborar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {filterBySearch(emPlanejamentoCases).length === 0 && (
              <div className="text-center py-8 px-3 rounded-lg border border-dashed border-purple-200 text-purple-700/60 text-xs">
                Nenhum caso em planejamento
              </div>
            )}
          </div>
        </div>

        {/* COLUNA 4: Planejamento Entregue */}
        <div className="space-y-3">
          <div className="flex items-center justify-between p-2.5 rounded-lg bg-emerald-50 border border-emerald-200">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <h3 className="text-xs font-bold text-emerald-900 uppercase tracking-wide">
                Planejamento Entregue
              </h3>
            </div>
            <Badge className="bg-emerald-100 text-emerald-900 border-emerald-300 text-[11px] font-bold">
              {filterBySearch(entregueCases).length}
            </Badge>
          </div>

          <div className="space-y-2.5">
            {filterBySearch(entregueCases).map((c) => (
              <Card
                key={c.id}
                className="border-emerald-200 bg-emerald-50/20 hover:border-emerald-300 shadow-xs hover:shadow-sm transition-all"
              >
                <CardContent className="p-3.5 space-y-2.5">
                  <div className="flex items-start justify-between gap-1.5">
                    <div>
                      <span className="font-mono text-[10px] font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded">
                        {c.id}
                      </span>
                      <h4 className="font-bold text-xs text-slate-900 mt-1">{c.patientName}</h4>
                    </div>
                    <Badge
                      variant="outline"
                      className="text-[10px] text-emerald-800 border-emerald-300"
                    >
                      Entregue
                    </Badge>
                  </div>

                  <p className="text-[11px] text-slate-600">
                    Mentor: <strong>{c.assignedMentorName}</strong>
                  </p>

                  <div className="grid grid-cols-2 gap-1.5 text-[10px] bg-white p-2 rounded border border-emerald-100">
                    <div>
                      <span className="text-slate-400 block">Manutenções</span>
                      <strong className="text-slate-800">
                        {c.estimatedMaintenances || 8} sessões
                      </strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Valor Sugerido</span>
                      <strong className="text-emerald-700">
                        R$ {(c.suggestedFee || 8900).toLocaleString('pt-BR')}
                      </strong>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-emerald-100 flex items-center justify-between">
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-[11px] h-7 w-full border-emerald-200 text-emerald-800 hover:bg-emerald-50"
                      onClick={() => handleOpenDetail(c)}
                    >
                      <Eye className="w-3 h-3 mr-1" /> Ver Detalhe e Planejamento
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            {filterBySearch(entregueCases).length === 0 && (
              <div className="text-center py-8 px-3 rounded-lg border border-dashed border-emerald-200 text-emerald-700/60 text-xs">
                Nenhum planejamento entregue
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MODAL 1: Detalhe Completo do Caso Clínico */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedCase && (
            <div className="space-y-5">
              <DialogHeader>
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                      {selectedCase.id}
                    </span>
                    <DialogTitle className="text-xl font-bold text-slate-900">
                      Caso: {selectedCase.patientName}
                    </DialogTitle>
                  </div>
                  <Badge
                    variant="outline"
                    className={`font-semibold text-xs ${statusConfig[selectedCase.status].badgeClass}`}
                  >
                    {statusConfig[selectedCase.status].label}
                  </Badge>
                </div>
                <DialogDescription className="text-xs text-slate-500">
                  Acompanhamento técnico, histórico de mentoria e planejamento biomecânico do caso.
                </DialogDescription>
              </DialogHeader>

              {/* Informações Gerais */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                <div>
                  <span className="text-slate-400 block text-[11px]">Ortodontista</span>
                  <span className="font-semibold text-slate-900">{selectedCase.dentistName}</span>
                  <span className="text-slate-500 block text-[10px]">
                    {selectedCase.dentistCity}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Protocolo MWS</span>
                  <span className="font-semibold text-emerald-800">{selectedCase.protocol}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Mentor Responsável</span>
                  <span className="font-semibold text-purple-900">
                    {selectedCase.assignedMentorName || 'Não designado'}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Prazo SLA</span>
                  <span className="font-semibold text-slate-800">{selectedCase.slaDeadline}</span>
                </div>
              </div>

              {/* Nota Clínica do Ortodontista na Abertura */}
              <div className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-1 text-xs">
                <span className="font-bold text-slate-800 block flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-slate-500" />
                  Nota Clínica do Ortodontista (Abertura do Caso & Queixa):
                </span>
                <p className="text-slate-700 leading-relaxed bg-slate-50 p-2.5 rounded border border-slate-100">
                  {selectedCase.clinicalNotes}
                </p>
              </div>

              {/* Planejamento Técnico Elaborado pelo Mentor */}
              {selectedCase.technicalPlanningNote && (
                <div className="p-4 rounded-xl border border-purple-200 bg-purple-50/40 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-purple-950 flex items-center gap-1.5 text-sm">
                      <Sparkles className="w-4 h-4 text-purple-700" />
                      Planejamento Técnico Elaborado pelo Mentor ({selectedCase.assignedMentorName})
                    </span>
                    <Badge className="bg-purple-100 text-purple-800 border-purple-300 text-[10px]">
                      Entregue em {selectedCase.plannedDate}
                    </Badge>
                  </div>
                  <p className="text-purple-950 leading-relaxed bg-white p-3 rounded-lg border border-purple-100">
                    {selectedCase.technicalPlanningNote}
                  </p>
                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div className="p-2.5 rounded-lg bg-white border border-purple-100">
                      <span className="text-slate-400 block text-[11px]">
                        Número Estimado de Manutenções:
                      </span>
                      <span className="text-base font-bold text-slate-900">
                        {selectedCase.estimatedMaintenances} manutenções
                      </span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white border border-purple-100">
                      <span className="text-slate-400 block text-[11px]">Valor Sugerido:</span>
                      <span className="text-base font-bold text-emerald-700">
                        R$ {selectedCase.suggestedFee?.toLocaleString('pt-BR')}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Histórico de Redirecionamento de Mentor */}
              <div className="p-3.5 rounded-xl border border-amber-200 bg-amber-50/30 space-y-2 text-xs">
                <span className="font-bold text-amber-950 flex items-center gap-1.5 text-xs">
                  <History className="w-4 h-4 text-amber-700" />
                  Histórico de Redirecionamento de Mentoria:
                </span>
                {selectedCase.redirectionHistory.length === 0 ? (
                  <p className="text-slate-500 text-[11px]">
                    Nenhum redirecionamento registrado. Caso mantido com o mentor designado.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {selectedCase.redirectionHistory.map((log) => (
                      <div
                        key={log.id}
                        className="p-2.5 rounded-lg bg-white border border-amber-200 space-y-1 text-[11px]"
                      >
                        <div className="flex items-center justify-between text-slate-700 font-semibold">
                          <span>
                            De: <strong>{log.fromMentorName}</strong> → Para:{' '}
                            <strong className="text-purple-900">{log.toMentorName}</strong>
                          </span>
                          <span className="text-slate-400 text-[10px]">{log.date}</span>
                        </div>
                        <p className="text-slate-600 bg-amber-50/60 p-2 rounded">
                          <strong>Razão do repasse:</strong> {log.reason}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Rodapé do Modal */}
              <DialogFooter className="gap-2 sm:gap-0 pt-2 border-t border-slate-200">
                <Button variant="outline" size="sm" onClick={() => setIsDetailOpen(false)}>
                  Fechar
                </Button>
                {selectedCase.status !== 'planejamento_entregue' && (
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-amber-300 text-amber-800 hover:bg-amber-50 text-xs"
                      onClick={() => {
                        setIsDetailOpen(false)
                        handleOpenRedirectModal(selectedCase)
                      }}
                    >
                      <History className="w-3.5 h-3.5 mr-1" /> Redirecionar Caso
                    </Button>
                    <Button
                      size="sm"
                      className="bg-purple-700 hover:bg-purple-800 text-white text-xs"
                      onClick={() => {
                        setIsDetailOpen(false)
                        handleOpenPlanningModal(selectedCase)
                      }}
                    >
                      <Sparkles className="w-3.5 h-3.5 mr-1" /> Elaborar Planejamento
                    </Button>
                  </div>
                )}
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* MODAL 2: Elaboração e Registro do Planejamento Técnico pelo Mentor */}
      <Dialog open={isPlanningModalOpen} onOpenChange={setIsPlanningModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Elaborar Planejamento Técnico do Caso</DialogTitle>
            <DialogDescription>
              Como mentor, registre a nota técnica do planejamento, o número estimado de manutenções
              e o valor sugerido antes de devolver ao ortodontista para aprovação.
            </DialogDescription>
          </DialogHeader>

          {selectedCase && (
            <form onSubmit={handleSubmitPlanning} className="space-y-4 pt-2 text-xs">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex justify-between items-center">
                <div>
                  <span className="text-slate-500 block text-[11px]">Paciente:</span>
                  <strong className="text-slate-900 text-sm">{selectedCase.patientName}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">Protocolo:</span>
                  <Badge className="bg-emerald-100 text-emerald-800 border-emerald-300">
                    {selectedCase.protocol}
                  </Badge>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">Ortodontista:</span>
                  <span className="font-semibold text-slate-800">{selectedCase.dentistName}</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="plan-note" className="font-semibold text-slate-800 block">
                  Nota Técnica do Planejamento (Mentor) *
                </label>
                <textarea
                  id="plan-note"
                  rows={4}
                  value={planNote}
                  onChange={(e) => setPlanNote(e.target.value)}
                  required
                  placeholder="Descreva a mecânica lingual MWS, calibres dos fios NiTi Copper, ancoragem, pontos de atenção e sequência clínica..."
                  className="w-full rounded-md border border-input bg-background p-2.5 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label htmlFor="plan-maint" className="font-semibold text-slate-800 block">
                    Número Estimado de Manutenções *
                  </label>
                  <Input
                    id="plan-maint"
                    type="number"
                    min={1}
                    max={36}
                    value={planMaintenances}
                    onChange={(e) => setPlanMaintenances(Number(e.target.value))}
                    required
                    className="h-9 text-xs"
                  />
                  <span className="text-[10px] text-slate-400 block">
                    Estimativa baseada na complexidade lingual do caso
                  </span>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="plan-fee" className="font-semibold text-slate-800 block">
                    Valor Sugerido do Tratamento (R$) *
                  </label>
                  <Input
                    id="plan-fee"
                    type="number"
                    step={100}
                    value={planFee}
                    onChange={(e) => setPlanFee(Number(e.target.value))}
                    required
                    className="h-9 text-xs"
                  />
                  <span className="text-[10px] text-slate-400 block">
                    Sugestão de valor global do tratamento para o ortodontista
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 text-[11px] leading-relaxed">
                <strong>Próximo passo:</strong> Ao confirmar, o caso avança para{' '}
                <strong>Planejamento Entregue</strong> e é devolvido ao ortodontista credenciado
                para que ele aprove e autorize a confecção robótica dos fios mágicos internos.
              </div>

              <DialogFooter className="gap-2 sm:gap-0 pt-2 border-t border-slate-200">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsPlanningModalOpen(false)}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs"
                >
                  <Send className="w-3.5 h-3.5 mr-1" /> Devolver ao Ortodontista para Aprovação
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* MODAL 3: Redirecionamento de Caso (quando sobrecarregado) */}
      <Dialog open={isRedirectModalOpen} onOpenChange={setIsRedirectModalOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Redirecionar Caso Clínico</DialogTitle>
            <DialogDescription>
              Se você estiver sobrecarregado de casos, transfira este caso para outro mentor
              disponível no ecossistema, informando a razão do repasse.
            </DialogDescription>
          </DialogHeader>

          {selectedCase && (
            <form onSubmit={handleConfirmRedirect} className="space-y-4 pt-2 text-xs">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-500">Caso:</span>
                  <strong className="text-slate-900">
                    {selectedCase.id} • {selectedCase.patientName}
                  </strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Mentor Atual:</span>
                  <span className="font-semibold text-slate-800">{CURRENT_MENTOR.name}</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="red-target" className="font-semibold text-slate-800 block">
                  Selecionar Mentor de Destino *
                </label>
                <select
                  id="red-target"
                  value={redirectTargetMentorId}
                  onChange={(e) => setRedirectTargetMentorId(e.target.value)}
                  required
                  className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                >
                  {otherAvailableMentors.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name} ({m.activeCasesCount} casos ativos • {m.location})
                    </option>
                  ))}
                </select>
                <span className="text-[10px] text-slate-400 block">
                  O caso sairá da sua fila e passará imediatamente para a fila do mentor escolhido.
                </span>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="red-reason" className="font-semibold text-slate-800 block">
                  Motivo do Redirecionamento (Razão) *
                </label>
                <textarea
                  id="red-reason"
                  rows={3}
                  value={redirectReason}
                  onChange={(e) => setRedirectReason(e.target.value)}
                  required
                  placeholder="Ex: Sobrecarga temporária de casos simultâneos na esteira e atendimento clínico presencial na semana..."
                  className="w-full rounded-md border border-input bg-background p-2.5 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                />
              </div>

              <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-[11px] leading-relaxed flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <strong>Auditoria MWS:</strong> O histórico de redirecionamento (de quem para
                  quem, data e motivo) ficará registrado de forma transparente no detalhe do caso
                  para acompanhamento do ecossistema.
                </div>
              </div>

              <DialogFooter className="gap-2 sm:gap-0 pt-2 border-t border-slate-200">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsRedirectModalOpen(false)}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="bg-amber-700 hover:bg-amber-800 text-white font-semibold text-xs"
                >
                  <History className="w-3.5 h-3.5 mr-1" /> Confirmar Redirecionamento
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
