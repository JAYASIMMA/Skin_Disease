import React from 'react';
import { User, Mail, Shield, History, Clock, ChevronRight } from 'lucide-react';

const AccountPage = () => {
  const history = [
    { date: 'Mar 12, 2026', condition: 'Eczema Flare-up', severity: 'Moderate', doctor: 'Dr. Sarah Johnson' },
    { date: 'Feb 28, 2026', condition: 'Acne Scars', severity: 'Mild', doctor: 'Dr. Michael Chen' },
    { date: 'Feb 15, 2026', condition: 'Regular Checkup', severity: 'Healthy', doctor: 'Dr. Elena Rodriguez' },
  ];

  return (
    <div className="animate-fade-up">
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>My Account</h1>
        <p style={{ color: 'var(--text-dim)' }}>Manage your profile and view your consultation history.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '32px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="glass-card" style={{ padding: '32px', textAlign: 'center' }}>
            <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), var(--secondary))', margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <User size={48} color="white" />
            </div>
            <h2 style={{ fontSize: '20px', marginBottom: '4px' }}>Jayasimma D</h2>
            <p style={{ color: 'var(--text-dim)', fontSize: '14px', marginBottom: '24px' }}>Patient ID: ST-2026-088</p>
            <button className="btn-primary" style={{ width: '100%', fontSize: '14px' }}>Edit Profile</button>
          </div>

          <div className="glass-card" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>Security Settings</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: 'var(--glass)', borderRadius: '12px' }}>
                <Mail size={18} color="var(--primary)" />
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '12px', color: 'var(--text-dim)' }}>Email Address</p>
                  <p style={{ fontSize: '14px' }}>jayasimma@email.com</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: 'var(--glass)', borderRadius: '12px' }}>
                <Shield size={18} color="var(--accent)" />
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '12px', color: 'var(--text-dim)' }}>Two-Factor Auth</p>
                  <p style={{ fontSize: '14px' }}>Enabled</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <History size={20} color="var(--secondary)" /> Consultation History
            </h3>
            <button style={{ background: 'transparent', color: 'var(--secondary)', fontSize: '14px', fontWeight: 'bold' }}>Export All</button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {history.map((item, i) => (
              <div key={i} style={{ 
                padding: '20px', 
                background: 'var(--glass)', 
                borderRadius: '16px', 
                border: '1px solid var(--border)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                  <div style={{ padding: '12px', background: 'var(--bg-dark)', borderRadius: '12px' }}>
                    <Clock size={20} color="var(--text-dim)" />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '16px', marginBottom: '4px' }}>{item.condition}</h4>
                    <p style={{ fontSize: '13px', color: 'var(--text-dim)' }}>{item.date} • {item.doctor}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span style={{ 
                    fontSize: '12px', 
                    padding: '4px 12px', 
                    borderRadius: '20px', 
                    background: item.severity === 'Moderate' ? 'rgba(255,167,38,0.2)' : 'rgba(0,230,118,0.2)',
                    color: item.severity === 'Moderate' ? '#ffa726' : '#00e676',
                    border: item.severity === 'Moderate' ? '1px solid #ffa726' : '1px solid #00e676'
                  }}>
                    {item.severity}
                  </span>
                  <ChevronRight size={20} color="var(--text-dim)" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
