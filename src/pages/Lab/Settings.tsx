import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Settings, Cpu, Save, CheckCircle2, Building2, Mail, Bell, Sliders } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { MOCK_LAB_SETTINGS } from './mockData'

export default function LabSettings() {
  const [settings, setSettings] = useState(MOCK_LAB_SETTINGS)
  const { toast } = useToast()

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: 'Configurações Salvas!',
      description: 'As preferências operacionais do laboratório MWS foram atualizadas com sucesso.',
    })
  }

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-5xl mx-auto animate-fade-in-up">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
            Configurações do Laboratório MWS
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">
            Dados cadastrais do laboratório, parâmetros de capacidade produtiva e preferências de
            notificação.
          </p>
        </div>

        <Button
          onClick={handleSave}
          className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs"
        >
          <Save className="w-3.5 h-3.5 mr-1.5" /> Salvar Preferências
        </Button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Seção 1: Dados do Laboratório */}
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-emerald-600" />
              Identificação & Dados Cadastrais
            </CardTitle>
            <CardDescription className="text-xs text-slate-500">
              Informações institucionais da unidade de produção robótica central.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="labName" className="text-xs font-semibold text-slate-700">
                  Nome do Laboratório / Unidade
                </Label>
                <Input
                  id="labName"
                  value={settings.labName}
                  onChange={(e) => setSettings({ ...settings, labName: e.target.value })}
                  className="text-xs h-9"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="cnpj" className="text-xs font-semibold text-slate-700">
                  CNPJ
                </Label>
                <Input
                  id="cnpj"
                  value={settings.cnpj}
                  onChange={(e) => setSettings({ ...settings, cnpj: e.target.value })}
                  className="text-xs h-9"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="responsible" className="text-xs font-semibold text-slate-700">
                  Responsáveis Técnicos
                </Label>
                <Input
                  id="responsible"
                  value={settings.responsibleOfficer}
                  onChange={(e) => setSettings({ ...settings, responsibleOfficer: e.target.value })}
                  className="text-xs h-9"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="address" className="text-xs font-semibold text-slate-700">
                  Endereço da Unidade Fabril
                </Label>
                <Input
                  id="address"
                  value={settings.address}
                  onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                  className="text-xs h-9"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Seção 2: Capacidade de Produção Robótica */}
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-emerald-600" />
              Capacidade de Produção Robótica
            </CardTitle>
            <CardDescription className="text-xs text-slate-500">
              Dimensionamento diário das células de dobragem e manufatura de fios linguais.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <Label className="text-xs font-bold text-slate-800">
                  Capacidade Diária de Fios Mágicos
                </Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    value={settings.dailyWireCapacity}
                    onChange={(e) =>
                      setSettings({ ...settings, dailyWireCapacity: Number(e.target.value) })
                    }
                    className="text-xs h-9 w-24 bg-white"
                  />
                  <span className="text-slate-500 text-xs">fios/dia</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Base atual de planejamento de capacidade da esteira.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <Label className="text-xs font-bold text-slate-800">Células Robóticas Ativas</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    value={settings.roboticCellsCount}
                    onChange={(e) =>
                      setSettings({ ...settings, roboticCellsCount: Number(e.target.value) })
                    }
                    className="text-xs h-9 w-24 bg-white"
                  />
                  <span className="text-slate-500 text-xs">células CNC</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Braços robóticos 6 eixos KUKA-MW dedicados.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <Label className="text-xs font-bold text-slate-800">Técnicos & Mentores</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    value={settings.activeTechnicians}
                    onChange={(e) =>
                      setSettings({ ...settings, activeTechnicians: Number(e.target.value) })
                    }
                    className="text-xs h-9 w-24 bg-white"
                  />
                  <span className="text-slate-500 text-xs">profissionais</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Equipe alocada nos 54 casos da esteira ativa.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Seção 3: Preferências de Notificação e SLA */}
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Bell className="w-4 h-4 text-emerald-600" />
              Notificações e Alertas de SLA
            </CardTitle>
            <CardDescription className="text-xs text-slate-500">
              Configurações de disparo automático para o time do laboratório e mentores.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-xs">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg border border-slate-200 bg-white">
                <div>
                  <p className="font-semibold text-slate-900">
                    Notificar por E-mail na Abertura de Novo Caso Clínico
                  </p>
                  <p className="text-slate-500 text-[11px]">
                    Dispara alerta imediato aos técnicos de triagem quando um ortodontista submete
                    um caso.
                  </p>
                </div>
                <Switch
                  checked={settings.emailNotificationsOnNewCase}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, emailNotificationsOnNewCase: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg border border-slate-200 bg-white">
                <div>
                  <p className="font-semibold text-slate-900">
                    Notificar Mentor na Devolutiva do Ortodontista
                  </p>
                  <p className="text-slate-500 text-[11px]">
                    Avisa quando o ortodontista aprova ou solicita ajustes no planejamento entregue.
                  </p>
                </div>
                <Switch
                  checked={settings.emailNotificationsOnFeedback}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, emailNotificationsOnFeedback: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg border border-slate-200 bg-white">
                <div>
                  <p className="font-semibold text-slate-900">
                    Alerta Crítico por SMS/WhatsApp em Estouro de SLA
                  </p>
                  <p className="text-slate-500 text-[11px]">
                    Aciona a coordenação técnica e mentores caso o tempo de análise exceda 24 horas.
                  </p>
                </div>
                <Switch
                  checked={settings.smsAlertOnSlaBreach}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, smsAlertOnSlaBreach: checked })
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}
