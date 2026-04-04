'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { games } from '@/lib/games';
import Navbar from '@/components/Navbar';
import GameCard from '@/components/GameCard';
import AdBanner from '@/components/AdBanner';
import Footer from '@/components/Footer';
import { Suspense } from 'react';

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams?.get('q') || '';
  const [query, setQuery] = useState(initialQuery);

  const results = games.filter(g =>
    g.title.toLowerCase().includes(query.toLowerCase()) ||
    g.category.toLowerCase().includes(query.toLowerCase()) ||
    g.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <main style={{ minHeight: '100vh' }}>
      <Navbar />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px' }}>
        <AdBanner type="leaderboard" />

        <div style={{ marginTop: '32px', marginBottom: '32px' }}>
          <h1 style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: '28px', fontWeight: 900,
            background: 'linear-gradient(135deg, #00d4ff, #b347ff)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            marginBottom: '20px', letterSpacing: '1px',
          }}>SEARCH GAMES</h1>

          <div style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(0,212,255,0.3)',
            borderRadius: '12px',
            padding: '14px 20px',
            maxWidth: '600px',
            boxShadow: '0 0 20px rgba(0,212,255,0.1)',
          }}>
            <span style={{ fontSize: '18px' }}>🔍</span>
            <input
              autoFocus
              type="text"
              placeholder="Search games by name or category..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              style={{
                background: 'none', border: 'none', outline: 'none',
                color: '#f0f4ff', fontFamily: "'Rajdhani', sans-serif",
                fontSize: '16px', width: '100%',
              }}
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                style={{
                  background: 'none', border: 'none',
                  color: '#8899aa', cursor: 'pointer', fontSize: '16px',
                }}>✕</button>
            )}
          </div>
        </div>

        {query && (
          <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ color: '#8899aa', fontFamily: "'Inter', sans-serif", fontSize: '14px' }}>
              Found
            </span>
            <span style={{
              background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.2)',
              color: '#00d4ff', padding: '3px 12px', borderRadius: '20px',
              fontFamily: "'Orbitron', monospace", fontSize: '13px', fontWeight: 700,
            }}>{results.length}</span>
            <span style={{ color: '#8899aa', fontFamily: "'Inter', sans-serif", fontSize: '14px' }}>
              games for &quot;<strong style={{ color: '#f0f4ff' }}>{query}</strong>&quot;
            </span>
          </div>
        )}

        {results.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
            gap: '16px',
          }}>
            {results.map(game => <GameCard key={game.id} game={game} />)}
          </div>
        ) : query ? (
          <div style={{ textAlign: 'center', padding: '80px 24px' }}>
            <div style={{ fontSize: '64px', marginBottom: '16px' }}>🕹️</div>
            <h2 style={{
              fontFamily: "'Orbitron', monospace", color: '#8899aa',
              fontSize: '18px', marginBottom: '12px',
            }}>No games found</h2>
            <p style={{ color: '#4a5568', fontFamily: "'Inter', sans-serif" }}>
              Try searching for &quot;puzzle&quot;, &quot;racing&quot;, or &quot;action&quot;
            </p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
            gap: '16px',
          }}>
            {games.map(game => <GameCard key={game.id} game={game} />)}
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

export default function SearchPage() {
  return (
    <Suspense>
      <SearchContent />
    </Suspense>
  );
}
