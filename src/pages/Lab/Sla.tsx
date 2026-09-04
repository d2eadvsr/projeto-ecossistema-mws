import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import {
  ShieldCheck,
  Clock,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Award,
  ArrowRight,
  Flame,
  UserCheck,
} from 'lucide-react'
import { MOCK_LAB_SLAS, MOCK_LAB_CASES, MOCK_LAB_TEAM } from './mockData'

export default function LabSla() {
  const delayedCases = MOCK_LAB_CASES.filter((c) => c.slaStatus === 'estourado')
  const warningCases = MOCK_LAB_CASES.filter((c) => c.slaStatus === 'alerta')

  // Média global de SLA
  const globalOnTimePercentage = (
    MOCK_LAB_SLAS.reduce((acc, curr) => acc + curr.onTimePercentage, 0) / MOCK_LAB_SLAS.length
  ).toFixed(1)

  // NPS médio concedido pelos ortodontistas
  const averageNps = (
    MOCK_LAB_TEAM.reduce((acc, curr) => acc + curr.npsScore, 0) / MOCK_LAB_TEAM.length
  ).toFixed(1)

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto animate-fade-in-up">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
            SLAs & Desempenho Operacional do Lab
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">
            Monitoramento de cumprimento de prazos por etapa técnica, alertas de atraso e NPS da
            rede de ortodontistas.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge className="bg-emerald-600 text-white text-xs px-3 py-1 font-semibold">
            SLA Global: {globalOnTimePercentage}% no prazo
          </Badge>
        </div>
      </div>

      {/* 4 Cards de Métricas de Alto Nível */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-slate-200">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Cumprimento de SLA
              </span>
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
            </div>
            <p className="text-3xl font-extrabold text-slate-900 mt-2">{globalOnTimePercentage}%</p>
            <p className="text-xs text-emerald-700 mt-1 flex items-center gap-1 font-medium">
              <TrendingUp className="w-3.5 h-3.5" /> +2.4% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>

        <Card className="border-red-200 bg-red-50/30">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-red-800 uppercase tracking-wide">
                Casos Atrasados
              </span>
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <p className="text-3xl font-extrabold text-red-900 mt-2">{delayedCases.length}</p>
            <p className="text-xs text-red-700 mt-1 font-medium">
              Apenas 2 casos estourados em 54 totais
            </p>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Tempo Médio Análise
              </span>
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-3xl font-extrabold text-slate-900 mt-2">14.2h</p>
            <p className="text-xs text-slate-500 mt-1">Meta estabelecida: 24 horas úteis</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                NPS dos Ortodontistas
              </span>
              <Award className="w-5 h-5 text-amber-500" />
            </div>
            <p className="text-3xl font-extrabold text-slate-900 mt-2">{averageNps}</p>
            <p className="text-xs text-emerald-700 mt-1 font-medium">
              Zona de Excelência (Escala 0 a 10)
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Casos Atrasados em Destaque Vermelho */}
      {delayedCases.length > 0 && (
        <Card className="border-red-300 bg-red-50/50 shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-bold text-red-950 flex items-center gap-2">
                <Flame className="w-5 h-5 text-red-600" />
                Casos com SLA Estourado (Prioridade Máxima)
              </CardTitle>
              <Badge className="bg-red-600 text-white text-xs">Atraso Crítico</Badge>
            </div>
            <CardDescription className="text-xs text-red-800">
              Estes casos exigem liberação ou reatribuição imediata para regularizar o prazo
              acordado com o ortodontista.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {delayedCases.map((c) => (
              <div
                key={c.id}
                className="p-4 rounded-xl bg-white border border-red-200 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-xs font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded">
                      {c.id}
                    </span>
                    <h4 className="font-bold text-sm text-slate-900">{c.patientName}</h4>
                    <Badge variant="outline" className="text-xs text-slate-600 bg-slate-50">
                      {c.protocol}
                    </Badge>
                    <Badge className="bg-red-100 text-red-800 border-red-300 text-xs">
                      {c.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-600">
                    <strong>Ortodontista:</strong> {c.dentistName} ({c.dentistCity}) •{' '}
                    <strong>Técnico:</strong> {c.technicianAssigned} • <strong>Mentor:</strong>{' '}
                    {c.mentorAssigned}
                  </p>
                  <p className="text-xs text-slate-500 italic">Queixa: "{c.chiefComplaint}"</p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-sm font-extrabold text-red-600 block">
                      {Math.abs(c.slaHoursLeft)} horas em atraso
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Prazo expirou em: {c.slaDeadline}
                    </span>
                  </div>
                  <Button
                    asChild
                    size="sm"
                    className="bg-red-600 hover:bg-red-700 text-white text-xs"
                  >
                    <Link to="/lab/cases">Tratar Imediatamente</Link>
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Tabela de Indicadores de Cumprimento de SLA por Etapa Oficial */}
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="text-base font-bold text-slate-900">
            Metas de SLA por Etapa Oficial da Esteira Técnica
          </CardTitle>
          <CardDescription className="text-xs text-slate-500">
            Metas de resposta acordadas no regulamento operacional MWS com a rede credenciada.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 font-semibold uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="p-3">Etapa Oficial</th>
                  <th className="p-3">Tempo Médio Real</th>
                  <th className="p-3">Meta Contratual</th>
                  <th className="p-3">% No Prazo</th>
                  <th className="p-3">Casos em Atraso</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {MOCK_LAB_SLAS.map((item) => (
                  <tr key={item.stage} className="hover:bg-slate-50/70 transition-colors">
                    <td className="p-3 font-semibold text-slate-900">{item.stage}</td>
                    <td className="p-3 font-mono font-bold text-slate-800">
                      {item.averageTimeHours} horas
                    </td>
                    <td className="p-3 text-slate-500">{item.targetHours} horas</td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">{item.onTimePercentage}%</span>
                        <div className="w-20 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                          <div
                            style={{ width: `${item.onTimePercentage}%` }}
                            className={`h-full ${
                              item.onTimePercentage >= 95 ? 'bg-emerald-500' : 'bg-amber-500'
                            }`}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      {item.delayedCasesCount > 0 ? (
                        <span className="text-red-600 font-bold bg-red-50 px-2 py-0.5 rounded border border-red-200">
                          {item.delayedCasesCount} caso(s)
                        </span>
                      ) : (
                        <span className="text-emerald-700 font-medium">Zero atrasos</span>
                      )}
                    </td>
                    <td className="p-3">
                      {item.onTimePercentage >= 95 ? (
                        <Badge className="bg-emerald-100 text-emerald-800 border-emerald-300">
                          Conforme
                        </Badge>
                      ) : (
                        <Badge className="bg-amber-100 text-amber-800 border-amber-300">
                          Em Atenção
                        </Badge>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
