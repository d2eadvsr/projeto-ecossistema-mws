import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Activity,
  CheckCircle2,
  Clock,
  FlaskConical,
  Sparkles,
  Info,
  Calendar,
  Layers,
  FileCheck2,
  ChevronRight,
  ShieldCheck,
  Stethoscope,
  Smile,
  AlertCircle,
  HelpCircle,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

interface TreatmentPhase {
  id: number
  name: string
  title: string
  arc: string
  status: 'completed' | 'in_progress' | 'upcoming'
  wireType: string
  wireCaliber: string
  startDate: string
  completedDate?: string
  estimatedDuration: string
  orthodontistNote: string
  labNote?: string
  objectives: string[]
  careTips: string[]
}

const MOCK_TREATMENT_DATA = {
  caseCode: 'CAS-2026-084-MWS',
  protocol: 'Magic Wire Protocolo Lingual Customizado',
  startDate: '12 de Janeiro de 2026',
  estimatedCompletion: 'Novembro de 2026',
  totalPhases: 5,
  currentPhaseIndex: 2, // 0-based: Fase 2 (Instalação e Nivelamento)
  overallProgress: 45,
  orthodontist: {
    name: 'Dra. Aline Costa',
    cro: 'CRO-SP 104.892',
    specialty: 'Ortodontista & Especialista MWS',
    clinic: 'Clínica OrthoDesign Jardins',
    phone: '(11) 98765-4321',
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=1',
  },
  labTechnician: {
    name: 'TechLab Precision MWS',
    specialist: 'Henrique Vasconcelos',
    role: 'Técnico Sênior de Dispositivos Linguais MWS',
    certificate: 'Certificação MWS Master Lab #4412',
  },
  wireStatus: {
    upperArc: {
      installed: true,
      type: 'Fio Lingual MWS Customizado Termoativado',
      caliber: '0.014" NiTi Copper Especial',
      installedDate: '10/02/2026',
      status: 'Ativo e em conformação',
      nextAdjustment: '18/07/2026',
    },
    lowerArc: {
      installed: true,
      type: 'Fio Lingual MWS Customizado com Dobras de 1ª Ordem',
      caliber: '0.014" NiTi Flex',
      installedDate: '10/02/2026',
      status: 'Ativo e em conformação',
      nextAdjustment: '18/07/2026',
    },
  },
  phases: [
    {
      id: 1,
      name: 'Fase 1',
      title: 'Diagnóstico 3D e Planejamento Virtual',
      arc: 'Arcada Superior e Inferior',
      status: 'completed' as const,
      wireType: 'Pré-instalação (Modelagem Digital)',
      wireCaliber: 'Setup Digital 3D',
      startDate: '12/01/2026',
      completedDate: '26/01/2026',
      estimatedDuration: '2 semanas',
      orthodontistNote:
        'Escaneamento intraoral de alta precisão realizado. Documentação fotográfica e telerradiografia analisadas em conjunto com a central MWS.',
      labNote:
        'Biometria virtual finalizada com sucesso. Diagramação dos fios linguais customizados e fabricação dos dispositivos robóticos concluída.',
      objectives: [
        'Escaneamento intraoral 3D das arcadas',
        'Estudo cefalométrico computadorizado',
        'Confecção robótica dos fios linguais sob medida',
      ],
      careTips: [
        'Manter excelente higienização pré-procedimento',
        'Realizar profilaxia clínica recomendada',
      ],
    },
    {
      id: 2,
      name: 'Fase 2',
      title: 'Colagem dos Dispositivos Linguais & Instalação do Fio Inicial',
      arc: 'Arcada Superior e Inferior',
      status: 'completed' as const,
      wireType: 'Fio Lingual MWS Termoativado',
      wireCaliber: '0.012" NiTi Superelástico',
      startDate: '27/01/2026',
      completedDate: '09/02/2026',
      estimatedDuration: '2 semanas',
      orthodontistNote:
        'Colagem indireta lingual realizada com guia de precisão. Instalação do primeiro arco por trás dos dentes com adaptação imediata excelente.',
      labNote:
        'Guia de transferência customizado entregue e validado. Força biológica leve e contínua calibrada para o início do movimento.',
      objectives: [
        'Fixação dos stops linguais internos',
        'Inserção do fio MWS 0.012 por trás dos dentes',
        'Adaptação fonética e instruções de conforto',
      ],
      careTips: [
        'Utilizar cera de proteção lingual se houver atrito leve com a língua',
        'Usar escova interdental para limpar ao redor dos fios internos',
      ],
    },
    {
      id: 3,
      name: 'Fase 3',
      title: 'Alinhamento, Nivelamento & Rotações (Fase Atual)',
      arc: 'Arcada Superior e Inferior',
      status: 'in_progress' as const,
      wireType: 'Fio Lingual MWS Customizado Termoativado',
      wireCaliber: '0.014" NiTi Copper',
      startDate: '10/02/2026',
      estimatedDuration: '3 meses',
      orthodontistNote:
        'Evolução muito positiva! O fio lingual está promovendo o alinhamento das cúspides anteriores com discrição 100% invisível. Excelente resposta tecidual.',
      labNote:
        'A geometria pré-programada no fio interno está atuando na correção da rotação dos dentes 12 e 22 conforme o planejamento digital.',
      objectives: [
        'Desrotacionamento dos incisivos laterais',
        'Nivelamento da curva de Spee',
        'Fechamento gradual de pequenos espaçamentos',
      ],
      careTips: [
        'Evitar mastigar alimentos excessivamente duros com os dentes anteriores',
        'Utilizar o passa-fio ortodôntico diariamente atrás do fio lingual',
        'Higienizar a face interna dos dentes com movimentos circulares suaves',
      ],
    },
    {
      id: 4,
      name: 'Fase 4',
      title: 'Fechamento de Espaços & Coordenação de Torque',
      arc: 'Arcada Superior e Inferior',
      status: 'upcoming' as const,
      wireType: 'Fio Lingual MWS de Aço Nobre Retangular',
      wireCaliber: '0.016" x 0.022" Aço Braided',
      startDate: 'Previsão: Junho/2026',
      estimatedDuration: '3 meses',
      orthodontistNote:
        'Nesta fase substituiremos o arco de NiTi pelo fio lingual rígido de aço para controle milimétrico de torque e consolidação dos arcos.',
      labNote:
        'Fios retangulares com curvas de ancoragem já produzidos e armazenados no kit estéril do paciente na clínica.',
      objectives: [
        'Consolidação das distâncias intermolares',
        'Ajuste fino de torque radicular',
        'Engrenamento das cúspides funcionais',
      ],
      careTips: [
        'Manter assiduidade rigorosa nas consultas mensais de ativação',
        'Avisar a clínica imediatamente se sentir qualquer folga no fio',
      ],
    },
    {
      id: 5,
      name: 'Fase 5',
      title: 'Finalização Estética Oclusal & Contenção Lingual Fixa',
      arc: 'Arcada Superior e Inferior',
      status: 'upcoming' as const,
      wireType: 'Contenção Fina Lingual MWS Retainer',
      wireCaliber: '0.0155" Twist Multi-fio',
      startDate: 'Previsão: Outubro/2026',
      estimatedDuration: '1 mês',
      orthodontistNote:
        'Remoção dos dispositivos de trabalho e instalação da contenção fixa lingual interna de alta durabilidade para estabilidade perpétua do sorriso.',
      labNote:
        'Contenção lingual customizada conformada sobre o modelo digital do resultado ideal final.',
      objectives: [
        'Refinamento de contatos oclusais',
        'Polimento das superfícies linguais',
        'Instalação da contenção definitiva invisível',
      ],
      careTips: [
        'Revisões semestrais de controle e profilaxia',
        'Sorrir livremente com o alinhamento definitivo conquistado',
      ],
    },
  ],
}

