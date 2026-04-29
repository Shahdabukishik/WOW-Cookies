import heroImage from '../assets/hero.png'
import { supabase } from '../lib/supabaseClient'
import type { Product as DbProduct } from '../types/database.types'

export type StorefrontProduct = {
  id: string
  name: string
  shortDescription: string
  detailedDescription: string
  imageUrl: string
  category: 'كوكيز' | 'بوكسات' | 'مشروبات'
  price: number
  flags: {
    topRated: boolean
    mostSelling: boolean
    featured: boolean
  }
}

export type StorefrontOffer = {
  id: string
  title: string
  description: string
}

export type StorefrontData = {
  products: StorefrontProduct[]
  offers: StorefrontOffer[]
}

type ProductRow = DbProduct

type RelatedProductRow = {
  product_id: string
  quantity?: number
  type?: 'view' | 'click'
}

const categoryMap: Record<ProductRow['category'], StorefrontProduct['category']> = {
  cookie: 'كوكيز',
  box: 'بوكسات',
  drink: 'مشروبات',
}

const fallbackOffers: StorefrontOffer[] = [
  {
    id: 'offer-1',
    title: 'عرض نهاية الأسبوع',
    description: 'يمكن استبدال هذا القسم لاحقاً بعروض قادمة من قاعدة البيانات أو لوحة التحكم.',
  },
  {
    id: 'offer-2',
    title: 'أكثر المنتجات طلباً',
    description: 'هذا البلوك جاهز لعرض حملات موسمية أو عروض مركبة بناءً على بيانات المبيعات.',
  },
  {
    id: 'offer-3',
    title: 'واجهة جاهزة للنشر',
    description: 'يمكن استخدام نفس البيانات هنا وفي الصفحة الرئيسية والحملات التسويقية.',
  },
]

function getDescriptionParts(description: string | null) {
  const clean = description?.trim() || 'وصف المنتج سيظهر هنا بعد ربط البيانات من Supabase.'
  const firstSentence = clean.split(/[.!؟]/)[0]?.trim() || clean
  return {
    shortDescription: firstSentence.length > 90 ? `${firstSentence.slice(0, 87)}...` : firstSentence,
    detailedDescription: clean,
  }
}

function mapProduct(
  product: ProductRow,
  flags?: Partial<StorefrontProduct['flags']>,
): StorefrontProduct {
  const { shortDescription, detailedDescription } = getDescriptionParts(product.description)

  return {
    id: product.id,
    name: product.name,
    shortDescription,
    detailedDescription,
    imageUrl: product.image_url || heroImage,
    category: categoryMap[product.category],
    price: product.price,
    flags: {
      topRated: Boolean(flags?.topRated),
      mostSelling: Boolean(flags?.mostSelling),
      featured: Boolean(flags?.featured),
    },
  }
}

async function fetchActiveProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  if (error) throw error
  return (data ?? []) as ProductRow[]
}

async function fetchMostSellingIds() {
  const { data, error } = await supabase
    .from('order_items')
    .select('product_id, quantity, product:products(*)')

  if (error) return []

  const scores = new Map<string, number>()
  ;((data ?? []) as RelatedProductRow[]).forEach((row) => {
    const current = scores.get(row.product_id) ?? 0
    scores.set(row.product_id, current + (row.quantity ?? 1))
  })

  return [...scores.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([productId]) => productId)
}

async function fetchTopRatedIds() {
  const { data, error } = await supabase
    .from('user_interactions')
    .select('product_id, type, product:products(*)')

  if (error) return []

  const scores = new Map<string, number>()
  ;((data ?? []) as RelatedProductRow[]).forEach((row) => {
    const weight = row.type === 'click' ? 2 : 1
    const current = scores.get(row.product_id) ?? 0
    scores.set(row.product_id, current + weight)
  })

  return [...scores.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([productId]) => productId)
}

async function fetchOffers(products: StorefrontProduct[]) {
  const { data, error } = await supabase.from('offers').select('*')

  if (!error && Array.isArray(data) && data.length > 0) {
    return data.slice(0, 3).map((offer: Record<string, unknown>, index: number) => ({
      id: String(offer.id ?? `offer-${index + 1}`),
      title: String(offer.title ?? `عرض ${index + 1}`),
      description: String(offer.description ?? 'وصف العرض سيظهر هنا.'),
    }))
  }

  if (products.length >= 3) {
    return [
      {
        id: 'offer-derived-1',
        title: `جرّب ${products[0].name}`,
        description: `اعرض هذا البلوك كعرض بارز مع صورة ${products[0].name} وسعره مباشرة من قاعدة البيانات.`,
      },
      {
        id: 'offer-derived-2',
        title: `الأكثر شعبية: ${products[1].name}`,
        description: `يمكن استبدال هذا المحتوى لاحقاً بعرض حقيقي أو حملة موسمية من لوحة التحكم.`,
      },
      {
        id: 'offer-derived-3',
        title: `اقتراح اليوم: ${products[2].name}`,
        description: 'واجهة العروض جاهزة الآن، وحتى بدون جدول عروض ستبقى الصفحة مكتملة بصرياً.',
      },
    ]
  }

  return fallbackOffers
}

export async function fetchStorefrontData(): Promise<StorefrontData> {
  const products = await fetchActiveProducts()
  const [topRatedIds, mostSellingIds] = await Promise.all([
    fetchTopRatedIds(),
    fetchMostSellingIds(),
  ])

  const topRatedSet = new Set(topRatedIds.slice(0, 4))
  const mostSellingSet = new Set(mostSellingIds.slice(0, 4))
  const featuredId = products[0]?.id

  const mappedProducts = products.map((product) =>
    mapProduct(product, {
      topRated: topRatedSet.has(product.id),
      mostSelling: mostSellingSet.has(product.id),
      featured: product.id === featuredId,
    }),
  )

  if (mappedProducts.length > 0 && mappedProducts.every((product) => !product.flags.topRated)) {
    mappedProducts.slice(0, 3).forEach((product) => {
      product.flags.topRated = true
    })
  }

  if (mappedProducts.length > 0 && mappedProducts.every((product) => !product.flags.mostSelling)) {
    mappedProducts.slice(0, 3).forEach((product, index) => {
      product.flags.mostSelling = index < 3
    })
  }

  const offers = await fetchOffers(mappedProducts)

  return {
    products: mappedProducts,
    offers,
  }
}
