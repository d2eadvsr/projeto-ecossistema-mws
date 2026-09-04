import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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
  CheckCircle2,
  Clock,
  FileText,
  AlertCircle,
  Eye,
  Send,
  UserCheck,
  Building,
  Mail,
  Phone,
  MapPin,
  Sparkles,
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { AdminDentist, MOCK_ADMIN_DENTISTS } from './mockData'

export default function AdminDentists() {
  const [dentists, setDentists] = useState<AdminDentist[]>(MOCK_ADMIN_DENTISTS)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [selectedDentist, setSelectedDentist] = useState<AdminDentist | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [isContractModalOpen, setIsContractModalOpen] = useState(false)
  const [isPublicProfileModalOpen, setIsPublicProfileModalOpen] = useState(false)
  const { toast } = useToast()

  // Contagens consistentes: Total 182
  // Ativos aprovados: 160 | Em análise de adesão: 10 | Aguardando assinatura: 8 | Documentação pendente: 4
  const countAtivos = 160
  const countEmAnalise = 10
  const countAguardandoContrato = 8
  const countDocsPendentes = 4
  const countPerfisPublicosPendentes = 6

  const filteredDentists = dentists.filter((d) => {
    const matchesSearch =
      d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.cro.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.clinicName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || d.status === statusFilter
    return matchesSearch && matchesStatus
  })

  // Ações administrativas do fluxo ponta a ponta
  const handleApproveAdhesion = (id: string, name: string) => {
    setDentists((prev) =>
      prev.map((d) =>
        d.id === id
          ? {
              ...d,
              status: 'contrato_pendente',
              contractStatus: 'gerado',
            }
          : d,
      ),
    )
    toast({
      title: 'Ficha de Adesão Aprovada!',
      description: `Ortodontista ${name} aprovado. Contrato de licenciamento MWS (R$ 24k) gerado automaticamente.`,
    })
    setIsDetailOpen(false)
  }

  const handleSendContract = (id: string, name: string) => {
    setDentists((prev) =>
      prev.map((d) =>
        d.id === id
          ? {
              ...d,
              contractStatus: 'aguardando_assinatura',
            }
          : d,
      ),
    )
    toast({
      title: 'Contrato Enviado para Assinatura (CLM)!',
      description: `Contrato enviado via SaaS para o e-mail de ${name}.`,
    })
    setIsContractModalOpen(false)
  }

  const handleValidateSignedContract = (id: string, name: string) => {
    setDentists((prev) =>
      prev.map((d) =>
        d.id === id
          ? {
              ...d,
              status: 'aprovado',
              contractStatus: 'assinado',
            }
          : d,
      ),
    )
    toast({
      title: 'Contrato Assinado Concluído!',
      description: `Processo de licenciamento de ${name} finalizado. Acesso ao Portal Web e App liberados.`,
    })
    setIsContractModalOpen(false)
  }

  const handlePublishPublicProfile = (id: string, name: string) => {
    setDentists((prev) =>
      prev.map((d) =>
        d.id === id
          ? {
              ...d,
              publicProfileStatus: 'publicado',
            }
          : d,
      ),
    )
    toast({
      title: 'Perfil Público Aprovado e Publicado!',
      description: `O perfil do(a) ${name} já está visível para leads e pacientes na busca de especialistas.`,
    })
    setIsPublicProfileModalOpen(false)
  }

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto animate-fade-in-up">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
            Gestão de Ortodontistas Licenciados
          </h1>
          <p className="text-slate-500 mt-1">
            Avaliação de ficha de adesão, gestão de contratos (CLM), moderação de perfis públicos e
            credenciamento.
          </p>
        </div>
      </div>

      {/* Caixas de Métricas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-slate-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-600">Total na Base Licenciada</span>
              <Users className="w-4 h-4 text-slate-500" />
            </div>
            <p className="text-2xl font-bold text-slate-900 mt-2">182</p>
            <p className="text-[11px] text-slate-500 mt-1">160 credenciados ativos na rede</p>
          </CardContent>
        </Card>

        <Card className="border-amber-200 bg-amber-50/40">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-amber-800">Fichas em Análise</span>
              <Clock className="w-4 h-4 text-amber-600" />
            </div>
            <p className="text-2xl font-bold text-amber-900 mt-2">{countEmAnalise}</p>
            <p className="text-[11px] text-amber-700 mt-1">Aguardando validação de perfil</p>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50/40">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-blue-800">Contratos Pendentes</span>
              <FileText className="w-4 h-4 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-blue-900 mt-2">{countAguardandoContrato}</p>
            <p className="text-[11px] text-blue-700 mt-1">Assinatura digital SaaS em curso</p>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50/40">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-purple-800">
                Perfis Públicos p/ Avaliação
              </span>
              <Sparkles className="w-4 h-4 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-purple-900 mt-2">
              {countPerfisPublicosPendentes}
            </p>
            <p className="text-[11px] text-purple-700 mt-1">Submetidos pelos ortodontistas</p>
          </CardContent>
        </Card>
      </div>

      {/* Barra de Filtros e Busca */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Buscar por nome, CRO, clínica ou cidade..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <Button
            variant={statusFilter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setStatusFilter('all')}
            className={statusFilter === 'all' ? 'bg-slate-900 text-xs' : 'text-xs'}
          >
            Todos ({dentists.length})
          </Button>
          <Button
            variant={statusFilter === 'em_analise' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setStatusFilter('em_analise')}
            className="text-xs"
          >
            Em Análise
          </Button>
          <Button
            variant={statusFilter === 'contrato_pendente' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setStatusFilter('contrato_pendente')}
            className="text-xs"
          >
            Contrato Pendente
          </Button>
          <Button
            variant={statusFilter === 'aprovado' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setStatusFilter('aprovado')}
            className="text-xs"
          >
            Credenciados Ativos
          </Button>
        </div>
      </div>

      {/* Tabela de Ortodontistas */}
      <Card className="border-slate-200 shadow-sm overflow-hidden">
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-left text-sm min-w-[950px]">
            <thead className="bg-slate-50 border-b border-slate-100 text-xs font-semibold text-slate-600">
              <tr>
                <th className="p-3.5 pl-6">Ortodontista / Clínica</th>
                <th className="p-3.5">CRO / Região</th>
                <th className="p-3.5">Taxa R$ 24k</th>
                <th className="p-3.5">Status Adesão</th>
                <th className="p-3.5">Contrato (CLM)</th>
                <th className="p-3.5">Perfil Público</th>
                <th className="p-3.5 text-center">Casos</th>
                <th className="p-3.5 pr-6 text-right">Ações ADM</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredDentists.map((d) => (
                <tr key={d.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-3.5 pl-6">
                    <p className="font-semibold text-slate-900">{d.name}</p>
                    <p className="text-xs text-slate-500">{d.clinicName}</p>
                  </td>
                  <td className="p-3.5">
                    <span className="font-mono text-xs font-medium text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded">
                      {d.cro}
                    </span>
                    <p className="text-xs text-slate-500 mt-0.5">{d.city}</p>
                  </td>
                  <td className="p-3.5">
                    {d.licensePaid ? (
                      <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 text-[10px]">
                        Pago (R$ 24k)
                      </Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        className="text-amber-700 border-amber-300 text-[10px]"
                      >
                        Pendente
                      </Badge>
                    )}
                  </td>
                  <td className="p-3.5">
                    {d.status === 'aprovado' && (
                      <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 text-xs">
                        Credenciado
                      </Badge>
                    )}
                    {d.status === 'em_analise' && (
                      <Badge className="bg-amber-100 text-amber-800 border-amber-200 text-xs">
                        Em Análise
                      </Badge>
                    )}
                    {d.status === 'contrato_pendente' && (
                      <Badge className="bg-blue-100 text-blue-800 border-blue-200 text-xs">
                        Contrato
                      </Badge>
                    )}
                    {d.status === 'documentacao_pendente' && (
                      <Badge className="bg-red-100 text-red-800 border-red-200 text-xs">
                        Docs Pendentes
                      </Badge>
                    )}
                  </td>
                  <td className="p-3.5">
                    {d.contractStatus === 'assinado' && (
                      <span className="text-xs text-emerald-700 font-medium flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Assinado
                      </span>
                    )}
                    {d.contractStatus === 'aguardando_assinatura' && (
                      <span className="text-xs text-blue-700 font-medium flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> Aguardando
                      </span>
                    )}
                    {d.contractStatus === 'gerado' && (
                      <span className="text-xs text-purple-700 font-medium">Gerado (c1)</span>
                    )}
                    {d.contractStatus === 'nao_gerado' && (
                      <span className="text-xs text-slate-400">Não gerado</span>
                    )}
                  </td>
                  <td className="p-3.5">
                    {d.publicProfileStatus === 'publicado' && (
                      <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[10px]">
                        Publicado
                      </Badge>
                    )}
                    {d.publicProfileStatus === 'pendente_avaliacao' && (
                      <Badge className="bg-purple-100 text-purple-800 border-purple-300 text-[10px] animate-pulse">
                        Avaliar Perfil
                      </Badge>
                    )}
                    {d.publicProfileStatus === 'rascunho' && (
                      <span className="text-xs text-slate-400">Rascunho</span>
                    )}
                  </td>
                  <td className="p-3.5 text-center font-semibold text-slate-700">{d.casesCount}</td>
                  <td className="p-3.5 pr-6 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs h-8"
                        onClick={() => {
                          setSelectedDentist(d)
                          setIsDetailOpen(true)
                        }}
                      >
                        <Eye className="w-3.5 h-3.5 mr-1 text-slate-500" /> Ficha
                      </Button>

                      {d.publicProfileStatus === 'pendente_avaliacao' && (
                        <Button
                          size="sm"
                          className="bg-purple-600 hover:bg-purple-700 text-white text-xs h-8"
                          onClick={() => {
                            setSelectedDentist(d)
                            setIsPublicProfileModalOpen(true)
                          }}
                        >
                          <Sparkles className="w-3.5 h-3.5 mr-1" /> Perfil
                        </Button>
                      )}

                      {d.contractStatus !== 'assinado' && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-xs h-8 border-blue-200 text-blue-700 hover:bg-blue-50"
                          onClick={() => {
                            setSelectedDentist(d)
                            setIsContractModalOpen(true)
                          }}
                        >
                          <FileText className="w-3.5 h-3.5 mr-1" /> Contrato
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Modal 1: Ficha de Adesão e Documentos */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Ficha de Adesão do Ortodontista</DialogTitle>
            <DialogDescription>
              Avaliação de conformidade cadastral e regulatória para licenciamento Magic Wire
              System.
            </DialogDescription>
          </DialogHeader>

          {selectedDentist && (
            <div className="space-y-4 pt-2">
              <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                <div>
                  <span className="text-slate-400 block">Nome Completo:</span>
                  <span className="font-semibold text-slate-900 text-sm">
                    {selectedDentist.name}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block">CRO:</span>
                  <span className="font-semibold text-slate-900 text-sm font-mono">
                    {selectedDentist.cro}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block">Clínica / Consultório:</span>
                  <span className="font-semibold text-slate-900">{selectedDentist.clinicName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Cidade / UF:</span>
                  <span className="font-semibold text-slate-900">{selectedDentist.city}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">E-mail:</span>
                  <span className="font-semibold text-slate-900">{selectedDentist.email}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Telefone / WhatsApp:</span>
                  <span className="font-semibold text-slate-900">{selectedDentist.phone}</span>
                </div>
              </div>

              {/* Documentos Compartilhados */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-700">Documentos Anexados na Adesão:</h4>
                <div className="grid grid-cols-3 gap-2">
                  <div className="p-2.5 rounded-lg border border-slate-200 bg-white flex items-center justify-between text-xs">
                    <span>Diploma & Especialização</span>
                    <Badge variant="outline" className="text-[10px] text-emerald-700 bg-emerald-50">
                      Válido
                    </Badge>
                  </div>
                  <div className="p-2.5 rounded-lg border border-slate-200 bg-white flex items-center justify-between text-xs">
                    <span>Carteira do CRO</span>
                    <Badge variant="outline" className="text-[10px] text-emerald-700 bg-emerald-50">
                      Válido
                    </Badge>
                  </div>
                  <div className="p-2.5 rounded-lg border border-slate-200 bg-white flex items-center justify-between text-xs">
                    <span>Comprovante de Endereço</span>
                    <Badge variant="outline" className="text-[10px] text-emerald-700 bg-emerald-50">
                      Válido
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Pagamento do Licenciamento */}
              <div className="p-3 rounded-lg border border-emerald-200 bg-emerald-50/50 flex items-center justify-between text-xs">
                <div>
                  <p className="font-semibold text-emerald-900">
                    Taxa de Licenciamento MWS (R$ 24.000,00)
                  </p>
                  <p className="text-emerald-700">Processado via Fintech integrada.</p>
                </div>
                <Badge className="bg-emerald-600 text-white">Status: Confirmado</Badge>
              </div>

              <DialogFooter className="gap-2 sm:gap-0">
                <Button variant="outline" onClick={() => setIsDetailOpen(false)}>
                  Fechar
                </Button>
                {selectedDentist.status === 'em_analise' && (
                  <Button
                    className="bg-emerald-600 hover:bg-emerald-700 text-white"
                    onClick={() => handleApproveAdhesion(selectedDentist.id, selectedDentist.name)}
                  >
                    <CheckCircle2 className="w-4 h-4 mr-2" /> Aprovar Adesão & Gerar Contrato (c1)
                  </Button>
                )}
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Modal 2: Fluxo do Contrato de Licenciamento (c1, c2, c4) */}
      <Dialog open={isContractModalOpen} onOpenChange={setIsContractModalOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Fluxo do Contrato de Licenciamento (CLM)</DialogTitle>
            <DialogDescription>
              Integração com SaaS de Assinatura de Contrato para formalização jurídica da licença
              MWS.
            </DialogDescription>
          </DialogHeader>

          {selectedDentist && (
            <div className="space-y-4 pt-2 text-xs">
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Ortodontista:</span>
                  <span className="font-semibold text-slate-800">{selectedDentist.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Objeto:</span>
                  <span className="font-semibold text-slate-800">
                    Licenciamento Magic Wire System 3ª Geração
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Valor de Licenciamento:</span>
                  <span className="font-bold text-emerald-700">R$ 24.000,00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Status Atual:</span>
                  <Badge variant="outline" className="font-semibold">
                    {selectedDentist.contractStatus}
                  </Badge>
                </div>
              </div>

              <div className="space-y-2 border-t pt-3">
                <h4 className="font-semibold text-slate-800">Etapas do Processo de Assinatura:</h4>
                <div className="space-y-2">
                  <div className="p-2.5 rounded-lg border border-slate-200 bg-white flex items-center justify-between">
                    <div>
                      <p className="font-medium text-slate-800">
                        (c1) Gerar minuta com dados do ortodontista
                      </p>
                      <p className="text-[11px] text-slate-400">
                        Minuta pronta com cláusulas de propriedade intelectual MWS
                      </p>
                    </div>
                    <Badge className="bg-emerald-100 text-emerald-800">OK</Badge>
                  </div>
                  <div className="p-2.5 rounded-lg border border-slate-200 bg-white flex items-center justify-between">
                    <div>
                      <p className="font-medium text-slate-800">
                        (c2) Enviar para assinatura do ortodontista
                      </p>
                      <p className="text-[11px] text-slate-400">
                        Disparo via SaaS de assinatura eletrônica com validade jurídica
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs h-7"
                      onClick={() => handleSendContract(selectedDentist.id, selectedDentist.name)}
                    >
                      <Send className="w-3 h-3 mr-1" /> Disparar (c2)
                    </Button>
                  </div>
                  <div className="p-2.5 rounded-lg border border-slate-200 bg-white flex items-center justify-between">
                    <div>
                      <p className="font-medium text-slate-800">
                        (c4) Conferir contrato assinado e concluir
                      </p>
                      <p className="text-[11px] text-slate-400">Validação final do Time ADM MWS</p>
                    </div>
                    <Button
                      size="sm"
                      className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs h-7"
                      onClick={() =>
                        handleValidateSignedContract(selectedDentist.id, selectedDentist.name)
                      }
                    >
                      <CheckCircle2 className="w-3 h-3 mr-1" /> Concluir (c4)
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Modal 3: Avaliar e Publicar Perfil Público do Ortodontista */}
      <Dialog open={isPublicProfileModalOpen} onOpenChange={setIsPublicProfileModalOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Moderação de Perfil Público</DialogTitle>
            <DialogDescription>
              Aprovação da biografia, foto e endereço de atendimento para publicação no buscador de
              especialistas da plataforma.
            </DialogDescription>
          </DialogHeader>

          {selectedDentist && (
            <div className="space-y-4 pt-2 text-xs">
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-base">
                    {selectedDentist.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{selectedDentist.name}</h4>
                    <p className="text-slate-500 font-mono">{selectedDentist.cro}</p>
                  </div>
                </div>

                <div>
                  <span className="text-slate-400 block mb-1">Biografia Submetida:</span>
                  <p className="text-slate-700 leading-relaxed bg-white p-3 rounded-lg border border-slate-200">
                    Especialista em Ortodontia e Ortopedia Facial com mais de 12 anos de
                    experiência. Credenciado oficial do Magic Wire System, oferecendo a tecnologia
                    revolucionária de fios linguais robóticos invisíveis por trás dos dentes.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2.5 rounded bg-white border border-slate-200">
                    <span className="text-slate-400 block">Endereço de Atendimento:</span>
                    <span className="font-semibold text-slate-800">{selectedDentist.city}</span>
                  </div>
                  <div className="p-2.5 rounded bg-white border border-slate-200">
                    <span className="text-slate-400 block">Clínica:</span>
                    <span className="font-semibold text-slate-800">
                      {selectedDentist.clinicName}
                    </span>
                  </div>
                </div>
              </div>

              <DialogFooter className="gap-2 sm:gap-0">
                <Button variant="outline" onClick={() => setIsPublicProfileModalOpen(false)}>
                  Solicitar Ajustes
                </Button>
                <Button
                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                  onClick={() =>
                    handlePublishPublicProfile(selectedDentist.id, selectedDentist.name)
                  }
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" /> Aprovar e Publicar no Portal
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
