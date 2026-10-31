import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../services/auth'

const touristLinks = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/trip-planner', label: 'Trip Planner' },
  { to: '/heritage-flow', label: 'HeritageFlow' },
  { to: '/kala-connect', label: 'KalaConnect' },
  { to: '/community', label: 'Community' },
]

const hotelLinks = [
  { to: '/hotel', label: 'Overview' },
  { to: '/hotel/greenstay', label: 'GreenStay OS' },
]

export default function MainLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const links = user?.role === 'hotel' ? hotelLinks : touristLinks

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 border-b border-sand-200 bg-cream-50">
        <div className="mx-auto flex max-w-6xl items-center gap-6 px-6 py-4">
          <Link to="/" className="shrink-0 font-display text-xl font-semibold text-plum-900">
            Roots & Routes
          </Link>
          <nav className="flex flex-1 gap-5 overflow-x-auto text-sm">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end
                className={({ isActive }) =>
                  isActive
                    ? 'whitespace-nowrap font-medium text-plum-700'
                    : 'whitespace-nowrap text-ink-500 hover:text-ink-900'
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          <button onClick={handleLogout} className="shrink-0 text-sm text-ink-500 hover:text-ink-900">
            Log out
          </button>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}