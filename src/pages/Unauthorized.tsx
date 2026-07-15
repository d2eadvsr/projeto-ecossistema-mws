import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export default function Unauthorized() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-slate-50 text-center">
      <h1 className="mb-4 text-4xl font-bold text-slate-900">Acesso Negado</h1>
      <p className="mb-8 text-lg text-slate-600">
        Você não tem permissão para acessar esta página.
      </p>
      <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
        <Link to="/">Voltar ao Início</Link>
      </Button>
    </div>
  )
}
