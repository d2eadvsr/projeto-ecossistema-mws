import { PlaceholderPage } from '@/components/PlaceholderPage'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Link } from 'react-router-dom'
import {
  Settings,
  Bell,
  Lock,
  UserCheck,
  Shield,
  Save,
  CheckCircle2,
  FileText,
  ExternalLink,
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export default function DentistSettings() {
  const { toast } = useToast()
  const [notifyWhatsApp, setNotifyWhatsApp] = useState(true)
  const [notifyEmail, setNotifyEmail] = useState(true)
  const [notifyLabUpdates, setNotifyLabUpdates] = useState(true)
  const [autoApproveStandard, setAutoApproveStandard] = useState(false)

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: 'Configurações Salvas!',
      description: 'Suas preferências de conta e notificações foram atualizadas.',
    })
  }

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-4xl mx-auto animate-fade-in-up">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
          Configurações da Conta
        </h1>
        <p className="text-slate-500 mt-1">
          Gerencie suas preferências de notificação, credenciamento e integrações clínicas.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Status de Credenciamento & Onboarding */}
        <Card className="border-emerald-200 bg-emerald-50/50 shadow-sm">
          <CardContent className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-900">Credenciamento Digital MWS</h3>
                <Badge className="bg-emerald-600 text-white">Ativo & Validado</Badge>
              </div>
              <p className="text-xs text-slate-600">
                Seu contrato CLM e documentos do CRO estão aprovados para prescrição dos
                alinhadores.
              </p>
            </div>

            <Link to="/dentist/onboarding">
              <Button
                variant="outline"
                size="sm"
                className="border-emerald-300 text-emerald-800 bg-white"
              >
                <FileText className="w-4 h-4 mr-1.5 text-emerald-600" /> Rever Onboarding
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Notificações */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Bell className="w-5 h-5 text-emerald-600" /> Preferências de Notificação
            </CardTitle>
            <CardDescription>
              Escolha como deseja ser avisado sobre o progresso dos casos
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <label className="flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-slate-50/50 cursor-pointer hover:bg-slate-50">
              <div className="space-y-0.5">
                <span className="text-sm font-semibold text-slate-900">Alertas via WhatsApp</span>
                <p className="text-xs text-slate-500">
                  Receber mensagem quando o laboratório enviar um novo setup 3D
                </p>
              </div>
              <input
                type="checkbox"
                checked={notifyWhatsApp}
                onChange={(e) => setNotifyWhatsApp(e.target.checked)}
                className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-slate-50/50 cursor-pointer hover:bg-slate-50">
              <div className="space-y-0.5">
                <span className="text-sm font-semibold text-slate-900">
                  E-mail Diário com Resumo da Agenda
                </span>
                <p className="text-xs text-slate-500">
                  Lista de pacientes confirmados do dia seguinte às 18h
                </p>
              </div>
              <input
                type="checkbox"
                checked={notifyEmail}
                onChange={(e) => setNotifyEmail(e.target.checked)}
                className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-slate-50/50 cursor-pointer hover:bg-slate-50">
              <div className="space-y-0.5">
                <span className="text-sm font-semibold text-slate-900">
                  Atualizações de Rastreio e Entrega
                </span>
                <p className="text-xs text-slate-500">
                  Notificar quando o alinhador for despachado para a clínica
                </p>
              </div>
              <input
                type="checkbox"
                checked={notifyLabUpdates}
                onChange={(e) => setNotifyLabUpdates(e.target.checked)}
                className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
              />
            </label>
          </CardContent>
        </Card>

        {/* Segurança */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Lock className="w-5 h-5 text-slate-700" /> Segurança da Conta
            </CardTitle>
            <CardDescription>Atualização de senha e autenticação em dois fatores</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="curr-pass">Senha Atual</Label>
                <Input id="curr-pass" type="password" placeholder="••••••••" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-pass">Nova Senha</Label>
                <Input id="new-pass" type="password" placeholder="••••••••" />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
            <Save className="w-4 h-4 mr-2" /> Salvar Preferências
          </Button>
        </div>
      </form>
    </div>
  )
}
