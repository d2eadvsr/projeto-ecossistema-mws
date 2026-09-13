import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  Star,
  Clock,
  HeartHandshake,
  ShieldCheck,
  TrendingUp,
  MessageSquare,
  ThumbsUp,
  Award,
  Filter,
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export default function DentistQuality() {
  const { toast } = useToast()
  const [selectedRatingFilter, setSelectedRatingFilter] = useState<number | null>(null)

  const npsScore = 92
  const onTimeAppointments = 96.0
  const totalReviews = 64
  const averageRating = 4.9

  // Distribuição de notas 1 a 5
  const ratingDistribution = [
    { stars: 5, count: 56, percentage: 87.5 },
    { stars: 4, count: 6, percentage: 9.4 },
    { stars: 3, count: 2, percentage: 3.1 },
    { stars: 2, count: 0, percentage: 0.0 },
    { stars: 1, count: 0, percentage: 0.0 },
  ]

  // Distribuição clássica do NPS
  const breakdownNPS = {
    promotores: 88,
    neutros: 9,
    detratores: 3,
  }

  // Depoimentos recentes de pacientes
  const patientFeedbacks = [
    {
      id: 'fb-1',
      patientName: 'Mariana Duarte',
      score: 10,
      stars: 5,
      treatment: 'Magic Wire Superior & Inferior',
      comment:
        'Tratamento impecável! O ortodontista explicou tudo no escaneamento 3D e o fio interno invisível Magic Wire é extremamente discreto e confortável.',
      date: 'Há 3 dias',
      onTime: true,
    },
    {
      id: 'fb-2',
      patientName: 'Carlos Henrique',
      score: 9,
      stars: 5,
      treatment: 'Magic Wire Correção Lingual',
      comment:
        'Pontualidade excelente nas consultas e o dispositivo interno não atrapalhou meu dia a dia nem minha dicção nas reuniões de trabalho.',
      date: 'Há 1 semana',
      onTime: true,
    },
    {
      id: 'fb-3',
      patientName: 'Beatriz Vasconcelos',
      score: 10,
      stars: 5,
      treatment: 'Magic Wire 3ª Geração',
      comment:
        'Super satisfeita com a rápida evolução do alinhamento em poucos meses. O atendimento pontual e a atenção aos detalhes são nota mil!',
      date: 'Há 2 semanas',
      onTime: true,
    },
    {
      id: 'fb-4',
      patientName: 'Lucas Albuquerque',
      score: 9,
      stars: 4,
      treatment: 'Magic Wire Lingual',
      comment:
        'Excelente experiência desde a primeira consulta. O consultório sempre cumpre o horário agendado e o fio lingual é imperceptível.',
      date: 'Há 3 semanas',
      onTime: true,
    },
  ]

  const filteredFeedbacks = selectedRatingFilter
    ? patientFeedbacks.filter((fb) => fb.stars === selectedRatingFilter)
    : patientFeedbacks

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-6xl mx-auto animate-fade-in-up">
      {/* Topo / Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
              Qualidade (Ótica do Paciente)
            </h1>
            <Badge className="bg-emerald-100 text-emerald-800 font-semibold border-emerald-200">
              Selo Ouro de Experiência
            </Badge>
          </div>
          <p className="text-slate-500 mt-1 text-sm">
            Indicadores de satisfação, avaliações, pontualidade e percepção direta dos seus
            pacientes.
          </p>
        </div>

        <Button
          variant="outline"
          className="border-slate-300 hover:bg-slate-50"
          onClick={() =>
            toast({
              title: 'Relatório de Experiência do Paciente',
              description: 'O relatório consolidado de NPS e avaliações foi gerado em PDF.',
            })
          }
        >
          <ShieldCheck className="w-4 h-4 mr-2 text-emerald-600" /> Exportar Auditoria
        </Button>
      </div>

      {/* Cards de Métricas Principais (Apenas Ótica do Paciente) */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* NPS Score Geral */}
        <Card className="border-emerald-200 bg-emerald-50/50 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-emerald-900">
              NPS dos Pacientes
            </CardTitle>
            <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-emerald-950">{npsScore} / 100</div>
            <p className="text-xs text-emerald-700 mt-1 font-medium flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
              Zona de Excelência ({totalReviews} avaliações)
            </p>
          </CardContent>
        </Card>

        {/* Média de Estrelas */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-slate-700">
              Média de Avaliações
            </CardTitle>
            <Award className="h-5 w-5 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900 flex items-baseline gap-1">
              {averageRating}
              <span className="text-sm text-slate-500 font-normal">/ 5.0</span>
            </div>
            <div className="flex items-center gap-1 mt-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
              <span className="text-xs text-slate-500 ml-1">97% notas máximas</span>
            </div>
          </CardContent>
        </Card>

        {/* Pontualidade nas Consultas */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-slate-700">
              Pontualidade na Agenda
            </CardTitle>
            <Clock className="h-5 w-5 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">{onTimeAppointments}%</div>
            <p className="text-xs text-slate-500 mt-1">
              Consultas e manutenções iniciadas no horário
            </p>
          </CardContent>
        </Card>

        {/* Retenção & Recomendação */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-slate-700">
              Índice de Recomendação
            </CardTitle>
            <HeartHandshake className="h-5 w-5 text-rose-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">98%</div>
            <p className="text-xs text-slate-500 mt-1">
              Recomendam o ortodontista para amigos/familiares
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Grid: Composição de NPS & Distribuição de Notas + Depoimentos */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Coluna Esquerda: NPS e Distribuição de 1 a 5 estrelas */}
        <div className="lg:col-span-5 space-y-6">
          {/* Distribuição de Avaliações 1–5 */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-bold text-slate-900">
                    Distribuição de Avaliações (1 a 5)
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Classificação por estrelas atribuída pelos pacientes
                  </CardDescription>
                </div>
                {selectedRatingFilter && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs h-7 text-slate-500 hover:text-slate-900"
                    onClick={() => setSelectedRatingFilter(null)}
                  >
                    Limpar filtro
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {ratingDistribution.map((item) => (
                <div
                  key={item.stars}
                  onClick={() =>
                    setSelectedRatingFilter(selectedRatingFilter === item.stars ? null : item.stars)
                  }
                  className={`p-2 rounded-lg cursor-pointer transition-colors ${
                    selectedRatingFilter === item.stars
                      ? 'bg-amber-50 border border-amber-200'
                      : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-medium text-slate-700 mb-1">
                    <span className="flex items-center gap-1.5">
                      <span className="flex items-center text-amber-500 font-semibold">
                        {item.stars}{' '}
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 ml-0.5 inline" />
                      </span>
                      <span className="text-slate-400">({item.count})</span>
                    </span>
                    <span className="font-semibold text-slate-900">{item.percentage}%</span>
                  </div>
                  <Progress value={item.percentage} className="h-2 bg-slate-100" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Distribuição do NPS (Promotores, Neutros, Detratores) */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-bold text-slate-900">Segmentação NPS</CardTitle>
              <CardDescription className="text-xs">
                Baseado na pergunta: &ldquo;Em uma escala de 0 a 10, o quanto recomendaria o seu
                ortodontista?&rdquo;
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span className="flex items-center gap-1.5 text-emerald-700">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Promotores (Notas
                    9-10)
                  </span>
                  <span>{breakdownNPS.promotores}%</span>
                </div>
                <Progress value={breakdownNPS.promotores} className="h-2 bg-slate-100" />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span className="flex items-center gap-1.5 text-amber-700">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Neutros (Notas 7-8)
                  </span>
                  <span>{breakdownNPS.neutros}%</span>
                </div>
                <Progress value={breakdownNPS.neutros} className="h-2 bg-slate-100" />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span className="flex items-center gap-1.5 text-red-700">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500" /> Detratores (Notas 0-6)
                  </span>
                  <span>{breakdownNPS.detratores}%</span>
                </div>
                <Progress value={breakdownNPS.detratores} className="h-2 bg-slate-100" />
              </div>

              <div className="p-3 bg-emerald-50/70 rounded-lg border border-emerald-200 text-xs text-emerald-900 mt-4 leading-relaxed">
                <strong className="flex items-center gap-1 font-semibold mb-1">
                  <ThumbsUp className="w-3.5 h-3.5 text-emerald-600" /> Destaque de Qualidade
                </strong>
                Seu NPS de {npsScore} está no top 5% da rede Magic Wire. Ortodontistas nesta faixa
                recebem maior visibilidade na busca de especialistas da plataforma.
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Coluna Direita: Depoimentos Recentes de Pacientes */}
        <div className="lg:col-span-7 space-y-4">
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-3 border-b border-slate-100 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-primary" /> Depoimentos Recentes de
                  Pacientes
                </CardTitle>
                <CardDescription className="text-xs">
                  Feedbacks enviados por pacientes após consultas clínicas e check-ups
                </CardDescription>
              </div>
              <Badge variant="outline" className="text-slate-600 text-xs font-medium">
                {filteredFeedbacks.length} de {patientFeedbacks.length}
              </Badge>
            </CardHeader>
            <CardContent className="p-5 space-y-4">
              {filteredFeedbacks.length === 0 ? (
                <div className="text-center py-8 text-slate-500 text-sm">
                  Nenhum depoimento encontrado para o filtro selecionado.
                </div>
              ) : (
                filteredFeedbacks.map((fb) => (
                  <div
                    key={fb.id}
                    className="p-4 rounded-xl border border-slate-200 bg-white space-y-2 hover:border-emerald-300 hover:shadow-sm transition-all"
                  >
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-900">{fb.patientName}</span>
                        <div className="flex items-center">
                          {Array.from({ length: fb.stars }).map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                        <Badge className="bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                          NPS {fb.score}/10
                        </Badge>
                      </div>
                      <span className="text-xs text-slate-400">{fb.date}</span>
                    </div>

                    <p className="text-xs text-slate-700 leading-relaxed italic bg-slate-50/50 p-2.5 rounded-lg border border-slate-100">
                      &ldquo;{fb.comment}&rdquo;
                    </p>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                      <span className="text-slate-600 font-medium">Protocolo: {fb.treatment}</span>
                      {fb.onTime && (
                        <span className="flex items-center gap-1 text-emerald-600 font-medium">
                          <Clock className="w-3 h-3" /> Atendimento no horário
                        </span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
