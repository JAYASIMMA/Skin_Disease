import React, { useState, useEffect, useRef } from 'react';
import { Send, User, Bot, AlertCircle } from 'lucide-react';
import { chatWithAI } from '../../services/zhipuService';

const AIChat = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I am your AI Skin Care Assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await chatWithAI([...messages, userMsg]);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-up" style={{ height: 'calc(100vh - 160px)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '28px', marginBottom: '8px' }}>AI Skincare Assistant</h1>
        <p style={{ color: 'var(--text-dim)' }}>Get instant answers to your skincare concerns.</p>
      </div>

      <div className="glass-card" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div ref={scrollRef} style={{ flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {messages.map((msg, i) => (
            <div key={i} style={{ 
              display: 'flex', 
              gap: '12px', 
              alignItems: 'flex-start',
              flexDirection: msg.role === 'user' ? 'row-reverse' : 'row'
            }}>
              <div style={{ 
                width: '36px', 
                height: '36px', 
                borderRadius: '12px', 
                background: msg.role === 'user' ? 'var(--secondary)' : 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                {msg.role === 'user' ? <User size={20} /> : <Bot size={20} />}
              </div>
              <div style={{ 
                maxWidth: '70%', 
                padding: '12px 16px', 
                borderRadius: '16px', 
                background: msg.role === 'user' ? 'var(--primary)' : 'var(--glass)',
                border: msg.role === 'user' ? 'none' : '1px solid var(--border)',
                lineHeight: '1.5',
                fontSize: '15px'
              }}>
                {msg.content}
              </div>
            </div>
          ))}
          {loading && (
            <div style={{ display: 'flex', gap: '12px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '12px', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Bot size={20} />
              </div>
              <div style={{ padding: '12px 16px', borderRadius: '16px', background: 'var(--glass)', display: 'flex', gap: '4px' }}>
                <span className="dot" style={{ animation: 'bounce 1s infinite 0.1s' }}>.</span>
                <span className="dot" style={{ animation: 'bounce 1s infinite 0.2s' }}>.</span>
                <span className="dot" style={{ animation: 'bounce 1s infinite 0.3s' }}>.</span>
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleSend} style={{ padding: '24px', background: 'rgba(0,0,0,0.2)', display: 'flex', gap: '16px' }}>
          <input 
            type="text" 
            placeholder="Type your question here..." 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            style={{ 
              flex: 1, 
              background: 'var(--glass)', 
              border: '1px solid var(--border)', 
              borderRadius: '12px', 
              padding: '12px 20px', 
              color: 'white',
              outline: 'none'
            }}
          />
          <button type="submit" disabled={loading} className="btn-primary" style={{ padding: '12px', borderRadius: '12px' }}>
            <Send size={20} />
          </button>
        </form>
      </div>

      <style>{`
        @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
        .dot { font-size: 20px; font-weight: bold; color: var(--secondary); }
      `}</style>
    </div>
  );
};

export default AIChat;
