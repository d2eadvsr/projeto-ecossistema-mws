import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  CreditCard,
  QrCode,
  FileText,
  Download,
  CheckCircle2,
  Clock,
  AlertCircle,
  ShieldCheck,
  Receipt,
  Copy,
  DollarSign,
  Calendar,
  Sparkles,
  Info,
  ExternalLink,
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { useToast } from '@/hooks/use-toast'

interface Installment {
  id: string
  number: number
  totalInstallments: number
  description: string
  amount: number
  dueDate: string
  paidDate?: string
  status: 'paid' | 'pending' | 'overdue'
  paymentMethod?: string
  receiptCode?: string
  invoiceNumber?: string
  pixCode?: string
  boletoBarcode?: string
}

const MOCK_FINANCIAL_SUMMARY = {
  totalTreatmentAmount: 6500.0,
  totalPaidAmount: 2600.0,
  totalRemainingAmount: 3900.0,
  downPayment: 1500.0,
  installmentCount: 10,
  installmentAmount: 500.0,
  contractId: 'MWS-FIN-2026-9921',
  paymentPlan: 'Parcelamento Direto MWS em 10x sem juros',
  responsibleDentist: 'Dra. Aline Costa (Clínica OrthoDesign)',
}

const MOCK_INSTALLMENTS: Installment[] = [
  {
    id: 'inst-0',
    number: 0,
    totalInstallments: 10,
    description: 'Entrada / Setup e Diagnóstico Lingual 3D',
    amount: 1500.0,
    dueDate: '12/01/2026',
    paidDate: '12/01/2026',
    status: 'paid',
    paymentMethod: 'PIX Instantâneo',
    receiptCode: 'REC-2026-0012',
    invoiceNumber: 'NFS-e 88129',
  },
  {
    id: 'inst-1',
    number: 1,
    totalInstallments: 10,
    description: 'Parcela 01/10 - Instalação Dispositivos Linguais',
    amount: 500.0,
    dueDate: '20/02/2026',
    paidDate: '19/02/2026',
    status: 'paid',
    paymentMethod: 'Cartão de Crédito (Final 4092)',
    receiptCode: 'REC-2026-0194',
    invoiceNumber: 'NFS-e 89012',
  },
  {
    id: 'inst-2',
    number: 2,
    totalInstallments: 10,
    description: 'Parcela 02/10 - Fio Lingual Ativo 0.014"',
    amount: 500.0,
    dueDate: '20/03/2026',
    paidDate: '20/03/2026',
    status: 'paid',
    paymentMethod: 'PIX Instantâneo',
    receiptCode: 'REC-2026-0341',
    invoiceNumber: 'NFS-e 90145',
  },
  {
    id: 'inst-3',
    number: 3,
    totalInstallments: 10,
    description: 'Parcela 03/10 - Nivelamento & Conformação',
    amount: 500.0,
    dueDate: '20/04/2026',
    paidDate: '18/04/2026',
    status: 'paid',
    paymentMethod: 'Boleto Bancário',
    receiptCode: 'REC-2026-0489',
    invoiceNumber: 'NFS-e 91230',
  },
  {
    id: 'inst-4',
    number: 4,
    totalInstallments: 10,
    description: 'Parcela 04/10 - Ativação Mensal Lingual',
    amount: 500.0,
    dueDate: '20/05/2026',
    status: 'pending',
    pixCode:
      '00020126580014br.gov.bcb.pix0136mws-clinica-orthodesign-c3d9a1025204000053039865405500.005802BR5925CLINICA ORTHODESIGN6009SAO PAULO62070503***6304E8A1',
    boletoBarcode: '34191.79001 01043.510047 91020.150008 5 96870000050000',
  },
  {
    id: 'inst-5',
    number: 5,
    totalInstallments: 10,
    description: 'Parcela 05/10 - Evolução e Fio Retangular',
    amount: 500.0,
    dueDate: '20/06/2026',
    status: 'pending',
    pixCode:
      '00020126580014br.gov.bcb.pix0136mws-clinica-orthodesign-c3d9a1025204000053039865405500.005802BR5925CLINICA ORTHODESIGN6009SAO PAULO62070503***6304E8A2',
    boletoBarcode: '34191.79001 01043.510047 91020.150008 5 97180000050000',
  },
  {
    id: 'inst-6',
    number: 6,
    totalInstallments: 10,
    description: 'Parcela 06/10 - Fechamento de Espaços',
    amount: 500.0,
    dueDate: '20/07/2026',
    status: 'pending',
    pixCode:
      '00020126580014br.gov.bcb.pix0136mws-clinica-orthodesign-c3d9a1025204000053039865405500.005802BR5925CLINICA ORTHODESIGN6009SAO PAULO62070503***6304E8A3',
    boletoBarcode: '34191.79001 01043.510047 91020.150008 5 97480000050000',
  },
  {
    id: 'inst-7',
    number: 7,
    totalInstallments: 10,
    description: 'Parcela 07/10 - Torque Lingual Customizado',
    amount: 500.0,
    dueDate: '20/08/2026',
    status: 'pending',
    pixCode:
      '00020126580014br.gov.bcb.pix0136mws-clinica-orthodesign-c3d9a1025204000053039865405500.005802BR5925CLINICA ORTHODESIGN6009SAO PAULO62070503***6304E8A4',
    boletoBarcode: '34191.79001 01043.510047 91020.150008 5 97790000050000',
  },
  {
    id: 'inst-8',
    number: 8,
    totalInstallments: 10,
    description: 'Parcela 08/10 - Detalhamento Oclusal',
    amount: 500.0,
    dueDate: '20/09/2026',
    status: 'pending',
    pixCode:
      '00020126580014br.gov.bcb.pix0136mws-clinica-orthodesign-c3d9a1025204000053039865405500.005802BR5925CLINICA ORTHODESIGN6009SAO PAULO62070503***6304E8A5',
    boletoBarcode: '34191.79001 01043.510047 91020.150008 5 98100000050000',
  },
  {
    id: 'inst-9',
    number: 9,
    totalInstallments: 10,
    description: 'Parcela 09/10 - Finalização & Refinamento',
    amount: 500.0,
    dueDate: '20/10/2026',
    status: 'pending',
    pixCode:
      '00020126580014br.gov.bcb.pix0136mws-clinica-orthodesign-c3d9a1025204000053039865405500.005802BR5925CLINICA ORTHODESIGN6009SAO PAULO62070503***6304E8A6',
    boletoBarcode: '34191.79001 01043.510047 91020.150008 5 98400000050000',
  },
  {
    id: 'inst-10',
    number: 10,
    totalInstallments: 10,
    description: 'Parcela 10/10 - Contenção Lingual Definitiva',
    amount: 500.0,
    dueDate: '20/11/2026',
    status: 'pending',
    pixCode:
      '00020126580014br.gov.bcb.pix0136mws-clinica-orthodesign-c3d9a1025204000053039865405500.005802BR5925CLINICA ORTHODESIGN6009SAO PAULO62070503***6304E8A7',
    boletoBarcode: '34191.79001 01043.510047 91020.150008 5 98710000050000',
  },
]

