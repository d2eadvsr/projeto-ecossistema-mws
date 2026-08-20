import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  DollarSign,
  TrendingUp,
  CreditCard,
  PieChart as PieChartIcon,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Filter,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileSpreadsheet,
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface Transaction {
  id: string
  patientName: string
  caseId: string
  date: string
  totalAmount: number
  dentistShare: number
  labShare: number
  platformFee: number
  paymentMethod: string
  status: 'liquidado' | 'pendente' | 'processando'
  installments?: string
}

const MOCK_METRICS = {
  totalGross: 48500.0,
  dentistNet: 31200.0,
  labCost: 12450.0,
  pendingRelease: 4850.0,
  monthlyGrowth: '+18.4%',
}

const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: 'TRX-9821',
    patientName: 'Maria Silva',
    caseId: 'CAS-2026-001',
    date: '24/02/2026',
    totalAmount: 6800.0,
    dentistShare: 4420.0,
    labShare: 1740.0,
    platformFee: 640.0,
    paymentMethod: 'Cartão 12x',
    status: 'liquidado',
    installments: '12x de R$ 566,66',
  },
  {
    id: 'TRX-9822',
    patientName: 'João Santos',
    caseId: 'CAS-2026-002',
    date: '22/02/2026',
    totalAmount: 4900.0,
    dentistShare: 3185.0,
    labShare: 1250.0,
    platformFee: 465.0,
    paymentMethod: 'Pix à Vista',
    status: 'liquidado',
    installments: 'À vista com desconto',
  },
  {
    id: 'TRX-9823',
    patientName: 'Ana Costa',
    caseId: 'CAS-2026-003',
    date: '20/02/2026',
    totalAmount: 5500.0,
    dentistShare: 3575.0,
    labShare: 1400.0,
    platformFee: 525.0,
    paymentMethod: 'Fintech Parceira (Split)',
    status: 'liquidado',
    installments: '24x Financiado',
  },
  {
    id: 'TRX-9824',
    patientName: 'Pedro Lima',
    caseId: 'CAS-2026-004',
    date: '18/02/2026',
    totalAmount: 6200.0,
    dentistShare: 4030.0,
    labShare: 1580.0,
    platformFee: 590.0,
    paymentMethod: 'Cartão 6x',
    status: 'pendente',
    installments: '6x de R$ 1.033,33',
  },
  {
    id: 'TRX-9825',
    patientName: 'Carla Souza',
    caseId: 'CAS-2026-005',
    date: '15/02/2026',
    totalAmount: 7100.0,
    dentistShare: 4615.0,
    labShare: 1810.0,
    platformFee: 675.0,
    paymentMethod: 'Boleto Bancário',
    status: 'processando',
    installments: 'Entrada + 5 boletos',
  },
]

