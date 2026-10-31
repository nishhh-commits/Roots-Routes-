import { createContext, useContext, useState, type ReactNode } from 'react'

export type Role = 'tourist' | 'hotel'

type User = { email: string; role: Role }

type AuthValue = {
  user: User | null
  login: (email: string, password: string, role: Role) => Promise<void>
  logout: () => void
}

const STORAGE_KEY = 'rr-user'

const AuthContext = createContext<AuthValue | null>(null)

function readStoredUser(): User | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as User) : null
  } catch {
    return null
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(readStoredUser)

  async function login(email: string, password: string, role: Role) {
    await new Promise((resolve) => setTimeout(resolve, 700))
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      throw new Error('Enter a valid email address.')
    }
    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters.')
    }
    const next = { email, role }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    setUser(next)
  }

  function logout() {
    localStorage.removeItem(STORAGE_KEY)
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider')
  }
  return context
}