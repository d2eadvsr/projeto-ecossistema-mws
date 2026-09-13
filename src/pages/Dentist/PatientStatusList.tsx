import { useState } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import {
  ArrowLeft,
  ChevronRight,
  Search,
  Activity,
  CheckCircle2,
  FileText,
  Clock,
  Phone,
  Mail,
  Calendar,
  Wrench,
  ArrowRight,
  Users,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  PatientStatus,
  STATUS_CONFIG,
  getDentistPatientsByStatus,
  DentistPatient,
} from './mockPatients'

function getStatusIcon(status: PatientStatus) {
  switch (status) {
    case 'em-planejamento':
      return <FileText className="w-5 h-5 text-amber-600" />
    case 'planejados':
      return <CheckCircle2 className="w-5 h-5 text-blue-600" />
    case 'em-tratamento':
      return <Activity className="w-5 h-5 text-purple-600" />
    case 'concluidos':
      return <CheckCircle2 className="w-5 h-5 text-emerald-600" />
  }
}

export default function DentistPatientsByStatus() {
  const { status } = useParams<{ status: string }>()
  const [searchTerm, setSearchTerm] = useState('')

  const validStatuses: PatientStatus[] = [
    'em-planejamento',
    'planejados',
    'em-tratamento',
    'concluidos',
  ]

  if (!status || !validStatuses.includes(status as PatientStatus)) {
    return <Navigate to="/dentist/patients" replace />
  }

  const currentStatus = status as PatientStatus
  const config = STATUS_CONFIG[currentStatus]
  const allPatientsInStatus = getDentistPatientsByStatus(currentStatus)

  const filteredPatients = allPatientsInStatus.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.protocol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.currentMaintenanceLabel &&
        p.currentMaintenanceLabel.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-6xl mx-auto animate-fade-in-up">
      {/* Breadcrumb e Botão Voltar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Link
            to="/dentist/patients"
            className="hover:text-emerald-700 transition-colors font-medium flex items-center gap-1"
          >
            <Users className="w-3.5 h-3.5" />
            Pacientes
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-semibold text-slate-800">Status</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Badge variant="outline" className={`text-xs ${config.badgeColor}`}>
            {config.label}
          </Badge>
        </div>

        <Button
          asChild
          variant="outline"
          size="sm"
          className="self-start sm:self-auto border-slate-200 hover:bg-slate-100 text-xs font-semibold"
        >
          <Link to="/dentist/patients">
            <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
            Voltar para Todos os Pacientes
          </Link>
        </Button>
      </div>

      {/* Hero do Status Atual */}
      <Card className="border-slate-200 shadow-sm bg-gradient-to-r from-slate-50 to-white">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm ${config.iconBgColor}`}
              >
                {getStatusIcon(currentStatus)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">
                    Pacientes {config.label}
                  </h1>
                  <Badge variant="outline" className={`text-xs font-bold ${config.badgeColor}`}>
                    {allPatientsInStatus.length}{' '}
                    {allPatientsInStatus.length === 1 ? 'paciente' : 'pacientes'}
                  </Badge>
                </div>
                <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed">
                  {config.description}
                </p>
              </div>
            </div>

            {/* Abas rápidas para outros status */}
            <div className="flex flex-wrap gap-1.5 sm:self-center">
              {validStatuses.map((stKey) => {
                const stCfg = STATUS_CONFIG[stKey]
                const isActive = stKey === currentStatus
                return (
                  <Link
                    key={stKey}
                    to={`/dentist/patients/status/${stKey}`}
                    className={`text-xs px-2.5 py-1.5 rounded-md font-medium transition-colors ${
                      isActive
                        ? 'bg-slate-900 text-white font-semibold'
                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {stCfg.label}
                  </Link>
                )
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Pacientes do Status */}
      <Card className="border-slate-200 shadow-sm">
        <div className="p-4 md:p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Listagem de Casos no Estado: {config.label} ({filteredPatients.length})
            </h2>
            <p className="text-xs text-slate-500">
              Selecione o paciente para abrir a pasta individual e ver manutenções
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Filtrar por nome ou detalhes..."
              className="pl-9 text-xs h-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <CardContent className="p-0 divide-y divide-slate-100">
          {filteredPatients.length === 0 ? (
            <div className="p-10 text-center text-sm text-slate-500">
              Nenhum paciente encontrado com os filtros informados.
            </div>
          ) : (
            filteredPatients.map((patient: DentistPatient) => (
              <div
                key={patient.id}
                className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors"
              >
                <div className="flex items-start sm:items-center gap-3">
                  <Avatar className="h-12 w-12 border border-slate-200 flex-shrink-0">
                    <AvatarFallback className="bg-emerald-100 text-emerald-800 font-bold text-sm">
                      {patient.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Link
                        to={`/dentist/patients/${patient.id}`}
                        className="font-bold text-slate-900 hover:text-emerald-700 text-base transition-colors"
                      >
                        {patient.name}
                      </Link>
                      <Badge variant="outline" className={`text-xs ${config.badgeColor}`}>
                        {config.label}
                      </Badge>
                      {patient.currentMaintenanceLabel && (
                        <Badge className="bg-slate-900 text-white hover:bg-slate-800 text-xs flex items-center gap-1 font-semibold">
                          <Wrench className="w-3 h-3 text-emerald-400" />
                          {patient.currentMaintenanceLabel}
                        </Badge>
                      )}
                    </div>

                    <p className="text-xs text-slate-500">
                      {patient.protocol} • {patient.age} anos
                    </p>

                    {patient.notes && (
                      <p className="text-xs text-slate-600 bg-slate-100/70 p-2 rounded border border-slate-200/60 max-w-xl">
                        {patient.notes}
                      </p>
                    )}

                    <div className="flex items-center gap-4 text-[11px] text-slate-400 pt-0.5 flex-wrap">
                      <span className="flex items-center gap-1">
                        <Phone className="w-3 h-3" /> {patient.phone}
                      </span>
                      <span className="flex items-center gap-1">
                        <Mail className="w-3 h-3" /> {patient.email}
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
                    className="border-slate-200 hover:border-emerald-500 hover:text-emerald-700 text-xs font-semibold"
                  >
                    <Link to={`/dentist/patients/${patient.id}`}>
                      Abrir Pasta Individual
                      <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  )
}
