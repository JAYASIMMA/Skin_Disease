import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  UserPlus, 
  Users, 
  Settings, 
  LogOut, 
  ShieldAlert, 
  Activity, 
  Database, 
  Globe, 
  Server,
  Trash2,
  CheckCircle,
  XCircle,
  MoreVertical
} from 'lucide-react';
import DoctorManagement from './DoctorManagement';

const AdminDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Overview', path: '/admin' },
    { icon: <UserPlus size={20} />, label: 'Doctor Management', path: '/admin/doctors' },
    { icon: <Users size={20} />, label: 'User Database', path: '/admin/users' },
    { icon: <Settings size={20} />, label: 'System Config', path: '/admin/settings' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-dark)', color: '#fff' }}>
      {/* Premium Admin Sidebar */}
      <aside style={{ 
        width: '280px', 
        borderRight: '1px solid var(--border)', 
        padding: '32px 20px',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        height: '100vh',
        background: 'rgba(10, 14, 33, 0.7)',
        backdropFilter: 'blur(30px)',
        zIndex: 100
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '48px', padding: '0 12px' }}>
          <div style={{ 
            background: 'linear-gradient(135deg, #6C63FF, #00D2FF)', 
            padding: '10px', 
            borderRadius: '16px',
            boxShadow: '0 8px 16px rgba(108, 99, 255, 0.3)'
          }}>
            <ShieldAlert size={24} color="white" />
          </div>
          <div>
            <h1 style={{ fontSize: '22px', fontWeight: '800', margin: 0, letterSpacing: '-0.5px' }}>Terminal</h1>
            <span style={{ fontSize: '11px', color: 'var(--secondary)', fontWeight: 'bold', letterSpacing: '1px' }}>ADMIN CONSOLE</span>
          </div>
        </div>

        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link 
                key={item.path} 
                to={item.path}
                style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  padding: '16px 20px',
                  borderRadius: '18px',
                  textDecoration: 'none',
                  color: isActive ? 'white' : 'var(--text-dim)',
                  background: isActive ? 'linear-gradient(135deg, rgba(108, 99, 255, 0.2), rgba(0, 210, 255, 0.1))' : 'transparent',
                  border: isActive ? '1px solid rgba(108, 99, 255, 0.3)' : '1px solid transparent',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                <div style={{ color: isActive ? 'var(--secondary)' : 'inherit' }}>{item.icon}</div>
                <span style={{ fontWeight: isActive ? '700' : '500', fontSize: '15px' }}>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div style={{ marginTop: 'auto', padding: '20px', background: 'rgba(255,255,255,0.03)', borderRadius: '20px', border: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>A</div>
            <div>
              <p style={{ margin: 0, fontSize: '13px', fontWeight: 'bold' }}>Root Admin</p>
              <p style={{ margin: 0, fontSize: '11px', color: 'var(--text-dim)' }}>admin@skintermo.ai</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            style={{ 
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              padding: '12px',
              borderRadius: '12px',
              background: 'rgba(255, 107, 107, 0.1)',
              color: '#ff6b6b',
              fontSize: '13px',
              fontWeight: 'bold',
              transition: 'all 0.2s'
            }}
          >
            <LogOut size={16} /> Exit Terminal
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, marginLeft: '280px', padding: '40px 60px', minHeight: '100vh', background: 'radial-gradient(circle at top right, rgba(108, 99, 255, 0.05), transparent 40%)' }}>
        <header style={{ marginBottom: '48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '32px', fontWeight: '800', margin: 0, letterSpacing: '-0.5px' }}>
              {navItems.find(item => item.path === location.pathname)?.label || 'System Console'}
            </h2>
            <p style={{ color: 'var(--text-dim)', margin: '6px 0 0', fontSize: '15px' }}>Enterprise-grade dermatology platform management</p>
          </div>
          
          <div style={{ display: 'flex', gap: '16px' }}>
             <div className="glass-card" style={{ padding: '10px 20px', borderRadius: '14px', display: 'flex', alignItems: 'center', gap: '12px', border: '1px solid rgba(0, 230, 118, 0.2)' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00e676', boxShadow: '0 0 10px #00e676' }}></div>
              <span style={{ fontSize: '13px', fontWeight: '600', color: '#00e676' }}>API: ACTIVE</span>
            </div>
          </div>
        </header>

        <div className="animate-fade-up">
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/doctors" element={<DoctorManagement />} />
            <Route path="/users" element={<UserDatabase />} />
            <Route path="/settings" element={<SystemConfig />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

const Overview = () => (
  <>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '40px' }}>
      {[
        { label: 'Total Analyses', value: '1,284', grow: '+12%', color: 'var(--primary)', icon: <Activity size={20} /> },
        { label: 'Cloud Latency', value: '42ms', grow: 'Stable', color: 'var(--secondary)', icon: <Server size={20} /> },
        { label: 'Active Doctors', value: '18', grow: '+2', color: 'var(--accent)', icon: <ShieldAlert size={20} /> },
        { label: 'Data Nodes', value: '12', grow: 'Online', color: '#ffb74d', icon: <Database size={20} /> },
      ].map((stat, i) => (
        <div key={i} className="glass-card" style={{ padding: '24px', border: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div style={{ padding: '10px', borderRadius: '12px', background: 'rgba(255,255,255,0.03)', color: stat.color }}>
              {stat.icon}
            </div>
            <span style={{ color: stat.color, fontSize: '12px', fontWeight: '700' }}>{stat.grow}</span>
          </div>
          <p style={{ color: 'var(--text-dim)', fontSize: '14px', marginBottom: '4px' }}>{stat.label}</p>
          <h3 style={{ fontSize: '28px', margin: 0, fontWeight: '800' }}>{stat.value}</h3>
        </div>
      ))}
    </div>
    
    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
      <div className="glass-card" style={{ padding: '32px' }}>
        <h3 style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Activity size={20} color="var(--primary)" /> System Throughput (Real-time)
        </h3>
        <div style={{ height: '240px', background: 'rgba(255,255,255,0.01)', borderRadius: '16px', border: '1px dashed var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-dim)' }}>
             [ Interactive Analytics Graph Visualization ]
        </div>
      </div>

      <div className="glass-card" style={{ padding: '32px' }}>
        <h3 style={{ marginBottom: '24px' }}>Global Reach</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {[
            { region: 'North America', traffic: '45%' },
            { region: 'Europe', traffic: '30%' },
            { region: 'Asia Pacific', traffic: '25%' },
          ].map((r, i) => (
            <div key={i}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '8px' }}>
                <span>{r.region}</span>
                <span style={{ fontWeight: 'bold' }}>{r.traffic}</span>
              </div>
              <div style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px' }}>
                <div style={{ width: r.traffic, height: '100%', background: 'var(--secondary)', borderRadius: '3px' }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </>
);

const UserDatabase = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/admin/users');
      if (response.ok) {
        const data = await response.json();
        setUsers(data || []);
      }
    } catch (err) {
      console.error("Failed to fetch users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to revoke platform access for this user?')) return;
    
    try {
      const response = await fetch(`http://127.0.0.1:8000/admin/users/${userId}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        fetchUsers();
      }
    } catch (err) {
      console.error("Failed to delete user:", err);
    }
  };

  if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}><Activity size={40} className="animate-spin" /></div>;

  return (
    <div className="glass-card" style={{ padding: '32px' }}>
       <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--border)' }}>
            <th style={{ padding: '16px', color: 'var(--text-dim)', fontSize: '13px', fontWeight: '500' }}>USER</th>
            <th style={{ padding: '16px', color: 'var(--text-dim)', fontSize: '13px', fontWeight: '500' }}>ROLE</th>
            <th style={{ padding: '16px', color: 'var(--text-dim)', fontSize: '13px', fontWeight: '500' }}>STATUS</th>
            <th style={{ padding: '16px', color: 'var(--text-dim)', fontSize: '13px', fontWeight: '500' }}>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
              <td style={{ padding: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                   <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 'bold' }}>
                    {user.name[0]}
                   </div>
                   <div>
                     <p style={{ margin: 0, fontWeight: 'bold', fontSize: '14px' }}>{user.name}</p>
                     <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-dim)' }}>{user.email}</p>
                   </div>
                </div>
              </td>
              <td style={{ padding: '16px' }}>
                <span style={{ fontSize: '12px', fontWeight: 'bold', padding: '4px 10px', borderRadius: '8px', background: user.role === 'doctor' ? 'rgba(0, 210, 255, 0.1)' : 'rgba(255,255,255,0.05)', color: user.role === 'doctor' ? 'var(--secondary)' : 'white' }}>
                   {user.role?.toUpperCase() || 'USER'}
                </span>
              </td>
              <td style={{ padding: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}>
                   <CheckCircle size={14} color="#00e676" />
                   <span style={{ color: '#00e676', fontWeight: '500' }}>Active</span>
                </div>
              </td>
              <td style={{ padding: '16px' }}>
                <button 
                  onClick={() => handleDeleteUser(user.id)}
                  style={{ background: 'transparent', color: '#ff6b6b', cursor: 'pointer', border: 'none' }}
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
       </table>
    </div>
  );
};

const SystemConfig = () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
     <div className="glass-card" style={{ padding: '32px' }}>
      <h3 style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Server size={20} color="var(--primary)" /> API Endpoints
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {[
          { label: 'Primary Backend', value: 'http://127.0.0.1:8000', type: 'REST' },
          { label: 'Vision AI Gateway', value: 'https://open.bigmodel.cn/v4', type: 'Flash' },
          { label: 'Ollama Instance', value: 'http://10.0.2.2:11434', type: 'Local' },
        ].map((api, i) => (
          <div key={i} style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '13px', color: 'var(--text-dim)' }}>{api.label}</span>
              <span style={{ fontSize: '10px', background: 'var(--primary)', padding: '2px 8px', borderRadius: '4px', fontWeight: 'bold' }}>{api.type}</span>
            </div>
            <code style={{ fontSize: '14px', color: 'var(--secondary)' }}>{api.value}</code>
          </div>
        ))}
      </div>
     </div>

     <div className="glass-card" style={{ padding: '32px' }}>
      <h3 style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Globe size={20} color="var(--accent)" /> Global Settings
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
         <ToggleSetting label="Maintenance Mode" active={false} />
         <ToggleSetting label="Direct Zhipu Communication" active={false} />
         <ToggleSetting label="Admin Registration" active={true} />
         <ToggleSetting label="System-wide Telemetry" active={true} />
      </div>
      <button className="btn-primary" style={{ width: '100%', marginTop: '40px' }}>Save System Configuration</button>
     </div>
  </div>
);

const ToggleSetting = ({ label, active }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <span style={{ fontSize: '15px', fontWeight: '500' }}>{label}</span>
    <div style={{ 
      width: '44px', 
      height: '24px', 
      borderRadius: '12px', 
      background: active ? 'var(--primary)' : 'rgba(255,255,255,0.1)', 
      position: 'relative', 
      cursor: 'pointer',
      transition: 'background 0.3s'
    }}>
      <div style={{ 
        width: '18px', 
        height: '18px', 
        borderRadius: '50%', 
        background: 'white', 
        position: 'absolute', 
        top: '3px', 
        left: active ? '23px' : '3px',
        transition: 'left 0.3s'
      }}></div>
    </div>
  </div>
);

export default AdminDashboard;
