import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  Users,
  FolderOpen,
  FlaskConical,
  CreditCard,
  LogOut,
  Calendar,
  Settings,
  Activity,
  CalendarCheck,
  UserCircle,
  FileText,
  MessageSquare,
  GraduationCap,
  MessagesSquare,
  ShieldCheck,
  Megaphone,
  UserCheck,
  UserCheck2,
  Search,
  Sparkles,
} from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import { MWSLogo } from '@/components/MWSLogo'

const getLinksForRole = (role: string) => {
  if (role === 'dentist') {
    return [
      { href: '/dashboard/dentist', label: 'Dashboard', icon: LayoutDashboard },
      { href: '/dentist/agenda', label: 'Agenda', icon: Calendar },
      { href: '/dentist/patients', label: 'Pacientes', icon: Users },
      { href: '/dentist/cases', label: 'Casos Clínicos', icon: FolderOpen },
      { href: '/dentist/financing', label: 'Financeiro', icon: CreditCard },
      { href: '/dentist/medical-record', label: 'Prontuário Digital', icon: FileText },
      { href: '/dentist/chat-lab', label: 'Chat Laboratório', icon: MessageSquare },
      { href: '/dentist/school', label: 'Escola MWS', icon: GraduationCap },
      { href: '/dentist/community', label: 'Comunidade', icon: MessagesSquare },
      { href: '/dentist/quality', label: 'Qualidade', icon: ShieldCheck },
      { href: '/dentist/slas', label: 'SLAs & Resultados', icon: Activity },
      { href: '/dentist/programs', label: 'Programas', icon: Megaphone },
      { href: '/dentist/referrals', label: 'Indicação de Pacientes', icon: UserCheck },
      { href: '/dentist/public-profile', label: 'Perfil Público', icon: UserCircle },
      { href: '/dentist/settings', label: 'Configurações', icon: Settings },
    ]
  }
  if (role === 'lead') {
    return [
      { href: '/lead/dashboard', label: 'Dashboard Lead', icon: LayoutDashboard },
      { href: '/lead/ortodontista', label: 'Meu Ortodontista', icon: UserCircle },
      { href: '/lead/consulta', label: 'Primeira Consulta', icon: CalendarCheck },
      { href: '/lead/orcamento', label: 'Meu Orçamento', icon: CreditCard },
      { href: '/lead/tecnologia', label: 'Conheça a Magic Wire', icon: Sparkles },
    ]
  }
  if (role === 'patient') {
    return [
      { href: '/dashboard/patient', label: 'Dashboard', icon: LayoutDashboard },
      { href: '/patient/treatment', label: 'Meu Tratamento', icon: Activity },
      { href: '/patient/appointments', label: 'Consultas', icon: CalendarCheck },
      { href: '/patient/points', label: 'Pontuação', icon: Sparkles },
      { href: '/patient/payments', label: 'Pagamentos', icon: CreditCard },
      { href: '/patient/search', label: 'Buscar Especialista', icon: Search },
      { href: '/patient/profile', label: 'Perfil', icon: UserCircle },
    ]
  }
  if (role === 'admin') {
    return [
      { href: '/admin/dashboard', label: 'Visão Executiva', icon: LayoutDashboard },
      { href: '/admin/ortodontistas', label: 'Ortodontistas (Adesão)', icon: Users },
      { href: '/admin/mentores', label: 'Mentores MWS', icon: UserCheck2 },
      { href: '/admin/pacientes-leads', label: 'Pacientes & Leads', icon: UserCheck },
      { href: '/admin/mobilidade', label: 'Mobilidade Geográfica', icon: Activity },
      { href: '/admin/casos', label: 'Casos & Laboratório', icon: FolderOpen },
      { href: '/admin/financeiro', label: 'Financeiro & Splits', icon: CreditCard },
      { href: '/admin/logistica', label: 'Logística & Fios', icon: ShieldCheck },
      { href: '/admin/qualidade', label: 'Qualidade & SLAs', icon: ShieldCheck },
      { href: '/admin/programas', label: 'Programas MKT/Gestão', icon: Megaphone },
      { href: '/admin/escola', label: 'Escola MWS & Fórum', icon: GraduationCap },
      { href: '/admin/rbac', label: 'Console RBAC', icon: Settings },
    ]
  }
  if (role === 'mentor') {
    return [
      { href: '/mentor/dashboard', label: 'Dashboard Mentor', icon: LayoutDashboard },
      { href: '/mentor/disponibilidade', label: 'Disponibilidade / Agenda', icon: Calendar },
      { href: '/mentor/perfil', label: 'Meu Perfil Mentor', icon: UserCircle },
    ]
  }
  if (role === 'lab') {
    return [
      { href: '/lab/dashboard', label: 'Dashboard Lab', icon: LayoutDashboard },
      { href: '/lab/cases', label: 'Fila de Casos', icon: FolderOpen },
      { href: '/lab/planning', label: 'Planejamento & Mentoria', icon: FlaskConical },
      { href: '/lab/production', label: 'Produção Fios Mágicos', icon: Activity },
      { href: '/lab/sla', label: 'SLAs & Desempenho', icon: ShieldCheck },
      { href: '/lab/team', label: 'Equipe Técnica', icon: Users },
      { href: '/lab/settings', label: 'Configurações Lab', icon: Settings },
    ]
  }
  const base = [{ href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard }]
  return [
    ...base,
    { href: '/cases', label: 'Todos os Casos', icon: FolderOpen },
    { href: '/lab/dashboard', label: 'Laboratório MWS', icon: FlaskConical },
    { href: '/financing', label: 'Fintech (Simular)', icon: CreditCard },
  ]
}

