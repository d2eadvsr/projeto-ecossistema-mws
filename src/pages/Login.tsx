import { useState } from 'react'
import { Navigate, useNavigate, useLocation, Link } from 'react-router-dom'
import { ClientResponseError } from 'pocketbase'
import { useAuth } from '@/hooks/use-auth'
import pb from '@/lib/pocketbase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AlertCircle, Eye, EyeOff, Loader2 } from 'lucide-react'

export default function Login() {
  const { isAuthenticated, signIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('daniel.elias@d2eadvisory.com.br')
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

    const { error: signInError } = await signIn(email, password)
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
    } else {
      navigate(from, { replace: true })
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4 font-sans">
      <div className="w-full max-w-[400px]">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-16 h-16 bg-[#52B788] rounded-2xl flex items-center justify-center mb-4">
            <span className="text-3xl text-white font-bold">M</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Magic Wire System</h1>
          <p className="text-gray-500 mt-1">Acesse o ecossistema digital</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          {error && (
            <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-[#FDE8E8] text-[#C81E1E] text-sm font-medium animate-fade-in">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email" className="font-semibold text-gray-900">
              E-mail
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                setError('')
              }}
              required
              className="h-11 rounded-lg border-gray-200"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="font-semibold text-gray-900">
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
                className="h-11 rounded-lg border-gray-200 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-600 hover:text-blue-800 transition-colors"
                aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
              >
                {showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-11 bg-[#52B788] hover:bg-[#40966a] text-white rounded-lg font-medium text-base transition-colors"
            disabled={isLoading || !isFormValid}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Entrando...
              </>
            ) : (
              'Entrar'
            )}
          </Button>
        </form>

        <p className="mt-8 text-center text-gray-500">
          Não tem conta?{' '}
          <Link to="/signup" className="font-semibold text-[#52B788] hover:underline">
            Cadastre-se
          </Link>
        </p>

        <div className="mt-8 p-5 bg-[#F3F4F6] rounded-xl text-sm text-gray-600">
          <p className="font-bold text-gray-700 mb-3">Contas de Teste:</p>
          <ul className="space-y-2 mb-4">
            <li>Admin: daniel.elias@d2eadvisory.com.br</li>
            <li>Dentista: dentist@magicwire.com</li>
            <li>Paciente: patient@magicwire.com</li>
            <li>Lab: lab@magicwire.com</li>
          </ul>
          <p className="text-gray-500 text-xs">Senha padrão: Skip@Pass</p>
        </div>
      </div>
    </div>
  )
}
