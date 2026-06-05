import type { CSSProperties } from "react"
import type { KpiMetric } from "@/services/analytics/admin-analytics.service"

type Props = {
  metric: KpiMetric
}

export const MetricCard = ({ metric }: Props) => (
  <article
    className="analytics-card"
    dir="rtl"
    style={{ "--metric-accent": metric.accentColor } as CSSProperties}
  >
    <span className="analytics-card-title">{metric.label}</span>
    <strong>{metric.value}</strong>
    {metric.helper && <small className="analytics-card-helper">{metric.helper}</small>}
    {metric.formula && <small className="analytics-card-formula">{metric.formula}</small>}
  </article>
)
