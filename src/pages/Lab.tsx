import { useEffect, useState } from 'react'
import { getCases, updateCaseStatus } from '@/services/api'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import useRealtime from '@/hooks/use-realtime'

export default function Lab() {
  const [cases, setCases] = useState<any[]>([])
  const { toast } = useToast()

  const loadData = () => {
    getCases().then(setCases)
  }

  useEffect(() => {
    loadData()
  }, [])
  useRealtime('clinical_cases', loadData)

  const handleMove = async (id: string, newStatus: string) => {
    try {
      await updateCaseStatus(id, newStatus)
      toast({ title: 'Status Atualizado', description: `Caso movido para ${newStatus}` })
    } catch (e) {
      toast({
        title: 'Erro',
        description: 'Não foi possível atualizar o caso.',
        variant: 'destructive',
      })
    }
  }

  const analyzing = cases.filter((c) => c.status === 'analyzing')
  const production = cases.filter((c) => c.status === 'in_production')

  const Column = ({ title, items, nextStatus, nextLabel }: any) => (
    <Card className="bg-slate-50 border-dashed">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex justify-between items-center">
          {title}
          <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
            {items.length}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {items.map((c: any) => (
          <Card key={c.id} className="shadow-sm">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <span className="font-mono text-xs font-semibold">{c.id.substring(0, 8)}</span>
                <span className="text-xs text-muted-foreground">
                  {new Date(c.sla_deadline).toLocaleDateString('pt-BR')}
                </span>
              </div>
              <p className="text-sm mb-4 line-clamp-2">{c.notes}</p>
              {nextStatus ? (
                <Button
                  size="sm"
                  className="w-full text-xs"
                  onClick={() => handleMove(c.id, nextStatus)}
                >
                  {nextLabel} <ArrowRight className="w-3 h-3 ml-2" />
                </Button>
              ) : (
                <div className="flex items-center justify-center text-sm text-primary font-medium p-2 bg-primary/5 rounded">
                  <CheckCircle2 className="w-4 h-4 mr-2" /> Finalizado
                </div>
              )}
            </CardContent>
          </Card>
        ))}
        {items.length === 0 && (
          <div className="text-center text-sm text-muted-foreground py-8">Vazio</div>
        )}
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-fade-in-up h-full flex flex-col">
      <h2 className="text-3xl font-bold tracking-tight">Operação do Laboratório</h2>
      <div className="grid md:grid-cols-3 gap-6 flex-1">
        <Column
          title="Na Fila (Análise)"
          items={analyzing}
          nextStatus="in_production"
          nextLabel="Iniciar Produção"
        />
        <Column
          title="Em Produção"
          items={production}
          nextStatus="delivered"
          nextLabel="Marcar como Entregue"
        />
        <Column
          title="Entregues (Recentes)"
          items={cases.filter((c) => c.status === 'delivered').slice(0, 5)}
        />
      </div>
    </div>
  )
}
