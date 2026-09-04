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
      { href: '/patient/payments', label: 'Pagamentos', icon: CreditCard },
      { href: '/patient/search', label: 'Buscar Especialista', icon: Search },
      { href: '/patient/profile', label: 'Perfil', icon: UserCircle },
    ]
  }
  if (role === 'admin') {
    return [
      { href: '/admin/dashboard', label: 'Visão Executiva', icon: LayoutDashboard },
      { href: '/admin/ortodontistas', label: 'Ortodontistas (Adesão)', icon: Users },
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
    <div className="hidden md:flex flex-col w-64 bg-secondary text-secondary-foreground h-screen border-r border-secondary-foreground/10 flex-shrink-0">
      <div className="p-6 pb-4 flex-shrink-0">
        <h1 className="text-2xl font-bold text-primary-foreground flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-primary flex items-center justify-center font-bold text-white shadow-sm">
            M
          </div>
          Magic Wire
        </h1>
      </div>
      <nav className="flex-1 min-h-0 px-3 space-y-0.5 overflow-y-auto py-2 custom-scrollbar focus:outline-none">
        {links.map((link) => {
          const Icon = link.icon
          const isActive = location.pathname === link.href
          return (
            <Link
              key={link.href}
              to={link.href}
              title={link.label}
              className={cn(
                'flex items-center gap-2.5 px-3 py-1.5 rounded-md transition-colors text-xs font-medium group',
                isActive
                  ? 'bg-primary text-primary-foreground font-semibold shadow-sm'
                  : 'hover:bg-white/10 text-slate-300 hover:text-white',
              )}
            >
              <Icon
                className={cn(
                  'w-4 h-4 flex-shrink-0',
                  isActive ? 'text-primary-foreground' : 'text-slate-400 group-hover:text-white',
                )}
              />
              <span className="truncate">{link.label}</span>
            </Link>
          )
        })}
      </nav>
      <div className="p-4 border-t border-secondary-foreground/10 flex-shrink-0">
        <Button
          variant="ghost"
          className="w-full justify-start text-slate-400 hover:text-white hover:bg-white/5 text-xs font-medium"
          onClick={signOut}
        >
          <LogOut className="w-4 h-4 mr-3" /> Sair
        </Button>
      </div>
    </div>
  )
}

export function BottomNav({ role }: { role: string }) {
  const links = getLinksForRole(role)
  const location = useLocation()

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border flex justify-around p-1.5 z-50 shadow-lg">
      {links.slice(0, 6).map((link) => {
        const Icon = link.icon
        const isActive = location.pathname === link.href
        return (
          <Link
            key={link.href}
            to={link.href}
            className={cn(
              'flex flex-col items-center p-1.5 text-[10px] font-medium transition-colors',
              isActive ? 'text-primary font-bold' : 'text-muted-foreground hover:text-slate-900',
            )}
          >
            <Icon className="w-5 h-5 mb-0.5" />
            <span className="truncate max-w-[52px]">{link.label}</span>
          </Link>
        )
      })}
    </div>
  )
}
