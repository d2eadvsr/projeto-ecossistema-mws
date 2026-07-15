import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'
import { Sidebar, BottomNav } from './Navigation'
import { Button } from './ui/button'
import { LogOut } from 'lucide-react'

export default function Layout() {
  const { isAuthenticated, user, signOut, loading } = useAuth()

  if (loading) return <div className="h-screen flex items-center justify-center">Carregando...</div>

  if (!isAuthenticated) {
    return <Outlet />
  }

  const role = user?.role || 'patient'

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar role={role} />

      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <header className="h-16 border-b bg-card flex items-center justify-between px-6 md:justify-end">
          <div className="md:hidden font-bold text-primary flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-primary text-white flex items-center justify-center text-xs">
              M
            </div>
            MWS
          </div>
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end">
              <span className="text-sm font-semibold">{user?.name}</span>
              <span className="text-xs text-muted-foreground capitalize">{role}</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={signOut}>
              <LogOut className="w-5 h-5 text-muted-foreground" />
            </Button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8 pb-20 md:pb-8 bg-slate-50">
          <Outlet />
        </main>
      </div>

      <BottomNav role={role} />
    </div>
  )
}
