import { Link, NavLink, Outlet } from 'react-router-dom'

const links = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/trip-planner', label: 'Trip Planner' },
  { to: '/heritage-flow', label: 'HeritageFlow' },
  { to: '/kala-connect', label: 'KalaConnect' },
  { to: '/community', label: 'Community' },
  { to: '/hotel', label: 'Hotel' },
  { to: '/hotel/greenstay', label: 'GreenStay' },
]

export default function MainLayout() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-sand-200 bg-cream-50 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-8">
          <Link to="/" className="font-display text-xl font-semibold text-plum-900 shrink-0">
            Roots & Routes
          </Link>
          <nav className="flex gap-5 overflow-x-auto text-sm">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end
                className={({ isActive }) =>
                  isActive
                    ? 'font-medium text-plum-700 whitespace-nowrap'
                    : 'text-ink-500 hover:text-ink-900 whitespace-nowrap'
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}