export default function PatientPayments() {
  const [installments, setInstallments] = useState<Installment[]>(MOCK_INSTALLMENTS)
  const [selectedInstallment, setSelectedInstallment] = useState<Installment | null>(null)
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'paid'>('all')
  const { toast } = useToast()

  const paidCount = installments.filter((i) => i.status === 'paid').length
  const pendingCount = installments.filter((i) => i.status === 'pending').length
  const totalPaidSum = installments
    .filter((i) => i.status === 'paid')
    .reduce((acc, i) => acc + i.amount, 0)
  const totalRemainingSum = installments
    .filter((i) => i.status !== 'paid')
    .reduce((acc, i) => acc + i.amount, 0)
  const financialProgress = Math.round(
    (totalPaidSum / MOCK_FINANCIAL_SUMMARY.totalTreatmentAmount) * 100,
  )

  const filteredInstallments = installments.filter((inst) => {
    if (filterStatus === 'all') return true
    return inst.status === filterStatus
  })

  const handleCopyPix = (code?: string) => {
    if (!code) return
    navigator.clipboard.writeText(code)
    toast({
      title: 'Código PIX Copiado!',
      description: 'Cole no aplicativo do seu banco para efetuar o pagamento instantâneo.',
    })
  }

  const handleCopyBarcode = (barcode?: string) => {
    if (!barcode) return
    navigator.clipboard.writeText(barcode)
    toast({
      title: 'Código de Barras Copiado!',
      description: 'Linha digitável pronta para pagamento no seu internet banking.',
    })
  }

  const handleDownloadReceipt = (inst: Installment) => {
    toast({
      title: 'Comprovante Baixado!',
      description: `Comprovante ${inst.receiptCode || inst.invoiceNumber} salvo com sucesso (PDF).`,
    })
  }

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-5xl mx-auto animate-fade-in-up">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
              Pagamentos & Parcelas
            </h1>
            <Badge className="bg-emerald-100 text-emerald-800 font-medium">Contrato Ativo</Badge>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Acompanhe as parcelas do seu tratamento Magic Wire, recibos fiscais e opções de
            pagamento.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="border-slate-300 bg-white text-slate-700 text-xs px-3 py-1.5 font-mono shadow-sm"
          >
            Contrato: <strong>{MOCK_FINANCIAL_SUMMARY.contractId}</strong>
          </Badge>
        </div>
      </div>

      {/* Cartão de Resumo Financeiro Geral */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-slate-200">
          <CardContent className="p-4">
            <span className="text-xs font-semibold text-slate-500">Valor Total do Tratamento</span>
            <p className="text-2xl font-bold text-slate-900 mt-1">
              {MOCK_FINANCIAL_SUMMARY.totalTreatmentAmount.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </p>
            <p className="text-[11px] text-slate-500 mt-1">
              Inclui setup digital 3D + fios linguais + contenção
            </p>
          </CardContent>
        </Card>

        <Card className="border-emerald-200 bg-emerald-50/40">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-emerald-800">Total Pago</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-2xl font-bold text-emerald-900 mt-1">
              {totalPaidSum.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </p>
            <p className="text-[11px] text-emerald-700 mt-1 font-medium">
              {paidCount} de {installments.length} parcelas quitadas
            </p>
          </CardContent>
        </Card>

        <Card className="border-amber-200 bg-amber-50/40">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-amber-800">Saldo Restante</span>
              <Clock className="w-4 h-4 text-amber-600" />
            </div>
            <p className="text-2xl font-bold text-amber-900 mt-1">
              {totalRemainingSum.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </p>
            <p className="text-[11px] text-amber-700 mt-1 font-medium">
              {pendingCount} parcelas a vencer
            </p>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50/40">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-purple-800">Quitação</span>
              <Sparkles className="w-4 h-4 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-purple-900 mt-1">{financialProgress}%</p>
            <Progress
              value={financialProgress}
              className="h-1.5 mt-2 bg-purple-200 [&>div]:bg-purple-600"
            />
          </CardContent>
        </Card>
      </div>

      {/* Próximo Vencimento em Destaque */}
      {installments.find((i) => i.status === 'pending') && (
        <Card className="border-emerald-300 bg-gradient-to-r from-emerald-50/80 via-white to-white shadow-sm">
          <CardContent className="p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge className="bg-amber-500 hover:bg-amber-600 text-white text-xs">
                    Próxima Parcela a Vencer
                  </Badge>
                  <span className="text-xs text-slate-500 font-medium">
                    Vencimento:{' '}
                    <strong className="text-slate-900">
                      {installments.find((i) => i.status === 'pending')?.dueDate}
                    </strong>
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  {installments.find((i) => i.status === 'pending')?.description}
                </h3>
                <p className="text-2xl font-extrabold text-emerald-700">
                  {installments
                    .find((i) => i.status === 'pending')
                    ?.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Button
                  className="bg-emerald-600 hover:bg-emerald-700"
                  onClick={() =>
                    setSelectedInstallment(installments.find((i) => i.status === 'pending') || null)
                  }
                >
                  <QrCode className="w-4 h-4 mr-2" /> Pagar com PIX / Boleto
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tabs: Todas as Parcelas vs Comprovantes e Notas Fiscais */}
      <Tabs defaultValue="parcelas" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="parcelas" className="flex items-center gap-2">
            <CreditCard className="w-4 h-4" />
            Parcelas ({installments.length})
          </TabsTrigger>
          <TabsTrigger value="recibos" className="flex items-center gap-2">
            <Receipt className="w-4 h-4" />
            Recibos e Comprovantes ({paidCount})
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: Parcelas */}
        <TabsContent value="parcelas" className="space-y-4 pt-4">
          {/* Filtros rápidos */}
          <div className="flex items-center gap-2 pb-1">
            <Button
              size="sm"
              variant={filterStatus === 'all' ? 'default' : 'outline'}
              onClick={() => setFilterStatus('all')}
              className={filterStatus === 'all' ? 'bg-slate-800 text-xs' : 'text-xs'}
            >
              Todas ({installments.length})
            </Button>
            <Button
              size="sm"
              variant={filterStatus === 'pending' ? 'default' : 'outline'}
              onClick={() => setFilterStatus('pending')}
              className={
                filterStatus === 'pending' ? 'bg-amber-600 hover:bg-amber-700 text-xs' : 'text-xs'
              }
            >
              Pendentes ({pendingCount})
            </Button>
            <Button
              size="sm"
              variant={filterStatus === 'paid' ? 'default' : 'outline'}
              onClick={() => setFilterStatus('paid')}
              className={
                filterStatus === 'paid' ? 'bg-emerald-600 hover:bg-emerald-700 text-xs' : 'text-xs'
              }
            >
              Pagas ({paidCount})
            </Button>
          </div>

          <div className="space-y-3">
            {filteredInstallments.map((inst) => {
              const isPaid = inst.status === 'paid'
              return (
                <Card
                  key={inst.id}
                  className={`border transition-all ${
                    isPaid ? 'border-slate-200 bg-white' : 'border-amber-200/80 bg-amber-50/20'
                  }`}
                >
                  <CardContent className="p-4 sm:p-5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              isPaid ? 'bg-emerald-500' : 'bg-amber-500'
                            }`}
                          />
                          <h4 className="text-sm font-bold text-slate-900">{inst.description}</h4>
                          <Badge
                            variant="outline"
                            className={`text-[11px] font-semibold ${
                              isPaid
                                ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                                : 'bg-amber-100 text-amber-800 border-amber-300'
                            }`}
                          >
                            {isPaid ? 'Pago' : 'Pendente'}
                          </Badge>
                        </div>

                        <p className="text-xs text-slate-500">
                          {isPaid ? (
                            <span>
                              Pago em <strong>{inst.paidDate}</strong> via {inst.paymentMethod}
                            </span>
                          ) : (
                            <span>
                              Vencimento: <strong className="text-slate-800">{inst.dueDate}</strong>
                            </span>
                          )}
                        </p>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-0 border-slate-100">
                        <div className="text-left sm:text-right">
                          <p className="text-base font-bold text-slate-900">
                            {inst.amount.toLocaleString('pt-BR', {
                              style: 'currency',
                              currency: 'BRL',
                            })}
                          </p>
                        </div>

                        {isPaid ? (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDownloadReceipt(inst)}
                            className="text-xs border-slate-300 hover:bg-slate-50"
                          >
                            <Download className="w-3.5 h-3.5 mr-1 text-slate-500" /> Recibo
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            onClick={() => setSelectedInstallment(inst)}
                            className="bg-emerald-600 hover:bg-emerald-700 text-xs"
                          >
                            <QrCode className="w-3.5 h-3.5 mr-1" /> Pagar
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        {/* Tab 2: Recibos e Comprovantes */}
        <TabsContent value="recibos" className="space-y-4 pt-4">
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Receipt className="w-5 h-5 text-emerald-600" />
                Histórico de Comprovantes & Notas Fiscais
              </CardTitle>
              <CardDescription>
                Documentos emitidos para fins de restituição de Imposto de Renda (IRPF) e
                comprovação de pagamento do tratamento.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {installments
                .filter((i) => i.status === 'paid')
                .map((inst) => (
                  <div
                    key={inst.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors gap-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-emerald-600" />
                        <h4 className="text-sm font-bold text-slate-900">{inst.description}</h4>
                      </div>
                      <p className="text-xs text-slate-500">
                        Código: <span className="font-mono">{inst.receiptCode}</span> •{' '}
                        {inst.invoiceNumber} • Pago em {inst.paidDate}
                      </p>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3">
                      <span className="text-sm font-bold text-emerald-800">
                        {inst.amount.toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        })}
                      </span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDownloadReceipt(inst)}
                        className="text-xs bg-white border-slate-300"
                      >
                        <Download className="w-3.5 h-3.5 mr-1.5 text-emerald-600" /> Baixar PDF
                      </Button>
                    </div>
                  </div>
                ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Modal de Pagamento PIX e Boleto */}
      <Dialog
        open={!!selectedInstallment}
        onOpenChange={(open) => !open && setSelectedInstallment(null)}
      >
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-slate-900">
              <QrCode className="w-5 h-5 text-emerald-600" />
              Pagamento da Parcela
            </DialogTitle>
            <DialogDescription>
              {selectedInstallment?.description} • Vencimento: {selectedInstallment?.dueDate}
            </DialogDescription>
          </DialogHeader>

          {selectedInstallment && (
            <div className="space-y-4 pt-2">
              <div className="text-center p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                <span className="text-xs text-emerald-800 font-medium">Valor a Pagar</span>
                <p className="text-3xl font-extrabold text-emerald-900 mt-1">
                  {selectedInstallment.amount.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </p>
                <p className="text-xs text-emerald-700 mt-1">
                  Beneficiário: Clínica OrthoDesign Jardins (Magic Wire)
                </p>
              </div>

              {/* Opção PIX */}
              <div className="space-y-2 border border-slate-200 rounded-xl p-4 bg-white">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-emerald-600" /> PIX Copia e Cola (Aprovação
                    Imediata)
                  </span>
                  <Badge className="bg-emerald-100 text-emerald-800 text-[10px]">Recomendado</Badge>
                </div>

                <div className="bg-slate-100 p-2.5 rounded text-[11px] font-mono text-slate-700 break-all border border-slate-200">
                  {selectedInstallment.pixCode || '00020126580014br.gov.bcb.pix0136mws-clinica...'}
                </div>

                <Button
                  size="sm"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-xs"
                  onClick={() => handleCopyPix(selectedInstallment.pixCode)}
                >
                  <Copy className="w-3.5 h-3.5 mr-1.5" /> Copiar Código PIX
                </Button>
              </div>

              {/* Opção Boleto */}
              {selectedInstallment.boletoBarcode && (
                <div className="space-y-2 border border-slate-200 rounded-xl p-4 bg-white">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-blue-600" /> Linha Digitável do Boleto
                    </span>
                  </div>

                  <div className="bg-slate-100 p-2 rounded text-[11px] font-mono text-slate-700 break-all border border-slate-200">
                    {selectedInstallment.boletoBarcode}
                  </div>

                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full text-xs border-slate-300"
                    onClick={() => handleCopyBarcode(selectedInstallment.boletoBarcode)}
                  >
                    <Copy className="w-3.5 h-3.5 mr-1.5" /> Copiar Linha Digitável
                  </Button>
                </div>
              )}

              <div className="text-[11px] text-slate-500 text-center flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Pagamento seguro e processado com baixa automática no prontuário.
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