export function Sidebar({ role }: { role: string }) {
  const links = getLinksForRole(role)
  const location = useLocation()
  const { signOut } = useAuth()

  return (
    <div className="hidden md:flex flex-col w-64 bg-secondary text-secondary-foreground h-screen border-r border-[#153e32] flex-shrink-0 shadow-lg">
      <div className="p-5 pb-4 flex-shrink-0 border-b border-[#12382d]">
        <MWSLogo symbolSize={34} variant="gold-gradient" />
      </div>
      <nav className="flex-1 min-h-0 px-3 space-y-1 overflow-y-auto py-3 custom-scrollbar focus:outline-none">
        {links.map((link) => {
          const Icon = link.icon
          const isActive = location.pathname === link.href
          return (
            <Link
              key={link.href}
              to={link.href}
              title={link.label}
              className={cn(
                'flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all text-xs font-medium group',
                isActive
                  ? 'bg-gradient-to-r from-[#0f4435] to-[#145341] text-gold-light font-semibold shadow-md border-l-4 border-gold'
                  : 'hover:bg-white/5 text-slate-300 hover:text-white',
              )}
            >
              <Icon
                className={cn(
                  'w-4 h-4 flex-shrink-0 transition-colors',
                  isActive ? 'text-gold' : 'text-slate-400 group-hover:text-gold-light',
                )}
              />
              <span className="truncate">{link.label}</span>
            </Link>
          )
        })}
      </nav>
      <div className="p-4 border-t border-[#12382d] flex-shrink-0 bg-[#061712]">
        <Button
          variant="ghost"
          className="w-full justify-start text-slate-300 hover:text-gold hover:bg-white/5 text-xs font-medium transition-colors"
          onClick={signOut}
        >
          <LogOut className="w-4 h-4 mr-3" /> Sair da Plataforma
        </Button>
      </div>
    </div>
  )
}

export function BottomNav({ role }: { role: string }) {
  const links = getLinksForRole(role)
  const location = useLocation()

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#082019] border-t border-[#1a4a3c] flex justify-around p-1.5 z-50 shadow-2xl">
      {links.slice(0, 7).map((link) => {
        const Icon = link.icon
        const isActive = location.pathname === link.href
        return (
          <Link
            key={link.href}
            to={link.href}
            className={cn(
              'flex flex-col items-center p-1.5 text-[10px] font-medium transition-colors',
              isActive ? 'text-gold font-bold scale-105' : 'text-slate-300 hover:text-white',
            )}
          >
            <Icon className={cn('w-5 h-5 mb-0.5', isActive ? 'text-gold' : 'text-slate-400')} />
            <span className="truncate max-w-[54px]">{link.label}</span>
          </Link>
        )
      })}
    </div>
  )
}
