import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Calendar as CalendarIcon,
  Plus,
  Trash2,
  AlertCircle,
  CheckCircle2,
  Clock,
  Shield,
  Info,
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { MentorUnavailablePeriod, loadUnavailablePeriods, saveUnavailablePeriods } from './mockData'
import { CURRENT_MENTOR } from './Dashboard'

export default function MentorAvailability() {
  const [periods, setPeriods] = useState<MentorUnavailablePeriod[]>([])
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [reason, setReason] = useState('')
  const { toast } = useToast()

  const refreshPeriods = () => {
    const all = loadUnavailablePeriods()
    // Períodos do mentor logado
    setPeriods(all.filter((p) => p.mentorId === CURRENT_MENTOR.id))
  }

  useEffect(() => {
    refreshPeriods()
  }, [])

  const handleAddPeriod = (e: React.FormEvent) => {
    e.preventDefault()
    if (!startDate || !endDate) return

    if (endDate < startDate) {
      toast({
        title: 'Data inválida!',
        description: 'A data final não pode ser anterior à data inicial.',
        variant: 'destructive',
      })
      return
    }

    const newPeriod: MentorUnavailablePeriod = {
      id: `unav-${Date.now()}`,
      mentorId: CURRENT_MENTOR.id,
      startDate,
      endDate,
      reason: reason.trim() || 'Período bloqueado pelo mentor',
      createdAt: new Date().toISOString().split('T')[0],
    }

    const all = loadUnavailablePeriods()
    const updated = [newPeriod, ...all]
    saveUnavailablePeriods(updated)
    refreshPeriods()

    setStartDate('')
    setEndDate('')
    setReason('')

    toast({
      title: 'Período de indisponibilidade registrado!',
      description: `Do dia ${formatDate(startDate)} ao dia ${formatDate(endDate)} você estará indisponível para novos casos.`,
    })
  }

  const handleRemovePeriod = (id: string) => {
    const all = loadUnavailablePeriods()
    const updated = all.filter((p) => p.id !== id)
    saveUnavailablePeriods(updated)
    refreshPeriods()

    toast({
      title: 'Período removido!',
      description: 'Sua disponibilidade foi restabelecida para este intervalo.',
    })
  }

  const formatDate = (iso: string) => {
    if (!iso) return ''
    const parts = iso.split('-')
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`
    }
    return iso
  }

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-5xl mx-auto animate-fade-in-up">
      {/* Cabeçalho */}
      <div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
            Agenda de Disponibilidade • Mentor MWS
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 mt-1">
          Disponibilidade de Agenda
        </h1>
        <p className="text-slate-500 text-sm mt-0.5">
          Marque períodos de indisponibilidade como num booking de hotel. O ecossistema oculta seu
          nome para o ortodontista nas datas em que você estiver ausente.
        </p>
      </div>

      {/* Regra de Negócio Explícita */}
      <Card className="border-amber-200 bg-amber-50/50 shadow-xs">
        <CardContent className="p-4 flex items-start gap-3">
          <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-950 space-y-1">
            <h4 className="font-bold text-sm text-amber-900">
              Regra de Alocação de Casos & SLA de 72h
            </h4>
            <p className="leading-relaxed">
              Quando você marca um período indisponível (ex: viagem, congresso ou cirurgias),{' '}
              <strong>
                nenhum ortodontista poderá escolher você na abertura de casos com data de entrada
                dentro do seu intervalo
              </strong>
              . Se você estiver disponível, seu nome fica ativo na seleção e na distribuição da
              esteira técnica.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Formulário: Registrar Indisponibilidade */}
        <Card className="md:col-span-1 border-slate-200 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
              <CalendarIcon className="w-4 h-4 text-emerald-600" />
              Bloquear Período
            </CardTitle>
            <CardDescription className="text-xs text-slate-500">
              Informe a data de início e fim da sua indisponibilidade.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddPeriod} className="space-y-3.5 text-xs">
              <div className="space-y-1">
                <label htmlFor="unav-start" className="font-semibold text-slate-700 block">
                  Data de Início *
                </label>
                <Input
                  id="unav-start"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                  className="h-9 text-xs"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="unav-end" className="font-semibold text-slate-700 block">
                  Data de Término *
                </label>
                <Input
                  id="unav-end"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                  className="h-9 text-xs"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="unav-reason" className="font-semibold text-slate-700 block">
                  Motivo / Observação (opcional)
                </label>
                <textarea
                  id="unav-reason"
                  rows={2}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Ex: Congresso Internacional, férias ou cirurgias"
                  className="w-full rounded-md border border-input bg-background p-2 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs h-9 mt-1"
              >
                <Plus className="w-4 h-4 mr-1" /> Marcar Indisponibilidade
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Lista de Períodos Marcados */}
        <Card className="md:col-span-2 border-slate-200 shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-600" />
                  Períodos Bloqueados ({periods.length})
                </CardTitle>
                <CardDescription className="text-xs text-slate-500">
                  Intervalos em que você não receberá novos casos clínicos do ecossistema.
                </CardDescription>
              </div>
              <Badge className="bg-slate-100 text-slate-800 border-slate-300 text-xs">
                {CURRENT_MENTOR.name}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {periods.map((p) => (
              <div
                key={p.id}
                className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-500" />
                      Do dia {formatDate(p.startDate)} ao dia {formatDate(p.endDate)}
                    </span>
                    <Badge
                      variant="outline"
                      className="text-[10px] text-amber-800 border-amber-300 bg-amber-50"
                    >
                      Indisponível
                    </Badge>
                  </div>
                  {p.reason && <p className="text-xs text-slate-600 pl-3.5 italic">“{p.reason}”</p>}
                  <span className="text-[10px] text-slate-400 pl-3.5 block">
                    Registrado em: {formatDate(p.createdAt)}
                  </span>
                </div>

                <Button
                  size="sm"
                  variant="outline"
                  className="text-xs h-8 text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 self-start sm:self-center"
                  onClick={() => handleRemovePeriod(p.id)}
                >
                  <Trash2 className="w-3.5 h-3.5 mr-1" /> Remover Bloqueio
                </Button>
              </div>
            ))}

            {periods.length === 0 && (
              <div className="text-center py-12 px-4 rounded-xl border border-dashed border-slate-200 bg-slate-50/50 space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
                <h4 className="font-bold text-slate-800 text-xs">Agenda 100% Disponível</h4>
                <p className="text-slate-500 text-xs max-w-sm mx-auto">
                  Você não possui nenhum período de bloqueio ativo. Seu perfil aparece como opção
                  para ortodontistas em todas as datas de abertura de casos.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
