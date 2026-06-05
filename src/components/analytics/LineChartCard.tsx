import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import type { TimeSeriesDatum } from "@/services/analytics/admin-analytics.service"

type Props = {
  title: string
  data: TimeSeriesDatum[]
}

export const LineChartCard = ({ title, data }: Props) => (
  <article className="analytics-chart-card analytics-chart-wide">
    <h4>{title}</h4>
    {data.length === 0 ? (
      <p className="analytics-empty">No recommendation events yet.</p>
    ) : (
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data} margin={{ left: 8, right: 16 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />

          <Line
            type="monotone"
            dataKey="impressions"
            stroke="#3aa4ad"
            strokeWidth={2}
            name="مرات الظهور"
          />

          <Line
            type="monotone"
            dataKey="clicks"
            stroke="#16777f"
            strokeWidth={2}
            name="النقرات"
          />

          <Line
            type="monotone"
            dataKey="purchases"
            stroke="#b67d3a"
            strokeWidth={2}
            name="المشتريات"
          />
        </LineChart>
      </ResponsiveContainer>
    )}
  </article>
)
