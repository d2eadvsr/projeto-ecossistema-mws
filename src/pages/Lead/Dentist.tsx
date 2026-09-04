import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  MapPin,
  Phone,
  Mail,
  Star,
  Award,
  Clock,
  ShieldCheck,
  Building2,
  CalendarCheck,
  CheckCircle2,
  Sparkles,
  Navigation,
  MessageCircle,
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { MOCK_LEAD_USER } from './mockData'

export default function LeadDentist() {
  const { toast } = useToast()
  const dentist = MOCK_LEAD_USER.assignedDentist

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(
      `${dentist.address}, ${dentist.neighborhood}, ${dentist.city} - ${dentist.state}, CEP ${dentist.cep}`,
    )
    toast({
      title: 'Endereço copiado!',
      description: 'O endereço da clínica foi copiado para a sua área de transferência.',
    })
  }

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-6xl mx-auto animate-fade-in-up">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
              Meu Ortodontista Credenciado
            </h1>
            <Badge className="bg-emerald-100 text-emerald-800 border-emerald-300">
              Atribuído ao seu perfil
            </Badge>
          </div>
          <p className="text-slate-500 mt-1 text-sm">
            Especialista selecionado pelo Time ADM MWS com base na sua localização (
            {MOCK_LEAD_USER.city}/{MOCK_LEAD_USER.state}).
          </p>
        </div>

        <a
          href={`https://wa.me/${dentist.whatsapp}?text=Ol%C3%A1%20Dr.%20Gustavo,%20sou%20o%20Marcos%20Andrade,%20lead%20qualificado%20Magic%20Wire.`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button className="bg-[#25D366] hover:bg-[#1EBE5D] text-white shadow font-medium">
            <Phone className="w-4 h-4 mr-2" /> Contatar via WhatsApp
          </Button>
        </a>
      </div>

      {/* Hero do Perfil Público do Ortodontista */}
      <Card className="border-emerald-200 bg-gradient-to-r from-emerald-50/70 via-white to-slate-50 shadow-sm overflow-hidden">
        <CardContent className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="relative">
              <Avatar className="h-28 w-28 border-4 border-white shadow-xl">
                <AvatarImage src={dentist.avatarUrl} alt={dentist.name} />
                <AvatarFallback className="bg-emerald-700 text-white text-2xl font-bold">
                  GS
                </AvatarFallback>
              </Avatar>
              <span className="absolute bottom-1 right-1 p-1 bg-emerald-600 rounded-full border-2 border-white shadow">
                <ShieldCheck className="w-4 h-4 text-white" />
              </span>
            </div>

            <div className="space-y-2 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-2xl font-bold text-slate-900">{dentist.name}</h2>
                <Badge
                  variant="outline"
                  className="border-emerald-600 text-emerald-700 bg-emerald-50 font-bold"
                >
                  {dentist.cro}
                </Badge>
                <span className="flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  {dentist.rating} ({dentist.reviewsCount} avaliações)
                </span>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full">
                  NPS {dentist.nps}%
                </span>
              </div>

              <p className="text-sm font-semibold text-emerald-800 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-600" /> {dentist.specialty}
              </p>

              <p className="text-xs font-medium text-slate-600 flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-slate-400" /> {dentist.clinicName}
              </p>

              <p className="text-xs text-slate-500 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-slate-400" />
                {dentist.address}, {dentist.neighborhood} - {dentist.city}/{dentist.state}
              </p>
            </div>

            <div className="flex flex-col gap-2 w-full md:w-auto">
              <Link to="/lead/consulta">
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                  <CalendarCheck className="w-4 h-4 mr-2" /> Ver Minha Consulta
                </Button>
              </Link>
              <Button variant="outline" className="w-full text-xs" onClick={handleCopyAddress}>
                <Navigation className="w-3.5 h-3.5 mr-1.5" /> Copiar Endereço
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Grid com Bio, Métricas e Endereço/Mapa Mockado */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Coluna da Esquerda: Bio, Experiência e Certificações */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg text-slate-900">Sobre o Especialista</CardTitle>
              <CardDescription>
                Trajetória profissional e credenciamento oficial MWS
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-slate-700 leading-relaxed">{dentist.bio}</p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 border-t border-slate-100">
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-center">
                  <span className="text-xl font-bold text-slate-900 block">
                    +{dentist.experienceYears} anos
                  </span>
                  <span className="text-xs text-slate-500">Experiência em Ortodontia</span>
                </div>
                <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-center">
                  <span className="text-xl font-bold text-emerald-800 block">
                    +{dentist.treatedCases}
                  </span>
                  <span className="text-xs text-emerald-700">Casos com Fios Mágicos</span>
                </div>
                <div className="p-3 rounded-lg bg-teal-50 border border-teal-200 text-center">
                  <span className="text-xl font-bold text-teal-800 block">100%</span>
                  <span className="text-xs text-teal-700">Casos com Robótica MWS</span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Diferenciais & Formação:
                </h4>
                <div className="space-y-1.5 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>
                      Certificação Nível Master no Magic Wire System (Laboratório Central MWS)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Membro ativo da Associação Brasileira de Ortodontia Lingual (ABORL)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Clínica equipada com escâner intraoral 3D de última geração</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>
                      Integração direta com o Time ADM MWS para suporte de garantia nacional
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Avaliações de Pacientes Atendidos */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg text-slate-900">Avaliações de Pacientes</CardTitle>
                  <CardDescription>
                    O que dizem os pacientes tratados com o Dr. Gustavo
                  </CardDescription>
                </div>
                <Badge className="bg-amber-100 text-amber-900 border-amber-300">
                  {dentist.reviewsCount} depoimentos
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">Camila Silveira (Campinas/SP)</span>
                  <div className="flex text-amber-500">{'★'.repeat(5)}</div>
                </div>
                <p className="text-slate-600 italic">
                  "O Dr. Gustavo explicou todo o Fio Mágico e a instalação pelo lado de dentro foi
                  super rápida. Ninguém no meu trabalho notou nada, nem na primeira semana!"
                </p>
                <span className="text-[10px] text-slate-400 block">
                  Tratamento Classe II concluído em 11 meses
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">Rodrigo Bernardes (Paulínia/SP)</span>
                  <div className="flex text-amber-500">{'★'.repeat(5)}</div>
                </div>
                <p className="text-slate-600 italic">
                  "Atendimento impecável na clínica do Cambuí. Não precisei me preocupar com peças
                  para tirar na hora do almoço. Vale cada centavo pela liberdade e discrição."
                </p>
                <span className="text-[10px] text-slate-400 block">
                  Tratamento Classe I concluído em 8 meses
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Coluna da Direita: Mapa Mockado, Localização e Horários */}
        <div className="space-y-6">
          <Card className="border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base text-slate-900">Localização da Clínica</CardTitle>
              <CardDescription>Endereço e mapa interativo mockado</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Mapa Mockado estilizado */}
              <div className="relative w-full h-48 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 flex flex-col items-center justify-center text-center p-4">
                <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] opacity-70" />
                <div className="relative z-10 flex flex-col items-center space-y-2">
                  <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg animate-bounce">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-slate-800 bg-white/90 px-3 py-1 rounded-md shadow-sm border">
                    {dentist.clinicName}
                  </span>
                  <span className="text-[11px] text-slate-500 font-medium">
                    Bairro Cambuí - Campinas / SP
                  </span>
                </div>
              </div>

              <div className="text-xs space-y-2.5 text-slate-700">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-slate-900">{dentist.address}</p>
                    <p className="text-slate-500">
                      {dentist.neighborhood} - {dentist.city}/{dentist.state}
                    </p>
                    <p className="text-slate-500">CEP: {dentist.cep}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                  <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>{dentist.phone}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>{dentist.email}</span>
                </div>

                <div className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <span>{dentist.openingHours}</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(`${dentist.address}, ${dentist.city} - ${dentist.state}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  <Button variant="outline" className="w-full text-xs">
                    <Navigation className="w-3.5 h-3.5 mr-1.5" /> Abrir no Google Maps
                  </Button>
                </a>

                <a
                  href={`https://wa.me/${dentist.whatsapp}?text=Ol%C3%A1%20Dr.%20Gustavo,%20sou%20o%20Marcos%20Andrade,%20lead%20MWS.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  <Button className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs">
                    <MessageCircle className="w-3.5 h-3.5 mr-1.5" /> Enviar Mensagem no WhatsApp
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>

          {/* Dica do Time ADM MWS */}
          <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-950 space-y-1">
            <span className="font-bold flex items-center gap-1.5 text-emerald-900">
              <ShieldCheck className="w-4 h-4 text-emerald-700" /> Rede Credenciada Oficial MWS
            </span>
            <p className="text-emerald-800 leading-relaxed">
              Dr. Gustavo faz parte dos 182 ortodontistas credenciados no Brasil treinados para
              instalação de fios linguais com fixação indireta e precisão robótica.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
