import React from 'react';
import { Activity, Thermometer, UserCheck, Calendar } from 'lucide-react';

const PatientHome = () => {
  const stats = [
    { label: 'Recent Scans', value: '12', icon: <Activity color="#00d2ff" />, trend: '+2 this week' },
    { label: 'Health Score', value: '88%', icon: <Thermometer color="#6c63ff" />, trend: 'Stable' },
    { label: 'Consultations', value: '4', icon: <UserCheck color="#00e676" />, trend: 'Next: tomorrow' },
  ];

  return (
    <div className="animate-fade-up">
      <div style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>Hello, Jayasimma</h1>
          <p style={{ color: 'var(--text-dim)' }}>Welcome back to your skin health dashboard.</p>
        </div>
        <div style={{ background: 'var(--bg-card)', padding: '12px 20px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '12px', border: '1px solid var(--border)' }}>
          <Calendar size={20} color="var(--secondary)" />
          <span>March 15, 2026</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '40px' }}>
        {stats.map((stat, i) => (
          <div key={i} className="glass-card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div style={{ background: 'var(--glass)', padding: '12px', borderRadius: '12px' }}>
                {stat.icon}
              </div>
              <span style={{ fontSize: '12px', color: 'var(--accent)' }}>{stat.trend}</span>
            </div>
            <h3 style={{ fontSize: '24px', marginBottom: '4px' }}>{stat.value}</h3>
            <p style={{ color: 'var(--text-dim)', fontSize: '14px' }}>{stat.label}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>
        <div className="glass-card" style={{ padding: '32px' }}>
          <h3 style={{ marginBottom: '24px' }}>Weekly Progress</h3>
          <div style={{ height: '200px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '12px' }}>
            {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
              <div key={i} style={{ flex: 1, background: 'linear-gradient(to top, var(--primary), var(--secondary))', height: `${h}%`, borderRadius: '8px 8px 0 0', opacity: 0.8 }}></div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px', color: 'var(--text-dim)', fontSize: '12px' }}>
            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '32px' }}>
          <h3 style={{ marginBottom: '20px' }}>Reminders</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { time: '09:00 AM', task: 'Morning Moisturizer' },
              { time: '02:00 PM', task: 'Follow-up Scan' },
              { time: '08:30 PM', task: 'Sunscreen Check' }
            ].map((r, i) => (
              <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <div style={{ padding: '8px', borderLeft: '3px solid var(--secondary)', background: 'var(--glass)', flex: 1, borderRadius: '4px' }}>
                  <p style={{ fontSize: '13px', fontWeight: 'bold' }}>{r.task}</p>
                  <p style={{ fontSize: '11px', color: 'var(--text-dim)' }}>{r.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientHome;
