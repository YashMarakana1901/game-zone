'use client';

import Link from 'next/link';
import { Game } from '@/lib/games';
import { FavoriteButton } from '@/components/Favorites';

interface GameCardProps {
  game: Game;
  size?: 'normal' | 'large';
}

export default function GameCard({ game, size = 'normal' }: GameCardProps) {
  const isLarge = size === 'large';

  return (
    <Link href={game.url} style={{ textDecoration: 'none' }}>
      <div
        style={{
          background: '#111827',
          borderRadius: '12px',
          overflow: 'hidden',
          border: '1px solid rgba(0,212,255,0.1)',
          cursor: 'pointer',
          transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
          position: 'relative',
        }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.transform = 'translateY(-6px) scale(1.02)';
          el.style.boxShadow = '0 16px 40px rgba(0,0,0,0.5), 0 0 24px rgba(0,212,255,0.2)';
          el.style.borderColor = 'rgba(0,212,255,0.4)';
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.transform = '';
          el.style.boxShadow = '';
          el.style.borderColor = 'rgba(0,212,255,0.1)';
        }}
      >
        {/* Thumbnail */}
        <div style={{
          position: 'relative',
          height: isLarge ? '200px' : '140px',
          background: `linear-gradient(135deg, 
            hsl(${parseInt(game.id) * 40}, 60%, 20%), 
            hsl(${parseInt(game.id) * 40 + 60}, 70%, 15%))`,
          overflow: 'hidden',
        }}>
          {/* Game thumbnail via img tag with fallback */}
          <div style={{
            width: '100%', height: '100%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: isLarge ? '64px' : '48px',
          }}>
            {['🎮','🕹️','🎯','🏎️','⚽','🗺️','👾','🎱','🔫','🧩'][parseInt(game.id) % 10]}
          </div>

          {/* Play overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'rgba(0,0,0,0.6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            opacity: 0,
            transition: 'opacity 0.2s',
          }}
          className="play-overlay">
            <div style={{
              width: '52px', height: '52px',
              background: 'linear-gradient(135deg, #00d4ff, #b347ff)',
              borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '20px',
              boxShadow: '0 0 20px rgba(0,212,255,0.6)',
            }}>▶</div>
          </div>

          {/* Badges */}
          <div style={{ position: 'absolute', top: '8px', left: '8px', display: 'flex', gap: '4px' }}>
            {game.isHot && (
              <span style={{
                background: 'linear-gradient(135deg, #ff6b00, #ff2d78)',
                color: 'white', fontSize: '10px', fontWeight: 700,
                padding: '2px 8px', borderRadius: '20px',
                fontFamily: "'Orbitron', monospace", letterSpacing: '0.5px',
              }}>🔥 HOT</span>
            )}
            {game.isNew && (
              <span style={{
                background: 'linear-gradient(135deg, #00ff88, #00d4ff)',
                color: '#06080f', fontSize: '10px', fontWeight: 700,
                padding: '2px 8px', borderRadius: '20px',
                fontFamily: "'Orbitron', monospace", letterSpacing: '0.5px',
              }}>NEW</span>
            )}
          </div>

          {/* Favorite heart */}
          <FavoriteButton gameId={game.id} />

          {/* Category tag */}
          <div style={{ position: 'absolute', bottom: '8px', right: '8px' }}>
            <span style={{
              background: 'rgba(0,0,0,0.7)',
              backdropFilter: 'blur(8px)',
              color: '#00d4ff', fontSize: '10px', fontWeight: 600,
              padding: '3px 8px', borderRadius: '4px',
              fontFamily: "'Rajdhani', sans-serif", letterSpacing: '0.5px',
              border: '1px solid rgba(0,212,255,0.3)',
            }}>{game.category}</span>
          </div>
        </div>

        {/* Info */}
        <div style={{ padding: isLarge ? '16px' : '12px' }}>
          <h3 style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: isLarge ? '15px' : '13px',
            fontWeight: 700,
            color: '#f0f4ff',
            marginBottom: '6px',
            letterSpacing: '0.5px',
          }}>{game.title}</h3>

          {isLarge && (
            <p style={{
              color: '#8899aa',
              fontSize: '12px',
              marginBottom: '10px',
              fontFamily: "'Inter', sans-serif",
              lineHeight: 1.4,
            }}>{game.description}</p>
          )}

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ color: '#ffd700', fontSize: '12px' }}>★</span>
              <span style={{ color: '#f0f4ff', fontSize: '12px', fontWeight: 600 }}>{game.rating}</span>
            </div>
            <span style={{ color: '#8899aa', fontSize: '11px', fontFamily: "'Inter', sans-serif" }}>
              {game.plays} plays
            </span>
          </div>
        </div>
      </div>

      <style>{`
        a:hover .play-overlay { opacity: 1 !important; }
      `}</style>
    </Link>
  );
}
