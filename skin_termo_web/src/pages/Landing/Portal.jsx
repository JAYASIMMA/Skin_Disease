import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, Lock, ArrowRight, UserPlus, LogIn } from 'lucide-react';
import LandingHeader from './LandingHeader';
import LandingFooter from './LandingFooter';
import './LandingPage.css';

const Portal = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <LandingHeader activePage="portal" forceScrolled={true} />

      <section className="hero-section" style={{ minHeight: '60vh', paddingBottom: '2rem' }}>
        <div className="hero-content animate-fade-up">
          <div className="hero-badge"><Lock size={16} /><span>Secure Gateway</span></div>
          <h1 className="hero-title">Platform <span className="premium-gradient-text">Portal.</span></h1>
          <p className="hero-subtitle">Access your personalized dashboard, manage consultations, and securely review AI-generated dermatological reports.</p>
        </div>
      </section>

      <section className="intelligence-section" style={{ paddingTop: 0 }}>
        <div className="intelligence-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', maxWidth: '900px', margin: '0 auto' }}>
          
          <div className="node-card animate-fade-up" style={{ padding: '40px', textAlign: 'center' }}>
            <div className="node-icon-floating" style={{ position: 'relative', top: 0, left: 0, margin: '0 auto 20px', width: '80px', height: '80px', backgroundColor: 'rgba(108, 99, 255, 0.1)', border: '1px solid rgba(108, 99, 255, 0.2)' }}>
              <LogIn size={36} color="var(--primary)" />
            </div>
            <h3 className="node-title" style={{ fontSize: '26px' }}>Existing Access</h3>
            <p className="node-desc" style={{ fontSize: '16px', lineHeight: '1.6', marginBottom: '30px' }}>
              Already part of the SkinTermo network? Enter the portal to access your secure dashboard.
            </p>
            <button onClick={() => navigate('/login')} className="btn-primary" style={{ width: '100%', padding: '16px', borderRadius: '15px', fontSize: '18px' }}>
              Login to Account
            </button>
          </div>

          <div className="node-card animate-fade-up" style={{ padding: '40px', textAlign: 'center', animationDelay: '0.2s' }}>
            <div className="node-icon-floating" style={{ position: 'relative', top: 0, left: 0, margin: '0 auto 20px', width: '80px', height: '80px', backgroundColor: 'rgba(0, 210, 255, 0.1)', border: '1px solid rgba(0, 210, 255, 0.2)' }}>
              <UserPlus size={36} color="#00D2FF" />
            </div>
            <h3 className="node-title" style={{ fontSize: '26px' }}>New Registration</h3>
            <p className="node-desc" style={{ fontSize: '16px', lineHeight: '1.6', marginBottom: '30px' }}>
              Begin your journey towards high-precision dermatological care. Create a free account today.
            </p>
            <button onClick={() => navigate('/signup')} className="btn-secondary" style={{ width: '100%', padding: '16px', borderRadius: '15px', fontSize: '18px', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}>
              Create Account
            </button>
          </div>

        </div>
      </section>

      <LandingFooter />
    </div>
  );
};

export default Portal;
