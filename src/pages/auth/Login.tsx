 fix/dependencies
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../services/auth'
=======
import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth, type Role } from '../../services/auth'

const roles: { value: Role; label: string }[] = [
  { value: 'tourist', label: 'Tourist' },
  { value: 'hotel', label: 'Hotel / Hospitality' },
]
 main

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()

fix/dependencies
  const [role, setRole] = useState<'tourist' | 'hotel'>('tourist')
=======
 main
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

 fix/dependencies
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
=======
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
>>> main
  }

  return (
 fix/dependencies
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
=======
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

 main
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
 fix/dependencies
=======
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
 main
          </div>

        </div>
      </div>
    </div>
  )
}