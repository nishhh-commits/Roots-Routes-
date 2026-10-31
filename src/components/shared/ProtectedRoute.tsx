import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../services/auth'

type ProtectedRouteProps = {
  role: 'tourist' | 'hotel'
}

export default function ProtectedRoute({ role }: ProtectedRouteProps) {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (user.role !== role) {
    return (
      <Navigate
        to={user.role === 'hotel' ? '/hotel' : '/dashboard'}
        replace
      />
    )
  }

  return <Outlet />
}