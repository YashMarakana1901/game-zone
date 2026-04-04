'use client';

import { useParams } from 'next/navigation';
import { games, categories } from '@/lib/games';
import Navbar from '@/components/Navbar';
import GameCard from '@/components/GameCard';
import AdBanner from '@/components/AdBanner';
import Footer from '@/components/Footer';
import Link from 'next/link';

const categoryEmojis: Record<string, string> = {
  Action: '⚔️', Puzzle: '🧩', Racing: '🏎️', Sports: '⚽',
  Adventure: '🗺️', Arcade: '👾', Shooting: '🔫', Strategy: '♟️',
  Casual: '🎯', All: '🎮',
};

export default function CategoryPage() {
  const params = useParams();
  const name = decodeURIComponent(params?.name as string || '');
  const filtered = games.filter(g => g.category.toLowerCase() === name.toLowerCase());
  const emoji = categoryEmojis[name] || '🎮';

  return (
    <main style={{ minHeight: '100vh' }}>
      <Navbar />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px' }}>
        <AdBanner type="leaderboard" />

        {/* Page header */}
        <div style={{
          marginTop: '32px', marginBottom: '32px',
          padding: '32px',
          background: 'linear-gradient(135deg, rgba(0,212,255,0.08), rgba(179,71,255,0.08))',
          border: '1px solid rgba(0,212,255,0.15)',
          borderRadius: '16px',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', right: '-20px', top: '-20px',
            fontSize: '120px', opacity: 0.08, userSelect: 'none',
          }}>{emoji}</div>
          <div style={{
            fontFamily: "'Rajdhani', sans-serif",
            color: '#8899aa', fontSize: '13px',
            letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px',
          }}>Category</div>
          <h1 style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: '36px', fontWeight: 900,
            background: 'linear-gradient(135deg, #00d4ff, #b347ff)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            letterSpacing: '2px', marginBottom: '8px',
          }}>{emoji} {name.toUpperCase()}</h1>
          <p style={{ color: '#8899aa', fontFamily: "'Inter', sans-serif" }}>
            {filtered.length} games in this category
          </p>
        </div>

        {/* Other categories */}
        <div style={{ marginBottom: '28px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {categories.filter(c => c !== 'All').map(cat => (
            <Link key={cat} href={`/category/${cat}`} style={{ textDecoration: 'none' }}>
              <button style={{
                padding: '7px 16px',
                borderRadius: '20px',
                fontSize: '13px', fontWeight: 600,
                cursor: 'pointer',
                fontFamily: "'Rajdhani', sans-serif",
                transition: 'all 0.2s',
                border: '1px solid',
                ...(cat.toLowerCase() === name.toLowerCase() ? {
                  background: 'linear-gradient(135deg, #00d4ff, #b347ff)',
                  borderColor: 'transparent',
                  color: 'white',
                  boxShadow: '0 0 16px rgba(0,212,255,0.3)',
                } : {
                  background: 'transparent',
                  borderColor: 'rgba(0,212,255,0.2)',
                  color: '#8899aa',
                }),
              }}>
                {categoryEmojis[cat]} {cat}
              </button>
            </Link>
          ))}
        </div>

        {/* Games grid */}
        {filtered.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
            gap: '16px',
          }}>
            {filtered.map(game => <GameCard key={game.id} game={game} />)}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '80px 24px' }}>
            <div style={{ fontSize: '64px', marginBottom: '16px' }}>{emoji}</div>
            <h2 style={{ fontFamily: "'Orbitron', monospace", color: '#8899aa', fontSize: '18px' }}>
              No games in this category yet
            </h2>
            <Link href="/" style={{ color: '#00d4ff', marginTop: '16px', display: 'inline-block', fontFamily: "'Rajdhani', sans-serif", fontWeight: 600 }}>
              ← Browse all games
            </Link>
          </div>
        )}

        <div style={{ marginTop: '32px' }}>
          <AdBanner type="leaderboard" />
        </div>
      </div>

      <Footer />
    </main>
  );
}
