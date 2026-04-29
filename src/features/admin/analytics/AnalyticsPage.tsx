import { useEffect, useState } from "react"
import { getMostSelling } from "../../../services/admin.analytics.service"

export const AnalyticsPage = () => {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    getMostSelling().then(setData)
  }, [])

  return (
    <div>
      <h2>Most Selling</h2>
      {data.map((d, i) => (
        <p key={i}>
          {d.product_id} - {d.total}
        </p>
      ))}
    </div>
  )
}