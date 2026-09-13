import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import {
  DollarSign,
  TrendingUp,
  CreditCard,
  PieChart as PieChartIcon,
  ArrowUpRight,
  Download,
  Calendar,
  Wrench,
  CheckCircle2,
  Building2,
  ExternalLink,
  ChevronRight,
  Info,
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import {
  MOCK_FINANCIAL_RECORDS,
  getFixedMonthMetrics,
  FinancialRecord,
  FIXED_MONTH_LABEL,
} from './financingData'
import FinancialStatementModal from './FinancialStatementModal'

export default function DentistFinancing() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [paymentFilter, setPaymentFilter] = useState<'all' | 'Particular' | 'MWS'>('all')
  const [statementOpen, setStatementOpen] = useState(false)
  const [selectedMwsDetails, setSelectedMwsDetails] = useState<FinancialRecord | null>(null)

  const navigate = useNavigate()
  const { toast } = useToast()

  const metrics = getFixedMonthMetrics()

  // Filtros aplicados sobre os registros do mês fixo principal
  const filteredRecords = MOCK_FINANCIAL_RECORDS.filter((rec) => {
    // Tela principal fica no intervalo mensal fixo
    const isSameMonth = rec.closingMonth === FIXED_MONTH_LABEL
    if (!isSameMonth) return false

    const matchesSearch =
      rec.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.classification.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.planning.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || rec.status === statusFilter
    const matchesPayment = paymentFilter === 'all' || rec.paymentMethod === paymentFilter
    return matchesSearch && matchesStatus && matchesPayment
  })

  const handleWithdraw = () => {
    toast({
      title: 'Solicitação de Saque Recebida',
      description:
        'O valor disponível será transferido via Pix para sua conta cadastrada em até 1 dia útil.',
    })
  }

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-6xl mx-auto animate-fade-in-up">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
              Painel Financeiro
            </h1>
            <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">
              {FIXED_MONTH_LABEL} (Fixo)
            </Badge>
          </div>
          <p className="text-slate-500 mt-1 text-sm">
            Controle financeiro mensal de tratamentos Magic Wire, custos laboratoriais e
            compensações de manutenção.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Botão Extrato com seleção de intervalo customizado (semana, mês, ano) */}
          <Button
            variant="outline"
            onClick={() => setStatementOpen(true)}
            className="border-slate-300 shadow-sm hover:bg-slate-50 text-slate-700"
          >
            <Calendar className="h-4 w-4 mr-2 text-emerald-600" /> Extrato
          </Button>
          <Button
            onClick={handleWithdraw}
            className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
          >
            <DollarSign className="h-4 w-4 mr-1.5" /> Solicitar Saque
          </Button>
        </div>
      </div>

      {/* Sequência Lógica solicitada pelo usuário:
          1. Faturamento Bruto
          2. Custos de Laboratório
          3. Resultado Mensal Bruto
          4. Resultado de Manutenções (clicável para /dentist/financing/manutencoes)
      */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* 1. Faturamento Bruto */}
        <Card className="border-slate-200 shadow-sm hover:border-slate-300 transition-all bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="space-y-0.5">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                1. Entrada Bruta
              </span>
              <CardTitle className="text-sm font-semibold text-slate-700">
                Faturamento Bruto
              </CardTitle>
            </div>
            <div className="h-8 w-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
              <DollarSign className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">
              {metrics.totalGross.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </div>
            <div className="flex items-center text-xs text-emerald-600 mt-1.5 font-medium">
              <ArrowUpRight className="h-3.5 w-3.5 mr-0.5" /> {metrics.monthlyGrowth} vs mês
              anterior
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Total faturado no mês fixo</p>
          </CardContent>
        </Card>

        {/* 2. Custos de Laboratório */}
        <Card className="border-slate-200 shadow-sm hover:border-slate-300 transition-all bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="space-y-0.5">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                2. Dedução Direta
              </span>
              <CardTitle className="text-sm font-semibold text-slate-700">
                Custos de Laboratório
              </CardTitle>
            </div>
            <div className="h-8 w-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
              <CreditCard className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">
              {metrics.labCost.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </div>
            <p className="text-xs text-slate-500 mt-1.5">Split automático de fabricação 3D</p>
            <p className="text-[11px] text-slate-400 mt-1">Sem bitributação para o consultório</p>
          </CardContent>
        </Card>

        {/* 3. Resultado Mensal Bruto */}
        <Card className="border-slate-200 shadow-sm hover:border-slate-300 transition-all bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="space-y-0.5">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                3. Margem de Casos
              </span>
              <CardTitle className="text-sm font-semibold text-slate-700">
                Resultado Mensal Bruto
              </CardTitle>
            </div>
            <div className="h-8 w-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
              <PieChartIcon className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">
              {metrics.grossMonthlyResult.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </div>
            <p className="text-xs text-slate-600 mt-1.5 font-medium">
              Faturamento Bruto − Custos Lab
            </p>
            <p className="text-[11px] text-slate-400 mt-1">Margem operacional de tratamentos</p>
          </CardContent>
        </Card>

        {/* 4. Resultado de Manutenções (clicável -> /dentist/financing/manutencoes) */}
        <Card
          onClick={() => navigate('/dentist/financing/manutencoes')}
          className="border-emerald-300 bg-gradient-to-br from-emerald-50/70 to-teal-50/40 shadow-sm hover:shadow-md hover:border-emerald-400 transition-all cursor-pointer group relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 transform translate-x-3 -translate-y-3 w-16 h-16 bg-emerald-200/30 rounded-full blur-xl pointer-events-none" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="space-y-0.5">
              <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-700">
                4. Repasse Líquido Final
              </span>
              <CardTitle className="text-sm font-bold text-emerald-950 flex items-center gap-1">
                Resultado de Manutenções
              </CardTitle>
            </div>
            <div className="h-8 w-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <Wrench className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <div className="text-2xl font-extrabold text-emerald-950">
                {metrics.maintenanceResult >= 0 ? '+' : ''}
                {metrics.maintenanceResult.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </div>
              <ChevronRight className="h-4 w-4 text-emerald-700 group-hover:translate-x-1 transition-transform" />
            </div>
            <p className="text-xs text-emerald-800 mt-1.5 font-medium flex items-center justify-between">
              <span>{metrics.maintenanceSummary.creditsCount} créditos (+1.000)</span>
              <span>{metrics.maintenanceSummary.debitsCount} débitos (−500)</span>
            </p>
            <div className="mt-2 pt-2 border-t border-emerald-200/70 flex items-center justify-between text-[11px] text-emerald-900 font-semibold">
              <span className="text-emerald-700">Clique para ver detalhes</span>
              <span className="underline">Extrato de Débitos & Créditos →</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Faixa explicativa sobre o Resultado Final Líquido */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-start sm:items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
            <TrendingUp className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              Total Líquido Consolidado do Mês:{' '}
              <span className="text-emerald-700 font-bold">
                {metrics.totalNetFinal.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </span>
            </h3>
            <p className="text-xs text-slate-500">
              Composto pelo Resultado Mensal Bruto (
              {metrics.grossMonthlyResult.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
              ) somado ao Resultado de Manutenções ({metrics.maintenanceResult >= 0 ? '+' : ''}
              {metrics.maintenanceResult.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
              ).
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/dentist/financing/manutencoes')}
            className="text-xs text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50"
          >
            Ver Lançamentos de Manutenções (R$ 250)
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>

      {/* Tabela de Transações / Orçamentos */}
      <Card className="border-slate-200 shadow-sm bg-white">
        <CardHeader className="pb-3 border-b border-slate-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <CardTitle className="text-lg font-bold text-slate-900">
                Histórico de Transações & Orçamentos
              </CardTitle>
              <CardDescription>
                Detalhamento dos orçamentos e tratamentos fechados em {FIXED_MONTH_LABEL}.
              </CardDescription>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Input
                placeholder="Buscar paciente, planejamento..."
                className="w-44 sm:w-56 text-xs h-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              {/* Filtro de Forma de Pagamento: estritamente Particular ou MWS */}
              <select
                value={paymentFilter}
                onChange={(e) => setPaymentFilter(e.target.value as 'all' | 'Particular' | 'MWS')}
                className="h-9 rounded-md border border-input bg-background px-2.5 text-xs font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500"
              >
                <option value="all">Todas as Formas</option>
                <option value="Particular">Particular</option>
                <option value="MWS">MWS (Fintech Parceira)</option>
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="h-9 rounded-md border border-input bg-background px-2.5 text-xs font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500"
              >
                <option value="all">Todos os Status</option>
                <option value="liquidado">Liquidados</option>
                <option value="pendente">Pendentes</option>
                <option value="processando">Processando</option>
              </select>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-left text-sm min-w-[850px]">
            <thead className="bg-slate-50 border-b border-slate-100 text-xs font-semibold text-slate-600">
              <tr>
                <th className="p-3.5 pl-6">Paciente</th>
                <th className="p-3.5">Classificação</th>
                <th className="p-3.5">Planejamento</th>
                <th className="p-3.5 whitespace-nowrap">Tempo de Tratamento</th>
                {/* Regra estrita: Coluna Forma de Pagamento apenas Particular ou MWS */}
                <th className="p-3.5">Forma de Pagamento</th>
                <th className="p-3.5 text-right whitespace-nowrap">Preço Sugerido MWS</th>
                <th className="p-3.5 text-right whitespace-nowrap text-emerald-800">
                  Preço Cobrado
                </th>
                <th className="p-3.5 whitespace-nowrap">Mês de Fechamento</th>
                <th className="p-3.5 pr-6 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRecords.map((rec) => {
                const isMWS = rec.paymentMethod === 'MWS'
                return (
                  <tr key={rec.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5 pl-6">
                      <p className="font-semibold text-slate-900">{rec.patientName}</p>
                      <p className="text-xs text-slate-400 font-mono">{rec.id}</p>
                    </td>

                    <td className="p-3.5 font-medium text-slate-800">
                      <Badge
                        variant="outline"
                        className="bg-slate-50 text-slate-700 font-normal text-xs"
                      >
                        {rec.classification}
                      </Badge>
                    </td>

                    <td className="p-3.5 text-slate-700 text-xs font-medium max-w-[220px]">
                      {rec.planning}
                    </td>

                    <td className="p-3.5 text-slate-600 text-xs whitespace-nowrap">
                      {rec.treatmentDuration}
                    </td>

                    {/* Forma de Pagamento: estritamente Particular ou MWS */}
                    <td className="p-3.5">
                      {isMWS ? (
                        <button
                          type="button"
                          onClick={() => setSelectedMwsDetails(rec)}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition-colors group cursor-pointer"
                          title="Clique para ver dados integrados via API da Fintech"
                        >
                          <Building2 className="h-3 w-3 text-blue-600" />
                          <span>MWS</span>
                          <ExternalLink className="h-2.5 w-2.5 text-blue-400 group-hover:text-blue-700" />
                        </button>
                      ) : (
                        <Badge
                          variant="outline"
                          className="bg-slate-50 text-slate-700 border-slate-300 font-medium text-xs"
                        >
                          Particular
                        </Badge>
                      )}
                    </td>

                    <td className="p-3.5 text-right text-slate-600 font-medium whitespace-nowrap">
                      {rec.suggestedPriceMWS.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </td>

                    <td className="p-3.5 text-right font-bold text-emerald-700 whitespace-nowrap">
                      {rec.chargedPrice.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </td>

                    <td className="p-3.5 text-slate-600 text-xs whitespace-nowrap">
                      {rec.closingMonth}
                    </td>

                    <td className="p-3.5 pr-6 text-center">
                      <Badge
                        className={
                          rec.status === 'liquidado'
                            ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-100 border-emerald-200'
                            : rec.status === 'pendente'
                              ? 'bg-amber-100 text-amber-800 hover:bg-amber-100 border-amber-200'
                              : 'bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200'
                        }
                      >
                        {rec.status === 'liquidado'
                          ? 'Liquidado'
                          : rec.status === 'pendente'
                            ? 'Pendente'
                            : 'Processando'}
                      </Badge>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>

          {filteredRecords.length === 0 && (
            <div className="text-center py-8 text-slate-500 text-sm">
              Nenhum registro encontrado para os filtros aplicados.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modal de Detalhes da Fintech Integrada via API (para linhas com pagamento MWS) */}
      <Dialog
        open={!!selectedMwsDetails}
        onOpenChange={(open) => !open && setSelectedMwsDetails(null)}
      >
        <DialogContent className="max-w-md p-6">
          <DialogHeader>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                <Building2 className="h-4 w-4" />
              </div>
              <div>
                <DialogTitle className="text-base font-bold text-slate-900">
                  Financiamento MWS • Fintech Parceira
                </DialogTitle>
                <DialogDescription className="text-xs text-slate-500">
                  Dados sincronizados via API do Portal Web com a solução de crédito
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          {selectedMwsDetails && selectedMwsDetails.fintechDetails && (
            <div className="space-y-4 pt-2 text-xs">
              <div className="rounded-lg bg-slate-50 p-3 border border-slate-200 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Paciente:</span>
                  <span className="font-semibold text-slate-900">
                    {selectedMwsDetails.patientName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Contrato Fintech:</span>
                  <span className="font-mono text-slate-800 font-medium">
                    {selectedMwsDetails.fintechDetails.contractNumber}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Parceira de Crédito:</span>
                  <span className="font-medium text-blue-700">
                    {selectedMwsDetails.fintechDetails.partner}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-slate-500 block text-[11px]">Valor Total Financiado</span>
                  <span className="text-sm font-bold text-slate-900">
                    {selectedMwsDetails.chargedPrice.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </span>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-slate-500 block text-[11px]">Condição / Parcelas</span>
                  <span className="text-sm font-bold text-slate-900">
                    {selectedMwsDetails.fintechDetails.installments}
                  </span>
                </div>
              </div>

              <div className="rounded-lg border border-slate-200 p-3 space-y-2 bg-white">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Parcelas Quitadas:</span>
                  <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">
                    {selectedMwsDetails.fintechDetails.paidInstallments} de{' '}
                    {selectedMwsDetails.fintechDetails.totalInstallments} pagas
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Parcelas em Atraso:</span>
                  <Badge
                    className={
                      selectedMwsDetails.fintechDetails.delayedInstallments > 0
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-slate-100 text-slate-700'
                    }
                  >
                    {selectedMwsDetails.fintechDetails.delayedInstallments === 0
                      ? 'Nenhuma parcela em atraso'
                      : `${selectedMwsDetails.fintechDetails.delayedInstallments} em atraso`}
                  </Badge>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-slate-100">
                  <span className="text-slate-600 font-medium">Status do Financiamento:</span>
                  <span className="font-bold text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    {selectedMwsDetails.fintechDetails.status}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-blue-50/70 border border-blue-200 text-blue-800 text-[11px]">
                <Info className="h-4 w-4 shrink-0 text-blue-600" />
                <span>
                  O repasse do Ortodontista é garantido integralmente pela Fintech independente de
                  eventuais atrasos do paciente.
                </span>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Modal de Extrato com intervalo customizado (Semana, Mês, Ano) e subtotais */}
      <FinancialStatementModal open={statementOpen} onOpenChange={setStatementOpen} />
    </div>
  )
}
