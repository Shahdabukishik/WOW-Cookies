function IntroSection() {
  const stats = [
    { value: 'Live', label: 'محتوى من Supabase' },
    { value: '24h', label: 'تحديث سريع للمحتوى' },
    { value: '100%', label: 'تجربة عربية متناسقة' },
  ]

  const points = [
    {
      title: 'أقسام واضحة',
      description:
        'العروض، الأعلى تقييماً، والأكثر مبيعاً تظهر بترتيب يساعد الزائر على الاستكشاف بسرعة.',
    },
    {
      title: 'جاهز للبيانات',
      description: 'كل قسم مصمم ليأخذ محتواه من قاعدة البيانات دون الحاجة لتغيير الواجهة.',
    },
    {
      title: 'واجهة تشجّع الطلب',
      description: 'عرض بصري قوي للصور والأسعار والوصف يجعل المنتجات أوضح وأكثر إقناعاً.',
    },
  ]

  return (
    <section className="section-block">
      <div className="wow-container intro-grid">
        <div className="glass-card intro-panel">
          <p className="section-kicker">واجهة المتجر</p>
          <h2>ترتيب رئيسي ذكي يسهل عرض المحتوى القادم من قاعدة البيانات</h2>
          <p className="section-description">
            الصفحة تبدأ بانطباع قوي ثم تنتقل إلى العروض، وبعدها المنتجات الأعلى تقييماً، ثم
            الأكثر مبيعاً، وأخيراً كل المنتجات في مساحة واضحة وسهلة التصفح.
          </p>

          <div className="stats-grid">
            {stats.map((stat) => (
              <div key={stat.label} className="mini-card centered">
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="feature-grid">
          {points.map((point) => (
            <div key={point.title} className="mini-card">
              <p className="section-kicker">ميزة مهمة</p>
              <h3>{point.title}</h3>
              <p>{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default IntroSection