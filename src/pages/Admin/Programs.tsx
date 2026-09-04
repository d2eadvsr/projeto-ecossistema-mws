import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Megaphone,
  Briefcase,
  TrendingUp,
  Split,
  Users,
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  Send,
  Building,
  DollarSign,
  ArrowRight,
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { AdminDentist, MOCK_ADMIN_DENTISTS } from './mockData'

export default function AdminPrograms() {
  const [dentists, setDentists] = useState<AdminDentist[]>(MOCK_ADMIN_DENTISTS)
  const [activeTab, setActiveTab] = useState<'mkt' | 'gestao'>('mkt')
  const [searchTerm, setSearchTerm] = useState('')
  const { toast } = useToast()

  // Contagens consistentes do programa de MKT e Vendas
  const mktContratados = 98 // 98 ortodontistas aderiram ao pacote de vendas
  const mktOfertados = 45 // 45 em negociação
  const mktRejeitados = 39 // 39 preferem tráfego próprio (98+45+39 = 182)

  // Programa de Gestão com parceiro API
  const gestaoContratados = 84
  const gestaoOfertados = 62
  const gestaoRejeitados = 36 // (84+62+36 = 182)

  const handleSendOffer = (dentistId: string, program: 'mkt' | 'gestao', name: string) => {
    setDentists((prev) =>
      prev.map((d) => {
        if (d.id !== dentistId) return d
        if (program === 'mkt') return { ...d, programMkt: 'ofertado' }
        return { ...d, programGestao: 'ofertado' }
      }),
    )
    toast({
      title: 'Oferta do Programa Enviada!',
      description: `Proposta do ${program === 'mkt' ? 'Programa de MKT & Vendas' : 'Programa de Gestão Parceiro API'} enviada para ${name}.`,
    })
  }

  const handleProcessResponse = (
    dentistId: string,
    program: 'mkt' | 'gestao',
    response: 'contratado' | 'rejeitado',
    name: string,
  ) => {
    setDentists((prev) =>
      prev.map((d) => {
        if (d.id !== dentistId) return d
        if (program === 'mkt') return { ...d, programMkt: response }
        return { ...d, programGestao: response }
      }),
    )
    toast({
      title: response === 'contratado' ? 'Programa Contratado!' : 'Oferta Rejeitada Registrada',
      description: `Status atualizado no perfil de ${name}. Retorno processado pelo Time ADM MWS.`,
    })
  }

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto animate-fade-in-up">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
            Programas MWS de Expansão
          </h1>
          <p className="text-slate-500 mt-1">
            Gestão das ofertas e retornos dos programas estratégicos da plataforma: Pacote de
            Marketing & Vendas e Programa de Gestão via API.
          </p>
        </div>

        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200">
          <Button
            variant={activeTab === 'mkt' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('mkt')}
            className={
              activeTab === 'mkt' ? 'bg-slate-900 text-xs shadow-sm' : 'text-xs text-slate-600'
            }
          >
            <Megaphone className="w-3.5 h-3.5 mr-1.5" /> MKT & Vendas (Murilo / MWS)
          </Button>
          <Button
            variant={activeTab === 'gestao' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('gestao')}
            className={
              activeTab === 'gestao' ? 'bg-slate-900 text-xs shadow-sm' : 'text-xs text-slate-600'
            }
          >
            <Briefcase className="w-3.5 h-3.5 mr-1.5" /> Programa de Gestão (Parceiro API)
          </Button>
        </div>
      </div>

      {activeTab === 'mkt' && (
        <div className="space-y-6">
          {/* Box de Estrutura do Pacote de Vendas (Citação direta da planilha) */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-900 text-white shadow-sm space-y-3">
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full text-xs font-semibold">
              <Split className="w-3.5 h-3.5" /> Modelo Financeiro do Pacote de Vendas
            </div>
            <h3 className="font-bold text-lg">
              Solução de Vendas e Impulsionamento para os Licenciados
            </h3>
            <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
              "A proposta inicial é oferecer para o licenciado um pacote de vendas por meio do qual
              ele impulsione suas vendas localmente na região em que atende. Hoje é algo que o
              dentista não faz, não sabe fazer e não sabe contratar. Dos R$ 200,00 da consulta: R$
              100 para o licenciado e R$ 100 para marketing e vendas (R$ 50 para o time de MKT e R$
              50 para o time de vendas local de SP). Murilo é o parceiro ref. ao time de MKT para
              maximizar o resultado para os licenciados."
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
              <div className="p-3 bg-white/10 rounded-xl border border-white/15">
                <span className="text-emerald-300 font-bold block text-sm">R$ 100,00</span>
                <span className="text-slate-200 block font-medium mt-0.5">
                  Ortodontista Licenciado
                </span>
                <span className="text-slate-400 text-[11px]">Honorários da 1ª consulta</span>
              </div>
              <div className="p-3 bg-white/10 rounded-xl border border-white/15">
                <span className="text-blue-300 font-bold block text-sm">R$ 50,00</span>
                <span className="text-slate-200 block font-medium mt-0.5">
                  Time de MKT (Murilo)
                </span>
                <span className="text-slate-400 text-[11px]">
                  Campanhas e tráfego pago regional
                </span>
              </div>
              <div className="p-3 bg-white/10 rounded-xl border border-white/15">
                <span className="text-purple-300 font-bold block text-sm">R$ 50,00</span>
                <span className="text-slate-200 block font-medium mt-0.5">
                  Time de Vendas (Plataforma SP)
                </span>
                <span className="text-slate-400 text-[11px]">
                  Atendimento e fechamento de consultas
                </span>
              </div>
            </div>
          </div>

          {/* Métricas MKT */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="border-emerald-200 bg-emerald-50/50">
              <CardContent className="p-4">
                <span className="text-xs font-medium text-emerald-800">
                  Licenciados com MKT Contratado
                </span>
                <p className="text-2xl font-bold text-emerald-950 mt-2">{mktContratados} (53.8%)</p>
                <p className="text-[11px] text-emerald-700 mt-1">Alta adesão ao pacote de vendas</p>
              </CardContent>
            </Card>

            <Card className="border-amber-200 bg-amber-50/50">
              <CardContent className="p-4">
                <span className="text-xs font-medium text-amber-800">
                  Ofertas Enviadas em Análise
                </span>
                <p className="text-2xl font-bold text-amber-950 mt-2">{mktOfertados} (24.7%)</p>
                <p className="text-[11px] text-amber-700 mt-1">
                  Aguardando retorno do ortodontista
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-200">
              <CardContent className="p-4">
                <span className="text-xs font-medium text-slate-600">
                  Rejeitados / Sem Interesse
                </span>
                <p className="text-2xl font-bold text-slate-900 mt-2">{mktRejeitados} (21.5%)</p>
                <p className="text-[11px] text-slate-500 mt-1">
                  Tráfego próprio ou base consolidada
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Tabela de Ofertas e Retornos MKT */}
          <Card className="border-slate-200 shadow-sm overflow-hidden">
            <CardHeader className="pb-3 border-b border-slate-100">
              <CardTitle className="text-base font-bold text-slate-900">
                Acompanhamento das Ofertas de MKT & Vendas
              </CardTitle>
              <CardDescription className="text-xs text-slate-500">
                Ações ADM: Oferecer programa, receber retorno enviado e dar andamento (se contratou
                ou rejeitou)
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 overflow-x-auto">
              <table className="w-full text-left text-sm min-w-[850px]">
                <thead className="bg-slate-50 border-b border-slate-100 text-xs font-semibold text-slate-600">
                  <tr>
                    <th className="p-3.5 pl-6">Ortodontista</th>
                    <th className="p-3.5">Cidade</th>
                    <th className="p-3.5">Clínica</th>
                    <th className="p-3.5">Status da Oferta MKT</th>
                    <th className="p-3.5 pr-6 text-right">Ação ADM</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {dentists.map((d) => (
                    <tr key={d.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="p-3.5 pl-6 font-semibold text-slate-900">{d.name}</td>
                      <td className="p-3.5 text-xs text-slate-600">{d.city}</td>
                      <td className="p-3.5 text-xs text-slate-600">{d.clinicName}</td>
                      <td className="p-3.5">
                        {d.programMkt === 'contratado' && (
                          <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 text-xs">
                            Contratado
                          </Badge>
                        )}
                        {d.programMkt === 'ofertado' && (
                          <Badge className="bg-amber-100 text-amber-800 border-amber-200 text-xs">
                            Oferta Enviada
                          </Badge>
                        )}
                        {d.programMkt === 'rejeitado' && (
                          <Badge className="bg-slate-100 text-slate-700 border-slate-200 text-xs">
                            Rejeitado
                          </Badge>
                        )}
                        {d.programMkt === 'sem_oferta' && (
                          <Badge variant="outline" className="text-xs text-slate-400">
                            Sem Oferta
                          </Badge>
                        )}
                      </td>
                      <td className="p-3.5 pr-6 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {d.programMkt === 'sem_oferta' && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-xs h-7 border-emerald-300 text-emerald-800 hover:bg-emerald-50"
                              onClick={() => handleSendOffer(d.id, 'mkt', d.name)}
                            >
                              <Send className="w-3 h-3 mr-1" /> Oferecer Programa
                            </Button>
                          )}
                          {d.programMkt === 'ofertado' && (
                            <>
                              <Button
                                size="sm"
                                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs h-7"
                                onClick={() =>
                                  handleProcessResponse(d.id, 'mkt', 'contratado', d.name)
                                }
                              >
                                <CheckCircle2 className="w-3 h-3 mr-1" /> Contratou
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-xs h-7 text-slate-600"
                                onClick={() =>
                                  handleProcessResponse(d.id, 'mkt', 'rejeitado', d.name)
                                }
                              >
                                <XCircle className="w-3 h-3 mr-1 text-red-500" /> Rejeitou
                              </Button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'gestao' && (
        <div className="space-y-6">
          {/* Banner Programa de Gestão - API Parceiro */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-900 text-white shadow-sm space-y-2">
            <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 px-2.5 py-0.5 rounded-full text-xs font-semibold">
              <Briefcase className="w-3.5 h-3.5" /> Integração Via API
            </div>
            <h3 className="font-bold text-lg">Programa de Gestão de Consultório MWS</h3>
            <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
              Oferecer Programa de Gestão através de parceiro homologado (conectado via API na
              esteira técnica MWS). Permite aos ortodontistas gerenciar faturamento, prontuários,
              financeiro e controle de estoque de forma 100% sincronizada ao ecossistema Magic Wire.
            </p>
          </div>

          {/* Métricas Gestão */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="border-blue-200 bg-blue-50/50">
              <CardContent className="p-4">
                <span className="text-xs font-medium text-blue-800">Licenciados Integrados</span>
                <p className="text-2xl font-bold text-blue-950 mt-2">{gestaoContratados} (46.1%)</p>
                <p className="text-[11px] text-blue-700 mt-1">Conectados à API do parceiro</p>
              </CardContent>
            </Card>

            <Card className="border-amber-200 bg-amber-50/50">
              <CardContent className="p-4">
                <span className="text-xs font-medium text-amber-800">Ofertas em Andamento</span>
                <p className="text-2xl font-bold text-amber-950 mt-2">{gestaoOfertados} (34.1%)</p>
                <p className="text-[11px] text-amber-700 mt-1">Em fase de avaliação da API</p>
              </CardContent>
            </Card>

            <Card className="border-slate-200">
              <CardContent className="p-4">
                <span className="text-xs font-medium text-slate-600">
                  Sistemas Próprios / Rejeitados
                </span>
                <p className="text-2xl font-bold text-slate-900 mt-2">{gestaoRejeitados} (19.8%)</p>
                <p className="text-[11px] text-slate-500 mt-1">Utilizam software legado</p>
              </CardContent>
            </Card>
          </div>

          {/* Tabela de Gestão */}
          <Card className="border-slate-200 shadow-sm overflow-hidden">
            <CardHeader className="pb-3 border-b border-slate-100">
              <CardTitle className="text-base font-bold text-slate-900">
                Status do Programa de Gestão por Ortodontista
              </CardTitle>
              <CardDescription className="text-xs text-slate-500">
                Ações ADM: Oferecer integração parceira e registrar aceite ou recusa
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 overflow-x-auto">
              <table className="w-full text-left text-sm min-w-[850px]">
                <thead className="bg-slate-50 border-b border-slate-100 text-xs font-semibold text-slate-600">
                  <tr>
                    <th className="p-3.5 pl-6">Ortodontista</th>
                    <th className="p-3.5">Cidade</th>
                    <th className="p-3.5">Clínica</th>
                    <th className="p-3.5">Status Gestão API</th>
                    <th className="p-3.5 pr-6 text-right">Ação ADM</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {dentists.map((d) => (
                    <tr key={d.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="p-3.5 pl-6 font-semibold text-slate-900">{d.name}</td>
                      <td className="p-3.5 text-xs text-slate-600">{d.city}</td>
                      <td className="p-3.5 text-xs text-slate-600">{d.clinicName}</td>
                      <td className="p-3.5">
                        {d.programGestao === 'contratado' && (
                          <Badge className="bg-blue-100 text-blue-800 border-blue-200 text-xs">
                            API Ativa
                          </Badge>
                        )}
                        {d.programGestao === 'ofertado' && (
                          <Badge className="bg-amber-100 text-amber-800 border-amber-200 text-xs">
                            Oferta Enviada
                          </Badge>
                        )}
                        {d.programGestao === 'rejeitado' && (
                          <Badge className="bg-slate-100 text-slate-700 border-slate-200 text-xs">
                            Rejeitado
                          </Badge>
                        )}
                        {d.programGestao === 'sem_oferta' && (
                          <Badge variant="outline" className="text-xs text-slate-400">
                            Sem Oferta
                          </Badge>
                        )}
                      </td>
                      <td className="p-3.5 pr-6 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {d.programGestao === 'sem_oferta' && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-xs h-7 border-blue-300 text-blue-800 hover:bg-blue-50"
                              onClick={() => handleSendOffer(d.id, 'gestao', d.name)}
                            >
                              <Send className="w-3 h-3 mr-1" /> Oferecer Gestão API
                            </Button>
                          )}
                          {d.programGestao === 'ofertado' && (
                            <>
                              <Button
                                size="sm"
                                className="bg-blue-600 hover:bg-blue-700 text-white text-xs h-7"
                                onClick={() =>
                                  handleProcessResponse(d.id, 'gestao', 'contratado', d.name)
                                }
                              >
                                <CheckCircle2 className="w-3 h-3 mr-1" /> Contratou
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-xs h-7 text-slate-600"
                                onClick={() =>
                                  handleProcessResponse(d.id, 'gestao', 'rejeitado', d.name)
                                }
                              >
                                <XCircle className="w-3 h-3 mr-1 text-red-500" /> Rejeitou
                              </Button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
