function Footer() {
  return (
    <footer className="wow-footer">
      <div className="wow-container wow-footer-top">
        <div className="wow-footer-brand">
          <h2>واو كوكيز</h2>
          <p>مخبوزات طازجة يومياً بطعم يبهج يومك.</p>
        </div>

        <div className="wow-footer-contact">
          <p className="section-kicker">تواصل معنا</p>
          <a href="mailto:woowcookies25@gmail.com">woowcookies25@gmail.com</a>
          <a
            href="https://www.instagram.com/woow.cooki?igsh=dXhrOTFuanFzbGxr&utm_source=qr"
            target="_blank"
            rel="noreferrer"
          >
            Instagram: @woow.cooki
          </a>
        </div>

        <div className="wow-footer-note">
          <p className="section-kicker">الخدمة</p>
          <p>طلب سريع - توصيل مرن - نكهات مميزة</p>
        </div>
      </div>

      <div className="wow-footer-bottom">
        <div className="wow-container">
          <small>© {new Date().getFullYear()} WOW COOKIES. جميع الحقوق محفوظة.</small>
        </div>
      </div>
    </footer>
  )
}
 
export default Footer
