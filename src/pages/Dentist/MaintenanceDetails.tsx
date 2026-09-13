import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  ArrowLeft,
  ArrowUpRight,
  ArrowDownLeft,
  Info,
  Download,
  Calendar,
  UserCheck,
  CheckCircle2,
  HelpCircle,
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { FIXED_MONTH_LABEL, getMaintenanceSummary } from './financingData'

export default function DentistMaintenanceDetails() {
  const [selectedMonth, setSelectedMonth] = useState<string>(FIXED_MONTH_LABEL)
  const [typeFilter, setTypeFilter] = useState<'all' | 'credit' | 'debit'>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const { toast } = useToast()

  const summary = getMaintenanceSummary(selectedMonth)

  const filteredTransactions = summary.transactions.filter((tx) => {
    const matchesType = typeFilter === 'all' || tx.type === typeFilter
    const matchesSearch =
      tx.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.otherDentistName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.procedure.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.otherDentistCity.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesType && matchesSearch
  })

  const handleExport = () => {
    toast({
      title: 'Extrato de Manutenções Exportado',
      description: `O detalhamento das manutenções de ${selectedMonth} foi exportado com sucesso.`,
    })
  }

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-6xl mx-auto animate-fade-in-up">
      {/* Botão de retorno e Cabeçalho */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link
            to="/dentist/financing"
            className="inline-flex items-center text-sm font-medium text-emerald-700 hover:text-emerald-800 mb-2 group transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-1 transition-transform group-hover:-translate-x-1" />
            Voltar ao Painel Financeiro
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
              Resultado de Manutenções
            </h1>
            <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">
              {selectedMonth}
            </Badge>
          </div>
          <p className="text-slate-500 mt-1 text-sm max-w-3xl">
            Lançamentos detalhados de créditos e débitos de manutenções compartilhadas entre
            Ortodontistas da Rede Credenciada MWS.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="h-9 rounded-md border border-slate-300 bg-white px-3 text-xs font-medium text-slate-700 shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500"
          >
            <option value="Fevereiro/2026">Fevereiro/2026 (Atual)</option>
            <option value="Janeiro/2026">Janeiro/2026</option>
            <option value="Dezembro/2025">Dezembro/2025</option>
          </select>

          <Button variant="outline" onClick={handleExport} className="border-slate-300 h-9 text-xs">
            <Download className="h-4 w-4 mr-1.5" /> Exportar
          </Button>
        </div>
      </div>

      {/* Regra de Negócio MWS em Destaque */}
      <div className="rounded-xl border border-blue-200 bg-gradient-to-r from-blue-50/80 to-indigo-50/40 p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
            <Info className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold text-blue-900">
              Regra de Repasse & Compensação de Manutenções MWS
            </h4>
            <p className="text-xs sm:text-sm text-blue-800 leading-relaxed">
              Dentro do ecossistema Magic Wire System, pacientes em trânsito ou mobilidade
              geográfica podem realizar manutenções com qualquer Ortodontista credenciado.
            </p>
            <div className="grid sm:grid-cols-2 gap-2 mt-2 pt-2 border-t border-blue-200/60 text-xs">
              <div className="flex items-center gap-2 text-emerald-800 font-medium">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 font-bold">
                  +
                </span>
                <span>
                  <strong>Crédito de R$ 250,00:</strong> Ao realizar a manutenção de paciente de
                  outro Ortodontista.
                </span>
              </div>
              <div className="flex items-center gap-2 text-rose-800 font-medium">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-rose-100 text-rose-700 font-bold">
                  −
                </span>
                <span>
                  <strong>Débito de R$ 250,00:</strong> Ao ter a manutenção de um paciente seu
                  realizada por outro Ortodontista.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cards de Resumo */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="border-emerald-200 bg-emerald-50/40 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
              Total em Créditos
            </CardTitle>
            <div className="h-8 w-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-950">
              {summary.totalCredits.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </div>
            <p className="text-xs text-emerald-700 mt-1">
              {summary.creditsCount}{' '}
              {summary.creditsCount === 1 ? 'atendimento realizado' : 'atendimentos realizados'} (
              {summary.creditsCount} × R$ 250,00)
            </p>
          </CardContent>
        </Card>

        <Card className="border-rose-200 bg-rose-50/40 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-rose-800">
              Total em Débitos
            </CardTitle>
            <div className="h-8 w-8 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center">
              <ArrowDownLeft className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-rose-950">
              {summary.totalDebits.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </div>
            <p className="text-xs text-rose-700 mt-1">
              {summary.debitsCount}{' '}
              {summary.debitsCount === 1
                ? 'paciente seu atendido por outro'
                : 'pacientes seus atendidos por outros'}{' '}
              ({summary.debitsCount} × R$ 250,00)
            </p>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-slate-600">
              Resultado Líquido do Mês
            </CardTitle>
            <div
              className={`h-8 w-8 rounded-lg flex items-center justify-center ${
                summary.netResult >= 0
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-rose-100 text-rose-700'
              }`}
            >
              <CheckCircle2 className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div
              className={`text-2xl font-bold ${
                summary.netResult >= 0 ? 'text-emerald-700' : 'text-rose-700'
              }`}
            >
              {summary.netResult >= 0 ? '+' : ''}
              {summary.netResult.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </div>
            <p className="text-xs text-slate-500 mt-1 font-medium">
              Soma de todos os créditos (
              {summary.totalCredits.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              ) menos débitos (
              {summary.totalDebits.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })})
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabela de Lançamentos de Manutenção */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="pb-3 border-b border-slate-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <CardTitle className="text-lg font-bold text-slate-900">
                Extrato Detalhado de Lançamentos de Manutenção
              </CardTitle>
              <CardDescription>
                Todos os lançamentos de débitos e créditos que resultam no valor exibido de{' '}
                <span className="font-semibold text-slate-900">
                  {summary.netResult >= 0 ? '+' : ''}
                  {summary.netResult.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </span>{' '}
                em {selectedMonth}.
              </CardDescription>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Input
                placeholder="Buscar por paciente, ortodontista, cidade..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-48 sm:w-64 text-xs h-9"
              />
              <div className="flex rounded-md border border-slate-200 p-0.5 bg-slate-50 text-xs">
                <button
                  type="button"
                  onClick={() => setTypeFilter('all')}
                  className={`px-2.5 py-1 rounded font-medium transition-colors ${
                    typeFilter === 'all'
                      ? 'bg-white shadow-sm text-slate-900'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Todos ({summary.transactions.length})
                </button>
                <button
                  type="button"
                  onClick={() => setTypeFilter('credit')}
                  className={`px-2.5 py-1 rounded font-medium transition-colors ${
                    typeFilter === 'credit'
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'text-emerald-700 hover:text-emerald-900'
                  }`}
                >
                  Créditos (+{summary.creditsCount})
                </button>
                <button
                  type="button"
                  onClick={() => setTypeFilter('debit')}
                  className={`px-2.5 py-1 rounded font-medium transition-colors ${
                    typeFilter === 'debit'
                      ? 'bg-rose-600 text-white shadow-sm'
                      : 'text-rose-700 hover:text-rose-900'
                  }`}
                >
                  Débitos (−{summary.debitsCount})
                </button>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-left text-sm min-w-[900px]">
            <thead className="bg-slate-50 border-b border-slate-100 text-xs font-semibold text-slate-600">
              <tr>
                <th className="p-3.5 pl-6">ID / Data</th>
                <th className="p-3.5">Tipo de Lançamento</th>
                <th className="p-3.5">Paciente</th>
                <th className="p-3.5">Ortodontista da Rede MWS</th>
                <th className="p-3.5">Procedimento & Observação</th>
                <th className="p-3.5 text-right whitespace-nowrap">Valor Unitário</th>
                <th className="p-3.5 text-center pr-6">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTransactions.map((tx) => {
                const isCredit = tx.type === 'credit'
                return (
                  <tr key={tx.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5 pl-6 whitespace-nowrap">
                      <p className="font-mono text-xs font-bold text-slate-800">{tx.id}</p>
                      <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                        <Calendar className="h-3 w-3" />
                        {new Date(tx.date + 'T12:00:00').toLocaleDateString('pt-BR')}
                      </p>
                    </td>

                    <td className="p-3.5">
                      <div className="flex items-center gap-2">
                        <span
                          className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                            isCredit
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {isCredit ? '+' : '−'}
                        </span>
                        <div>
                          <Badge
                            className={`text-xs font-medium ${
                              isCredit
                                ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-100 border-emerald-200'
                                : 'bg-rose-100 text-rose-800 hover:bg-rose-100 border-rose-200'
                            }`}
                          >
                            {isCredit ? 'Crédito (+R$ 250)' : 'Débito (−R$ 250)'}
                          </Badge>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            {isCredit
                              ? 'Você atendeu paciente de outro'
                              : 'Outro colega atendeu seu paciente'}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="p-3.5">
                      <p className="font-semibold text-slate-900">{tx.patientName}</p>
                      <p className="text-xs text-slate-500">Tratamento Magic Wire Lingual</p>
                    </td>

                    <td className="p-3.5">
                      <p className="font-medium text-slate-800 flex items-center gap-1">
                        <UserCheck className="h-3.5 w-3.5 text-slate-400" />
                        {tx.otherDentistName}
                      </p>
                      <p className="text-xs text-slate-500">
                        {tx.otherDentistCro} • {tx.otherDentistCity}
                      </p>
                    </td>

                    <td className="p-3.5 max-w-[260px]">
                      <p className="text-xs font-medium text-slate-800">{tx.procedure}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">{tx.justification}</p>
                    </td>

                    <td className="p-3.5 text-right whitespace-nowrap">
                      <span
                        className={`text-base font-bold ${
                          isCredit ? 'text-emerald-700' : 'text-rose-700'
                        }`}
                      >
                        {isCredit ? '+ ' : '- '}
                        {tx.amount.toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        })}
                      </span>
                    </td>

                    <td className="p-3.5 pr-6 text-center">
                      <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 text-xs capitalize">
                        {tx.status}
                      </Badge>
                    </td>
                  </tr>
                )
              })}
            </tbody>
            <tfoot className="bg-slate-50/80 font-semibold border-t border-slate-200 text-slate-900 text-sm">
              <tr>
                <td colSpan={5} className="p-3.5 pl-6 text-right">
                  Resultado Consolidado de Manutenções ({selectedMonth}):
                </td>
                <td className="p-3.5 text-right whitespace-nowrap">
                  <span
                    className={`text-base font-extrabold ${
                      summary.netResult >= 0 ? 'text-emerald-700' : 'text-rose-700'
                    }`}
                  >
                    {summary.netResult >= 0 ? '+ ' : ''}
                    {summary.netResult.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </span>
                </td>
                <td></td>
              </tr>
            </tfoot>
          </table>

          {filteredTransactions.length === 0 && (
            <div className="text-center py-10 text-slate-500 text-sm">
              <HelpCircle className="h-8 w-8 mx-auto text-slate-300 mb-2" />
              Nenhum lançamento de manutenção encontrado para os filtros selecionados.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
