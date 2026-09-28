import { Outlet } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'
import { Sidebar, BottomNav } from './Navigation'
import { Button } from './ui/button'
import { LogOut, Shield } from 'lucide-react'
import { MWSLogo } from './MWSLogo'

const ROLE_DISPLAY_NAMES: Record<string, string> = {
  dentist: 'Ortodontista Credenciado',
  patient: 'Paciente MWS',
  admin: 'Time ADM MWS',
  lab: 'Laboratório MWS',
  lead: 'Lead Qualificado',
  mentor: 'Mentor MWS',
}

export default function Layout() {
  const { user, signOut } = useAuth()
  const role = user?.role || 'patient'
  const roleDisplay = ROLE_DISPLAY_NAMES[role] || role

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar role={role} />

      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Testeira Oficial MWS: Fundo verde escuro institucional (#082019 / #0d3b2e) com detalhes em ouro */}
        <header className="h-16 mws-header-gradient text-white border-b border-[#153e32] flex items-center justify-between px-4 sm:px-6 shadow-md z-20 flex-shrink-0">
          {/* Mobile Logo MWS */}
          <div className="md:hidden">
            <MWSLogo symbolSize={30} showWordmark={true} />
          </div>

          {/* Desktop Left context indicator */}
          <div className="hidden md:flex items-center gap-2 text-xs text-slate-300">
            <Shield className="w-4 h-4 text-gold" />
            <span className="font-medium">Ecossistema Digital Magic Wire System</span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex flex-col items-end">
              <span className="text-xs sm:text-sm font-semibold text-white tracking-wide">
                {user?.name}
              </span>
              <span className="text-[11px] text-gold-light/90 font-medium tracking-wide">
                {roleDisplay}
              </span>
            </div>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#124d3d] to-[#082019] border border-gold/40 flex items-center justify-center text-gold font-bold shadow-sm text-sm">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-slate-300 hover:text-white hover:bg-white/10 md:hidden"
              onClick={signOut}
              title="Sair"
            >
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </header>

        {/* Conteúdo com fundo claro institucional para legibilidade clínica e contraste ideal */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 pb-20 md:pb-6 bg-slate-50/90 text-slate-900">
          <Outlet />
        </main>

        {/* Rodapé Oficial MWS em Verde Escuro com acentos em Dourado */}
        <footer className="hidden md:flex items-center justify-between px-6 py-2.5 bg-[#061712] border-t border-[#12382d] text-xs text-slate-400 z-10 flex-shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            <span className="text-slate-300 font-medium">Magic Wire System</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400">3ª Geração da Ortodontia • Fio Lingual Invisível</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span>Rede Oficial Credenciada</span>
            <span className="text-gold-light/80 font-mono">v0.0.39-mws</span>
          </div>
        </footer>
      </div>

      <BottomNav role={role} />
    </div>
  )
}
