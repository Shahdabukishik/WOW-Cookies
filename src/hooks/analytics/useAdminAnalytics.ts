import { useEffect, useState } from "react"
import {
  getAdminAnalytics,
  type AdminAnalytics,
} from "@/services/analytics/admin-analytics.service"

export const useAdminAnalytics = () => {
  const [analytics, setAnalytics] = useState<AdminAnalytics | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true

    getAdminAnalytics()
      .then((nextAnalytics) => {
        if (mounted) setAnalytics(nextAnalytics)
      })
      .catch((loadError: unknown) => {
        if (!mounted) return
        setError(loadError instanceof Error ? loadError.message : "Could not load analytics")
      })
      .finally(() => {
        if (mounted) setLoading(false)
      })

    return () => {
      mounted = false
    }
  }, [])

  return { analytics, loading, error }
}
