import { supabase } from "@/lib/supabaseClient"

export type KpiMetric = {
  label: string
  value: string
  helper?: string
  formula?: string
  accentColor?: string
}

export type ChartDatum = {
  name: string
  value: number
}

export type TimeSeriesDatum = {
  date: string
  impressions: number
  clicks: number
  purchases: number
}

export type AdminAnalytics = {
  businessKpis: KpiMetric[]
  recommendationKpis: KpiMetric[]
  mostViewedProducts: ChartDatum[]
  mostAddedToCartProducts: ChartDatum[]
  mostPurchasedProducts: ChartDatum[]
  highestRatedProducts: ChartDatum[]
  topRecommendedProducts: ChartDatum[]
  recommendationPerformanceOverTime: TimeSeriesDatum[]
}

type ProductNameRow = {
  product_id?: string
  recommended_product_id?: string
  quantity?: number
  type?: string
  event_type?: string
  created_at?: string
  user_id?: string
  product?: { name?: string | null } | null
  products?: { name?: string | null } | null
}

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "ILS",
  maximumFractionDigits: 0,
})

const numberFormat = new Intl.NumberFormat("en-US")

const formatPercent = (value: number): string => `${Number(value.toFixed(1))}%`

const formatCount = (value: number): string => numberFormat.format(value)

const buildPercentFormula = (
  numeratorLabel: string,
  numerator: number,
  denominatorLabel: string,
  denominator: number,
): string => `${numeratorLabel} (${formatCount(numerator)}) ÷ ${denominatorLabel} (${formatCount(denominator)}) × 100`

const safeArray = <Row>(value: Row[] | null): Row[] => value ?? []

const getProductName = (row: ProductNameRow): string =>
  row.product?.name ?? row.products?.name ?? row.product_id ?? row.recommended_product_id ?? "Unknown"

const topCounts = (rows: ProductNameRow[], limit = 6): ChartDatum[] => {
  const counts = new Map<string, number>()

  rows.forEach((row) => {
    const name = getProductName(row)
    counts.set(name, (counts.get(name) ?? 0) + Number(row.quantity ?? 1))
  })

  return [...counts.entries()]
    .map(([name, value]) => ({ name, value }))
    .sort((left, right) => right.value - left.value)
    .slice(0, limit)
}

const buildPerformanceSeries = (rows: ProductNameRow[]): TimeSeriesDatum[] => {
  const series = new Map<string, TimeSeriesDatum>()

  rows.forEach((row) => {
    if (!row.created_at) return
    const date = new Date(row.created_at).toISOString().slice(0, 10)
    const current = series.get(date) ?? { date, impressions: 0, clicks: 0, purchases: 0 }

    if (row.event_type === "shown") current.impressions += 1
    if (row.event_type === "clicked") current.clicks += 1
    if (row.event_type === "purchased") current.purchases += 1

    series.set(date, current)
  })

  return [...series.values()].sort((left, right) => left.date.localeCompare(right.date))
}

