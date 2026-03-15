import React, { useState, useEffect } from 'react';
import { UserPlus, ShieldCheck, Mail, Lock, User, RefreshCw, Trash2, Search, Filter } from 'lucide-react';

const DoctorManagement = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [doctors, setDoctors] = useState([]);

  const fetchDoctors = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/admin/doctors');
      if (response.ok) {
        const data = await response.json();
        setDoctors(data);
      }
    } catch (err) {
      console.error("Failed to fetch doctors:", err);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleAddDoctor = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });

    try {
      const response = await fetch('http://127.0.0.1:8000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role: 'doctor' }),
      });

      if (response.ok) {
        setMessage({ text: 'Professional registered successfully!', type: 'success' });
        setName(''); setEmail(''); setPassword('');
        fetchDoctors(); // Refresh list
      } else {
        const error = await response.json();
        setMessage({ text: error.detail || 'Registration failed', type: 'error' });
      }
    } catch {
      setMessage({ text: 'Connection error. Is the backend running?', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-up">
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.8fr', gap: '32px' }}>
        {/* Advanced Registration Form */}
        <div className="glass-card" style={{ padding: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
            <div style={{ background: 'rgba(108, 99, 255, 0.15)', padding: '12px', borderRadius: '16px', color: 'var(--primary)' }}>
              <UserPlus size={24} />
            </div>
            <div>
              <h2 style={{ fontSize: '22px', fontWeight: '800', margin: 0 }}>Authorize Professional</h2>
              <p style={{ color: 'var(--text-dim)', fontSize: '13px', margin: 0 }}>Provision new medical accounts</p>
            </div>
          </div>

          <form onSubmit={handleAddDoctor}>
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: 'var(--text-dim)', marginBottom: '8px', letterSpacing: '0.5px' }}>FULL NAME</label>
              <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '14px', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', padding: '4px 16px' }}>
                <User size={18} color="var(--primary)" />
                <input 
                  type="text" value={name} onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Dr. John Doe" required
                  style={{ background: 'transparent', border: 'none', color: 'white', padding: '16px', width: '100%', outline: 'none', fontSize: '15px' }} 
                />
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: 'var(--text-dim)', marginBottom: '8px', letterSpacing: '0.5px' }}>EMAIL ADDRESS</label>
              <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '14px', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', padding: '4px 16px' }}>
                <Mail size={18} color="var(--secondary)" />
                <input 
                  type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="doctor@skintermo.ai" required
                  style={{ background: 'transparent', border: 'none', color: 'white', padding: '16px', width: '100%', outline: 'none', fontSize: '15px' }} 
                />
              </div>
            </div>

            <div style={{ marginBottom: '40px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: 'var(--text-dim)', marginBottom: '8px', letterSpacing: '0.5px' }}>SECURE ACCESS KEY</label>
              <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '14px', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', padding: '4px 16px' }}>
                <Lock size={18} color="var(--accent)" />
                <input 
                  type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••" required
                  style={{ background: 'transparent', border: 'none', color: 'white', padding: '16px', width: '100%', outline: 'none', fontSize: '15px' }} 
                />
              </div>
            </div>

            {message.text && (
              <div style={{ 
                marginBottom: '32px', padding: '16px', borderRadius: '12px', fontSize: '14px', fontWeight: '600',
                background: message.type === 'success' ? 'rgba(0, 230, 118, 0.1)' : 'rgba(255, 107, 107, 0.1)',
                border: `1px solid ${message.type === 'success' ? '#00e676' : '#ff6b6b'}`,
                color: message.type === 'success' ? '#00e676' : '#ff6b6b',
                display: 'flex', alignItems: 'center', gap: '10px'
              }}>
                {message.type === 'success' ? <CheckCircle size={18} /> : <XCircle size={18} />}
                {message.text}
              </div>
            )}

            <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', padding: '18px', borderRadius: '14px', fontSize: '16px', letterSpacing: '0.5px' }}>
              {loading ? <RefreshCw size={20} className="animate-spin" /> : 'GENERATE PROFESSIONAL ACCOUNT'}
            </button>
          </form>
        </div>

        {/* Professional Database */}
        <div className="glass-card" style={{ padding: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ background: 'rgba(0, 210, 255, 0.15)', padding: '12px', borderRadius: '16px', color: 'var(--secondary)' }}>
                <ShieldCheck size={24} />
              </div>
              <h2 style={{ fontSize: '22px', fontWeight: '800', margin: 0 }}>Active Professionals</h2>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
               <button style={{ background: 'var(--glass)', border: '1px solid var(--border)', padding: '8px', borderRadius: '10px', color: 'var(--text-dim)' }}><Search size={18} /></button>
               <button style={{ background: 'var(--glass)', border: '1px solid var(--border)', padding: '8px', borderRadius: '10px', color: 'var(--text-dim)' }}><Filter size={18} /></button>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {doctors.map((doc) => (
              <div key={doc.id} className="animate-fade-up" style={{ 
                padding: '20px', borderRadius: '20px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', transition: 'all 0.3s', cursor: 'pointer'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <div style={{ 
                    width: '56px', height: '56px', borderRadius: '16px', background: 'linear-gradient(135deg, rgba(0,210,255,0.2), rgba(108,99,255,0.2))',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: '900', color: 'var(--secondary)'
                  }}>
                    {doc.name.split(' ')[1]?.[0] || doc.name[0]}
                  </div>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '17px', fontWeight: '800' }}>{doc.name}</h4>
                    <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--text-dim)' }}>{doc.email}</p>
                    <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                       <span style={{ fontSize: '11px', background: 'rgba(108,99,255,0.1)', color: 'var(--primary)', padding: '2px 8px', borderRadius: '6px', fontWeight: 'bold' }}>{doc.profile?.specialization || 'Professional'}</span>
                       <span style={{ fontSize: '11px', background: 'rgba(255,255,255,0.05)', color: 'var(--text-dim)', padding: '2px 8px', borderRadius: '6px' }}>
                         {doc.profile?.latitude ? `LOC: ${doc.profile.latitude.toFixed(2)}, ${doc.profile.longitude.toFixed(2)}` : 'Location Pending'}
                       </span>
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                   <button 
                    onClick={() => {
                      const lat = prompt('Enter Latitude (e.g. 40.7128):', doc.profile?.latitude || '');
                      const lng = prompt('Enter Longitude (e.g. -74.0060):', doc.profile?.longitude || '');
                      if (lat && lng) {
                        fetch(`http://127.0.0.1:8000/admin/doctor/${doc.id}/location`, {
                          method: 'PATCH',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ latitude: parseFloat(lat), longitude: parseFloat(lng) })
                        }).then(() => fetchDoctors());
                      }
                    }}
                    style={{ background: 'rgba(0, 210, 255, 0.1)', color: 'var(--secondary)', padding: '10px 16px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px' }}
                   >
                     <MapPin size={16} /> SETUP MAP
                   </button>
                   <button style={{ background: 'transparent', color: '#ff6b6b', padding: '10px' }}><Trash2 size={18} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const XCircle = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
  </svg>
);

export default DoctorManagement;
