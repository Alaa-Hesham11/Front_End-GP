export default function Navbar() {
  return (
    <header className="navbar">
      <div className="logo">
        <i className="fa-solid fa-eye"></i> مشروع الإشارة
      </div>

      <nav>
        <a href="#hero" className="active">
          <i className="fa-solid fa-pyramid"></i> الرئيسية
        </a>
        <a href="#translation">
          <i className="fa-solid fa-language"></i> الترجمة
        </a>
        <a href="#">تعلم الإشارات</a>
        <a href="#" className="login-btn">دخول</a>
        <a href="#" className="signup-btn">تسجيل</a>
      </nav>
    </header>
  );
}
