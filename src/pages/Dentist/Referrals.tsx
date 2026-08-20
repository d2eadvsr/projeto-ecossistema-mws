import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  UserCheck,
  Bell,
  Phone,
  Mail,
  Calendar,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowRight,
  Filter,
  Search,
  Share2,
  Sparkles,
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface ReferralLead {
  id: string
  patientName: string
  phone: string
  email: string
  source: 'Busca App MWS' | 'Campanha Digital' | 'Indicação de Colega' | 'Portal Paciente'
  referredBy?: string
  date: string
  chiefComplaint: string
  status: 'novo' | 'contatado' | 'agendado' | 'convertido' | 'arquivado'
}

const MOCK_REFERRALS: ReferralLead[] = [
  {
    id: 'REF-101',
    patientName: 'Gabriela Vasconcelos',
    phone: '(11) 99123-4567',
    email: 'gabriela.vasc@gmail.com',
    source: 'Busca App MWS',
    date: 'Hoje, às 10:15',
    chiefComplaint: 'Quer alinhar os dentes superiores antes do casamento em 8 meses.',
    status: 'novo',
  },
  {
    id: 'REF-102',
    patientName: 'Matheus Albuquerque',
    phone: '(11) 98234-5678',
    email: 'matheus.alb@outlook.com',
    source: 'Campanha Digital',
    date: 'Ontem',
    chiefComplaint: 'Deseja substituir aparelho metálico antigo por alinhadores invisíveis.',
    status: 'contatado',
  },
  {
    id: 'REF-103',
    patientName: 'Letícia Rossi',
    phone: '(11) 97345-6789',
    email: 'leticia.rossi@uol.com.br',
    source: 'Portal Paciente',
    referredBy: 'Maria Silva (sua paciente)',
    date: '22/02/2026',
    chiefComplaint: 'Indicação direta de amiga que está tratando na clínica.',
    status: 'agendado',
  },
  {
    id: 'REF-104',
    patientName: 'Lucas Ferreira',
    phone: '(11) 96456-7890',
    email: 'lucas.ferr@gmail.com',
    source: 'Busca App MWS',
    date: '18/02/2026',
    chiefComplaint: 'Avaliação para diastema e mordida cruzada posterior.',
    status: 'convertido',
  },
]

