import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  Users,
  FolderOpen,
  FlaskConical,
  Megaphone,
  CreditCard,
  LogOut,
} from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'

const getLinksForRole = (role: string) => {
  const base = [{ href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard }]

  if (role === 'dentist') {
    return [
      ...base,
      { href: '/cases', label: 'Casos Clínicos', icon: FolderOpen },
      { href: '/marketing', label: 'Marketing IA', icon: Megaphone },
    ]
  }
  if (role === 'patient') {
    return [...base, { href: '/financing', label: 'Financiamento', icon: CreditCard }]
  }
  if (role === 'lab') {
    return [...base, { href: '/lab', label: 'Produção Lab', icon: FlaskConical }]
  }
  // Admins
  return [
    ...base,
    { href: '/cases', label: 'Todos os Casos', icon: FolderOpen },
    { href: '/lab', label: 'Visão Lab', icon: FlaskConical },
    { href: '/financing', label: 'Fintech (Simular)', icon: CreditCard },
  ]
}

export function Sidebar({ role }: { role: string }) {
  const links = getLinksForRole(role)
  const location = useLocation()
  const { signOut } = useAuth()

  return (
    <div className="hidden md:flex flex-col w-64 bg-secondary text-secondary-foreground min-h-screen">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-primary-foreground flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-primary flex items-center justify-center">M</div>
          Magic Wire
        </h1>
      </div>
      <nav className="flex-1 px-4 space-y-2">
        {links.map((link) => {
          const Icon = link.icon
          const isActive = location.pathname === link.href
          return (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-md transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-secondary-foreground/10 text-muted',
              )}
            >
              <Icon className="w-5 h-5" />
              {link.label}
            </Link>
          )
        })}
      </nav>
      <div className="p-4 border-t border-secondary-foreground/10">
        <Button
          variant="ghost"
          className="w-full justify-start text-muted hover:text-white"
          onClick={signOut}
        >
          <LogOut className="w-5 h-5 mr-3" /> Sair
        </Button>
      </div>
    </div>
  )
}

export function BottomNav({ role }: { role: string }) {
  const links = getLinksForRole(role)
  const location = useLocation()

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border flex justify-around p-2 z-50">
      {links.slice(0, 4).map((link) => {
        const Icon = link.icon
        const isActive = location.pathname === link.href
        return (
          <Link
            key={link.href}
            to={link.href}
            className={cn(
              'flex flex-col items-center p-2 text-xs',
              isActive ? 'text-primary' : 'text-muted-foreground',
            )}
          >
            <Icon className="w-6 h-6 mb-1" />
            <span className="truncate max-w-[60px]">{link.label}</span>
          </Link>
        )
      })}
    </div>
  )
}
