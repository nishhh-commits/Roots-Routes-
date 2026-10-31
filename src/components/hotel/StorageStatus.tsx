import { useEffect, useState, type FormEvent } from 'react'
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, type User } from 'firebase/auth'
import { firebaseConfigured, getFirebaseAuth } from '../../services/firebase'

export default function StorageStatus() {
  const [user, setUser] = useState<User | null>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    if (!firebaseConfigured) {
      return undefined
    }
    return onAuthStateChanged(getFirebaseAuth(), setUser)
  }, [])

  async function handleSignIn(event: FormEvent) {
    event.preventDefault()
    setBusy(true)
    setError('')
    try {
      await signInWithEmailAndPassword(getFirebaseAuth(), email.trim(), password)
      window.location.reload()
    } catch {
      setError('Sign-in failed. Check the email and password.')
      setBusy(false)
    }
  }

  async function handleSignOut() {
    await signOut(getFirebaseAuth())
    window.location.reload()
  }

  if (!firebaseConfigured) {
    return <p className="font-type text-xs text-ink-500">Storage: this browser only. Firebase is not configured.</p>
  }

  if (user) {
    return (
      <p className="font-type text-xs text-ink-500">
        Storage: Firestore, signed in as {user.email}.{' '}
        <button onClick={handleSignOut} className="underline">
          Sign out
        </button>
      </p>
    )
  }

  const inputClass = 'rounded-md border border-sand-300 bg-white px-2 py-1 text-sm'

  return (
    <form onSubmit={handleSignIn} className="flex flex-wrap items-center gap-2">
      <span className="font-type text-xs text-ink-500">Firestore needs a hotel account:</span>
      <input type="email" aria-label="Hotel account email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} />
      <input type="password" aria-label="Hotel account password" value={password} onChange={(e) => setPassword(e.target.value)} className={inputClass} />
      <button type="submit" disabled={busy} className="rounded-md border border-sand-300 px-3 py-1 text-sm text-ink-700 hover:bg-paper-clean disabled:opacity-60">
        {busy ? 'Signing in...' : 'Sign in'}
      </button>
      {error && <span className="text-sm text-red-700">{error}</span>}
    </form>
  )
}