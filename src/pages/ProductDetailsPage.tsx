function ProductDetailsPage({ product, onAddToCart }: any) {
  return (
    <main className="details-page">
      <section className="page-card details-grid">
        <img src={product.imageUrl} alt={product.name} className="details-image" />

        <div className="details-info">
          <p className="products-label">تفاصيل المنتج</p>

          <h1>
            {product.name}
            <br />
            <span>طازج ولذيذ</span>
          </h1>

          <p>{product.detailedDescription || product.shortDescription}</p>

          <div className="price-row">
            <h2>{product.price} ريال</h2>
          </div>

          <button className="teal-btn" onClick={() => onAddToCart(product)}>
            أضف إلى السلة
          </button>

          <div className="nutrition-grid">
            <div className="ingredients-box">
                <h3>المكونات</h3>
                <p>{product.Ingredients || 'لا توجد مكونات'}</p>
              </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default ProductDetailsPage