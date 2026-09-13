import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import {
  User,
  Building2,
  MapPin,
  Phone,
  Mail,
  Award,
  Globe,
  Instagram,
  Linkedin,
  Save,
  CheckCircle2,
  Eye,
  Edit3,
  Camera,
  Star,
  Sparkles,
  GraduationCap,
  Clock,
  CreditCard,
  Plus,
  Trash2,
  Calendar,
  ShieldCheck,
  TrendingUp,
  MessageSquare,
  FileBadge2,
  Info,
  HelpCircle,
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface EducationItem {
  id: string
  institution: string
  degree: string
  year: string
}

interface WorkingHour {
  id: string
  days: string
  period: string
}

export default function DentistPublicProfile() {
  const { toast } = useToast()

  // Modo de visualização: "editor" ou "preview"
  const [viewMode, setViewMode] = useState<'editor' | 'preview'>('editor')

  // Estado do Perfil Profissional
  const [profile, setProfile] = useState({
    name: 'Dr. Roberto Fernandes',
    professionalTitle: 'Ortodontista Especialista em Fio Mágico & Ortodontia Digital',
    cro: 'CRO-SP 98.432',
    phone: '(11) 98765-4321',
    email: 'contato@clinicafernandes.com.br',
    avatarUrl: 'https://img.usecurling.com/ppl/medium?gender=male&seed=44',
    photoTipDismissed: false,

    // Bio em 1ª pessoa padrão Doctoralia / BoaConsulta
    bio: 'Sou ortodontista dedicado há mais de 14 anos à ortodontia de precisão e estética de alta performance. Como pioneiro e credenciado Master na tecnologia Magic Wire, utilizo o fio lingual customizado (Fio Mágico) de 3ª geração para proporcionar correção oclusal e estética 100% invisível por trás dos dentes, sem o desconforto e sem as trocas constantes de aparelhos visíveis. Meu compromisso é unir inovação biomecânica, previsibilidade digital 3D e atendimento humanizado para devolver o melhor sorriso aos meus pacientes.',

    // Especialidades e tratamentos
    specialties: [
      'Tratamento com Magic Wire',
      'Fio Lingual Customizado',
      'Tecnologia Magic Wire de 3ª Geração',
      'Ortodontia Digital & Escaneamento 3D',
      'Ortopedia Facial Funcional',
      'DTM e Oclusão de Alta Performance',
    ],

    // Destaques / Métricas de autoridade médica
    stats: {
      yearsExperience: 14,
      casesCompleted: 1250,
      magicWireTreatments: 480,
      satisfactionRate: 99.2,
      npsScore: 98,
      rating: 4.96,
      totalReviews: 124,
    },

    // Formação Acadêmica
    education: [
      {
        id: 'edu-1',
        institution: 'Faculdade de Odontologia da USP (FOUSP)',
        degree: 'Graduação em Odontologia',
        year: '2010',
      },
      {
        id: 'edu-2',
        institution: 'Universidade de São Paulo (USP)',
        degree: 'Especialização em Ortodontia e Ortopedia Facial',
        year: '2013',
      },
      {
        id: 'edu-3',
        institution: 'Magic Wire System Academy',
        degree: 'Certificação Master em Tecnologia Magic Wire e Fio Lingual Customizado',
        year: '2021',
      },
      {
        id: 'edu-4',
        institution: 'Hospital Sírio-Libanês & MWS Fellowship',
        degree: 'Aperfeiçoamento em Biomecânica Digital & Oclusão',
        year: '2023',
      },
    ] as EducationItem[],

    // Clínica e Endereço
    clinicName: 'Fernandes Ortodontia & Estética Digital',
    address: 'Av. Paulista, 1842 - Conjunto 114 - Bela Vista',
    city: 'São Paulo',
    state: 'SP',
    zipCode: '01310-200',

    // Horários de atendimento
    workingHours: [
      { id: 'wh-1', days: 'Segunda a Sexta-feira', period: '08:00 às 19:00' },
      { id: 'wh-2', days: 'Sábados', period: '08:30 às 13:00' },
    ] as WorkingHour[],

    // Formas de pagamento / Convênios
    paymentMethods: {
      particular: true,
      mwsFintech: true,
      pix: true,
      creditCardInstallments: true,
      conveniosReembolso: true,
    },

    // Redes sociais e canais digitais
    instagram: '@dr.robertofernandes',
    linkedin: 'linkedin.com/in/dr-roberto-fernandes-ortodontista',
    website: 'https://clinicafernandes.com.br',
  })

  // Inputs temporários para adições
  const [newSpecialty, setNewSpecialty] = useState('')
  const [newEduInst, setNewEduInst] = useState('')
  const [newEduDegree, setNewEduDegree] = useState('')
  const [newEduYear, setNewEduYear] = useState('')

  const [newWhDays, setNewWhDays] = useState('')
  const [newWhPeriod, setNewWhPeriod] = useState('')

  // Ações de Salvar e Feedback
  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    toast({
      title: 'Perfil Público Atualizado com Sucesso!',
      description:
        'Suas alterações já estão salvas e visíveis para pacientes na rede credenciada Magic Wire.',
    })
  }

  // Especialidades
  const handleAddSpecialty = () => {
    const val = newSpecialty.trim()
    if (!val) return
    if (!profile.specialties.includes(val)) {
      setProfile((prev) => ({
        ...prev,
        specialties: [...prev.specialties, val],
      }))
      setNewSpecialty('')
    }
  }

  const handleRemoveSpecialty = (item: string) => {
    setProfile((prev) => ({
      ...prev,
      specialties: prev.specialties.filter((s) => s !== item),
    }))
  }

  // Formação acadêmica
  const handleAddEducation = () => {
    if (!newEduInst.trim() || !newEduDegree.trim()) {
      toast({
        title: 'Campos incompletos',
        description: 'Informe a instituição e o curso/titulação.',
        variant: 'destructive',
      })
      return
    }
    const newItem: EducationItem = {
      id: `edu-${Date.now()}`,
      institution: newEduInst.trim(),
      degree: newEduDegree.trim(),
      year: newEduYear.trim() || new Date().getFullYear().toString(),
    }
    setProfile((prev) => ({
      ...prev,
      education: [...prev.education, newItem],
    }))
    setNewEduInst('')
    setNewEduDegree('')
    setNewEduYear('')
  }

  const handleRemoveEducation = (id: string) => {
    setProfile((prev) => ({
      ...prev,
      education: prev.education.filter((e) => e.id !== id),
    }))
  }

  // Horários de atendimento
  const handleAddWorkingHour = () => {
    if (!newWhDays.trim() || !newWhPeriod.trim()) {
      return
    }
    const newWh: WorkingHour = {
      id: `wh-${Date.now()}`,
      days: newWhDays.trim(),
      period: newWhPeriod.trim(),
    }
    setProfile((prev) => ({
      ...prev,
      workingHours: [...prev.workingHours, newWh],
    }))
    setNewWhDays('')
    setNewWhPeriod('')
  }

  const handleRemoveWorkingHour = (id: string) => {
    setProfile((prev) => ({
      ...prev,
      workingHours: prev.workingHours.filter((w) => w.id !== id),
    }))
  }

  // Componente de Apresentação / Preview do Perfil Público (como o paciente vê)
  const renderPatientPreview = () => (
    <div className="space-y-6">
      {/* Banner de Status do Preview */}
      <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-emerald-200">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
            <Eye className="w-5 h-5" />
          </div>
          <div>
            <p className="font-semibold text-emerald-100 text-sm">
              Visualização Pública do Ortodontista
            </p>
            <p className="text-xs text-emerald-300/80">
              Esta é exatamente a vitrine profissional que os pacientes encontram no portal Magic
              Wire e canais parceiros.
            </p>
          </div>
        </div>
        <Button
          size="sm"
          variant="outline"
          className="border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/20 hover:text-white"
          onClick={() => setViewMode('editor')}
        >
          <Edit3 className="w-4 h-4 mr-1.5" /> Voltar ao Editor
        </Button>
      </div>

      {/* Cartão de Identidade / Hero do Perfil */}
      <Card className="border-border bg-card shadow-md overflow-hidden">
        <div className="h-28 bg-gradient-to-r from-emerald-800 via-emerald-600 to-teal-700 relative">
          <div className="absolute top-3 right-4 flex items-center gap-2">
            <Badge className="bg-emerald-900/80 text-emerald-100 border border-emerald-400/30 shadow-sm backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 mr-1 text-emerald-300" /> Credenciado Master Magic
              Wire
            </Badge>
          </div>
        </div>

        <CardContent className="pt-0 pb-6 px-6 relative">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 -mt-14 mb-4">
            <div className="flex flex-col sm:flex-row sm:items-end gap-4">
              <div className="relative group">
                <Avatar className="h-28 w-28 border-4 border-card shadow-xl ring-2 ring-emerald-500/40">
                  <AvatarImage src={profile.avatarUrl} alt={profile.name} />
                  <AvatarFallback className="bg-emerald-800 text-emerald-100 text-2xl font-bold">
                    RF
                  </AvatarFallback>
                </Avatar>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-2xl font-bold text-foreground tracking-tight">
                    {profile.name}
                  </h1>
                  <Badge
                    variant="outline"
                    className="border-emerald-500 text-emerald-400 bg-emerald-500/10 font-medium"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 mr-1" />
                    {profile.cro}
                  </Badge>
                  <Badge variant="secondary" className="font-semibold text-xs">
                    Ortodontista Verificado
                  </Badge>
                </div>
                <p className="text-sm font-medium text-emerald-400">{profile.professionalTitle}</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-muted-foreground" />
                  {profile.clinicName} • {profile.city}/{profile.state}
                </p>
              </div>
            </div>

            {/* Avaliação e NPS padrão Doctoralia */}
            <div className="flex items-center sm:self-end gap-3 bg-muted/60 border border-border p-3 rounded-xl">
              <div className="flex items-center gap-1.5 text-amber-400">
                <Star className="w-5 h-5 fill-amber-400" />
                <span className="text-lg font-bold text-foreground">{profile.stats.rating}</span>
              </div>
              <Separator orientation="vertical" className="h-8" />
              <div className="text-xs">
                <p className="font-semibold text-foreground">
                  {profile.stats.totalReviews} avaliações
                </p>
                <p className="text-muted-foreground">NPS {profile.stats.npsScore} • Excelente</p>
              </div>
            </div>
          </div>

          {/* Especialidades em chips */}
          <div className="pt-2 flex flex-wrap gap-2">
            {profile.specialties.map((spec) => (
              <Badge
                key={spec}
                variant="secondary"
                className="bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 px-3 py-1 text-xs"
              >
                {spec.includes('Magic Wire') || spec.includes('Fio Lingual') ? (
                  <Sparkles className="w-3 h-3 mr-1 text-emerald-400" />
                ) : null}
                {spec}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Grid de 2 Colunas: Conteúdo Principal + Lateral */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Coluna Esquerda: 2/3 */}
        <div className="lg:col-span-2 space-y-6">
          {/* Métricas de autoridade (casos, anos de experiência, tratamentos Magic Wire) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Card className="border-border bg-card/60 p-4 text-center">
              <p className="text-2xl font-bold text-emerald-400">
                +{profile.stats.yearsExperience} anos
              </p>
              <p className="text-xs text-muted-foreground mt-1">Atuação em Ortodontia</p>
            </Card>

            <Card className="border-border bg-card/60 p-4 text-center">
              <p className="text-2xl font-bold text-foreground">+{profile.stats.casesCompleted}</p>
              <p className="text-xs text-muted-foreground mt-1">Casos Concluídos</p>
            </Card>

            <Card className="border-emerald-500/30 bg-emerald-500/10 p-4 text-center">
              <p className="text-2xl font-bold text-emerald-300">
                +{profile.stats.magicWireTreatments}
              </p>
              <p className="text-xs text-emerald-200/80 mt-1">Tratamentos Magic Wire</p>
            </Card>

            <Card className="border-border bg-card/60 p-4 text-center">
              <p className="text-2xl font-bold text-foreground">
                {profile.stats.satisfactionRate}%
              </p>
              <p className="text-xs text-muted-foreground mt-1">Satisfação dos Pacientes</p>
            </Card>
          </div>

          {/* Seção Sobre / Bio em 1ª Pessoa */}
          <Card className="border-border bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <User className="w-4 h-4 text-emerald-400" />
                Sobre o Ortodontista
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-foreground/90 leading-relaxed whitespace-pre-line">
                {profile.bio}
              </p>
            </CardContent>
          </Card>

          {/* Formação Acadêmica */}
          <Card className="border-border bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-emerald-400" />
                Formação Acadêmica & Certificações
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {profile.education.map((edu, idx) => (
                <div key={edu.id} className="flex items-start gap-3 text-sm">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">{edu.degree}</p>
                    <p className="text-xs text-muted-foreground">
                      {edu.institution} • {edu.year}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Diferenciais da Tecnologia Magic Wire */}
          <Card className="border-emerald-500/30 bg-emerald-950/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2 text-emerald-300">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                Por que tratar com a Tecnologia Magic Wire nesta clínica?
              </CardTitle>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-2 gap-3 text-xs text-muted-foreground">
              <div className="p-3 rounded-lg bg-card/60 border border-border">
                <p className="font-semibold text-foreground mb-1">100% Invisível</p>
                <p>
                  O Fio Mágico é instalado na face lingual (por trás dos dentes), imperceptível
                  mesmo de perto.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-card/60 border border-border">
                <p className="font-semibold text-foreground mb-1">Fio Lingual Customizado</p>
                <p>Dobra robótica personalizada milimetricamente para a sua anatomia e mordida.</p>
              </div>
              <div className="p-3 rounded-lg bg-card/60 border border-border">
                <p className="font-semibold text-foreground mb-1">Sem Troca Excessiva</p>
                <p>
                  Força biológica contínua e constante de 3ª geração que acelera o resultado com
                  conforto.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-card/60 border border-border">
                <p className="font-semibold text-foreground mb-1">Previsibilidade 3D</p>
                <p>
                  Planejamento digital com simulação tridimensional antes do início do tratamento.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Coluna Direita: 1/3 (Endereço, Horários, Contatos e Pagamento) */}
        <div className="space-y-6">
          {/* Clínica & Localização */}
          <Card className="border-border bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400" />
                Localização & Consultório
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <p className="font-semibold text-foreground">{profile.clinicName}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{profile.address}</p>
                <p className="text-xs text-muted-foreground">
                  {profile.city} - {profile.state} • CEP {profile.zipCode}
                </p>
              </div>

              <div className="pt-2 border-t border-border space-y-2">
                <div className="flex items-center gap-2 text-xs">
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-muted-foreground">WhatsApp / Fone:</span>
                  <span className="font-medium text-foreground">{profile.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <Mail className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-muted-foreground">E-mail:</span>
                  <span className="font-medium text-foreground truncate">{profile.email}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Horários de Atendimento */}
          <Card className="border-border bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400" />
                Horários de Atendimento
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2.5">
              {profile.workingHours.map((wh) => (
                <div
                  key={wh.id}
                  className="flex items-center justify-between text-xs py-1.5 border-b border-border/50 last:border-0"
                >
                  <span className="font-medium text-foreground">{wh.days}</span>
                  <span className="text-emerald-400 font-semibold">{wh.period}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Formas de Pagamento & Convênios */}
          <Card className="border-border bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-emerald-400" />
                Formas de Pagamento & Financiamento
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-xs">
              {profile.paymentMethods.mwsFintech && (
                <div className="flex items-center gap-2 p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>
                    <strong>Financiamento MWS:</strong> Parcelamento facilitado em até 24x sem
                    comprometer o limite do cartão
                  </span>
                </div>
              )}
              {profile.paymentMethods.particular && (
                <div className="flex items-center gap-2 text-muted-foreground py-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span>Atendimento Particular</span>
                </div>
              )}
              {profile.paymentMethods.pix && (
                <div className="flex items-center gap-2 text-muted-foreground py-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span>PIX com desconto à vista</span>
                </div>
              )}
              {profile.paymentMethods.creditCardInstallments && (
                <div className="flex items-center gap-2 text-muted-foreground py-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span>Cartões de Crédito (todas as bandeiras)</span>
                </div>
              )}
              {profile.paymentMethods.conveniosReembolso && (
                <div className="flex items-center gap-2 text-muted-foreground py-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span>Emissão de laudo para reembolso por convênios</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Redes Sociais & Links */}
          <Card className="border-border bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Globe className="w-4 h-4 text-emerald-400" />
                Canais Digitais
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-xs">
              {profile.instagram && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Instagram className="w-4 h-4 text-pink-400" />
                  <span>{profile.instagram}</span>
                </div>
              )}
              {profile.linkedin && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Linkedin className="w-4 h-4 text-blue-400" />
                  <span className="truncate">{profile.linkedin}</span>
                </div>
              )}
              {profile.website && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Globe className="w-4 h-4 text-emerald-400" />
                  <span className="truncate">{profile.website}</span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-6xl mx-auto animate-fade-in-up">
      {/* Cabeçalho Principal com Ações */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
              Perfil Público do Ortodontista
            </h1>
            <Badge className="bg-emerald-600/20 text-emerald-400 border border-emerald-500/30">
              Público na Rede
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Posicionamento profissional nos moldes dos portais de referência médica (Doctoralia,
            BoaConsulta, DentMap e Dr. Consulta).
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            type="button"
            variant={viewMode === 'preview' ? 'default' : 'outline'}
            className={
              viewMode === 'preview'
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                : 'border-border'
            }
            onClick={() => setViewMode(viewMode === 'editor' ? 'preview' : 'editor')}
          >
            {viewMode === 'editor' ? (
              <>
                <Eye className="h-4 w-4 mr-2 text-emerald-400" />
                Visualizar como Paciente
              </>
            ) : (
              <>
                <Edit3 className="h-4 w-4 mr-2" />
                Modo Edição
              </>
            )}
          </Button>

          <Button
            type="button"
            onClick={() => handleSave()}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium"
          >
            <Save className="w-4 h-4 mr-2" />
            Salvar Alterações
          </Button>
        </div>
      </div>

      {/* Renderização Condicional: Modo Preview do Paciente */}
      {viewMode === 'preview' ? (
        renderPatientPreview()
      ) : (
        /* Modo Editor com Preview Rápido no Topo */
        <div className="space-y-6">
          {/* Card Hero Preview Rápido (Compacto) */}
          <Card className="border-emerald-500/30 bg-gradient-to-r from-emerald-950/30 via-card to-card shadow-sm">
            <CardContent className="p-5">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                <div className="relative group flex-shrink-0">
                  <Avatar className="h-20 w-20 border-2 border-emerald-500/50 shadow-md">
                    <AvatarImage src={profile.avatarUrl} alt={profile.name} />
                    <AvatarFallback className="bg-emerald-700 text-white font-bold text-lg">
                      RF
                    </AvatarFallback>
                  </Avatar>
                  <button
                    type="button"
                    className="absolute bottom-0 right-0 p-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow transition-transform group-hover:scale-105"
                    title="Upload de foto profissional"
                    onClick={() =>
                      toast({
                        title: 'Upload de Foto Profissional',
                        description:
                          'Dica padrão Doctoralia: Escolha uma foto nítida, com fundo neutro e sorriso empático.',
                      })
                    }
                  >
                    <Camera className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-1 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-xl font-bold text-foreground">{profile.name}</h2>
                    <Badge
                      variant="outline"
                      className="border-emerald-500 text-emerald-400 bg-emerald-500/10 text-xs"
                    >
                      {profile.cro}
                    </Badge>
                    <span className="flex items-center gap-1 text-xs font-semibold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      {profile.stats.rating} ({profile.stats.totalReviews} avaliações)
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      NPS {profile.stats.npsScore}
                    </Badge>
                  </div>
                  <p className="text-xs font-medium text-emerald-400">
                    {profile.professionalTitle}
                  </p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 truncate">
                    <Building2 className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                    {profile.clinicName} • {profile.city} - {profile.state}
                  </p>
                </div>

                <div className="sm:self-center">
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    className="text-xs"
                    onClick={() => setViewMode('preview')}
                  >
                    <Eye className="w-3.5 h-3.5 mr-1 text-emerald-400" />
                    Ver Página Completa
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dica de Foto Estilo Portais Médicos */}
          {!profile.photoTipDismissed && (
            <div className="bg-muted/40 border border-border rounded-xl p-3.5 flex items-start justify-between gap-3 text-xs text-muted-foreground">
              <div className="flex items-start gap-2.5">
                <Info className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-foreground">
                    Recomendação dos Portais Médicos (Doctoralia & BoaConsulta):
                  </strong>{' '}
                  Profissionais que utilizam fotos frontais com fundo neutro e expressão amigável
                  recebem até{' '}
                  <span className="text-emerald-400 font-semibold">
                    3.8x mais agendamentos de primeiras consultas
                  </span>
                  .
                </div>
              </div>
              <button
                type="button"
                className="text-muted-foreground hover:text-foreground text-xs"
                onClick={() => setProfile((p) => ({ ...p, photoTipDismissed: true }))}
              >
                ✕
              </button>
            </div>
          )}

          {/* Formulário de Edição em Abas Temáticas */}
          <form onSubmit={handleSave}>
            <Tabs defaultValue="dados" className="space-y-6">
              <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 h-auto p-1.5 bg-muted/60 gap-1 rounded-xl">
                <TabsTrigger value="dados" className="text-xs py-2 data-[state=active]:bg-card">
                  Dados Profissionais
                </TabsTrigger>
                <TabsTrigger value="bio" className="text-xs py-2 data-[state=active]:bg-card">
                  Sobre / Bio
                </TabsTrigger>
                <TabsTrigger
                  value="especialidades"
                  className="text-xs py-2 data-[state=active]:bg-card"
                >
                  Especialidades
                </TabsTrigger>
                <TabsTrigger value="formacao" className="text-xs py-2 data-[state=active]:bg-card">
                  Formação
                </TabsTrigger>
                <TabsTrigger value="destaques" className="text-xs py-2 data-[state=active]:bg-card">
                  Destaques & Métricas
                </TabsTrigger>
                <TabsTrigger value="clinica" className="text-xs py-2 data-[state=active]:bg-card">
                  Clínica & Horários
                </TabsTrigger>
                <TabsTrigger value="pagamento" className="text-xs py-2 data-[state=active]:bg-card">
                  Pagamento & Redes
                </TabsTrigger>
              </TabsList>

              {/* ABA 1: Dados Profissionais */}
              <TabsContent value="dados">
                <Card className="border-border bg-card">
                  <CardHeader>
                    <CardTitle className="text-lg">Dados Principais do Ortodontista</CardTitle>
                    <CardDescription>
                      Identificação oficial, título de apresentação e registro perante o conselho de
                      classe
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="prof-name">Nome Completo</Label>
                        <Input
                          id="prof-name"
                          value={profile.name}
                          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="prof-cro">Registro Profissional (CRO / UF)</Label>
                        <Input
                          id="prof-cro"
                          value={profile.cro}
                          onChange={(e) => setProfile({ ...profile, cro: e.target.value })}
                          placeholder="Ex: CRO-SP 98.432"
                          required
                        />
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="prof-title">Título de Apresentação Profissional</Label>
                        <Input
                          id="prof-title"
                          value={profile.professionalTitle}
                          onChange={(e) =>
                            setProfile({ ...profile, professionalTitle: e.target.value })
                          }
                          placeholder="Ex: Ortodontista Especialista em Tecnologia Magic Wire"
                          required
                        />
                        <p className="text-[11px] text-muted-foreground">
                          Exibido logo abaixo do seu nome nos resultados de pesquisa de
                          ortodontistas credenciados.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="prof-phone">WhatsApp / Telefone de Contato</Label>
                        <Input
                          id="prof-phone"
                          value={profile.phone}
                          onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="prof-email">E-mail Profissional</Label>
                        <Input
                          id="prof-email"
                          type="email"
                          value={profile.email}
                          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* ABA 2: Sobre / Bio */}
              <TabsContent value="bio">
                <Card className="border-border bg-card">
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <CardTitle className="text-lg">
                          Biografia & Apresentação aos Pacientes
                        </CardTitle>
                        <CardDescription>
                          Apresentação humanizada e abordagem clínica em 1ª pessoa (modelo
                          Doctoralia)
                        </CardDescription>
                      </div>
                      <span className="text-xs text-muted-foreground self-start sm:self-auto">
                        {profile.bio.length} caracteres
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-3 bg-emerald-950/20 border border-emerald-500/20 rounded-lg text-xs text-emerald-300">
                      <strong>Boa prática recomendada pelos portais:</strong> Escreva em primeira
                      pessoa ("Sou ortodontista...", "Atuo com foco em..."), mencione sua formação,
                      a experiência com a tecnologia Magic Wire (fio lingual invisível) e sua
                      filosofia de atendimento.
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="prof-bio">Texto da Biografia</Label>
                      <textarea
                        id="prof-bio"
                        rows={7}
                        value={profile.bio}
                        onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                        className="w-full rounded-md border border-input bg-background p-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 leading-relaxed"
                        placeholder="Conte sua trajetória, abordagem e diferencial com a tecnologia Magic Wire..."
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* ABA 3: Especialidades & Tratamentos */}
              <TabsContent value="especialidades">
                <Card className="border-border bg-card">
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Especialidades & Tratamentos Ofertados
                    </CardTitle>
                    <CardDescription>
                      Tags e áreas de atuação que ajudam os pacientes a encontrar o tratamento exato
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    <div className="flex flex-wrap gap-2">
                      {profile.specialties.map((spec) => (
                        <Badge
                          key={spec}
                          className="bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 px-3 py-1.5 text-xs flex items-center gap-1.5"
                        >
                          {spec.includes('Magic Wire') || spec.includes('Fio Lingual') ? (
                            <Sparkles className="w-3 h-3 text-emerald-400" />
                          ) : null}
                          {spec}
                          <button
                            type="button"
                            onClick={() => handleRemoveSpecialty(spec)}
                            className="hover:text-red-400 font-bold ml-1 text-sm leading-none"
                            title="Remover especialidade"
                          >
                            ×
                          </button>
                        </Badge>
                      ))}
                    </div>

                    <div className="flex gap-2 max-w-lg">
                      <Input
                        placeholder="Ex: Ortodontia Preventiva, DTM, Ronco..."
                        value={newSpecialty}
                        onChange={(e) => setNewSpecialty(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault()
                            handleAddSpecialty()
                          }
                        }}
                      />
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={handleAddSpecialty}
                        className="flex-shrink-0"
                      >
                        <Plus className="w-4 h-4 mr-1" /> Adicionar
                      </Button>
                    </div>

                    <div className="pt-2 border-t border-border">
                      <p className="text-xs font-semibold text-muted-foreground mb-2">
                        Sugestões rápidas para adicionar com 1 clique:
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {[
                          'Tratamento com Magic Wire',
                          'Fio Lingual Customizado',
                          'Escaneamento Intraoral 3D',
                          'Ortodontia Interceptiva',
                          'Contenção Fixa e Estética',
                        ]
                          .filter((s) => !profile.specialties.includes(s))
                          .map((tag) => (
                            <button
                              key={tag}
                              type="button"
                              onClick={() => {
                                setProfile((prev) => ({
                                  ...prev,
                                  specialties: [...prev.specialties, tag],
                                }))
                              }}
                              className="text-[11px] px-2.5 py-1 rounded-full border border-border bg-muted/50 hover:bg-emerald-500/10 hover:border-emerald-500/30 hover:text-emerald-300 text-muted-foreground transition-colors flex items-center gap-1"
                            >
                              <Plus className="w-3 h-3" /> {tag}
                            </button>
                          ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* ABA 4: Formação Acadêmica */}
              <TabsContent value="formacao">
                <Card className="border-border bg-card">
                  <CardHeader>
                    <CardTitle className="text-lg">Formação Acadêmica & Títulos</CardTitle>
                    <CardDescription>
                      Graduação, especializações, mestrados, residências e certificações Master
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    {/* Lista existente */}
                    <div className="space-y-2.5">
                      {profile.education.map((edu) => (
                        <div
                          key={edu.id}
                          className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/30"
                        >
                          <div className="space-y-0.5">
                            <p className="text-sm font-semibold text-foreground">{edu.degree}</p>
                            <p className="text-xs text-muted-foreground">
                              {edu.institution} • {edu.year}
                            </p>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="text-red-400 hover:text-red-300 hover:bg-red-500/10 h-8 w-8 p-0"
                            onClick={() => handleRemoveEducation(edu.id)}
                            title="Remover formação"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>

                    {/* Adicionar nova */}
                    <div className="p-4 rounded-xl border border-dashed border-border bg-muted/20 space-y-3">
                      <p className="text-xs font-semibold text-foreground">
                        Adicionar Nova Formação / Certificação:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <Input
                          placeholder="Curso / Titulação (Ex: Especialização em Ortodontia)"
                          value={newEduDegree}
                          onChange={(e) => setNewEduDegree(e.target.value)}
                        />
                        <Input
                          placeholder="Instituição (Ex: FOUSP)"
                          value={newEduInst}
                          onChange={(e) => setNewEduInst(e.target.value)}
                        />
                        <div className="flex gap-2">
                          <Input
                            placeholder="Ano (Ex: 2021)"
                            value={newEduYear}
                            onChange={(e) => setNewEduYear(e.target.value)}
                            className="w-24 flex-shrink-0"
                          />
                          <Button
                            type="button"
                            onClick={handleAddEducation}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white flex-1"
                          >
                            <Plus className="w-4 h-4 mr-1" /> Incluir
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* ABA 5: Destaques & Métricas */}
              <TabsContent value="destaques">
                <Card className="border-border bg-card">
                  <CardHeader>
                    <CardTitle className="text-lg">Indicadores Clínicos & Prova Social</CardTitle>
                    <CardDescription>
                      Números que demonstram autoridade, tempo de estrada e volume de casos tratados
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="stat-years">Anos de Atuação</Label>
                        <Input
                          id="stat-years"
                          type="number"
                          value={profile.stats.yearsExperience}
                          onChange={(e) =>
                            setProfile({
                              ...profile,
                              stats: {
                                ...profile.stats,
                                yearsExperience: Number(e.target.value) || 0,
                              },
                            })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="stat-cases">Casos Clínicos Concluídos</Label>
                        <Input
                          id="stat-cases"
                          type="number"
                          value={profile.stats.casesCompleted}
                          onChange={(e) =>
                            setProfile({
                              ...profile,
                              stats: {
                                ...profile.stats,
                                casesCompleted: Number(e.target.value) || 0,
                              },
                            })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="stat-mw">Tratamentos com Magic Wire</Label>
                        <Input
                          id="stat-mw"
                          type="number"
                          value={profile.stats.magicWireTreatments}
                          onChange={(e) =>
                            setProfile({
                              ...profile,
                              stats: {
                                ...profile.stats,
                                magicWireTreatments: Number(e.target.value) || 0,
                              },
                            })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="stat-sat">Taxa de Satisfação (%)</Label>
                        <Input
                          id="stat-sat"
                          type="number"
                          step="0.1"
                          value={profile.stats.satisfactionRate}
                          onChange={(e) =>
                            setProfile({
                              ...profile,
                              stats: {
                                ...profile.stats,
                                satisfactionRate: Number(e.target.value) || 0,
                              },
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                      <div className="space-y-2">
                        <Label htmlFor="stat-nps">Índice NPS (0 a 100)</Label>
                        <Input
                          id="stat-nps"
                          type="number"
                          value={profile.stats.npsScore}
                          onChange={(e) =>
                            setProfile({
                              ...profile,
                              stats: {
                                ...profile.stats,
                                npsScore: Number(e.target.value) || 0,
                              },
                            })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="stat-rating">Nota em Estrelas (máx. 5.0)</Label>
                        <Input
                          id="stat-rating"
                          type="number"
                          step="0.01"
                          max="5"
                          value={profile.stats.rating}
                          onChange={(e) =>
                            setProfile({
                              ...profile,
                              stats: {
                                ...profile.stats,
                                rating: Number(e.target.value) || 0,
                              },
                            })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="stat-reviews">Total de Avaliações Recebidas</Label>
                        <Input
                          id="stat-reviews"
                          type="number"
                          value={profile.stats.totalReviews}
                          onChange={(e) =>
                            setProfile({
                              ...profile,
                              stats: {
                                ...profile.stats,
                                totalReviews: Number(e.target.value) || 0,
                              },
                            })
                          }
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* ABA 6: Clínica & Horários */}
              <TabsContent value="clinica">
                <Card className="border-border bg-card">
                  <CardHeader>
                    <CardTitle className="text-lg">Clínica & Horários de Atendimento</CardTitle>
                    <CardDescription>
                      Endereço físico, ponto de referência e faixas horárias disponíveis para os
                      pacientes
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="clinic-name">Nome da Clínica / Consultório</Label>
                        <Input
                          id="clinic-name"
                          value={profile.clinicName}
                          onChange={(e) => setProfile({ ...profile, clinicName: e.target.value })}
                          required
                        />
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="clinic-addr">Endereço Completo</Label>
                        <Input
                          id="clinic-addr"
                          value={profile.address}
                          onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="clinic-city">Cidade</Label>
                        <Input
                          id="clinic-city"
                          value={profile.city}
                          onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <Label htmlFor="clinic-state">UF</Label>
                          <Input
                            id="clinic-state"
                            value={profile.state}
                            onChange={(e) => setProfile({ ...profile, state: e.target.value })}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="clinic-zip">CEP</Label>
                          <Input
                            id="clinic-zip"
                            value={profile.zipCode}
                            onChange={(e) => setProfile({ ...profile, zipCode: e.target.value })}
                          />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Horários */}
                    <div className="space-y-3">
                      <Label className="text-sm font-semibold">Horários de Atendimento</Label>
                      <div className="space-y-2">
                        {profile.workingHours.map((wh) => (
                          <div
                            key={wh.id}
                            className="flex items-center justify-between p-2.5 rounded-lg border border-border bg-muted/30 text-xs"
                          >
                            <span className="font-semibold text-foreground">{wh.days}</span>
                            <span className="text-emerald-400 font-medium">{wh.period}</span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="text-red-400 hover:text-red-300 h-7 w-7 p-0"
                              onClick={() => handleRemoveWorkingHour(wh.id)}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </Button>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2 pt-1">
                        <Input
                          placeholder="Dias (Ex: Segunda a Sexta-feira)"
                          value={newWhDays}
                          onChange={(e) => setNewWhDays(e.target.value)}
                          className="text-xs"
                        />
                        <Input
                          placeholder="Horário (Ex: 08:00 às 18:00)"
                          value={newWhPeriod}
                          onChange={(e) => setNewWhPeriod(e.target.value)}
                          className="text-xs"
                        />
                        <Button
                          type="button"
                          variant="secondary"
                          onClick={handleAddWorkingHour}
                          className="text-xs flex-shrink-0"
                        >
                          <Plus className="w-3.5 h-3.5 mr-1" /> Adicionar Horário
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* ABA 7: Pagamento & Redes */}
              <TabsContent value="pagamento">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Formas de Pagamento */}
                  <Card className="border-border bg-card">
                    <CardHeader>
                      <CardTitle className="text-lg">Formas de Pagamento & Convênios</CardTitle>
                      <CardDescription>
                        Opções aceitas na sua clínica exibidas aos pacientes
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <label className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/20 cursor-pointer hover:bg-muted/40">
                        <div className="space-y-0.5">
                          <span className="text-sm font-semibold text-emerald-400">
                            Financiamento MWS
                          </span>
                          <p className="text-xs text-muted-foreground">
                            Parcelamento direto pelo ecossistema Magic Wire
                          </p>
                        </div>
                        <input
                          type="checkbox"
                          checked={profile.paymentMethods.mwsFintech}
                          onChange={(e) =>
                            setProfile({
                              ...profile,
                              paymentMethods: {
                                ...profile.paymentMethods,
                                mwsFintech: e.target.checked,
                              },
                            })
                          }
                          className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                        />
                      </label>

                      <label className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/20 cursor-pointer hover:bg-muted/40">
                        <div className="space-y-0.5">
                          <span className="text-sm font-semibold text-foreground">
                            Atendimento Particular
                          </span>
                          <p className="text-xs text-muted-foreground">
                            Consultas e tratamentos particulares
                          </p>
                        </div>
                        <input
                          type="checkbox"
                          checked={profile.paymentMethods.particular}
                          onChange={(e) =>
                            setProfile({
                              ...profile,
                              paymentMethods: {
                                ...profile.paymentMethods,
                                particular: e.target.checked,
                              },
                            })
                          }
                          className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                        />
                      </label>

                      <label className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/20 cursor-pointer hover:bg-muted/40">
                        <div className="space-y-0.5">
                          <span className="text-sm font-semibold text-foreground">
                            PIX com Desconto
                          </span>
                          <p className="text-xs text-muted-foreground">
                            Condição especial para pagamento à vista
                          </p>
                        </div>
                        <input
                          type="checkbox"
                          checked={profile.paymentMethods.pix}
                          onChange={(e) =>
                            setProfile({
                              ...profile,
                              paymentMethods: {
                                ...profile.paymentMethods,
                                pix: e.target.checked,
                              },
                            })
                          }
                          className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                        />
                      </label>

                      <label className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/20 cursor-pointer hover:bg-muted/40">
                        <div className="space-y-0.5">
                          <span className="text-sm font-semibold text-foreground">
                            Cartões de Crédito Parcelado
                          </span>
                          <p className="text-xs text-muted-foreground">
                            Visa, Mastercard, Elo, Amex
                          </p>
                        </div>
                        <input
                          type="checkbox"
                          checked={profile.paymentMethods.creditCardInstallments}
                          onChange={(e) =>
                            setProfile({
                              ...profile,
                              paymentMethods: {
                                ...profile.paymentMethods,
                                creditCardInstallments: e.target.checked,
                              },
                            })
                          }
                          className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                        />
                      </label>

                      <label className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/20 cursor-pointer hover:bg-muted/40">
                        <div className="space-y-0.5">
                          <span className="text-sm font-semibold text-foreground">
                            Laudo para Reembolso de Convênios
                          </span>
                          <p className="text-xs text-muted-foreground">
                            Documentação odontológica para pedido de reembolso
                          </p>
                        </div>
                        <input
                          type="checkbox"
                          checked={profile.paymentMethods.conveniosReembolso}
                          onChange={(e) =>
                            setProfile({
                              ...profile,
                              paymentMethods: {
                                ...profile.paymentMethods,
                                conveniosReembolso: e.target.checked,
                              },
                            })
                          }
                          className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                        />
                      </label>
                    </CardContent>
                  </Card>

                  {/* Redes Sociais e Site */}
                  <Card className="border-border bg-card">
                    <CardHeader>
                      <CardTitle className="text-lg">Redes Sociais & Presença Digital</CardTitle>
                      <CardDescription>
                        Links para os perfis onde o paciente pode ver mais do seu trabalho
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="link-insta" className="flex items-center gap-1.5">
                          <Instagram className="w-3.5 h-3.5 text-pink-400" /> Instagram Profissional
                        </Label>
                        <Input
                          id="link-insta"
                          value={profile.instagram}
                          onChange={(e) => setProfile({ ...profile, instagram: e.target.value })}
                          placeholder="@seu.perfil"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="link-linkedin" className="flex items-center gap-1.5">
                          <Linkedin className="w-3.5 h-3.5 text-blue-400" /> LinkedIn
                        </Label>
                        <Input
                          id="link-linkedin"
                          value={profile.linkedin}
                          onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
                          placeholder="linkedin.com/in/seu-perfil"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="link-site" className="flex items-center gap-1.5">
                          <Globe className="w-3.5 h-3.5 text-emerald-400" /> Site / Landing Page
                        </Label>
                        <Input
                          id="link-site"
                          value={profile.website}
                          onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                          placeholder="https://suaclinica.com.br"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>

            {/* Barra Inferior de Ação Rápida */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-border">
              <div className="text-xs text-muted-foreground">
                Última sincronização com a rede de pacientes: Hoje às 14h30
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 sm:flex-none border-border"
                  onClick={() => setViewMode('preview')}
                >
                  <Eye className="w-4 h-4 mr-2 text-emerald-400" />
                  Visualizar como Paciente
                </Button>
                <Button
                  type="submit"
                  className="flex-1 sm:flex-none bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-6"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Salvar Alterações
                </Button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
