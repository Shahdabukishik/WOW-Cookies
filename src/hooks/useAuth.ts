import { useEffect, useState } from 'react'
import * as authService from '../services/auth.service'

export const useAuth = () => {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    authService.getCurrentUser().then((currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })
  }, [])

  const loginWithEmail = async (email: string) => {
    setLoading(true)
    const res = await authService.signInWithEmail(email)
    setLoading(false)
    return res
  }

  const loginWithGoogle = async () => {
    setLoading(true)
    const res = await authService.signInWithGoogle()
    setLoading(false)
    return res
  }

  const logout = async () => {
    await authService.signOut()
    setUser(null)
  }

  return {
    user,
    loading,
    loginWithEmail,
    loginWithGoogle,
    logout,
  }
}