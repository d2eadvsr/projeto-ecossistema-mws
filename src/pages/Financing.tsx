import { useState } from 'react'
import { simulateCredit } from '@/services/api'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'

export default function Financing() {
  const [amount, setAmount] = useState('5000')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)

  const handleSimulate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setResult(null)
    try {
      const res = await simulateCredit(Number(amount))
      setResult(res)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto animate-fade-in-up">
      <h2 className="text-3xl font-bold tracking-tight">Financiamento Parceiro</h2>
      <p className="text-muted-foreground">
        Simule o crédito para o seu tratamento ortodôntico de forma 100% digital e sem burocracia.
      </p>

      <Card>
        <form onSubmit={handleSimulate}>
          <CardHeader>
            <CardTitle>Simulador de Crédito</CardTitle>
            <CardDescription>Análise instantânea (SLA &lt; 5 min)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Valor estimado do tratamento (R$)</Label>
              <Input
                type="number"
                min="500"
                step="100"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Analisando via Fintech...' : 'Solicitar Análise'}
            </Button>
          </CardFooter>
        </form>
      </Card>

      {result && (
        <Card
          className={`border-l-4 animate-slide-up ${result.status === 'approved' ? 'border-l-primary' : 'border-l-destructive'}`}
        >
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Resultado da Análise</CardTitle>
              <Badge variant={result.status === 'approved' ? 'default' : 'destructive'}>
                {result.status === 'approved' ? 'Aprovado' : 'Recusado'}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-medium">{result.message}</p>
            {result.status === 'approved' && (
              <div className="mt-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
                <p className="text-sm font-semibold mb-2">Opções de Parcelamento:</p>
                <div className="flex gap-2">
                  {result.installments.map((inst: number) => (
                    <Badge key={inst} variant="outline" className="bg-white">
                      {inst}x de R$ {((Number(amount) * 1.1) / inst).toFixed(2)}
                    </Badge>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-4">
                  *Taxa de juros simulada de 1.5% a.m.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
