import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export default function AdminLab() {
  return (
    <div className="p-6 md:p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Laboratório MWS</h1>
        <p className="text-slate-500 mt-1">Gestão da esteira de produção de casos clínicos.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
        {/* Kanban Columns */}
        {[
          { title: 'Em Análise', count: 12, bg: 'bg-amber-50' },
          { title: 'Em Produção', count: 4, bg: 'bg-blue-50' },
          { title: 'Entregues', count: 38, bg: 'bg-emerald-50' },
        ].map((col, i) => (
          <div key={i} className={`rounded-xl border border-slate-200 ${col.bg} p-4 flex flex-col`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-800">{col.title}</h3>
              <Badge variant="secondary">{col.count}</Badge>
            </div>

            {i === 0 && (
              <Card className="mb-3 cursor-grab active:cursor-grabbing border-l-4 border-l-amber-500 shadow-sm">
                <CardContent className="p-4">
                  <div className="text-xs text-slate-500 mb-1">ID: u39f82nf92</div>
                  <div className="font-medium text-slate-900 mb-2">Dr. Aline Costa</div>
                  <div className="flex justify-between items-center">
                    <Badge variant="outline" className="text-[10px]">
                      Protocolo Std
                    </Badge>
                    <span className="text-xs text-red-500 font-medium">SLA: Hoje</span>
                  </div>
                </CardContent>
              </Card>
            )}

            {i === 1 && (
              <Card className="mb-3 cursor-grab active:cursor-grabbing border-l-4 border-l-blue-500 shadow-sm">
                <CardContent className="p-4">
                  <div className="text-xs text-slate-500 mb-1">ID: k92m3nf832</div>
                  <div className="font-medium text-slate-900 mb-2">Dr. Bruno Souza</div>
                  <div className="flex justify-between items-center">
                    <Badge variant="outline" className="text-[10px]">
                      Avançado
                    </Badge>
                    <span className="text-xs text-slate-500">SLA: D+2</span>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="mt-auto pt-4 text-center">
              <Button
                variant="ghost"
                size="sm"
                className="w-full text-slate-400 border border-dashed border-slate-300"
              >
                + Adicionar Cartão
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
