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
  FolderOpen,
  Search,
  Clock,
  FlaskConical,
  Sparkles,
  CheckCircle2,
  FileText,
  DollarSign,
  Cpu,
  UserCheck,
  Send,
  MessageSquare,
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { AdminClinicalCase, MOCK_ADMIN_CASES } from './mockData'

export default function AdminCases() {
  const [cases, setCases] = useState<AdminClinicalCase[]>(MOCK_ADMIN_CASES)
  const [searchTerm, setSearchTerm] = useState('')
  const [stageFilter, setStageFilter] = useState<string>('all')
  const [selectedCase, setSelectedCase] = useState<AdminClinicalCase | null>(null)
  const [isBoletoModalOpen, setIsBoletoModalOpen] = useState(false)
  const { toast } = useToast()

  // 4 status canônicos MWS: 12 + 18 + 14 + 10 = 54
  const countAguardando = 12
  const countEmAnalise = 18
  const countPlanejamentoElaborado = 14
  const countPlanejamentoEntregue = 10
  const totalCases = 54

  const filteredCases = cases.filter((c) => {
    const matchesSearch =
      c.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.dentistName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.protocol.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStage = stageFilter === 'all' || c.stage === stageFilter
    return matchesSearch && matchesStage
  })

  // Ação administrativa (b91): Emitir boleto ref. ao caso planejado / Gerir cobrança
  const handleIssueBoleto = (caseId: string) => {
    setCases((prev) =>
      prev.map((c) =>
        c.id === caseId
          ? {
              ...c,
              billingStatus: 'boleto_emitido',
            }
          : c,
      ),
    )
    toast({
      title: 'Boleto Emitido com Sucesso (b91)!',
      description: `Boleto de fabricação e planejamento emitido no valor de R$ ${selectedCase?.boletoValue.toFixed(2)} e enviado para ${selectedCase?.dentistName}.`,
    })
    setIsBoletoModalOpen(false)
  }

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto animate-fade-in-up">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
            Acompanhamento de Casos Clínicos & Laboratório
          </h1>
          <p className="text-slate-500 mt-1">
            Gestão da esteira de casos entre Ortodontista e Laboratório MWS, catalogação para IA,
            mentoria e cobrança (b91).
          </p>
        </div>
      </div>

      {/* 4 Caixas com Status Oficiais MWS (Soma = 54) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-slate-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-600">Aguardando Análise Técnica</span>
              <Clock className="w-4 h-4 text-slate-500" />
            </div>
            <p className="text-2xl font-bold text-slate-900 mt-2">{countAguardando}</p>
            <p className="text-[11px] text-slate-500 mt-1">Na fila de triagem laboratorial</p>
          </CardContent>
        </Card>

        <Card className="border-amber-200 bg-amber-50/40">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-amber-800">Em Análise Técnica</span>
              <FlaskConical className="w-4 h-4 text-amber-600" />
            </div>
            <p className="text-2xl font-bold text-amber-900 mt-2">{countEmAnalise}</p>
            <p className="text-[11px] text-amber-700 mt-1">Mentor e técnico trabalhando</p>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50/40">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-purple-800">Planejamento Elaborado</span>
              <Sparkles className="w-4 h-4 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-purple-900 mt-2">{countPlanejamentoElaborado}</p>
            <p className="text-[11px] text-purple-700 mt-1">Aguardando retorno do ortodontista</p>
          </CardContent>
        </Card>

        <Card className="border-emerald-200 bg-emerald-50/40">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-emerald-800">Planejamento Entregue</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-2xl font-bold text-emerald-900 mt-2">{countPlanejamentoEntregue}</p>
            <p className="text-[11px] text-emerald-700 mt-1">Liberados para confecção dos fios</p>
          </CardContent>
        </Card>
      </div>

      {/* Caixa Informativa da IA & Mentoria MWS (Planilha Ref. b6, b7) */}
      <div className="p-4 rounded-xl border border-indigo-200 bg-indigo-50/60 flex items-start gap-3 text-xs text-indigo-950">
        <Cpu className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold">Catalogação para Treinamento da IA MWS (Ref. b6 da Planilha):</p>
          <p className="text-indigo-900 leading-relaxed">
            Todos os 54 casos clínicos recebidos são catalogados com metadados para servir de base
            de aprendizado para a IA da Magic Wire. Mesmo com o avanço da IA, haverá sempre o
            acompanhamento de um Mentor Ortodontista sênior durante todo o tratamento — do
            planejamento à conclusão.
          </p>
        </div>
      </div>

      {/* Filtros e Busca */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Buscar por paciente, dentista, protocolo..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <Button
            variant={stageFilter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setStageFilter('all')}
            className={stageFilter === 'all' ? 'bg-slate-900 text-xs' : 'text-xs'}
          >
            Todos ({totalCases})
          </Button>
          <Button
            variant={stageFilter === 'aguardando_analise_tecnica' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setStageFilter('aguardando_analise_tecnica')}
            className="text-xs"
          >
            Aguardando ({countAguardando})
          </Button>
          <Button
            variant={stageFilter === 'em_analise_tecnica' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setStageFilter('em_analise_tecnica')}
            className="text-xs"
          >
            Em Análise ({countEmAnalise})
          </Button>
          <Button
            variant={stageFilter === 'planejamento_elaborado' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setStageFilter('planejamento_elaborado')}
            className="text-xs"
          >
            Elaborados ({countPlanejamentoElaborado})
          </Button>
          <Button
            variant={stageFilter === 'planejamento_entregue' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setStageFilter('planejamento_entregue')}
            className="text-xs"
          >
            Entregues ({countPlanejamentoEntregue})
          </Button>
        </div>
      </div>

      {/* Lista de Casos com Ações Administrativas */}
      <div className="grid gap-4">
        {filteredCases.map((c) => (
          <Card
            key={c.id}
            className="border-slate-200 shadow-sm hover:border-slate-300 transition-all"
          >
            <CardContent className="p-5 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      {c.id}
                    </span>
                    <h4 className="font-bold text-base text-slate-900">{c.patientName}</h4>
                    {c.stage === 'aguardando_analise_tecnica' && (
                      <Badge className="bg-slate-100 text-slate-800 border-slate-300">
                        Aguardando Análise Técnica
                      </Badge>
                    )}
                    {c.stage === 'em_analise_tecnica' && (
                      <Badge className="bg-amber-100 text-amber-800 border-amber-300">
                        Em Análise Técnica
                      </Badge>
                    )}
                    {c.stage === 'planejamento_elaborado' && (
                      <Badge className="bg-purple-100 text-purple-800 border-purple-300">
                        Planejamento Elaborado
                      </Badge>
                    )}
                    {c.stage === 'planejamento_entregue' && (
                      <Badge className="bg-emerald-100 text-emerald-800 border-emerald-300">
                        Planejamento Entregue
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-slate-600">
                    <strong>Ortodontista:</strong> {c.dentistName} ({c.dentistCity}) •{' '}
                    <strong className="text-emerald-700">Protocolo MWS:</strong> {c.protocol}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {c.billingStatus === 'aguardando_boleto' ? (
                    <Button
                      size="sm"
                      className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs"
                      onClick={() => {
                        setSelectedCase(c)
                        setIsBoletoModalOpen(true)
                      }}
                    >
                      <DollarSign className="w-3.5 h-3.5 mr-1" /> Emitir Boleto (b91)
                    </Button>
                  ) : (
                    <Badge
                      variant="outline"
                      className="text-xs text-emerald-800 bg-emerald-50 border-emerald-300"
                    >
                      Boleto Gerado (R$ {c.boletoValue.toFixed(2)})
                    </Badge>
                  )}
                </div>
              </div>

              {/* Detalhes de Mentoria e IA */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-100 text-xs">
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200/80">
                  <span className="text-slate-400 block text-[11px]">Mentor Responsável:</span>
                  <span className="font-semibold text-slate-800">{c.mentorAssigned}</span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200/80">
                  <span className="text-slate-400 block text-[11px]">Status Aprendizado IA:</span>
                  <span className="font-semibold text-indigo-700 flex items-center gap-1">
                    <Cpu className="w-3.5 h-3.5" />
                    {c.aiReadinessStatus === 'catalogado_ia'
                      ? 'Catalogado p/ Treinamento'
                      : 'Em Processamento de Arquivos'}
                  </span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200/80">
                  <span className="text-slate-400 block text-[11px]">SLA de Entrega:</span>
                  <span className="font-semibold text-slate-800">{c.slaDeadline}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal Emitir Boleto ref. ao Caso Planejado (b91) */}
      <Dialog open={isBoletoModalOpen} onOpenChange={setIsBoletoModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Emitir Boleto de Cobrança (Ref. b91)</DialogTitle>
            <DialogDescription>
              Emissão de cobrança pelo planejamento laboratorial e fabricação de fios customizados.
            </DialogDescription>
          </DialogHeader>

          {selectedCase && (
            <div className="space-y-4 pt-2 text-xs">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1.5">
                <p>
                  <strong>Caso:</strong> {selectedCase.id} ({selectedCase.patientName})
                </p>
                <p>
                  <strong>Ortodontista:</strong> {selectedCase.dentistName}
                </p>
                <p>
                  <strong>Protocolo MWS:</strong> {selectedCase.protocol}
                </p>
                <div className="pt-1 border-t border-slate-200 flex justify-between items-center text-sm font-bold text-emerald-800">
                  <span>Valor do Caso:</span>
                  <span>R$ {selectedCase.boletoValue.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-slate-500">Vencimento do Boleto:</span>
                <p className="font-semibold text-slate-800">
                  D+5 dias (Boleto registrado via Fintech)
                </p>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsBoletoModalOpen(false)}>
                  Cancelar
                </Button>
                <Button
                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                  onClick={() => handleIssueBoleto(selectedCase.id)}
                >
                  <Send className="w-3.5 h-3.5 mr-1.5" /> Confirmar e Emitir Boleto
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
