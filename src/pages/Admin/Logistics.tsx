import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Package,
  Truck,
  CheckCircle2,
  Clock,
  Search,
  MapPin,
  ExternalLink,
  ShieldCheck,
  Send,
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { AdminShipment, MOCK_ADMIN_SHIPMENTS } from './mockData'

export default function AdminLogistics() {
  const [shipments, setShipments] = useState<AdminShipment[]>(MOCK_ADMIN_SHIPMENTS)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const { toast } = useToast()

  const countAguardando = shipments.filter((s) => s.status === 'aguardando_liberacao').length
  const countAprovado = shipments.filter((s) => s.status === 'aprovado').length
  const countTransporte = shipments.filter((s) => s.status === 'em_transporte').length
  const countEntregue = shipments.filter((s) => s.status === 'entregue').length

  const filteredShipments = shipments.filter((s) => {
    const matchesSearch =
      s.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.dentistName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.trackingCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.items.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.destinationCity.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || s.status === statusFilter
    return matchesSearch && matchesStatus
  })

  // Ação administrativa: Aprovar liberação de envio de insumos/Fios Mágicos
  const handleApproveShipment = (shipmentId: string, patientName: string) => {
    setShipments((prev) =>
      prev.map((s) =>
        s.id === shipmentId
          ? {
              ...s,
              status: 'aprovado',
              dispatchDate: new Date().toLocaleDateString('pt-BR'),
            }
          : s,
      ),
    )
    toast({
      title: 'Envio de Fio Mágico Aprovado!',
      description: `O kit customizado para ${patientName} foi liberado para expedição imediata com rastreamento Sedex.`,
    })
  }

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto animate-fade-in-up">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
            Logística & Expedição de Fios Mágicos
          </h1>
          <p className="text-slate-500 mt-1">
            Gestão logística central: aprovação de envio de insumos, fios customizados robóticos e
            rastreamento para consultórios.
          </p>
        </div>
      </div>

      {/* Caixas de Métricas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-amber-200 bg-amber-50/40">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-amber-800">Aguardando Liberação ADM</span>
              <Clock className="w-4 h-4 text-amber-600" />
            </div>
            <p className="text-2xl font-bold text-amber-900 mt-2">{countAguardando}</p>
            <p className="text-[11px] text-amber-700 mt-1">Demanda conferência e aprovação</p>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50/40">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-blue-800">Liberados / Em Preparo</span>
              <Package className="w-4 h-4 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-blue-900 mt-2">{countAprovado}</p>
            <p className="text-[11px] text-blue-700 mt-1">Prontos para coleta da transportadora</p>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50/40">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-purple-800">Em Transporte Ativo</span>
              <Truck className="w-4 h-4 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-purple-900 mt-2">{countTransporte}</p>
            <p className="text-[11px] text-purple-700 mt-1">Em trânsito com rastreamento ativo</p>
          </CardContent>
        </Card>

        <Card className="border-emerald-200 bg-emerald-50/40">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-emerald-800">Entregues no Consultório</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-2xl font-bold text-emerald-900 mt-2">{countEntregue}</p>
            <p className="text-[11px] text-emerald-700 mt-1">Aparelhos prontos para instalação</p>
          </CardContent>
        </Card>
      </div>

      {/* Barra de Filtros */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Buscar por paciente, dentista, código de rastreio..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <Button
            variant={statusFilter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setStatusFilter('all')}
            className={statusFilter === 'all' ? 'bg-slate-900 text-xs' : 'text-xs'}
          >
            Todos ({shipments.length})
          </Button>
          <Button
            variant={statusFilter === 'aguardando_liberacao' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setStatusFilter('aguardando_liberacao')}
            className="text-xs"
          >
            Aguardando Liberação
          </Button>
          <Button
            variant={statusFilter === 'em_transporte' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setStatusFilter('em_transporte')}
            className="text-xs"
          >
            Em Transporte
          </Button>
          <Button
            variant={statusFilter === 'entregue' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setStatusFilter('entregue')}
            className="text-xs"
          >
            Entregues
          </Button>
        </div>
      </div>

      {/* Lista de Remessas */}
      <div className="grid gap-4">
        {filteredShipments.map((s) => (
          <Card
            key={s.id}
            className="border-slate-200 shadow-sm hover:border-slate-300 transition-all"
          >
            <CardContent className="p-5 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      {s.id}
                    </span>
                    <span className="text-xs text-slate-400">Ref: {s.caseId}</span>
                    <h4 className="font-bold text-base text-slate-900">{s.patientName}</h4>
                    {s.status === 'aguardando_liberacao' && (
                      <Badge className="bg-amber-100 text-amber-800 border-amber-300 text-xs">
                        Aguardando Liberação ADM
                      </Badge>
                    )}
                    {s.status === 'aprovado' && (
                      <Badge className="bg-blue-100 text-blue-800 border-blue-300 text-xs">
                        Aprovado / Expedição
                      </Badge>
                    )}
                    {s.status === 'em_transporte' && (
                      <Badge className="bg-purple-100 text-purple-800 border-purple-300 text-xs">
                        Em Transporte
                      </Badge>
                    )}
                    {s.status === 'entregue' && (
                      <Badge className="bg-emerald-100 text-emerald-800 border-emerald-300 text-xs">
                        Entregue no Consultório
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-slate-600">
                    <strong>Destino:</strong> {s.dentistName} •{' '}
                    <MapPin className="w-3.5 h-3.5 inline text-slate-400" /> {s.destinationCity}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {s.status === 'aguardando_liberacao' && (
                    <Button
                      size="sm"
                      className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs"
                      onClick={() => handleApproveShipment(s.id, s.patientName)}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Aprovar e Liberar Envio
                    </Button>
                  )}
                  {s.status !== 'aguardando_liberacao' && (
                    <Badge
                      variant="outline"
                      className="text-xs font-mono font-medium text-slate-700 bg-slate-50"
                    >
                      Rastreio: {s.trackingCode} ({s.shippingCarrier})
                    </Badge>
                  )}
                </div>
              </div>

              {/* Descrição do Insumo e Detalhes de Transporte */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-100 text-xs">
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200/80 sm:col-span-2">
                  <span className="text-slate-400 block text-[11px]">
                    Insumos / Conteúdo do Pacote:
                  </span>
                  <span className="font-semibold text-slate-800 flex items-center gap-1.5 mt-0.5">
                    <Package className="w-3.5 h-3.5 text-emerald-600" />
                    {s.items}
                  </span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200/80">
                  <span className="text-slate-400 block text-[11px]">Previsão de Entrega:</span>
                  <span className="font-semibold text-slate-800 mt-0.5 block">
                    {s.estimatedDelivery}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