export default function DentistFinancing() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const { toast } = useToast()

  const filteredTransactions = MOCK_TRANSACTIONS.filter((trx) => {
    const matchesSearch =
      trx.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trx.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trx.caseId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || trx.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleExport = () => {
    toast({
      title: 'Relatório exportado',
      description: 'O arquivo CSV do split financeiro foi gerado com sucesso.',
    })
  }

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
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
            Painel Financeiro & Split Automático
          </h1>
          <p className="text-slate-500 mt-1">
            Controle de orçamentos, faturamento líquido, repasses ao laboratório e split bancário.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleExport} className="border-slate-300">
            <Download className="h-4 w-4 mr-2" /> Exportar Extrato
          </Button>
          <Button onClick={handleWithdraw} className="bg-emerald-600 hover:bg-emerald-700">
            <DollarSign className="h-4 w-4 mr-1.5" /> Solicitar Saque
          </Button>
        </div>
      </div>

      {/* Cards de Métricas */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Faturamento Bruto</CardTitle>
            <DollarSign className="h-4 w-4 text-slate-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">
              {MOCK_METRICS.totalGross.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </div>
            <div className="flex items-center text-xs text-emerald-600 mt-1 font-medium">
              <ArrowUpRight className="h-3.5 w-3.5 mr-0.5" /> {MOCK_METRICS.monthlyGrowth} vs mês
              anterior
            </div>
          </CardContent>
        </Card>

        <Card className="border-emerald-200 bg-emerald-50/50 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-emerald-800">
              Seu Repasse Líquido
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-950">
              {MOCK_METRICS.dentistNet.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </div>
            <p className="text-xs text-emerald-700 mt-1 font-medium">65% do valor total faturado</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Custos de Laboratório
            </CardTitle>
            <CreditCard className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">
              {MOCK_METRICS.labCost.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </div>
            <p className="text-xs text-slate-500 mt-1">Split direto sem bitributação</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">A Liberar / Futuro</CardTitle>
            <Clock className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">
              {MOCK_METRICS.pendingRelease.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </div>
            <p className="text-xs text-amber-700 mt-1 font-medium">
              Parcelas e liquidações pendentes
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Regra de Split Visual */}
      <Card className="border-slate-200 bg-slate-50 shadow-sm">
        <CardContent className="p-4 sm:p-5">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold">
                %
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-900">
                  Como funciona o Split Magic Wire?
                </h4>
                <p className="text-xs text-slate-500">
                  O paciente paga pelo app ou link e cada parte recebe direto na sua conta PJ/PF.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-medium w-full md:w-auto justify-between md:justify-end">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
                <span>Dentista (~65%)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-blue-500" />
                <span>Lab 3D (~25%)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-slate-400" />
                <span>Taxa Tech/Fin (~10%)</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabela de Transações / Orçamentos */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="pb-3 border-b border-slate-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <CardTitle className="text-lg font-bold text-slate-900">
                Histórico de Transações & Orçamentos
              </CardTitle>
              <CardDescription>
                Detalhamento de cada tratamento e divisão de valores
              </CardDescription>
            </div>

            <div className="flex items-center gap-2">
              <Input
                placeholder="Buscar paciente ou ID..."
                className="w-48 sm:w-64 text-xs h-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="h-9 rounded-md border border-input bg-background px-2 text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500"
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
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-100 text-xs font-semibold text-slate-600">
              <tr>
                <th className="p-3.5 pl-6">Paciente / Caso</th>
                <th className="p-3.5">Data & Forma</th>
                <th className="p-3.5">Valor Total</th>
                <th className="p-3.5 text-emerald-700">Seu Líquido</th>
                <th className="p-3.5 text-slate-500">Custo Lab</th>
                <th className="p-3.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTransactions.map((trx) => (
                <tr key={trx.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3.5 pl-6">
                    <p className="font-semibold text-slate-900">{trx.patientName}</p>
                    <p className="text-xs text-slate-400 font-mono">
                      {trx.id} • {trx.caseId}
                    </p>
                  </td>
                  <td className="p-3.5">
                    <p className="font-medium text-slate-800">{trx.paymentMethod}</p>
                    <p className="text-xs text-slate-400">{trx.installments || trx.date}</p>
                  </td>
                  <td className="p-3.5 font-semibold text-slate-900">
                    {trx.totalAmount.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </td>
                  <td className="p-3.5 font-bold text-emerald-700">
                    {trx.dentistShare.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </td>
                  <td className="p-3.5 text-xs text-slate-600 font-medium">
                    {trx.labShare.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </td>
                  <td className="p-3.5">
                    <Badge
                      className={
                        trx.status === 'liquidado'
                          ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-100'
                          : trx.status === 'pendente'
                            ? 'bg-amber-100 text-amber-800 hover:bg-amber-100'
                            : 'bg-blue-100 text-blue-800 hover:bg-blue-100'
                      }
                    >
                      {trx.status === 'liquidado'
                        ? 'Liquidado'
                        : trx.status === 'pendente'
                          ? 'Pendente'
                          : 'Processando'}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredTransactions.length === 0 && (
            <div className="text-center py-8 text-slate-500 text-sm">
              Nenhuma transação encontrada para os filtros aplicados.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
