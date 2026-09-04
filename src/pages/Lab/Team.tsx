import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Users,
  Search,
  UserCheck,
  ShieldCheck,
  Award,
  Sparkles,
  Layers,
  Mail,
  CheckCircle2,
} from 'lucide-react'
import { LabTeamMember, MOCK_LAB_TEAM } from './mockData'

export default function LabTeam() {
  const [team, setTeam] = useState<LabTeamMember[]>(MOCK_LAB_TEAM)
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState<string>('all')

  const filteredTeam = team.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.specialty.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesRole = roleFilter === 'all' || m.role === roleFilter
    return matchesSearch && matchesRole
  })

  const totalMembers = team.length
  const totalCasesActive = team.reduce((acc, curr) => acc + curr.casesAssignedCount, 0)
  const totalCompletedMonth = team.reduce((acc, curr) => acc + curr.completedThisMonth, 0)

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto animate-fade-in-up">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
            Equipe Técnica & Mentores MWS
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">
            Técnicos especialistas em robótica lingual e mentores responsáveis pelo planejamento
            clínico.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge className="bg-emerald-600 text-white text-xs px-3 py-1 font-semibold">
            {totalMembers} Integrantes Ativos
          </Badge>
        </div>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-slate-200">
          <CardContent className="p-5">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Membros do Time Lab
            </span>
            <p className="text-3xl font-extrabold text-slate-900 mt-2">{totalMembers}</p>
            <p className="text-xs text-slate-500 mt-1">
              3 Mentores sêniores + 4 Técnicos e Engenharia
            </p>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardContent className="p-5">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Casos Atribuídos no Momento
            </span>
            <p className="text-3xl font-extrabold text-slate-900 mt-2">{totalCasesActive}</p>
            <p className="text-xs text-emerald-700 mt-1 font-medium">
              Distribuição equilibrada por capacidade
            </p>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardContent className="p-5">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Planejamentos Concluídos no Mês
            </span>
            <p className="text-3xl font-extrabold text-slate-900 mt-2">{totalCompletedMonth}</p>
            <p className="text-xs text-emerald-700 mt-1 font-medium">
              Produtividade média de 22 casos/membro
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filtros e Busca */}
      <div className="bg-white p-3 rounded-xl border border-slate-200 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 shadow-xs">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Buscar por nome, email ou especialidade..."
            className="pl-9 h-9 text-xs"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap text-xs">
          {[
            'all',
            'Planejador & Mentor',
            'Técnico Especialista',
            'Especialista em Robótica',
            'Coordenador Técnico',
          ].map((role) => (
            <Button
              key={role}
              variant={roleFilter === role ? 'default' : 'outline'}
              size="sm"
              onClick={() => setRoleFilter(role)}
              className={
                roleFilter === role
                  ? 'bg-slate-900 text-white text-xs h-7'
                  : 'text-xs h-7 text-slate-600'
              }
            >
              {role === 'all' ? 'Todos os Cargos' : role}
            </Button>
          ))}
        </div>
      </div>

      {/* Grid de Membros da Equipe */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTeam.map((member) => {
          const occupancy = Math.round((member.casesAssignedCount / member.capacity) * 100)
          return (
            <Card
              key={member.id}
              className="border-slate-200 shadow-xs hover:border-slate-300 transition-all bg-white flex flex-col justify-between"
            >
              <CardContent className="p-5 space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-700 text-sm border border-slate-200">
                      {member.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-slate-900">{member.name}</h3>
                      <Badge
                        variant="outline"
                        className={
                          member.role === 'Planejador & Mentor'
                            ? 'text-[10px] bg-purple-50 text-purple-800 border-purple-200 mt-0.5'
                            : 'text-[10px] bg-slate-50 text-slate-700 border-slate-200 mt-0.5'
                        }
                      >
                        {member.role}
                      </Badge>
                    </div>
                  </div>

                  <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    NPS {member.npsScore}
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-slate-600">
                  <p className="line-clamp-2">
                    <strong>Especialidade:</strong> {member.specialty}
                  </p>
                  <p className="text-slate-500 flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-slate-400" /> {member.email}
                  </p>
                </div>

                {/* Barra de Carga de Trabalho */}
                <div className="space-y-1 pt-2 border-t border-slate-100 text-xs">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-500">Carga de Trabalho:</span>
                    <span className="font-bold text-slate-800">
                      {member.casesAssignedCount} de {member.capacity} casos ({occupancy}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${occupancy}%` }}
                      className={`h-full ${occupancy > 80 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                  <span>
                    Concluídos este mês: <strong>{member.completedThisMonth}</strong>
                  </span>
                  <Badge className="bg-emerald-100 text-emerald-800 text-[10px]">Ativo</Badge>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
