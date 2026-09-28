import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  Users,
  Search,
  Plus,
  Edit,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Sparkles,
  HelpCircle,
  Clock,
  Layers,
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import {
  MentorProfile,
  loadMentors,
  saveMentors,
  loadMentorSettings,
  saveMentorSettings,
  MentorSettings,
  loadUnavailablePeriods,
  MentorUnavailablePeriod,
} from '../Mentor/mockData'

export default function AdminMentors() {
  const [mentors, setMentors] = useState<MentorProfile[]>([])
  const [settings, setSettings] = useState<MentorSettings>({ allowDentistMentorChoice: true })
  const [unavailablePeriods, setUnavailablePeriods] = useState<MentorUnavailablePeriod[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'ativo' | 'inativo'>('all')

  // Modal de Criar / Editar Mentor
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingMentor, setEditingMentor] = useState<MentorProfile | null>(null)
  const [formName, setFormName] = useState('')
  const [formEmail, setFormEmail] = useState('')
  const [formPhone, setFormPhone] = useState('')
  const [formCro, setFormCro] = useState('')
  const [formLocation, setFormLocation] = useState('')
  const [formSpecialties, setFormSpecialties] = useState('')
  const [formBio, setFormBio] = useState('')
  const [formStatus, setFormStatus] = useState<'ativo' | 'inativo'>('ativo')

  const { toast } = useToast()

  useEffect(() => {
    setMentors(loadMentors())
    setSettings(loadMentorSettings())
    setUnavailablePeriods(loadUnavailablePeriods())
  }, [])

  const handleToggleChoice = (checked: boolean) => {
    const updated = { ...settings, allowDentistMentorChoice: checked }
    setSettings(updated)
    saveMentorSettings(updated)
    toast({
      title: checked ? 'Escolha de mentor ativada!' : 'Escolha de mentor desativada!',
      description: checked
        ? 'Ortodontistas poderão selecionar mentor disponível na abertura de casos clínicos.'
        : 'O sistema fará a atribuição automática dos casos clínicos para equilibrar a esteira.',
    })
  }

  const handleOpenCreate = () => {
    setEditingMentor(null)
    setFormName('')
    setFormEmail('')
    setFormPhone('')
    setFormCro('')
    setFormLocation('São Paulo - SP')
    setFormSpecialties('Ortodontia Lingual Customizada, Biomecânica MWS')
    setFormBio('')
    setFormStatus('ativo')
    setIsModalOpen(true)
  }

  const handleOpenEdit = (m: MentorProfile) => {
    setEditingMentor(m)
    setFormName(m.name)
    setFormEmail(m.email)
    setFormPhone(m.phone)
    setFormCro(m.cro)
    setFormLocation(m.location)
    setFormSpecialties(m.specialties.join(', '))
    setFormBio(m.bio)
    setFormStatus(m.status)
    setIsModalOpen(true)
  }

  const handleSaveMentor = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formName.trim() || !formEmail.trim()) return

    const specs = formSpecialties
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)

    if (editingMentor) {
      // Editar
      const updatedList = mentors.map((m) =>
        m.id === editingMentor.id
          ? {
              ...m,
              name: formName,
              email: formEmail,
              phone: formPhone,
              cro: formCro,
              location: formLocation,
              specialties: specs,
              bio: formBio,
              status: formStatus,
            }
          : m,
      )
      setMentors(updatedList)
      saveMentors(updatedList)
      toast({
        title: 'Mentor atualizado!',
        description: `Os dados do ${formName} foram salvos com sucesso.`,
      })
    } else {
      // Criar novo
      const newMentor: MentorProfile = {
        id: `men-${Date.now()}`,
        name: formName,
        email: formEmail,
        phone: formPhone,
        cro: formCro || 'MWS-CD-000',
        location: formLocation || 'Brasil',
        specialties: specs.length > 0 ? specs : ['Ortodontia Lingual Customizada'],
        bio: formBio,
        status: formStatus,
        totalCasesMentored: 0,
        activeCasesCount: 0,
        capacity: 15,
      }
      const updatedList = [...mentors, newMentor]
      setMentors(updatedList)
      saveMentors(updatedList)
      toast({
        title: 'Novo mentor cadastrado!',
        description: `${formName} agora integra o corpo docente de mentores MWS.`,
      })
    }

    setIsModalOpen(false)
  }

  const handleToggleStatus = (m: MentorProfile) => {
    const newStatus = m.status === 'ativo' ? 'inativo' : 'ativo'
    const updatedList = mentors.map((item) =>
      item.id === m.id ? { ...item, status: newStatus as 'ativo' | 'inativo' } : item,
    )
    setMentors(updatedList)
    saveMentors(updatedList)
    toast({
      title: `Status alterado: ${newStatus.toUpperCase()}`,
      description: `${m.name} agora está marcado como ${newStatus}.`,
    })
  }

  const filteredMentors = mentors.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.cro.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.specialties.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesStatus = statusFilter === 'all' || m.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalAtivos = mentors.filter((m) => m.status === 'ativo').length
  const totalCasosMentoria = mentors.reduce((acc, m) => acc + m.totalCasesMentored, 0)
  const totalCasosAtivos = mentors.reduce((acc, m) => acc + m.activeCasesCount, 0)

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto animate-fade-in-up">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
              Corpo Docente & Mentores MWS • Gestão ADM
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 mt-1">
            Cadastro e Manutenção de Mentores
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">
            Gerencie os ortodontistas seniores responsáveis pela análise clínica, elaboração de
            planejamentos de casos e direcionamento da esteira.
          </p>
        </div>

        <Button
          onClick={handleOpenCreate}
          className="bg-primary hover:bg-[#082019] text-white border border-gold/30 shadow-md text-xs font-semibold"
        >
          <Plus className="w-4 h-4 mr-1.5 text-gold" /> Cadastrar Novo Mentor
        </Button>
      </div>

      {/* Box de Configuração: Toggle "Permitir escolha de mentor pelo ortodontista" */}
      <Card className="border-gold/40 bg-gradient-to-r from-amber-50/70 via-white to-emerald-50/40 shadow-sm">
        <CardContent className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <h3 className="text-sm font-bold text-slate-900">
                Regra de Distribuição de Casos Clínicos
              </h3>
              <Badge
                variant="outline"
                className={
                  settings.allowDentistMentorChoice
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-300 text-[10px]'
                    : 'bg-slate-100 text-slate-700 border-slate-300 text-[10px]'
                }
              >
                {settings.allowDentistMentorChoice ? 'Escolha Habilitada' : 'Atribuição Automática'}
              </Badge>
            </div>
            <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
              <strong>Permitir escolha de mentor pelo ortodontista:</strong> quando ativado, os
              ortodontistas poderão sinalizar sua preferência de mentor ao abrir um caso clínico
              (filtrando apenas mentores disponíveis na data). Ao desativar, a seleção manual fica
              oculta e a esteira distribui a demanda automaticamente entre os mentores disponíveis.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-xl border border-slate-200/80 shadow-xs self-stretch sm:self-auto justify-between sm:justify-end">
            <Label
              htmlFor="toggle-mentor-choice"
              className="text-xs font-semibold text-slate-700 cursor-pointer"
            >
              Escolha pelo Ortodontista
            </Label>
            <Switch
              id="toggle-mentor-choice"
              checked={settings.allowDentistMentorChoice}
              onCheckedChange={handleToggleChoice}
              className="data-[state=checked]:bg-emerald-600"
            />
          </div>
        </CardContent>
      </Card>

      {/* Caixas de Métricas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-slate-200 shadow-xs">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-600">Total de Mentores</span>
              <Users className="w-4 h-4 text-slate-500" />
            </div>
            <p className="text-2xl font-bold text-slate-900 mt-2">{mentors.length}</p>
            <p className="text-[11px] text-slate-500 mt-1">{totalAtivos} ativos na plataforma</p>
          </CardContent>
        </Card>

        <Card className="border-emerald-200 bg-emerald-50/40 shadow-xs">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-emerald-800">Casos Ativos em Mentoria</span>
              <Layers className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-2xl font-bold text-emerald-950 mt-2">{totalCasosAtivos}</p>
            <p className="text-[11px] text-emerald-700 mt-1">Em análise ou planejamento</p>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50/40 shadow-xs">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-blue-800">Total Histórico Concluído</span>
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-blue-950 mt-2">{totalCasosMentoria}</p>
            <p className="text-[11px] text-blue-700 mt-1">Planejamentos lingual entregues</p>
          </CardContent>
        </Card>

        <Card className="border-amber-200 bg-amber-50/40 shadow-xs">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-amber-800">Períodos de Bloqueio</span>
              <Calendar className="w-4 h-4 text-amber-600" />
            </div>
            <p className="text-2xl font-bold text-amber-950 mt-2">{unavailablePeriods.length}</p>
            <p className="text-[11px] text-amber-700 mt-1">Intervalos de indisponibilidade</p>
          </CardContent>
        </Card>
      </div>

      {/* Barra de Filtros e Busca */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Buscar mentor por nome, CRO, e-mail ou especialidade..."
            className="pl-9 text-xs"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={statusFilter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setStatusFilter('all')}
            className={statusFilter === 'all' ? 'bg-slate-900 text-xs' : 'text-xs'}
          >
            Todos ({mentors.length})
          </Button>
          <Button
            variant={statusFilter === 'ativo' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setStatusFilter('ativo')}
            className="text-xs"
          >
            Ativos ({mentors.filter((m) => m.status === 'ativo').length})
          </Button>
          <Button
            variant={statusFilter === 'inativo' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setStatusFilter('inativo')}
            className="text-xs"
          >
            Inativos ({mentors.filter((m) => m.status === 'inativo').length})
          </Button>
        </div>
      </div>

      {/* Tabela de Mentores */}
      <Card className="border-slate-200 shadow-sm overflow-hidden">
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-left text-sm min-w-[850px]">
            <thead className="bg-slate-50 border-b border-slate-100 text-xs font-semibold text-slate-600">
              <tr>
                <th className="p-3.5 pl-6">Mentor / Especialidades</th>
                <th className="p-3.5">Contato / CRO</th>
                <th className="p-3.5">Cidade</th>
                <th className="p-3.5">Carga Ativa</th>
                <th className="p-3.5">Histórico</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 pr-6 text-right">Ações ADM</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredMentors.map((m) => {
                const periodsCount = unavailablePeriods.filter((p) => p.mentorId === m.id).length
                return (
                  <tr key={m.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="p-3.5 pl-6">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#124d3d] to-[#082019] text-gold font-bold flex items-center justify-center text-xs shadow-xs border border-gold/30">
                          {m.name.charAt(3) || 'M'}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 text-sm">{m.name}</p>
                          <div className="flex items-center gap-1.5 flex-wrap mt-0.5">
                            {m.specialties.slice(0, 2).map((spec, i) => (
                              <span
                                key={i}
                                className="text-[10px] text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded"
                              >
                                {spec}
                              </span>
                            ))}
                            {m.specialties.length > 2 && (
                              <span className="text-[10px] text-slate-400">
                                +{m.specialties.length - 2}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3.5">
                      <p className="text-xs font-mono text-slate-700">{m.cro}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{m.email}</p>
                    </td>
                    <td className="p-3.5 text-xs text-slate-700">{m.location}</td>
                    <td className="p-3.5">
                      <div className="space-y-1">
                        <span className="text-xs font-semibold text-slate-800">
                          {m.activeCasesCount} / {m.capacity} casos
                        </span>
                        <div className="w-24 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                          <div
                            style={{
                              width: `${Math.min(100, (m.activeCasesCount / m.capacity) * 100)}%`,
                            }}
                            className="bg-emerald-500 h-full"
                          />
                        </div>
                      </div>
                    </td>
                    <td className="p-3.5">
                      <span className="text-xs font-bold text-slate-800">
                        {m.totalCasesMentored}
                      </span>
                      <span className="text-[11px] text-slate-500 block">planejamentos</span>
                    </td>
                    <td className="p-3.5">
                      {m.status === 'ativo' ? (
                        <div className="space-y-1">
                          <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 text-xs">
                            Ativo
                          </Badge>
                          {periodsCount > 0 && (
                            <span className="text-[10px] text-amber-700 block flex items-center gap-1">
                              <Calendar className="w-2.5 h-2.5" /> {periodsCount} bloqueio(s)
                            </span>
                          )}
                        </div>
                      ) : (
                        <Badge
                          variant="outline"
                          className="bg-slate-100 text-slate-600 border-slate-300 text-xs"
                        >
                          Inativo
                        </Badge>
                      )}
                    </td>
                    <td className="p-3.5 pr-6 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-xs h-8"
                          onClick={() => handleOpenEdit(m)}
                        >
                          <Edit className="w-3.5 h-3.5 mr-1 text-slate-500" /> Editar
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className={`text-xs h-8 ${
                            m.status === 'ativo'
                              ? 'text-amber-700 hover:bg-amber-50'
                              : 'text-emerald-700 hover:bg-emerald-50'
                          }`}
                          onClick={() => handleToggleStatus(m)}
                        >
                          {m.status === 'ativo' ? 'Pausar' : 'Ativar'}
                        </Button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Modal: Formulário de Criar/Editar Mentor */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>
              {editingMentor ? `Editar Mentor: ${editingMentor.name}` : 'Cadastrar Novo Mentor MWS'}
            </DialogTitle>
            <DialogDescription>
              Dados cadastrais do ortodontista mentor no ecossistema Magic Wire System.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSaveMentor} className="space-y-4 pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="m-name" className="text-xs font-semibold">
                  Nome Completo (com titulação)
                </Label>
                <Input
                  id="m-name"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="Ex: Dr. Breno"
                  required
                  className="text-xs h-9"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="m-email" className="text-xs font-semibold">
                  E-mail de Acesso ao Portal
                </Label>
                <Input
                  id="m-email"
                  type="email"
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  placeholder="mentor@magicwire.com"
                  required
                  className="text-xs h-9"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="m-cro" className="text-xs font-semibold">
                  CRO / Registro
                </Label>
                <Input
                  id="m-cro"
                  value={formCro}
                  onChange={(e) => setFormCro(e.target.value)}
                  placeholder="Ex: SP-CD-89231"
                  className="text-xs h-9"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="m-phone" className="text-xs font-semibold">
                  Telefone / WhatsApp
                </Label>
                <Input
                  id="m-phone"
                  value={formPhone}
                  onChange={(e) => setFormPhone(e.target.value)}
                  placeholder="(11) 98877-6655"
                  className="text-xs h-9"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="m-loc" className="text-xs font-semibold">
                  Cidade / UF
                </Label>
                <Input
                  id="m-loc"
                  value={formLocation}
                  onChange={(e) => setFormLocation(e.target.value)}
                  placeholder="São Paulo - SP"
                  className="text-xs h-9"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="m-status" className="text-xs font-semibold">
                  Status
                </Label>
                <select
                  id="m-status"
                  value={formStatus}
                  onChange={(e) => setFormStatus(e.target.value as 'ativo' | 'inativo')}
                  className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                >
                  <option value="ativo">Ativo (recebe casos)</option>
                  <option value="inativo">Inativo (pausado)</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="m-specs" className="text-xs font-semibold">
                Especialidades (separadas por vírgula)
              </Label>
              <Input
                id="m-specs"
                value={formSpecialties}
                onChange={(e) => setFormSpecialties(e.target.value)}
                placeholder="Ex: Ortodontia Lingual Customizada, Biomecânica MWS, Casos de Classe II"
                className="text-xs h-9"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="m-bio" className="text-xs font-semibold">
                Minicurrículo / Biografia
              </Label>
              <textarea
                id="m-bio"
                rows={3}
                value={formBio}
                onChange={(e) => setFormBio(e.target.value)}
                placeholder="Resumo da trajetória e formação do mentor..."
                className="w-full rounded-md border border-input bg-background p-2 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              />
            </div>

            <DialogFooter className="gap-2 sm:gap-0 pt-2">
              <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                Cancelar
              </Button>
              <Button
                type="submit"
                className="bg-primary hover:bg-[#082019] text-white border border-gold/30 text-xs font-semibold"
              >
                <CheckCircle2 className="w-4 h-4 mr-1 text-gold" />
                Salvar Mentor
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
