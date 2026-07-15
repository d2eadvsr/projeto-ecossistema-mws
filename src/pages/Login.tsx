import { useState } from 'react'
import { Navigate, useNavigate, useLocation, Link } from 'react-router-dom'
import { ClientResponseError } from 'pocketbase'
import { useAuth } from '@/hooks/use-auth'
import { useToast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle, Eye, EyeOff, Loader2 } from 'lucide-react'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Login() {
  const { isAuthenticated, signIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const { toast } = useToast()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const from = (location.state as { from?: { pathname?: string } })?.from?.pathname || '/dashboard'

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  const isEmailValid = EMAIL_REGEX.test(email)
  const isFormValid = isEmailValid && password.length > 0

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isFormValid) return

    setIsLoading(true)
    setError('')

    const { error: signInError } = await signIn(email, password)
    setIsLoading(false)

    if (signInError) {
      if (signInError instanceof ClientResponseError) {
        if (signInError.status === 0) {
          setError('Erro de conexão. Tente novamente mais tarde.')
        } else if (signInError.status === 400 || signInError.status === 401) {
          setError('E-mail ou senha inválidos')
        } else {
          toast({
            title: 'Erro',
            description: signInError.message || 'Ocorreu um erro inesperado.',
            variant: 'destructive',
          })
        }
      } else {
        toast({
          title: 'Erro',
          description: 'Ocorreu um erro inesperado.',
          variant: 'destructive',
        })
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
            {error && (
              <div className="flex items-center gap-2 p-3 rounded-md bg-destructive/10 text-destructive text-sm animate-fade-in">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="nome@exemplo.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  setError('')
                }}
                required
                aria-invalid={email.length > 0 && !isEmailValid}
              />
              {email.length > 0 && !isEmailValid && (
                <p className="text-sm text-destructive">Formato de e-mail inválido.</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    setError('')
                  }}
                  required
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading || !isFormValid}>
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Entrando...
                </>
              ) : (
                'Entrar'
              )}
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
