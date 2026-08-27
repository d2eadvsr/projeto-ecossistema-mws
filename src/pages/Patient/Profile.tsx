import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  User,
  FileText,
  ShieldCheck,
  Stethoscope,
  HeartPulse,
  Upload,
  Download,
  CheckCircle2,
  AlertCircle,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Sparkles,
  Lock,
  FileCheck2,
  ExternalLink,
  Eye,
  Info,
  UserCheck,
} from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'
import { useToast } from '@/hooks/use-toast'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'

interface UploadedDoc {
  id: string
  name: string
  type: string
  category: 'radiografia' | 'foto' | 'laudo' | 'contrato' | 'consentimento'
  uploadDate: string
  size: string
  status: 'validado' | 'em_analise'
}

interface ConsentTerm {
  id: string
  title: string
  version: string
  signedDate: string
  status: 'signed' | 'pending'
  summary: string
  ipAddress?: string
}

interface PatientProfileData {
  personal: {
    fullName: string
    cpf: string
    rg: string
    birthDate: string
    email: string
    phone: string
    emergencyContact: string
    address: string
    avatar: string
  }
  clinicalHistory: {
    bloodType: string
    allergies: string[]
    currentMedications: string
    preExistingConditions: string
    bruxism: string
    gumHealth: string
    previousOrthodontics: string
  }
  treatmentInfo: {
    caseCode: string
    protocol: string
    startDate: string
    estimatedEnd: string
    orthodontistName: string
    orthodontistCro: string
    orthodontistClinic: string
    orthodontistPhone: string
    orthodontistEmail: string
    orthodontistAvatar: string
  }
  documents: UploadedDoc[]
  consentTerms: ConsentTerm[]
}

const MOCK_PATIENT_PROFILE: PatientProfileData = {
  personal: {
    fullName: 'Maria Eduarda Silva Santos',
    cpf: '342.***.***-08',
    rg: '44.***.***-9 SSP/SP',
    birthDate: '14/05/1998 (28 anos)',
    email: 'maria.silva@email.com',
    phone: '(11) 98765-4321',
    emergencyContact: 'Carlos Santos (Cônjuge) - (11) 97654-3210',
    address: 'Alameda dos Anapurus, 1420 - Moema, São Paulo/SP - CEP 04087-004',
    avatar: 'https://img.usecurling.com/ppl/medium?gender=female&seed=1',
  },
  clinicalHistory: {
    bloodType: 'O+',
    allergies: ['Penicilina (leve)', 'Nenhum contato com látex'],
    currentMedications: 'Nenhum medicamento de uso contínuo',
    preExistingConditions: 'Nenhuma patologia crônica relatada',
    bruxism: 'Leve apertamento dental noturno (acompanhado no planejamento lingual)',
    gumHealth: 'Gengiva saudável, sem bolsas periodontais ativas',
    previousOrthodontics:
      'Uso de aparelho fixo vestibular na adolescência (recidiva de apinhamento inferior)',
  },
  treatmentInfo: {
    caseCode: 'CAS-2026-084-MWS',
    protocol: 'Magic Wire Protocolo Lingual Customizado',
    startDate: '12 de Janeiro de 2026',
    estimatedEnd: 'Novembro de 2026',
    orthodontistName: 'Dra. Aline Costa',
    orthodontistCro: 'CRO-SP 104.892',
    orthodontistClinic: 'Clínica OrthoDesign Jardins',
    orthodontistPhone: '(11) 98765-4321',
    orthodontistEmail: 'contato@orthodesign.com.br',
    orthodontistAvatar: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=1',
  },
  documents: [
    {
      id: 'doc-1',
      name: 'Escaneamento_Intraoral_Superior_Inferior_3D.stl',
      type: 'Arquivo 3D STL',
      category: 'radiografia' as const,
      uploadDate: '12/01/2026',
      size: '24.5 MB',
      status: 'validado' as const,
    },
    {
      id: 'doc-2',
      name: 'Telerradiografia_Lateral_e_Panoramica.pdf',
      type: 'Laudo Radiológico Digital',
      category: 'radiografia' as const,
      uploadDate: '12/01/2026',
      size: '8.2 MB',
      status: 'validado' as const,
    },
    {
      id: 'doc-3',
      name: 'Fotos_Iniciais_Extra_e_Intraorais_MWS.zip',
      type: 'Registro Fotográfico',
      category: 'foto' as const,
      uploadDate: '12/01/2026',
      size: '18.0 MB',
      status: 'validado' as const,
    },
    {
      id: 'doc-4',
      name: 'Contrato_Prestacao_Servicos_Ortodonticos_MWS.pdf',
      type: 'Contrato de Prestação de Serviços',
      category: 'contrato' as const,
      uploadDate: '12/01/2026',
      size: '1.4 MB',
      status: 'validado' as const,
    },
  ],
  consentTerms: [
    {
      id: 'term-1',
      title: 'Termo de Consentimento Livre e Esclarecido (TCLE) - Magic Wire',
      version: 'v2.4 / 2026',
      signedDate: '12/01/2026 às 10:45',
      status: 'signed' as const,
      summary:
        'Declaração de ciência sobre o funcionamento do sistema lingual instalado por trás dos dentes, orientações de higiene e biomecânica contínua.',
      ipAddress: '187.54.***.120 (Assinatura Eletrônica Válida)',
    },
    {
      id: 'term-2',
      title: 'Termo de Autorização de Uso de Imagens para Fins Científicos e Evolução',
      version: 'v1.2 / 2026',
      signedDate: '12/01/2026 às 10:47',
      status: 'signed' as const,
      summary:
        'Autorização para armazenamento confidencial de fotografias de acompanhamento e comparativos antes/depois no prontuário digital seguro.',
      ipAddress: '187.54.***.120 (Assinatura Eletrônica Válida)',
    },
    {
      id: 'term-3',
      title: 'Termo de Conformidade e Proteção de Dados de Saúde (LGPD)',
      version: 'v3.0 / 2026',
      signedDate: '12/01/2026 às 10:48',
      status: 'signed' as const,
      summary:
        'Garantia de sigilo médico, armazenamento criptografado dos exames 3D e conformidade total com a Lei Geral de Proteção de Dados.',
      ipAddress: '187.54.***.120 (Assinatura Eletrônica Válida)',
    },
  ],
}

