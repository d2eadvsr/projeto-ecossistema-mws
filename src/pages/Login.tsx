import { useState } from 'react'
import { Navigate, useNavigate, useLocation, Link } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { extractFieldErrors, getErrorMessage, type FieldErrors } from '@/lib/pocketbase/errors'
import { AlertCircle } from 'lucide-react'

export default function Login() {
  const { isAuthenticated, signIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [generalError, setGeneralError] = useState('')

  const from = (location.state as { from?: { pathname?: string } })?.from?.pathname || '/dashboard'

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setFieldErrors({})
    setGeneralError('')

    const { error } = await signIn(email, password)
    setIsLoading(false)

    if (error) {
      const errors = extractFieldErrors(error)
      if (Object.keys(errors).length > 0) {
        setFieldErrors(errors)
      } else {
        setGeneralError(getErrorMessage(error))
      }
      return
    }

    navigate(from, { replace: true })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <Card className="w-full max-w-md shadow-elevation">
        <CardHeader className="space-y-1 flex flex-col items-center text-center pb-8">
          <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mb-4">
            <span className="text-3xl text-white font-bold">M</span>
          </div>
          <CardTitle className="text-2xl font-bold">Magic Wire System</CardTitle>
          <CardDescription>Acesse o ecossistema digital</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            {generalError && (
              <div className="flex items-center gap-2 p-3 rounded-md bg-destructive/10 text-destructive text-sm animate-fade-in">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{generalError}</span>
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="nome@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-invalid={!!fieldErrors.email}
              />
              {fieldErrors.email && <p className="text-sm text-destructive">{fieldErrors.email}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                aria-invalid={!!fieldErrors.password}
              />
              {fieldErrors.password && (
                <p className="text-sm text-destructive">{fieldErrors.password}</p>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Entrando...' : 'Entrar na Plataforma'}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Não tem conta?{' '}
            <Link to="/signup" className="font-semibold text-primary hover:underline">
              Cadastre-se
            </Link>
          </p>

          <div className="mt-6 p-4 bg-muted rounded-lg text-sm text-muted-foreground">
            <p className="font-semibold mb-1">Contas de Teste:</p>
            <ul className="space-y-1">
              <li>Admin: daniel.elias@d2eadvisory.com.br</li>
              <li>Dentista: dentist@magicwire.com</li>
              <li>Paciente: patient@magicwire.com</li>
              <li>Lab: lab@magicwire.com</li>
            </ul>
            <p className="mt-2 text-xs">Senha padrão: Skip@Pass</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
