import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './LandingPage';
import LoginPage from './LoginPage';
import Dashboard from './Dashboard';
import GuestView from './GuestView';
import './App.css';

// رابط API للإنتاج (Render)
const API_URL = 'https://dalil-mawakib-backend.onrender.com/api';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (e) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const handleLogin = (data) => {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    setUser(data.user);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loader"></div>
        <p>جاري التحميل...</p>
      </div>
    );
  }

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<LandingPage user={user} onLogout={handleLogout} />} />
        <Route path="/login" element={
          user ? <Navigate to="/dashboard" /> : <LoginPage onLogin={handleLogin} apiUrl={API_URL} />
        } />
        <Route path="/dashboard" element={
          user ? <Dashboard user={user} onLogout={handleLogout} apiUrl={API_URL} /> : <Navigate to="/login" />
        } />
        <Route path="/guest" element={<GuestView apiUrl={API_URL} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;