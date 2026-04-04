'use client';

import { useFavorites } from '@/components/Favorites';
import { games } from '@/lib/games';
import Navbar from '@/components/Navbar';
import GameCard from '@/components/GameCard';
import AdBanner from '@/components/AdBanner';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function FavoritesPage() {
  const { favorites } = useFavorites();
  const favGames = games.filter(g => favorites.includes(g.id));

  return (
    <main style={{ minHeight: '100vh' }}>
      <Navbar />
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px' }}>
        <AdBanner type="leaderboard" />

        <div style={{ margin: '32px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '8px' }}>
            <div style={{
              width: '4px', height: '28px',
              background: 'linear-gradient(to bottom, #ff2d78, #b347ff)',
              borderRadius: '2px',
            }} />
            <h1 style={{
              fontFamily: "'Orbitron', monospace",
              fontSize: '26px', fontWeight: 900,
              background: 'linear-gradient(135deg, #ff2d78, #b347ff)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              letterSpacing: '1px',
            }}>❤️ MY FAVORITES</h1>
            <span style={{
              background: 'rgba(255,45,120,0.1)',
              border: '1px solid rgba(255,45,120,0.3)',
              color: '#ff2d78', fontSize: '12px',
              padding: '3px 12px', borderRadius: '20px',
              fontFamily: "'Orbitron', monospace", fontWeight: 700,
            }}>{favGames.length}</span>
          </div>
          <p style={{ color: '#8899aa', fontFamily: "'Inter', sans-serif", fontSize: '14px', marginLeft: '20px' }}>
            Games you&apos;ve hearted — saved in your browser
          </p>
        </div>

        {favGames.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
            gap: '16px',
          }}>
            {favGames.map(game => <GameCard key={game.id} game={game} />)}
          </div>
        ) : (
          <div style={{
            textAlign: 'center', padding: '80px 24px',
            border: '1px dashed rgba(255,45,120,0.2)',
            borderRadius: '16px',
            background: 'rgba(255,45,120,0.03)',
          }}>
            <div style={{ fontSize: '72px', marginBottom: '20px' }}>🤍</div>
            <h2 style={{
              fontFamily: "'Orbitron', monospace",
              color: '#8899aa', fontSize: '18px', marginBottom: '12px',
            }}>No favorites yet</h2>
            <p style={{ color: '#4a5568', fontFamily: "'Inter', sans-serif", marginBottom: '28px' }}>
              Click the heart icon on any game to save it here
            </p>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <button style={{
                background: 'linear-gradient(135deg, #ff2d78, #b347ff)',
                color: 'white', border: 'none',
                padding: '12px 28px', borderRadius: '8px',
                fontFamily: "'Orbitron', monospace",
                fontWeight: 700, fontSize: '13px',
                letterSpacing: '1px', cursor: 'pointer',
              }}>
                🎮 Browse Games
              </button>
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
