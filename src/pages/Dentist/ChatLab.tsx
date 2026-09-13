import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  FlaskConical,
  Send,
  Paperclip,
  Image as ImageIcon,
  CheckCheck,
  Search,
  Phone,
  FileText,
  Clock,
  Sparkles,
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface ChatMessage {
  id: string
  sender: 'dentist' | 'lab'
  senderName: string
  text: string
  timestamp: string
  attachment?: {
    name: string
    type: 'image' | 'stl' | 'pdf'
    size: string
  }
}

interface ChatChannel {
  id: string
  caseId: string
  patientName: string
  technicianName: string
  lastMessage: string
  lastTime: string
  unreadCount: number
  status: 'online' | 'em_analise' | 'produzindo'
}

const MOCK_CHANNELS: ChatChannel[] = [
  {
    id: 'ch-1',
    caseId: 'CAS-2026-001',
    patientName: 'Maria Silva',
    technicianName: 'Dr. Alexandre (Técnico Lab 3D)',
    lastMessage: 'Ajustamos a rotação do incisivo conforme solicitado.',
    lastTime: '14:32',
    unreadCount: 1,
    status: 'online',
  },
  {
    id: 'ch-2',
    caseId: 'CAS-2026-002',
    patientName: 'João Santos',
    technicianName: 'Dra. Camila (Planejadora Digital)',
    lastMessage: 'Setup 3D enviado para sua revisão na plataforma.',
    lastTime: 'Ontem',
    unreadCount: 0,
    status: 'em_analise',
  },
  {
    id: 'ch-3',
    caseId: 'CAS-2026-003',
    patientName: 'Ana Costa',
    technicianName: 'Central de Logística MWS',
    lastMessage: 'O código de rastreio MWS-998273 já está ativo.',
    lastTime: '20/02',
    unreadCount: 0,
    status: 'produzindo',
  },
  {
    id: 'ch-4',
    caseId: 'CAS-GERAL',
    patientName: 'Suporte Técnico Geral Lab',
    technicianName: 'Equipe de Suporte Clínico MWS',
    lastMessage: 'Horário de plantão até às 19h hoje.',
    lastTime: '19/02',
    unreadCount: 0,
    status: 'online',
  },
  {
    id: 'ch-CAS-2026-004',
    caseId: 'CAS-2026-004',
    patientName: 'Pedro Lima',
    technicianName: 'Dr. Roberto (Planejamento Avançado MWS)',
    lastMessage: 'Avaliando relação oclusal posterior e diagrama de dobras do fio lingual.',
    lastTime: '22/02',
    unreadCount: 0,
    status: 'em_analise',
  },
  {
    id: 'ch-CAS-2026-005',
    caseId: 'CAS-2026-005',
    patientName: 'Carla Souza',
    technicianName: 'Triagem Técnica MWS',
    lastMessage: 'Arquivos STL recebidos e em validação de integridade.',
    lastTime: '24/02',
    unreadCount: 0,
    status: 'online',
  },
  {
    id: 'ch-CAS-2026-006',
    caseId: 'CAS-2026-006',
    patientName: 'Bruno Almeida',
    technicianName: 'Dr. Alexandre (Técnico Lab 3D)',
    lastMessage: 'Kit de fios e guias linguais enviado com sucesso.',
    lastTime: '25/01',
    unreadCount: 0,
    status: 'produzindo',
  },
]

const INITIAL_MESSAGES: Record<string, ChatMessage[]> = {
  'ch-1': [
    {
      id: 'm1',
      sender: 'dentist',
      senderName: 'Dr. Roberto Fernandes',
      text: 'Olá Alexandre! No caso da Maria Silva (CAS-2026-001), notei que no estágio 8 precisamos de um pouco mais de torque no dente 11.',
      timestamp: '14:15',
    },
    {
      id: 'm2',
      sender: 'lab',
      senderName: 'Dr. Alexandre (Técnico Lab 3D)',
      text: 'Perfeito, Dr. Roberto! Abri o modelo tridimensional aqui. Vou aplicar +2° de torque vestibular de raiz no 11.',
      timestamp: '14:22',
    },
    {
      id: 'm3',
      sender: 'lab',
      senderName: 'Dr. Alexandre (Técnico Lab 3D)',
      text: 'Ajustamos a rotação do incisivo conforme solicitado. Segue o print da nova sobreposição de malhas:',
      timestamp: '14:32',
      attachment: {
        name: 'setup_v2_ajuste_torque.png',
        type: 'image',
        size: '1.8 MB',
      },
    },
  ],
  'ch-2': [
    {
      id: 'm4',
      sender: 'lab',
      senderName: 'Dra. Camila (Planejadora Digital)',
      text: 'Dr. Roberto, o planejamento do João Santos está pronto com orientações clínicas para instalação do fio lingual.',
      timestamp: 'Ontem às 16:40',
    },
  ],
  'ch-3': [
    {
      id: 'm5',
      sender: 'lab',
      senderName: 'Central de Logística MWS',
      text: 'Dispositivo lingual MWS da Ana Costa despachado via courier expresso.',
      timestamp: '20/02 às 10:15',
    },
  ],
  'ch-CAS-2026-004': [
    {
      id: 'm6',
      sender: 'lab',
      senderName: 'Dr. Roberto (Planejamento Avançado MWS)',
      text: 'Caso Pedro Lima: análise cefalométrica em andamento para diagrama lingual customizado.',
      timestamp: '22/02 às 11:00',
    },
  ],
}

