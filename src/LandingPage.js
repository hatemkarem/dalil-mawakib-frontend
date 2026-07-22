import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

function LandingPage({ user, onLogout }) {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <div className="bg-pattern"></div>

      <nav className="navbar">
        <div className="nav-brand">
          <span className="nav-icon">🕌</span>
          <span>دليل المواكب</span>
        </div>
        {user ? (
          <div className="nav-user">
            <span className="user-phone">{user.phone}</span>
            <button onClick={onLogout} className="nav-logout">
              <span>🚪</span>
              <span>خروج</span>
            </button>
          </div>
        ) : (
          <button onClick={() => navigate('/login')} className="nav-login">
            <span>📱</span>
            <span>تسجيل الدخول</span>
          </button>
        )}
      </nav>

      <header className="hero-section">
        <div className="hero-content animate-fade-in">
          <div className="hero-badge">
            <span className="badge-icon">🕌</span>
            <span>دليل المواكب الحسينية</span>
          </div>

          <h1 className="hero-title">
            اكتشف <span className="highlight-red">مواكب</span>{' '}
            <span className="highlight-yellow">الإمام الحسين</span>
          </h1>

          <p className="hero-description">
            تطبيق شامل لإدارة واستعراض المواكب الحسينية في العراق
            مع خريطة تفاعلية وتفاصيل كاملة
          </p>

          <div className="hero-buttons">
            {user ? (
              <button onClick={() => navigate('/dashboard')} className="btn-primary">
                <span>📍</span>
                لوحة التحكم
                <span>←</span>
              </button>
            ) : (
              <>
                <button onClick={() => navigate('/login')} className="btn-primary">
                  <span>📱</span>
                  تسجيل الدخول (صاحب موكب)
                  <span>←</span>
                </button>
                <button onClick={() => navigate('/guest')} className="btn-guest">
                  <span>👥</span>
                  دخول كضيف
                </button>
              </>
            )}
          </div>
        </div>

        <div className="stats-section">
          <div className="stat-card animate-fade-in" style={{animationDelay: '0.2s'}}>
            <div className="stat-icon" style={{background: 'rgba(196, 30, 58, 0.2)'}}>
              <span style={{fontSize: '32px'}}>🕌</span>
            </div>
            <div className="stat-number">150+</div>
            <div className="stat-label">موكب مسجل</div>
          </div>
          <div className="stat-card animate-fade-in" style={{animationDelay: '0.4s'}}>
            <div className="stat-icon" style={{background: 'rgba(255, 215, 0, 0.2)'}}>
              <span style={{fontSize: '32px'}}>📍</span>
            </div>
            <div className="stat-number" style={{color: '#ffd700'}}>12</div>
            <div className="stat-label">محافظة</div>
          </div>
          <div className="stat-card animate-fade-in" style={{animationDelay: '0.6s'}}>
            <div className="stat-icon" style={{background: 'rgba(255, 255, 255, 0.1)'}}>
              <span style={{fontSize: '32px'}}>👥</span>
            </div>
            <div className="stat-number" style={{color: '#ffffff'}}>5000+</div>
            <div className="stat-label">زائر يومي</div>
          </div>
        </div>
      </header>

      <section className="features-section">
        <h2 className="section-title">
          <span className="highlight-red">مميزات</span>{' '}
          <span className="highlight-yellow">التطبيق</span>
        </h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <span style={{fontSize: '28px'}}>📱</span>
            </div>
            <h3>تسجيل عبر واتساب</h3>
            <p>تسجيل دخول سريع وآمن باستخدام رقم الهاتف وكود OTP</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <span style={{fontSize: '28px'}}>🗺️</span>
            </div>
            <h3>خريطة تفاعلية</h3>
            <p>استعرض المواكب على الخريطة مع التفاصيل والاتجاهات</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <span style={{fontSize: '28px'}}>👥</span>
            </div>
            <h3>دخول كضيف</h3>
            <p>استعرض المواكب بدون تسجيل دخول</p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <span style={{fontSize: '24px'}}>🕌</span>
            <span>دليل المواكب الحسينية</span>
          </div>
          <p className="footer-text">© 2026 - جميع الحقوق محفوظة</p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;