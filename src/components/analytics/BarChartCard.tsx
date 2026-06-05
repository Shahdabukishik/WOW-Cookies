import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import type { ChartDatum } from "@/services/analytics/admin-analytics.service"

type Props = {
  title: string
  data: ChartDatum[]
}

export const BarChartCard = ({ title, data }: Props) => (
  <article className="analytics-chart-card">
    <h4>{title}</h4>
    {data.length === 0 ? (
      <p className="analytics-empty">No data yet.</p>
    ) : (
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} layout="vertical" margin={{ left: 16, right: 16 }}>
          <CartesianGrid strokeDasharray="3 3" horizontal={false} />
          <XAxis type="number" allowDecimals={false} />
          <YAxis dataKey="name" type="category" width={120} />
          <Tooltip />
          <Bar dataKey="value" fill="#3aa4ad" radius={[0, 8, 8, 0]} />
        </BarChart>
      </ResponsiveContainer>
    )}
  </article>
)
