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

const fallbackProducts: StorefrontProduct[] = [
  {
    id: 'fallback-1',
    name: 'كوكيز ريد فيلفت',
    shortDescription: 'كوكيز ناعم بحشوة كريمية ولمسة غنية ملفتة.',
    detailedDescription: 'قطعة كوكيز مخبوزة يومياً بطابع ريد فيلفت واضح، مناسبة للعرض كبطل بصري في الصفحة الرئيسية أو صفحة المنتجات.',
    imageUrl: heroImage,
    category: 'كوكيز',
    price: 14,
    flags: { topRated: true, mostSelling: true, featured: true },
  },
  {
    id: 'fallback-2',
    name: 'بوكس مشاركة فاخر',
    shortDescription: 'بوكس مختار للمناسبات الصغيرة والمشاركة السريعة.',
    detailedDescription: 'بوكس متوازن يجمع أكثر من نكهة في تقديم جاهز ومثالي للهدايا أو الطلبات العائلية والموسمية.',
    imageUrl: heroImage,
    category: 'بوكسات',
    price: 36,
    flags: { topRated: true, mostSelling: false, featured: false },
  },
  {
    id: 'fallback-3',
    name: 'آيس ماتشا لاتيه',
    shortDescription: 'مشروب بارد خفيف يرافق الكوكيز بشكل مثالي.',
    detailedDescription: 'مشروب منعش بنكهة ماتشا ناعمة، مناسب ليظهر ضمن المنتجات الموسمية أو العروض المركبة.',
    imageUrl: heroImage,
    category: 'مشروبات',
    price: 12,
    flags: { topRated: false, mostSelling: true, featured: false },
  },
  {
    id: 'fallback-4',
    name: 'كوكيز شوكولاتة تشيب',
    shortDescription: 'الطعم الكلاسيكي المفضل بقطع شوكولاتة واضحة.',
    detailedDescription: 'كوكيز كلاسيكي بسطح ذهبي وقطع شوكولاتة ظاهرة، مناسب لقسم الأكثر مبيعاً أو العرض الرئيسي.',
    imageUrl: heroImage,
    category: 'كوكيز',
    price: 11,
    flags: { topRated: false, mostSelling: true, featured: false },
  },
  {
    id: 'fallback-5',
    name: 'بوكس الاحتفال الصغير',
    shortDescription: 'خيار أنيق للهدايا والطلبات السريعة.',
    detailedDescription: 'بوكس مناسب للهدايا والمناسبات الخفيفة، ويعمل جيداً في الواجهة كخيار مرتب وواضح السعر.',
    imageUrl: heroImage,
    category: 'بوكسات',
    price: 28,
    flags: { topRated: true, mostSelling: false, featured: false },
  },
  {
    id: 'fallback-6',
    name: 'موكا بارد',
    shortDescription: 'مشروب بارد غني يكمل تجربة الحلوى.',
    detailedDescription: 'خيار مشروب غني بنكهة الموكا، مناسب لرفع متوسط قيمة الطلب داخل العروض أو المقترحات.',
    imageUrl: heroImage,
    category: 'مشروبات',
    price: 13,
    flags: { topRated: false, mostSelling: false, featured: false },
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

  const resolvedProducts = mappedProducts.length > 0 ? mappedProducts : fallbackProducts.map((product) => ({ ...product }))

  if (resolvedProducts.length > 0 && resolvedProducts.every((product) => !product.flags.topRated)) {
    resolvedProducts.slice(0, 3).forEach((product) => {
      product.flags.topRated = true
    })
  }

  if (resolvedProducts.length > 0 && resolvedProducts.every((product) => !product.flags.mostSelling)) {
    resolvedProducts.slice(0, 3).forEach((product, index) => {
      product.flags.mostSelling = index < 3
    })
  }

  const offers = await fetchOffers(resolvedProducts)

  return {
    products: resolvedProducts,
    offers,
  }
}
