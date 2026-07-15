import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Search, Filter } from 'lucide-react'
import { getDentistCases, createCase } from '@/services/cases'
import { getDentistByUserId } from '@/services/dentists'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { logEvent } from '@/services/events'
import { format } from 'date-fns'

export default function DentistCases() {
  const { user } = useAuth()
  const [cases, setCases] = useState<any[]>([])
  const [dentist, setDentist] = useState<any>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { toast } = useToast()

  const loadCases = async () => {
    if (!user) return
    try {
      const d = await getDentistByUserId(user.id)
      setDentist(d)
      const c = await getDentistCases(d.id)
      setCases(c)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    loadCases()
  }, [user])

  const handleCreateCase = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const formData = new FormData(e.target as HTMLFormElement)
      // Mock patient ID for MVP
      const newCase = await createCase({
        dentist: dentist.id,
        patient: '111111111111111', // Need actual patient select in real app
        status: 'analyzing',
        sla_deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      })

      logEvent('case.opened', { case_id: newCase.id })
      toast({ title: 'Caso aberto com sucesso' })
      setIsDialogOpen(false)
      loadCases()
    } catch (error) {
      toast({ title: 'Erro ao abrir caso', variant: 'destructive' })
    }
  }

  return (
    <div className="p-6 md:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Casos Clínicos</h1>
          <p className="text-slate-500 mt-1">Gerencie seus planejamentos ortodônticos.</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="h-4 w-4 mr-2" /> Novo Caso
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Abertura de Caso Clínico</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateCase} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label>Nome do Paciente</Label>
                <Input name="patient_name" required placeholder="Digite o nome" />
              </div>
              <div className="space-y-2">
                <Label>Protocolo MW</Label>
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                  <option>Protocolo Standard</option>
                  <option>Protocolo Avançado</option>
                </select>
              </div>
              <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">
                Criar Demanda
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-2 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <Input placeholder="Buscar por paciente ou ID..." className="pl-9" />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid gap-4">
        {cases.map((c) => (
          <Card key={c.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <CardContent className="p-0">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6 gap-4">
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-mono text-slate-400">ID: {c.id}</span>
                  <h3 className="font-semibold text-lg text-slate-900">
                    {c.expand?.patient?.name || 'Paciente Demo'}
                  </h3>
                  <span className="text-sm text-slate-500">
                    SLA: {format(new Date(c.sla_deadline), 'dd/MM/yyyy')}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <Badge
                    className={
                      c.status === 'delivered'
                        ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-100'
                        : c.status === 'production'
                          ? 'bg-blue-100 text-blue-800 hover:bg-blue-100'
                          : 'bg-amber-100 text-amber-800 hover:bg-amber-100'
                    }
                  >
                    {c.status === 'analyzing'
                      ? 'Em Análise'
                      : c.status === 'production'
                        ? 'Em Produção'
                        : 'Entregue'}
                  </Badge>
                  <Button variant="outline" size="sm">
                    Ver Detalhes
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {cases.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-300">
            <p className="text-slate-500">Nenhum caso clínico encontrado.</p>
          </div>
        )}
      </div>
    </div>
  )
}
