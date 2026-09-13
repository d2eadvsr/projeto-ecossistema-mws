import { useState, useMemo } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Download, Calendar, Layers, Wrench, CheckCircle2, TrendingUp } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import {
  MOCK_FINANCIAL_RECORDS,
  MOCK_MAINTENANCE_TRANSACTIONS,
  FinancialRecord,
  MaintenanceTransaction,
} from './financingData'

interface FinancialStatementModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

type PeriodType = 'week' | 'month' | 'year'

export default function FinancialStatementModal({
  open,
  onOpenChange,
}: FinancialStatementModalProps) {
  const [period, setPeriod] = useState<PeriodType>('month')
  const [selectedMonth, setSelectedMonth] = useState('2026-02') // Fevereiro/2026
  const [selectedYear, setSelectedYear] = useState('2026')
  const [selectedWeek, setSelectedWeek] = useState('2026-W08') // Semana 3 de Fev
  const { toast } = useToast()

  // Filtragem de Casos e Manutenções conforme o período selecionado
  const { filteredCases, filteredMaintenances } = useMemo(() => {
    let cases: FinancialRecord[] = []
    let maintenances: MaintenanceTransaction[] = []

    if (period === 'month') {
      // Filtra por mês (ex: 2026-02)
      cases = MOCK_FINANCIAL_RECORDS.filter((c) => c.date.startsWith(selectedMonth))
      maintenances = MOCK_MAINTENANCE_TRANSACTIONS.filter((m) => m.date.startsWith(selectedMonth))
    } else if (period === 'year') {
      // Filtra por ano (ex: 2026)
      cases = MOCK_FINANCIAL_RECORDS.filter((c) => c.date.startsWith(selectedYear))
      maintenances = MOCK_MAINTENANCE_TRANSACTIONS.filter((m) => m.date.startsWith(selectedYear))
    } else if (period === 'week') {
      // Semana: simulada (últimos 7 dias de Fevereiro/2026 para demonstração)
      // W08 = 16 a 22 de Fevereiro de 2026
      if (selectedWeek === '2026-W08') {
        cases = MOCK_FINANCIAL_RECORDS.filter(
          (c) => c.date >= '2026-02-16' && c.date <= '2026-02-22',
        )
        maintenances = MOCK_MAINTENANCE_TRANSACTIONS.filter(
          (m) => m.date >= '2026-02-16' && m.date <= '2026-02-22',
        )
      } else if (selectedWeek === '2026-W07') {
        // 09 a 15 de Fev
        cases = MOCK_FINANCIAL_RECORDS.filter(
          (c) => c.date >= '2026-02-09' && c.date <= '2026-02-15',
        )
        maintenances = MOCK_MAINTENANCE_TRANSACTIONS.filter(
          (m) => m.date >= '2026-02-09' && m.date <= '2026-02-15',
        )
      } else {
        // 01 a 08 de Fev
        cases = MOCK_FINANCIAL_RECORDS.filter(
          (c) => c.date >= '2026-02-01' && c.date <= '2026-02-08',
        )
        maintenances = MOCK_MAINTENANCE_TRANSACTIONS.filter(
          (m) => m.date >= '2026-02-01' && m.date <= '2026-02-08',
        )
      }
    }

    return { filteredCases: cases, filteredMaintenances: maintenances }
  }, [period, selectedMonth, selectedYear, selectedWeek])

  // Subtotal Casos (Resultado Mensal Bruto dos casos = Faturamento - Custo de Laboratório)
  const casesGrossTotal = filteredCases.reduce((acc, cur) => acc + cur.chargedPrice, 0)
  const casesLabCostTotal = filteredCases.reduce((acc, cur) => acc + cur.labCost, 0)
  const casesSubtotal = casesGrossTotal - casesLabCostTotal

  // Subtotal Manutenções (Créditos de R$ 250 - Débitos de R$ 250)
  const maintenancesCreditsTotal = filteredMaintenances
    .filter((m) => m.type === 'credit')
    .reduce((acc, cur) => acc + cur.amount, 0)
  const maintenancesDebitsTotal = filteredMaintenances
    .filter((m) => m.type === 'debit')
    .reduce((acc, cur) => acc + cur.amount, 0)
  const maintenancesSubtotal = maintenancesCreditsTotal - maintenancesDebitsTotal

  // Total Geral consolidando ambos os subtotais
  const grandTotal = casesSubtotal + maintenancesSubtotal

  const handleExportCSV = () => {
    toast({
      title: 'Extrato Customizado Exportado',
      description: 'O arquivo com os subtotais de Casos e Manutenções foi baixado com sucesso.',
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-4 sm:p-6">
        <DialogHeader className="border-b border-slate-100 pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <DialogTitle className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-emerald-600" />
                Extrato Financeiro Customizado
              </DialogTitle>
              <DialogDescription className="text-xs sm:text-sm text-slate-500 mt-1">
                Selecione o intervalo customizado (semana, mês, ano) para visualizar os subtotais de
                Casos e Manutenções no Total Geral.
              </DialogDescription>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleExportCSV}
              className="border-slate-300 text-xs shrink-0 self-start sm:self-auto"
            >
              <Download className="h-3.5 w-3.5 mr-1.5" /> Baixar Extrato
            </Button>
          </div>

          {/* Seletores de Intervalo Customizado */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3">
            <Tabs
              value={period}
              onValueChange={(val) => setPeriod(val as PeriodType)}
              className="w-full sm:w-auto"
            >
              <TabsList className="grid grid-cols-3 w-full sm:w-72 bg-slate-100">
                <TabsTrigger value="week" className="text-xs">
                  Semana
                </TabsTrigger>
                <TabsTrigger value="month" className="text-xs">
                  Mês
                </TabsTrigger>
                <TabsTrigger value="year" className="text-xs">
                  Ano
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Sub-seletores dependendo da periodicidade */}
            <div className="flex items-center gap-2">
              {period === 'week' && (
                <select
                  value={selectedWeek}
                  onChange={(e) => setSelectedWeek(e.target.value)}
                  className="h-8 rounded-md border border-slate-200 bg-white px-2.5 text-xs font-medium text-slate-700 shadow-sm"
                >
                  <option value="2026-W08">Semana 16 a 22/Fev/2026 (Atual)</option>
                  <option value="2026-W07">Semana 09 a 15/Fev/2026</option>
                  <option value="2026-W06">Semana 01 a 08/Fev/2026</option>
                </select>
              )}

              {period === 'month' && (
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="h-8 rounded-md border border-slate-200 bg-white px-2.5 text-xs font-medium text-slate-700 shadow-sm"
                >
                  <option value="2026-02">Fevereiro / 2026 (Atual)</option>
                  <option value="2026-01">Janeiro / 2026</option>
                  <option value="2025-12">Dezembro / 2025</option>
                </select>
              )}

              {period === 'year' && (
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="h-8 rounded-md border border-slate-200 bg-white px-2.5 text-xs font-medium text-slate-700 shadow-sm"
                >
                  <option value="2026">Ano de 2026 (Em andamento)</option>
                  <option value="2025">Ano de 2025</option>
                </select>
              )}
            </div>
          </div>
        </DialogHeader>

        {/* Resumo Consolidado com os 2 Subtotais e o Total Geral */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-2">
          {/* Subtotal Casos */}
          <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3.5 space-y-1">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
              <span className="flex items-center gap-1.5">
                <Layers className="h-4 w-4 text-emerald-600" />
                Subtotal 1: Casos MWS
              </span>
              <Badge variant="outline" className="text-[10px] bg-white font-normal">
                {filteredCases.length} casos
              </Badge>
            </div>
            <div className="text-xl font-bold text-slate-900">
              {casesSubtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </div>
            <div className="text-[11px] text-slate-500 flex justify-between">
              <span>
                Bruto:{' '}
                {casesGrossTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </span>
              <span>
                Lab: −
                {casesLabCostTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </span>
            </div>
          </div>

          {/* Subtotal Manutenções */}
          <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3.5 space-y-1">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
              <span className="flex items-center gap-1.5">
                <Wrench className="h-4 w-4 text-blue-600" />
                Subtotal 2: Manutenções
              </span>
              <Badge variant="outline" className="text-[10px] bg-white font-normal">
                {filteredMaintenances.length} lançamentos
              </Badge>
            </div>
            <div
              className={`text-xl font-bold ${
                maintenancesSubtotal >= 0 ? 'text-emerald-700' : 'text-rose-700'
              }`}
            >
              {maintenancesSubtotal >= 0 ? '+' : ''}
              {maintenancesSubtotal.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </div>
            <div className="text-[11px] text-slate-500 flex justify-between">
              <span className="text-emerald-700">
                Créditos: +
                {maintenancesCreditsTotal.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </span>
              <span className="text-rose-700">
                Débitos: −
                {maintenancesDebitsTotal.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </span>
            </div>
          </div>

          {/* Total Geral Consolidado */}
          <div className="rounded-xl border border-emerald-300 bg-emerald-50/70 p-3.5 space-y-1">
            <div className="flex items-center justify-between text-xs font-semibold text-emerald-900">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-700" />
                Total Geral Consolidado
              </span>
              <Badge className="bg-emerald-600 text-white text-[10px]">Líquido Final</Badge>
            </div>
            <div className="text-2xl font-extrabold text-emerald-950">
              {grandTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </div>
            <p className="text-[11px] text-emerald-800">Subtotal Casos + Subtotal Manutenções</p>
          </div>
        </div>

        {/* Detalhamento: 1. Casos (Resultado Mensal Bruto) */}
        <div className="space-y-2 mt-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <Layers className="h-4 w-4 text-emerald-600" />
              1. Detalhamento de Casos (Resultado Bruto de Tratamentos)
            </h4>
            <span className="text-xs font-semibold text-slate-700">
              Subtotal:{' '}
              {casesSubtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </span>
          </div>

          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                <tr>
                  <th className="p-2.5 pl-3">Data / ID</th>
                  <th className="p-2.5">Paciente</th>
                  <th className="p-2.5">Planejamento</th>
                  <th className="p-2.5">Pagamento</th>
                  <th className="p-2.5 text-right">Preço Cobrado</th>
                  <th className="p-2.5 text-right">Custo Lab</th>
                  <th className="p-2.5 text-right pr-3 font-bold text-slate-800">Resultado Caso</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredCases.map((c) => {
                  const netCase = c.chargedPrice - c.labCost
                  return (
                    <tr key={c.id} className="hover:bg-slate-50/50">
                      <td className="p-2.5 pl-3 whitespace-nowrap">
                        <span className="font-mono text-slate-700">{c.id}</span>
                        <span className="block text-[10px] text-slate-400">
                          {new Date(c.date + 'T12:00:00').toLocaleDateString('pt-BR')}
                        </span>
                      </td>
                      <td className="p-2.5 font-medium text-slate-900">{c.patientName}</td>
                      <td
                        className="p-2.5 text-slate-600 max-w-[180px] truncate"
                        title={c.planning}
                      >
                        {c.planning}
                      </td>
                      <td className="p-2.5">
                        <Badge
                          variant="outline"
                          className={
                            c.paymentMethod === 'MWS'
                              ? 'border-blue-300 text-blue-700 bg-blue-50 text-[10px]'
                              : 'border-slate-300 text-slate-700 bg-slate-50 text-[10px]'
                          }
                        >
                          {c.paymentMethod}
                        </Badge>
                      </td>
                      <td className="p-2.5 text-right font-medium text-slate-800">
                        {c.chargedPrice.toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        })}
                      </td>
                      <td className="p-2.5 text-right text-rose-600">
                        −
                        {c.labCost.toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        })}
                      </td>
                      <td className="p-2.5 text-right pr-3 font-bold text-emerald-700">
                        {netCase.toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        })}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
              <tfoot className="bg-slate-100/70 font-semibold border-t border-slate-200 text-slate-900">
                <tr>
                  <td colSpan={4} className="p-2.5 pl-3 text-right">
                    Subtotal Casos:
                  </td>
                  <td className="p-2.5 text-right">
                    {casesGrossTotal.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </td>
                  <td className="p-2.5 text-right text-rose-700">
                    −
                    {casesLabCostTotal.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </td>
                  <td className="p-2.5 text-right pr-3 text-emerald-800 font-bold">
                    {casesSubtotal.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Detalhamento: 2. Manutenções (Créditos e Débitos R$ 250) */}
        <div className="space-y-2 mt-5">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <Wrench className="h-4 w-4 text-blue-600" />
              2. Detalhamento de Manutenções (Rede Credenciada MWS)
            </h4>
            <span
              className={`text-xs font-semibold ${
                maintenancesSubtotal >= 0 ? 'text-emerald-700' : 'text-rose-700'
              }`}
            >
              Subtotal: {maintenancesSubtotal >= 0 ? '+' : ''}
              {maintenancesSubtotal.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </span>
          </div>

          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                <tr>
                  <th className="p-2.5 pl-3">Data / ID</th>
                  <th className="p-2.5">Tipo</th>
                  <th className="p-2.5">Paciente</th>
                  <th className="p-2.5">Ortodontista Parceiro</th>
                  <th className="p-2.5">Procedimento</th>
                  <th className="p-2.5 text-right pr-3">Impacto</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredMaintenances.map((m) => {
                  const isCredit = m.type === 'credit'
                  return (
                    <tr key={m.id} className="hover:bg-slate-50/50">
                      <td className="p-2.5 pl-3 whitespace-nowrap">
                        <span className="font-mono text-slate-700">{m.id}</span>
                        <span className="block text-[10px] text-slate-400">
                          {new Date(m.date + 'T12:00:00').toLocaleDateString('pt-BR')}
                        </span>
                      </td>
                      <td className="p-2.5 whitespace-nowrap">
                        <Badge
                          className={`text-[10px] ${
                            isCredit
                              ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                              : 'bg-rose-100 text-rose-800 border-rose-200'
                          }`}
                        >
                          {isCredit ? 'Crédito (+250)' : 'Débito (−250)'}
                        </Badge>
                      </td>
                      <td className="p-2.5 font-medium text-slate-900">{m.patientName}</td>
                      <td className="p-2.5 text-slate-600">
                        {m.otherDentistName} ({m.otherDentistCity})
                      </td>
                      <td
                        className="p-2.5 text-slate-600 max-w-[200px] truncate"
                        title={m.procedure}
                      >
                        {m.procedure}
                      </td>
                      <td
                        className={`p-2.5 text-right pr-3 font-bold whitespace-nowrap ${
                          isCredit ? 'text-emerald-700' : 'text-rose-700'
                        }`}
                      >
                        {isCredit ? '+ ' : '- '}
                        {m.amount.toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        })}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
              <tfoot className="bg-slate-100/70 font-semibold border-t border-slate-200 text-slate-900">
                <tr>
                  <td colSpan={5} className="p-2.5 pl-3 text-right">
                    Subtotal Manutenções (+{maintenancesCreditsTotal} / −{maintenancesDebitsTotal}):
                  </td>
                  <td
                    className={`p-2.5 text-right pr-3 font-bold ${
                      maintenancesSubtotal >= 0 ? 'text-emerald-800' : 'text-rose-700'
                    }`}
                  >
                    {maintenancesSubtotal >= 0 ? '+ ' : ''}
                    {maintenancesSubtotal.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Rodapé com Total Geral Consolidado */}
        <div className="mt-4 p-4 rounded-lg bg-emerald-900 text-white flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-emerald-800 flex items-center justify-center shrink-0">
              <TrendingUp className="h-5 w-5 text-emerald-300" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-emerald-200 font-semibold">
                Total Geral Consolidado do Extrato
              </p>
              <p className="text-xs text-emerald-100">
                Subtotal Casos (
                {casesSubtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}){' '}
                {maintenancesSubtotal >= 0 ? '+' : '−'} Subtotal Manutenções (
                {Math.abs(maintenancesSubtotal).toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
                )
              </p>
            </div>
          </div>
          <div className="text-2xl font-black text-white shrink-0">
            {grandTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
