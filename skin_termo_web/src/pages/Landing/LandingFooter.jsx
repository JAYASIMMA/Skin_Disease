import React from 'react';
import { Activity, Database, Globe, Lock } from 'lucide-react';
import './LandingPage.css';

const LandingFooter = () => {
  return (
    <footer className="landing-footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="footer-logo">
            <div className="logo-icon-small">
              <Activity size={18} color="white" />
            </div>
            <span className="logo-text">SkinTermo <span className="premium-gradient-text" style={{ fontStyle: 'italic' }}>AI</span></span>
          </div>
          <p className="footer-desc">
            Advancing humanitarian healthcare through the precise application of revolutionary artificial intelligence. Made with global care.
          </p>
          <div className="footer-social">
              {[Database, Globe, Lock].map((Icon, i) => (
                <div key={i} className="social-icon">
                  <Icon size={20} />
                </div>
              ))}
          </div>
        </div>
        
        <FooterNav title="Solutions" links={['AI Diagnostics', 'Clinical Connect', 'Fleet Management', 'Enterprise API']} />
        <FooterNav title="Platform" links={['Security Whitepaper', 'Trust Center', 'Health Cloud', 'Developer Portal']} />
        <FooterNav title="Corporate" links={['Our Research', 'Privacy Policy', 'Cookie Policy', 'Accessibility']} />
      </div>
      
      <div className="footer-bottom">
        <p>© 2026 SkinTermo AI Enterprise. High Fidelity Medical OS.</p>
        <div className="footer-links">
            <span>Twitter / X</span>
            <span>LinkedIn</span>
            <span>GitHub</span>
        </div>
      </div>
    </footer>
  );
};

const FooterNav = ({ title, links }) => (
  <div className="footer-nav">
    <h4 className="footer-nav-title">{title}</h4>
    {links.map(l => (
      <span key={l} className="footer-nav-link">{l}</span>
    ))}
  </div>
);

export default LandingFooter;
