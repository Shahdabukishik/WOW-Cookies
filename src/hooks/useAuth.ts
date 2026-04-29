// src/hooks/useAuth.ts
import { useEffect, useState } from 'react'
import type { User } from '@supabase/supabase-js'
import * as authService from '../services/auth.service'

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    authService.getCurrentUser().then(({ data }) => {
      setUser(data.user)
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