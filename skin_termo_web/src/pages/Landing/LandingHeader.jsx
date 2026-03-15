import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity } from 'lucide-react';
import './LandingPage.css';

const LandingHeader = ({ activePage = 'home', forceScrolled = false }) => {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    if (forceScrolled) return;
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [forceScrolled]);

  const isScrolled = forceScrolled || scrollY > 50;

  return (
    <nav className={`landing-nav ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-logo" onClick={() => navigate('/')}>
        <div className="logo-icon">
          <Activity size={22} color="white" />
        </div>
        <span className="logo-text">
          SkinTermo <span className="premium-gradient-text" style={{ fontStyle: 'italic' }}>AI</span>
        </span>
      </div>
      
      <div className="nav-links">
        <span 
          className={`nav-link ${activePage === 'features' ? 'active' : ''}`} 
          onClick={() => navigate('/features')}
        >
          Features
        </span>
        <span 
          className={`nav-link ${activePage === 'intelligence' ? 'active' : ''}`} 
          onClick={() => navigate('/intelligence')}
        >
          Intelligence
        </span>
        <span 
          className={`nav-link ${activePage === 'network' ? 'active' : ''}`} 
          onClick={() => navigate('/network')}
        >
          Network
        </span>
        <span 
          className={`nav-link ${activePage === 'portal' ? 'active' : ''}`} 
          onClick={() => navigate('/portal')}
        >
          Portal
        </span>
        <button 
          onClick={() => navigate('/login')} 
          className="btn-primary" 
          style={{ padding: '10px 28px', fontSize: '14px' }}
        >
          LOGIN
        </button>
      </div>
    </nav>
  );
};

export default LandingHeader;
