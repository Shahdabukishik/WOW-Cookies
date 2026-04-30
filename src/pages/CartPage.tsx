import type { CartItem, PageId } from '../types/storefront.types'

function CartPage({
  items,
  onNavigate,
  onRemove,
  onUpdateQuantity,
  onClear,
}: {
  items: CartItem[]
  onNavigate: (page: PageId) => void
  onRemove: (productId: string) => void
  onUpdateQuantity: (productId: string, quantity: number) => void
  onClear: () => void
}) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  if (items.length === 0) {
    return (
      <main className="empty-state-shell">
        <div className="glass-card empty-card">
          <p className="section-kicker">السلة</p>
          <h1>السلة فارغة حالياً</h1>
          <p>لم تقم بإضافة أي منتج بعد. ابدأ من صفحة المنتجات واختر النكهات التي ترغب بها.</p>
          <button className="primary-pill" onClick={() => onNavigate('products')}>
            تصفح المنتجات
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="page-shell">
      <section className="wow-container cart-hero">
        <div>
          <p className="section-kicker">سلة التسوق</p>
          <h1 className="page-title">راجع طلبك قبل المتابعة للدفع</h1>
          <p className="section-description">
            عدّل الكميات أو احذف أي منتج، ثم تابع إلى تسجيل الدخول لإكمال الطلب.
          </p>
        </div>
        <div className="glass-card cart-count-card">
          <span>عدد الأصناف</span>
          <strong>{items.length}</strong>
        </div>
      </section>

      <section className="section-block">
        <div className="wow-container cart-layout">
          <div className="cart-items-column">
            {items.map((item) => (
              <article key={item.id} className="cart-item-card">
                <img src={item.imageUrl} alt={item.name} className="cart-item-image" />

                <div className="cart-item-body">
                  <div className="row-between row-start">
                    <div>
                      <h3>{item.name}</h3>
                      <p>{item.shortDescription}</p>
                    </div>
                    <button className="danger-pill" onClick={() => onRemove(item.id)}>
                      إزالة
                    </button>
                  </div>

                  <div className="row-between wrap-row">
                    <div className="quantity-control">
                      <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>+</button>
                    </div>
                    <div className="cart-pricing">
                      <span>{item.price} ريال</span>
                      <strong>{item.price * item.quantity} ريال</strong>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <aside className="glass-card cart-summary-card">
            <p className="section-kicker">الملخص</p>
            <h2>إجمالي الطلب</h2>

            <div className="summary-row">
              <span>المنتجات</span>
              <strong>{total} ريال</strong>
            </div>
            <div className="summary-row">
              <span>التوصيل</span>
              <strong>يحدد لاحقاً</strong>
            </div>
            <div className="summary-row">
              <span>الإجمالي</span>
              <strong>{total} ريال</strong>
            </div>

            <button className="primary-pill full-width" onClick={() => onNavigate('login')}>
              المتابعة للدفع
            </button>
            <button className="ghost-pill full-width" onClick={onClear}>
              إفراغ السلة
            </button>
          </aside>
        </div>
      </section>
    </main>
  )
}

export default CartPage
