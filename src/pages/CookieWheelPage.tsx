import { useMemo, useState } from "react"
import EmptyCollectionState from "@/components/common/EmptyCollectionState"
import { useCart } from "@/hooks/useCart"
import { useProducts } from "@/hooks/useProducts"
import type { Product } from "@/types/database.types"
import { Link, useNavigate } from "react-router-dom"

const shuffle = <T,>(items: T[]) => {
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

export default function CookieWheelPage() {
  const { products, loading } = useProducts()
  const cart = useCart()
  const navigate = useNavigate()
  const [rotation, setRotation] = useState(0)
  const [isSpinning, setIsSpinning] = useState(false)
  const [selectedCookie, setSelectedCookie] = useState<Product | null>(null)

  const cookies = products.filter((product) => product.category === "cookie")
  const wheelCookies = useMemo(() => {
    return shuffle(cookies).slice(0, Math.min(8, cookies.length))
  }, [cookies])

  const spinWheel = () => {
    if (isSpinning || wheelCookies.length === 0) return

    const pickedIndex = Math.floor(Math.random() * wheelCookies.length)
    const segment = 360 / wheelCookies.length
    const landingAngle = 360 - (pickedIndex * segment + segment / 2)
    const extraTurns = (5 + Math.floor(Math.random() * 3)) * 360

    setSelectedCookie(null)
    setIsSpinning(true)
    setRotation((previous) => {
      const normalized = ((previous % 360) + 360) % 360
      return previous - normalized + extraTurns + landingAngle
    })

    window.setTimeout(() => {
      setSelectedCookie(wheelCookies[pickedIndex])
      setIsSpinning(false)
    }, 4200)
  }

  const handleOrder = () => {
    if (!selectedCookie) return
    cart.addToCart(selectedCookie)
    setSelectedCookie(null)
    navigate("/cart")
  }

  if (loading) return <p>جارِ التحميل...</p>

  return (
    <main className="page-shell">
      <section className="section-block">
        <div className="wow-container">
          <div className="mood-page-head glass-card">
            <h1 className="mood-emoji-only" aria-label="عجلة الكوكيز">🍪</h1>
            <Link className="primary-pill small" to="/">
              رجوع
            </Link>
          </div>

          {wheelCookies.length === 0 ? (
            <EmptyCollectionState
              title="لا توجد كوكيز متاحة"
              description="تحقق لاحقًا للحصول على دفعات كوكيز جديدة."
            />
          ) : (
            <div className="mood-wheel-wrap glass-card">
              <p className="mood-wheel-lead">مش متأكد شو تطلب؟ لف العجلة وشوف شو بيطلعلك!</p>
              <button
                type="button"
                className="mood-wheel-button"
                onClick={spinWheel}
                disabled={isSpinning}
              >
                <span className="mood-wheel-pointer" />
                <div
                  className={`mood-wheel ${isSpinning ? "spinning" : ""}`}
                  style={{
                    transform: `rotate(${rotation}deg)`,
                    background: `conic-gradient(${wheelCookies
                      .map((_, index) => {
                        const from = (index * 360) / wheelCookies.length
                        const to = ((index + 1) * 360) / wheelCookies.length
                        const color = index % 2 === 0 ? "#3aa4ad" : "#f3c27b"
                        return `${color} ${from}deg ${to}deg`
                      })
                      .join(", ")})`,
                  }}
                >
                  {wheelCookies.map((cookie, index) => {
                    const segment = 360 / wheelCookies.length
                    const angle = index * segment + segment / 2
                    const radians = (angle * Math.PI) / 180
                    const radius = 36
                    const x = 50 + radius * Math.sin(radians)
                    const y = 50 - radius * Math.cos(radians)
                    return (
                      <span
                        key={cookie.id}
                        className={`mood-wheel-label ${index % 2 === 0 ? "teal-chip" : "sand-chip"}`}
                        style={{ left: `${x}%`, top: `${y}%`, transform: `translate(-50%, -50%) rotate(${angle - 90}deg)` }}
                      >
                        <small>{cookie.name}</small>
                      </span>
                    )
                  })}
                </div>
              </button>
              <p className="mood-wheel-hint">{isSpinning ? "جاري اللف..." : "اضغط على العجلة للّف"}</p>
            </div>
          )}

          {selectedCookie ? (
            <div className="spin-result-backdrop" role="dialog" aria-modal="true">
              <article className="spin-result-card glass-card">
                <button
                  type="button"
                  className="icon-button spin-result-close"
                  onClick={() => setSelectedCookie(null)}
                  aria-label="إغلاق نافذة النتيجة"
                >
                  ×
                </button>
                {selectedCookie.image_url ? (
                  <img src={selectedCookie.image_url} alt={selectedCookie.name} className="spin-result-image" />
                ) : null}
                <h2>{selectedCookie.name}</h2>
                <p>{selectedCookie.description ?? "مخبوزة طازة وجاهزة إلك."}</p>
                <strong>₪ {selectedCookie.price.toFixed(2)}</strong>
                <div className="spin-result-actions">
                  <button type="button" className="primary-pill small" onClick={handleOrder}>
                    اطلب الآن
                  </button>
                  <button
                    type="button"
                    className="primary-pill small spin-result-secondary"
                    onClick={() => navigate(`/products/${selectedCookie.id}`)}
                  >
                    عرض التفاصيل
                  </button>
                </div>
              </article>
            </div>
          ) : null}
        </div>
      </section>
    </main>
  )
}
