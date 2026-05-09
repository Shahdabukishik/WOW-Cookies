// components/AdminRoute.tsx

import { Navigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { getCurrentUser } from "../services/auth.service"

type Props = {
  children: React.ReactNode
}

export default function AdminRoute({ children }: Props) {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const isAdmin = user?.profile?.role === "admin"

  useEffect(() => {
    async function checkUser() {
      const currentUser = await getCurrentUser()
      setUser(currentUser)
      setLoading(false)
    }

    checkUser()
  }, [])

  if (loading) {
    return <p>Loading...</p>
  }

  if (!user) return <Navigate to="/" replace />
  if (!isAdmin) return <Navigate to="/" replace />

  return children
}