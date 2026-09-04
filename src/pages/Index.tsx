import { Navigate } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'

export default function Index() {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  const role = (window as any).pocketbase?.authStore?.record?.role || 'admin'
  if (role === 'admin') {
    return <Navigate to="/admin/dashboard" replace />
  }
  if (role === 'dentist') {
    return <Navigate to="/dashboard/dentist" replace />
  }
  if (role === 'patient') {
    return <Navigate to="/dashboard/patient" replace />
  }

  return <Navigate to="/dashboard" replace />
}
