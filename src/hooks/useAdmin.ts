import { supabase } from "../lib/supabaseClient"
import { useEffect, useState } from "react"

export const useAdmin = () => {
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const check = async () => {
      const user = (await supabase.auth.getUser()).data.user
      if (!user) return

      const { data } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single()

      setIsAdmin(data?.role === "admin")
    }

    check()
  }, [])

  return isAdmin
}