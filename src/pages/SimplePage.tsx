function SimplePage({ title, description }: { title: string; description: string }) {
  return (
    <main className="page-shell">
      <section className="wow-container centered-banner">
        <div className="glass-card centered-card">
          <p className="section-kicker">مسار جاهز</p>
          <h1 className="page-title">{title}</h1>
          <p className="section-description">{description}</p>
        </div>
      </section>
    </main>
  )
}

export default SimplePage
