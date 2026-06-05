import type { ReactNode } from "react"

type Props = {
  title: string
  children: ReactNode
}

export const AnalyticsSection = ({ title, children }: Props) => (
  <section className="analytics-section">
    <h3>{title}</h3>
    {children}
  </section>
)
