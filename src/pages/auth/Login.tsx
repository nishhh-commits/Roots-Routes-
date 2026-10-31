import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth, type Role } from '../../services/auth'

const roles: { value: Role; label: string }[] = [
  { value: 'tourist', label: 'Tourist' },
  { value: 'hotel', label: 'Hotel / Hospitality' },
]

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<Role>('tourist')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function signIn(
    emailValue: string,
    passwordValue: string,
    roleValue: Role,
  ) {
    setError('')
    setLoading(true)

    try {
      await login(emailValue, passwordValue, roleValue)
      navigate(roleValue === 'hotel' ? '/hotel' : '/dashboard')
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Something went wrong.',
      )
    } finally {
      setLoading(false)
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    signIn(email.trim(), password, role)
  }

  const inputClass =
    'mt-1 w-full rounded-md border border-sand-300 bg-white px-3 py-2 text-ink-900 outline-none focus:border-plum-600'

  return (
    <div className="grid min-h-screen md:grid-cols-2">

      {/* LEFT BRANDING SECTION */}
      <div className="hidden flex-col justify-between bg-plum-900 p-12 text-cream-50 md:flex">
        <Link to="/" className="font-display text-xl font-semibold">
          Roots & Routes
        </Link>

        <p className="font-display text-4xl leading-tight">
          Discover Hidden Gems. Connect with Culture. Travel with Purpose.
        </p>

        <p className="text-sm text-sand-300">
          Explore Udaipur beyond the usual destinations.
        </p>
      </div>

      {/* LOGIN SECTION */}
      <div className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">

          <Link
            to="/"
            className="text-sm text-sandstone-600 hover:text-plum-900"
          >
            ← Back to home
          </Link>

          <h1 className="mt-6 text-3xl font-semibold text-plum-900">
            Welcome back
          </h1>

          <p className="mt-2 text-sm text-ink-500">
            Prototype login: use a valid email and a password of 6 or more characters.
          </p>

          {/* ROLE SELECTION */}
          <div className="mt-6 grid grid-cols-2 gap-2">
            {roles.map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => setRole(item.value)}
                className={
                  role === item.value
                    ? 'rounded-md bg-plum-700 px-3 py-2 text-sm text-cream-50'
                    : 'rounded-md border border-sand-300 px-3 py-2 text-sm text-ink-700 hover:bg-cream-100'
                }
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* LOGIN FORM */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">

            <label className="block text-sm text-ink-700">
              Email
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className={inputClass}
              />
            </label>

            <label className="block text-sm text-ink-700">
              Password
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className={inputClass}
              />
            </label>

            {error && (
              <p className="text-sm text-red-700">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-plum-700 px-4 py-2.5 text-sm font-medium text-cream-50 transition hover:bg-plum-900 disabled:opacity-60"
            >
              {loading ? 'Signing in...' : 'Log in'}
            </button>
          </form>

          {/* DEMO ACCOUNTS */}
          <div className="mt-6 border-t border-sand-300 pt-6">
            <p className="text-xs uppercase tracking-wide text-ink-500">
              Try the demo
            </p>

            <div className="mt-3 flex gap-2">
              <button
                type="button"
                disabled={loading}
                onClick={() =>
                  signIn('tourist@demo.com', 'demo123', 'tourist')
                }
                className="flex-1 rounded-md border border-sand-300 px-3 py-2 text-sm text-ink-700 hover:bg-cream-100"
              >
                Demo tourist
              </button>

              <button
                type="button"
                disabled={loading}
                onClick={() =>
                  signIn('hotel@demo.com', 'demo123', 'hotel')
                }
                className="flex-1 rounded-md border border-sand-300 px-3 py-2 text-sm text-ink-700 hover:bg-cream-100"
              >
                Demo hotel
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}