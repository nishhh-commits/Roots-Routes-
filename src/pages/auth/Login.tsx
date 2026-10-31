import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../services/auth'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [role, setRole] = useState<'tourist' | 'hotel'>('tourist')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')

    try {
      login(email, password, role)
      navigate(role === 'hotel' ? '/hotel' : '/dashboard')
    } catch {
      setError('Login failed. Please check your credentials.')
    }
  }

  function handleDemoLogin(selectedRole: 'tourist' | 'hotel') {
    setError('')
    try {
      login(
        selectedRole === 'tourist' ? 'tourist@demo.com' : 'hotel@demo.com',
        'demo123',
        selectedRole
      )
      navigate(selectedRole === 'hotel' ? '/hotel' : '/dashboard')
    } catch {
      setError('Demo login failed. Check your auth service.')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream-50 px-6 py-12">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-semibold text-plum-900">
          Welcome to Roots & Routes
        </h1>
        <p className="mt-2 text-ink-500">
          Sign in to discover meaningful travel experiences.
        </p>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={() => setRole('tourist')}
            className={`flex-1 rounded-full border px-4 py-2 ${
              role === 'tourist'
                ? 'border-plum-700 bg-plum-700 text-white'
                : 'border-sand-300 text-ink-700'
            }`}
          >
            Tourist
          </button>
          <button
            type="button"
            onClick={() => setRole('hotel')}
            className={`flex-1 rounded-full border px-4 py-2 ${
              role === 'hotel'
                ? 'border-plum-700 bg-plum-700 text-white'
                : 'border-sand-300 text-ink-700'
            }`}
          >
            Hotel
          </button>
        </div>

        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            className="w-full rounded-lg border border-sand-300 bg-white px-4 py-3"
          />

          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full rounded-lg border border-sand-300 bg-white px-4 py-3"
          />

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            className="w-full rounded-full bg-plum-700 px-5 py-3 font-medium text-white"
          >
            Sign in
          </button>
        </form>

        <div className="mt-6 border-t border-sand-300 pt-5">
          <p className="mb-3 text-sm text-ink-500">Explore with demo access</p>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => handleDemoLogin('tourist')}
              className="flex-1 rounded-full border border-sand-300 px-3 py-2 text-sm"
            >
              Demo Tourist
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin('hotel')}
              className="flex-1 rounded-full border border-sand-300 px-3 py-2 text-sm"
            >
              Demo Hotel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}