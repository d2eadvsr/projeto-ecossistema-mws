import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  Star,
  Award,
  Clock,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  ThumbsUp,
  HeartHandshake,
  ShieldCheck,
  Zap,
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export default function DentistQuality() {
  const { toast } = useToast()

  const npsScore = 92
  const slaLabApproval = 98.5
  const onTimeAppointments = 96.0
  const totalReviews = 64

  const breakdownNPS = {
    promotores: 88,
    neutros: 9,
    detratores: 3,
  }

  const patientFeedbacks = [
    {
      id: 'fb-1',
      patientName: 'Mariana Duarte',
      score: 10,
      comment:
        'Tratamento impecável! O Dr. Roberto explicou tudo no 3D e o aparelho Magic Wire é super discreto e confortável.',
      date: 'Há 3 dias',
    },
    {
      id: 'fb-2',
      patientName: 'Carlos Henrique',
      score: 9,
      comment:
        'Pontualidade excelente nas consultas e o dispositivo interno não atrapalhou meu dia a dia.',
      date: 'Há 1 semana',
    },
    {
      id: 'fb-3',
      patientName: 'Beatriz Vasconcelos',
      score: 10,
      comment: 'Super satisfeita com o resultado em apenas 6 meses. Recomendo de olhos fechados!',
      date: 'Há 2 semanas',
    },
  ]

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-6xl mx-auto animate-fade-in-up">
      {/* Topo */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
              Painel de Qualidade, NPS & SLAs
            </h1>
            <Badge className="bg-emerald-100 text-emerald-800">Selo Nível Ouro</Badge>
          </div>
          <p className="text-slate-500 mt-1">
            Seus indicadores de satisfação de pacientes, tempo de resposta a setups e cumprimento de
            prazos.
          </p>
        </div>

        <Button
          variant="outline"
          className="border-slate-300"
          onClick={() =>
            toast({
              title: 'Relatório Completo de Qualidade',
              description: 'O relatório consolidado de métricas foi gerado em PDF.',
            })
          }
        >
          <ShieldCheck className="w-4 h-4 mr-2 text-emerald-600" /> Exportar Auditoria
        </Button>
      </div>

      {/* Cards de Destaque das Métricas Principais */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-emerald-200 bg-emerald-50/50 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-emerald-900">
              NPS dos Seus Pacientes
            </CardTitle>
            <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-emerald-950">{npsScore} / 100</div>
            <p className="text-xs text-emerald-700 mt-1 font-medium">
              Zona de Excelência ({totalReviews} avaliações)
            </p>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              SLA de Aprovação de Setup
            </CardTitle>
            <Zap className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">{slaLabApproval}%</div>
            <p className="text-xs text-slate-500 mt-1">Média de 18h após entrega do Lab</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Pontualidade na Agenda
            </CardTitle>
            <Clock className="h-5 w-5 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">{onTimeAppointments}%</div>
            <p className="text-xs text-slate-500 mt-1">Consultas iniciadas sem atraso</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Taxa de Adesão / Conclusão
            </CardTitle>
            <CheckCircle2 className="h-5 w-5 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">97.2%</div>
            <p className="text-xs text-slate-500 mt-1">Pacientes que concluem o protocolo</p>
          </CardContent>
        </Card>
      </div>

      {/* Grid: Composição de NPS + Feedbacks */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Distribuição do NPS */}
        <div className="md:col-span-5 space-y-4">
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-bold text-slate-900">
                Distribuição de Avaliações
              </CardTitle>
              <CardDescription>
                Baseado na pergunta: "Quanto você recomendaria o Dr. Roberto?"
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span className="flex items-center gap-1 text-emerald-700">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Promotores (Notas
                    9-10)
                  </span>
                  <span>{breakdownNPS.promotores}%</span>
                </div>
                <Progress value={breakdownNPS.promotores} className="h-2 bg-slate-100" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span className="flex items-center gap-1 text-amber-700">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Neutros (Notas 7-8)
                  </span>
                  <span>{breakdownNPS.neutros}%</span>
                </div>
                <Progress value={breakdownNPS.neutros} className="h-2 bg-slate-100" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span className="flex items-center gap-1 text-red-700">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500" /> Detratores (Notas 0-6)
                  </span>
                  <span>{breakdownNPS.detratores}%</span>
                </div>
                <Progress value={breakdownNPS.detratores} className="h-2 bg-slate-100" />
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-600 mt-4 leading-relaxed">
                💡 <strong>Dica MWS:</strong> Manter o NPS acima de 85 garante destaque prioritário
                nas buscas da sua cidade e recebimento contínuo de leads qualificados.
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Depoimentos Recentes de Pacientes */}
        <div className="md:col-span-7 space-y-4">
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-3 border-b border-slate-100">
              <CardTitle className="text-base font-bold text-slate-900">
                Depoimentos Recentes de Pacientes
              </CardTitle>
              <CardDescription>
                Comentários coletados após consultas e entrega de aparelhos
              </CardDescription>
            </CardHeader>
            <CardContent className="p-5 space-y-4">
              {patientFeedbacks.map((fb) => (
                <div
                  key={fb.id}
                  className="p-4 rounded-xl border border-slate-200 bg-white space-y-2 hover:border-emerald-300 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900">{fb.patientName}</span>
                      <Badge className="bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                        Nota {fb.score}/10
                      </Badge>
                    </div>
                    <span className="text-xs text-slate-400">{fb.date}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed italic">"{fb.comment}"</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
