import { useState } from 'react'
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
  Cpu,
  CheckCircle2,
  Clock,
  Search,
  Filter,
  ArrowRight,
  ShieldCheck,
  PackageCheck,
  Activity,
  Layers,
  Sparkles,
  Play,
  RotateCw,
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { RoboticProductionOrder, RoboticProductionStage, MOCK_ROBOTIC_ORDERS } from './mockData'

const STAGE_CONFIG: {
  stage: RoboticProductionStage
  title: string
  desc: string
  bg: string
  border: string
  badgeBg: string
  badgeText: string
  nextStage?: RoboticProductionStage
  nextLabel?: string
}[] = [
  {
    stage: 'dobagem_modelagem',
    title: '1. Dobragem & Modelagem Robótica',
    desc: 'Células CNC de alta precisão conformando os fios de NiTi Copper e TMA.',
    bg: 'bg-blue-50/50',
    border: 'border-blue-200',
    badgeBg: 'bg-blue-100',
    badgeText: 'text-blue-800',
    nextStage: 'acabamento',
    nextLabel: 'Enviar p/ Acabamento',
  },
  {
    stage: 'acabamento',
    title: '2. Acabamento & Eletropolimento',
    desc: 'Polimento eletroquímico e alívio de tensões térmicas do fio lingual.',
    bg: 'bg-amber-50/50',
    border: 'border-amber-200',
    badgeBg: 'bg-amber-100',
    badgeText: 'text-amber-800',
    nextStage: 'controle_qualidade',
    nextLabel: 'Enviar p/ Controle de Qualidade',
  },
  {
    stage: 'controle_qualidade',
    title: '3. Controle de Qualidade (CQ Laser)',
    desc: 'Inspeção dimensional a laser 3D e teste de resiliência elástica.',
    bg: 'bg-purple-50/50',
    border: 'border-purple-200',
    badgeBg: 'bg-purple-100',
    badgeText: 'text-purple-800',
    nextStage: 'pronto_expedicao',
    nextLabel: 'Aprovar CQ e Liberar Expedição',
  },
  {
    stage: 'pronto_expedicao',
    title: '4. Pronto para Expedição',
    desc: 'Acondicionado no kit estéril MWS com gabarito de colagem indireta.',
    bg: 'bg-emerald-50/50',
    border: 'border-emerald-200',
    badgeBg: 'bg-emerald-100',
    badgeText: 'text-emerald-800',
  },
]

