// src/services/auth.service.ts
import { supabase } from '../lib/supabaseClient'

export const signInWithEmail = (email: string) => {
  return supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: 'http://localhost:5173/dashboard',
    },
  })
}

export const signInWithGoogle = () => {
  return supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: 'http://localhost:5173/dashboard',
    },
  })
}

export const signOut = () => {
  return supabase.auth.signOut()
}

export const getCurrentUser = () => {
  return supabase.auth.getUser()
}