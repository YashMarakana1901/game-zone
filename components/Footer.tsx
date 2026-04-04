'use client';

import Link from 'next/link';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{
      borderTop: '1px solid rgba(0,212,255,0.1)',
      padding: '48px 24px 32px',
      background: '#0d1117',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '40px', marginBottom: '40px' }}>
          {/* Brand */}
          <div>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <div style={{
                fontFamily: "'Orbitron', monospace",
                fontWeight: 900, fontSize: '22px',
                background: 'linear-gradient(135deg, #00d4ff, #b347ff)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                marginBottom: '12px', letterSpacing: '2px', display: 'inline-block',
              }}>🎮 GAMEZONE</div>
            </Link>
            <p style={{ color: '#8899aa', fontSize: '14px', fontFamily: "'Inter', sans-serif", lineHeight: 1.6 }}>
              Your #1 destination for free online browser games. No downloads, no sign-up.
            </p>
            <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
              {['Twitter', 'Discord', 'YouTube'].map(s => (
                <div key={s} style={{
                  width: '34px', height: '34px',
                  background: 'rgba(0,212,255,0.08)',
                  border: '1px solid rgba(0,212,255,0.2)',
                  borderRadius: '8px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', fontSize: '14px',
                }} title={s}>
                  {s === 'Twitter' ? '𝕏' : s === 'Discord' ? '💬' : '▶'}
                </div>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 style={{
              fontFamily: "'Orbitron', monospace", fontSize: '12px',
              color: '#00d4ff', letterSpacing: '2px', marginBottom: '16px',
              textTransform: 'uppercase',
            }}>Categories</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {['Action', 'Puzzle', 'Racing', 'Sports', 'Adventure', 'Arcade'].map(cat => (
                <Link key={cat} href={`/category/${cat}`} style={{ textDecoration: 'none' }}>
                  <span style={{
                    color: '#8899aa', fontSize: '14px',
                    fontFamily: "'Rajdhani', sans-serif", fontWeight: 500,
                    transition: 'color 0.2s', cursor: 'pointer',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#00d4ff')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#8899aa')}>
                    {cat}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{
              fontFamily: "'Orbitron', monospace", fontSize: '12px',
              color: '#b347ff', letterSpacing: '2px', marginBottom: '16px',
              textTransform: 'uppercase',
            }}>Quick Links</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { label: '🔥 Hot Games', href: '/#hot' },
                { label: '✨ New Games', href: '/#new' },
                { label: '🏆 Leaderboard', href: '/leaderboard' },
                { label: '❤️ Favorites', href: '/favorites' },
                { label: '🔍 Search', href: '/search' },
              ].map(link => (
                <Link key={link.label} href={link.href} style={{ textDecoration: 'none' }}>
                  <span style={{
                    color: '#8899aa', fontSize: '14px',
                    fontFamily: "'Rajdhani', sans-serif", fontWeight: 500,
                    transition: 'color 0.2s', cursor: 'pointer',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#b347ff')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#8899aa')}>
                    {link.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Advertise CTA */}
          <div>
            <h4 style={{
              fontFamily: "'Orbitron', monospace", fontSize: '12px',
              color: '#ff6b00', letterSpacing: '2px', marginBottom: '16px',
              textTransform: 'uppercase',
            }}>Advertise</h4>
            <p style={{ color: '#8899aa', fontSize: '13px', fontFamily: "'Inter', sans-serif", lineHeight: 1.6, marginBottom: '16px' }}>
              Reach millions of gamers with your ads. Multiple ad formats available.
            </p>
            <a href="mailto:ads@gamezone.com" style={{ textDecoration: 'none' }}>
              <button style={{
                background: 'linear-gradient(135deg, #ff6b00, #ff2d78)',
                color: 'white', border: 'none',
                padding: '10px 20px', borderRadius: '6px',
                fontFamily: "'Rajdhani', sans-serif",
                fontWeight: 700, fontSize: '13px',
                letterSpacing: '1px', cursor: 'pointer',
                textTransform: 'uppercase',
              }}>
                📧 Contact Us
              </button>
            </a>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid rgba(0,212,255,0.08)',
          paddingTop: '24px',
          display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px',
          alignItems: 'center',
        }}>
          <p style={{ color: '#4a5568', fontSize: '13px', fontFamily: "'Inter', sans-serif" }}>
            © {year} GameZone. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '20px' }}>
            {['Privacy Policy', 'Terms of Service', 'DMCA'].map(item => (
              <a key={item} href="#" style={{
                color: '#4a5568', textDecoration: 'none', fontSize: '12px',
                fontFamily: "'Inter', sans-serif", transition: 'color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#8899aa')}
              onMouseLeave={e => (e.currentTarget.style.color = '#4a5568')}>
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
