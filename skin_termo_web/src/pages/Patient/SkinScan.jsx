import React, { useState, useEffect } from 'react';
import { Camera, Upload, AlertCircle, ArrowRight, CheckCircle2, History, Clock } from 'lucide-react';
import { analyzeSkinImage, getAnalysisHistory } from '../../services/zhipuService';

const SkinScan = () => {
  const [image, setImage] = useState(null);
  const [base64, setBase64] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Analyzing skin patterns...');
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  // Multi-stage loading animation
  useEffect(() => {
    let interval;
    if (loading) {
      const messages = [
        'Analyzing skin patterns...',
        'Checking dermatological indices...',
        'Cross-referencing medical database...',
        'Synthesizing ZhipuAI clinical insights...',
        'Finalizing high-fidelity assessment...'
      ];
      let step = 0;
      interval = setInterval(() => {
        step = (step + 1) % messages.length;
        setLoadingMessage(messages[step]);
      }, 3000);
    } else {
      setLoadingMessage('Analyzing skin patterns...');
    }
    return () => clearInterval(interval);
  }, [loading]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const data = await getAnalysisHistory();
      setHistory(data);
    } catch (error) {
      console.error('History Error:', error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(URL.createObjectURL(file));
        setBase64(reader.result.split(',')[1]);
      };
      reader.readAsDataURL(file);
    }
  };

  const startAnalysis = async () => {
    setLoading(true);
    setResult(null);
    try {
      const data = await analyzeSkinImage(base64);
      setResult(data);
      fetchHistory(); // Refresh history
    } catch (error) {
      console.error(error);
      alert('Analysis failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const selectHistoryItem = (item) => {
    setResult(item);
    setImage(`http://127.0.0.1:3000${item.image_url}`);
    setShowHistory(false);
  };

  return (
    <div className="animate-fade-up">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <div>
          <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>Skin Analyser</h1>
          <p style={{ color: 'var(--text-dim)' }}>Scan your skin conditions with advanced AI technology.</p>
        </div>
        <button 
          className="btn-secondary" 
          onClick={() => setShowHistory(!showHistory)}
          style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          aria-label={showHistory ? "Back to scanner" : "View scan history"}
        >
          <History size={18} /> {showHistory ? 'New Scan' : 'View History'}
        </button>
      </div>

      {showHistory ? (
        <div className="glass-card animate-fade-up" style={{ padding: '32px' }}>
          <h2 style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Clock size={24} color="var(--primary)" /> Analysis History
          </h2>
          {history.length === 0 ? (
            <p style={{ textAlign: 'center', padding: '40px', color: 'var(--text-dim)' }}>No previous analysis found.</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
              {history.map((item) => (
                <div 
                  key={item.id} 
                  className="glass-card" 
                  style={{ overflow: 'hidden', cursor: 'pointer', border: '1px solid var(--border)' }}
                  onClick={() => selectHistoryItem(item)}
                >
                  <img src={`http://127.0.0.1:3000${item.image_url}`} alt={item.disease_name} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
                  <div style={{ padding: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <h4 style={{ margin: 0 }}>{item.disease_name}</h4>
                      <span style={{ fontSize: '10px', color: 'var(--text-dim)' }}>{new Date(item.timestamp).toLocaleDateString()}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', fontSize: '12px' }}>
                      <span style={{ color: item.severity === 'Severe' ? '#ff6b6b' : 'var(--secondary)' }}>{item.severity}</span>
                      <span style={{ color: 'var(--text-dim)' }}>• Confidence: {item.confidence}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
          <div className="glass-card" style={{ padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '400px' }}>
            {image ? (
              <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                <img src={image} alt="Preview" style={{ width: '100%', borderRadius: '16px', maxHeight: '350px', objectFit: 'cover' }} />
                <button 
                  onClick={() => {setImage(null); setBase64(null); setResult(null);}}
                  style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(255,107,107,0.8)', color: 'white', padding: '8px', borderRadius: '50%', border: 'none', cursor: 'pointer' }}
                  aria-label="Remove image"
                >
                  ✕
                </button>
              </div>
            ) : (
              <div style={{ textAlign: 'center' }}>
                <div style={{ padding: '40px', border: '2px dashed var(--border)', borderRadius: '24px', cursor: 'pointer' }} onClick={() => document.getElementById('fileInput').click()}>
                  <Upload size={48} color="var(--primary)" style={{ marginBottom: '16px' }} />
                  <p style={{ fontWeight: '600' }}>Click to Upload Image</p>
                  <p style={{ color: 'var(--text-dim)', fontSize: '14px', marginTop: '8px' }}>Supports JPG, PNG (Max 5MB)</p>
                </div>
                <input type="file" id="fileInput" hidden onChange={handleFileChange} accept="image/*" />
                
                <div style={{ margin: '24px 0', display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ flex: 1, height: '1px', background: 'var(--border)' }}></div>
                  <span style={{ color: 'var(--text-dim)', fontSize: '12px' }}>OR</span>
                  <div style={{ flex: 1, height: '1px', background: 'var(--border)' }}></div>
                </div>

                <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '0 auto' }}>
                  <Camera size={20} /> Use Camera
                </button>
              </div>
            )}

            {image && !loading && !result && (
              <button className="btn-primary" onClick={startAnalysis} style={{ width: '100%', marginTop: '24px' }}>
                Start AI Analysis
              </button>
            )}

            {loading && (
              <div style={{ marginTop: '24px', textAlign: 'center' }}>
                <div className="loading-spinner" style={{ 
                  width: '50px', 
                  height: '50px', 
                  border: '3px solid transparent', 
                  borderTop: '3px solid var(--primary)', 
                  borderRight: '3px solid var(--secondary)',
                  borderRadius: '50%', 
                  animation: 'spin 0.8s cubic-bezier(0.4, 0, 0.2, 1) infinite', 
                  margin: '0 auto 20px' 
                }}></div>
                <p className="animate-pulse" style={{ fontWeight: '600', color: 'var(--primary)', letterSpacing: '0.5px' }}>{loadingMessage}</p>
                <p style={{ color: 'var(--text-dim)', fontSize: '13px', marginTop: '6px' }}>Our high-fidelity AI is processing your request</p>
              </div>
            )}
          </div>

          <div className="glass-card" style={{ padding: '32px' }}>
            {!result ? (
              <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                <AlertCircle size={48} color="var(--text-dim)" style={{ marginBottom: '16px' }} />
                <h3 style={{ marginBottom: '8px' }}>Awaiting Analysis</h3>
                <p style={{ color: 'var(--text-dim)' }}>The detailed analysis report will appear here once the scanning is complete.</p>
              </div>
            ) : (
              <div className="animate-fade-up">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                  <div>
                    <h2 className="premium-gradient-text" style={{ fontSize: '24px' }}>{result.disease_name}</h2>
                    <p style={{ color: 'var(--text-dim)', marginTop: '4px', fontSize: '14px', fontWeight: '500' }}>
                      Diagnostic Confidence: <span style={{ color: 'var(--secondary)', fontWeight: '700' }}>{result.confidence}</span>
                    </p>
                  </div>
                  <div style={{ background: result.severity === 'Severe' ? '#ff6b6b' : 'var(--accent)', color: 'white', padding: '4px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 'bold' }}>
                    {result.severity.toUpperCase()}
                  </div>
                </div>

                <p style={{ lineHeight: '1.6', marginBottom: '24px' }}>{result.description}</p>

                <div style={{ marginBottom: '24px' }}>
                  <h4 style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={18} color="var(--secondary)" /> Symptoms Detected
                  </h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {result.symptoms?.map((s, i) => (
                      <span key={i} style={{ background: 'var(--glass)', padding: '6px 14px', borderRadius: '10px', fontSize: '13px' }}>{s}</span>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: '32px' }}>
                  <h4 style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <AlertCircle size={18} color="var(--primary)" /> Recommendations
                  </h4>
                  <ul style={{ paddingLeft: '20px', color: 'var(--text-dim)', fontSize: '14px' }}>
                    {result.recommendations?.map((r, i) => (
                      <li key={i} style={{ marginBottom: '8px' }}>{r}</li>
                    ))}
                  </ul>
                </div>

                <button className="btn-primary" style={{ width: '100%', background: 'var(--bg-dark)', border: '1px solid var(--primary)', color: 'white' }}>
                  Chat with Specialist regarding this <ArrowRight size={18} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default SkinScan;
