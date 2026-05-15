// src/services/auth.service.ts
import { supabase } from '../lib/supabaseClient'

export const signInWithEmail = (email: string) => {
  return supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: 'https://wow-cookies.vercel.app/',
    },
  })
}

export const signInWithGoogle = () => {
  return supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: 'https://wow-cookies.vercel.app/',
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