export default function PatientProfile() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [profile, setProfile] = useState<PatientProfileData>(MOCK_PATIENT_PROFILE)
  const [isEditingPhone, setIsEditingPhone] = useState(false)
  const [phoneInput, setPhoneInput] = useState(profile.personal.phone)
  const [emergencyInput, setEmergencyInput] = useState(profile.personal.emergencyContact)
  const [selectedDoc, setSelectedDoc] = useState<UploadedDoc | null>(null)
  const [selectedTerm, setSelectedTerm] = useState<ConsentTerm | null>(null)
  const [isUploadOpen, setIsUploadOpen] = useState(false)
  const [newDocName, setNewDocName] = useState('')

  const handleSaveContact = (e: React.FormEvent) => {
    e.preventDefault()
    setProfile((prev) => ({
      ...prev,
      personal: {
        ...prev.personal,
        phone: phoneInput,
        emergencyContact: emergencyInput,
      },
    }))
    setIsEditingPhone(false)
    toast({
      title: 'Dados de Contato Atualizados!',
      description: 'Suas informações foram salvas com sucesso.',
    })
  }

  const handleUploadDoc = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newDocName.trim()) return

    const newDoc: UploadedDoc = {
      id: `doc-${Date.now()}`,
      name: newDocName,
      type: 'Documento Anexado pelo Paciente',
      category: 'laudo',
      uploadDate: new Date().toLocaleDateString('pt-BR'),
      size: '3.4 MB',
      status: 'em_analise',
    }

    setProfile((prev) => ({
      ...prev,
      documents: [newDoc, ...prev.documents],
    }))

    setIsUploadOpen(false)
    setNewDocName('')
    toast({
      title: 'Documento Enviado!',
      description: 'O arquivo foi anexado ao seu prontuário e será avaliado pela Dra. Aline.',
    })
  }

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-5xl mx-auto animate-fade-in-up">
      {/* Cabeçalho do Perfil */}
      <Card className="border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="h-20 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700" />
        <CardContent className="px-6 pb-6 pt-0 relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-10 mb-4">
            <div className="flex items-end gap-4">
              <Avatar className="h-20 w-20 border-4 border-white shadow-md bg-emerald-100">
                <AvatarImage src={profile.personal.avatar} />
                <AvatarFallback className="text-emerald-800 text-2xl font-bold">
                  {profile.personal.fullName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
                    {profile.personal.fullName}
                  </h1>
                  <Badge className="bg-emerald-100 text-emerald-800 text-xs">
                    Paciente Magic Wire
                  </Badge>
                </div>
                <p className="text-xs sm:text-sm text-slate-500">
                  {profile.personal.email} • {profile.personal.birthDate}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className="border-emerald-300 text-emerald-800 bg-emerald-50 text-xs font-mono py-1"
              >
                Ref: {profile.treatmentInfo.caseCode}
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-100 text-xs">
            <div className="flex items-center gap-2 text-slate-600">
              <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{profile.personal.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <Calendar className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Início do Tratamento: {profile.treatmentInfo.startDate}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <Stethoscope className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{profile.treatmentInfo.orthodontistName}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs Principais do Perfil */}
      <Tabs defaultValue="pessoais" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="pessoais" className="flex items-center gap-1.5 text-xs sm:text-sm">
            <User className="w-4 h-4" /> Dados Pessoais
          </TabsTrigger>
          <TabsTrigger value="historico" className="flex items-center gap-1.5 text-xs sm:text-sm">
            <HeartPulse className="w-4 h-4" /> Histórico Clínico
          </TabsTrigger>
          <TabsTrigger value="documentos" className="flex items-center gap-1.5 text-xs sm:text-sm">
            <FileText className="w-4 h-4" /> Documentos ({profile.documents.length})
          </TabsTrigger>
          <TabsTrigger
            value="consentimento"
            className="flex items-center gap-1.5 text-xs sm:text-sm"
          >
            <ShieldCheck className="w-4 h-4" /> Termos & LGPD
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: Dados Pessoais & Ortodontista Responsável */}
        <TabsContent value="pessoais" className="space-y-6 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Coluna Esquerda: Dados Cadastrais */}
            <div className="md:col-span-2 space-y-4">
              <Card className="border-slate-200">
                <CardHeader className="pb-3 border-b border-slate-100">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
                      <User className="w-4 h-4 text-emerald-600" />
                      Informações Cadastrais
                    </CardTitle>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditingPhone(!isEditingPhone)}
                      className="text-xs border-slate-300"
                    >
                      {isEditingPhone ? 'Cancelar' : 'Editar Contato'}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-5 space-y-4">
                  {isEditingPhone ? (
                    <form onSubmit={handleSaveContact} className="space-y-3">
                      <div className="space-y-1">
                        <Label htmlFor="edit-phone">Telefone / WhatsApp</Label>
                        <Input
                          id="edit-phone"
                          value={phoneInput}
                          onChange={(e) => setPhoneInput(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="edit-emergency">Contato de Emergência</Label>
                        <Input
                          id="edit-emergency"
                          value={emergencyInput}
                          onChange={(e) => setEmergencyInput(e.target.value)}
                          required
                        />
                      </div>
                      <Button
                        type="submit"
                        size="sm"
                        className="bg-emerald-600 hover:bg-emerald-700"
                      >
                        Salvar Alterações
                      </Button>
                    </form>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div className="space-y-1">
                        <span className="text-slate-500">Nome Completo</span>
                        <p className="font-semibold text-slate-900">{profile.personal.fullName}</p>
                      </div>
                      <div className="space-y-1">
                        <span className="text-slate-500">CPF</span>
                        <p className="font-semibold text-slate-900">{profile.personal.cpf}</p>
                      </div>
                      <div className="space-y-1">
                        <span className="text-slate-500">RG</span>
                        <p className="font-semibold text-slate-900">{profile.personal.rg}</p>
                      </div>
                      <div className="space-y-1">
                        <span className="text-slate-500">Data de Nascimento</span>
                        <p className="font-semibold text-slate-900">{profile.personal.birthDate}</p>
                      </div>
                      <div className="space-y-1">
                        <span className="text-slate-500">E-mail</span>
                        <p className="font-semibold text-slate-900">{profile.personal.email}</p>
                      </div>
                      <div className="space-y-1">
                        <span className="text-slate-500">Telefone</span>
                        <p className="font-semibold text-slate-900">{profile.personal.phone}</p>
                      </div>
                      <div className="sm:col-span-2 space-y-1 pt-2 border-t border-slate-100">
                        <span className="text-slate-500">Endereço Residencial</span>
                        <p className="font-semibold text-slate-900">{profile.personal.address}</p>
                      </div>
                      <div className="sm:col-span-2 space-y-1">
                        <span className="text-slate-500">Contato de Emergência</span>
                        <p className="font-semibold text-slate-900">
                          {profile.personal.emergencyContact}
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Coluna Direita: Ortodontista Responsável */}
            <div className="space-y-4">
              <Card className="border-emerald-200 bg-emerald-50/30">
                <CardHeader className="pb-3 border-b border-emerald-100">
                  <CardTitle className="text-sm font-bold text-emerald-950 flex items-center gap-2">
                    <Stethoscope className="w-4 h-4 text-emerald-600" />
                    Ortodontista Responsável
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-5 space-y-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12 border-2 border-emerald-300">
                      <AvatarImage src={profile.treatmentInfo.orthodontistAvatar} />
                      <AvatarFallback className="bg-emerald-200 text-emerald-900 font-bold">
                        AC
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">
                        {profile.treatmentInfo.orthodontistName}
                      </h4>
                      <p className="text-xs text-emerald-800 font-medium">
                        {profile.treatmentInfo.orthodontistCro}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs text-slate-600 bg-white p-3.5 rounded-lg border border-emerald-100">
                    <p>
                      <strong>Consultório:</strong> {profile.treatmentInfo.orthodontistClinic}
                    </p>
                    <p>
                      <strong>Telefone / WhatsApp:</strong>{' '}
                      {profile.treatmentInfo.orthodontistPhone}
                    </p>
                    <p>
                      <strong>E-mail:</strong> {profile.treatmentInfo.orthodontistEmail}
                    </p>
                  </div>

                  <div className="space-y-1 text-xs text-slate-500">
                    <p>
                      <strong>Protocolo Ativo:</strong> {profile.treatmentInfo.protocol}
                    </p>
                    <p>
                      <strong>Previsão de Término:</strong> {profile.treatmentInfo.estimatedEnd}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Tab 2: Histórico Clínico e Odontológico */}
        <TabsContent value="historico" className="space-y-4 pt-4">
          <Card className="border-slate-200">
            <CardHeader className="pb-3 border-b border-slate-100">
              <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
                <HeartPulse className="w-5 h-5 text-red-500" />
                Anamnese & Histórico de Saúde Bucal
              </CardTitle>
              <CardDescription>
                Informações de saúde registradas na triagem inicial para acompanhamento da
                biomecânica lingual.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <span className="text-xs font-semibold text-slate-500">Tipo Sanguíneo</span>
                  <p className="text-sm font-bold text-slate-900">
                    {profile.clinicalHistory.bloodType}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200/80 space-y-1">
                  <span className="text-xs font-semibold text-amber-800">Alergias Relatadas</span>
                  <p className="text-xs font-bold text-slate-900">
                    {profile.clinicalHistory.allergies.join(' • ')}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <span className="text-xs font-semibold text-slate-500">
                    Medicamentos de Uso Contínuo
                  </span>
                  <p className="text-xs font-medium text-slate-900">
                    {profile.clinicalHistory.currentMedications}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <span className="text-xs font-semibold text-slate-500">
                    Condições Pré-existentes
                  </span>
                  <p className="text-xs font-medium text-slate-900">
                    {profile.clinicalHistory.preExistingConditions}
                  </p>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <h4 className="text-sm font-bold text-slate-900">
                  Histórico Odontológico & Bruxismo
                </h4>
                <div className="space-y-2 text-xs">
                  <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-100">
                    <strong>Bruxismo / Apertamento:</strong> {profile.clinicalHistory.bruxism}
                  </div>
                  <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-100">
                    <strong>Saúde Gengival:</strong> {profile.clinicalHistory.gumHealth}
                  </div>
                  <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-100">
                    <strong>Tratamentos Ortodônticos Anteriores:</strong>{' '}
                    {profile.clinicalHistory.previousOrthodontics}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 3: Documentos Anexados */}
        <TabsContent value="documentos" className="space-y-4 pt-4">
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-3 border-b border-slate-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-emerald-600" />
                    Exames, Radiografias & Contratos
                  </CardTitle>
                  <CardDescription>
                    Arquivos digitais do seu planejamento 3D, radiografias e documentação
                    ortodôntica.
                  </CardDescription>
                </div>

                <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
                  <Button
                    size="sm"
                    onClick={() => setIsUploadOpen(true)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-xs"
                  >
                    <Upload className="w-4 h-4 mr-1.5" /> Enviar Novo Documento
                  </Button>
                  <DialogContent className="sm:max-w-[450px]">
                    <DialogHeader>
                      <DialogTitle>Anexar Documento ou Exame</DialogTitle>
                      <DialogDescription>
                        Envie radiografias, fotos ou laudos para o seu prontuário digital seguro.
                      </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleUploadDoc} className="space-y-4 pt-3">
                      <div className="space-y-2">
                        <Label htmlFor="doc-title">Nome / Descrição do Documento</Label>
                        <Input
                          id="doc-title"
                          placeholder="Ex: Tomografia Cone Beam Arcada Superior..."
                          value={newDocName}
                          onChange={(e) => setNewDocName(e.target.value)}
                          required
                        />
                      </div>

                      <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-emerald-500 transition-colors cursor-pointer bg-slate-50/50">
                        <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                        <p className="text-xs font-semibold text-slate-700">
                          Clique para selecionar arquivo ou arraste aqui
                        </p>
                        <p className="text-[11px] text-slate-400 mt-1">
                          PDF, STL, PNG, JPG até 50MB
                        </p>
                      </div>

                      <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">
                        Salvar no Prontuário
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent className="p-5 space-y-3">
              {profile.documents.map((doc) => (
                <div
                  key={doc.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-slate-200 bg-slate-50/40 hover:bg-slate-50 transition-colors gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <FileCheck2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <h4 className="text-sm font-bold text-slate-900">{doc.name}</h4>
                      <Badge variant="outline" className="text-[10px] bg-white border-slate-300">
                        {doc.type}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-500">
                      Anexado em {doc.uploadDate} • Tamanho: {doc.size} • Status:{' '}
                      <strong className="text-emerald-700 capitalize">{doc.status}</strong>
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        toast({
                          title: 'Download Iniciado',
                          description: `Baixando ${doc.name}...`,
                        })
                      }}
                      className="text-xs bg-white border-slate-300"
                    >
                      <Download className="w-3.5 h-3.5 mr-1 text-emerald-600" /> Baixar
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 4: Termos de Consentimento & LGPD */}
        <TabsContent value="consentimento" className="space-y-4 pt-4">
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-3 border-b border-slate-100">
              <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                Termos de Consentimento Assinados & Privacidade LGPD
              </CardTitle>
              <CardDescription>
                Termos legais assinados digitalmente com validade jurídica e garantia de proteção
                dos seus dados de saúde.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-5 space-y-4">
              {profile.consentTerms.map((term) => (
                <div
                  key={term.id}
                  className="p-5 rounded-xl border border-slate-200 bg-white space-y-3 shadow-xs"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge className="bg-emerald-100 text-emerald-800 text-xs">
                          <CheckCircle2 className="w-3 h-3 mr-1 text-emerald-700" /> Assinado
                          Digitalmente
                        </Badge>
                        <span className="text-xs font-mono text-slate-400">{term.version}</span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900">{term.title}</h4>
                    </div>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        toast({
                          title: 'Termo Baixado (PDF)',
                          description: `Cópia do termo com carimbo de autenticidade baixada com sucesso.`,
                        })
                      }}
                      className="text-xs border-slate-300 shrink-0"
                    >
                      <Download className="w-3.5 h-3.5 mr-1" /> Cópia Assinada
                    </Button>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
                    {term.summary}
                  </p>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                    <span>Assinado em: {term.signedDate}</span>
                    <span className="font-mono">{term.ipAddress}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
