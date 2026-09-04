import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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
  UserCheck,
  Calendar,
  Compass,
  ArrowRight,
  CheckCircle2,
  Lock,
  Unlock,
  DollarSign,
  MapPin,
  TrendingUp,
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import {
  AdminLead,
  MOCK_ADMIN_LEADS,
  GeographicMobilityRequest,
  MOCK_MOBILITY_REQUESTS,
  MOCK_ADMIN_DENTISTS,
} from './mockData'

export default function AdminPatientsLeads() {
  const [leads, setLeads] = useState<AdminLead[]>(MOCK_ADMIN_LEADS)
  const [mobilityRequests, setMobilityRequests] =
    useState<GeographicMobilityRequest[]>(MOCK_MOBILITY_REQUESTS)
  const [activeTab, setActiveTab] = useState<'leads' | 'mobilidade'>('leads')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLead, setSelectedLead] = useState<AdminLead | null>(null)
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false)
  const [selectedDentistId, setSelectedDentistId] = useState(MOCK_ADMIN_DENTISTS[0].id)
  const [selectedMobility, setSelectedMobility] = useState<GeographicMobilityRequest | null>(null)
  const [isMobilityActionModalOpen, setIsMobilityActionModalOpen] = useState(false)
  const { toast } = useToast()

  // Números consistentes de Leads: total 450
  // 180 qualificados + 140 consultas agendadas + 100 convertidos em caso + 30 perdidos = 450
  const totalLeads = 450
  const leadsQualificados = 180
  const consultasAgendadas = 140
  const convertidosCasos = 100

  // Atribuir lead a ortodontista credenciado da região
  const handleAssignLead = (leadId: string) => {
    const dentist = MOCK_ADMIN_DENTISTS.find((d) => d.id === selectedDentistId)
    if (!dentist) return

    setLeads((prev) =>
      prev.map((l) =>
        l.id === leadId
          ? {
              ...l,
              status: 'agendado',
              assignedDentistId: dentist.id,
              assignedDentistName: dentist.name,
            }
          : l,
      ),
    )

    toast({
      title: 'Lead Atribuído com Sucesso!',
      description: `Paciente encaminhado para a agenda do(a) ${dentist.name} (${dentist.city}).`,
    })
    setIsAssignModalOpen(false)
  }

  // Executar passos da mobilidade geográfica
  const handleAdvanceMobility = (
    reqId: string,
    action: 'agendar' | 'liberar_acesso' | 'concluir_split',
  ) => {
    setMobilityRequests((prev) =>
      prev.map((m) => {
        if (m.id !== reqId) return m
        if (action === 'agendar') {
          return {
            ...m,
            status: 'consulta_agendada',
            consultationDate: '05/03/2026 às 14:00',
            assignedDentistId: 'DENT-002',
            assignedDentistName: 'Dr. Roberto Takahashi',
          }
        }
        if (action === 'liberar_acesso') {
          return {
            ...m,
            status: 'acesso_liberado',
          }
        }
        if (action === 'concluir_split') {
          return {
            ...m,
            status: 'concluido',
            creditGeneratedToTarget: 250,
            debitGeneratedToOrigin: 250,
            accessRevoked: true,
            proceduresDone:
              'Manutenção do Fio Mágico realizada e registrada no prontuário digital.',
          }
        }
        return m
      }),
    )

    if (action === 'agendar') {
      toast({
        title: 'Agendamento Realizado na Outra Localidade!',
        description: 'Consulta marcada com Dr. Roberto Takahashi (São Paulo).',
      })
    } else if (action === 'liberar_acesso') {
      toast({
        title: 'Acesso Temporário Liberado ao Prontuário!',
        description:
          'Ortodontista de destino agora visualiza histórico e diagrama lingual do paciente.',
      })
    } else if (action === 'concluir_split') {
      toast({
        title: 'Atendimento Concluído com Sucesso!',
        description:
          'Crédito de R$ 250 gerado p/ quem atendeu, débito de R$ 250 p/ ortodontista de origem e acesso revogado.',
      })
    }
    setIsMobilityActionModalOpen(false)
  }

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto animate-fade-in-up">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
            Pacientes, Leads & Mobilidade Geográfica
          </h1>
          <p className="text-slate-500 mt-1">
            Distribuição de leads via Ecossistema, agendamentos e gestão de pacientes em viagem /
            transferências de localidade.
          </p>
        </div>

        {/* Alternador de Abas */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200">
          <Button
            variant={activeTab === 'leads' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('leads')}
            className={
              activeTab === 'leads' ? 'bg-slate-900 text-xs shadow-sm' : 'text-xs text-slate-600'
            }
          >
            <Users className="w-3.5 h-3.5 mr-1.5" /> Leads & Pacientes ({totalLeads})
          </Button>
          <Button
            variant={activeTab === 'mobilidade' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('mobilidade')}
            className={
              activeTab === 'mobilidade'
                ? 'bg-slate-900 text-xs shadow-sm'
                : 'text-xs text-slate-600'
            }
          >
            <Compass className="w-3.5 h-3.5 mr-1.5" /> Mobilidade Geográfica (
            {mobilityRequests.length})
          </Button>
        </div>
      </div>

      {activeTab === 'leads' && (
        <div className="space-y-6">
          {/* Métricas do Funil de Leads da Plataforma */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border-slate-200">
              <CardContent className="p-4">
                <span className="text-xs font-medium text-slate-500">Total de Leads Gerados</span>
                <p className="text-2xl font-bold text-slate-900 mt-2">{totalLeads}</p>
                <p className="text-[11px] text-slate-400 mt-1">Campanhas Instagram ADS & Portal</p>
              </CardContent>
            </Card>

            <Card className="border-blue-200 bg-blue-50/40">
              <CardContent className="p-4">
                <span className="text-xs font-medium text-blue-800">Leads Qualificados</span>
                <p className="text-2xl font-bold text-blue-900 mt-2">{leadsQualificados}</p>
                <p className="text-[11px] text-blue-700 mt-1">40% taxa de qualificação</p>
              </CardContent>
            </Card>

            <Card className="border-amber-200 bg-amber-50/40">
              <CardContent className="p-4">
                <span className="text-xs font-medium text-amber-800">1ª Consulta Agendada</span>
                <p className="text-2xl font-bold text-amber-900 mt-2">{consultasAgendadas}</p>
                <p className="text-[11px] text-amber-700 mt-1">
                  Split de R$ 200 (R$100 orto / R$100 MKT)
                </p>
              </CardContent>
            </Card>

            <Card className="border-emerald-200 bg-emerald-50/40">
              <CardContent className="p-4">
                <span className="text-xs font-medium text-emerald-800">Casos Convertidos</span>
                <p className="text-2xl font-bold text-emerald-900 mt-2">{convertidosCasos}</p>
                <p className="text-[11px] text-emerald-700 mt-1">Iniciaram tratamento Magic Wire</p>
              </CardContent>
            </Card>
          </div>

          {/* Tabela de Leads */}
          <Card className="border-slate-200 shadow-sm overflow-hidden">
            <CardHeader className="pb-3 border-b border-slate-100 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base font-bold text-slate-900">
                  Fila de Indicação & Atribuição de Pacientes
                </CardTitle>
                <CardDescription className="text-xs text-slate-500">
                  Ação Time ADM: Atribuir paciente ao Ortodontista da região geográfica
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-0 overflow-x-auto">
              <table className="w-full text-left text-sm min-w-[900px]">
                <thead className="bg-slate-50 border-b border-slate-100 text-xs font-semibold text-slate-600">
                  <tr>
                    <th className="p-3.5 pl-6">Paciente / Lead</th>
                    <th className="p-3.5">Origem</th>
                    <th className="p-3.5">Localidade Solicitada</th>
                    <th className="p-3.5">Ortodontista Atribuído</th>
                    <th className="p-3.5">1ª Consulta</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 pr-6 text-right">Ação ADM</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {leads.map((l) => (
                    <tr key={l.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="p-3.5 pl-6">
                        <p className="font-semibold text-slate-900">{l.name}</p>
                        <p className="text-xs text-slate-400 font-mono">
                          {l.email} • {l.phone}
                        </p>
                      </td>
                      <td className="p-3.5">
                        <Badge variant="outline" className="text-xs bg-slate-50">
                          {l.source}
                        </Badge>
                      </td>
                      <td className="p-3.5 text-xs text-slate-700 font-medium">
                        <MapPin className="w-3.5 h-3.5 inline mr-1 text-slate-400" />
                        {l.city} ({l.region})
                      </td>
                      <td className="p-3.5 text-xs">
                        {l.assignedDentistName ? (
                          <span className="font-medium text-emerald-800">
                            {l.assignedDentistName}
                          </span>
                        ) : (
                          <span className="text-amber-600 font-medium">Não atribuído</span>
                        )}
                      </td>
                      <td className="p-3.5 text-xs font-semibold text-slate-800">
                        R$ {l.firstConsultationValue.toFixed(2)}
                      </td>
                      <td className="p-3.5">
                        {l.status === 'novo' && (
                          <Badge className="bg-amber-100 text-amber-800 border-amber-200 text-xs">
                            Novo Lead
                          </Badge>
                        )}
                        {l.status === 'em_atendimento' && (
                          <Badge className="bg-blue-100 text-blue-800 border-blue-200 text-xs">
                            Em Atendimento
                          </Badge>
                        )}
                        {l.status === 'agendado' && (
                          <Badge className="bg-purple-100 text-purple-800 border-purple-200 text-xs">
                            Agendado
                          </Badge>
                        )}
                        {l.status === 'convertido' && (
                          <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 text-xs">
                            Convertido
                          </Badge>
                        )}
                      </td>
                      <td className="p-3.5 pr-6 text-right">
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-xs h-8 border-slate-300 hover:bg-slate-100"
                          onClick={() => {
                            setSelectedLead(l)
                            setIsAssignModalOpen(true)
                          }}
                        >
                          <UserCheck className="w-3.5 h-3.5 mr-1 text-emerald-600" /> Atribuir
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'mobilidade' && (
        <div className="space-y-6">
          {/* Banner Explicativo da Mobilidade Geográfica */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-900 to-indigo-900 text-white shadow-sm space-y-2">
            <h3 className="font-bold text-lg flex items-center gap-2">
              <Compass className="w-5 h-5 text-blue-300" /> Fluxo de Mobilidade Geográfica Magic
              Wire
            </h3>
            <p className="text-xs text-blue-100 max-w-3xl leading-relaxed">
              O paciente pode solicitar manutenções periódicas ou transferência definitiva em outra
              localidade (ex: viagens de trabalho). O Time ADM MWS é o responsável por: agendar na
              outra cidade, liberar acesso pontual ao prontuário digital, e pós-consulta creditar o
              dentista receptor e debitar o ortodontista de origem (R$ 250), finalizando com a
              revogação do acesso.
            </p>
          </div>

          {/* Lista de Solicitações de Mobilidade */}
          <div className="grid gap-4">
            {mobilityRequests.map((req) => (
              <Card key={req.id} className="border-slate-200 shadow-sm">
                <CardContent className="p-5 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                          {req.id}
                        </span>
                        <h4 className="font-bold text-base text-slate-900">{req.patientName}</h4>
                        <Badge
                          variant="outline"
                          className={
                            req.temporaryOrPermanent === 'manutencao_temporaria'
                              ? 'bg-blue-50 text-blue-800 border-blue-200 text-xs'
                              : 'bg-purple-50 text-purple-800 border-purple-200 text-xs'
                          }
                        >
                          {req.temporaryOrPermanent === 'manutencao_temporaria'
                            ? 'Manutenção Temporária (Viagem)'
                            : 'Transferência Definitiva'}
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-600">
                        <strong>Origem:</strong> {req.originDentistName} ({req.originCity}) ➔{' '}
                        <strong>Destino Solicitado:</strong> {req.targetCity}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        className="bg-slate-900 text-white hover:bg-slate-800 text-xs"
                        onClick={() => {
                          setSelectedMobility(req)
                          setIsMobilityActionModalOpen(true)
                        }}
                      >
                        Gerenciar Etapas ADM
                      </Button>
                    </div>
                  </div>

                  {/* Motivo informado pelo paciente */}
                  <div className="text-xs bg-slate-50 p-3 rounded-lg border border-slate-200/70 text-slate-700">
                    <span className="font-semibold text-slate-900">Motivo informado:</span>{' '}
                    {req.reason}
                  </div>

                  {/* Checklist visual das 4 ações administrativas */}
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-100 text-xs">
                    <div
                      className={`p-2.5 rounded-lg border ${req.assignedDentistName ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-slate-50 border-slate-200 text-slate-500'}`}
                    >
                      <p className="font-bold">1. Agendamento</p>
                      <p className="text-[11px] truncate">
                        {req.assignedDentistName ? `${req.assignedDentistName}` : 'Pendente ADM'}
                      </p>
                    </div>

                    <div
                      className={`p-2.5 rounded-lg border ${req.status === 'acesso_liberado' || req.status === 'concluido' ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-slate-50 border-slate-200 text-slate-500'}`}
                    >
                      <p className="font-bold">2. Acesso ao Prontuário</p>
                      <p className="text-[11px]">
                        {req.status === 'acesso_liberado'
                          ? 'Liberado (Ativo)'
                          : req.status === 'concluido'
                            ? 'Concluído'
                            : 'Aguardando'}
                      </p>
                    </div>

                    <div
                      className={`p-2.5 rounded-lg border ${req.creditGeneratedToTarget ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-slate-50 border-slate-200 text-slate-500'}`}
                    >
                      <p className="font-bold">3. Split Pós-Consulta</p>
                      <p className="text-[11px]">
                        {req.creditGeneratedToTarget
                          ? '+R$250 Destino / -R$250 Origem'
                          : 'Pendente'}
                      </p>
                    </div>

                    <div
                      className={`p-2.5 rounded-lg border ${req.accessRevoked ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-slate-50 border-slate-200 text-slate-500'}`}
                    >
                      <p className="font-bold">4. Revogação Acesso</p>
                      <p className="text-[11px]">
                        {req.accessRevoked ? 'Acesso Revogado OK' : 'Pendente'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Modal de Atribuição de Lead */}
      <Dialog open={isAssignModalOpen} onOpenChange={setIsAssignModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Atribuir Paciente a Ortodontista</DialogTitle>
            <DialogDescription>
              Selecione o ortodontista credenciado mais próximo da região solicitada para receber
              este lead no ecossistema.
            </DialogDescription>
          </DialogHeader>

          {selectedLead && (
            <div className="space-y-4 pt-2 text-xs">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                <p>
                  <strong>Paciente:</strong> {selectedLead.name}
                </p>
                <p>
                  <strong>Região Desejada:</strong> {selectedLead.city} ({selectedLead.region})
                </p>
                <p>
                  <strong>Valor 1ª Consulta:</strong> R${' '}
                  {selectedLead.firstConsultationValue.toFixed(2)}
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-800">Ortodontista Credenciado:</label>
                <select
                  value={selectedDentistId}
                  onChange={(e) => setSelectedDentistId(e.target.value)}
                  className="w-full h-10 px-3 border border-slate-200 rounded-lg bg-white text-xs focus:outline-none focus:ring-2 focus:ring-slate-900"
                >
                  {MOCK_ADMIN_DENTISTS.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name} — {d.city} ({d.cro})
                    </option>
                  ))}
                </select>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAssignModalOpen(false)}>
                  Cancelar
                </Button>
                <Button
                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                  onClick={() => handleAssignLead(selectedLead.id)}
                >
                  Confirmar Atribuição
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Modal de Ações da Mobilidade Geográfica */}
      <Dialog open={isMobilityActionModalOpen} onOpenChange={setIsMobilityActionModalOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Painel de Controle da Mobilidade</DialogTitle>
            <DialogDescription>Execução ponta a ponta das ações do Time ADM MWS.</DialogDescription>
          </DialogHeader>

          {selectedMobility && (
            <div className="space-y-4 pt-2 text-xs">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                <p>
                  <strong>Paciente:</strong> {selectedMobility.patientName}
                </p>
                <p>
                  <strong>De:</strong> {selectedMobility.originDentistName} (
                  {selectedMobility.originCity})
                </p>
                <p>
                  <strong>Para:</strong> {selectedMobility.targetCity}
                </p>
              </div>

              <div className="space-y-2">
                <div className="p-3 rounded-lg border border-slate-200 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-slate-800">1. Agendar na nova localidade</p>
                    <p className="text-[11px] text-slate-500">
                      Definir ortodontista credenciado no destino
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs"
                    onClick={() => handleAdvanceMobility(selectedMobility.id, 'agendar')}
                  >
                    Agendar
                  </Button>
                </div>

                <div className="p-3 rounded-lg border border-slate-200 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-slate-800">2. Liberar acesso ao prontuário</p>
                    <p className="text-[11px] text-slate-500">
                      Acesso temporário para anotação clínica
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs text-blue-700 border-blue-200 hover:bg-blue-50"
                    onClick={() => handleAdvanceMobility(selectedMobility.id, 'liberar_acesso')}
                  >
                    <Unlock className="w-3.5 h-3.5 mr-1" /> Liberar Acesso
                  </Button>
                </div>

                <div className="p-3 rounded-lg border border-slate-200 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-slate-800">
                      3 & 4. Pós-consulta: Split e Revogação
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Crédito R$250 p/ receptor, débito R$250 p/ origem e fechar acesso
                    </p>
                  </div>
                  <Button
                    size="sm"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs"
                    onClick={() => handleAdvanceMobility(selectedMobility.id, 'concluir_split')}
                  >
                    <DollarSign className="w-3.5 h-3.5 mr-1" /> Executar Split & Revogar
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
