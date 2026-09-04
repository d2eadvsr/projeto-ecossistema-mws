import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Sparkles,
  Bot,
  EyeOff,
  HeartHandshake,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  CalendarCheck,
  HelpCircle,
  FileText,
  Layers,
  Cpu,
  Smile,
} from 'lucide-react'
import { MOCK_TECHNOLOGY_CONTENT, MOCK_ECOSYSTEM_METRICS } from './mockData'

export default function LeadTechnology() {
  const { hero, pillars, funnelJourney, faq } = MOCK_TECHNOLOGY_CONTENT

  return (
    <div className="p-4 md:p-8 space-y-10 max-w-6xl mx-auto animate-fade-in-up">
      {/* Hero Section Educativo */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950 text-white p-6 md:p-12 shadow-xl border border-emerald-800/40">
        <div className="relative z-10 max-w-3xl space-y-4">
          <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-3 py-1 text-xs">
            <Sparkles className="w-3.5 h-3.5 mr-1.5" /> {hero.badge}
          </Badge>

          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-tight">
            {hero.title}
          </h1>

          <p className="text-slate-300 text-sm md:text-base leading-relaxed">{hero.subtitle}</p>

          <div className="pt-2 flex flex-wrap gap-3">
            <Link to="/lead/consulta">
              <Button className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium shadow-md">
                <CalendarCheck className="w-4 h-4 mr-2" /> Agendar Minha Primeira Avaliação
              </Button>
            </Link>
            <Link to="/lead/ortodontista">
              <Button
                variant="outline"
                className="border-slate-600 text-slate-100 hover:bg-white/10"
              >
                Conhecer Meu Ortodontista Credenciado
              </Button>
            </Link>
          </div>
        </div>

        <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-radial from-emerald-500/10 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Os 4 Pilares da Tecnologia Magic Wire */}
      <div className="space-y-4">
        <div className="text-center max-w-2xl mx-auto space-y-1">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Por Que a 3ª Geração da Ortodontia Supera Tudo o Que Você Já Viu
          </h2>
          <p className="text-xs text-slate-500">
            Desenvolvido para oferecer máxima discrição, sem alterar seus hábitos sociais ou sua
            rotina.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {pillars.map((pillar, idx) => (
            <Card
              key={idx}
              className="border-slate-200 shadow-sm hover:border-emerald-300 transition-all flex flex-col justify-between"
            >
              <CardHeader className="pb-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-2">
                  {idx === 0 && <EyeOff className="w-5 h-5" />}
                  {idx === 1 && <Sparkles className="w-5 h-5" />}
                  {idx === 2 && <Bot className="w-5 h-5" />}
                  {idx === 3 && <HeartHandshake className="w-5 h-5" />}
                </div>
                <CardTitle className="text-base text-slate-900 font-bold">{pillar.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-slate-600 leading-relaxed">
                {pillar.description}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Comparativo das 3 Gerações da Ortodontia */}
      <Card className="border-slate-200 shadow-sm overflow-hidden">
        <CardHeader className="bg-slate-50 border-b border-slate-200/80">
          <CardTitle className="text-lg text-slate-900 flex items-center gap-2">
            <Layers className="w-5 h-5 text-emerald-600" />
            A Evolução Histórica da Ortodontia
          </CardTitle>
          <CardDescription>
            Entenda o salto científico inaugurado pelo Magic Wire System
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2 opacity-80">
              <Badge variant="outline" className="border-slate-300 text-slate-600">
                1ª Geração
              </Badge>
              <h3 className="font-bold text-sm text-slate-900">
                Aparelhos Convencionais Metálicos
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Braquetes e fios colados na face visível dos dentes. Alta visibilidade social,
                desconforto em tecidos moles e higienização complexa.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2 opacity-80">
              <Badge variant="outline" className="border-slate-300 text-slate-600">
                2ª Geração
              </Badge>
              <h3 className="font-bold text-sm text-slate-900">Sistemas Removíveis Plásticos</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Necessidade constante de retirar e recolocar placas em refeições e bebidas. Risco
                frequente de perda, esquecimento e quebra de rotina.
              </p>
            </div>

            <div className="p-4 rounded-xl border-2 border-emerald-500 bg-emerald-50/70 space-y-2 shadow-xs">
              <div className="flex items-center justify-between">
                <Badge className="bg-emerald-600 text-white font-bold">3ª Geração MWS</Badge>
                <Sparkles className="w-4 h-4 text-emerald-600" />
              </div>
              <h3 className="font-bold text-sm text-emerald-950">
                Fio Mágico & Invisível (Lado Interno)
              </h3>
              <p className="text-xs text-emerald-900 leading-relaxed">
                Fixado pelo lado lingual. Robótica de alta precisão no Laboratório MWS, forças
                biológicas contínuas suaves e zero interferência social.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Etapas do Fluxo do Lead até o Início do Tratamento */}
      <div className="space-y-4">
        <div className="text-center max-w-2xl mx-auto space-y-1">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            A Jornada Completa do Lead Qualificado
          </h2>
          <p className="text-xs text-slate-500">
            Processo padronizado de acolhimento e mentoria clínica no Portal MWS
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {funnelJourney.map((item, idx) => (
            <Card key={idx} className="border-slate-200 shadow-sm relative overflow-hidden">
              <div className="p-1 bg-emerald-600 text-white text-[10px] font-bold text-center">
                Etapa {item.step}
              </div>
              <CardContent className="p-4 space-y-1.5 text-xs">
                <h4 className="font-bold text-slate-900 text-xs">{item.title}</h4>
                <p className="text-slate-600 leading-relaxed text-[11px]">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Fabricação Robótica no Laboratório MWS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center bg-slate-900 text-white p-6 md:p-8 rounded-2xl shadow-lg border border-slate-800">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-emerald-400" />
            <Badge variant="outline" className="border-emerald-500 text-emerald-300">
              Laboratório Central MWS
            </Badge>
          </div>
          <h3 className="text-2xl font-bold text-white">
            Robôs Industriais Dobrando o Seu Fio com Precisão Micrométrica
          </h3>
          <p className="text-slate-300 text-xs md:text-sm leading-relaxed">
            Diferente dos aparelhos convencionais dobrados manualmente, os arcos linguais da Magic
            Wire são moldados por robôs calibrados a partir do escaneamento intraoral tridimensional
            da sua boca, garantindo movimentações mais rápidas e sem atrito excessivo.
          </p>
          <ul className="text-xs text-slate-200 space-y-2">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Ligas especiais de níquel-titânio termoativadas</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Guias de colagem indireta guiadas por computador</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Supervisão e mentoria ortodôntica contínua</span>
            </li>
          </ul>
        </div>

        <div className="p-6 rounded-xl bg-white/5 border border-white/10 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block">
            Dados do Ecossistema Nacional
          </span>
          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="p-3 rounded bg-white/5 border border-white/5">
              <span className="text-2xl font-black text-emerald-400 block">
                {MOCK_ECOSYSTEM_METRICS.accreditedDentists}
              </span>
              <span className="text-[11px] text-slate-400">Ortodontistas Credenciados</span>
            </div>
            <div className="p-3 rounded bg-white/5 border border-white/5">
              <span className="text-2xl font-black text-emerald-400 block">
                {MOCK_ECOSYSTEM_METRICS.totalLeads}
              </span>
              <span className="text-[11px] text-slate-400">Leads Atendidos</span>
            </div>
            <div className="p-3 rounded bg-white/5 border border-white/5">
              <span className="text-2xl font-black text-emerald-400 block">100%</span>
              <span className="text-[11px] text-slate-400">Fio Instalado por Dentro</span>
            </div>
            <div className="p-3 rounded bg-white/5 border border-white/5">
              <span className="text-2xl font-black text-emerald-400 block">
                R$ {MOCK_ECOSYSTEM_METRICS.firstConsultationPrice}
              </span>
              <span className="text-[11px] text-slate-400">1ª Consulta com Escaneamento</span>
            </div>
          </div>
        </div>
      </div>

      {/* Perguntas Frequentes (FAQ) */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-emerald-600" />
            <CardTitle className="text-lg text-slate-900">
              Perguntas Frequentes sobre a Magic Wire
            </CardTitle>
          </div>
          <CardDescription>Respostas diretas sobre o Fio Mágico e o tratamento</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {faq.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5"
              >
                <h4 className="font-bold text-slate-900 flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">Q:</span> {item.q}
                </h4>
                <p className="text-slate-600 leading-relaxed pl-4">{item.a}</p>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-500">
              Ainda tem alguma pergunta específica sobre seu caso?
            </div>
            <Link to="/lead/orcamento">
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs">
                Ver Orçamento & Tirar Dúvidas <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
