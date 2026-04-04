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
      background: 'var(--hero-bg)',
    }}>
      {/* Background grid */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: `
          linear-gradient(var(--grid-line) 1px, transparent 1px),
          linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
      }} />

      {/* Glow orbs */}
      <div style={{
        position: 'absolute', top: '-100px', left: '20%',
        width: '400px', height: '400px',
        background: `radial-gradient(circle, var(--glow-blue) 0%, transparent 70%)`,
        zIndex: 0, pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', top: '-80px', right: '15%',
        width: '350px', height: '350px',
        background: `radial-gradient(circle, var(--glow-purple) 0%, transparent 70%)`,
        zIndex: 0, pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'var(--pill-bg)',
            border: '1px solid var(--pill-border)',
            borderRadius: '20px',
            padding: '6px 16px',
            marginBottom: '20px',
          }}>
            <span style={{ fontSize: '12px' }}>⚡</span>
            <span style={{
              color: 'var(--neon-blue)',
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
              background: 'linear-gradient(135deg, var(--text-primary) 30%, var(--neon-blue))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>PLAY FREE</span>
            <br />
            <span style={{
              background: 'linear-gradient(135deg, var(--neon-purple), var(--neon-pink))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>ONLINE GAMES</span>
          </h1>

          <p style={{
            color: 'var(--text-secondary)',
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
                background: 'linear-gradient(135deg, var(--neon-blue), var(--neon-purple))',
                color: 'white', border: 'none',
                padding: '14px 36px', borderRadius: '8px',
                fontFamily: "'Orbitron', monospace",
                fontWeight: 700, fontSize: '14px',
                letterSpacing: '1px', cursor: 'pointer',
                textTransform: 'uppercase',
                boxShadow: '0 0 20px color-mix(in srgb, var(--neon-blue) 30%, transparent)',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 0 30px color-mix(in srgb, var(--neon-blue) 60%, transparent)')}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 0 20px color-mix(in srgb, var(--neon-blue) 30%, transparent)')}>
                🎮 Play Now
              </button>
            </Link>
            <Link href="#categories" style={{ textDecoration: 'none' }}>
              <button style={{
                background: 'transparent',
                color: 'var(--text-primary)',
                border: '1px solid var(--search-border)',
                padding: '14px 36px', borderRadius: '8px',
                fontFamily: "'Orbitron', monospace",
                fontWeight: 600, fontSize: '13px',
                letterSpacing: '1px', cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--neon-blue)';
                e.currentTarget.style.color = 'var(--neon-blue)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--search-border)';
                e.currentTarget.style.color = 'var(--text-primary)';
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
                background: 'linear-gradient(135deg, var(--neon-blue), var(--neon-purple))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>{stat.value}</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '12px', letterSpacing: '1px', textTransform: 'uppercase' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
