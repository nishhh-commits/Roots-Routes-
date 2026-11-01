import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react'

export type Role = 'tourist' | 'hotel'

type User = {
  email: string
  role: Role
}

type AuthValue = {
  user: User | null
  login: (
    email: string,
    password: string,
    role: Role
  ) => Promise<void>
  logout: () => void
}

const STORAGE_KEY = 'rr-user'

const AuthContext = createContext<AuthValue | undefined>(undefined)

function readStoredUser(): User | null {
  try {
    if (typeof window === 'undefined') return null

    const raw = localStorage.getItem(STORAGE_KEY)

    if (!raw) return null

    const parsed = JSON.parse(raw)

    if (
      typeof parsed.email === 'string' &&
      (parsed.role === 'tourist' || parsed.role === 'hotel')
    ) {
      return parsed as User
    }

    return null
  } catch {
    return null
  }
}

export function AuthProvider({
  children,
}: {
  children: ReactNode
}) {
  const [user, setUser] = useState<User | null>(readStoredUser)

<<<<<<< HEAD
  async function login(
    email: string,
    password: string,
    role: Role
  ): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 700))

=======
  async function login(email: string, password: string, role: Role) {
    await new Promise((resolve) => setTimeout(resolve, 300))
>>>>>>> origin/feature/nisha-firestore
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      throw new Error('Enter a valid email address.')
    }

    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters.')
    }

    if (role !== 'tourist' && role !== 'hotel') {
      throw new Error('Invalid user role.')
    }

    const next: User = {
      email: email.trim(),
      role,
    }

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      setUser(next)
    } catch {
      throw new Error('Unable to save login information.')
    }
  }

  function logout(): void {
    try {
      localStorage.removeItem(STORAGE_KEY)
    } finally {
      setUser(null)
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthValue {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error('useAuth must be used inside AuthProvider')
  }

  return context
}