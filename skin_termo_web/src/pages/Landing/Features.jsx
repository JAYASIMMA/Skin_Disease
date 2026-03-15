import React from 'react';
import { ShieldCheck, Activity, Brain, Microscope, Stethoscope, ChevronRight } from 'lucide-react';
import LandingHeader from './LandingHeader';
import LandingFooter from './LandingFooter';
import './LandingPage.css'; // Inheriting styles

const Features = () => {
  return (
    <div className="landing-container">
      {/* Navigation Header */}
      <LandingHeader activePage="features" forceScrolled={true} />

      {/* Hero Section for Features */}
      <section className="hero-section" style={{ minHeight: '60vh', paddingBottom: '2rem' }}>
        <div className="hero-content animate-fade-up">
          <div className="hero-badge"><Microscope size={16} /><span>Clinical Capabilities</span></div>
          <h1 className="hero-title">Unmatched <span className="premium-gradient-text">Diagnostic</span> Precision.</h1>
          <p className="hero-subtitle">Explore the comprehensive suite of tools designed for both patients seeking clarity and professionals demanding accuracy.</p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="intelligence-section" style={{ paddingTop: 0 }}>
        <div className="intelligence-grid">
          <FeatureCard 
            icon={<Brain />} title="High-Fidelity AI Scanning" 
            desc="Upload a photo and let our dual-engine AI (GLM-4V & Local TFLite) analyze 140+ skin conditions with millimetric precision in under 800ms."
          />
          <FeatureCard 
            icon={<Stethoscope />} title="Clinical Action Plans" 
            desc="Receive instant, structured reports detailing severity, differential diagnoses, and immediate recommended medical steps."
          />
          <FeatureCard 
            icon={<ShieldCheck />} title="Verified Specialist Finder" 
            desc="Instantly connect with board-certified dermatologists. View their credentials, fees, and book tele-consultations directly."
          />
        </div>
      </section>

      <LandingFooter />
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }) => (
  <div className="node-card animate-fade-up">
    <div className="node-content" style={{ padding: '40px' }}>
      <div className="node-icon-floating" style={{ position: 'relative', top: 0, left: 0, marginBottom: '20px', backgroundColor: 'rgba(108, 99, 255, 0.1)', border: '1px solid rgba(108, 99, 255, 0.2)' }}>
        {icon}
      </div>
      <h3 className="node-title" style={{ fontSize: '24px' }}>{title}</h3>
      <p className="node-desc" style={{ fontSize: '16px', lineHeight: '1.6' }}>{desc}</p>
    </div>
  </div>
);

export default Features;