export default function PatientTreatment() {
  const [activeTab, setActiveTab] = useState<'timeline' | 'wires' | 'lab'>('timeline')
  const [selectedPhaseId, setSelectedPhaseId] = useState<number>(3)

  const selectedPhase =
    MOCK_TREATMENT_DATA.phases.find((p) => p.id === selectedPhaseId) ||
    MOCK_TREATMENT_DATA.phases[2]

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-5xl mx-auto animate-fade-in-up">
      {/* Cabeçalho Principal com Referência Clínica */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
              Meu Tratamento Magic Wire
            </h1>
            <Badge className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium">
              Em Andamento
            </Badge>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Acompanhe a evolução do seu sistema lingual fixo interno, troca de fios e notas
            clínicas.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Badge
            variant="outline"
            className="border-slate-300 bg-white text-slate-700 font-mono text-xs px-3 py-1.5 shadow-sm"
          >
            Ref. Caso:{' '}
            <strong className="text-slate-900 ml-1">{MOCK_TREATMENT_DATA.caseCode}</strong>
          </Badge>
          <Link to="/patient/appointments">
            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
              <Calendar className="w-4 h-4 mr-2" /> Agendar Revisão
            </Button>
          </Link>
        </div>
      </div>

      {/* Cartão de Destaque: O Que é o Magic Wire */}
      <Card className="border-emerald-200 bg-gradient-to-r from-emerald-50 via-teal-50/50 to-white shadow-sm overflow-hidden">
        <CardContent className="p-5 sm:p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-slate-900">
                    Tecnologia Lingual 100% Invisível
                  </h3>
                  <Badge
                    variant="secondary"
                    className="bg-emerald-100 text-emerald-800 text-[11px]"
                  >
                    Sem brackets externos
                  </Badge>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                  O sistema <strong>Magic Wire</strong> é instalado exclusivamente na face{' '}
                  <strong>interna dos dentes</strong> (lado lingual). Os fios customizados atuam de
                  forma contínua e discreta, sem necessidade de troca diária de peças móveis.
                </p>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur rounded-lg p-3 border border-emerald-100 shrink-0 w-full md:w-auto text-left md:text-right">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Status do Tratamento
              </span>
              <p className="text-sm font-bold text-emerald-700">Fase 3 de 5 (45% concluído)</p>
              <p className="text-xs text-slate-500">Início: {MOCK_TREATMENT_DATA.startDate}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Barra de Progresso e Fases Visuais */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Activity className="w-5 h-5 text-emerald-600" />
                Linha de Evolução das Fases Clínicas
              </CardTitle>
              <CardDescription>
                Clique em uma etapa para visualizar os detalhes técnicos do fio instalado e
                orientações.
              </CardDescription>
            </div>
            <span className="text-sm font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 self-start sm:self-auto">
              {MOCK_TREATMENT_DATA.overallProgress}% Concluído
            </span>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 pt-2">
          <Progress
            value={MOCK_TREATMENT_DATA.overallProgress}
            className="h-2.5 bg-slate-100 [&>div]:bg-emerald-600"
          />

          {/* Steps interativos */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-2">
            {MOCK_TREATMENT_DATA.phases.map((phase) => {
              const isSelected = selectedPhaseId === phase.id
              const isCompleted = phase.status === 'completed'
              const isInProgress = phase.status === 'in_progress'

              return (
                <button
                  key={phase.id}
                  onClick={() => setSelectedPhaseId(phase.id)}
                  className={`p-3 rounded-xl text-left border transition-all flex flex-col justify-between relative group ${
                    isSelected
                      ? 'border-emerald-600 bg-emerald-50/70 shadow-sm ring-2 ring-emerald-400/30'
                      : isInProgress
                        ? 'border-emerald-300 bg-white hover:bg-emerald-50/30'
                        : isCompleted
                          ? 'border-slate-200 bg-slate-50/60 hover:bg-slate-100/70'
                          : 'border-slate-200 bg-white opacity-70 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isCompleted
                          ? 'bg-emerald-100 text-emerald-800'
                          : isInProgress
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {phase.name}
                    </span>
                    {isCompleted ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : isInProgress ? (
                      <span className="flex h-2.5 w-2.5 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600"></span>
                      </span>
                    ) : (
                      <Clock className="w-4 h-4 text-slate-300" />
                    )}
                  </div>

                  <p className="text-xs font-semibold text-slate-900 line-clamp-2 leading-tight">
                    {phase.title}
                  </p>

                  <p className="text-[11px] text-slate-500 mt-2 flex items-center gap-1">
                    {isCompleted ? 'Concluída' : isInProgress ? 'Fase Atual' : 'Próxima'}
                  </p>
                </button>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Detalhe da Fase Selecionada */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Badge
                  className={
                    selectedPhase.status === 'completed'
                      ? 'bg-emerald-100 text-emerald-800'
                      : selectedPhase.status === 'in_progress'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-200 text-slate-700'
                  }
                >
                  {selectedPhase.name} •{' '}
                  {selectedPhase.status === 'completed'
                    ? 'Concluída'
                    : selectedPhase.status === 'in_progress'
                      ? 'Em Andamento'
                      : 'Prevista'}
                </Badge>
                <span className="text-xs text-slate-500">
                  Duração estimada: {selectedPhase.estimatedDuration}
                </span>
              </div>
              <CardTitle className="text-xl font-bold text-slate-900">
                {selectedPhase.title}
              </CardTitle>
            </div>

            <div className="text-xs text-slate-600 bg-white border border-slate-200 px-3 py-2 rounded-lg">
              <p>
                <strong>Início:</strong> {selectedPhase.startDate}
              </p>
              {selectedPhase.completedDate && (
                <p>
                  <strong>Finalizado em:</strong> {selectedPhase.completedDate}
                </p>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          {/* Fio Utilizado nesta Fase */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex items-center gap-2 text-slate-800 font-semibold text-sm">
                <Layers className="w-4 h-4 text-emerald-600" />
                Especificação do Fio Lingual nesta Etapa
              </div>
              <div className="space-y-1 text-xs">
                <p>
                  <span className="text-slate-500">Modelo:</span>{' '}
                  <strong className="text-slate-900">{selectedPhase.wireType}</strong>
                </p>
                <p>
                  <span className="text-slate-500">Calibre / Liga:</span>{' '}
                  <strong className="text-slate-900">{selectedPhase.wireCaliber}</strong>
                </p>
                <p>
                  <span className="text-slate-500">Posicionamento:</span> Face lingual (interna)
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200/80 space-y-2">
              <div className="flex items-center gap-2 text-emerald-950 font-semibold text-sm">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Objetivos Clínicos Desta Fase
              </div>
              <ul className="space-y-1">
                {selectedPhase.objectives.map((obj, i) => (
                  <li key={i} className="text-xs text-slate-700 flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Anotações da Ortodontista e do Laboratório */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* Nota da Ortodontista */}
            <div className="border border-slate-200 rounded-xl p-5 space-y-3 bg-white shadow-sm">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 border border-slate-200">
                  <AvatarImage src={MOCK_TREATMENT_DATA.orthodontist.avatar} />
                  <AvatarFallback className="bg-emerald-100 text-emerald-700 font-bold">
                    AC
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-sm font-bold text-slate-900">
                      {MOCK_TREATMENT_DATA.orthodontist.name}
                    </h4>
                    <Badge
                      variant="outline"
                      className="text-[10px] text-emerald-700 border-emerald-300"
                    >
                      Ortodontista
                    </Badge>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    {MOCK_TREATMENT_DATA.orthodontist.cro} •{' '}
                    {MOCK_TREATMENT_DATA.orthodontist.clinic}
                  </p>
                </div>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-100">
                <p className="text-xs text-slate-700 leading-relaxed italic">
                  &ldquo;{selectedPhase.orthodontistNote}&rdquo;
                </p>
              </div>

              <p className="text-[11px] text-slate-500">
                Dúvidas clínicas? Envie mensagem ou agende uma revisão na aba{' '}
                <Link
                  to="/patient/appointments"
                  className="text-emerald-600 hover:underline font-semibold"
                >
                  Consultas
                </Link>
                .
              </p>
            </div>

            {/* Nota do Laboratório MWS */}
            <div className="border border-blue-100 rounded-xl p-5 space-y-3 bg-blue-50/30 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <FlaskConical className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-sm font-bold text-slate-900">
                      {MOCK_TREATMENT_DATA.labTechnician.name}
                    </h4>
                    <Badge className="bg-blue-100 text-blue-800 text-[10px]">Laboratório MWS</Badge>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Técnico: {MOCK_TREATMENT_DATA.labTechnician.specialist} •{' '}
                    {MOCK_TREATMENT_DATA.labTechnician.certificate}
                  </p>
                </div>
              </div>

              <div className="bg-white p-3.5 rounded-lg border border-blue-100">
                <p className="text-xs text-slate-700 leading-relaxed">
                  🔬 <strong>Parecer de Engenharia Lingual:</strong> {selectedPhase.labNote}
                </p>
              </div>

              <p className="text-[11px] text-slate-500">
                Fios confeccionados por conformação robótica computadorizada sob medida para a sua
                anatomia dental.
              </p>
            </div>
          </div>

          {/* Dicas de Cuidados Específicos */}
          <div className="rounded-xl border border-amber-200 bg-amber-50/40 p-4 space-y-2">
            <h4 className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
              <Smile className="w-4 h-4 text-amber-700" /> Recomendações de Conforto e Higiene para
              esta Etapa
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              {selectedPhase.careTips.map((tip, idx) => (
                <div
                  key={idx}
                  className="text-xs text-amber-950 flex items-start gap-2 bg-white/70 p-2.5 rounded-lg border border-amber-200/50"
                >
                  <span className="font-bold text-amber-700">•</span>
                  <span>{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs Secundárias: Status Geral dos Fios & Equipe Responsável */}
      <Tabs defaultValue="status-fios" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="status-fios">Status Atual dos Fios</TabsTrigger>
          <TabsTrigger value="equipe">Equipe & Laboratório</TabsTrigger>
        </TabsList>

        <TabsContent value="status-fios" className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-slate-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-bold text-slate-900 flex items-center justify-between">
                  <span>Arcada Superior (Maxila)</span>
                  <Badge className="bg-emerald-100 text-emerald-800">Fio Ativo</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-xs">
                <p>
                  <span className="text-slate-500">Tipo de Fio:</span>{' '}
                  <strong className="text-slate-900">
                    {MOCK_TREATMENT_DATA.wireStatus.upperArc.type}
                  </strong>
                </p>
                <p>
                  <span className="text-slate-500">Calibre:</span>{' '}
                  <strong className="text-slate-900">
                    {MOCK_TREATMENT_DATA.wireStatus.upperArc.caliber}
                  </strong>
                </p>
                <p>
                  <span className="text-slate-500">Data de Instalação:</span>{' '}
                  {MOCK_TREATMENT_DATA.wireStatus.upperArc.installedDate}
                </p>
                <p>
                  <span className="text-slate-500">Próxima Verificação:</span>{' '}
                  <strong className="text-emerald-700">
                    {MOCK_TREATMENT_DATA.wireStatus.upperArc.nextAdjustment}
                  </strong>
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-bold text-slate-900 flex items-center justify-between">
                  <span>Arcada Inferior (Mandíbula)</span>
                  <Badge className="bg-emerald-100 text-emerald-800">Fio Ativo</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-xs">
                <p>
                  <span className="text-slate-500">Tipo de Fio:</span>{' '}
                  <strong className="text-slate-900">
                    {MOCK_TREATMENT_DATA.wireStatus.lowerArc.type}
                  </strong>
                </p>
                <p>
                  <span className="text-slate-500">Calibre:</span>{' '}
                  <strong className="text-slate-900">
                    {MOCK_TREATMENT_DATA.wireStatus.lowerArc.caliber}
                  </strong>
                </p>
                <p>
                  <span className="text-slate-500">Data de Instalação:</span>{' '}
                  {MOCK_TREATMENT_DATA.wireStatus.lowerArc.installedDate}
                </p>
                <p>
                  <span className="text-slate-500">Próxima Verificação:</span>{' '}
                  <strong className="text-emerald-700">
                    {MOCK_TREATMENT_DATA.wireStatus.lowerArc.nextAdjustment}
                  </strong>
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="equipe" className="pt-4">
          <Card className="border-slate-200">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Stethoscope className="w-4 h-4 text-emerald-600" />
                    Ortodontista Responsável
                  </h4>
                  <div className="p-4 rounded-xl bg-slate-50 space-y-2">
                    <p className="font-bold text-slate-900">
                      {MOCK_TREATMENT_DATA.orthodontist.name}
                    </p>
                    <p className="text-xs text-slate-600">
                      {MOCK_TREATMENT_DATA.orthodontist.specialty}
                    </p>
                    <p className="text-xs text-slate-500">
                      Registro: {MOCK_TREATMENT_DATA.orthodontist.cro} • Consultório:{' '}
                      {MOCK_TREATMENT_DATA.orthodontist.clinic}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <FlaskConical className="w-4 h-4 text-blue-600" />
                    Laboratório Especialista MWS
                  </h4>
                  <div className="p-4 rounded-xl bg-blue-50/50 space-y-2">
                    <p className="font-bold text-slate-900">
                      {MOCK_TREATMENT_DATA.labTechnician.name}
                    </p>
                    <p className="text-xs text-slate-600">
                      Técnico Responsável: {MOCK_TREATMENT_DATA.labTechnician.specialist}
                    </p>
                    <p className="text-xs text-slate-500">
                      {MOCK_TREATMENT_DATA.labTechnician.certificate}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
