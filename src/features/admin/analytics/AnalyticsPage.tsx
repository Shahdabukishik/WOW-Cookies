import { AnalyticsSection } from "@/components/analytics/AnalyticsSection"
import { BarChartCard } from "@/components/analytics/BarChartCard"
import { LineChartCard } from "@/components/analytics/LineChartCard"
import { MetricCard } from "@/components/analytics/MetricCard"
import { useAdminAnalytics } from "@/hooks/analytics/useAdminAnalytics"

export const AnalyticsPage = () => {
  const { analytics, loading, error } = useAdminAnalytics()

  if (loading) return <p>جاري تحميل البيانات...</p>

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    )
  }

  if (!analytics) {
    return (
      <div className="alert alert-info" role="status">
        لا توجد بيانات تحليلية متاحة في الوقت الحالي.
      </div>
    )
  }

  return (
    <div className="analytics-page">
      <div className="analytics-header">
        <span>لوحة التحليلات</span>
        <h2>تحليلات التوصيات والأداء التجاري</h2>
      </div>

      <AnalyticsSection title="مؤشرات الأداء الرئيسية">
        <div className="analytics-kpi-grid">
          {analytics.businessKpis.map((metric) => (
            <MetricCard key={metric.label} metric={metric} />
          ))}
        </div>
      </AnalyticsSection>

      <AnalyticsSection title="تحليلات المنتجات">
        <div className="analytics-chart-grid">
          <BarChartCard title="المنتجات الأكثر مشاهدة" data={analytics.mostViewedProducts} />
          <BarChartCard title="المنتجات الأكثر إضافة للسلة" data={analytics.mostAddedToCartProducts} />
          <BarChartCard title="المنتجات الأكثر شراءً" data={analytics.mostPurchasedProducts} />
          <BarChartCard title="المنتجات الأعلى تقييمًا" data={analytics.highestRatedProducts} />
        </div>
      </AnalyticsSection>

      <AnalyticsSection title="تحليلات نظام التوصيات">
        <div className="analytics-kpi-grid">
          {analytics.recommendationKpis.map((metric) => (
            <MetricCard key={metric.label} metric={metric} />
          ))}
        </div>

        <div className="analytics-chart-grid">
          <BarChartCard
            title="المنتجات الأكثر ظهورًا في التوصيات"
            data={analytics.topRecommendedProducts}
          />

          <LineChartCard
            title="أداء التوصيات عبر الزمن"
            data={analytics.recommendationPerformanceOverTime}
          />
        </div>
      </AnalyticsSection>
    </div>
  )
}