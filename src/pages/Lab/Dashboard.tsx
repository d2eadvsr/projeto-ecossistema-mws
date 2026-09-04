import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Clock,
  FlaskConical,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Cpu,
  ArrowRight,
  TrendingUp,
  Users,
  ShieldCheck,
  Calendar,
  Layers,
} from 'lucide-react'
import {
  MOCK_LAB_CASES,
  MOCK_LAB_TEAM,
  MOCK_ROBOTIC_ORDERS,
  MOCK_LAB_WEEKLY_PRODUCTIVITY,
} from './mockData'

export default function LabDashboard() {
  // Contagens canônicas oficiais MWS (total 54):
  const aguardandoCount = MOCK_LAB_CASES.filter(
    (c) => c.status === 'Aguardando Análise Técnica',
  ).length
  const emAnaliseCount = MOCK_LAB_CASES.filter((c) => c.status === 'Em Análise Técnica').length
  const planejadoCount = MOCK_LAB_CASES.filter((c) => c.status === 'Planejamento Elaborado').length
  const entregueCount = MOCK_LAB_CASES.filter((c) => c.status === 'Planejamento Entregue').length
  const totalCases = MOCK_LAB_CASES.length

  // Alertas de SLA estourado ou próximo ao vencimento
  const delayedCases = MOCK_LAB_CASES.filter((c) => c.slaStatus === 'estourado')
  const warningCases = MOCK_LAB_CASES.filter((c) => c.slaStatus === 'alerta')

  const totalWeeklyAnalyses = MOCK_LAB_WEEKLY_PRODUCTIVITY.reduce(
    (acc, curr) => acc + curr.analises,
    0,
  )
  const totalWeeklyPlans = MOCK_LAB_WEEKLY_PRODUCTIVITY.reduce(
    (acc, curr) => acc + curr.planejamentos,
    0,
  )
  const totalWeeklyWires = MOCK_LAB_WEEKLY_PRODUCTIVITY.reduce(
    (acc, curr) => acc + curr.producaoFios,
    0,
  )

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto animate-fade-in-up">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Operação Laboratorial Ativa • 3ª Geração
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 mt-1">
            Dashboard do Laboratório MWS
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">
            Visão geral da esteira técnica, planejamento de casos e manufatura robótica dos Fios
            Mágicos.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button asChild variant="outline" size="sm" className="text-xs">
            <Link to="/lab/sla">
              <ShieldCheck className="w-3.5 h-3.5 mr-1 text-slate-600" /> Indicadores SLA
            </Link>
          </Button>
          <Button
            asChild
            size="sm"
            className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs"
          >
            <Link to="/lab/cases">
              <Layers className="w-3.5 h-3.5 mr-1" /> Esteira Técnica ({totalCases})
            </Link>
          </Button>
        </div>
      </div>

      {/* 4 Caixas de Status Oficiais MWS (Soma = 54) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Aguardando Análise Técnica */}
        <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-600 uppercase tracking-wide">
                1. Aguardando Análise
              </span>
              <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <span className="text-3xl font-extrabold text-slate-900">{aguardandoCount}</span>
              <Badge variant="outline" className="text-[11px] bg-slate-50 text-slate-600">
                Fila de Entrada
              </Badge>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Casos recém-abertos pelos ortodontistas licenciados
            </p>
            <div className="mt-3 pt-3 border-t border-slate-100 flex justify-between items-center text-xs">
              <Link
                to="/lab/cases"
                className="text-slate-700 font-medium hover:underline flex items-center"
              >
                Ver fila <ArrowRight className="w-3 h-3 ml-1" />
              </Link>
              <span className="text-slate-400">Meta: 24h</span>
            </div>
          </CardContent>
        </Card>

        {/* 2. Em Análise Técnica */}
        <Card className="border-amber-200 bg-amber-50/30 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-amber-800 uppercase tracking-wide">
                2. Em Análise Técnica
              </span>
              <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-700">
                <FlaskConical className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <span className="text-3xl font-extrabold text-amber-900">{emAnaliseCount}</span>
              <Badge
                variant="outline"
                className="text-[11px] bg-amber-100 text-amber-800 border-amber-300"
              >
                Em Elaboração
              </Badge>
            </div>
            <p className="text-xs text-amber-900/80 mt-2">
              Técnicos e mentores desenhando a mecânica lingual
            </p>
            <div className="mt-3 pt-3 border-t border-amber-200/60 flex justify-between items-center text-xs">
              <Link
                to="/lab/cases"
                className="text-amber-800 font-medium hover:underline flex items-center"
              >
                Ver casos <ArrowRight className="w-3 h-3 ml-1" />
              </Link>
              <span className="text-amber-700 font-mono">Meta: 48h</span>
            </div>
          </CardContent>
        </Card>

        {/* 3. Planejamento Elaborado */}
        <Card className="border-purple-200 bg-purple-50/30 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-purple-800 uppercase tracking-wide">
                3. Planejamento Elaborado
              </span>
              <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center text-purple-700">
                <Sparkles className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <span className="text-3xl font-extrabold text-purple-900">{planejadoCount}</span>
              <Badge
                variant="outline"
                className="text-[11px] bg-purple-100 text-purple-800 border-purple-300"
              >
                Com Notas Lab
              </Badge>
            </div>
            <p className="text-xs text-purple-900/80 mt-2">
              Com notas técnicas e clínicas do mentor prontas
            </p>
            <div className="mt-3 pt-3 border-t border-purple-200/60 flex justify-between items-center text-xs">
              <Link
                to="/lab/planning"
                className="text-purple-800 font-medium hover:underline flex items-center"
              >
                Ver planos <ArrowRight className="w-3 h-3 ml-1" />
              </Link>
              <span className="text-purple-700 font-mono">Retorno D+2</span>
            </div>
          </CardContent>
        </Card>

        {/* 4. Planejamento Entregue */}
        <Card className="border-emerald-200 bg-emerald-50/40 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-emerald-800 uppercase tracking-wide">
                4. Planejamento Entregue
              </span>
              <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <span className="text-3xl font-extrabold text-emerald-900">{entregueCount}</span>
              <Badge
                variant="outline"
                className="text-[11px] bg-emerald-100 text-emerald-800 border-emerald-300"
              >
                Aprovados p/ Robô
              </Badge>
            </div>
            <p className="text-xs text-emerald-900/80 mt-2">
              Aprovados pelo ortodontista e liberados p/ fabricação
            </p>
            <div className="mt-3 pt-3 border-t border-emerald-200/60 flex justify-between items-center text-xs">
              <Link
                to="/lab/production"
                className="text-emerald-800 font-medium hover:underline flex items-center"
              >
                Produção Fios <ArrowRight className="w-3 h-3 ml-1" />
              </Link>
              <span className="text-emerald-700 font-mono">Robótica Ativa</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alertas Críticos de SLA (em destaque vermelho e amarelo) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* SLA Estourado */}
        <Card className="border-red-200 bg-red-50/40">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-bold text-red-900 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                Alertas de SLA Estourado ({delayedCases.length})
              </CardTitle>
              <Badge className="bg-red-600 text-white text-[10px]">Ação Imediata</Badge>
            </div>
            <CardDescription className="text-xs text-red-700">
              Casos que ultrapassaram o tempo limite de triagem ou planejamento técnico.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2.5 pt-1">
            {delayedCases.map((c) => (
              <div
                key={c.id}
                className="p-3 rounded-lg bg-white border border-red-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-red-700">{c.id}</span>
                    <span className="font-semibold text-xs text-slate-900">{c.patientName}</span>
                    <Badge
                      variant="outline"
                      className="text-[10px] text-red-700 border-red-300 bg-red-50"
                    >
                      {c.status}
                    </Badge>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Dr(a). {c.dentistName} ({c.dentistCity}) • Protocolo: {c.protocol}
                  </p>
                </div>
                <div className="flex items-center gap-2 justify-between sm:justify-end">
                  <span className="text-xs font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded">
                    {Math.abs(c.slaHoursLeft)}h atrasado
                  </span>
                  <Button
                    asChild
                    size="sm"
                    variant="ghost"
                    className="h-7 text-xs text-red-700 hover:bg-red-50"
                  >
                    <Link to="/lab/cases">Tratar</Link>
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* SLA Próximo do Vencimento */}
        <Card className="border-amber-200 bg-amber-50/40">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-bold text-amber-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-600" />
                SLA Próximo do Vencimento ({warningCases.length})
              </CardTitle>
              <Badge className="bg-amber-500 text-white text-[10px]">Atenção &lt; 8h</Badge>
            </div>
            <CardDescription className="text-xs text-amber-700">
              Casos com prazo de entrega nas próximas horas de expediente do lab.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2.5 pt-1">
            {warningCases.map((c) => (
              <div
                key={c.id}
                className="p-3 rounded-lg bg-white border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-amber-800">{c.id}</span>
                    <span className="font-semibold text-xs text-slate-900">{c.patientName}</span>
                    <Badge
                      variant="outline"
                      className="text-[10px] text-amber-700 border-amber-300 bg-amber-50"
                    >
                      {c.status}
                    </Badge>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Dr(a). {c.dentistName} • Prazo: {c.slaDeadline}
                  </p>
                </div>
                <div className="flex items-center gap-2 justify-between sm:justify-end">
                  <span className="text-xs font-semibold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                    Resta {c.slaHoursLeft}h
                  </span>
                  <Button
                    asChild
                    size="sm"
                    variant="ghost"
                    className="h-7 text-xs text-amber-800 hover:bg-amber-50"
                  >
                    <Link to="/lab/cases">Abrir</Link>
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Seção Central: Produtividade Semanal + Fila de Fabricação Robótica */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Gráfico/Barras de Produtividade do Time Técnico */}
        <Card className="lg:col-span-2 border-slate-200">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  Produtividade Semanal da Equipe Técnica
                </CardTitle>
                <CardDescription className="text-xs text-slate-500">
                  Volume de análises técnicas concluídas, planejamentos elaborados e fios
                  customizados modelados por robótica.
                </CardDescription>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1 text-slate-600">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Análises (
                  {totalWeeklyAnalyses})
                </span>
                <span className="flex items-center gap-1 text-slate-600">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-500" /> Planos (
                  {totalWeeklyPlans})
                </span>
                <span className="flex items-center gap-1 text-slate-600">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Fios Mágicos (
                  {totalWeeklyWires})
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Gráfico de Barras com layout responsivo Tailwind */}
            <div className="space-y-4 pt-2">
              <div className="grid grid-cols-6 gap-2 sm:gap-4 text-center">
                {MOCK_LAB_WEEKLY_PRODUCTIVITY.map((dayData) => {
                  const maxVal = 20
                  const hAnalise = Math.round((dayData.analises / maxVal) * 120)
                  const hPlano = Math.round((dayData.planejamentos / maxVal) * 120)
                  const hFio = Math.round((dayData.producaoFios / maxVal) * 120)

                  return (
                    <div key={dayData.day} className="flex flex-col items-center gap-2">
                      <div className="h-36 w-full flex items-end justify-center gap-1 bg-slate-50 rounded-lg p-1.5 border border-slate-100">
                        {/* Barra Análises */}
                        <div
                          title={`Análises: ${dayData.analises}`}
                          style={{ height: `${hAnalise}px` }}
                          className="w-2.5 sm:w-3.5 bg-blue-500 rounded-t transition-all hover:bg-blue-600"
                        />
                        {/* Barra Planejamentos */}
                        <div
                          title={`Planejamentos: ${dayData.planejamentos}`}
                          style={{ height: `${hPlano}px` }}
                          className="w-2.5 sm:w-3.5 bg-purple-500 rounded-t transition-all hover:bg-purple-600"
                        />
                        {/* Barra Fios Mágicos */}
                        <div
                          title={`Fios Mágicos: ${dayData.producaoFios}`}
                          style={{ height: `${hFio}px` }}
                          className="w-2.5 sm:w-3.5 bg-emerald-500 rounded-t transition-all hover:bg-emerald-600"
                        />
                      </div>
                      <span className="font-semibold text-xs text-slate-700">{dayData.day}</span>
                      <span className="text-[10px] text-slate-400">
                        {dayData.analises + dayData.planejamentos + dayData.producaoFios} ops
                      </span>
                    </div>
                  )
                })}
              </div>

              {/* Destaque Informativo do Algoritmo MWS */}
              <div className="p-3.5 rounded-lg bg-indigo-50 border border-indigo-200 text-xs flex items-start gap-3">
                <Cpu className="w-4 h-4 text-indigo-600 mt-0.5 shrink-0" />
                <div className="space-y-0.5">
                  <p className="font-semibold text-indigo-950">
                    Tecnologia Lingual Robótica de 3ª Geração:
                  </p>
                  <p className="text-indigo-900 leading-relaxed text-[11px]">
                    Cada Fio Mágico é modelado individualmente pela célula robótica a partir do
                    planejamento digital elaborado pelo mentor do caso. Os fios são instalados
                    exclusivamente pelo lado interno dos dentes, proporcionando discrição absoluta e
                    precisão biomecânica tridimensional.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Células Robóticas e Fila de Fabricação */}
        <Card className="border-slate-200 flex flex-col">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-emerald-600" />
                Células Robóticas
              </CardTitle>
              <Badge className="bg-emerald-100 text-emerald-800 border-emerald-300 text-[10px]">
                Operando 100%
              </Badge>
            </div>
            <CardDescription className="text-xs text-slate-500">
              Status das células de conformação de fios NiTi Copper
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 flex-1 flex flex-col justify-between">
            <div className="space-y-2.5">
              <div className="p-3 rounded-lg border border-slate-200 bg-slate-50/70 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900">KUKA-MW-01 (Braço 6 Eixos)</span>
                  <span className="text-emerald-600 font-semibold text-[11px]">Dobragem Ativa</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Executando lote ROB-2026-089 • Arcada Superior 0.016 CuNiTi Lingual
                </p>
                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full w-[78%]" />
                </div>
              </div>

              <div className="p-3 rounded-lg border border-slate-200 bg-slate-50/70 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900">KUKA-MW-02 (Braço 6 Eixos)</span>
                  <span className="text-blue-600 font-semibold text-[11px]">Calibração TMA</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Executando lote ROB-2026-095 • Fio Retangular 0.016x0.022 TMA Lingual
                </p>
                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full w-[45%]" />
                </div>
              </div>

              <div className="p-3 rounded-lg border border-slate-200 bg-slate-50/70 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900">Bancada CQ Laser 3D</span>
                  <span className="text-purple-600 font-semibold text-[11px]">Inspeção Óptica</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Tolerância média dimensional: ±0.03mm • 100% de conformidade
                </p>
                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-purple-500 h-full w-[94%]" />
                </div>
              </div>
            </div>

            <Button
              asChild
              className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs mt-3"
            >
              <Link to="/lab/production">
                Ver Fila Completa de Fabricação ({MOCK_ROBOTIC_ORDERS.length})
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Mentores e Técnicos com Carga de Trabalho */}
      <Card className="border-slate-200">
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-600" />
                Carga de Trabalho da Equipe Técnica & Mentores
              </CardTitle>
              <CardDescription className="text-xs text-slate-500">
                Alocação de casos clínicos e capacidade dos técnicos e mentores responsáveis.
              </CardDescription>
            </div>
            <Button asChild variant="outline" size="sm" className="text-xs">
              <Link to="/lab/team">Gerenciar Equipe Completa</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {MOCK_LAB_TEAM.slice(0, 6).map((member) => {
              const occupancy = Math.round((member.casesAssignedCount / member.capacity) * 100)
              return (
                <div
                  key={member.id}
                  className="p-3.5 rounded-lg border border-slate-200 bg-white hover:border-slate-300 transition-all flex flex-col justify-between space-y-2.5 shadow-xs"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-bold text-xs text-slate-900">{member.name}</h4>
                      <Badge
                        variant="outline"
                        className="text-[10px] text-slate-600 bg-slate-50 mt-0.5"
                      >
                        {member.role}
                      </Badge>
                    </div>
                    <span className="text-[11px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      NPS {member.npsScore}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-500 line-clamp-1">{member.specialty}</p>

                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-500">Casos Ativos:</span>
                      <span className="font-semibold text-slate-800">
                        {member.casesAssignedCount} / {member.capacity} ({occupancy}%)
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div
                        style={{ width: `${occupancy}%` }}
                        className={`h-full ${occupancy > 85 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
