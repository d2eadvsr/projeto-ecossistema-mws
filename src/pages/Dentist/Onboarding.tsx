import { useState } from 'react'
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
import { Progress } from '@/components/ui/progress'
import { Check, UploadCloud } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { logEvent } from '@/services/events'

export default function DentistOnboarding() {
  const [step, setStep] = useState(1)
  const { toast } = useToast()

  const handleNext = () => {
    if (step < 3) setStep(step + 1)
    else {
      toast({
        title: 'Onboarding Concluído',
        description: 'Seus documentos estão em análise. SLA: 48h.',
      })
      logEvent('license.activated', { status: 'pending_review' })
      setStep(4)
    }
  }

  return (
    <div className="p-6 md:p-8 max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Onboarding Digital</h1>
        <p className="text-slate-500 mt-1">Complete seu cadastro para operar na rede MWS.</p>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm font-medium text-slate-500">
          <span>Passo {Math.min(step, 3)} de 3</span>
          <span>{Math.min(step * 33.3, 100).toFixed(0)}%</span>
        </div>
        <Progress value={step * 33.3} className="h-2 bg-slate-100" />
      </div>

      <Card className="shadow-subtle">
        {step === 1 && (
          <>
            <CardHeader>
              <CardTitle>Dados Profissionais</CardTitle>
              <CardDescription>Validação do Conselho Regional de Odontologia</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>CRO</Label>
                <Input placeholder="Ex: CRO-SP 12345" />
              </div>
              <div className="space-y-2">
                <Label>Especialidade</Label>
                <Input placeholder="Ortodontia" defaultValue="Ortodontia" />
              </div>
            </CardContent>
          </>
        )}

        {step === 2 && (
          <>
            <CardHeader>
              <CardTitle>Documentação</CardTitle>
              <CardDescription>Upload de documentos obrigatórios</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:bg-slate-50 transition-colors cursor-pointer">
                <UploadCloud className="h-8 w-8 text-slate-400 mx-auto mb-3" />
                <p className="text-sm font-medium text-slate-900">
                  Clique para enviar ou arraste os arquivos
                </p>
                <p className="text-xs text-slate-500 mt-1">Diploma e CRO (PDF, JPG, PNG)</p>
              </div>
            </CardContent>
          </>
        )}

        {step === 3 && (
          <>
            <CardHeader>
              <CardTitle>Contrato de Licenciamento (CLM)</CardTitle>
              <CardDescription>Assinatura digital via parceiro integrado</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-50 p-4 rounded-lg text-sm text-slate-600 mb-4">
                Ao clicar em finalizar, você assinará digitalmente o contrato de parceria Magic Wire
                System.
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="terms"
                  className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                />
                <Label htmlFor="terms">Li e concordo com os termos de licenciamento.</Label>
              </div>
            </CardContent>
          </>
        )}

        {step === 4 && (
          <div className="text-center py-12 px-6">
            <div className="mx-auto w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
              <Check className="h-8 w-8" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Tudo Certo!</h3>
            <p className="text-slate-500 mb-6 max-w-md mx-auto">
              Sua documentação foi enviada. Nosso time irá analisar e sua licença será ativada em
              até 48 horas.
            </p>
          </div>
        )}

        {step < 4 && (
          <CardFooter className="flex justify-end border-t border-slate-100 pt-6">
            <Button onClick={handleNext} className="bg-emerald-600 hover:bg-emerald-700">
              {step === 3 ? 'Assinar e Finalizar' : 'Próximo Passo'}
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  )
}
