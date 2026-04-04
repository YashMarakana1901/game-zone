'use client';

import { useState } from 'react';
import { games } from '@/lib/games';
import Navbar from '@/components/Navbar';
import AdBanner from '@/components/AdBanner';
import Footer from '@/components/Footer';
import Link from 'next/link';

type SortBy = 'plays' | 'rating' | 'new';

function parsePlays(p: string): number {
  const n = parseFloat(p);
  if (p.includes('M')) return n * 1_000_000;
  if (p.includes('K')) return n * 1_000;
  return n;
}

const medals = ['🥇', '🥈', '🥉'];
const rankColors = ['#ffd700', '#c0c0c0', '#cd7f32'];

export default function LeaderboardPage() {
  const [sortBy, setSortBy] = useState<SortBy>('plays');

  const sorted = [...games].sort((a, b) => {
    if (sortBy === 'plays') return parsePlays(b.plays) - parsePlays(a.plays);
    if (sortBy === 'rating') return b.rating - a.rating;
    return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
  });

  return (
    <main style={{ minHeight: '100vh' }}>
      <Navbar />

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '32px 24px' }}>
        <AdBanner type="leaderboard" />

        {/* Header */}
        <div style={{ margin: '32px 0 28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '8px' }}>
            <div style={{
              width: '4px', height: '28px',
              background: 'linear-gradient(to bottom, #ffd700, #ff6b00)',
              borderRadius: '2px',
            }} />
            <h1 style={{
              fontFamily: "'Orbitron', monospace",
              fontSize: '26px', fontWeight: 900,
              background: 'linear-gradient(135deg, #ffd700, #ff6b00)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              letterSpacing: '1px',
            }}>🏆 LEADERBOARD</h1>
          </div>
          <p style={{ color: '#8899aa', fontFamily: "'Inter', sans-serif", fontSize: '14px', marginLeft: '20px' }}>
            Top-ranked games by plays, rating, and freshness
          </p>
        </div>

        {/* Sort tabs */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
          {([
            { key: 'plays', label: '🎮 Most Played' },
            { key: 'rating', label: '⭐ Top Rated' },
            { key: 'new', label: '✨ Newest' },
          ] as { key: SortBy; label: string }[]).map(tab => (
            <button key={tab.key} onClick={() => setSortBy(tab.key)} style={{
              padding: '8px 20px', borderRadius: '8px',
              fontFamily: "'Rajdhani', sans-serif",
              fontWeight: 700, fontSize: '14px',
              cursor: 'pointer', transition: 'all 0.2s',
              border: '1px solid',
              ...(sortBy === tab.key ? {
                background: 'linear-gradient(135deg, #ffd700, #ff6b00)',
                borderColor: 'transparent', color: '#06080f',
                boxShadow: '0 0 16px rgba(255,215,0,0.3)',
              } : {
                background: 'transparent',
                borderColor: 'rgba(255,215,0,0.2)',
                color: '#8899aa',
              }),
            }}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Leaderboard rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {sorted.map((game, i) => (
            <Link key={game.id} href={game.url} style={{ textDecoration: 'none' }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '16px',
                background: i < 3 ? `rgba(255,215,0,${0.06 - i * 0.015})` : '#111827',
                border: `1px solid ${i < 3 ? `rgba(255,215,0,${0.3 - i * 0.08})` : 'rgba(0,212,255,0.08)'}`,
                borderRadius: '12px', padding: '14px 20px',
                transition: 'all 0.2s', cursor: 'pointer',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.transform = 'translateX(4px)';
                (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(0,212,255,0.3)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.transform = '';
                (e.currentTarget as HTMLDivElement).style.borderColor = i < 3
                  ? `rgba(255,215,0,${0.3 - i * 0.08})`
                  : 'rgba(0,212,255,0.08)';
              }}>
                {/* Rank */}
                <div style={{
                  width: '40px', textAlign: 'center', flexShrink: 0,
                  fontFamily: "'Orbitron', monospace",
                  fontSize: i < 3 ? '22px' : '18px',
                  fontWeight: 900,
                  color: rankColors[i] ?? '#4a5568',
                }}>
                  {i < 3 ? medals[i] : `#${i + 1}`}
                </div>

                {/* Game icon */}
                <div style={{
                  width: '44px', height: '44px', flexShrink: 0,
                  background: `linear-gradient(135deg, hsl(${parseInt(game.id) * 40}, 60%, 20%), hsl(${parseInt(game.id) * 40 + 60}, 70%, 15%))`,
                  borderRadius: '10px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '22px',
                }}>
                  {['🎮','🕹️','🎯','🏎️','⚽','🗺️','👾','🎱','🔫','🧩'][parseInt(game.id) % 10]}
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontFamily: "'Orbitron', monospace",
                    fontSize: '14px', fontWeight: 700,
                    color: '#f0f4ff', marginBottom: '3px',
                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                  }}>{game.title}</div>
                  <div style={{
                    fontSize: '12px', color: '#8899aa',
                    fontFamily: "'Rajdhani', sans-serif",
                    display: 'flex', gap: '12px',
                  }}>
                    <span style={{
                      background: 'rgba(0,212,255,0.1)',
                      border: '1px solid rgba(0,212,255,0.15)',
                      color: '#00d4ff', padding: '1px 8px', borderRadius: '4px', fontSize: '11px',
                    }}>{game.category}</span>
                    {game.isHot && <span style={{ color: '#ff6b00' }}>🔥 Hot</span>}
                    {game.isNew && <span style={{ color: '#00ff88' }}>✨ New</span>}
                  </div>
                </div>

                {/* Stats */}
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{
                    fontFamily: "'Orbitron', monospace",
                    fontSize: '15px', fontWeight: 700,
                    color: sortBy === 'plays' ? '#00d4ff' : '#f0f4ff',
                  }}>{game.plays}</div>
                  <div style={{ fontSize: '12px', color: '#ffd700', marginTop: '2px' }}>
                    ★ {game.rating}
                  </div>
                </div>

                {/* Play arrow */}
                <div style={{ color: '#00d4ff', fontSize: '18px', flexShrink: 0 }}>›</div>
              </div>
            </Link>
          ))}
        </div>

        <div style={{ marginTop: '32px' }}>
          <AdBanner type="leaderboard" />
        </div>
      </div>

      <Footer />
    </main>
  );
}
