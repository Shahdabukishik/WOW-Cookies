import type { PageId } from '../../types/storefront.types'

const navItems: Array<{ label: string; page: PageId }> = [
  { label: 'الرئيسية', page: 'home' },
  { label: 'المنتجات', page: 'products' },
  { label: 'العروض', page: 'offers' },
  { label: 'الفروع', page: 'locations' },
  { label: 'تسجيل الدخول', page: 'login' },
]

function Header({
  currentPage,
  cartCount,
  onNavigate,
}: {
  currentPage: PageId
  cartCount: number
  onNavigate: (page: PageId) => void
}) {
  return (
    <header className="wow-header">
      <div className="wow-container wow-header-inner">
        <button className="brand-button" onClick={() => onNavigate('home')}>
          <span className="brand-mark">WOW</span>
          <span className="brand-copy">
            <strong>واو كوكيز</strong>
            <small>مخبوزات طازجة كل يوم</small>
          </span>
        </button>

        <nav className="wow-nav">
          {navItems.map((item) => (
            <button
              key={item.page}
              className={`wow-nav-link ${currentPage === item.page ? 'active' : ''}`}
              onClick={() => onNavigate(item.page)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="wow-header-actions">
          <button className="ghost-pill" onClick={() => onNavigate('cart')}>
            السلة
            {cartCount > 0 ? <span className="cart-count">{cartCount}</span> : null}
          </button>
          <button className="primary-pill" onClick={() => onNavigate('products')}>
            اطلب الآن
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header