export default function DentistReferrals() {
  const [referrals, setReferrals] = useState<ReferralLead[]>(MOCK_REFERRALS)
  const [statusFilter, setStatusFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const { toast } = useToast()

  const handleUpdateStatus = (id: string, newStatus: ReferralLead['status']) => {
    setReferrals((prev) => prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r)))
    toast({
      title: 'Status do Lead Atualizado',
      description: `O paciente foi movido para "${newStatus}".`,
    })
  }

  const filteredReferrals = referrals.filter((r) => {
    const matchesSearch =
      r.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.chiefComplaint.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.phone.includes(searchTerm)
    const matchesStatus = statusFilter === 'all' || r.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const countNovos = referrals.filter((r) => r.status === 'novo').length
  const countAgendados = referrals.filter((r) => r.status === 'agendado').length
  const countConvertidos = referrals.filter((r) => r.status === 'convertido').length

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-6xl mx-auto animate-fade-in-up">
      {/* Topo */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
              Gestão de Indicações & Novos Leads
            </h1>
            {countNovos > 0 && (
              <Badge className="bg-emerald-600 text-white font-bold animate-pulse">
                {countNovos} Novos
              </Badge>
            )}
          </div>
          <p className="text-slate-500 mt-1">
            Pacientes direcionados para o seu consultório pela plataforma MWS e pelo aplicativo de
            busca.
          </p>
        </div>

        <Button
          variant="outline"
          className="border-slate-300"
          onClick={() =>
            toast({
              title: 'Link de Indicação da Clínica',
              description: 'Link exclusivo copiado! Envie para seus pacientes recomendarem você.',
            })
          }
        >
          <Share2 className="w-4 h-4 mr-2 text-emerald-600" /> Meu Link de Indicação
        </Button>
      </div>

      {/* Cards de Métricas de Conversão */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="border-amber-200 bg-amber-50/50 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-amber-900">
              Novos Leads Pendentes
            </CardTitle>
            <Bell className="h-5 w-5 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-amber-950">{countNovos}</div>
            <p className="text-xs text-amber-700 mt-1 font-medium">Aguardando primeiro contato</p>
          </CardContent>
        </Card>

        <Card className="border-blue-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-900">Consultas Agendadas</CardTitle>
            <Calendar className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">{countAgendados}</div>
            <p className="text-xs text-blue-700 mt-1 font-medium">Avaliações marcadas na agenda</p>
          </CardContent>
        </Card>

        <Card className="border-emerald-200 bg-emerald-50/50 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-emerald-900">
              Tratamentos Convertidos
            </CardTitle>
            <CheckCircle2 className="h-5 w-5 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-emerald-950">{countConvertidos}</div>
            <p className="text-xs text-emerald-700 mt-1 font-medium">Casos clínicos iniciados</p>
          </CardContent>
        </Card>
      </div>

      {/* Busca e Filtros */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Buscar por paciente, queixa ou telefone..."
            className="pl-9 text-xs"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          <Button
            variant={statusFilter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setStatusFilter('all')}
            className={statusFilter === 'all' ? 'bg-slate-800 text-xs' : 'text-xs'}
          >
            Todos ({referrals.length})
          </Button>
          <Button
            variant={statusFilter === 'novo' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setStatusFilter('novo')}
            className={
              statusFilter === 'novo' ? 'bg-amber-600 hover:bg-amber-700 text-xs' : 'text-xs'
            }
          >
            Novos ({countNovos})
          </Button>
          <Button
            variant={statusFilter === 'agendado' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setStatusFilter('agendado')}
            className={
              statusFilter === 'agendado' ? 'bg-blue-600 hover:bg-blue-700 text-xs' : 'text-xs'
            }
          >
            Agendados
          </Button>
          <Button
            variant={statusFilter === 'convertido' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setStatusFilter('convertido')}
            className={
              statusFilter === 'convertido'
                ? 'bg-emerald-600 hover:bg-emerald-700 text-xs'
                : 'text-xs'
            }
          >
            Convertidos
          </Button>
        </div>
      </div>

      {/* Lista de Indicações */}
      <div className="space-y-4">
        {filteredReferrals.map((lead) => (
          <Card
            key={lead.id}
            className="border-slate-200 hover:border-slate-300 transition-all shadow-sm"
          >
            <CardContent className="p-5 sm:p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <Avatar className="h-10 w-10 border border-slate-200 flex-shrink-0">
                    <AvatarFallback className="bg-emerald-100 text-emerald-800 font-bold text-xs">
                      {lead.patientName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-bold text-base text-slate-900">{lead.patientName}</h4>
                      <Badge
                        className={
                          lead.status === 'novo'
                            ? 'bg-amber-100 text-amber-800'
                            : lead.status === 'agendado'
                              ? 'bg-blue-100 text-blue-800'
                              : lead.status === 'convertido'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-slate-100 text-slate-700'
                        }
                      >
                        {lead.status === 'novo'
                          ? 'Novo Lead'
                          : lead.status === 'contatado'
                            ? 'Contatado'
                            : lead.status === 'agendado'
                              ? 'Consulta Agendada'
                              : lead.status === 'convertido'
                                ? 'Tratamento Iniciado'
                                : 'Arquivado'}
                      </Badge>
                      <span className="text-xs text-slate-400">{lead.date}</span>
                    </div>

                    <p className="text-xs text-slate-500 flex items-center gap-2 flex-wrap">
                      <span className="flex items-center gap-1">
                        <Phone className="w-3 h-3 text-slate-400" /> {lead.phone}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Mail className="w-3 h-3 text-slate-400" /> {lead.email}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Ações de Gestão do Lead */}
                <div className="flex items-center gap-2 self-start sm:self-center">
                  {lead.status === 'novo' && (
                    <Button
                      size="sm"
                      className="bg-emerald-600 hover:bg-emerald-700 text-xs"
                      onClick={() => handleUpdateStatus(lead.id, 'contatado')}
                    >
                      <Phone className="w-3.5 h-3.5 mr-1" /> Marcar como Contatado
                    </Button>
                  )}
                  {lead.status === 'contatado' && (
                    <Button
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700 text-xs"
                      onClick={() => handleUpdateStatus(lead.id, 'agendado')}
                    >
                      <Calendar className="w-3.5 h-3.5 mr-1" /> Agendar Consulta
                    </Button>
                  )}
                  {lead.status === 'agendado' && (
                    <Button
                      size="sm"
                      className="bg-emerald-700 hover:bg-emerald-800 text-xs"
                      onClick={() => handleUpdateStatus(lead.id, 'convertido')}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Marcar como Convertido
                    </Button>
                  )}
                </div>
              </div>

              {/* Box de Queixa Principal / Origem */}
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs space-y-1">
                <div className="flex items-center justify-between text-slate-500">
                  <span>
                    Origem da Indicação: <strong className="text-slate-800">{lead.source}</strong>
                  </span>
                  {lead.referredBy && (
                    <span className="text-emerald-700 font-semibold">
                      Indicado por: {lead.referredBy}
                    </span>
                  )}
                </div>
                <p className="text-slate-700 font-medium pt-1">
                  💬 <span className="font-semibold text-slate-900">Queixa:</span>{' '}
                  {lead.chiefComplaint}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredReferrals.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-300">
            <UserCheck className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <h4 className="text-base font-semibold text-slate-800">Nenhum lead encontrado</h4>
            <p className="text-sm text-slate-500 mt-1">
              Assim que novos pacientes buscarem seu perfil ou indicarem amigos, eles aparecerão
              aqui.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
