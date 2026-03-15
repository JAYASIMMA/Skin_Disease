import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Scan, MessageCircle, MapPin, User, LogOut } from 'lucide-react';
import PatientHome from './Home';
import SkinScan from './SkinScan';
import DoctorFinder from './DoctorFinder';
import AIChat from './AIChat';
import AccountPage from './AccountPage';

const PatientDashboard = () => {
  const location = useLocation();

  const navItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/patient' },
    { icon: <Scan size={20} />, label: 'Skin Scan', path: '/patient/scan' },
    { icon: <MessageCircle size={20} />, label: 'AI Chat', path: '/patient/chat' },
    { icon: <MapPin size={20} />, label: 'Doctors', path: '/patient/doctors' },
    { icon: <User size={20} />, label: 'Account', path: '/patient/account' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Unique Floating Navigation Bar */}
      <nav style={{ 
        position: 'fixed', 
        top: '20px', 
        left: '50%', 
        transform: 'translateX(-50%)', 
        zIndex: 1000,
        width: 'auto',
        minWidth: '300px'
      }}>
        <div className="glass-card" style={{ 
          padding: '8px 24px', 
          borderRadius: '20px', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '24px',
          background: 'rgba(26, 31, 56, 0.8)'
        }}>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link 
                key={item.path} 
                to={item.path} 
                title={item.label}
                style={{ 
                  color: isActive ? 'var(--secondary)' : 'var(--text-dim)', 
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '8px',
                  borderRadius: '12px',
                  background: isActive ? 'var(--glass)' : 'transparent',
                  transition: 'all 0.3s'
                }}
              >
                {item.icon}
              </Link>
            );
          })}
          <div style={{ width: '1px', height: '20px', background: 'var(--border)' }}></div>
          <Link to="/login" style={{ color: 'var(--text-highlight)', textDecoration: 'none' }}>
            <LogOut size={20} />
          </Link>
        </div>
      </nav>

      <main style={{ flex: 1, padding: '100px 24px 40px', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <Routes>
          <Route path="/" element={<PatientHome />} />
          <Route path="/scan" element={<SkinScan />} />
          <Route path="/chat" element={<AIChat />} />
          <Route path="/doctors" element={<DoctorFinder />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="*" element={<div className="animate-fade-up">Content coming soon...</div>} />
        </Routes>
      </main>
    </div>
  );
};

export default PatientDashboard;
