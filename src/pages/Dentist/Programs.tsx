import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Megaphone,
  Briefcase,
  TrendingUp,
  Target,
  Users,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Download,
  Share2,
  BarChart3,
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface MarketingProgram {
  id: string
  title: string
  category: 'Marketing Digital' | 'Gestão de Clínica' | 'Conversão de Pacientes' | 'Parceria Co-Op'
  description: string
  benefits: string[]
  status: 'ativo' | 'disponivel' | 'em_breve'
  badgeText: string
  iconColor: string
}

const MOCK_PROGRAMS: MarketingProgram[] = [
  {
    id: 'prog-1',
    title: 'Kit de Captação Digital & Tráfego Pago Co-Participativo',
    category: 'Marketing Digital',
    description:
      'Campanhas geolocalizadas no Meta Ads e Google Ads gerenciadas pela agência oficial MWS direcionando pacientes direto para o seu WhatsApp.',
    benefits: [
      'Anúncios prontos e validados com foco em alinhadores invisíveis',
      'Página de captura personalizada com seu nome e CRO',
      'Leads pré-qualificados na sua região',
      'Suporte para equipe de recepção',
    ],
    status: 'ativo',
    badgeText: 'Programa Ativo',
    iconColor: 'bg-emerald-600',
  },
  {
    id: 'prog-2',
    title: 'MWS Clinic Management (Gestão & Metas)',
    category: 'Gestão de Clínica',
    description:
      'Consultoria de processos e precificação para dobrar a taxa de conversão da primeira consulta na sua clínica ortodôntica.',
    benefits: [
      'Scripts de atendimento para secretária e equipe comercial',
      'Calculadora de lucratividade e precificação de procedimentos',
      'Treinamento de fechamento de orçamentos de alto valor',
    ],
    status: 'disponivel',
    badgeText: 'Disponível para Adesão',
    iconColor: 'bg-blue-600',
  },
  {
    id: 'prog-3',
    title: 'Materiais Gráficos & Cenografia para Recepção',
    category: 'Conversão de Pacientes',
    description:
      'Modelos tridimensionais, display de mesa explicativo, folders para pacientes e totens informativos sobre o sistema Magic Wire.',
    benefits: [
      'Kit de modelos didáticos em acrílico transparente',
      '100 folders explicativos sobre vantagens do alinhador',
      'Vídeos institucionais para TV de sala de espera',
    ],
    status: 'disponivel',
    badgeText: 'Kit Físico',
    iconColor: 'bg-purple-600',
  },
  {
    id: 'prog-4',
    title: 'Programa de Fidelidade e Indicação entre Pacientes (Member Get Member)',
    category: 'Parceria Co-Op',
    description:
      'Sistema automatizado de indicação com recompensas e descontos para pacientes que recomendam amigos e familiares.',
    benefits: [
      'Links exclusivos de recomendação no app do paciente',
      'Controle automático de créditos para novas manutenções',
      'Aumento orgânico na taxa de novos pacientes',
    ],
    status: 'em_breve',
    badgeText: 'Em Breve',
    iconColor: 'bg-amber-600',
  },
]

export default function DentistPrograms() {
  const [programs, setPrograms] = useState<MarketingProgram[]>(MOCK_PROGRAMS)
  const { toast } = useToast()

  const handleEnroll = (title: string) => {
    toast({
      title: 'Interesse Registrado!',
      description: `Sua solicitação para o programa "${title}" foi enviada para o consultor de negócios MWS.`,
    })
  }

  const handleDownloadKit = () => {
    toast({
      title: 'Download Iniciado',
      description: 'Baixando pacote com criativos para Instagram, artes de feed e stories prontos.',
    })
  }

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-6xl mx-auto animate-fade-in-up">
      {/* Topo */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
              Programas de Marketing & Gestão de Clínica
            </h1>
            <Badge className="bg-emerald-100 text-emerald-800">Aceleração de Consultório</Badge>
          </div>
          <p className="text-slate-500 mt-1">
            Ferramentas, campanhas e programas oficiais para alavancar a captação e lucratividade do
            seu consultório.
          </p>
        </div>

        <Button onClick={handleDownloadKit} className="bg-emerald-600 hover:bg-emerald-700">
          <Download className="w-4 h-4 mr-2" /> Baixar Criativos para Redes Sociais
        </Button>
      </div>

      {/* Hero Card */}
      <Card className="border-blue-200 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white shadow-md">
        <CardContent className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <Badge className="bg-emerald-500 text-white hover:bg-emerald-500">
                Parceria Estratégica
              </Badge>
              <h2 className="text-2xl md:text-3xl font-bold">
                Acelerador de Clínicas Ortodônticas Magic Wire
              </h2>
              <p className="text-blue-100 text-sm leading-relaxed">
                Transforme sua clínica em uma referência de ortodontia digital na sua região com
                nossos programas de geração de demanda e consultoria comercial.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur p-4 rounded-xl border border-white/20 text-center w-full md:w-56 flex-shrink-0">
              <p className="text-xs text-blue-200 font-medium">Captação Média Mensal</p>
              <p className="text-3xl font-bold text-white my-1">+14</p>
              <p className="text-xs text-emerald-300 font-semibold">Novos orçamentos / mês</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Programas em Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {programs.map((prog) => (
          <Card
            key={prog.id}
            className="border-slate-200 hover:border-slate-300 transition-all flex flex-col justify-between shadow-sm"
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-2">
                <Badge
                  className={
                    prog.status === 'ativo'
                      ? 'bg-emerald-100 text-emerald-800'
                      : prog.status === 'disponivel'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-slate-100 text-slate-600'
                  }
                >
                  {prog.badgeText}
                </Badge>
                <span className="text-xs font-semibold text-slate-400">{prog.category}</span>
              </div>
              <CardTitle className="text-lg font-bold text-slate-900 mt-2">{prog.title}</CardTitle>
              <CardDescription className="text-xs leading-relaxed text-slate-600">
                {prog.description}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4 pt-2">
              <div className="space-y-1.5 border-t border-slate-100 pt-3">
                <p className="text-xs font-bold text-slate-800">O que está incluído:</p>
                {prog.benefits.map((b, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                {prog.status === 'ativo' ? (
                  <Badge className="bg-emerald-50 text-emerald-700 border border-emerald-300">
                    Ativo na sua clínica
                  </Badge>
                ) : (
                  <Button
                    onClick={() => handleEnroll(prog.title)}
                    className={
                      prog.status === 'disponivel'
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-xs w-full sm:w-auto'
                        : 'bg-slate-200 text-slate-500 text-xs cursor-not-allowed w-full sm:w-auto'
                    }
                    disabled={prog.status === 'em_breve'}
                  >
                    {prog.status === 'disponivel' ? 'Aderir ao Programa' : 'Em Breve'}
                  </Button>
                )}

                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-slate-500 hover:text-slate-800"
                  onClick={() =>
                    toast({
                      title: 'Detalhes do Programa',
                      description: 'Mais informações enviadas para o seu e-mail cadastrado.',
                    })
                  }
                >
                  Saber mais <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