export const getAdminAnalytics = async (): Promise<AdminAnalytics> => {
  const [
    ordersResult,
    productsResult,
    interactionsResult,
    orderItemsResult,
    recommendationEventsResult,
    profilesResult,
  ] = await Promise.all([
    supabase.from("orders").select("id,user_id,total_price,created_at,status"),
    supabase.from("products").select("id,name,rating"),
    supabase.from("user_interactions").select("user_id,product_id,type,created_at,product:products(name)"),
    supabase.from("order_items").select("product_id,quantity,product:products(name)"),
    supabase
      .from("recommendation_events")
      .select("recommended_product_id,event_type,created_at,product:products(name)"),
    supabase.from("profiles").select("id,created_at"),
  ])

  const error =
    ordersResult.error ??
    productsResult.error ??
    interactionsResult.error ??
    orderItemsResult.error ??
    recommendationEventsResult.error ??
    profilesResult.error

  if (error) throw new Error(error.message)

  const orders = safeArray(ordersResult.data)
  const products = safeArray(productsResult.data)
  const interactions = safeArray(interactionsResult.data) as ProductNameRow[]
  const orderItems = safeArray(orderItemsResult.data) as ProductNameRow[]
  const recommendationEvents = safeArray(recommendationEventsResult.data) as ProductNameRow[]
  const profiles = safeArray(profilesResult.data)

  const totalRevenue = orders.reduce((sum, order) => sum + Number(order.total_price ?? 0), 0)
  const totalOrders = orders.length
  const uniqueCustomers = new Set(orders.map((order) => order.user_id).filter(Boolean))
  const returningCustomers = [...uniqueCustomers].filter(
    (userId) => orders.filter((order) => order.user_id === userId).length > 1,
  ).length
  const activeUsers = new Set([
    ...interactions.map((row) => row.user_id).filter(Boolean),
    ...orders.map((order) => order.user_id).filter(Boolean),
  ]).size
  const averageOrderValue = totalOrders === 0 ? 0 : totalRevenue / totalOrders

  const impressions = recommendationEvents.filter((row) => row.event_type === "shown").length
  const clicks = recommendationEvents.filter((row) => row.event_type === "clicked").length
  const purchases = recommendationEvents.filter((row) => row.event_type === "purchased").length
  const ctr = impressions === 0 ? 0 : (clicks / impressions) * 100
  const conversionRate = clicks === 0 ? 0 : (purchases / clicks) * 100
  const purchaseRate = impressions === 0 ? 0 : (purchases / impressions) * 100

  const highestRatedProducts = products
    .map((product) => ({ name: product.name ?? product.id, value: Number(product.rating ?? 0) }))
    .sort((left, right) => right.value - left.value)
    .slice(0, 6)

  return {
    businessKpis: [
      { label: "إجمالي الإيرادات", value: currency.format(totalRevenue) },
      { label: "إجمالي الطلبات", value: numberFormat.format(totalOrders) },
      { label: "متوسط قيمة الطلب", value: currency.format(averageOrderValue) },
      { label: "العملاء العائدون", value: numberFormat.format(returningCustomers) },
      {
        label: "المستخدمون النشطون",
        value: numberFormat.format(activeUsers || profiles.length),
      },
    ],

    recommendationKpis: [
      {
        label: "مرات ظهور التوصيات",
        value: formatCount(impressions),
        helper: "عدد المرات التي تم فيها عرض توصية للمستخدمين",
        accentColor: "#2563eb",
      },
      {
        label: "النقرات على التوصيات",
        value: formatCount(clicks),
        helper: "عدد مرات الضغط على المنتجات الموصى بها",
        accentColor: "#0891b2",
      },
      {
        label: "المشتريات الناتجة عن التوصيات",
        value: formatCount(purchases),
        helper: "عدد عمليات الشراء التي جاءت من التوصيات",
        accentColor: "#16a34a",
      },
      {
        label: "معدل النقر",
        value: formatPercent(ctr),
        helper: "النقرات ÷ مرات الظهور × 100",
        formula: buildPercentFormula("النقرات", clicks, "مرات الظهور", impressions),
        accentColor: "#7c3aed",
      },
      {
        label: "معدل التحويل",
        value: formatPercent(conversionRate),
        helper: "المشتريات ÷ النقرات × 100",
        formula: buildPercentFormula("المشتريات", purchases, "النقرات", clicks),
        accentColor: "#b45309",
      },
      {
        label: "معدل الشراء من التوصيات",
        value: formatPercent(purchaseRate),
        helper: "المشتريات ÷ مرات الظهور × 100",
        formula: buildPercentFormula("المشتريات", purchases, "مرات الظهور", impressions),
        accentColor: "#166534",
      },
    ],
    mostViewedProducts: topCounts(interactions.filter((row) => row.type === "view")),
    mostAddedToCartProducts: topCounts(interactions.filter((row) => row.type === "add_to_cart")),
    mostPurchasedProducts: topCounts(orderItems),
    highestRatedProducts,
    topRecommendedProducts: topCounts(recommendationEvents),
    recommendationPerformanceOverTime: buildPerformanceSeries(recommendationEvents),
  }
}
