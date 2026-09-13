import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  Zap,
  Clock,
  Sparkles,
  Layers,
  GraduationCap,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Send,
  Star,
  Activity,
  Award,
  Lock,
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'

export default function DentistSlas() {
  const { toast } = useToast()

  // SLAs de Tempo de Resposta e Interação
  const slaApprovalRate = 98.5
  const avgApprovalHours = 18.2
  const targetApprovalHours = 24.0

  const labTurnaroundHours = 44.5
  const labTurnaroundDays = 1.85
  const targetLabTurnaroundHours = 48.0
  const labComplianceRate = 96.8

  // NPS Atribuído pelo Ortodontista ao Ecossistema (0-10)
  const [mentorScore, setMentorScore] = useState<number>(10)
  const [magicWireScore, setMagicWireScore] = useState<number>(10)
  const [ecosystemScore, setEcosystemScore] = useState<number>(9)
  const [feedbackNote, setFeedbackNote] = useState<string>('')
  const [isEvaluationOpen, setIsEvaluationOpen] = useState<boolean>(false)

  const handleSaveEvaluation = () => {
    setIsEvaluationOpen(false)
    toast({
      title: 'Avaliação enviada com sucesso!',
      description: 'Seu feedback sobre Mentor, Magic Wire e o Ecossistema foi registrado.',
    })
  }

  // Histórico recente de ciclos de SLA dos Casos
  const recentCasesSla = [
    {
      id: 'MW-1042',
      patientName: 'Mariana Duarte',
      labReceived: '2024-10-12',
      labSentTime: '38h (Meta: 48h)',
      labStatus: 'no_prazo',
      dentistReviewTime: '12h (Meta: 24h)',
      dentistStatus: 'aprovado_rapido',
      type: 'Setup 3D Lingual',
    },
    {
      id: 'MW-1039',
      patientName: 'Carlos Henrique',
      labReceived: '2024-10-08',
      labSentTime: '42h (Meta: 48h)',
      labStatus: 'no_prazo',
      dentistReviewTime: '16h (Meta: 24h)',
      dentistStatus: 'aprovado_rapido',
      type: 'Fio Lingual 3ª Geração',
    },
    {
      id: 'MW-1035',
      patientName: 'Beatriz Vasconcelos',
      labReceived: '2024-10-01',
      labSentTime: '46h (Meta: 48h)',
      labStatus: 'no_prazo',
      dentistReviewTime: '22h (Meta: 24h)',
      dentistStatus: 'aprovado_no_prazo',
      type: 'Ajuste Fino & Contenção',
    },
    {
      id: 'MW-1028',
      patientName: 'Rodrigo Medeiros',
      labReceived: '2024-09-27',
      labSentTime: '51h (Meta: 48h)',
      labStatus: 'pequeno_atraso',
      dentistReviewTime: '14h (Meta: 24h)',
      dentistStatus: 'aprovado_rapido',
      type: 'Revisão de Oclusão',
    },
  ]

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-6xl mx-auto animate-fade-in-up">
      {/* Topo / Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
              SLAs & Resultados
            </h1>
            <Badge className="bg-blue-100 text-blue-800 font-semibold border-blue-200">
              Ótica do Ecossistema MWS
            </Badge>
          </div>
          <p className="text-slate-500 mt-1 text-sm">
            Indicadores da relação Ortodontista ↔ Ecossistema: tempos de validação de setup, entrega
            do laboratório e sua avaliação institucional.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Dialog open={isEvaluationOpen} onOpenChange={setIsEvaluationOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90 text-white font-medium">
                <Send className="w-4 h-4 mr-2" /> Avaliar o Ecossistema
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[520px]">
              <DialogHeader>
                <DialogTitle>Avaliação do Ortodontista ao Ecossistema</DialogTitle>
                <DialogDescription>
                  Seu feedback contínuo calibra a qualidade dos mentores, do laboratório e da
                  tecnologia Magic Wire.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-3">
                {/* Nota ao Mentor */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                    <span className="flex items-center gap-1.5">
                      <GraduationCap className="w-4 h-4 text-primary" /> (a) Seu Mentor Clínico
                    </span>
                    <span className="text-primary font-bold text-sm">{mentorScore} / 10</span>
                  </div>
                  <div className="flex justify-between gap-1">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setMentorScore(num)}
                        className={`w-8 h-8 rounded text-xs font-bold transition-all ${
                          mentorScore === num
                            ? 'bg-primary text-white ring-2 ring-primary ring-offset-1'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Nota à Tecnologia Magic Wire */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-500" /> (b) Tecnologia Magic Wire (Fio
                      Lingual)
                    </span>
                    <span className="text-amber-600 font-bold text-sm">{magicWireScore} / 10</span>
                  </div>
                  <div className="flex justify-between gap-1">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setMagicWireScore(num)}
                        className={`w-8 h-8 rounded text-xs font-bold transition-all ${
                          magicWireScore === num
                            ? 'bg-amber-500 text-white ring-2 ring-amber-500 ring-offset-1'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Nota ao Ecossistema Global */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                    <span className="flex items-center gap-1.5">
                      <Layers className="w-4 h-4 text-emerald-600" /> (c) Ecossistema Magic Wire
                      Geral
                    </span>
                    <span className="text-emerald-700 font-bold text-sm">
                      {ecosystemScore} / 10
                    </span>
                  </div>
                  <div className="flex justify-between gap-1">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setEcosystemScore(num)}
                        className={`w-8 h-8 rounded text-xs font-bold transition-all ${
                          ecosystemScore === num
                            ? 'bg-emerald-600 text-white ring-2 ring-emerald-600 ring-offset-1'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Comentário Opcional */}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-700">
                    Observações ou sugestões de melhoria (opcional):
                  </label>
                  <Textarea
                    placeholder="Conte como tem sido a troca técnica com seu mentor, a precisão do fio lingual ou a logística..."
                    value={feedbackNote}
                    onChange={(e) => setFeedbackNote(e.target.value)}
                    className="text-xs h-20 resize-none"
                  />
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsEvaluationOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleSaveEvaluation}>Confirmar Avaliação</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Button
            variant="outline"
            className="border-slate-300"
            onClick={() =>
              toast({
                title: 'Exportação de SLAs',
                description: 'Relatório de tempos de aprovação e métricas do ecossistema baixado.',
              })
            }
          >
            <ShieldCheck className="w-4 h-4 mr-2 text-primary" /> Exportar SLAs
          </Button>
        </div>
      </div>

      {/* Cards de Métricas Principais (SLA Ortodontista, SLA Lab, NPS Atribuído) */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* SLA de Aprovação do Ortodontista */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-slate-700">
              SLA do Ortodontista
            </CardTitle>
            <Zap className="h-5 w-5 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">{slaApprovalRate}%</div>
            <p className="text-xs text-slate-500 mt-1 font-medium flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" /> Média de {avgApprovalHours}h (Meta:
              &lt;{targetApprovalHours}h)
            </p>
          </CardContent>
        </Card>

        {/* SLA do Laboratório */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-slate-700">
              SLA do Laboratório
            </CardTitle>
            <Clock className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">{labTurnaroundHours}h</div>
            <p className="text-xs text-slate-500 mt-1 font-medium flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              {labComplianceRate}% dentro do prazo ({labTurnaroundDays} dias)
            </p>
          </CardContent>
        </Card>

        {/* NPS do Ortodontista -> Mentor */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-slate-700">Nota ao Mentor</CardTitle>
            <GraduationCap className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">
              {mentorScore} <span className="text-sm text-slate-400 font-normal">/ 10</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">Mentoria clínica e alinhamento de conduta</p>
          </CardContent>
        </Card>

        {/* NPS Ortodontista -> Magic Wire & Ecossistema */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-slate-700">
              NPS Magic Wire & Rede
            </CardTitle>
            <Sparkles className="h-5 w-5 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-emerald-700">
              {((magicWireScore + ecosystemScore) / 2).toFixed(1)}{' '}
              <span className="text-sm text-slate-400 font-normal">/ 10</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Tecnologia {magicWireScore}/10 • Ecossistema {ecosystemScore}/10
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Seção 1: Detalhamento dos SLAs Bilaterais (Ortodontista <-> Laboratório) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Painel de SLA do Ortodontista */}
        <div className="lg:col-span-6 space-y-4">
          <Card className="border-slate-200 shadow-sm h-full flex flex-col justify-between">
            <div>
              <CardHeader className="pb-3 border-b border-slate-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
                      <Zap className="w-5 h-5" />
                    </div>
                    <div>
                      <CardTitle className="text-base font-bold text-slate-900">
                        SLA de Aprovação do Ortodontista
                      </CardTitle>
                      <CardDescription className="text-xs">
                        Tempo decorrido entre a entrega do planejamento pelo Lab e sua validação
                      </CardDescription>
                    </div>
                  </div>
                  <Badge className="bg-emerald-100 text-emerald-800 text-xs">Excelente</Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-4 space-y-4">
                <div className="p-4 bg-slate-50 rounded-xl space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-600 font-medium">Tempo Médio de Validação:</span>
                    <span className="text-slate-900 font-bold">{avgApprovalHours} horas úteis</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-600 font-medium">
                      Meta Estabelecida no Contrato:
                    </span>
                    <span className="text-slate-900 font-bold">Até 24 horas</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-600 font-medium">Taxa de Aprovação no Prazo:</span>
                    <span className="text-emerald-700 font-bold">{slaApprovalRate}% dos casos</span>
                  </div>
                  <Progress value={slaApprovalRate} className="h-2 bg-slate-200" />
                </div>

                <div className="space-y-2 text-xs text-slate-600">
                  <p className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>
                      Sua rapidez na validação acelera o envio do fio lingual robotizado pelo
                      laboratório, encurtando o tempo de início do tratamento do paciente.
                    </span>
                  </p>
                </div>
              </CardContent>
            </div>

            <div className="p-4 bg-amber-50/60 border-t border-amber-100 text-[11px] text-amber-800 rounded-b-xl">
              💡 <strong>Impacto no Fluxo:</strong> Ortodontistas que aprovam em menos de 24h ganham
              prioridade no lote de fresagem e dobra robotizada do laboratório.
            </div>
          </Card>
        </div>

        {/* Painel de SLA do Laboratório */}
        <div className="lg:col-span-6 space-y-4">
          <Card className="border-slate-200 shadow-sm h-full flex flex-col justify-between">
            <div>
              <CardHeader className="pb-3 border-b border-slate-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <CardTitle className="text-base font-bold text-slate-900">
                        SLA de Entrega do Laboratório
                      </CardTitle>
                      <CardDescription className="text-xs">
                        Tempo que o Laboratório MWS leva para gerar e disponibilizar o planejamento
                        3D
                      </CardDescription>
                    </div>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800 text-xs">Meta &lt;48h</Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-4 space-y-4">
                <div className="p-4 bg-slate-50 rounded-xl space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-600 font-medium">
                      Tempo Médio de Envio do Setup:
                    </span>
                    <span className="text-slate-900 font-bold">{labTurnaroundHours} horas</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-600 font-medium">Meta Global MWS:</span>
                    <span className="text-slate-900 font-bold">48 horas úteis</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-600 font-medium">
                      Casos Entregues dentro do SLA:
                    </span>
                    <span className="text-blue-700 font-bold">{labComplianceRate}%</span>
                  </div>
                  <Progress value={labComplianceRate} className="h-2 bg-slate-200" />
                </div>

                <div className="space-y-2 text-xs text-slate-600">
                  <p className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>
                      O laboratório central monitora fila contínua de escaneamentos com auditoria do
                      Mentor Clínico antes da liberação final.
                    </span>
                  </p>
                </div>
              </CardContent>
            </div>

            <div className="p-4 bg-blue-50/60 border-t border-blue-100 text-[11px] text-blue-800 rounded-b-xl">
              🛡️ <strong>Garantia de Qualidade:</strong> Se o Laboratório exceder 48h sem
              justificativa técnica, o caso é sinalizado com tag prioritária na produção
              automatizada.
            </div>
          </Card>
        </div>
      </div>

      {/* Seção 2: Tabela de Casos Recentes com SLAs Bilaterais */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-bold text-slate-900">
            Acompanhamento de Ciclos por Caso Clínico
          </CardTitle>
          <CardDescription className="text-xs">
            Registro dos últimos planejamentos transitados entre o Laboratório e a validação do
            Ortodontista
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-semibold bg-slate-50/60">
                  <th className="py-2.5 px-3">Código</th>
                  <th className="py-2.5 px-3">Paciente</th>
                  <th className="py-2.5 px-3">Etapa</th>
                  <th className="py-2.5 px-3">Envio do Lab (Meta 48h)</th>
                  <th className="py-2.5 px-3">Aprovação do Ortodontista (Meta 24h)</th>
                  <th className="py-2.5 px-3 text-right">Status do Ciclo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentCasesSla.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-3 font-mono font-semibold text-slate-900">{c.id}</td>
                    <td className="py-3 px-3 font-medium text-slate-800">{c.patientName}</td>
                    <td className="py-3 px-3 text-slate-600">{c.type}</td>
                    <td className="py-3 px-3">
                      <span
                        className={`inline-flex items-center gap-1 font-medium ${
                          c.labStatus === 'no_prazo' ? 'text-emerald-700' : 'text-amber-700'
                        }`}
                      >
                        {c.labStatus === 'no_prazo' ? (
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        ) : (
                          <AlertCircle className="w-3.5 h-3.5" />
                        )}
                        {c.labSentTime}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span className="inline-flex items-center gap-1 text-emerald-700 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {c.dentistReviewTime}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <Badge className="bg-slate-100 text-slate-700 font-medium border-slate-200">
                        Validado & Em Produção
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Seção 3: NPS Atribuído pelo Ortodontista ao Ecossistema */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="pb-3 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <CardTitle className="text-base font-bold text-slate-900">
              NPS Atribuído pelo Ortodontista ao Ecossistema
            </CardTitle>
            <CardDescription className="text-xs">
              Sua percepção sobre mentoria clínica, maturidade do produto e ecossistema geral
            </CardDescription>
          </div>
          <Button
            size="sm"
            variant="outline"
            className="text-xs border-primary/30 text-primary hover:bg-primary/5"
            onClick={() => setIsEvaluationOpen(true)}
          >
            Atualizar Minhas Notas
          </Button>
        </CardHeader>
        <CardContent className="pt-5">
          <div className="grid gap-4 sm:grid-cols-3">
            {/* Bloco Mentor */}
            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-primary" /> (a) Mentor Clínico
                </span>
                <Badge className="bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                  {mentorScore}/10
                </Badge>
              </div>
              <div className="text-lg font-bold text-slate-900">Dr. Paulo Arantes (Mentor)</div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Avaliação da agilidade e qualidade técnica das orientações fornecidas na elaboração
                dos planejamentos dos casos clínicos.
              </p>
              <div className="pt-2">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-xs font-semibold text-slate-700 ml-1">
                    Zona de Excelência
                  </span>
                </div>
              </div>
            </div>

            {/* Bloco Tecnologia Magic Wire */}
            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500" /> (b) Fio Magic Wire
                </span>
                <Badge className="bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                  {magicWireScore}/10
                </Badge>
              </div>
              <div className="text-lg font-bold text-slate-900">
                Fio Interno Invisível (3ª Geração)
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Avaliação da precisão biomecânica, passividade do fio lingual, conformação robótica
                e facilidade de colagem clínica.
              </p>
              <div className="pt-2">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-xs font-semibold text-slate-700 ml-1">Precisão 100%</span>
                </div>
              </div>
            </div>

            {/* Bloco Ecossistema como um todo */}
            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-emerald-600" /> (c) Ecossistema Geral
                </span>
                <Badge className="bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                  {ecosystemScore}/10
                </Badge>
              </div>
              <div className="text-lg font-bold text-slate-900">Plataforma & Parcerias MWS</div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Avaliação da plataforma de gestão, splits financeiros, logística de envio, suporte
                ao cliente e ferramentas integradas.
              </p>
              <div className="pt-2">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < 4 ? 'fill-amber-400 text-amber-400' : 'fill-slate-200 text-slate-200'}`}
                    />
                  ))}
                  <span className="text-xs font-semibold text-slate-700 ml-1">Promotor Sênior</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Seção 4: Outros Indicadores Futuros (Placeholders informativos / Em Breve) */}
      <Card className="border-dashed border-slate-300 bg-slate-50/50 shadow-none">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-slate-500" />
            <CardTitle className="text-base font-bold text-slate-800">
              Outros Indicadores Futuros (Roadmap do Ecossistema)
            </CardTitle>
          </div>
          <CardDescription className="text-xs">
            Métricas estratégicas em fase de homologação técnica pelo comitê de governança MWS
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* Score do Licenciado */}
            <div className="p-4 rounded-xl border border-slate-200 bg-white/80 space-y-2 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-primary" /> Score do Licenciado MWS
                </span>
                <Badge
                  variant="secondary"
                  className="text-[10px] bg-slate-100 text-slate-600 font-medium"
                >
                  Em Breve
                </Badge>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Índice global de maturidade do ortodontista licenciado, combinando volume clínico,
                engajamento na Escola MWS e auditoria diagnóstica.
              </p>
              <div className="pt-2 flex items-center gap-2 text-[11px] text-slate-400">
                <Lock className="w-3.5 h-3.5" /> Previsto para Release Q1 2025
              </div>
            </div>

            {/* Aderência a Preço-Alvo */}
            <div className="p-4 rounded-xl border border-slate-200 bg-white/80 space-y-2 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-emerald-600" /> Aderência a Preço-Alvo
                </span>
                <Badge
                  variant="secondary"
                  className="text-[10px] bg-slate-100 text-slate-600 font-medium"
                >
                  Em Breve
                </Badge>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Conformidade com a faixa de precificação sugerida para tratamentos Magic Wire de 3ª
                geração na sua praça geográfica.
              </p>
              <div className="pt-2 flex items-center gap-2 text-[11px] text-slate-400">
                <Lock className="w-3.5 h-3.5" /> Em teste piloto na região Sudeste
              </div>
            </div>

            {/* Eficiência Biomecânica Comparada */}
            <div className="p-4 rounded-xl border border-slate-200 bg-white/80 space-y-2 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500" /> Eficiência Biomecânica Comparada
                </span>
                <Badge
                  variant="secondary"
                  className="text-[10px] bg-slate-100 text-slate-600 font-medium"
                >
                  Em Breve
                </Badge>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Benchmarking de velocidade de alinhamento com fio lingual versus médias da rede MWS
                por complexidade de oclusão.
              </p>
              <div className="pt-2 flex items-center gap-2 text-[11px] text-slate-400">
                <Lock className="w-3.5 h-3.5" /> Integração com Prontuário 3D
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
