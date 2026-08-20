import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  User,
  Building2,
  MapPin,
  Phone,
  Mail,
  Award,
  Globe,
  Instagram,
  Save,
  CheckCircle2,
  Eye,
  Camera,
  Star,
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export default function DentistPublicProfile() {
  const { toast } = useToast()

  const [profile, setProfile] = useState({
    name: 'Dr. Roberto Fernandes',
    cro: 'CRO-SP 98.432',
    clinicName: 'Fernandes Ortodontia & Estética Digital',
    tagline: 'Especialista em Alinhadores Invisíveis e Ortodontia Digital Magic Wire',
    bio: 'Ortodontista com mais de 12 anos de experiência clínica, credenciado master Magic Wire System. Foco em transformar sorrisos com previsibilidade, conforto e mínima intervenção mecânica.',
    phone: '(11) 98765-4321',
    email: 'contato@clinicafernandes.com.br',
    website: 'https://clinicafernandes.com.br',
    instagram: '@dr.robertofernandes',
    address: 'Av. Paulista, 1842 - Cj 114 - Bela Vista',
    city: 'São Paulo',
    state: 'SP',
    specialties: [
      'Ortodontia Digital',
      'Alinhadores Invisíveis',
      'Ortopedia Facial',
      'DTM e Oclusão',
    ],
    acceptsNewPatients: true,
    rating: 4.9,
    totalReviews: 84,
  })

  const [newSpecialty, setNewSpecialty] = useState('')

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: 'Perfil Público Atualizado!',
      description: 'As alterações já estão visíveis na rede de busca de ortodontistas parceiros.',
    })
  }

  const handleAddSpecialty = () => {
    if (newSpecialty.trim() && !profile.specialties.includes(newSpecialty.trim())) {
      setProfile((prev) => ({
        ...prev,
        specialties: [...prev.specialties, newSpecialty.trim()],
      }))
      setNewSpecialty('')
    }
  }

  const handleRemoveSpecialty = (spec: string) => {
    setProfile((prev) => ({
      ...prev,
      specialties: prev.specialties.filter((s) => s !== spec),
    }))
  }

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-5xl mx-auto animate-fade-in-up">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
              Perfil Público do Ortodontista
            </h1>
            <Badge className="bg-emerald-100 text-emerald-800">Público na Rede</Badge>
          </div>
          <p className="text-slate-500 mt-1">
            Essas informações são exibidas aos pacientes que buscam ortodontistas credenciados no
            app.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" className="border-slate-300">
            <Eye className="h-4 w-4 mr-2 text-slate-600" /> Pré-visualizar Como Paciente
          </Button>
        </div>
      </div>

      {/* Cartão de Apresentação / Preview Hero */}
      <Card className="border-emerald-200 bg-gradient-to-r from-emerald-50/80 via-white to-slate-50 shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="relative">
              <Avatar className="h-24 w-24 border-4 border-white shadow-md">
                <AvatarFallback className="bg-emerald-600 text-white text-2xl font-bold">
                  RF
                </AvatarFallback>
              </Avatar>
              <button
                type="button"
                className="absolute bottom-0 right-0 p-1.5 bg-slate-900 text-white rounded-full hover:bg-slate-800 shadow"
                title="Trocar Foto"
                onClick={() =>
                  toast({
                    title: 'Upload de Foto',
                    description: 'Selecione uma imagem de boa resolução.',
                  })
                }
              >
                <Camera className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-1 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl font-bold text-slate-900">{profile.name}</h2>
                <Badge
                  variant="outline"
                  className="border-emerald-600 text-emerald-700 bg-emerald-50"
                >
                  {profile.cro}
                </Badge>
                <span className="flex items-center gap-1 text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" /> {profile.rating} (
                  {profile.totalReviews} avaliações)
                </span>
              </div>
              <p className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-emerald-600" /> {profile.clinicName}
              </p>
              <p className="text-xs text-slate-500 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" /> {profile.address}, {profile.city}{' '}
                - {profile.state}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Formulário de Edição */}
      <form onSubmit={handleSave} className="space-y-6">
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">
              Informações Principais da Clínica & Profissional
            </CardTitle>
            <CardDescription>Dados que definem sua presença e destaque na busca</CardDescription>
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
                <Label htmlFor="prof-cro">Registro Profissional (CRO)</Label>
                <Input
                  id="prof-cro"
                  value={profile.cro}
                  onChange={(e) => setProfile({ ...profile, cro: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="clinic-name">Nome da Clínica / Consultório</Label>
                <Input
                  id="clinic-name"
                  value={profile.clinicName}
                  onChange={(e) => setProfile({ ...profile, clinicName: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="prof-tagline">Frase de Destaque / Slogan</Label>
                <Input
                  id="prof-tagline"
                  value={profile.tagline}
                  onChange={(e) => setProfile({ ...profile, tagline: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="prof-bio">Biografia & Apresentação aos Pacientes</Label>
              <textarea
                id="prof-bio"
                rows={4}
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                className="w-full rounded-md border border-input bg-background p-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              />
            </div>
          </CardContent>
        </Card>

        {/* Especialidades e Tags */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Especialidades & Diferenciais</CardTitle>
            <CardDescription>Adicione as áreas de atuação para filtrar pacientes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {profile.specialties.map((spec) => (
                <Badge
                  key={spec}
                  className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 text-xs flex items-center gap-1.5"
                >
                  {spec}
                  <button
                    type="button"
                    onClick={() => handleRemoveSpecialty(spec)}
                    className="hover:text-red-600 font-bold ml-1"
                  >
                    ×
                  </button>
                </Badge>
              ))}
            </div>

            <div className="flex gap-2 max-w-md">
              <Input
                placeholder="Ex: Ronco e Apneia, Ortodontia Preventiva..."
                value={newSpecialty}
                onChange={(e) => setNewSpecialty(e.target.value)}
              />
              <Button type="button" variant="outline" onClick={handleAddSpecialty}>
                Adicionar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Contato e Localização */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Localização & Canais de Atendimento</CardTitle>
            <CardDescription>Como os novos pacientes podem encontrar sua clínica</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="prof-phone">WhatsApp / Telefone de Contato</Label>
                <Input
                  id="prof-phone"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="prof-email">E-mail Comercial</Label>
                <Input
                  id="prof-email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="prof-insta">Instagram Profissional</Label>
                <Input
                  id="prof-insta"
                  value={profile.instagram}
                  onChange={(e) => setProfile({ ...profile, instagram: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="prof-web">Site / Landing Page</Label>
                <Input
                  id="prof-web"
                  value={profile.website}
                  onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="prof-addr">Endereço Completo</Label>
                <Input
                  id="prof-addr"
                  value={profile.address}
                  onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 px-6">
            <Save className="w-4 h-4 mr-2" /> Salvar Perfil Público
          </Button>
        </div>
      </form>
    </div>
  )
}
