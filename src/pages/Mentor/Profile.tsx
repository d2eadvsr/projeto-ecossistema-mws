import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  User,
  Mail,
  Phone,
  MapPin,
  Award,
  Sparkles,
  CheckCircle2,
  FileText,
  Calendar,
  Layers,
  ShieldCheck,
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { MentorProfile, loadMentors, saveMentors } from './mockData'
import { CURRENT_MENTOR } from './Dashboard'

export default function MentorProfilePage() {
  const [profile, setProfile] = useState<MentorProfile | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  const [formName, setFormName] = useState('')
  const [formEmail, setFormEmail] = useState('')
  const [formPhone, setFormPhone] = useState('')
  const [formCro, setFormCro] = useState('')
  const [formLocation, setFormLocation] = useState('')
  const [formSpecialties, setFormSpecialties] = useState('')
  const [formBio, setFormBio] = useState('')

  const { toast } = useToast()

  useEffect(() => {
    const list = loadMentors()
    const current = list.find((m) => m.id === CURRENT_MENTOR.id) || list[0]
    if (current) {
      setProfile(current)
      setFormName(current.name)
      setFormEmail(current.email)
      setFormPhone(current.phone)
      setFormCro(current.cro)
      setFormLocation(current.location)
      setFormSpecialties(current.specialties.join(', '))
      setFormBio(current.bio)
    }
  }, [])

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    if (!profile) return

    const specs = formSpecialties
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)

    const updatedProfile: MentorProfile = {
      ...profile,
      name: formName,
      email: formEmail,
      phone: formPhone,
      cro: formCro,
      location: formLocation,
      specialties: specs,
      bio: formBio,
    }

    const all = loadMentors()
    const updatedList = all.map((m) => (m.id === profile.id ? updatedProfile : m))
    saveMentors(updatedList)
    setProfile(updatedProfile)
    setIsEditing(false)

    toast({
      title: 'Perfil atualizado com sucesso!',
      description:
        'Seus dados pessoais, especializações e formação foram atualizados no ecossistema.',
    })
  }

  if (!profile) return null

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-5xl mx-auto animate-fade-in-up">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
              Credenciamento MWS • Perfil do Mentor
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 mt-1">
            Meu Perfil de Mentor
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">
            Análogo ao perfil do ortodontista: mantenha seus dados cadastrais, especializações e
            área de atuação sempre atualizados.
          </p>
        </div>

        {!isEditing && (
          <Button
            onClick={() => setIsEditing(true)}
            className="bg-primary hover:bg-[#082019] text-white border border-gold/30 text-xs font-semibold"
          >
            Editar Meu Perfil
          </Button>
        )}
      </div>

      {/* Cartão de Apresentação */}
      <Card className="border-slate-200 shadow-sm overflow-hidden">
        <div className="h-24 bg-gradient-to-r from-[#0d3b2e] via-[#124d3d] to-[#082019] border-b border-[#153e32] p-4 flex items-end justify-end">
          <Badge className="bg-gold/90 text-slate-950 font-bold text-xs shadow-sm">
            Mentor Oficial MWS
          </Badge>
        </div>
        <CardContent className="p-6 pt-0 relative">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 -mt-10 mb-4">
            <div className="flex items-end gap-4">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#124d3d] to-[#082019] border-4 border-white shadow-md text-gold text-2xl font-bold flex items-center justify-center">
                {profile.name.charAt(3) || 'M'}
              </div>
              <div className="space-y-0.5">
                <h2 className="text-xl font-bold text-slate-900">{profile.name}</h2>
                <p className="text-xs text-slate-500 font-mono">CRO: {profile.cro}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-lg font-semibold">
                Status: {profile.status === 'ativo' ? 'Ativo na Rede' : 'Inativo'}
              </span>
            </div>
          </div>

          {!isEditing ? (
            /* Modo de Visualização */
            <div className="space-y-6 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-3 text-xs">
                  <Mail className="w-4 h-4 text-emerald-700 shrink-0" />
                  <div>
                    <span className="text-slate-400 block text-[11px]">E-mail</span>
                    <strong className="text-slate-800">{profile.email}</strong>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-3 text-xs">
                  <Phone className="w-4 h-4 text-emerald-700 shrink-0" />
                  <div>
                    <span className="text-slate-400 block text-[11px]">Telefone</span>
                    <strong className="text-slate-800">{profile.phone}</strong>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-3 text-xs">
                  <MapPin className="w-4 h-4 text-emerald-700 shrink-0" />
                  <div>
                    <span className="text-slate-400 block text-[11px]">Área de Atuação</span>
                    <strong className="text-slate-800">{profile.location}</strong>
                  </div>
                </div>
              </div>

              {/* Especializações e Formação */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-gold-dark" />
                  Especializações & Frentes de Formação
                </h4>
                <div className="flex items-center gap-2 flex-wrap">
                  {profile.specialties.map((spec, i) => (
                    <Badge
                      key={i}
                      variant="outline"
                      className="bg-emerald-50 text-emerald-900 border-emerald-300 text-xs py-1 px-3"
                    >
                      <Sparkles className="w-3 h-3 mr-1 text-gold" />
                      {spec}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Biografia / Formação */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-slate-500" />
                  Biografia & Trajetória Clínica
                </h4>
                <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
                  {profile.bio}
                </p>
              </div>

              {/* Indicadores de Mentoria */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-4 rounded-xl border border-slate-200 bg-white">
                  <span className="text-xs text-slate-500 block">Total de Casos Mentorados</span>
                  <p className="text-2xl font-bold text-slate-900 mt-1">
                    {profile.totalCasesMentored}
                  </p>
                  <span className="text-[10px] text-slate-400">Desde o início da plataforma</span>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-white">
                  <span className="text-xs text-slate-500 block">Casos Ativos Atuais</span>
                  <p className="text-2xl font-bold text-emerald-800 mt-1">
                    {profile.activeCasesCount}
                  </p>
                  <span className="text-[10px] text-emerald-600 font-medium">
                    Capacidade: {profile.capacity} casos simultâneos
                  </span>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-white">
                  <span className="text-xs text-slate-500 block">Disponibilidade</span>
                  <p className="text-base font-bold text-emerald-700 mt-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Pronto p/ Novos Casos
                  </p>
                  <span className="text-[10px] text-slate-400">Conforme agenda de bloqueios</span>
                </div>
              </div>
            </div>
          ) : (
            /* Modo de Edição */
            <form onSubmit={handleSave} className="space-y-4 pt-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label htmlFor="prof-name" className="text-xs font-semibold">
                    Nome Completo
                  </Label>
                  <Input
                    id="prof-name"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    required
                    className="h-9 text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="prof-cro" className="text-xs font-semibold">
                    CRO / Inscrição Profissional
                  </Label>
                  <Input
                    id="prof-cro"
                    value={formCro}
                    onChange={(e) => setFormCro(e.target.value)}
                    required
                    className="h-9 text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="prof-email" className="text-xs font-semibold">
                    E-mail
                  </Label>
                  <Input
                    id="prof-email"
                    type="email"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    required
                    className="h-9 text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="prof-phone" className="text-xs font-semibold">
                    Telefone / WhatsApp
                  </Label>
                  <Input
                    id="prof-phone"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    required
                    className="h-9 text-xs"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <Label htmlFor="prof-loc" className="text-xs font-semibold">
                    Área de Atuação / Cidade
                  </Label>
                  <Input
                    id="prof-loc"
                    value={formLocation}
                    onChange={(e) => setFormLocation(e.target.value)}
                    required
                    className="h-9 text-xs"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <Label htmlFor="prof-specs" className="text-xs font-semibold">
                    Especializações (separadas por vírgula)
                  </Label>
                  <Input
                    id="prof-specs"
                    value={formSpecialties}
                    onChange={(e) => setFormSpecialties(e.target.value)}
                    required
                    className="h-9 text-xs"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <Label htmlFor="prof-bio" className="text-xs font-semibold">
                    Biografia / Formação Acadêmica
                  </Label>
                  <textarea
                    id="prof-bio"
                    rows={4}
                    value={formBio}
                    onChange={(e) => setFormBio(e.target.value)}
                    className="w-full rounded-md border border-input bg-background p-2.5 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(false)}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  className="bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Salvar Alterações
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
