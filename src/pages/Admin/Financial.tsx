import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DollarSign,
  TrendingUp,
  CreditCard,
  Download,
  Search,
  PieChart as PieChartIcon,
  CheckCircle2,
  Clock,
  AlertCircle,
  Split,
  Building,
  ArrowUpRight,
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { FinancialBoleto, MOCK_ADMIN_BOLETOS } from './mockData'

export default function AdminFinancial() {
  const [boletos, setBoletos] = useState<FinancialBoleto[]>(MOCK_ADMIN_BOLETOS)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const { toast } = useToast()

  // Métricas financeiras consolidadas (consistentes com MRR R$ 145k)
  const totalFaturadoMes = 145000.0
  const totalRepassesOrtodontistas = 87000.0 // 60%
  const totalCustosLab = 29000.0 // 20%
  const receitaLiquidaMWS = 29000.0 // 20% margem operacional líquida

  const filteredBoletos = boletos.filter((b) => {
    const matchesSearch =
      b.recipientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || b.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleExportCSV = () => {
    toast({
      title: 'Extrato Financeiro Exportado!',
      description:
        'O relatório consolidado de conciliação e split bancário foi baixado com sucesso.',
    })
  }

  const handleExecuteSplit = () => {
    toast({
      title: 'Rotina de Split Bancário Executada!',
      description:
        'Todos os repasses aos ortodontistas e parceiros de MKT/Vendas foram processados via API da Fintech.',
    })
  }

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto animate-fade-in-up">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
            Financeiro & Split de Pagamentos
          </h1>
          <p className="text-slate-500 mt-1">
            Gestão de licenciamentos (R$ 24k), emissão de boletos, conciliação e automação de split
            (Dentista x MWS x MKT/Vendas).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleExportCSV} className="border-slate-300">
            <Download className="w-4 h-4 mr-2" /> Exportar Relatório
          </Button>
          <Button
            onClick={handleExecuteSplit}
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            <Split className="w-4 h-4 mr-2" /> Executar Split Automático
          </Button>
        </div>
      </div>

      {/* 4 Cards de Métricas Financeiras */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium text-slate-600">
              Faturamento Bruto (MRR)
            </CardTitle>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">
              {totalFaturadoMes.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </div>
            <p className="text-xs text-emerald-600 flex items-center mt-1 font-medium">
              <ArrowUpRight className="h-3 w-3 mr-0.5" /> +12% vs mês anterior
            </p>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium text-slate-600">
              Repasses Ortodontistas
            </CardTitle>
            <CreditCard className="w-4 h-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">
              {totalRepassesOrtodontistas.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </div>
            <p className="text-xs text-slate-500 mt-1 font-medium">
              Repasse automático sem bitributação
            </p>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium text-slate-600">
              Custos de Laboratório
            </CardTitle>
            <Building className="w-4 h-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">
              {totalCustosLab.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </div>
            <p className="text-xs text-slate-500 mt-1 font-medium">Fios customizados e mentoria</p>
          </CardContent>
        </Card>

        <Card className="border-emerald-200 bg-emerald-50/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium text-emerald-800">
              Resultado Líquido MWS
            </CardTitle>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-950">
              {receitaLiquidaMWS.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </div>
            <p className="text-xs text-emerald-700 mt-1 font-medium">Margem líquida da operadora</p>
          </CardContent>
        </Card>
      </div>

      {/* Box Didático da Regra de Split da Planilha (R$ 200: R$ 100 Dentista / R$ 50 MKT / R$ 50 Vendas) */}
      <Card className="border-slate-200 shadow-sm bg-gradient-to-r from-slate-50 via-white to-emerald-50/30">
        <CardHeader className="pb-3 border-b border-slate-100">
          <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Split className="w-4 h-4 text-emerald-600" /> Regra do Split Pacote de Vendas (Conforme
            Planilha de Negócio)
          </CardTitle>
          <CardDescription className="text-xs text-slate-500">
            Solução para impulsionamento regional que o ortodontista não domina: divisão dos R$ 200
            da 1ª consulta
          </CardDescription>
        </CardHeader>
        <CardContent className="p-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/60">
              <span className="text-xs text-emerald-800 font-bold block">R$ 100,00 (50%)</span>
              <p className="text-sm font-semibold text-slate-900 mt-1">Ortodontista Licenciado</p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Honorários da 1ª consulta clínica realizada no consultório.
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-blue-200 bg-blue-50/60">
              <span className="text-xs text-blue-800 font-bold block">R$ 50,00 (25%)</span>
              <p className="text-sm font-semibold text-slate-900 mt-1">
                Time de Marketing (Murilo / MWS)
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Reinvestimento em tráfego pago regional e aquisição de leads.
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-purple-200 bg-purple-50/60">
              <span className="text-xs text-purple-800 font-bold block">R$ 50,00 (25%)</span>
              <p className="text-sm font-semibold text-slate-900 mt-1">
                Time de Vendas da Plataforma
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                SDRs e especialistas de conversão em SP para agendamento.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabela de Boletos & Cobranças */}
      <Card className="border-slate-200 shadow-sm overflow-hidden">
        <CardHeader className="pb-3 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <CardTitle className="text-base font-bold text-slate-900">
              Gestão de Boletos & Cobranças Registradas
            </CardTitle>
            <CardDescription className="text-xs text-slate-500">
              Acompanhamento de liquidação de taxas de adesão (R$ 24k) e casos clínicos
            </CardDescription>
          </div>

          <div className="flex items-center gap-2">
            <Input
              placeholder="Buscar favorecido, descrição..."
              className="w-48 sm:w-64 text-xs h-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-9 rounded-md border border-input bg-background px-2 text-xs focus:outline-none"
            >
              <option value="all">Todos os Status</option>
              <option value="liquidado">Liquidados</option>
              <option value="emitido">Emitidos</option>
              <option value="atrasado">Atrasados</option>
            </select>
          </div>
        </CardHeader>

        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-left text-sm min-w-[850px]">
            <thead className="bg-slate-50 border-b border-slate-100 text-xs font-semibold text-slate-600">
              <tr>
                <th className="p-3.5 pl-6">ID / Favorecido</th>
                <th className="p-3.5">Tipo</th>
                <th className="p-3.5">Descrição</th>
                <th className="p-3.5 text-right">Valor</th>
                <th className="p-3.5">Emissão</th>
                <th className="p-3.5">Vencimento</th>
                <th className="p-3.5 pr-6 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredBoletos.map((b) => (
                <tr key={b.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-3.5 pl-6">
                    <p className="font-semibold text-slate-900">{b.recipientName}</p>
                    <p className="text-xs text-slate-400 font-mono">{b.id}</p>
                  </td>
                  <td className="p-3.5">
                    <Badge variant="outline" className="text-xs bg-slate-50">
                      {b.recipientType}
                    </Badge>
                  </td>
                  <td className="p-3.5 text-xs text-slate-700 font-medium max-w-[280px]">
                    {b.description}
                  </td>
                  <td className="p-3.5 text-right font-bold text-slate-900">
                    {b.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </td>
                  <td className="p-3.5 text-xs text-slate-600">{b.issueDate}</td>
                  <td className="p-3.5 text-xs text-slate-600">{b.dueDate}</td>
                  <td className="p-3.5 pr-6 text-center">
                    {b.status === 'liquidado' && (
                      <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 text-xs">
                        Liquidado
                      </Badge>
                    )}
                    {b.status === 'emitido' && (
                      <Badge className="bg-blue-100 text-blue-800 border-blue-200 text-xs">
                        Emitido
                      </Badge>
                    )}
                    {b.status === 'atrasado' && (
                      <Badge className="bg-red-100 text-red-800 border-red-200 text-xs">
                        Atrasado
                      </Badge>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
