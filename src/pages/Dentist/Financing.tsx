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
  Download,
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface FinancialRecord {
  id: string
  patientName: string
  classification: string
  planning: string
  treatmentDuration: string
  paymentMethod: string
  suggestedPriceMWS: number
  chargedPrice: number
  closingMonth: string
  status: 'liquidado' | 'pendente' | 'processando'
}

const MOCK_METRICS = {
  totalGross: 48500.0,
  dentistNet: 31200.0,
  labCost: 12450.0,
  monthlyGrowth: '+18.4%',
}

const MOCK_RECORDS: FinancialRecord[] = [
  {
    id: 'ORC-1001',
    patientName: 'Maria Silva',
    classification: 'Classe II div 1',
    planning: 'Alinhador Completo + Mini-implante',
    treatmentDuration: '14 meses',
    paymentMethod: 'Cartão de Crédito (12x)',
    suggestedPriceMWS: 7200.0,
    chargedPrice: 7500.0,
    closingMonth: 'Fevereiro/2026',
    status: 'liquidado',
  },
  {
    id: 'ORC-1002',
    patientName: 'João Santos',
    classification: 'Classe I com Apinhamento',
    planning: 'Magic Wire Premium Dual Arch',
    treatmentDuration: '10 meses',
    paymentMethod: 'Pix à Vista',
    suggestedPriceMWS: 5400.0,
    chargedPrice: 5200.0,
    closingMonth: 'Fevereiro/2026',
    status: 'liquidado',
  },
  {
    id: 'ORC-1003',
    patientName: 'Ana Costa',
    classification: 'Classe III Leve',
    planning: 'Expansão Guiada + Alinhadores',
    treatmentDuration: '18 meses',
    paymentMethod: 'Financiamento Parcelado (24x)',
    suggestedPriceMWS: 8900.0,
    chargedPrice: 9200.0,
    closingMonth: 'Fevereiro/2026',
    status: 'liquidado',
  },
  {
    id: 'ORC-1004',
    patientName: 'Pedro Lima',
    classification: 'Mordida Cruzada Posterior',
    planning: 'Disjuntor Híbrido + Magic Wire',
    treatmentDuration: '12 meses',
    paymentMethod: 'Cartão de Crédito (6x)',
    suggestedPriceMWS: 6500.0,
    chargedPrice: 6500.0,
    closingMonth: 'Janeiro/2026',
    status: 'pendente',
  },
  {
    id: 'ORC-1005',
    patientName: 'Carla Souza',
    classification: 'Classe II div 2',
    planning: 'Alinhamento 3D Sequenciado',
    treatmentDuration: '16 meses',
    paymentMethod: 'Boleto Bancário (1+5x)',
    suggestedPriceMWS: 7800.0,
    chargedPrice: 8100.0,
    closingMonth: 'Janeiro/2026',
    status: 'processando',
  },
  {
    id: 'ORC-1006',
    patientName: 'Lucas Ferreira',
    classification: 'Mordida Aberta Anterior',
    planning: 'Intrusão Posterior + Alinhadores MWS',
    treatmentDuration: '15 meses',
    paymentMethod: 'Cartão de Crédito (10x)',
    suggestedPriceMWS: 7600.0,
    chargedPrice: 7800.0,
    closingMonth: 'Dezembro/2025',
    status: 'liquidado',
  },
  {
    id: 'ORC-1007',
    patientName: 'Beatriz Almeida',
    classification: 'Classe I com Diastemas',
    planning: 'Fechamento Estético Magic Wire Light',
    treatmentDuration: '8 meses',
    paymentMethod: 'Pix Parcelado (4x)',
    suggestedPriceMWS: 4200.0,
    chargedPrice: 4200.0,
    closingMonth: 'Dezembro/2025',
    status: 'liquidado',
  },
]

export default function DentistFinancing() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const { toast } = useToast()

  const grossMonthlyResult = MOCK_METRICS.totalGross - MOCK_METRICS.labCost

  const filteredRecords = MOCK_RECORDS.filter((rec) => {
    const matchesSearch =
      rec.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.classification.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.planning.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.paymentMethod.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.closingMonth.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || rec.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleExport = () => {
    toast({
      title: 'Relatório exportado',
      description: 'O arquivo CSV do relatório financeiro foi gerado com sucesso.',
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
            Painel Financeiro
          </h1>
          <p className="text-slate-500 mt-1">
            Controle financeiro de orçamentos, faturamento bruto e custos de tratamentos
            ortodônticos.
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
            <CardTitle className="text-sm font-medium text-slate-600">
              Faturamento Bruto Mensal
            </CardTitle>
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
            <CardTitle className="text-sm font-medium text-slate-600">
              Resultado Mensal Bruto
            </CardTitle>
            <PieChartIcon className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">
              {grossMonthlyResult.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </div>
            <p className="text-xs text-slate-500 mt-1 font-medium">
              Faturamento bruto menos custos de laboratório
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabela de Transações / Orçamentos */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="pb-3 border-b border-slate-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <CardTitle className="text-lg font-bold text-slate-900">
                Histórico de Transações & Orçamentos
              </CardTitle>
              <CardDescription>
                Detalhamento dos orçamentos, planejamentos e valores cobrados
              </CardDescription>
            </div>

            <div className="flex items-center gap-2">
              <Input
                placeholder="Buscar paciente, classificação..."
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
          <table className="w-full text-left text-sm min-w-[850px]">
            <thead className="bg-slate-50 border-b border-slate-100 text-xs font-semibold text-slate-600">
              <tr>
                <th className="p-3.5 pl-6">Paciente</th>
                <th className="p-3.5">Classificação</th>
                <th className="p-3.5">Planejamento</th>
                <th className="p-3.5 whitespace-nowrap">Tempo de Tratamento</th>
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
              {filteredRecords.map((rec) => (
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
                  <td className="p-3.5 text-slate-700 text-xs">{rec.paymentMethod}</td>
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
                          ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-100'
                          : rec.status === 'pendente'
                            ? 'bg-amber-100 text-amber-800 hover:bg-amber-100'
                            : 'bg-blue-100 text-blue-800 hover:bg-blue-100'
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
              ))}
            </tbody>
          </table>

          {filteredRecords.length === 0 && (
            <div className="text-center py-8 text-slate-500 text-sm">
              Nenhum registro encontrado para os filtros aplicados.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
