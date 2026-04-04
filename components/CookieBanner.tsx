'use client';

import { useState, useEffect } from 'react';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('gz_cookie_consent');
      if (!consent) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    try { localStorage.setItem('gz_cookie_consent', 'all'); } catch {}
    setVisible(false);
  };

  const reject = () => {
    try { localStorage.setItem('gz_cookie_consent', 'essential'); } catch {}
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0,
      zIndex: 999,
      padding: '16px 24px',
      background: 'var(--cookie-bg)',
      backdropFilter: 'blur(20px)',
      borderTop: '1px solid var(--cookie-border)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      flexWrap: 'wrap', gap: '16px',
      boxShadow: '0 -4px 30px rgba(0,0,0,0.15)',
      animation: 'slideUp 0.4s ease',
    }}>
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
      `}</style>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
        <span style={{ fontSize: '22px' }}>🍪</span>
        <p style={{
          color: 'var(--text-secondary)', fontSize: '13px',
          fontFamily: "'Inter', sans-serif", lineHeight: 1.5,
          maxWidth: '600px',
        }}>
          We use cookies to personalise ads and analyse traffic.{' '}
          <a href="/privacy" style={{ color: 'var(--neon-blue)', textDecoration: 'underline' }}>
            Privacy Policy
          </a>
        </p>
      </div>

      <div style={{ display: 'flex', gap: '10px', flexShrink: 0 }}>
        <button
          onClick={reject}
          style={{
            background: 'transparent',
            border: '1px solid var(--cookie-border)',
            color: 'var(--text-secondary)', padding: '8px 18px',
            borderRadius: '6px', cursor: 'pointer',
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: '13px', fontWeight: 600,
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--neon-blue)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--cookie-border)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
        >
          Essential Only
        </button>
        <button
          onClick={accept}
          style={{
            background: 'linear-gradient(135deg, var(--neon-blue), var(--neon-purple))',
            border: 'none', color: 'white',
            padding: '8px 22px', borderRadius: '6px',
            cursor: 'pointer',
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: '13px', fontWeight: 700,
            letterSpacing: '0.5px',
            transition: 'box-shadow 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 16px color-mix(in srgb, var(--neon-blue) 40%, transparent)'; }}
          onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; }}
        >
          Accept All
        </button>
      </div>
    </div>
  );
}
