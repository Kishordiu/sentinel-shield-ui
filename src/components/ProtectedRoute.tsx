import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "@/lib/auth"
import { Shield } from "lucide-react"

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const { user, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Shield className="h-8 w-8 animate-pulse text-primary" />
      </div>
    )
  }

  if (!user) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    )
  }

  return <>{children}</>

}