import { useState } from 'react'
import { Navigate, useNavigate, useLocation, Link } from 'react-router-dom'
import { ClientResponseError } from 'pocketbase'
import { useAuth } from '@/hooks/use-auth'
import pb from '@/lib/pocketbase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AlertCircle, Eye, EyeOff, Loader2 } from 'lucide-react'
import { MWSLogo } from '@/components/MWSLogo'

export default function Login() {
  const { isAuthenticated, signIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('adm_mws')
  const [password, setPassword] = useState('Skip@Pass')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const from = (location.state as { from?: { pathname?: string } })?.from?.pathname || '/dashboard'

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  const isFormValid = email.length > 0 && password.length > 0

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isFormValid) return

    setIsLoading(true)
    setError('')

    const credential = email.trim() === 'adm_mws' ? 'daniel.elias@d2eadvisory.com.br' : email
    const { error: signInError } = await signIn(credential, password)
    setIsLoading(false)

    if (signInError) {
      if (signInError instanceof ClientResponseError) {
        if (signInError.status === 0) {
          setError('Erro de conexão. Tente novamente mais tarde.')
        } else {
          setError('E-mail ou senha inválidos')
        }
      } else {
        setError('E-mail ou senha inválidos')
      }
      return
    }

    const role = pb.authStore.record?.['role']
    if (role === 'dentist') {
      navigate('/dashboard/dentist', { replace: true })
    } else if (role === 'patient') {
      navigate('/dashboard/patient', { replace: true })
    } else if (role === 'admin') {
      navigate('/admin/dashboard', { replace: true })
    } else if (role === 'lab') {
      navigate('/lab/dashboard', { replace: true })
    } else if (role === 'lead') {
      navigate('/lead/dashboard', { replace: true })
    } else if (role === 'mentor') {
      navigate('/mentor/dashboard', { replace: true })
    } else {
      navigate(from, { replace: true })
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 font-sans">
      {/* Testeira Superior Oficial MWS em Verde Escuro com Logo Dourado */}
      <header className="w-full mws-header-gradient border-b border-[#153e32] px-6 py-4 shadow-md flex items-center justify-between">
        <MWSLogo symbolSize={38} variant="gold-gradient" />
        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-300">
          <span className="w-2 h-2 rounded-full bg-gold" />
          <span>Acesso Seguro ao Ecossistema MWS</span>
        </div>
      </header>

      {/* Conteúdo Central em Fundo Claro */}
      <div className="flex-1 flex items-center justify-center p-4 py-8">
        <div className="w-full max-w-[430px] bg-white rounded-2xl border border-slate-200/80 shadow-elevation p-6 sm:p-8">
          <div className="flex flex-col items-center text-center mb-6">
            <MWSLogo symbolSize={48} showWordmark={false} />
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 mt-3">
              Magic Wire System
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm mt-1">
              Acesse o ecossistema da 3ª Geração da Ortodontia
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-red-50 text-red-700 text-sm font-medium border border-red-200 animate-fade-in">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-1.5">
              <Label htmlFor="email" className="font-semibold text-slate-900 text-xs">
                E-mail ou Identificador de Acesso
              </Label>
              <Input
                id="email"
                type="text"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  setError('')
                }}
                required
                className="h-10 rounded-lg border-slate-200 focus-visible:ring-gold"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password" className="font-semibold text-slate-900 text-xs">
                Senha
              </Label>
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
                  className="h-10 rounded-lg border-slate-200 pr-10 focus-visible:ring-gold"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors"
                  aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                >
                  {showPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-11 bg-primary hover:bg-[#082019] text-white rounded-lg font-semibold text-sm transition-all shadow-md mt-2 flex items-center justify-center border border-gold/30 hover:border-gold"
              disabled={isLoading || !isFormValid}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin text-gold" />
                  Conectando...
                </>
              ) : (
                <span className="flex items-center gap-2">
                  <span>Acessar Plataforma</span>
                  <span className="text-gold-light">→</span>
                </span>
              )}
            </Button>
          </form>

          <p className="mt-5 text-center text-xs text-slate-500">
            Não tem cadastro?{' '}
            <Link
              to="/signup"
              className="font-semibold text-primary hover:text-[#082019] hover:underline"
            >
              Cadastre-se aqui
            </Link>
          </p>

          <div className="mt-6 p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600">
            <p className="font-bold text-slate-800 mb-2 flex items-center justify-between">
              <span>Perfis do Ecossistema:</span>
              <span className="text-[10px] text-primary font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-primary/10">
                6 Perfis
              </span>
            </p>
            <div className="flex flex-wrap gap-1 mb-2.5">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  setEmail('mentor@magicwire.com')
                  setPassword('Skip@Pass')
                }}
                className="text-[10px] h-6 px-2 bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100 font-semibold"
              >
                Preencher Mentor
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  setEmail('ortodontista@magicwire.com')
                  setPassword('Skip@Pass')
                }}
                className="text-[10px] h-6 px-2 text-slate-700"
              >
                Ortodontista
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  setEmail('lab@magicwire.com')
                  setPassword('Skip@Pass')
                }}
                className="text-[10px] h-6 px-2 text-slate-700"
              >
                Laboratório
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  setEmail('adm_mws')
                  setPassword('Skip@Pass')
                }}
                className="text-[10px] h-6 px-2 text-slate-700"
              >
                ADM
              </Button>
            </div>
            <ul className="space-y-1.5 text-[11px]">
              <li className="font-semibold text-emerald-900 bg-emerald-50/80 p-1 rounded border border-emerald-200">
                <strong className="text-emerald-950">Mentor:</strong> mentor@magicwire.com
              </li>
              <li>
                <strong className="text-slate-800">Ortodontista:</strong> ortodontista@magicwire.com
              </li>
              <li>
                <strong className="text-slate-800">Time ADM MWS:</strong> adm_mws
              </li>
              <li>
                <strong className="text-slate-800">Laboratório:</strong> lab@magicwire.com
              </li>
              <li>
                <strong className="text-slate-800">Paciente:</strong> patient@magicwire.com
              </li>
              <li className="font-semibold text-[#0d3b2e]">
                <strong>Lead Qualificado:</strong> lead.teste@mws.com.br
              </li>
            </ul>
            <p className="text-slate-400 text-[10px] mt-2 pt-2 border-t border-slate-200">
              Senha padrão de demonstração: Skip@Pass
            </p>
          </div>
        </div>
      </div>

      {/* Rodapé Oficial MWS em Verde Escuro com Dourado */}
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
