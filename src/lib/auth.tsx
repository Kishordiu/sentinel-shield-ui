import { createContext, useContext, useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

interface AuthContextType {
  user: any
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  loginWithGoogle: () => Promise<void>
  register: (data: {
    companyName: string
    adminName: string
    adminEmail: string
    password: string
  }) => Promise<void>
  logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {

  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {

    const loadSession = async () => {
      const { data } = await supabase.auth.getSession()
      setUser(data.session?.user ?? null)
      setIsLoading(false)
    }

    loadSession()

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
      }
    )

    return () => {
      listener.subscription.unsubscribe()
    }

  }, [])

  async function login(email: string, password: string) {

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) throw error

  }

  async function register(data: {
    companyName: string
    adminName: string
    adminEmail: string
    password: string
  }) {

    const { error } = await supabase.auth.signUp({
      email: data.adminEmail,
      password: data.password,
      options: {
        data: {
          company_name: data.companyName,
          admin_name: data.adminName
        }
      }
    })

    if (error) throw error

  }

  async function loginWithGoogle() {

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google"
    })

    if (error) throw error

  }

  async function logout() {

    const { error } = await supabase.auth.signOut()

    if (error) throw error

  }

  return (

    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        loginWithGoogle,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>

  )

}

export function useAuth() {

  const context = useContext(AuthContext)

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider")
  }

  return context

}