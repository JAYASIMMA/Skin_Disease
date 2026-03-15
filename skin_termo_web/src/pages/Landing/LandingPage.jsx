import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  Brain, 
  MapPin, 
  MessageSquare, 
  ChevronRight, 
  Activity, 
  ArrowRight,
  Sparkles,
  Zap,
  Globe,
  Database,
  Lock
} from 'lucide-react';
import LandingHeader from './LandingHeader';
import LandingFooter from './LandingFooter';

import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="landing-container">
      {/* Ambient Glows */}
      <div className="ambient-glow" style={{ 
        top: '-10%', right: '-5%', 
        background: 'radial-gradient(circle, rgba(108, 99, 255, 0.15) 0%, transparent 70%)',
        transform: `translateY(${scrollY * 0.2}px)`
      }}></div>
      <div className="ambient-glow" style={{ 
        bottom: '10%', left: '-10%', 
        background: 'radial-gradient(circle, rgba(0, 210, 255, 0.1) 0%, transparent 70%)',
        transform: `translateY(${scrollY * -0.1}px)`
      }}></div>

      {/* Navigation Header */}
      <LandingHeader activePage="home" />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content animate-fade-up">
          <div className="hero-badge">
            <Sparkles size={16} className="animate-pulse" />
            <span>Next-Gen Dermatology OS</span>
          </div>

          <h1 className="hero-title">
            The Future of <br />
            <span className="premium-gradient-text">Precise Care.</span>
          </h1>

          <p className="hero-subtitle">
            SkinTermo AI integrates high-fidelity vision intelligence with global medical networks 
            to redefine diagnostic precision and clinical outcomes.
          </p>

          <div className="hero-buttons">
            <button onClick={() => navigate('/login')} className="btn-primary animate-glow" style={{ padding: '20px 48px', borderRadius: '20px', fontSize: '18px' }}>
              Initialize Analysis <ChevronRight size={22} />
            </button>
            <button onClick={() => document.getElementById('intel').scrollIntoView({ behavior: 'smooth' })} className="btn-secondary" style={{ padding: '20px 48px', borderRadius: '20px', fontSize: '18px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)' }}>
              Platform Overview
            </button>
          </div>
        </div>

        <div className="hero-visual animate-scale">
          <div className="hero-image-container">
            <img src="/assets/web_hero.png" alt="High Fidelity AI Analysis" className="hero-image" />
          </div>
        </div>
      </section>

      {/* Floating Interactive Icons Section */}
      <section id="intel" className="intelligence-section">
        <div className="section-header">
          <h2 className="section-title">Integrated Intelligence</h2>
          <div className="section-underline"></div>
          <p className="section-subtitle">
            Our platform orchestrates multiple intelligence layers to provide a seamless healthcare journey.
          </p>
        </div>

        <div className="intelligence-grid">
          <IntelligenceNode 
            title="Computer Vision"
            desc="ZhipuAI-powered architectural analysis detecting 140+ dermatological indices with millimetric precision."
            icon={<Brain size={32} />}
            image="/assets/web_ai_analysis.png"
            color="var(--primary)"
            delay="0.2s"
          />
          <IntelligenceNode 
            title="Tele-Clinical"
            desc="Encrypted peer-to-peer consultation gateways connecting patients with world-class specialists."
            icon={<ShieldCheck size={32} />}
            image="/assets/web_tele_clinical.png"
            color="var(--secondary)"
            delay="0.4s"
          />
          <IntelligenceNode 
            title="Geospatial Mapping"
            desc="Real-time clinical density mapping and optimized logistical routing for physical interventions."
            icon={<MapPin size={32} />}
            image="/assets/web_geospatial.png"
            color="var(--accent)"
            delay="0.6s"
          />
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
           {[
            { v: '99.9%', l: 'System Uptime', i: <Zap /> },
            { v: '800ms', l: 'Inference Time', i: <Activity /> },
            { v: '256-bit', l: 'Encryption Level', i: <Lock /> },
            { v: 'Global', l: 'Service Network', i: <Globe /> },
           ].map((s, i) => (
             <div key={i} className="stat-card animate-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="stat-icon animate-float">{s.i}</div>
                <h4 className="stat-value premium-gradient-text">{s.v}</h4>
                <p className="stat-label">{s.l}</p>
             </div>
           ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <div className="cta-glass animate-glow">
          <div className="cta-content">
            <h2 className="cta-title">Start Your Journey.</h2>
            <p className="cta-subtitle">
              Join thousands of users and professionals on the world's leading dermatology platform.
            </p>
            <div className="cta-buttons">
                <button onClick={() => navigate('/login')} className="btn-primary" style={{ padding: '20px 50px', borderRadius: '20px', fontSize: '18px' }}>Get Started Now</button>
                <button onClick={() => navigate('/signup')} className="btn-glass" style={{ padding: '20px 50px', borderRadius: '20px', fontSize: '18px' }}>Create Account</button>
            </div>
          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
};

const IntelligenceNode = ({ title, desc, icon, image, color, delay }) => (
  <div className="node-card" style={{ animationDelay: delay }}>
    <div className="node-visual">
       <img src={image} alt={title} className="node-image" />
       <div className="node-icon-floating">
         {icon}
       </div>
       <div className="node-overlay"></div>
    </div>
    <div className="node-content">
      <h3 className="node-title">{title}</h3>
      <p className="node-desc">{desc}</p>
      <div className="node-action" style={{ color: color }}>
        EXPLORE MODULE <ArrowRight size={20} />
      </div>
    </div>
  </div>
);


export default LandingPage;
