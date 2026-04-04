'use client';

import Link from 'next/link';
import { featuredGames } from '@/lib/games';

export default function HeroBanner() {
  const featured = featuredGames[0];

  return (
    <div style={{
      position: 'relative',
      padding: '48px 24px 40px',
      overflow: 'hidden',
      background: 'linear-gradient(180deg, rgba(0,212,255,0.05) 0%, transparent 100%)',
    }}>
      {/* Background grid */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: `
          linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
      }} />

      {/* Glow orbs */}
      <div style={{
        position: 'absolute', top: '-100px', left: '20%',
        width: '400px', height: '400px',
        background: 'radial-gradient(circle, rgba(0,212,255,0.08) 0%, transparent 70%)',
        zIndex: 0, pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', top: '-80px', right: '15%',
        width: '350px', height: '350px',
        background: 'radial-gradient(circle, rgba(179,71,255,0.08) 0%, transparent 70%)',
        zIndex: 0, pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(0,212,255,0.1)',
            border: '1px solid rgba(0,212,255,0.3)',
            borderRadius: '20px',
            padding: '6px 16px',
            marginBottom: '20px',
          }}>
            <span style={{ fontSize: '12px' }}>⚡</span>
            <span style={{
              color: '#00d4ff',
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: '13px',
              fontWeight: 600,
              letterSpacing: '1px',
              textTransform: 'uppercase',
            }}>1000+ Free Games — Play Instantly</span>
          </div>

          <h1 style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: 'clamp(32px, 6vw, 72px)',
            fontWeight: 900,
            lineHeight: 1.1,
            marginBottom: '20px',
            letterSpacing: '-1px',
          }}>
            <span style={{
              background: 'linear-gradient(135deg, #f0f4ff 30%, #00d4ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>PLAY FREE</span>
            <br />
            <span style={{
              background: 'linear-gradient(135deg, #b347ff, #ff2d78)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>ONLINE GAMES</span>
          </h1>

          <p style={{
            color: '#8899aa',
            fontSize: '18px',
            maxWidth: '520px',
            margin: '0 auto 32px',
            fontFamily: "'Inter', sans-serif",
            lineHeight: 1.6,
          }}>
            Hundreds of free browser games. No download. No sign-up. Just play.
          </p>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="#games" style={{ textDecoration: 'none' }}>
              <button style={{
                background: 'linear-gradient(135deg, #00d4ff, #b347ff)',
                color: 'white', border: 'none',
                padding: '14px 36px', borderRadius: '8px',
                fontFamily: "'Orbitron', monospace",
                fontWeight: 700, fontSize: '14px',
                letterSpacing: '1px', cursor: 'pointer',
                textTransform: 'uppercase',
                boxShadow: '0 0 20px rgba(0,212,255,0.3)',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 0 30px rgba(0,212,255,0.6)')}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 0 20px rgba(0,212,255,0.3)')}>
                🎮 Play Now
              </button>
            </Link>
            <Link href="#categories" style={{ textDecoration: 'none' }}>
              <button style={{
                background: 'transparent',
                color: '#f0f4ff', 
                border: '1px solid rgba(0,212,255,0.3)',
                padding: '14px 36px', borderRadius: '8px',
                fontFamily: "'Orbitron', monospace",
                fontWeight: 600, fontSize: '13px',
                letterSpacing: '1px', cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = '#00d4ff';
                e.currentTarget.style.color = '#00d4ff';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(0,212,255,0.3)';
                e.currentTarget.style.color = '#f0f4ff';
              }}>
                Browse Categories
              </button>
            </Link>
          </div>
        </div>

        {/* Stats row */}
        <div style={{
          display: 'flex', gap: '32px', justifyContent: 'center',
          flexWrap: 'wrap',
        }}>
          {[
            { value: '1000+', label: 'Games' },
            { value: '50M+', label: 'Monthly Players' },
            { value: '10', label: 'Categories' },
            { value: '100%', label: 'Free' },
          ].map(stat => (
            <div key={stat.label} style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: "'Orbitron', monospace",
                fontSize: '24px', fontWeight: 900,
                background: 'linear-gradient(135deg, #00d4ff, #b347ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>{stat.value}</div>
              <div style={{ color: '#8899aa', fontSize: '12px', letterSpacing: '1px', textTransform: 'uppercase' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
