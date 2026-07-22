import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './LoginPage.css';

function LoginPage({ onLogin, apiUrl }) {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState('phone');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(t => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleSendOTP = async () => {
    if (!phone || phone.length < 10) {
      setError('الرجاء إدخال رقم هاتف صحيح');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${apiUrl}/auth/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone })
      });
      const data = await response.json();
      if (data.success) {
        setStep('code');
        setTimer(60);
      } else {
        setError(data.message || 'فشل إرسال الكود');
      }
    } catch (err) {
      setError('فشل الاتصال بالخادم. تأكد أن السيرفر يعمل');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    if (!code || code.length !== 6) {
      setError('الرجاء إدخال كود مكون من 6 أرقام');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${apiUrl}/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, code })
      });
      const data = await response.json();
      if (data.success) {
        onLogin(data);
        setStep('success');
        setTimeout(() => navigate('/dashboard'), 1500);
      } else {
        setError(data.message || 'كود التحقق غير صحيح');
      }
    } catch (err) {
      setError('فشل الاتصال بالخادم');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${apiUrl}/auth/resend-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone })
      });
      const data = await response.json();
      if (data.success) {
        setTimer(60);
      } else {
        setError(data.message || 'فشل إعادة الإرسال');
      }
    } catch (err) {
      setError('فشل الاتصال بالخادم');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-bg"></div>
      <div className="login-container">
        <div className="login-brand">
          <span style={{fontSize: '40px'}}>🕌</span>
          <h1>دليل المواكب</h1>
          <p>تسجيل الدخول كصاحب موكب</p>
        </div>

        <div className="login-card">
          <div className="progress-steps">
            <div className={`step ${step === 'phone' ? 'active' : 'completed'}`}>
              <div className="step-number">1</div>
              <span>رقم الهاتف</span>
            </div>
            <div className="step-line"></div>
            <div className={`step ${step === 'code' ? 'active' : step === 'success' ? 'completed' : ''}`}>
              <div className="step-number">2</div>
              <span>كود التحقق</span>
            </div>
            <div className="step-line"></div>
            <div className={`step ${step === 'success' ? 'active' : ''}`}>
              <div className="step-number">3</div>
              <span>تم</span>
            </div>
          </div>

          {error && (
            <div className="error-message">
              <span>⚠️</span>
              {error}
            </div>
          )}

          {step === 'phone' && (
            <div className="login-step">
              <div className="step-icon">
                <span style={{fontSize: '32px'}}>📱</span>
              </div>
              <h2>أدخل رقم هاتفك</h2>
              <p>سنرسل كود التحقق عبر واتساب</p>
              <div className="input-group">
                <span className="input-prefix">+964</span>
                <input
                  type="tel"
                  placeholder="7701234567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  maxLength={10}
                  className="input-field"
                  disabled={loading}
                />
              </div>
              <button onClick={handleSendOTP} disabled={loading || phone.length < 10} className="btn-primary" style={{width: '100%', justifyContent: 'center'}}>
                {loading ? (
                  <>
                    <div className="spinner-small"></div>
                    جاري الإرسال...
                  </>
                ) : (
                  <>
                    <span>💬</span>
                    إرسال الكود عبر واتساب
                    <span>←</span>
                  </>
                )}
              </button>
            </div>
          )}

          {step === 'code' && (
            <div className="login-step">
              <div className="step-icon">
                <span style={{fontSize: '32px'}}>💬</span>
              </div>
              <h2>أدخل كود التحقق</h2>
              <p>تم إرسال الكود إلى واتساب: <strong>{phone}</strong></p>
              <div className="code-inputs">
                <input
                  type="text"
                  placeholder="------"
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  maxLength={6}
                  className="input-field"
                  disabled={loading}
                  style={{fontSize: '24px', letterSpacing: '8px'}}
                />
              </div>
              <button onClick={handleVerify} disabled={loading || code.length !== 6} className="btn-primary" style={{width: '100%', justifyContent: 'center'}}>
                {loading ? (
                  <>
                    <div className="spinner-small"></div>
                    جاري التحقق...
                  </>
                ) : (
                  <>
                    <span>🔐</span>
                    تأكيد
                    <span>←</span>
                  </>
                )}
              </button>
              <div className="resend-section">
                {timer > 0 ? (
                  <div className="timer">
                    <span>⏱️</span>
                    إعادة الإرسال بعد {timer} ثانية
                  </div>
                ) : (
                  <button onClick={handleResend} disabled={loading} className="btn-resend">
                    🔄 إعادة إرسال الكود
                  </button>
                )}
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="login-step success-step">
              <div className="success-icon">✅</div>
              <h2>تم التحقق بنجاح!</h2>
              <p>جاري تحويلك إلى لوحة التحكم...</p>
              <div className="success-spinner"></div>
            </div>
          )}
        </div>

        <div className="login-footer">
          <Link to="/" className="back-link">
            <span>→</span>
            العودة للصفحة الرئيسية
          </Link>
          <Link to="/guest" className="guest-link">
            الدخول كضيف
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;