export default function DentistChatLab() {
  const [searchParams] = useSearchParams()
  const caseIdParam = searchParams.get('caseId')
  const patientParam = searchParams.get('patient')
  const [messagesMap, setMessagesMap] = useState<Record<string, ChatMessage[]>>(INITIAL_MESSAGES)

  const [channels, setChannels] = useState<ChatChannel[]>(() => {
    if (caseIdParam) {
      const exists = MOCK_CHANNELS.find((c) => c.caseId === caseIdParam)
      if (!exists && patientParam) {
        return [
          {
            id: `ch-${caseIdParam}`,
            caseId: caseIdParam,
            patientName: patientParam,
            technicianName: 'Equipe de Planejamento MWS',
            lastMessage: 'Canal contextualizado aberto para este caso.',
            lastTime: 'Hoje',
            unreadCount: 0,
            status: 'online',
          },
          ...MOCK_CHANNELS,
        ]
      }
    }
    return MOCK_CHANNELS
  })

  const [selectedChannelId, setSelectedChannelId] = useState<string>(() => {
    if (caseIdParam) {
      const found = MOCK_CHANNELS.find((c) => c.caseId === caseIdParam)
      if (found) return found.id
      return `ch-${caseIdParam}`
    }
    return 'ch-1'
  })

  useEffect(() => {
    if (caseIdParam) {
      const match = channels.find((c) => c.caseId === caseIdParam)
      if (match) {
        setSelectedChannelId(match.id)
      } else if (patientParam) {
        const newChan: ChatChannel = {
          id: `ch-${caseIdParam}`,
          caseId: caseIdParam,
          patientName: patientParam,
          technicianName: 'Equipe de Planejamento MWS',
          lastMessage: 'Canal contextualizado aberto para este caso.',
          lastTime: 'Hoje',
          unreadCount: 0,
          status: 'online',
        }
        setChannels((prev) => [newChan, ...prev])
        setSelectedChannelId(newChan.id)
      }
    }
  }, [caseIdParam, patientParam])
  const [inputMessage, setInputMessage] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const { toast } = useToast()

  const selectedChannel = channels.find((c) => c.id === selectedChannelId) || channels[0]
  const currentMessages = messagesMap[selectedChannelId] || []

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputMessage.trim()) return

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'dentist',
      senderName: 'Dr. Roberto Fernandes (Ortodontista)',
      text: inputMessage,
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    }

    setMessagesMap((prev) => ({
      ...prev,
      [selectedChannelId]: [...(prev[selectedChannelId] || []), newMsg],
    }))

    setInputMessage('')

    // Mock auto-reply após 1.5s
    setTimeout(() => {
      const replyMsg: ChatMessage = {
        id: `msg-rep-${Date.now()}`,
        sender: 'lab',
        senderName: selectedChannel?.technicianName || 'Laboratório MWS',
        text: `Recebido sobre o caso ${selectedChannel?.patientName} (${selectedChannel?.caseId}). Nossa equipe técnica do laboratório já está analisando sua solicitação.`,
        timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      }
      setMessagesMap((prev) => ({
        ...prev,
        [selectedChannelId]: [...(prev[selectedChannelId] || []), replyMsg],
      }))
    }, 1500)
  }

  const handleAttach = () => {
    toast({
      title: 'Anexar Arquivo STL / Foto',
      description:
        'Você pode enviar arquivos de escaneamento, fotos oclusais ou relatórios diretamente ao técnico.',
    })
  }

  const filteredChannels = channels.filter(
    (c) =>
      c.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.caseId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.technicianName.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-6xl mx-auto animate-fade-in-up">
      {/* Cabeçalho */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
            Chat Direto com o Laboratório
          </h1>
          <Badge className="bg-blue-100 text-blue-800 border-blue-200">Canal Técnico MWS</Badge>
        </div>
        <p className="text-slate-500 mt-1">
          Comunicação em tempo real com os planejadores digitais e técnicos responsáveis pelos seus
          casos.
        </p>
      </div>

      {/* Grid de Chat: Lista lateral + Janela de Mensagens */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-[640px] border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
        {/* Coluna Esquerda: Canais / Casos */}
        <div className="md:col-span-4 border-r border-slate-200 flex flex-col bg-slate-50/50">
          <div className="p-3.5 border-b border-slate-200 space-y-2">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Buscar caso ou técnico..."
                className="pl-9 text-xs h-9 bg-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {filteredChannels.map((channel) => {
              const isSelected = channel.id === selectedChannelId
              return (
                <button
                  key={channel.id}
                  onClick={() => setSelectedChannelId(channel.id)}
                  className={`w-full text-left p-3.5 flex items-start gap-3 transition-colors ${
                    isSelected
                      ? 'bg-emerald-50/70 border-l-4 border-emerald-600'
                      : 'hover:bg-slate-100/60'
                  }`}
                >
                  <Avatar className="h-10 w-10 border border-slate-200 flex-shrink-0">
                    <AvatarFallback className="bg-blue-600 text-white text-xs font-bold">
                      <FlaskConical className="w-4 h-4" />
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-slate-900 truncate">
                        {channel.patientName}
                      </h4>
                      <span className="text-[10px] text-slate-400">{channel.lastTime}</span>
                    </div>
                    <p className="text-[11px] font-mono text-emerald-700">{channel.caseId}</p>
                    <p className="text-xs text-slate-500 truncate mt-0.5">{channel.lastMessage}</p>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Coluna Direita: Conversa Ativa */}
        <div className="md:col-span-8 flex flex-col h-full bg-white">
          {/* Header do Chat Ativo */}
          <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-white">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 border border-slate-200">
                <AvatarFallback className="bg-emerald-600 text-white text-xs font-bold">
                  LAB
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-slate-900">
                    {selectedChannel.patientName} ({selectedChannel.caseId})
                  </h3>
                  <Badge
                    variant="outline"
                    className="text-[10px] border-emerald-300 text-emerald-700 bg-emerald-50"
                  >
                    {selectedChannel.technicianName}
                  </Badge>
                </div>
                <p className="text-xs text-slate-400 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" /> Canal contextualizado ao
                  caso de <strong className="text-slate-700">{selectedChannel.patientName}</strong>
                </p>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="text-xs border-slate-200"
              onClick={() =>
                toast({
                  title: 'Visualizador 3D',
                  description: 'Carregando o modelo 3D correspondente a esta conversa...',
                })
              }
            >
              <Sparkles className="w-3.5 h-3.5 mr-1 text-purple-600" /> Abrir no 3D
            </Button>
          </div>

          {/* Área de Mensagens */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/40">
            {currentMessages.map((msg) => {
              const isDentist = msg.sender === 'dentist'
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isDentist ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-center gap-1.5 mb-1 px-1">
                    <span className="text-[11px] font-semibold text-slate-600">
                      {msg.senderName}
                    </span>
                    <span className="text-[10px] text-slate-400">{msg.timestamp}</span>
                  </div>

                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm ${
                      isDentist
                        ? 'bg-emerald-600 text-white rounded-tr-none'
                        : 'bg-white text-slate-900 border border-slate-200 rounded-tl-none'
                    }`}
                  >
                    <p>{msg.text}</p>

                    {msg.attachment && (
                      <div className="mt-2.5 p-2 rounded-lg bg-black/10 border border-white/20 flex items-center gap-2">
                        <ImageIcon className="w-5 h-5 text-purple-600" />
                        <div className="flex-1 min-w-0 text-xs">
                          <p className="font-semibold truncate">{msg.attachment.name}</p>
                          <span className="text-[10px] opacity-75">{msg.attachment.size}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Barra de Input */}
          <form
            onSubmit={handleSendMessage}
            className="p-3.5 border-t border-slate-200 bg-white flex items-center gap-2"
          >
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={handleAttach}
              className="text-slate-500 hover:text-slate-900"
              title="Anexar arquivo STL ou foto"
            >
              <Paperclip className="w-5 h-5" />
            </Button>

            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Digite sua mensagem ou orientação técnica..."
              className="flex-1 text-sm bg-slate-50 border-slate-200 focus-visible:ring-emerald-500"
            />

            <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 px-4">
              <Send className="w-4 h-4 mr-1.5" /> Enviar
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