export default function LabProduction() {
  const [orders, setOrders] = useState<RoboticProductionOrder[]>(MOCK_ROBOTIC_ORDERS)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedOrder, setSelectedOrder] = useState<RoboticProductionOrder | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)

  const { toast } = useToast()

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.caseId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.dentistName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.roboticCell.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  const handleAdvanceStage = (orderId: string, nextStage: RoboticProductionStage) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? {
              ...o,
              stage: nextStage,
              qualityCheckPassed: nextStage === 'pronto_expedicao' ? true : o.qualityCheckPassed,
            }
          : o,
      ),
    )

    toast({
      title: 'Etapa de Fabricação Atualizada!',
      description: `Lote de Fios Mágicos ${orderId} avançou para a etapa de produção.`,
    })

    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder((prev) => (prev ? { ...prev, stage: nextStage } : null))
    }
  }

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto animate-fade-in-up">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Manufatura Robótica CNC de Fios Mágicos
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 mt-1">
            Produção dos Fios Mágicos MWS
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">
            Fila de fabricação robótica dos fios linguais customizados a partir dos planejamentos
            aprovados pelos ortodontistas.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge className="bg-slate-900 text-white text-xs px-3 py-1">
            Total em Produção: {orders.length} lotes
          </Badge>
        </div>
      </div>

      {/* Caixa Informativa sobre a Tecnologia dos Fios Mágicos */}
      <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/40 flex items-start gap-3 text-xs text-emerald-950">
        <Cpu className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold text-sm">Tecnologia Lingual Robótica de 3ª Geração:</p>
          <p className="text-emerald-900 leading-relaxed">
            Os <strong>Fios Mágicos MWS</strong> são fabricados a partir de ligas avançadas de
            Níquel-Titânio enriquecido com Cobre (Copper NiTi) e Titânio-Molibdênio (TMA). Dobrados
            por células robóticas multieixo, são instalados pelo lado interno dos dentes, garantindo
            estética invisível real e movimentação biomecânica contínua com forças ultra-leves e
            biocompatíveis.
          </p>
        </div>
      </div>

      {/* Busca */}
      <div className="bg-white p-3 rounded-xl border border-slate-200 flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Buscar por lote (ROB-2026-...), caso, paciente, dentista ou célula robótica..."
            className="pl-9 h-9 text-xs"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Esteira de 4 Etapas de Produção Robótica */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 items-start">
        {STAGE_CONFIG.map((col) => {
          const stageOrders = filteredOrders.filter((o) => o.stage === col.stage)
          return (
            <div
              key={col.stage}
              className={`rounded-xl border ${col.border} ${col.bg} p-3.5 flex flex-col min-h-[500px] shadow-xs`}
            >
              {/* Topo da Etapa */}
              <div className="pb-3 border-b border-slate-200/70 mb-3 space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-xs text-slate-900 leading-tight">{col.title}</h3>
                  <Badge
                    variant="outline"
                    className={`${col.badgeBg} ${col.badgeText} text-xs font-bold`}
                  >
                    {stageOrders.length}
                  </Badge>
                </div>
                <p className="text-[10px] text-slate-500 line-clamp-1">{col.desc}</p>
              </div>

              {/* Lotes na Etapa */}
              <div className="space-y-3 flex-1 overflow-y-auto max-h-[calc(100vh-320px)] pr-1">
                {stageOrders.map((order) => (
                  <Card
                    key={order.id}
                    className="border-slate-200 shadow-xs hover:shadow-md transition-all bg-white cursor-pointer group"
                    onClick={() => {
                      setSelectedOrder(order)
                      setIsDetailOpen(true)
                    }}
                  >
                    <CardContent className="p-3.5 space-y-2.5">
                      {/* Código e Prioridade */}
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          {order.id}
                        </span>
                        {order.priority === 'urgente' ? (
                          <Badge className="bg-red-600 text-white text-[10px]">Urgente</Badge>
                        ) : order.priority === 'alta' ? (
                          <Badge className="bg-amber-600 text-white text-[10px]">Alta</Badge>
                        ) : (
                          <Badge variant="outline" className="text-[10px] text-slate-500">
                            Normal
                          </Badge>
                        )}
                      </div>

                      {/* Paciente e Caso */}
                      <div>
                        <h4 className="font-bold text-xs text-slate-900 group-hover:text-emerald-700 transition-colors">
                          {order.patientName}
                        </h4>
                        <p className="text-[11px] text-slate-500">
                          Caso: <span className="font-mono font-medium">{order.caseId}</span>
                        </p>
                        <p className="text-[10px] text-slate-400">
                          {order.dentistName} ({order.dentistCity})
                        </p>
                      </div>

                      {/* Dados Técnicos dos Fios */}
                      <div className="p-2 rounded bg-slate-50 border border-slate-100 text-[10px] space-y-0.5">
                        <div className="text-slate-700 font-semibold line-clamp-1">
                          {order.wireType}
                        </div>
                        <div className="text-slate-500">Sup: {order.upperWireGauge}</div>
                        <div className="text-slate-500">Inf: {order.lowerWireGauge}</div>
                      </div>

                      {/* Célula e Responsável */}
                      <div className="text-[10px] text-slate-500 flex items-center justify-between pt-1 border-t border-slate-100">
                        <span className="truncate max-w-[130px] font-medium text-slate-700">
                          {order.roboticCell}
                        </span>
                        <span>{order.technicianInCharge}</span>
                      </div>

                      {/* Ação de Avançar Etapa */}
                      {col.nextStage && (
                        <Button
                          size="sm"
                          className="w-full h-7 text-[11px] bg-slate-900 hover:bg-emerald-700 text-white transition-colors"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleAdvanceStage(order.id, col.nextStage!)
                          }}
                        >
                          <Play className="w-3 h-3 mr-1" /> {col.nextLabel}
                        </Button>
                      )}

                      {col.stage === 'pronto_expedicao' && (
                        <div className="w-full text-center py-1 text-[10px] font-bold text-emerald-800 bg-emerald-100/70 rounded flex items-center justify-center gap-1 border border-emerald-300">
                          <PackageCheck className="w-3.5 h-3.5" />
                          Pronto p/ Expedição (Time ADM)
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}

                {stageOrders.length === 0 && (
                  <div className="text-center py-10 text-xs text-slate-400 border border-dashed border-slate-200 rounded-lg">
                    Nenhum lote nesta etapa
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Modal de Detalhe da Ordem Robótica */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-base font-bold flex items-center gap-2">
              <Cpu className="w-4 h-4 text-emerald-600" />
              Ordem de Fabricação Robótica {selectedOrder?.id}
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-500">
              Vínculo direto com Caso Clínico {selectedOrder?.caseId}
            </DialogDescription>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-3 pt-2 text-xs">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1.5">
                <p>
                  <strong>Paciente:</strong> {selectedOrder.patientName}
                </p>
                <p>
                  <strong>Ortodontista:</strong> {selectedOrder.dentistName} (
                  {selectedOrder.dentistCity})
                </p>
                <p>
                  <strong>Protocolo:</strong> {selectedOrder.protocol}
                </p>
                <p>
                  <strong>Célula Robótica Atribuída:</strong> {selectedOrder.roboticCell}
                </p>
                <p>
                  <strong>Responsável:</strong> {selectedOrder.technicianInCharge}
                </p>
              </div>

              <div className="p-3 bg-emerald-50/60 rounded-lg border border-emerald-200 space-y-1">
                <span className="font-bold text-emerald-950 block text-[11px]">
                  Fios Mágicos Customizados (Lado Interno / Lingual):
                </span>
                <p className="text-emerald-900">
                  <strong>Tipo de Liga:</strong> {selectedOrder.wireType}
                </p>
                <p className="text-emerald-900">
                  <strong>Arcada Superior:</strong> {selectedOrder.upperWireGauge}
                </p>
                <p className="text-emerald-900">
                  <strong>Arcada Inferior:</strong> {selectedOrder.lowerWireGauge}
                </p>
              </div>

              <div className="flex justify-between items-center text-slate-500 text-[11px]">
                <span>Início: {selectedOrder.startedAt}</span>
                <span>Previsão: {selectedOrder.estimatedCompletion}</span>
              </div>

              <DialogFooter className="pt-2">
                <Button variant="outline" size="sm" onClick={() => setIsDetailOpen(false)}>
                  Fechar
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
