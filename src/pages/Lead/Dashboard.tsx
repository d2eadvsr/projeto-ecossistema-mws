import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Sparkles,
  CalendarCheck,
  MapPin,
  Clock,
  ArrowRight,
  CheckCircle2,
  Phone,
  ShieldCheck,
  Bot,
  Star,
  FileText,
  HelpCircle,
  AlertCircle,
  ExternalLink,
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { MOCK_LEAD_USER, MOCK_FUNNEL_STEPS, MOCK_ECOSYSTEM_METRICS } from './mockData'

export default function LeadDashboard() {
  const { toast } = useToast()
  const [lead, setLead] = useState(MOCK_LEAD_USER)
  const [confirmed, setConfirmed] = useState(false)

  const handleConfirmAttendance = () => {
    setConfirmed(true)
    toast({
      title: 'Presença Confirmada com Sucesso!',
      description: `Sua presença na primeira consulta de ${lead.appointment.date} foi confirmada junto à clínica do ${lead.assignedDentist.name}.`,
    })
  }

  return (
    <div className="p-4 md:p-8 space-y-8 max-w-7xl mx-auto animate-fade-in-up">
      {/* Hero de Boas-vindas ao Ecossistema MWS */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 text-white p-6 md:p-8 shadow-xl border border-emerald-800/40">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold flex items-center gap-1.5 px-3 py-1">
              <Sparkles className="w-3.5 h-3.5" /> 3ª Geração da Ortodontia
            </Badge>
            <Badge variant="outline" className="border-emerald-400/50 text-emerald-200">
              Lead Qualificado MWS
            </Badge>
            <Badge variant="secondary" className="bg-white/10 text-slate-200">
              {lead.city} - {lead.state}
            </Badge>
          </div>

          <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-white">
            Olá, {lead.name}! Bem-vindo ao Ecossistema Magic Wire.
          </h1>

          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            Você está a um passo de transformar seu sorriso com o inovador{' '}
            <strong className="text-emerald-400">Fio Mágico e Invisível</strong>, instalado
            exclusivamente pelo{' '}
            <strong className="text-emerald-300">lado interno dos dentes</strong>. Conforto
            biológico, discrição absoluta e precisão robótica sob medida.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <Link to="/lead/tecnologia">
              <Button className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium shadow-md">
                Conheça o Fio Mágico <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link to="/lead/consulta">
              <Button
                variant="outline"
                className="border-slate-600 text-slate-100 hover:bg-white/10"
              >
                Ver Detalhes da Consulta
              </Button>
            </Link>
          </div>
        </div>

        {/* Efeito visual de fundo */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-emerald-500/10 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Cards de Métricas e Status Atual */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Status no Funil */}
        <Card className="border-emerald-100 shadow-sm bg-gradient-to-br from-emerald-50/50 to-white">
          <CardHeader className="pb-2">
            <CardDescription className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Status Atual no Funil
            </CardDescription>
            <CardTitle className="text-lg text-emerald-800 flex items-center gap-2">
              <CalendarCheck className="w-5 h-5 text-emerald-600" />
              {lead.funnelLabel}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-slate-600 space-y-1">
            <p>Atribuído pelo Time ADM MWS</p>
            <span className="inline-block px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold text-[11px]">
              Etapa 4 de 6
            </span>
          </CardContent>
        </Card>

        {/* Próxima Consulta */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardDescription className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Primeira Consulta
            </CardDescription>
            <CardTitle className="text-lg text-slate-900 flex items-center gap-2">
              <Clock className="w-5 h-5 text-teal-600" />
              {lead.appointment.date}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-slate-600">
            <p className="font-medium text-slate-800">Horário: {lead.appointment.time}</p>
            <p className="text-slate-500">{lead.appointment.weekday}</p>
          </CardContent>
        </Card>

        {/* Ortodontista Atribuído */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardDescription className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Ortodontista Credenciado
            </CardDescription>
            <CardTitle className="text-lg text-slate-900 truncate">
              {lead.assignedDentist.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-slate-600">
            <p className="text-emerald-700 font-medium">{lead.assignedDentist.cro}</p>
            <p className="text-slate-500 truncate">{lead.assignedDentist.clinicName}</p>
          </CardContent>
        </Card>

        {/* Orçamento Previsto */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardDescription className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Orçamento de Tratamento
            </CardDescription>
            <CardTitle className="text-lg text-slate-900">{lead.budget.protocolClass}</CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-slate-600">
            <p className="font-semibold text-emerald-700">
              R$ {lead.budget.finalPrice.toLocaleString('pt-BR')}
            </p>
            <p className="text-slate-500">Estimativa: ~{lead.budget.estimatedMonths} meses</p>
          </CardContent>
        </Card>
      </div>

      {/* Grid Principal: Cartão da Consulta com CTA + Ortodontista Atribuído */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cartão de Ação: Detalhes da Consulta e Confirmação */}
        <Card className="lg:col-span-2 border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <CardHeader className="border-b border-slate-100 pb-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-xl text-slate-900">
                      Sua Primeira Consulta de Avaliação
                    </CardTitle>
                    {confirmed ? (
                      <Badge className="bg-emerald-600 text-white flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Presença Confirmada
                      </Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        className="border-amber-500 text-amber-700 bg-amber-50"
                      >
                        Aguardando Confirmação
                      </Badge>
                    )}
                  </div>
                  <CardDescription className="mt-1">
                    Exame clínico, mapeamento da queixa principal e escaneamento digital 3D.
                  </CardDescription>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 block">Valor da Consulta</span>
                  <span className="text-lg font-bold text-slate-900">
                    R$ {lead.appointment.consultationValue},00
                  </span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6 space-y-5">
              {/* Local e Horário */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200/70">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-lg bg-emerald-100 text-emerald-700 shrink-0">
                    <CalendarCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 font-medium block">Data e Horário</span>
                    <p className="text-sm font-bold text-slate-900">
                      {lead.appointment.weekday}, {lead.appointment.date}
                    </p>
                    <p className="text-xs text-slate-600">
                      às {lead.appointment.time} (Duração: ~50 min)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-lg bg-teal-100 text-teal-700 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 font-medium block">
                      Local de Atendimento
                    </span>
                    <p className="text-sm font-bold text-slate-900 truncate">
                      {lead.appointment.clinicName}
                    </p>
                    <p className="text-xs text-slate-600 line-clamp-1">
                      {lead.appointment.address}
                    </p>
                  </div>
                </div>
              </div>

              {/* Queixa principal registrada */}
              <div className="p-3.5 rounded-lg bg-emerald-50/60 border border-emerald-100 text-xs text-slate-700">
                <span className="font-semibold text-emerald-900 block mb-0.5">
                  Queixa Principal Informada:
                </span>
                <p>{lead.appointment.chiefComplaint}</p>
              </div>

              {/* O que esperar na consulta */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  Etapas da sua primeira visita:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-2 text-slate-700 bg-white p-2.5 rounded border border-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Avaliação facial e dentária da queixa</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700 bg-white p-2.5 rounded border border-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Escaneamento digital intraoral 3D</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700 bg-white p-2.5 rounded border border-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Enquadramento no Protocolo MWS</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700 bg-white p-2.5 rounded border border-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Elaboração do plano e orçamento</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </div>

          <div className="p-6 pt-0 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
            <div className="text-xs text-slate-500 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Split oficial transparente MWS
            </div>

            <div className="flex items-center gap-2">
              <Link to="/lead/consulta">
                <Button variant="outline" size="sm" className="text-xs">
                  Ver Orientações & Reagendar
                </Button>
              </Link>
              {!confirmed ? (
                <Button
                  size="sm"
                  onClick={handleConfirmAttendance}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs shadow"
                >
                  <CheckCircle2 className="w-4 h-4 mr-1.5" /> Confirmar Presença
                </Button>
              ) : (
                <Button
                  size="sm"
                  variant="secondary"
                  disabled
                  className="bg-emerald-100 text-emerald-800 text-xs cursor-default"
                >
                  <CheckCircle2 className="w-4 h-4 mr-1.5 text-emerald-700" /> Presença Confirmada
                </Button>
              )}
            </div>
          </div>
        </Card>

        {/* Card do Ortodontista Credenciado Atribuído */}
        <Card className="border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <CardHeader className="pb-3 border-b border-slate-100">
              <div className="flex items-center justify-between">
                <Badge
                  variant="outline"
                  className="border-emerald-600 text-emerald-700 bg-emerald-50 text-[11px]"
                >
                  Ortodontista Atribuído
                </Badge>
                <span className="flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  {lead.assignedDentist.rating}
                </span>
              </div>
            </CardHeader>

            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16 border-2 border-emerald-500 shadow">
                  <AvatarImage
                    src={lead.assignedDentist.avatarUrl}
                    alt={lead.assignedDentist.name}
                  />
                  <AvatarFallback className="bg-emerald-700 text-white text-lg font-bold">
                    GS
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">
                    {lead.assignedDentist.name}
                  </h3>
                  <p className="text-xs font-semibold text-emerald-700">
                    {lead.assignedDentist.cro}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">{lead.assignedDentist.clinicName}</p>
                </div>
              </div>

              <div className="text-xs text-slate-600 space-y-2 border-t border-b border-slate-100 py-3">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <span>
                    {lead.assignedDentist.address}, {lead.assignedDentist.neighborhood} -{' '}
                    {lead.assignedDentist.city}/{lead.assignedDentist.state}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="truncate">{lead.assignedDentist.openingHours}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bot className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-emerald-800 font-medium">
                    {lead.assignedDentist.treatedCases}+ tratamentos com Fios Mágicos
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-600 line-clamp-3 italic">
                "{lead.assignedDentist.bio}"
              </p>
            </CardContent>
          </div>

          <div className="p-6 pt-0 space-y-2">
            <a
              href={`https://wa.me/${lead.assignedDentist.whatsapp}?text=Ol%C3%A1%20Dr.%20Gustavo,%20sou%20o%20Marcos%20Andrade,%20lead%20Magic%20Wire%20agendado%20para%20o%20dia%2010/03.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
            >
              <Button className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-medium text-xs">
                <Phone className="w-4 h-4 mr-2" /> Falar com o Consultório via WhatsApp
              </Button>
            </a>

            <Link to="/lead/ortodontista" className="w-full block">
              <Button variant="outline" className="w-full text-xs text-slate-700 border-slate-300">
                Ver Perfil Completo & Avaliações <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </Link>
          </div>
        </Card>
      </div>

      {/* Jornada do Lead no Ecossistema MWS */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <CardTitle className="text-lg text-slate-900">
                Sua Jornada até o Sorriso Perfeito
              </CardTitle>
              <CardDescription>
                Acompanhe o fluxo oficial do Lead Qualificado dentro do ecossistema Magic Wire
              </CardDescription>
            </div>
            <div className="text-xs font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
              Base oficial: {MOCK_ECOSYSTEM_METRICS.totalLeads} leads /{' '}
              {MOCK_ECOSYSTEM_METRICS.qualifiedLeads} qualificados
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
            {MOCK_FUNNEL_STEPS.map((step) => {
              const isCompleted = step.status === 'completed'
              const isCurrent = step.status === 'current'
              return (
                <div
                  key={step.step}
                  className={`p-3.5 rounded-xl border transition-all ${
                    isCurrent
                      ? 'border-emerald-500 bg-emerald-50/70 shadow-sm ring-1 ring-emerald-500'
                      : isCompleted
                        ? 'border-slate-200 bg-slate-50'
                        : 'border-slate-100 bg-white opacity-70'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        isCompleted
                          ? 'bg-emerald-600 text-white'
                          : isCurrent
                            ? 'bg-emerald-700 text-white animate-pulse'
                            : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {step.step}
                    </span>
                    <span className="text-[10px] text-slate-500 font-semibold">{step.date}</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 mb-0.5">{step.label}</h4>
                  <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Banners Informativos: Orçamento & Tecnologia */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-slate-200 bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-md">
          <CardHeader>
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-400" />
              <CardTitle className="text-lg text-white">Seu Orçamento Personalizado</CardTitle>
            </div>
            <CardDescription className="text-slate-300">
              Disponibilizado após sua primeira consulta pelo Dr. Gustavo Siqueira.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-300">Classificação Prevista:</span>
                <span className="font-bold text-emerald-400">{lead.budget.protocolClass}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-300">Tempo Estimado:</span>
                <span className="font-semibold text-white">
                  ~{lead.budget.estimatedMonths} meses
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-300">Preço Sugerido MWS:</span>
                <span className="line-through text-slate-400">
                  R$ {lead.budget.suggestedMwsPrice.toLocaleString('pt-BR')}
                </span>
              </div>
              <div className="flex justify-between items-center text-base pt-1 border-t border-white/10">
                <span className="font-semibold text-white">Preço Cobrado com Desconto:</span>
                <span className="font-extrabold text-emerald-400">
                  R$ {lead.budget.finalPrice.toLocaleString('pt-BR')}
                </span>
              </div>
            </div>

            <Link to="/lead/orcamento" className="block">
              <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium">
                Visualizar Proposta Completa & Condições <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="border-slate-200 bg-gradient-to-br from-emerald-900 to-teal-900 text-white shadow-md">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-300" />
              <CardTitle className="text-lg text-white">
                Por que o Fio Mágico é Diferente?
              </CardTitle>
            </div>
            <CardDescription className="text-emerald-100">
              Conheça a ortodontia lingual robotizada sem nenhum elemento visível na frente dos
              dentes.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="text-xs space-y-2 text-emerald-100">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0 mt-0.5" />
                <span>
                  <strong>100% invisível:</strong> instalado pelo lado de dentro (face lingual).
                  Ninguém sabe que você usa.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0 mt-0.5" />
                <span>
                  <strong>Não precisa tirar para comer:</strong> livre do incômodo de esquecer peças
                  em guardanapos.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0 mt-0.5" />
                <span>
                  <strong>Robótica industrial:</strong> dobras com precisão de frações de milímetro
                  calculadas no laboratório.
                </span>
              </li>
            </ul>

            <Link to="/lead/tecnologia" className="block pt-2">
              <Button
                variant="secondary"
                className="w-full bg-white text-slate-900 hover:bg-slate-100 font-medium"
              >
                Descubra a Ciência da 3ª Geração <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
