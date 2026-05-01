import { useEffect, useState } from "react"
import { getOffers } from "../services/offers.service"
import type { offers } from "../types/database.types"

export const useOffers = () => {
  const [offers, setOffers] = useState<offers[]>([])

  useEffect(() => {
    getOffers().then((data) => {
      const now = new Date()

      const activeOffers = data.filter((offer: offers) => {
        const start = new Date(offer.start_date)
        const end = new Date(offer.end_date)

        return (
          offer.is_global &&
          now >= start &&
          now <= end
        )
      })

      setOffers(activeOffers)
    })
  }, [])

  return offers
}