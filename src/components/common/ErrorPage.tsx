function ErrorPage({ message }: { message: string }) {
  return (
    <main className="page-shell">
      <section className="wow-container centered-banner">
        <div className="glass-card centered-card">
          <p className="section-kicker">تعذر التحميل</p>
          <h1 className="page-title">لم نتمكن من جلب بيانات المتجر</h1>
          <p className="section-description">{message}</p>
        </div>
      </section>
    </main>
  )
}

export default ErrorPage