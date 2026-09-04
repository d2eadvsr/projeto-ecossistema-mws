import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Users,
  FolderOpen,
  DollarSign,
  TrendingUp,
  ShieldCheck,
  Package,
  ArrowRight,
  Clock,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  GraduationCap,
  Megaphone,
  Layers,
  ArrowUpRight,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts'

const monthlyCasesGrowth = [
  { month: 'Set/25', casos: 28, faturamento: 112 },
  { month: 'Out/25', casos: 34, faturamento: 125 },
  { month: 'Nov/25', casos: 39, faturamento: 130 },
  { month: 'Dez/25', casos: 42, faturamento: 138 },
  { month: 'Jan/26', casos: 48, faturamento: 140 },
  { month: 'Fev/26', casos: 54, faturamento: 145 },
]

export default function AdminDashboard() {
  return (
    <div className="p-4 md:p-8 space-y-8 max-w-7xl mx-auto animate-fade-in-up">
      {/* Top Banner de Boas-vindas */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white p-6 rounded-2xl shadow-md border border-slate-700">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide">
            <Sparkles className="w-3.5 h-3.5" /> Painel de Controle Oficial MWS
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Time ADM MWS • Visão Executiva
          </h1>
          <p className="text-slate-300 text-sm max-w-2xl">
            Gestão operacional, financeira e clínica do ecossistema Magic Wire — 3ª Geração da
            Ortodontia com fios invisíveis linguais robóticos.
          </p>
        </div>
        <div className="flex items-center gap-2 self-start md:self-auto">
          <Link to="/admin/casos">
            <Button className="bg-emerald-600 hover:bg-emerald-500 text-white shadow">
              <FolderOpen className="w-4 h-4 mr-2" /> 54 Casos Ativos
            </Button>
          </Link>
          <Link to="/admin/ortodontistas">
            <Button
              variant="outline"
              className="border-slate-500 text-slate-100 hover:bg-slate-800"
            >
              <Users className="w-4 h-4 mr-2" /> 182 Licenciados
            </Button>
          </Link>
        </div>
      </div>

      {/* 4 Indicadores Principais de KBIs */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* MRR / Receita Recorrente */}
        <Card className="border-slate-200 shadow-sm hover:border-slate-300 transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium text-slate-600">
              Receita Recorrente (MRR)
            </CardTitle>
            <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
              <DollarSign className="h-4 w-4 text-emerald-700" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl md:text-3xl font-bold text-slate-900">R$ 145.000</div>
            <div className="flex items-center text-xs text-emerald-600 font-medium mt-1">
              <ArrowUpRight className="h-3.5 w-3.5 mr-0.5" /> +12% vs mês anterior
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Licenciamentos + Splits de Casos</p>
          </CardContent>
        </Card>

        {/* Licenciados Ativos */}
        <Card className="border-slate-200 shadow-sm hover:border-slate-300 transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium text-slate-600">
              Ortodontistas Licenciados
            </CardTitle>
            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
              <Users className="h-4 w-4 text-blue-700" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl md:text-3xl font-bold text-slate-900">182</div>
            <div className="flex items-center text-xs text-blue-600 font-medium mt-1">
              <span>160 ativos • 22 em onboarding</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">R$ 24k valor de licenciamento</p>
          </CardContent>
        </Card>

        {/* Casos Clínicos no Laboratório */}
        <Card className="border-slate-200 shadow-sm hover:border-slate-300 transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium text-slate-600">
              Casos no Laboratório MWS
            </CardTitle>
            <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
              <FolderOpen className="h-4 w-4 text-purple-700" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl md:text-3xl font-bold text-slate-900">54</div>
            <div className="flex items-center text-xs text-amber-600 font-medium mt-1">
              <AlertTriangle className="h-3.5 w-3.5 mr-1" /> 3 casos próximos do limite SLA
            </div>
            <p className="text-[11px] text-slate-400 mt-1">100% catalogados p/ IA e Mentoria</p>
          </CardContent>
        </Card>

        {/* NPS Global da Rede */}
        <Card className="border-slate-200 shadow-sm hover:border-slate-300 transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium text-slate-600">NPS Global da Rede</CardTitle>
            <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
              <ShieldCheck className="h-4 w-4 text-emerald-700" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl md:text-3xl font-bold text-emerald-700">88</div>
            <div className="flex items-center text-xs text-emerald-600 font-medium mt-1">
              <CheckCircle2 className="h-3.5 w-3.5 mr-1" /> Zona de Excelência
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Pacientes e Ortodontistas</p>
          </CardContent>
        </Card>
      </div>

      {/* Seção 2: Pipeline de Casos Clínicos & Ações Imediatas ADM */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Status Canônicos dos Casos Clínicos (12 + 18 + 14 + 10 = 54) */}
        <Card className="lg:col-span-2 border-slate-200 shadow-sm">
          <CardHeader className="pb-3 border-b border-slate-100 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base font-bold text-slate-900">
                Pipeline da Esteira Laboratorial MWS
              </CardTitle>
              <CardDescription className="text-xs text-slate-500">
                Distribuição dos 54 casos clínicos ativos pelos status oficiais MWS
              </CardDescription>
            </div>
            <Link to="/admin/casos">
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-emerald-700 hover:text-emerald-800"
              >
                Ver todos <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-center">
                <span className="text-[11px] font-medium text-slate-500 block">
                  Aguardando Análise
                </span>
                <span className="text-2xl font-bold text-slate-900">12</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Triagem inicial</span>
              </div>
              <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-3.5 text-center">
                <span className="text-[11px] font-medium text-amber-800 block">
                  Em Análise Técnica
                </span>
                <span className="text-2xl font-bold text-amber-900">18</span>
                <span className="text-[10px] text-amber-600 block mt-0.5">Mentoria ativa</span>
              </div>
              <div className="rounded-xl border border-purple-200 bg-purple-50/60 p-3.5 text-center">
                <span className="text-[11px] font-medium text-purple-800 block">
                  Planej. Elaborado
                </span>
                <span className="text-2xl font-bold text-purple-900">14</span>
                <span className="text-[10px] text-purple-600 block mt-0.5">
                  Aguardando dentista
                </span>
              </div>
              <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-3.5 text-center">
                <span className="text-[11px] font-medium text-emerald-800 block">
                  Planej. Entregue
                </span>
                <span className="text-2xl font-bold text-emerald-900">10</span>
                <span className="text-[10px] text-emerald-600 block mt-0.5">Liberados p/ fio</span>
              </div>
            </div>

            {/* Gráfico de Evolução */}
            <div className="pt-2">
              <p className="text-xs font-semibold text-slate-700 mb-2">
                Evolução Mensal de Casos e Faturamento (R$ mil)
              </p>
              <div className="h-[220px] w-full">
                <ChartContainer
                  config={{
                    casos: { label: 'Casos Clínicos', color: '#059669' },
                    faturamento: { label: 'Faturamento (k R$)', color: '#3b82f6' },
                  }}
                  className="h-full w-full"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={monthlyCasesGrowth}
                      margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                    >
                      <XAxis
                        dataKey="month"
                        stroke="#94a3b8"
                        fontSize={11}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar
                        dataKey="casos"
                        fill="#059669"
                        radius={[4, 4, 0, 0]}
                        name="Casos Clínicos"
                      />
                      <Bar
                        dataKey="faturamento"
                        fill="#60a5fa"
                        radius={[4, 4, 0, 0]}
                        name="Faturamento (R$ mil)"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Fila de Ações Imediatas ADM */}
        <Card className="border-slate-200 shadow-sm flex flex-col">
          <CardHeader className="pb-3 border-b border-slate-100">
            <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-600" /> Ações Imediatas do Time ADM
            </CardTitle>
            <CardDescription className="text-xs text-slate-500">
              Itens que demandam aprovação ou ação administrativa
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 space-y-3 flex-1 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="p-3 rounded-lg border border-amber-200 bg-amber-50/50 flex items-start justify-between gap-3">
                <div className="space-y-0.5">
                  <span className="text-xs font-semibold text-amber-900 block">
                    10 Novas Fichas de Adesão
                  </span>
                  <p className="text-[11px] text-amber-700">
                    Ortodontistas aguardando avaliação de perfil e validação CRO.
                  </p>
                </div>
                <Link to="/admin/ortodontistas">
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs h-7 border-amber-300 text-amber-900 hover:bg-amber-100"
                  >
                    Avaliar
                  </Button>
                </Link>
              </div>

              <div className="p-3 rounded-lg border border-purple-200 bg-purple-50/50 flex items-start justify-between gap-3">
                <div className="space-y-0.5">
                  <span className="text-xs font-semibold text-purple-900 block">
                    6 Perfis Públicos Submetidos
                  </span>
                  <p className="text-[11px] text-purple-700">
                    Fotos, biografia e endereço para aprovação antes da publicação no portal.
                  </p>
                </div>
                <Link to="/admin/ortodontistas">
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs h-7 border-purple-300 text-purple-900 hover:bg-purple-100"
                  >
                    Revisar
                  </Button>
                </Link>
              </div>

              <div className="p-3 rounded-lg border border-blue-200 bg-blue-50/50 flex items-start justify-between gap-3">
                <div className="space-y-0.5">
                  <span className="text-xs font-semibold text-blue-900 block">
                    2 Mobilidades Geográficas
                  </span>
                  <p className="text-[11px] text-blue-700">
                    Pacientes solicitando manutenção do Fio Mágico em outra localidade/cidade.
                  </p>
                </div>
                <Link to="/admin/mobilidade">
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs h-7 border-blue-300 text-blue-900 hover:bg-blue-100"
                  >
                    Agendar
                  </Button>
                </Link>
              </div>

              <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 flex items-start justify-between gap-3">
                <div className="space-y-0.5">
                  <span className="text-xs font-semibold text-slate-900 block">
                    1 Insumo Fio Mágico Pendente
                  </span>
                  <p className="text-[11px] text-slate-600">
                    Aprovar liberação de envio do Kit Lingual Customizado (São Paulo).
                  </p>
                </div>
                <Link to="/admin/logistica">
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs h-7 border-slate-300 text-slate-800 hover:bg-slate-100"
                  >
                    Liberar
                  </Button>
                </Link>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Tempo médio de resposta ADM:</span>
                <span className="font-semibold text-emerald-700">2.4 horas (SLA Meta: 4h)</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Seção 3: Módulos Operacionais Rápidos */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Link to="/admin/financeiro" className="group">
          <Card className="h-full border-slate-200 hover:border-emerald-400 transition-all shadow-sm">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <DollarSign className="w-6 h-6" />
              </div>
              <div className="min-w-0">
                <h4 className="font-semibold text-slate-900 text-sm group-hover:text-emerald-700 transition-colors">
                  Financeiro & Split
                </h4>
                <p className="text-xs text-slate-500 truncate mt-0.5">
                  Adesões de R$ 24k, Boletos e Repasse R$100 / R$50
                </p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to="/admin/logistica" className="group">
          <Card className="h-full border-slate-200 hover:border-emerald-400 transition-all shadow-sm">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Package className="w-6 h-6" />
              </div>
              <div className="min-w-0">
                <h4 className="font-semibold text-slate-900 text-sm group-hover:text-blue-700 transition-colors">
                  Logística & Fios Mágicos
                </h4>
                <p className="text-xs text-slate-500 truncate mt-0.5">
                  Rastreamento e aprovação de envio de insumos
                </p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to="/admin/programas" className="group">
          <Card className="h-full border-slate-200 hover:border-emerald-400 transition-all shadow-sm">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                <Megaphone className="w-6 h-6" />
              </div>
              <div className="min-w-0">
                <h4 className="font-semibold text-slate-900 text-sm group-hover:text-amber-700 transition-colors">
                  Programas de Expansão
                </h4>
                <p className="text-xs text-slate-500 truncate mt-0.5">
                  MKT, Vendas Locais e Gestão Integrada via API
                </p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to="/admin/escola" className="group">
          <Card className="h-full border-slate-200 hover:border-emerald-400 transition-all shadow-sm">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div className="min-w-0">
                <h4 className="font-semibold text-slate-900 text-sm group-hover:text-purple-700 transition-colors">
                  Escola MWS & Fórum
                </h4>
                <p className="text-xs text-slate-500 truncate mt-0.5">
                  Moderação de cursos, imersões e comunidade
                </p>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}
