import { useAuth } from '@/hooks/use-auth'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { MapPin, MessageSquare, CreditCard, Activity } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function PatientDashboard() {
  const { user } = useAuth()

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
          <Activity className="h-8 w-8" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Olá, {user?.name}</h1>
          <p className="text-slate-500">Bem-vindo(a) ao seu tratamento Magic Wire.</p>
        </div>
      </div>

      <Card className="border-0 shadow-elevation bg-emerald-600 text-white">
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold text-lg">Progresso do Tratamento</span>
            <span className="font-bold">40%</span>
          </div>
          <Progress value={40} className="h-3 bg-emerald-800" indicatorClassName="bg-white" />
          <p className="text-sm text-emerald-100 mt-4">
            Fase 2 de 5 • Próxima consulta em 12 dias.
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="hover:border-emerald-200 transition-colors cursor-pointer">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
              <MessageSquare className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Falar com Dentista</h3>
              <p className="text-sm text-slate-500">Chat integrado e envio de fotos</p>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:border-emerald-200 transition-colors cursor-pointer">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center">
              <CreditCard className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Financiamento</h3>
              <p className="text-sm text-slate-500">Parcelas e simulações</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="bg-slate-100 rounded-xl p-6 text-center">
        <h3 className="font-semibold text-slate-900 mb-2">Avalie sua última consulta</h3>
        <p className="text-sm text-slate-500 mb-4">
          Sua opinião nos ajuda a garantir o KBI de qualidade (NPS).
        </p>
        <div className="flex justify-center gap-4">
          <Button variant="outline" className="text-2xl h-14 w-14 rounded-full bg-white">
            😠
          </Button>
          <Button variant="outline" className="text-2xl h-14 w-14 rounded-full bg-white">
            😐
          </Button>
          <Button variant="outline" className="text-2xl h-14 w-14 rounded-full bg-white">
            😃
          </Button>
        </div>
      </div>
    </div>
  )
}
