import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, Globe, MapPin, Users, PhoneCall, ChevronRight } from 'lucide-react';
import LandingHeader from './LandingHeader';
import LandingFooter from './LandingFooter';
import './LandingPage.css';

const Network = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <LandingHeader activePage="network" forceScrolled={true} />

      <section className="hero-section" style={{ minHeight: '60vh', paddingBottom: '2rem' }}>
        <div className="hero-content animate-fade-up">
          <div className="hero-badge"><Globe size={16} /><span>Global Connectivity</span></div>
          <h1 className="hero-title">Worldwide <span className="premium-gradient-text">Care Network.</span></h1>
          <p className="hero-subtitle">Connect instantly with a curated directory of board-certified dermatologists across the globe, tailored by location, specialty, and immediate availability.</p>
        </div>
      </section>

      <section className="intelligence-section" style={{ paddingTop: 0 }}>
        <div className="intelligence-grid">
          <NetworkCard 
            icon={<MapPin size={32} />} title="Geospatial Routing" 
            desc="Find the nearest clinical experts utilizing our density mapping engine. See real-time proximity and estimated travel times to clinics."
          />
          <NetworkCard 
            icon={<PhoneCall size={32} />} title="Tele-Consultation" 
            desc="Book instant or scheduled video consultations. Secure, encrypted, and designed specifically for high-resolution dermatological reviews."
          />
          <NetworkCard 
            icon={<Users size={32} />} title="Peer Review Ecosystem" 
            desc="Join a network where your cases can be securely anonymized and reviewed by a board of specialists for complex differential diagnosis."
          />
        </div>
      </section>

      <section className="cta-section" style={{ padding: '0 5% 5%' }}>
        <div className="cta-glass animate-glow">
          <div className="cta-content">
            <h2 className="cta-title">Are you a Dermatologist?</h2>
            <p className="cta-subtitle">Join our elite network of medical professionals to expand your practice digitally.</p>
            <button onClick={() => navigate('/signup')} className="btn-primary" style={{ padding: '16px 40px', borderRadius: '20px', fontSize: '16px', marginTop: '20px' }}>Apply for Verification</button>
          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
};

const NetworkCard = ({ icon, title, desc }) => (
  <div className="node-card animate-fade-up">
    <div className="node-content" style={{ padding: '40px' }}>
      <div className="node-icon-floating" style={{ position: 'relative', top: 0, left: 0, marginBottom: '20px', backgroundColor: 'rgba(0, 210, 255, 0.1)', border: '1px solid rgba(0, 210, 255, 0.2)', color: '#00D2FF' }}>
        {icon}
      </div>
      <h3 className="node-title" style={{ fontSize: '24px' }}>{title}</h3>
      <p className="node-desc" style={{ fontSize: '16px', lineHeight: '1.6' }}>{desc}</p>
    </div>
  </div>
);

export default Network;
