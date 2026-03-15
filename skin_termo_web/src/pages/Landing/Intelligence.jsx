import React from 'react';
import { Activity, Cpu, Network, Zap } from 'lucide-react';
import LandingHeader from './LandingHeader';
import LandingFooter from './LandingFooter';
import './LandingPage.css';

const Intelligence = () => {
  return (
    <div className="landing-container">
      <LandingHeader activePage="intelligence" forceScrolled={true} />

      <section className="hero-section" style={{ minHeight: '60vh', paddingBottom: '2rem' }}>
        <div className="hero-content animate-fade-up">
          <div className="hero-badge"><Cpu size={16} /><span>Neural Architecture</span></div>
          <h1 className="hero-title">The <span className="premium-gradient-text">Engine</span> Inside.</h1>
          <p className="hero-subtitle">SkinTermo AI utilizes a hybrid intelligence model, combining edge-computing speed with cloud-scale vision models.</p>
        </div>
      </section>

      <section className="intelligence-section" style={{ paddingTop: 0 }}>
        <div className="intelligence-grid">
          <ModelCard 
            title="GLM-4V Multimodal" 
            metric="Cloud" 
            icon={<Network color="#00D2FF" />}
            features={['Vast Medical Knowledge Graph', 'Complex visual reasoning', 'Empathic conversational output']}
          />
          <ModelCard 
            title="Local TFLite Inference" 
            metric="Edge" 
            icon={<Zap color="#6C63FF" />}
            features={['Zero latency processing', 'Complete data privacy', 'Offline diagnostic capabilities']}
          />
          <ModelCard 
            title="Ollama Healthcare" 
            metric="Hybrid" 
            icon={<Cpu color="#00E676" />}
            features={['Custom fine-tuned weights', 'Secure local API bridging', 'Specialized dermatology prompts']}
          />
        </div>
      </section>

      <LandingFooter />
    </div>
  );
};

const ModelCard = ({ title, metric, icon, features }) => (
  <div className="node-card animate-fade-up" style={{ padding: '30px', background: 'rgba(255,255,255,0.02)' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
      <h3 style={{ color: 'white', fontSize: '22px', margin: 0 }}>{title}</h3>
      <div style={{ padding: '6px 12px', background: 'rgba(255,255,255,0.1)', borderRadius: '20px', color: 'white', fontSize: '12px', fontWeight: 'bold' }}>{metric}</div>
    </div>
    <div style={{ marginBottom: '20px' }}>{icon}</div>
    <ul style={{ color: 'rgba(255,255,255,0.6)', listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {features.map((f, i) => (
        <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor' }}></div>
          {f}
        </li>
      ))}
    </ul>
  </div>
);

export default Intelligence;
