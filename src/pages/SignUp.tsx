import { useState } from 'react'
import { Navigate, useNavigate, Link } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { extractFieldErrors, getErrorMessage, type FieldErrors } from '@/lib/pocketbase/errors'
import { AlertCircle } from 'lucide-react'
import { MWSLogo } from '@/components/MWSLogo'

export default function SignUp() {
  const { isAuthenticated, signUp } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [generalError, setGeneralError] = useState('')

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setFieldErrors({})
    setGeneralError('')

    if (password !== passwordConfirm) {
      setFieldErrors({ passwordConfirm: 'As senhas não coincidem.' })
      setIsLoading(false)
      return
    }

    if (password.length < 8) {
      setFieldErrors({ password: 'A senha deve ter no mínimo 8 caracteres.' })
      setIsLoading(false)
      return
    }

    const { error } = await signUp(email, password, name)
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

    navigate('/dashboard', { replace: true })
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 font-sans">
      {/* Testeira Superior Oficial MWS */}
      <header className="w-full mws-header-gradient border-b border-[#153e32] px-6 py-4 shadow-md flex items-center justify-between">
        <MWSLogo symbolSize={38} variant="gold-gradient" />
        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-300">
          <span className="w-2 h-2 rounded-full bg-gold" />
          <span>Cadastro no Ecossistema MWS</span>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center p-4 py-8">
        <Card className="w-full max-w-md shadow-elevation bg-white border-slate-200">
          <CardHeader className="space-y-1 flex flex-col items-center text-center pb-6">
            <MWSLogo symbolSize={44} showWordmark={false} />
            <CardTitle className="text-2xl font-bold text-slate-900 mt-2">Criar Conta</CardTitle>
            <CardDescription className="text-slate-500 text-xs sm:text-sm">
              Cadastre-se na plataforma Magic Wire System
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignUp} className="space-y-4">
              {generalError && (
                <div className="flex items-center gap-2 p-3 rounded-md bg-destructive/10 text-destructive text-sm animate-fade-in">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{generalError}</span>
                </div>
              )}
              <div className="space-y-1.5">
                <Label htmlFor="name" className="text-xs font-semibold text-slate-900">
                  Nome Completo
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Seu nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  aria-invalid={!!fieldErrors.name}
                  className="h-10 border-slate-200 focus-visible:ring-gold"
                />
                {fieldErrors.name && <p className="text-xs text-destructive">{fieldErrors.name}</p>}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-xs font-semibold text-slate-900">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="nome@exemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  aria-invalid={!!fieldErrors.email}
                  className="h-10 border-slate-200 focus-visible:ring-gold"
                />
                {fieldErrors.email && (
                  <p className="text-xs text-destructive">{fieldErrors.email}</p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-xs font-semibold text-slate-900">
                  Senha
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Mínimo 8 caracteres"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  aria-invalid={!!fieldErrors.password}
                  className="h-10 border-slate-200 focus-visible:ring-gold"
                />
                {fieldErrors.password && (
                  <p className="text-xs text-destructive">{fieldErrors.password}</p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="passwordConfirm" className="text-xs font-semibold text-slate-900">
                  Confirmar Senha
                </Label>
                <Input
                  id="passwordConfirm"
                  type="password"
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  required
                  aria-invalid={!!fieldErrors.passwordConfirm}
                  className="h-10 border-slate-200 focus-visible:ring-gold"
                />
                {fieldErrors.passwordConfirm && (
                  <p className="text-xs text-destructive">{fieldErrors.passwordConfirm}</p>
                )}
              </div>
              <Button
                type="submit"
                className="w-full h-11 bg-primary hover:bg-[#082019] text-white font-semibold text-sm transition-all shadow-md mt-2 border border-gold/30 hover:border-gold"
                disabled={isLoading}
              >
                {isLoading ? 'Cadastrando...' : 'Criar Conta no Ecossistema'}
              </Button>
            </form>

            <p className="mt-6 text-center text-xs text-slate-500">
              Já tem conta?{' '}
              <Link
                to="/login"
                className="font-semibold text-primary hover:text-[#082019] hover:underline"
              >
                Faça login
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Rodapé Oficial MWS */}
      <footer className="w-full bg-[#061712] border-t border-[#12382d] py-3 px-6 text-center text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-gold" />
          <span className="text-slate-300 font-semibold">Magic Wire System</span>
          <span className="text-slate-500">•</span>
          <span>A Verdadeira Ortodontia Invisível</span>
        </div>
        <p className="text-[11px] text-slate-400">
          2026 - Todos os direitos reservados | Magic Wire
        </p>
      </footer>
    </div>
  )
}
