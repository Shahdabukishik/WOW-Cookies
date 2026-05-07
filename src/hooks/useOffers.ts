import { useEffect, useState } from "react"
import { getOffers } from "../services/offers.service"
import type { offers } from "../types/database.types"

export const useOffersState = () => {
  const [offers, setOffers] = useState<offers[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    getOffers()
      .then((data) => {
        const now = new Date()

        const activeOffers = data.filter((offer: offers) => {
          const start = new Date(offer.start_date)
          const end = new Date(offer.end_date)

          return now >= start && now <= end
        })

        if (isMounted) setOffers(activeOffers)
      })
      .finally(() => {
        if (isMounted) setLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [])

  return { offers, loading }
}

export const useOffers = () => {
  const { offers } = useOffersState()

  return offers
}
