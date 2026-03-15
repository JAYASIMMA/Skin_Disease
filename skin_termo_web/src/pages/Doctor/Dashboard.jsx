import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { ShieldPlus, Users, ClipboardList, Settings, LogOut } from 'lucide-react';

import PatientManagement from './PatientManagement';
import DoctorSettings from './Settings';

const DoctorDashboard = () => {
  const location = useLocation();

  const navItems = [
    { icon: <ShieldPlus size={24} />, label: 'Overview', path: '/doctor' },
    { icon: <Users size={24} />, label: 'Patients', path: '/doctor/patients' },
    { icon: <ClipboardList size={24} />, label: 'Reports', path: '/doctor/reports' },
    { icon: <Settings size={24} />, label: 'Settings', path: '/doctor/settings' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Unique Sidebar Navigation for Doctors */}
      <aside style={{ 
        width: '280px', 
        background: 'var(--bg-card)', 
        borderRight: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        padding: '32px 20px',
        position: 'fixed',
        height: '100vh'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '48px', padding: '0 12px' }}>
          <div className="btn-primary" style={{ padding: '8px', borderRadius: '10px' }}>
            <ShieldPlus size={20} />
          </div>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold' }}>Med Portal</h2>
        </div>

        <nav style={{ flex: 1 }}>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link 
                key={item.path} 
                to={item.path}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '16px', 
                  padding: '14px 16px',
                  textDecoration: 'none',
                  color: isActive ? 'white' : 'var(--text-dim)',
                  background: isActive ? 'linear-gradient(90deg, var(--glass), transparent)' : 'transparent',
                  borderRadius: '12px',
                  marginBottom: '8px',
                  borderLeft: isActive ? '3px solid var(--primary)' : '3px solid transparent',
                  transition: 'all 0.3s'
                }}
              >
                {item.icon}
                <span style={{ fontWeight: isActive ? '600' : '400' }}>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <Link to="/login" style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '16px', 
          padding: '14px 16px',
          textDecoration: 'none',
          color: '#ff6b6b'
        }}>
          <LogOut size={24} />
          <span>Sign Out</span>
        </Link>
      </aside>

      <main style={{ marginLeft: '280px', flex: 1, padding: '40px', width: 'calc(100% - 280px)' }}>
        <Routes>
          <Route path="/" element={<div className="animate-fade-up"><h1>Doctor Overview</h1><p style={{ color: 'var(--text-dim)' }}>Welcome Dr. Jayasimma</p></div>} />
          <Route path="/patients" element={<PatientManagement />} />
          <Route path="/settings" element={<DoctorSettings />} />
          <Route path="*" element={<div className="animate-fade-up">Doctor portal content coming soon...</div>} />
        </Routes>
      </main>
    </div>
  );
};

export default DoctorDashboard;
