import React from 'react';
import { Search, Filter, MoreVertical, Eye, MessageSquare } from 'lucide-react';

const PatientManagement = () => {
  const patients = [
    { id: '1', name: 'Alice Thompson', lastScan: 'Mar 14, 2026', condition: 'Eczema', severity: 'Moderate', status: 'Follow-up' },
    { id: '2', name: 'Bob Wilson', lastScan: 'Mar 12, 2026', condition: 'Psoriasis', severity: 'Severe', status: 'New' },
    { id: '3', name: 'Charlie Davis', lastScan: 'Mar 10, 2026', condition: 'Healthy', severity: 'N/A', status: 'Completed' },
    { id: '4', name: 'Diana Prince', lastScan: 'Mar 08, 2026', condition: 'Acne', severity: 'Mild', status: 'Ongoing' },
  ];

  return (
    <div className="animate-fade-up">
      <div style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>Patient Management</h1>
          <p style={{ color: 'var(--text-dim)' }}>Manage your patient queue and review their clinical history.</p>
        </div>
        <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          Add New Note
        </button>
      </div>

      <div className="glass-card" style={{ padding: '24px', marginBottom: '32px' }}>
        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ flex: 1, background: 'var(--glass)', borderRadius: '12px', padding: '0 16px', display: 'flex', alignItems: 'center' }}>
            <Search size={18} color="var(--text-dim)" />
            <input type="text" placeholder="Search patients..." style={{ background: 'transparent', border: 'none', color: 'white', padding: '12px', width: '100%', outline: 'none' }} />
          </div>
          <button style={{ background: 'var(--glass)', padding: '12px 20px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid var(--border)' }}>
            <Filter size={18} /> Filter
          </button>
        </div>
      </div>

      <div className="glass-card" style={{ overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--border)' }}>
              <th style={{ padding: '20px' }}>Patient Name</th>
              <th style={{ padding: '20px' }}>Last Scan</th>
              <th style={{ padding: '20px' }}>Condition</th>
              <th style={{ padding: '20px' }}>Severity</th>
              <th style={{ padding: '20px' }}>Status</th>
              <th style={{ padding: '20px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((p) => (
              <tr key={p.id} style={{ borderBottom: '1px solid var(--border)', transition: 'background 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.background = 'var(--glass)'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                <td style={{ padding: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold' }}>{p.name.split(' ').map(n=>n[0]).join('')}</div>
                    {p.name}
                  </div>
                </td>
                <td style={{ padding: '20px', color: 'var(--text-dim)' }}>{p.lastScan}</td>
                <td style={{ padding: '20px' }}>{p.condition}</td>
                <td style={{ padding: '20px' }}>
                  <span style={{ 
                    padding: '4px 10px', 
                    borderRadius: '6px', 
                    fontSize: '12px', 
                    background: p.severity === 'Severe' ? 'rgba(255,107,107,0.1)' : 'rgba(0,230,118,0.1)',
                    color: p.severity === 'Severe' ? '#ff6b6b' : '#00e676'
                  }}>
                    {p.severity}
                  </span>
                </td>
                <td style={{ padding: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: p.status === 'New' ? 'var(--secondary)' : 'var(--text-dim)' }}></div>
                    {p.status}
                  </div>
                </td>
                <td style={{ padding: '20px' }}>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button title="View Records" style={{ background: 'transparent', color: 'var(--text-dim)' }}><Eye size={18} /></button>
                    <button title="Message" style={{ background: 'transparent', color: 'var(--text-dim)' }}><MessageSquare size={18} /></button>
                    <button title="More" style={{ background: 'transparent', color: 'var(--text-dim)' }}><MoreVertical size={18} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientManagement;
