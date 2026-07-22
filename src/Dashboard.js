import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

function Dashboard({ user, onLogout, apiUrl }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const [mawakib] = useState([
    {
      id: 1,
      name: 'موكب الإمام الحسين',
      city: 'كربلاء',
      area: 'حي المعلمين',
      services: ['تقديم طعام', 'ماء', 'مكان للراحة'],
      visitors: 1200,
      status: 'active'
    },
    {
      id: 2,
      name: 'موكب أبو الفضل العباس',
      city: 'كربلاء',
      area: 'الحسينية',
      services: ['تقديم طعام', 'إسعافات أولية'],
      visitors: 800,
      status: 'active'
    }
  ]);

  const stats = [
    { label: 'المواكب', value: mawakib.length, icon: '🕌', color: '#c41e3a' },
    { label: 'الزوار', value: '2,000+', icon: '👥', color: '#ffd700' },
    { label: 'المدن', value: '1', icon: '📍', color: '#ffffff' },
  ];

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <span style={{fontSize: '28px'}}>🕌</span>
          <span>دليل المواكب</span>
        </div>

        <nav className="sidebar-nav">
          <button className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>
            <span>👁️</span>
            <span>نظرة عامة</span>
          </button>
          <button className={`nav-item ${activeTab === 'mawakib' ? 'active' : ''}`} onClick={() => setActiveTab('mawakib')}>
            <span>🕌</span>
            <span>مواكبي</span>
          </button>
          <button className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => setActiveTab('settings')}>
            <span>⚙️</span>
            <span>الإعدادات</span>
          </button>
        </nav>

        <div className="sidebar-footer">
          <div className="user-info">
            <span>📱</span>
            <span>{user?.phone}</span>
          </div>
          <button onClick={onLogout} className="logout-btn">
            <span>🚪</span>
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </aside>

      <main className="main-content">
        <header className="content-header">
          <h1>لوحة التحكم</h1>
          <button className="btn-primary">
            <span>➕</span>
            إضافة موكب جديد
          </button>
        </header>

        {activeTab === 'overview' && (
          <div className="tab-content">
            <div className="stats-grid">
              {stats.map((stat, index) => (
                <div key={index} className="stat-card-dash">
                  <div className="stat-icon-dash" style={{background: `${stat.color}20`}}>
                    <span style={{fontSize: '28px'}}>{stat.icon}</span>
                  </div>
                  <div className="stat-info">
                    <div className="stat-value" style={{color: stat.color}}>{stat.value}</div>
                    <div className="stat-label-dash">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="section-header">
              <h2>مواكبي</h2>
              <button className="view-all">
                عرض الكل
                <span>←</span>
              </button>
            </div>

            <div className="mawakib-list">
              {mawakib.map(moawkib => (
                <div key={moawkib.id} className="moawkib-card">
                  <div className="moawkib-header">
                    <div className="moawkib-title">
                      <span style={{fontSize: '24px'}}>🕌</span>
                      <h3>{moawkib.name}</h3>
                    </div>
                    <span className={`status-badge ${moawkib.status}`}>
                      {moawkib.status === 'active' ? 'نشط' : 'متوقف'}
                    </span>
                  </div>
                  <div className="moawkib-details">
                    <div className="detail-item">
                      <span>📍</span>
                      <span>{moawkib.city} - {moawkib.area}</span>
                    </div>
                    <div className="detail-item">
                      <span>👥</span>
                      <span>{moawkib.visitors} زائر</span>
                    </div>
                  </div>
                  <div className="moawkib-services">
                    {moawkib.services.map((service, idx) => (
                      <span key={idx} className="service-tag">{service}</span>
                    ))}
                  </div>
                  <div className="moawkib-actions">
                    <button className="action-btn edit">
                      <span>✏️</span>
                      تعديل
                    </button>
                    <button className="action-btn delete">
                      <span>🗑️</span>
                      حذف
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'mawakib' && (
          <div className="tab-content">
            <div className="empty-state">
              <span style={{fontSize: '48px'}}>🕌</span>
              <h2>إدارة المواكب</h2>
              <p>يمكنك إضافة وتعديل وحذف مواكبك من هنا</p>
              <button className="btn-primary">
                <span>➕</span>
                إضافة موكب جديد
              </button>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="tab-content">
            <div className="settings-card">
              <h2>إعدادات الحساب</h2>
              <div className="setting-item">
                <label>رقم الهاتف</label>
                <input type="text" value={user?.phone} disabled className="input-field" />
              </div>
              <div className="setting-item">
                <label>تاريخ التسجيل</label>
                <input type="text" value={user?.createdAt ? new Date(user.createdAt).toLocaleDateString('ar-IQ') : '-'} disabled className="input-field" />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Dashboard;