import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  CreditCard,
  CheckCircle2,
  HelpCircle,
  FileText,
  Clock,
  Sparkles,
  ShieldCheck,
  Bot,
  Percent,
  Calendar,
  AlertCircle,
  Phone,
  ArrowRight,
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { MOCK_LEAD_USER } from './mockData'

export default function LeadBudget() {
  const { toast } = useToast()
  const [budget, setBudget] = useState(MOCK_LEAD_USER.budget)
  const dentist = MOCK_LEAD_USER.assignedDentist

  // Toggle para testar o estado vazio solicitado na especificação
  const [hasBudget, setHasBudget] = useState(true)

  // Modais mockados
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false)
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false)
  const [questionText, setQuestionText] = useState('')
  const [selectedPaymentMode, setSelectedPaymentMode] = useState<'installment' | 'cash'>(
    'installment',
  )

  const handleAcceptBudget = () => {
    setIsAcceptModalOpen(false)
    setBudget((prev) => ({
      ...prev,
      status: 'aceito',
    }))
    toast({
      title: 'Orçamento Aceito com Sucesso! 🎉',
      description:
        'Parabéns! Sua proposta foi enviada ao Time ADM MWS. Em instantes o boleto oficial da entrada será gerado.',
    })
  }

  const handleSendQuestion = (e: React.FormEvent) => {
    e.preventDefault()
    setIsQuestionModalOpen(false)
    toast({
      title: 'Dúvida Enviada!',
      description: `Sua mensagem foi repassada ao Dr. Gustavo Siqueira e ao Time ADM MWS. Retornaremos em breve via WhatsApp.`,
    })
    setQuestionText('')
  }

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-6xl mx-auto animate-fade-in-up">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
              Meu Orçamento de Tratamento
            </h1>
            {hasBudget && (
              <Badge
                className={
                  budget.status === 'aceito'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-emerald-100 text-emerald-800 border-emerald-300'
                }
              >
                {budget.status === 'aceito' ? 'Orçamento Aceito' : 'Disponível para Análise'}
              </Badge>
            )}
          </div>
          <p className="text-slate-500 mt-1 text-sm">
            Proposta elaborada com base no Protocolo MWS oficial após sua primeira consulta.
          </p>
        </div>

        {/* Botão de teste para alternar entre com orçamento e estado vazio */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-xs text-slate-500 hover:text-slate-900"
            onClick={() => setHasBudget(!hasBudget)}
          >
            {hasBudget ? 'Simular: Orçamento Ainda Não Emitido' : 'Simular: Com Orçamento'}
          </Button>
        </div>
      </div>

      {/* ESTADO VAZIO: caso o orçamento ainda não tenha sido emitido */}
      {!hasBudget ? (
        <Card className="border-dashed border-2 border-slate-300 p-8 text-center space-y-4 bg-slate-50/50">
          <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center mx-auto">
            <Clock className="w-8 h-8 text-slate-400" />
          </div>
          <div className="max-w-md mx-auto space-y-2">
            <h3 className="text-xl font-bold text-slate-900">
              Seu orçamento será disponibilizado após sua primeira consulta
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              O ortodontista credenciado ({dentist.name}) precisa realizar o escaneamento intraoral
              3D e avaliar sua queixa para definir o Protocolo MWS (Classe I a V) e o tempo exato do
              tratamento.
            </p>
          </div>
          <div className="pt-2">
            <Link to="/lead/consulta">
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-6">
                Ver Detalhes da Minha Primeira Consulta →
              </Button>
            </Link>
          </div>
        </Card>
      ) : (
        /* ESTADO COM ORÇAMENTO ELABORADO */
        <div className="space-y-6">
          {/* Card Resumo do Protocolo e Tempo de Tratamento */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="border-slate-200 shadow-sm bg-gradient-to-br from-slate-50 to-white">
              <CardHeader className="pb-2">
                <CardDescription className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Classificação Clínica MWS
                </CardDescription>
                <CardTitle className="text-xl text-emerald-800 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-emerald-600" />
                  {budget.protocolClass}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-slate-600">
                <p className="font-medium text-slate-900">Protocolo Moderado</p>
                <p className="text-slate-500">Dobras robotizadas customizadas</p>
              </CardContent>
            </Card>

            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="pb-2">
                <CardDescription className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Tempo Estimado
                </CardDescription>
                <CardTitle className="text-xl text-slate-900 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-teal-600" />
                  {budget.estimatedMonths} Meses
                </CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-slate-600">
                <p className="font-medium text-slate-900">Previsibilidade Robótica</p>
                <p className="text-slate-500">Ativações periódicas inclusas</p>
              </CardContent>
            </Card>

            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="pb-2">
                <CardDescription className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Preço Sugerido MWS
                </CardDescription>
                <CardTitle className="text-xl text-slate-400 line-through">
                  R$ {budget.suggestedMwsPrice.toLocaleString('pt-BR')},00
                </CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-emerald-700">
                <p className="font-semibold flex items-center gap-1">
                  <Percent className="w-3.5 h-3.5" /> Desconto MWS: -R$ {budget.discountValue},00
                </p>
              </CardContent>
            </Card>

            <Card className="border-emerald-200 bg-emerald-50/70 shadow-sm">
              <CardHeader className="pb-2">
                <CardDescription className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
                  Preço Final Cobrado
                </CardDescription>
                <CardTitle className="text-2xl font-black text-emerald-900">
                  R$ {budget.finalPrice.toLocaleString('pt-BR')},00
                </CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-emerald-800">
                <p className="font-medium">
                  12x de R${' '}
                  {budget.paymentOptions.installment.installmentValue.toLocaleString('pt-BR', {
                    minimumFractionDigits: 2,
                  })}
                </p>
                <p className="text-emerald-600 font-semibold">Entrada facilitada no split MWS</p>
              </CardContent>
            </Card>
          </div>

          {/* Grid Principal: Formas de Pagamento + Itens Inclusos */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Coluna Esquerda: Formas de Pagamento e Condições */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg text-slate-900">
                    Formas de Pagamento Aprovadas
                  </CardTitle>
                  <CardDescription>
                    Selecione a modalidade de sua preferência para fechar seu tratamento
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Opção Parcelada */}
                  <div
                    onClick={() => setSelectedPaymentMode('installment')}
                    className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                      selectedPaymentMode === 'installment'
                        ? 'border-emerald-600 bg-emerald-50/50 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            checked={selectedPaymentMode === 'installment'}
                            onChange={() => setSelectedPaymentMode('installment')}
                            className="text-emerald-600 focus:ring-emerald-500"
                          />
                          <span className="font-bold text-slate-900 text-sm">
                            Entrada + 12 Parcelas Sem Juros (Recomendado)
                          </span>
                          <Badge className="bg-emerald-600 text-white text-[10px]">
                            Mais Escolhido
                          </Badge>
                        </div>
                        <p className="text-xs text-slate-600 pl-5">
                          {budget.paymentOptions.installment.paymentMethod}
                        </p>
                      </div>

                      <div className="text-right">
                        <span className="text-xs text-slate-400 block">Total</span>
                        <span className="text-base font-bold text-slate-900">
                          R$ {budget.paymentOptions.installment.totalValue.toLocaleString('pt-BR')}
                          ,00
                        </span>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-slate-200/60 grid grid-cols-2 gap-3 text-xs pl-5">
                      <div className="p-2 rounded bg-white border border-slate-200">
                        <span className="text-slate-500 block">Entrada (Boleto MWS)</span>
                        <span className="font-bold text-slate-900">
                          R$ {budget.paymentOptions.installment.entryFee.toLocaleString('pt-BR')},00
                        </span>
                      </div>
                      <div className="p-2 rounded bg-white border border-slate-200">
                        <span className="text-slate-500 block">Mensalidades</span>
                        <span className="font-bold text-emerald-800">
                          12x de R${' '}
                          {budget.paymentOptions.installment.installmentValue.toLocaleString(
                            'pt-BR',
                            { minimumFractionDigits: 2 },
                          )}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Opção À Vista */}
                  <div
                    onClick={() => setSelectedPaymentMode('cash')}
                    className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                      selectedPaymentMode === 'cash'
                        ? 'border-emerald-600 bg-emerald-50/50 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            checked={selectedPaymentMode === 'cash'}
                            onChange={() => setSelectedPaymentMode('cash')}
                            className="text-emerald-600 focus:ring-emerald-500"
                          />
                          <span className="font-bold text-slate-900 text-sm">
                            Pagamento À Vista com 5% de Desconto Adicional
                          </span>
                          <Badge
                            variant="outline"
                            className="border-emerald-600 text-emerald-700 bg-emerald-50 text-[10px]"
                          >
                            Economize R$ 445,00
                          </Badge>
                        </div>
                        <p className="text-xs text-slate-600 pl-5">
                          {budget.paymentOptions.cash.method}
                        </p>
                      </div>

                      <div className="text-right">
                        <span className="text-xs text-slate-400 block">Valor À Vista</span>
                        <span className="text-lg font-black text-emerald-800">
                          R$ {budget.paymentOptions.cash.price.toLocaleString('pt-BR')},00
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Botões de Ação do Orçamento */}
                  <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                    <Button
                      variant="outline"
                      onClick={() => setIsQuestionModalOpen(true)}
                      className="border-slate-300 text-slate-700 text-xs"
                    >
                      <HelpCircle className="w-4 h-4 mr-1.5 text-slate-500" /> Tenho Dúvidas sobre o
                      Orçamento
                    </Button>

                    {budget.status !== 'aceito' ? (
                      <Button
                        onClick={() => setIsAcceptModalOpen(true)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs px-6 shadow"
                      >
                        <CheckCircle2 className="w-4 h-4 mr-2" /> Aceitar Orçamento & Iniciar
                        Tratamento
                      </Button>
                    ) : (
                      <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-100 px-4 py-2 rounded-lg">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        Orçamento Aprovado — Aguardando emissão do boleto Time ADM
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Detalhamento dos Itens Inclusos na Proposta */}
              <Card className="border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-base text-slate-900">
                    O Que Está Incluso no Tratamento
                  </CardTitle>
                  <CardDescription>Transparência total sem custos ocultos</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {budget.breakdown.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200/80 text-xs"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-slate-900 block">{item.item}</span>
                        <p className="text-slate-600 mt-0.5">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Coluna Direita: Resumo, Vantagens e Próximo Passo */}
            <div className="space-y-6">
              <Card className="border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-base text-slate-900">Resumo da Proposta</CardTitle>
                  <CardDescription>Código: {budget.id}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 text-xs">
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-500">Ortodontista:</span>
                    <span className="font-semibold text-slate-900">{dentist.name}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-500">Emissão:</span>
                    <span className="text-slate-800">{budget.issuedAt}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-500">Validade da Proposta:</span>
                    <span className="font-semibold text-emerald-800">{budget.validUntil}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-500">Garantia Nacional:</span>
                    <span className="text-slate-800">182 Clínicas MWS</span>
                  </div>
                  <div className="flex justify-between py-1.5 font-bold text-sm text-slate-900">
                    <span>Valor Total Aprovado:</span>
                    <span className="text-emerald-700">
                      R$ {budget.finalPrice.toLocaleString('pt-BR')},00
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Vantagens Exclusivas MWS */}
              <Card className="border-emerald-100 bg-emerald-950 text-white shadow-sm">
                <CardContent className="p-5 space-y-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                      Garantias do Ecossistema MWS
                    </span>
                  </div>
                  <ul className="text-xs space-y-2 text-emerald-100">
                    {budget.includedBenefits.map((b, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Contato Direto com Consultório */}
              <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-700 space-y-2">
                <span className="font-semibold text-slate-900 block">
                  Dúvida sobre formas de pagamento?
                </span>
                <p className="text-slate-600">
                  Fale diretamente com a equipe financeira da {dentist.clinicName} ou com o Time ADM
                  MWS.
                </p>
                <a
                  href={`https://wa.me/${dentist.whatsapp}?text=Ol%C3%A1,%20gostaria%20de%20esclarecer%20uma%20d%C3%BAvida%20sobre%20as%20parcelas%20do%20meu%20or%C3%A7amento%20Magic%20Wire.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block pt-1"
                >
                  <Button variant="outline" size="sm" className="w-full text-xs bg-white">
                    <Phone className="w-3.5 h-3.5 mr-1.5 text-emerald-600" /> Chamar no WhatsApp
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL MOCKADO: Aceitar Orçamento */}
      <Dialog open={isAcceptModalOpen} onOpenChange={setIsAcceptModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Confirmar Aceite do Orçamento</DialogTitle>
            <DialogDescription>
              Você está aprovando o plano de tratamento com Fios Mágicos ({budget.protocolClass}).
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-3 text-xs text-slate-700">
            <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 space-y-1">
              <span className="font-bold text-emerald-900 block">
                Resumo da Modalidade Escolhida:
              </span>
              <p className="text-emerald-800">
                {selectedPaymentMode === 'installment'
                  ? `Parcelado: Entrada de R$ 1.500 no boleto + 12x de R$ 616,67 (Total R$ ${budget.finalPrice.toLocaleString('pt-BR')})`
                  : `À Vista: R$ ${budget.paymentOptions.cash.price.toLocaleString('pt-BR')} via Pix/Boleto`}
              </p>
            </div>

            <p className="leading-relaxed">
              Ao confirmar, o Time ADM MWS emitirá o boleto da entrada/split para formalização e o
              Laboratório MWS iniciará o planejamento do seu caso com fabricação robótica
              customizada.
            </p>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsAcceptModalOpen(false)}>
              Voltar
            </Button>
            <Button
              onClick={handleAcceptBudget}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              Confirmar e Emitir Boleto
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* MODAL MOCKADO: Tenho Dúvidas */}
      <Dialog open={isQuestionModalOpen} onOpenChange={setIsQuestionModalOpen}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle>Enviar Dúvida sobre o Orçamento</DialogTitle>
            <DialogDescription>
              O Dr. Gustavo Siqueira e o Time ADM MWS responderão diretamente para você.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSendQuestion} className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="question-topic">Assunto Principal</Label>
              <Input id="question-topic" defaultValue="Forma de pagamento e parcelamento" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="question-text">Sua Pergunta</Label>
              <Textarea
                id="question-text"
                placeholder="Descreva sua dúvida sobre o orçamento, tempo de tratamento ou formas de pagamento..."
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                rows={4}
                required
              />
            </div>
            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" onClick={() => setIsQuestionModalOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                Enviar Dúvida
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
