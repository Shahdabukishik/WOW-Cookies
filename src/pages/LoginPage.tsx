import { useState, type FormEvent } from 'react'

function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailRegex.test(email)) {
      setEmailError('يرجى إدخال بريد إلكتروني صحيح')
      return
    }

    setEmailError('')
    void password
  }

  return (
    <main className="page-shell">
      <section className="wow-container login-layout">
        <div className="login-aside">
          <p className="section-kicker">حسابك</p>
          <h1>{isSignUp ? 'أنشئ حساباً جديداً وابدأ الطلب' : 'سجّل دخولك وأكمل طلبك بسرعة'}</h1>
          <p>
            صفحة دخول متناسقة مع المتجر، مهيأة لاحقاً لربط تسجيل الدخول الحقيقي وإدارة الطلبات
            والعناوين والمفضلة.
          </p>

          <div className="feature-grid single-column">
            <div className="mini-card">
              <h3>طلب أسرع</h3>
              <p>احفظ بياناتك وواصل الشراء دون خطوات مربكة.</p>
            </div>
            <div className="mini-card">
              <h3>واجهة واضحة</h3>
              <p>حقول مريحة على الجوال وسطح المكتب مع رسائل تنبيه واضحة.</p>
            </div>
            <div className="mini-card">
              <h3>قابل للتطوير</h3>
              <p>جاهز للربط لاحقاً مع المصادقة وقاعدة البيانات.</p>
            </div>
          </div>
        </div>

        <div className="glass-card login-card">
          <div className="switcher">
            <button className={!isSignUp ? 'active' : ''} onClick={() => setIsSignUp(false)}>
              تسجيل الدخول
            </button>
            <button className={isSignUp ? 'active' : ''} onClick={() => setIsSignUp(true)}>
              إنشاء حساب
            </button>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <label className="field">
              <span>البريد الإلكتروني</span>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="name@example.com"
              />
            </label>

            {emailError ? <p className="error-message">{emailError}</p> : null}

            <label className="field">
              <span>كلمة المرور</span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••"
              />
            </label>

            <button type="submit" className="primary-pill full-width">
              {isSignUp ? 'إنشاء حساب' : 'تسجيل الدخول'}
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}

export default LoginPage
