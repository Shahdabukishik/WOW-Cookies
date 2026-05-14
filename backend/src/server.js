import "dotenv/config"
import cors from "cors"
import express from "express"
import { Pool } from "pg"
import { createClient } from "@supabase/supabase-js"
import { pickRecommendation } from "./recommendation.js"

const app = express()
const port = Number(process.env.PORT || 4000)
const frontendOrigin = process.env.FRONTEND_ORIGIN || "http://localhost:5173"
const databaseUrl = process.env.DATABASE_URL
const supabaseUrl = process.env.SUPABASE_URL
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

const mode = databaseUrl ? "postgres" : "supabase"

const pool = databaseUrl
  ? new Pool({
      connectionString: databaseUrl,
      ssl: { rejectUnauthorized: false },
    })
  : null

const supabase =
  !databaseUrl && supabaseUrl && supabaseServiceRoleKey
    ? createClient(supabaseUrl, supabaseServiceRoleKey, {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      })
    : null

if (!pool && !supabase) {
  throw new Error(
    "Missing database configuration. Set DATABASE_URL or SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY.",
  )
}

app.use(cors({ origin: frontendOrigin }))
app.use(express.json())

app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "recommendation-backend", mode })
})

async function loadDataFromPostgres(userId) {
  const productsQ = pool.query(
    `select id, name, description, price, image_url, category, is_active, created_at, rating
     from products
     where is_active = true`,
  )

  const globalInteractionsQ = pool.query(
    `select product_id, type, source, created_at
     from user_interactions`,
  )

  const globalOrdersQ = pool.query(
    `select product_id, quantity, created_at
     from order_items`,
  )

  const [productsR, globalInteractionsR, globalOrdersR] = await Promise.all([
    productsQ,
    globalInteractionsQ,
    globalOrdersQ,
  ])

  let userInteractions = []
  let userOrders = []

  if (userId) {
    const userInteractionsR = await pool.query(
      `select ui.product_id, ui.type, ui.source, ui.created_at, p.category
       from user_interactions ui
       left join products p on p.id = ui.product_id
       where ui.user_id = $1`,
      [userId],
    )

    userInteractions = userInteractionsR.rows.map((row) => ({
      product_id: row.product_id,
      type: row.type,
      source: row.source,
      created_at: row.created_at,
      products: { category: row.category },
    }))

    const userOrdersR = await pool.query(
      `select oi.product_id, oi.quantity, oi.created_at, p.category
       from order_items oi
       join orders o on o.id = oi.order_id
       left join products p on p.id = oi.product_id
       where o.user_id = $1`,
      [userId],
    )

    userOrders = userOrdersR.rows.map((row) => ({
      product_id: row.product_id,
      quantity: row.quantity,
      created_at: row.created_at,
      products: { category: row.category },
    }))
  }

  return {
    products: productsR.rows ?? [],
    globalInteractions: globalInteractionsR.rows ?? [],
    globalOrders: globalOrdersR.rows ?? [],
    userInteractions,
    userOrders,
  }
}

async function loadDataFromSupabase(userId) {
  const [{ data: products, error: productsError }, { data: globalInteractions, error: interactionsError }, { data: globalOrders, error: ordersError }] =
    await Promise.all([
      supabase
        .from("products")
        .select("id,name,description,price,image_url,category,is_active,created_at,rating")
        .eq("is_active", true),
      supabase.from("user_interactions").select("product_id,type,source,created_at"),
      supabase.from("order_items").select("product_id,quantity,created_at"),
    ])

  if (productsError) throw productsError
  if (interactionsError) throw interactionsError
  if (ordersError) throw ordersError

  let userInteractions = []
  let userOrders = []

  if (userId) {
    const [{ data: userI, error: userIError }, { data: userO, error: userOError }] =
      await Promise.all([
        supabase
          .from("user_interactions")
          .select("product_id,type,source,created_at,products(category)")
          .eq("user_id", userId),
        supabase.from("orders").select("id").eq("user_id", userId),
      ])

    if (userIError) throw userIError
    if (userOError) throw userOError

    userInteractions = userI ?? []

    const orderIds = (userO ?? []).map((order) => order.id)
    if (orderIds.length > 0) {
      const { data: orderItems, error: orderItemsError } = await supabase
        .from("order_items")
        .select("product_id,quantity,created_at,products(category)")
        .in("order_id", orderIds)
      if (orderItemsError) throw orderItemsError
      userOrders = orderItems ?? []
    }
  }

  return {
    products: products ?? [],
    globalInteractions: globalInteractions ?? [],
    globalOrders: globalOrders ?? [],
    userInteractions,
    userOrders,
  }
}

app.get("/api/recommendations/hero", async (req, res) => {
  try {
    const userId = typeof req.query.user_id === "string" ? req.query.user_id : null
    const data = pool
      ? await loadDataFromPostgres(userId)
      : await loadDataFromSupabase(userId)

    if (!data.products || data.products.length === 0) {
      return res.status(404).json({ message: "No products available for recommendation." })
    }

    const picked = pickRecommendation({
      products: data.products,
      userInteractions: data.userInteractions,
      userOrders: data.userOrders,
      globalInteractions: data.globalInteractions,
      globalOrders: data.globalOrders,
    })

    if (!picked) {
      return res.status(404).json({ message: "Could not compute recommendation." })
    }

    return res.json({
      recommended_product_id: picked.product.id,
      product: picked.product,
      score: Number(picked.score.toFixed(4)),
      reasons: picked.reasons,
      generated_at: new Date().toISOString(),
      mode,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected server error"
    return res.status(500).json({ message })
  }
})

app.listen(port, () => {
  console.log(`Recommendation backend running on http://localhost:${port} (${mode})`)
})
