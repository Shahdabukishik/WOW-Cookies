function CheckoutPage({ items, total, onNavigate }: any) {
  return (
    <main className="checkout-page">
      <section className="checkout-grid">
        <div className="checkout-form">
          <p className="products-label">إكمال الطلب</p>
          <h1>Finalizing Joy</h1>
          <p>Your cookies are just a few details away.</p>

          <h3>Delivery Destination</h3>

          <div className="form-grid">
            <label>First Name<input className="soft-input" placeholder="e.g. Charlie" /></label>
            <label>Last Name<input className="soft-input" placeholder="e.g. Baker" /></label>
            <label>Street Address<input className="soft-input" placeholder="123 Oven Lane" /></label>
            <label>City<input className="soft-input" placeholder="Cookieville" /></label>
          </div>

          <h3>Payment Method</h3>
          <div className="page-card" style={{ padding: 20 }}>
            Card / Credit Debit
          </div>
        </div>

        <aside className="checkout-summary">
          <h2>Order Summary</h2>

          {items.map((item: any) => (
            <div className="summary-line" key={item.id}>
              <span>{item.name}</span>
              <strong>{item.price * item.quantity} ريال</strong>
            </div>
          ))}

          <div className="summary-line total-line">
            <span>Total</span>
            <strong>{total} ريال</strong>
          </div>

          <button className="teal-btn" onClick={() => onNavigate('login')}>
            Continue
          </button>
        </aside>
      </section>
    </main>
  )
}

export default CheckoutPage