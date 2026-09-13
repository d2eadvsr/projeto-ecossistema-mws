import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Trophy,
  Award,
  Sparkles,
  Gift,
  Share2,
  Copy,
  Check,
  CheckCircle2,
  Clock,
  CalendarPlus,
  MessageSquareHeart,
  UserCheck,
  Camera,
  Info,
  Shield,
  Medal,
  Crown,
  ChevronRight,
  TrendingUp,
  Zap,
  ExternalLink,
  Table as TableIcon,
  Layers,
  ArrowUpRight,
  Flame,
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'
import { getActivePatientId, setActivePatientId } from './surveyData'
import { MOCK_PATIENTS_LIST } from './Dashboard'
import {
  REWARDS_TIERS,
  POINT_ACTIONS_CATALOG,
  loadPatientPoints,
  savePatientPoints,
  getTierProgress,
  getFastestActionsToNextTier,
  PatientPointsProfile,
  PointsCategory,
  PointEarningAction,
} from './pointsData'

export default function PatientPoints() {
  const [selectedPatientId, setSelectedPatientId] = useState<string>(getActivePatientId)
  const [pointsProfile, setPointsProfile] = useState<PatientPointsProfile>(() =>
    loadPatientPoints(getActivePatientId()),
  )
  const [isCopied, setIsCopied] = useState(false)
  const [isPointsTableOpen, setIsPointsTableOpen] = useState(false)
  const [isTiersTableOpen, setIsTiersTableOpen] = useState(false)
  const [activeCategoryTab, setActiveCategoryTab] = useState<
    'todas' | 'rotina' | 'engajamento' | 'indicacao'
  >('todas')
  const { toast } = useToast()

  // Listener para sincronização caso mude de paciente em outra aba/tela
  useEffect(() => {
    const handlePatientChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ patientId: string }>
      const newId = customEvent.detail?.patientId || getActivePatientId()
      setSelectedPatientId(newId)
      setPointsProfile(loadPatientPoints(newId))
    }

    const handlePointsUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<{ patientId: string }>
      if (!customEvent.detail || customEvent.detail.patientId === selectedPatientId) {
        setPointsProfile(loadPatientPoints(selectedPatientId))
      }
    }

    window.addEventListener('mws-patient-changed', handlePatientChange)
    window.addEventListener('mws-points-updated', handlePointsUpdate)
    return () => {
      window.removeEventListener('mws-patient-changed', handlePatientChange)
      window.removeEventListener('mws-points-updated', handlePointsUpdate)
    }
  }, [selectedPatientId])

  const handleSelectPatient = (id: string) => {
    setSelectedPatientId(id)
    setActivePatientId(id)
    setPointsProfile(loadPatientPoints(id))
  }

  const currentPatient =
    MOCK_PATIENTS_LIST.find((p) => p.id === selectedPatientId) || MOCK_PATIENTS_LIST[0]

  const tierProgress = getTierProgress(pointsProfile.totalPoints)
  const currentTier = tierProgress.currentTier
  const nextTier = tierProgress.nextTier
  const pointsNeeded = tierProgress.pointsNeeded
  const progressPercent = tierProgress.progressPercent
  const fastestActions = getFastestActionsToNextTier(pointsNeeded)

  // Gerar link de indicação exclusivo
  const appBaseUrl = window.location.origin
  const referralLink = `${appBaseUrl}/signup?ref=${pointsProfile.referralCode}`
  const whatsappMessage = encodeURIComponent(
    `Oi! Conheça o tratamento Magic Wire (fio lingual invisível que fica atrás dos dentes). Cadastre-se pelo meu link de indicação oficial: ${referralLink}`,
  )
  const whatsappUrl = `https://wa.me/?text=${whatsappMessage}`

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink)
    setIsCopied(true)
    toast({
      title: 'Link copiado com sucesso!',
      description: 'Envie para seus amigos e acompanhe o crédito dos seus 500 pontos por adesão.',
    })
    setTimeout(() => setIsCopied(false), 2500)
  }

  const handleOpenWhatsApp = () => {
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
  }

  // Simulação interativa: paciente pode executar uma ação de rotina no app e ver os pontos subindo na hora
  const handleSimulateAction = (action: PointEarningAction) => {
    if (action.timing === 'externo') {
      toast({
        title: 'Ação externa pendente',
        description:
          'Esta ação depende de o amigo convidado instalar o aplicativo e finalizar o cadastro para pontuar.',
      })
      return
    }

    const newTotal = pointsProfile.totalPoints + action.points
    const newHistoryItem = {
      id: `pts-${Date.now()}`,
      title: action.title,
      actionType: action.id,
      points: action.points,
      date: new Date().toLocaleDateString('pt-BR'),
      status: 'creditado' as const,
      timing: 'imediato' as const,
      note: 'Pontuação creditada de imediato pelo app',
    }

    const updatedProfile: PatientPointsProfile = {
      ...pointsProfile,
      totalPoints: newTotal,
      history: [newHistoryItem, ...pointsProfile.history],
    }

    setPointsProfile(updatedProfile)
    savePatientPoints(updatedProfile)

    toast({
      title: `+${action.points} pontos creditados imediatamente!`,
      description: `Ação "${action.title}" concluída no app. Sua nova pontuação é ${newTotal.toLocaleString('pt-BR')} pontos.`,
    })
  }

  // Helper de ícone por nome
  const renderActionIcon = (iconName: string) => {
    switch (iconName) {
      case 'CalendarPlus':
        return <CalendarPlus className="w-5 h-5 text-emerald-600" />
      case 'CheckCircle2':
        return <CheckCircle2 className="w-5 h-5 text-emerald-600" />
      case 'Clock':
        return <Clock className="w-5 h-5 text-emerald-600" />
      case 'MessageSquareHeart':
        return <MessageSquareHeart className="w-5 h-5 text-emerald-600" />
      case 'UserCheck':
        return <UserCheck className="w-5 h-5 text-emerald-600" />
      case 'Camera':
        return <Camera className="w-5 h-5 text-emerald-600" />
      case 'Gift':
        return <Gift className="w-5 h-5 text-purple-600" />
      default:
        return <Sparkles className="w-5 h-5 text-emerald-600" />
    }
  }

  const renderTierIcon = (tierId: string, className = 'w-5 h-5') => {
    switch (tierId) {
      case 'bronze':
        return <Shield className={className} />
      case 'prata':
        return <Medal className={className} />
      case 'ouro':
        return <Trophy className={className} />
      case 'platina':
        return <Award className={className} />
      case 'diamante':
        return <Crown className={className} />
      default:
        return <Trophy className={className} />
    }
  }

  const filteredCatalog = POINT_ACTIONS_CATALOG.filter((action) => {
    if (activeCategoryTab === 'todas') return true
    return action.category === activeCategoryTab
  })

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-5xl mx-auto animate-fade-in-up pb-16">
      {/* 0. Top Bar com Seletor de Paciente Mock (coerência com o resto do app) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
              Programa de Pontos
            </h1>
            <Badge className="bg-emerald-100 text-emerald-800 border-emerald-300 font-semibold text-xs">
              Clube Fidelidade Magic Wire
            </Badge>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Acumule pontos em cada etapa do seu tratamento com fio lingual invisível e desbloqueie
            benefícios exclusivos.
          </p>
        </div>

        {/* Alternador de demonstração (Maria Eduarda vs Lucas Ferreira) */}
        <div className="flex items-center gap-2 self-start sm:self-center bg-slate-50 border border-slate-200 rounded-lg p-1.5 text-xs">
          <span className="text-slate-500 font-medium px-1">Paciente:</span>
          {MOCK_PATIENTS_LIST.map((pat) => (
            <button
              key={pat.id}
              type="button"
              onClick={() => handleSelectPatient(pat.id)}
              className={cn(
                'px-2.5 py-1 rounded-md font-medium transition-colors text-xs',
                selectedPatientId === pat.id
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white',
              )}
            >
              {pat.name.split(' ')[0]} ({pat.paymentMethod === 'mws' ? 'Fintech' : 'Particular'})
            </button>
          ))}
        </div>
      </div>

      {/* 1) CABEÇALHO / TOPO DA PÁGINA (OBRIGATÓRIO EXIBIR JUNTOS) */}
      <Card className="border-emerald-200 bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-900 text-white shadow-lg overflow-hidden relative">
        {/* Elemento de iluminação estética de fundo */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />

        <CardContent className="p-6 md:p-8 relative z-10 space-y-6">
          {/* Linha superior do topo: Pontuação Atual + Categoria Atual */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
            {/* Bloco da Pontuação Atual */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
                  Sua Pontuação Atual
                </span>
                <span className="text-xs text-slate-400">• Paciente: {currentPatient.name}</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                  {pointsProfile.totalPoints.toLocaleString('pt-BR')}
                </span>
                <span className="text-lg font-medium text-emerald-300">pontos</span>
              </div>
              <p className="text-xs text-slate-300">
                Pontos acumulados durante sua jornada com o fio lingual Magic Wire.
              </p>
            </div>

            {/* Bloco da Categoria Atual + Acesso Rápido às Tabelas */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-xl p-4 flex items-center gap-3.5 min-w-[200px]">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center text-white shadow-md"
                  style={{ backgroundColor: currentTier.accentColor }}
                >
                  {renderTierIcon(currentTier.id, 'w-6 h-6')}
                </div>
                <div>
                  <span className="text-[11px] font-medium text-slate-300 uppercase tracking-wider block">
                    Categoria Atual
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-white">{currentTier.name}</span>
                    <Badge className={cn('text-[10px] px-2 py-0.5', currentTier.badgeColor)}>
                      Nível Ativo
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Botões rápidos para modais explicativos */}
              <div className="flex flex-col gap-2 w-full sm:w-auto">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsTiersTableOpen(true)}
                  className="border-white/20 bg-white/5 hover:bg-white/15 text-white text-xs h-9 justify-start"
                >
                  <Layers className="w-3.5 h-3.5 mr-2 text-emerald-300" />
                  Tabela de Categorias
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsPointsTableOpen(true)}
                  className="border-white/20 bg-white/5 hover:bg-white/15 text-white text-xs h-9 justify-start"
                >
                  <TableIcon className="w-3.5 h-3.5 mr-2 text-emerald-300" />
                  Tabela de Pontuação
                </Button>
              </div>
            </div>
          </div>

          {/* Barra de Progresso até a Próxima Categoria */}
          <div className="space-y-3 bg-white/5 border border-white/10 rounded-xl p-4 md:p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-300" />
                {nextTier ? (
                  <span className="text-white font-medium">
                    Faltam{' '}
                    <strong className="text-emerald-300 font-bold">
                      {pointsNeeded.toLocaleString('pt-BR')} pontos
                    </strong>{' '}
                    para atingir a categoria{' '}
                    <strong className="text-amber-300 font-bold">{nextTier.name}</strong> (
                    {nextTier.minPoints.toLocaleString('pt-BR')} pts)
                  </span>
                ) : (
                  <span className="text-emerald-300 font-bold flex items-center gap-1.5">
                    <Crown className="w-4 h-4 text-amber-300" />
                    Parabéns! Você alcançou o nível máximo do programa: Diamante!
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <span>{currentTier.name}</span>
                <span className="text-white font-semibold">{progressPercent}%</span>
                <span>{nextTier ? nextTier.name : 'Máximo'}</span>
              </div>
            </div>

            {/* Barra Visual */}
            <div className="relative w-full bg-slate-800/80 rounded-full h-3.5 overflow-hidden border border-white/10 p-0.5">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-400 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${Math.max(5, progressPercent)}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span>
                Mínimo desta categoria: {currentTier.minPoints.toLocaleString('pt-BR')} pts
              </span>
              {nextTier && (
                <span>
                  Alvo da próxima categoria: {nextTier.minPoints.toLocaleString('pt-BR')} pts
                </span>
              )}
            </div>
          </div>

          {/* Principais Ações Rápidas para Atingir a Próxima Categoria */}
          {nextTier && (
            <div className="space-y-2.5 pt-1">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-semibold text-emerald-200 uppercase tracking-wide">
                  Principais ações para subir para {nextTier.name} mais rápido:
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {fastestActions.map((action) => (
                  <div
                    key={action.id}
                    className="bg-white/10 hover:bg-white/15 transition-colors border border-white/10 rounded-lg p-3 flex flex-col justify-between gap-2"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xs font-semibold text-white line-clamp-1">
                        {action.title}
                      </span>
                      <Badge className="bg-emerald-400 text-slate-950 font-extrabold text-xs shrink-0">
                        +{action.points}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-300">
                      <span>
                        {action.timing === 'imediato' ? 'Pontua no app' : 'Ao cadastrar amigo'}
                      </span>
                      <span className="text-emerald-300 font-medium flex items-center gap-0.5">
                        {action.timing === 'imediato' ? 'Imediato' : 'Externo'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 3) AÇÃO DE INDICAÇÃO (CONVITE DE AMIGOS) — EM DESTAQUE COM COPIAR E WHATSAPP */}
      <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50/70 via-white to-pink-50/40 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-200/30 rounded-full blur-3xl pointer-events-none" />

        <CardHeader className="pb-3 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-md">
                <Gift className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <CardTitle className="text-lg md:text-xl font-bold text-purple-950">
                    Indicação Magic Wire: Convide Amigos
                  </CardTitle>
                  <Badge className="bg-purple-600 text-white text-xs font-bold">
                    +500 Pontos por Indicação
                  </Badge>
                </div>
                <CardDescription className="text-xs text-purple-900/80 mt-0.5">
                  Compartilhe seu link exclusivo e ganhe a maior pontuação do programa.
                </CardDescription>
              </div>
            </div>

            <Badge
              variant="outline"
              className="border-purple-300 bg-purple-100 text-purple-900 font-semibold text-xs px-3 py-1 self-start sm:self-center"
            >
              Código:{' '}
              <strong className="ml-1 text-purple-950 font-mono">
                {pointsProfile.referralCode}
              </strong>
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 relative z-10 pt-1">
          {/* Caixa de input com botões de ação rápida */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 bg-white p-2.5 rounded-xl border border-purple-200 shadow-xs">
            <div className="flex-1 px-3 py-2 bg-slate-50 rounded-lg text-xs font-mono text-slate-700 truncate border border-slate-200 select-all">
              {referralLink}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Button
                variant={isCopied ? 'default' : 'outline'}
                onClick={handleCopyLink}
                className={cn(
                  'text-xs h-10 px-4 font-semibold transition-all',
                  isCopied
                    ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                    : 'border-purple-300 text-purple-900 hover:bg-purple-50',
                )}
              >
                {isCopied ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Copiado!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2 text-purple-600" />
                    Copiar Link
                  </>
                )}
              </Button>

              <Button
                onClick={handleOpenWhatsApp}
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs h-10 px-4 font-semibold shadow-xs"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Compartilhar via WhatsApp
              </Button>
            </div>
          </div>

          {/* Destaque explicativo sobre a mecânica de pontuação externa vs imediata */}
          <div className="rounded-xl bg-purple-100/60 border border-purple-200/80 p-3.5 flex items-start gap-3 text-xs leading-relaxed text-purple-950">
            <Info className="w-5 h-5 text-purple-700 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold text-purple-950">
                Como funciona o crédito dos +500 pontos da indicação:
              </p>
              <p className="text-purple-900/90 text-[11px]">
                A pessoa convidada instala o app e cria a conta a partir do seu link. Conforme o
                sistema operacional (iOS ou Android), a instalação é identificada pela inteligência
                do programa Magic Wire. A partir daí você recebe os <strong>+500 pontos</strong>{' '}
                automaticamente.
              </p>
              <div className="pt-1 flex items-center gap-2 text-[11px] font-medium text-amber-900 bg-amber-50/80 border border-amber-200 rounded-md p-2 mt-1">
                <span className="font-bold uppercase tracking-wider text-[10px] bg-amber-200 text-amber-900 px-1.5 py-0.5 rounded">
                  Atenção
                </span>
                <span>
                  Diferente das ações de rotina no app (que geram pontos de forma{' '}
                  <strong>imediata</strong>), a indicação é uma ação que depende de{' '}
                  <strong>informação externa</strong> ao app (o amigo precisa efetivamente se
                  cadastrar para a pontuação ser confirmada).
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 2) LISTA DE AÇÕES QUE GERAM PONTOS DENTRO DO APP (IMEDIATAS) */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg md:text-xl font-bold text-slate-900">
                Ações que Geram Pontos
              </h2>
              <Badge className="bg-emerald-100 text-emerald-800 text-xs font-semibold">
                Pontuação Imediata no App
              </Badge>
            </div>
            <p className="text-xs text-slate-500">
              Ações realizadas no próprio app geram pontos de forma <strong>imediata</strong> na sua
              conta.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsPointsTableOpen(true)}
              className="text-xs border-slate-300 text-slate-700 hover:bg-slate-100"
            >
              <TableIcon className="w-3.5 h-3.5 mr-1.5 text-emerald-600" />
              Ver Tabela Completa
            </Button>
          </div>
        </div>

        {/* Grid de Ações */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {POINT_ACTIONS_CATALOG.filter((a) => a.timing === 'imediato').map((action) => (
            <Card
              key={action.id}
              className="border-slate-200 hover:border-emerald-300 hover:shadow-sm transition-all flex flex-col justify-between"
            >
              <CardContent className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0">
                      {renderActionIcon(action.icon)}
                    </div>
                    <Badge className="bg-emerald-600 text-white font-extrabold text-xs">
                      +{action.points} pts
                    </Badge>
                  </div>

                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                      {action.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 leading-relaxed mt-1">
                      {action.description}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold">
                    <Zap className="w-3.5 h-3.5 text-emerald-600" />
                    Crédito Imediato
                  </span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleSimulateAction(action)}
                    className="h-7 px-2 text-[11px] text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50 font-semibold"
                  >
                    Simular (+{action.points})
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* 4) HISTÓRICO DE PONTUAÇÃO RECENTE (DAR VIDA À TELA) */}
      <Card className="border-slate-200">
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-600" />
                Histórico Recente de Pontos
              </CardTitle>
              <CardDescription className="text-xs text-slate-500">
                Últimas ações pontuadas no seu perfil do aplicativo.
              </CardDescription>
            </div>
            <span className="text-xs text-slate-500">
              Total de registros: <strong>{pointsProfile.history.length}</strong>
            </span>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="divide-y divide-slate-100">
            {pointsProfile.history.slice(0, 6).map((item) => (
              <div
                key={item.id}
                className="p-3.5 px-4 sm:px-6 flex items-center justify-between gap-3 hover:bg-slate-50/70 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      'w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold',
                      item.timing === 'imediato'
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-purple-100 text-purple-700',
                    )}
                  >
                    {item.timing === 'imediato' ? (
                      <Zap className="w-4 h-4" />
                    ) : (
                      <Gift className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-slate-900">{item.title}</p>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                      <span>{item.date}</span>
                      <span>•</span>
                      <span className="text-emerald-700 font-medium">
                        {item.timing === 'imediato' ? 'Imediato no app' : 'Indicação validada'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-sm font-bold text-emerald-700">+{item.points} pts</span>
                  <Badge
                    variant="outline"
                    className="block text-[9px] border-emerald-300 bg-emerald-50 text-emerald-800 font-medium mt-0.5"
                  >
                    Creditado
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* BLOCO DE AJUDA E REGRAS: DOIS BOTÕES / MODAIS DE MELHOR ENTENDIMENTO */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Bloco 1: Tabela de Pontuação */}
        <Card
          onClick={() => setIsPointsTableOpen(true)}
          className="border-slate-200 hover:border-emerald-300 cursor-pointer hover:shadow-sm transition-all group"
        >
          <CardContent className="p-5 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <TableIcon className="w-5 h-5" />
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                  Tabela Completa de Pontuação
                </h3>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-colors" />
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Consulte todos os valores em pontos gerados por cada ação do paciente no app e na
                clínica.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Bloco 2: Tabela de Categorias */}
        <Card
          onClick={() => setIsTiersTableOpen(true)}
          className="border-slate-200 hover:border-amber-300 cursor-pointer hover:shadow-sm transition-all group"
        >
          <CardContent className="p-5 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 group-hover:bg-amber-500 group-hover:text-white transition-colors">
              <Layers className="w-5 h-5" />
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                  Tabela de Categorias do Programa
                </h3>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 transition-colors" />
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Veja as 5 categorias de parceria (Bronze a Diamante), faixas de pontuação e seus
                benefícios.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ======================================================== */}
      {/* MODAL (A): TABELA DE PONTUAÇÃO                          */}
      {/* ======================================================== */}
      <Dialog open={isPointsTableOpen} onOpenChange={setIsPointsTableOpen}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <TableIcon className="w-4 h-4" />
              </div>
              <div>
                <DialogTitle className="text-lg font-bold text-slate-900">
                  Tabela de Pontuação por Ação
                </DialogTitle>
                <DialogDescription className="text-xs text-slate-500">
                  Regras e valores em pontos gerados por cada uma das ações contempladas no
                  programa.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-4 pt-2">
            {/* Tabs para filtrar catálogo dentro do modal */}
            <Tabs
              value={activeCategoryTab}
              onValueChange={(v) => setActiveCategoryTab(v as any)}
              className="w-full"
            >
              <TabsList className="grid grid-cols-4 w-full text-xs">
                <TabsTrigger value="todas">Todas</TabsTrigger>
                <TabsTrigger value="rotina">Rotina</TabsTrigger>
                <TabsTrigger value="engajamento">Engajamento</TabsTrigger>
                <TabsTrigger value="indicacao">Indicação</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="border border-slate-200 rounded-lg overflow-hidden divide-y divide-slate-100">
              {filteredCatalog.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 flex items-start justify-between gap-3 hover:bg-slate-50/80 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 mt-0.5">
                      {renderActionIcon(item.icon)}
                    </div>
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs sm:text-sm font-bold text-slate-900">
                          {item.title}
                        </span>
                        <Badge
                          variant="outline"
                          className={cn(
                            'text-[9px] px-1.5 py-0',
                            item.timing === 'imediato'
                              ? 'border-emerald-300 text-emerald-800 bg-emerald-50'
                              : 'border-purple-300 text-purple-800 bg-purple-50',
                          )}
                        >
                          {item.timing === 'imediato' ? 'Imediato no App' : 'Externo (Cadastro)'}
                        </Badge>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 text-right">
                    <span className="text-sm font-extrabold text-emerald-700">+{item.points}</span>
                    <span className="block text-[10px] text-slate-400">pontos</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Aviso explicativo */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs text-slate-600 flex items-start gap-2.5">
              <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <p className="text-[11px] leading-relaxed">
                As ações de consulta e engajamento são registradas e creditadas de forma{' '}
                <strong>imediata</strong> no momento da conclusão no app. As indicações de amigos
                dependem de identificação automática no momento em que o amigo instala e conclui a
                criação da conta.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* ======================================================== */}
      {/* MODAL (B): TABELA DE CATEGORIAS                         */}
      {/* ======================================================== */}
      <Dialog open={isTiersTableOpen} onOpenChange={setIsTiersTableOpen}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <DialogTitle className="text-lg font-bold text-slate-900">
                  Tabela de Categorias de Parceria
                </DialogTitle>
                <DialogDescription className="text-xs text-slate-500">
                  Critérios de pontuação necessária para ingressar em cada categoria e seus
                  benefícios.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-3 pt-2">
            {REWARDS_TIERS.map((tier) => {
              const isUserCurrentTier = tier.id === currentTier.id
              return (
                <div
                  key={tier.id}
                  className={cn(
                    'border rounded-xl p-4 transition-all relative overflow-hidden',
                    isUserCurrentTier
                      ? 'border-emerald-400 bg-emerald-50/50 ring-2 ring-emerald-500/20'
                      : 'border-slate-200 bg-white hover:border-slate-300',
                  )}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2.5 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center text-white shadow-xs"
                        style={{ backgroundColor: tier.accentColor }}
                      >
                        {renderTierIcon(tier.id, 'w-5 h-5')}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-slate-900">{tier.name}</h4>
                          {isUserCurrentTier && (
                            <Badge className="bg-emerald-600 text-white text-[10px] font-bold">
                              Sua Categoria Atual
                            </Badge>
                          )}
                        </div>
                        <span className="text-[11px] text-slate-500">
                          {tier.maxPoints
                            ? `De ${tier.minPoints.toLocaleString('pt-BR')} até ${tier.maxPoints.toLocaleString('pt-BR')} pontos`
                            : `A partir de ${tier.minPoints.toLocaleString('pt-BR')} pontos`}
                        </span>
                      </div>
                    </div>

                    <div className="text-left sm:text-right">
                      <span className="text-xs font-bold text-slate-800 block">
                        {tier.minPoints === 0
                          ? 'Entrada livre'
                          : `${tier.minPoints.toLocaleString('pt-BR')} pts necessários`}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2.5 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                      Vantagens & Benefícios:
                    </span>
                    <ul className="space-y-1">
                      {tier.benefits.map((b, idx) => (
                        <li
                          key={idx}
                          className="text-[11px] text-slate-600 flex items-center gap-2"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )
            })}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
