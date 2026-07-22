import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './GuestView.css';

function GuestView({ apiUrl }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('all');

  const cities = [
    { id: 'all', name: 'الكل' },
    { id: 'karbala', name: 'كربلاء' },
    { id: 'najaf', name: 'النجف' },
    { id: 'baghdad', name: 'بغداد' },
    { id: 'basra', name: 'البصرة' },
  ];

  const mawakib = [
    {
      id: 1,
      name: 'موكب الإمام الحسين',
      city: 'كربلاء',
      area: 'حي المعلمين',
      services: ['تقديم طعام', 'ماء', 'مكان للراحة', 'خدمات إسعافية'],
      phone: '07701234567',
      visitors: 1200,
      image: '🕌'
    },
    {
      id: 2,
      name: 'موكب أبو الفضل العباس',
      city: 'كربلاء',
      area: 'الحسينية',
      services: ['تقديم طعام', 'إسعافات أولية', 'توفير ماء'],
      phone: '07709876543',
      visitors: 800,
      image: '🏛️'
    },
    {
      id: 3,
      name: 'موكب الإمام علي',
      city: 'النجف',
      area: 'الصحن الحيدري',
      services: ['تقديم طعام', 'ماء', 'مكان للراحة'],
      phone: '07701112233',
      visitors: 1500,
      image: '🕌'
    },
    {
      id: 4,
      name: 'موكب العقيلة زينب',
      city: 'بغداد',
      area: 'الكاظمية',
      services: ['تقديم طعام', 'ماء'],
      phone: '07704445566',
      visitors: 600,
      image: '🏛️'
    }
  ];

  const filteredMawakib = mawakib.filter(m => {
    const matchesSearch = m.name.includes(searchQuery) || m.city.includes(searchQuery);
    const matchesCity = selectedCity === 'all' || m.city === cities.find(c => c.id === selectedCity)?.name;
    return matchesSearch && matchesCity;
  });

  return (
    <div className="guest-view">
      <header className="guest-header">
        <div className="guest-header-content">
          <div className="guest-brand">
            <span style={{fontSize: '32px'}}>🕌</span>
            <div>
              <h1>دليل المواكب الحسينية</h1>
              <p>استعرض المواكب بدون تسجيل</p>
            </div>
          </div>
          <Link to="/" className="back-home">
            <span>→</span>
            العودة للرئيسية
          </Link>
        </div>
      </header>

      <div className="search-section">
        <div className="search-box">
          <span>🔍</span>
          <input
            type="text"
            placeholder="ابحث عن موكب..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-tabs">
          <span>🔽</span>
          {cities.map(city => (
            <button
              key={city.id}
              className={`filter-tab ${selectedCity === city.id ? 'active' : ''}`}
              onClick={() => setSelectedCity(city.id)}
            >
              {city.name}
            </button>
          ))}
        </div>
      </div>

      <main className="mawakib-grid">
        {filteredMawakib.length === 0 ? (
          <div className="no-results">
            <span style={{fontSize: '48px'}}>🔍</span>
            <h3>لا توجد نتائج</h3>
            <p>جرب البحث بكلمات مختلفة</p>
          </div>
        ) : (
          filteredMawakib.map(moawkib => (
            <div key={moawkib.id} className="mawakib-item">
              <div className="mawakib-image">
                <span className="mawakib-emoji">{moawkib.image}</span>
              </div>
              <div className="mawakib-content">
                <div className="mawakib-header-guest">
                  <h3>{moawkib.name}</h3>
                  <span className="visitor-count">
                    <span>←</span>
                    {moawkib.visitors} زائر
                  </span>
                </div>
                <div className="mawakib-location">
                  <span>📍</span>
                  <span>{moawkib.city} - {moawkib.area}</span>
                </div>
                <div className="mawakib-services-guest">
                  {moawkib.services.map((service, idx) => (
                    <span key={idx} className="service-pill">{service}</span>
                  ))}
                </div>
                <div className="mawakib-contact">
                  <a href={`tel:${moawkib.phone}`} className="contact-btn phone">
                    <span>📞</span>
                    {moawkib.phone}
                  </a>
                  <button className="contact-btn map">
                    <span>🧭</span>
                    الاتجاهات
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </main>

      <footer className="guest-footer">
        <p>هل أنت صاحب موكب؟ <Link to="/login" className="login-link">سجل دخولك</Link></p>
      </footer>
    </div>
  );
}

export default GuestView;