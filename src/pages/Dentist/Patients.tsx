import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Users,
  Activity,
  CheckCircle2,
  FileText,
  Search,
  ArrowRight,
  ChevronRight,
  Sparkles,
  Phone,
  Calendar,
  Layers,
  Wrench,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  MOCK_DENTIST_PATIENTS,
  STATUS_CONFIG,
  getDentistCounts,
  DentistPatient,
} from './mockPatients'

export default function DentistPatients() {
  const [searchTerm, setSearchTerm] = useState('')
  const counts = getDentistCounts()

  const filteredPatients = MOCK_DENTIST_PATIENTS.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.protocol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.statusLabel.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-6xl mx-auto animate-fade-in-up">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Pacientes</h1>
            <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">
              Ortodontia Lingual
            </Badge>
          </div>
          <p className="text-slate-500 mt-1">
            Gestão dos pacientes e acompanhamento de casos clínicos com a tecnologia Magic Wire.
          </p>
        </div>
      </div>

      {/* Card Destaque: Total de Pacientes */}
      <Card className="border-emerald-200 bg-gradient-to-r from-emerald-50 via-teal-50 to-white shadow-sm">
        <CardContent className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-600 flex items-center justify-center flex-shrink-0 shadow-sm text-white">
              <Users className="w-7 h-7" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
                Total de Pacientes
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl md:text-4xl font-extrabold text-slate-900">
                  {counts.total}
                </span>
                <span className="text-xs font-medium text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full">
                  100% ativos na base
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                Pacientes atendidos desde o licenciamento do ortodontista no Ecossistema Magic Wire
                System.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 4 Cards de Status Clicáveis: Em Planejamento · Planejados · Em Tratamento · Concluídos */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-600" />
            Distribuição por Status do Caso
          </h2>
          <span className="text-xs text-slate-500">
            Clique no card para filtrar pacientes pelo estado
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Card 1: Em Planejamento */}
          <Link
            to="/dentist/patients/status/em-planejamento"
            className="group block transition-transform duration-150 hover:-translate-y-0.5"
          >
            <Card
              className={`h-full border-amber-200 transition-all ${STATUS_CONFIG['em-planejamento'].borderHoverColor} group-hover:shadow-md cursor-pointer`}
            >
              <CardContent className="p-5 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-700">
                      <FileText className="w-4 h-4 text-amber-600" />
                      Em Planejamento
                    </span>
                    <Badge
                      variant="outline"
                      className="border-amber-300 bg-amber-50 text-amber-800 text-xs font-bold"
                    >
                      {counts.emPlanejamento}
                    </Badge>
                  </div>
                  <div className="text-3xl font-extrabold text-slate-900 mb-1">
                    {counts.emPlanejamento}
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Casos enviados ao laboratório, aguardando devolução do planejamento 3D.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-amber-700 group-hover:text-amber-800">
                  <span>Ver {counts.emPlanejamento} casos</span>
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Card 2: Planejados */}
          <Link
            to="/dentist/patients/status/planejados"
            className="group block transition-transform duration-150 hover:-translate-y-0.5"
          >
            <Card
              className={`h-full border-blue-200 transition-all ${STATUS_CONFIG['planejados'].borderHoverColor} group-hover:shadow-md cursor-pointer`}
            >
              <CardContent className="p-5 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-700">
                      <CheckCircle2 className="w-4 h-4 text-blue-600" />
                      Planejados
                    </span>
                    <Badge
                      variant="outline"
                      className="border-blue-300 bg-blue-50 text-blue-800 text-xs font-bold"
                    >
                      {counts.planejados}
                    </Badge>
                  </div>
                  <div className="text-3xl font-extrabold text-slate-900 mb-1">
                    {counts.planejados}
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Planejamento aprovado pelo ortodontista, aguardando início/instalação.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-700 group-hover:text-blue-800">
                  <span>Ver {counts.planejados} casos</span>
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Card 3: Em Tratamento */}
          <Link
            to="/dentist/patients/status/em-tratamento"
            className="group block transition-transform duration-150 hover:-translate-y-0.5"
          >
            <Card
              className={`h-full border-purple-200 transition-all ${STATUS_CONFIG['em-tratamento'].borderHoverColor} group-hover:shadow-md cursor-pointer`}
            >
              <CardContent className="p-5 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-purple-700">
                      <Activity className="w-4 h-4 text-purple-600" />
                      Em Tratamento
                    </span>
                    <Badge
                      variant="outline"
                      className="border-purple-300 bg-purple-50 text-purple-800 text-xs font-bold"
                    >
                      {counts.emTratamento}
                    </Badge>
                  </div>
                  <div className="text-3xl font-extrabold text-slate-900 mb-1">
                    {counts.emTratamento}
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Aparelho lingual instalado, pacientes em ciclo ativo de manutenções.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-purple-700 group-hover:text-purple-800">
                  <span>Ver {counts.emTratamento} pacientes</span>
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Card 4: Concluídos */}
          <Link
            to="/dentist/patients/status/concluidos"
            className="group block transition-transform duration-150 hover:-translate-y-0.5"
          >
            <Card
              className={`h-full border-emerald-200 transition-all ${STATUS_CONFIG['concluidos'].borderHoverColor} group-hover:shadow-md cursor-pointer`}
            >
              <CardContent className="p-5 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Concluídos
                    </span>
                    <Badge
                      variant="outline"
                      className="border-emerald-300 bg-emerald-50 text-emerald-800 text-xs font-bold"
                    >
                      {counts.concluidos}
                    </Badge>
                  </div>
                  <div className="text-3xl font-extrabold text-slate-900 mb-1">
                    {counts.concluidos}
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Tratamento ortodôntico finalizado com alta clínica e contenção instalada.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-700 group-hover:text-emerald-800">
                  <span>Ver {counts.concluidos} concluído</span>
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>

      {/* Tabela / Lista Geral com todos os 10 pacientes */}
      <Card className="border-slate-200 shadow-sm">
        <div className="p-4 md:p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-emerald-600" />
              Todos os Pacientes ({MOCK_DENTIST_PATIENTS.length})
            </h2>
            <p className="text-xs text-slate-500">
              Relação completa de pacientes atendidos pelo ortodontista no ecossistema
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Buscar por paciente ou protocolo..."
              className="pl-9 text-xs h-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <CardContent className="p-0 divide-y divide-slate-100">
          {filteredPatients.length === 0 ? (
            <div className="p-8 text-center text-sm text-slate-500">
              Nenhum paciente encontrado para a busca informada.
            </div>
          ) : (
            filteredPatients.map((patient: DentistPatient) => {
              const statusCfg = STATUS_CONFIG[patient.status]

              return (
                <div
                  key={patient.id}
                  className="p-4 md:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors"
                >
                  <div className="flex items-start sm:items-center gap-3">
                    <Avatar className="h-11 w-11 border border-slate-200 flex-shrink-0">
                      <AvatarFallback className="bg-emerald-100 text-emerald-800 font-bold text-sm">
                        {patient.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <Link
                          to={`/dentist/patients/${patient.id}`}
                          className="font-bold text-slate-900 hover:text-emerald-700 text-sm md:text-base transition-colors"
                        >
                          {patient.name}
                        </Link>
                        <Badge
                          variant="outline"
                          className={`text-[11px] font-semibold ${statusCfg.badgeColor}`}
                        >
                          {statusCfg.label}
                        </Badge>
                        {patient.currentMaintenanceLabel && (
                          <Badge className="bg-slate-900 text-white hover:bg-slate-800 text-[11px] font-semibold flex items-center gap-1">
                            <Wrench className="w-3 h-3 text-emerald-400" />
                            {patient.currentMaintenanceLabel}
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {patient.protocol} • {patient.age} anos
                      </p>
                      <div className="flex items-center gap-4 text-[11px] text-slate-400 mt-1 flex-wrap">
                        <span className="flex items-center gap-1">
                          <Phone className="w-3 h-3" /> {patient.phone}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> Início: {patient.startDate}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end md:self-center">
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="border-slate-200 hover:border-emerald-400 hover:text-emerald-700 text-xs font-semibold"
                    >
                      <Link to={`/dentist/patients/${patient.id}`}>
                        Abrir Pasta
                        <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                      </Link>
                    </Button>
                  </div>
                </div>
              )
            })
          )}
        </CardContent>
      </Card>
    </div>
  )
}
