import { useState } from 'react'
import { generateMarketingContent } from '@/services/api'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Sparkles } from 'lucide-react'

export default function Marketing() {
  const [topic, setTopic] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  const handleGenerate = async () => {
    if (!topic) return
    setLoading(true)
    try {
      const res = await generateMarketingContent(topic)
      setResult(res.content)
    } catch (e) {
      setResult('Erro ao gerar conteúdo. Verifique se a IA Gateway está configurada.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto animate-fade-in-up">
      <h2 className="text-3xl font-bold tracking-tight">Gerador de Conteúdo MKT</h2>
      <p className="text-muted-foreground">
        Utilize IA Generativa para criar posts engajadores para suas redes sociais.
      </p>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" /> Novo Post
          </CardTitle>
          <CardDescription>
            Descreva o tema do seu próximo post (ex: benefícios do alinhador invisível)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-3">
            <Input
              placeholder="Ex: Como higienizar o aparelho"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleGenerate} disabled={loading || !topic}>
              {loading ? 'Gerando...' : 'Gerar Texto'}
            </Button>
          </div>

          {result && (
            <div className="mt-6 space-y-2 animate-fade-in">
              <label className="text-sm font-medium">Resultado Gerado:</label>
              <Textarea value={result} readOnly className="min-h-[200px] bg-muted/50 resize-none" />
              <p className="text-xs text-muted-foreground text-right">
                Copiado para área de transferência (simulado)
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
