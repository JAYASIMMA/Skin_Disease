import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, Mail, Lock, User, ArrowRight, UserPlus } from 'lucide-react';

const Signup = () => {
  const [isDoctor, setIsDoctor] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://127.0.0.1:3000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role: isDoctor ? 'doctor' : 'patient' }),
      });

      if (response.ok) {
        navigate('/login');
      } else {
        const errData = await response.json();
        setError(errData.detail || 'Registration failed');
      }
    } catch (err) {
      setError('Connection refused. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container animate-fade-up" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div className="glass-card" style={{ width: '100%', maxWidth: '400px', padding: '40px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div className="btn-primary" style={{ width: '64px', height: '64px', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <UserPlus size={32} />
          </div>
          <h1 style={{ fontSize: '28px', marginBottom: '8px' }}>Join SkinTermo</h1>
          <p style={{ color: 'var(--text-dim)', fontSize: '14px' }}>Create your account today</p>
          {error && <div style={{ marginTop: '16px', padding: '12px', background: 'rgba(255,107,107,0.1)', border: '1px solid #ff6b6b', color: '#ff6b6b', borderRadius: '8px', fontSize: '13px' }}>{error}</div>}
        </div>

        <form onSubmit={handleSignup}>
          <div className="role-selector" style={{ display: 'flex', background: 'var(--glass)', borderRadius: '12px', padding: '4px', marginBottom: '24px' }}>
            <button 
              type="button"
              onClick={() => setIsDoctor(false)}
              style={{ flex: 1, padding: '10px', borderRadius: '8px', background: !isDoctor ? 'var(--primary)' : 'transparent', color: 'white', fontWeight: '600' }}
            >
              Patient
            </button>
            <button 
              type="button"
              onClick={() => setIsDoctor(true)}
              style={{ flex: 1, padding: '10px', borderRadius: '8px', background: isDoctor ? 'var(--secondary)' : 'transparent', color: 'white', fontWeight: '600' }}
            >
              Doctor
            </button>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <div style={{ background: 'var(--glass)', borderRadius: '12px', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', padding: '0 16px' }}>
              <User size={18} color="var(--text-dim)" />
              <input 
                type="text" 
                placeholder="Full Name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={{ background: 'transparent', border: 'none', color: 'white', padding: '14px', width: '100%', outline: 'none' }} 
              />
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <div style={{ background: 'var(--glass)', borderRadius: '12px', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', padding: '0 16px' }}>
              <Mail size={18} color="var(--text-dim)" />
              <input 
                type="email" 
                placeholder="Email Address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ background: 'transparent', border: 'none', color: 'white', padding: '14px', width: '100%', outline: 'none' }} 
              />
            </div>
          </div>

          <div style={{ marginBottom: '32px' }}>
            <div style={{ background: 'var(--glass)', borderRadius: '12px', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', padding: '0 16px' }}>
              <Lock size={18} color="var(--text-dim)" />
              <input 
                type="password" 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ background: 'transparent', border: 'none', color: 'white', padding: '14px', width: '100%', outline: 'none' }} 
              />
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', opacity: loading ? 0.7 : 1 }}>
            {loading ? 'Creating Account...' : 'Sign Up'} <ArrowRight size={18} />
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: 'var(--text-dim)' }}>
          Already have an account? <span onClick={() => navigate('/login')} style={{ color: 'var(--secondary)', cursor: 'pointer', fontWeight: '600' }}>Login</span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
