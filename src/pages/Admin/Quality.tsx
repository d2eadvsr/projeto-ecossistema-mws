import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  ShieldCheck,
  Star,
  CheckCircle2,
  Clock,
  AlertTriangle,
  TrendingUp,
  MessageSquare,
  Users,
  Building,
} from 'lucide-react'
import { NPSRecord, MOCK_NPS_RECORDS } from './mockData'

export default function AdminQuality() {
  const [npsRecords] = useState<NPSRecord[]>(MOCK_NPS_RECORDS)

  // Métricas de Qualidade e SLAs
  const npsGlobalScore = 88 // Zona de Excelência
  const slaLabEntregaMedia = '4.2 dias' // Meta: 5 dias
  const slaAdmResposta = '2.4 horas' // Meta: 4 horas
  const taxaConformidadeCasos = '98.5%'

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto animate-fade-in-up">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
            Dashboard Global de Qualidade & SLAs
          </h1>
          <p className="text-slate-500 mt-1">
            Monitoramento do NPS contínuo dos pacientes (1ª consulta, manutenções e conclusão) e
            tempos de resposta da rede.
          </p>
        </div>
      </div>

      {/* 4 Caixas de Métricas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-emerald-200 bg-emerald-50/50 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium text-emerald-800">
              NPS Global da Rede
            </CardTitle>
            <Star className="w-4 h-4 text-emerald-600 fill-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-emerald-950">{npsGlobalScore}</div>
            <p className="text-xs text-emerald-700 mt-1 font-medium flex items-center">
              <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Zona de Excelência (85+)
            </p>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium text-slate-600">
              SLA Médio do Laboratório
            </CardTitle>
            <Clock className="w-4 h-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">{slaLabEntregaMedia}</div>
            <p className="text-xs text-slate-500 mt-1">Meta contratual: até 5 dias úteis</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium text-slate-600">
              Tempo de Resposta ADM
            </CardTitle>
            <Clock className="w-4 h-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">{slaAdmResposta}</div>
            <p className="text-xs text-slate-500 mt-1">Aprovação de fichas e mobilidade</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium text-slate-600">
              Taxa de Conformidade Técnica
            </CardTitle>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">{taxaConformidadeCasos}</div>
            <p className="text-xs text-slate-500 mt-1">Fios customizados sem refação</p>
          </CardContent>
        </Card>
      </div>

      {/* Gráfico / Distribuição por Etapas de Avaliação (Planilha: b16 1ª consulta, b19 NPS contínuo, b21 NPS final) */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="pb-3 border-b border-slate-100">
          <CardTitle className="text-base font-bold text-slate-900">
            Jornada de Avaliação do Paciente (NPS por Etapa)
          </CardTitle>
          <CardDescription className="text-xs text-slate-500">
            Pontuações coletadas no App do Paciente em cada marco do tratamento Magic Wire
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 text-center space-y-1">
              <span className="text-xs text-slate-500 font-medium">
                Ref. b16 • 1ª Consulta e Instalação
              </span>
              <p className="text-3xl font-bold text-slate-900">89.4</p>
              <Badge className="bg-emerald-100 text-emerald-800 text-[10px]">Excelência</Badge>
              <p className="text-[11px] text-slate-400 mt-1">
                Primeiras impressões e conforto inicial
              </p>
            </div>

            <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/50 text-center space-y-1">
              <span className="text-xs text-blue-800 font-medium">
                Ref. b19 • Manutenções Periódicas
              </span>
              <p className="text-3xl font-bold text-blue-900">87.1</p>
              <Badge className="bg-blue-100 text-blue-800 text-[10px]">Excelência</Badge>
              <p className="text-[11px] text-blue-600 mt-1">Acompanhamento contínuo da evolução</p>
            </div>

            <div className="p-4 rounded-xl border border-purple-200 bg-purple-50/50 text-center space-y-1">
              <span className="text-xs text-purple-800 font-medium">
                Ref. b21 • Conclusão do Tratamento
              </span>
              <p className="text-3xl font-bold text-purple-900">92.0</p>
              <Badge className="bg-purple-100 text-purple-800 text-[10px]">Excelência Máxima</Badge>
              <p className="text-[11px] text-purple-600 mt-1">
                Resultado final estético e funcional
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Feed de Avaliações Recentes com Comentários */}
      <Card className="border-slate-200 shadow-sm overflow-hidden">
        <CardHeader className="pb-3 border-b border-slate-100">
          <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-emerald-600" /> Avaliações Recentes dos Pacientes
            da Rede
          </CardTitle>
          <CardDescription className="text-xs text-slate-500">
            Feed em tempo real dos feedbacks deixados no App do Paciente
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0 divide-y divide-slate-100">
          {npsRecords.map((r) => (
            <div
              key={r.id}
              className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-start justify-between gap-3 hover:bg-slate-50/60 transition-colors"
            >
              <div className="space-y-1 max-w-2xl">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-slate-900 text-sm">{r.patientName}</span>
                  <span className="text-xs text-slate-400">• Atendido por</span>
                  <span className="text-xs font-medium text-emerald-700">{r.dentistName}</span>
                  <Badge variant="outline" className="text-[10px] bg-slate-50">
                    {r.type}
                  </Badge>
                </div>
                <p className="text-xs text-slate-700 italic bg-slate-50 p-2.5 rounded border border-slate-200/70">
                  "{r.comment}"
                </p>
                <span className="text-[10px] text-slate-400 block">{r.date}</span>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-center">
                <div className="px-3 py-1.5 rounded-lg bg-emerald-100 text-emerald-900 font-bold text-sm flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" />
                  Nota {r.rating}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
