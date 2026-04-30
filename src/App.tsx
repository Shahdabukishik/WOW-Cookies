import { useEffect, useState } from 'react'
import './App.css'

import Header from './components/layout/Header'
import Footer from './components/layout/Footer'

import LoadingPage from './components/common/LoadingPage'
import ErrorPage from './components/common/ErrorPage'

import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import CartPage from './pages/CartPage'
import LoginPage from './pages/LoginPage'
import SimplePage from './pages/SimplePage'
import ProductDetailsPage from './pages/ProductDetailsPage'

import {
  fetchStorefrontData,
  type StorefrontOffer,
  type StorefrontProduct,
} from './services/storefront.service'

import type { CartItem, PageId } from './types/storefront.types'

function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home')
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [products, setProducts] = useState<StorefrontProduct[]>([])
  const [offers, setOffers] = useState<StorefrontOffer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<StorefrontProduct | null>(null)

  useEffect(() => {
    let isActive = true

    fetchStorefrontData()
      .then((data) => {
        if (!isActive) return
        setProducts(data.products)
        setOffers(data.offers)
      })
      .catch((err: unknown) => {
        if (!isActive) return
        const message =
          err instanceof Error
            ? err.message
            : 'تحقق من جداول المنتجات أو مفاتيح Supabase.'
        setError(message)
      })
      .finally(() => {
        if (isActive) setLoading(false)
      })

    return () => {
      isActive = false
    }
  }, [])

  const addToCart = (product: StorefrontProduct) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id)

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        )
      }

      return [...currentItems, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (productId: string) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== productId),
    )
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }

    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item,
      ),
    )
  }

  const openProductDetails = (product: StorefrontProduct) => {
    setSelectedProduct(product)
    setCurrentPage('product-details')
  }

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="app-shell">
      <Header
        currentPage={currentPage}
        cartCount={cartCount}
        onNavigate={setCurrentPage}
      />

      {loading && <LoadingPage />}

      {!loading && error && <ErrorPage message={error} />}

      {!loading && !error && currentPage === 'home' && (
        <HomePage
          offers={offers}
          products={products}
          onNavigate={setCurrentPage}
          onAddToCart={addToCart}
          onOpenProduct={openProductDetails}
        />
      )}

      {!loading && !error && currentPage === 'products' && (
        <ProductsPage
          products={products}
          onAddToCart={addToCart}
          onOpenProduct={openProductDetails}
        />
      )}

      {!loading && !error && currentPage === 'product-details' && selectedProduct && (
        <ProductDetailsPage
          product={selectedProduct}
          onAddToCart={addToCart}
          onNavigate={setCurrentPage}
        />
      )}

      {!loading && !error && currentPage === 'cart' && (
        <CartPage
          items={cartItems}
          onNavigate={setCurrentPage}
          onRemove={removeFromCart}
          onUpdateQuantity={updateQuantity}
          onClear={() => setCartItems([])}
        />
      )}

      

      {!loading && !error && currentPage === 'offers' && (
        <SimplePage
          title="صفحة العروض"
          description="هذه الصفحة جاهزة كمسار مستقل، ويمكن ربطها لاحقاً بعروض قاعدة البيانات أو لوحة التحكم."
        />
      )}

      {!loading && !error && currentPage === 'locations' && (
        <SimplePage
          title="صفحة الفروع"
          description="هذا المسار جاهز الآن ضمن الواجهة ويمكن تطويره لاحقاً ليعرض الفروع وساعات العمل."
        />
      )}

      <Footer />
    </div>
  )
}

export default App