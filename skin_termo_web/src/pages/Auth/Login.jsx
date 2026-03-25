import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, LogIn, ShieldCheck, ArrowRight, RefreshCw, XCircle } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://127.0.0.1:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.access_token);
        localStorage.setItem('role', data.role);
        localStorage.setItem('userName', data.name);
        // Redirect based on role
        if (data.role === 'admin') navigate('/admin');
        else if (data.role === 'doctor') {
          if (data.is_profile_complete) navigate('/doctor');
          else navigate('/doctor/onboarding');
        }
        else navigate('/patient');
      } else {
        const errData = await response.json();
        setError(errData.detail || 'Access denied. Please check credentials.');
      }
    } catch (err) {
      setError('Connection failed. Backend may be offline.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'var(--bg-dark)', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '24px',
      background: 'radial-gradient(circle at top right, rgba(108, 99, 255, 0.1), transparent 40%), radial-gradient(circle at bottom left, rgba(0, 210, 255, 0.1), transparent 40%)'
    }}>
      <div className="glass-card animate-fade-up" style={{ width: '100%', maxWidth: '480px', padding: '48px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ 
            display: 'inline-flex', 
            padding: '16px', 
            borderRadius: '24px', 
            background: 'var(--primary-gradient)', 
            marginBottom: '24px',
            boxShadow: '0 8px 32px rgba(108, 99, 255, 0.4)'
          }}>
            <ShieldCheck size={32} color="white" />
          </div>
          <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '8px' }}>Access Portal</h1>
          <p style={{ color: 'var(--text-dim)', fontSize: '15px' }}>Enter your secure credentials to continue</p>
        </div>

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: 'var(--text-dim)', marginBottom: '8px', letterSpacing: '0.5px' }}>IDENTIFICATION EMAIL</label>
            <div style={{ background: 'var(--glass)', borderRadius: '16px', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', padding: '4px 18px' }}>
              <Mail size={18} color="var(--primary)" />
              <input 
                type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="root@skintermo.ai" required
                style={{ background: 'transparent', border: 'none', color: 'white', padding: '16px', width: '100%', outline: 'none', fontSize: '16px' }} 
              />
            </div>
          </div>

          <div style={{ marginBottom: '32px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: 'var(--text-dim)', marginBottom: '8px', letterSpacing: '0.5px' }}>PRIVATE ACCESS KEY</label>
            <div style={{ background: 'var(--glass)', borderRadius: '16px', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', padding: '4px 18px' }}>
              <Lock size={18} color="var(--secondary)" />
              <input 
                type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••" required
                style={{ background: 'transparent', border: 'none', color: 'white', padding: '16px', width: '100%', outline: 'none', fontSize: '16px' }} 
              />
            </div>
          </div>

          {error && (
            <div style={{ 
              marginBottom: '32px', padding: '16px', borderRadius: '12px', background: 'rgba(255, 107, 107, 0.1)', 
              border: '1px solid #ff6b6b', color: '#ff6b6b', fontSize: '14px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '10px' 
            }}>
              <XCircle size={18} /> {error}
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading} 
            className="btn-primary" 
            style={{ width: '100%', padding: '18px', borderRadius: '16px', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}
          >
            {loading ? <RefreshCw size={20} className="animate-spin" /> : <>AUTHENTICATE <ArrowRight size={20} /></>}
          </button>
        </form>

        <div style={{ marginTop: '40px', textAlign: 'center', borderTop: '1px solid var(--border)', paddingTop: '32px' }}>
          <p style={{ color: 'var(--text-dim)', fontSize: '14px' }}>
            New to the platform? <Link to="/signup" className="premium-gradient-text" style={{ textDecoration: 'none', fontWeight: '700' }}>Create Account</Link>
          </p>
           <p style={{ marginTop: '16px', color: 'rgba(255,255,255,0.2)', fontSize: '11px', fontWeight: '600', letterSpacing: '1px' }}>
            PROTECTED BY BIOMETRIC ENCRYPTION LAYERS
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
