// src/services/auth.service.ts
import { supabase } from '../lib/supabaseClient'

export const signInWithEmail = (email: string) => {
  return supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: 'http://localhost:5173/',
    },
  })
}

export const signInWithGoogle = () => {
  return supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: 'http://localhost:5173/',
    },
  })
}

export const signOut = () => {
  return supabase.auth.signOut()
}



export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser()

  if (error || !data?.user) {
    return null
  }

  const user = data.user

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single()

  if (profileError) {
    
    return null
  }

  return {
    ...user,
    profile,
  }
}