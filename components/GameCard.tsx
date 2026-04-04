'use client';

import Link from 'next/link';
import { Game } from '@/lib/games';
import { FavoriteButton } from '@/components/Favorites';
import {
  GiPistolGun,
  GiPuzzle,
  GiRaceCar,
  GiSoccerBall, 
  GiBulletBill,
  GiChessKnight,
  GiGamepad,
  GiDiamonds,
  GiTreasureMap,
  GiCardAceDiamonds,
} from 'react-icons/gi';
import { FaFire, FaStarHalfAlt } from 'react-icons/fa';
import { MdNewReleases, MdStar } from 'react-icons/md';
import { IoGameController } from 'react-icons/io5';

const categoryIcons: Record<string, React.ReactNode> = {
  Action:    <GiPistolGun size={40} />,
  Puzzle:    <GiPuzzle size={40} />,
  Racing:    <GiRaceCar size={40} />,
  Sports:    <GiSoccerBall size={40} />,
  Adventure: <GiTreasureMap size={40} />,
  Arcade:    <GiCardAceDiamonds size={40} />,
  Shooting:  <GiBulletBill size={40} />,
  Strategy:  <GiChessKnight size={40} />,
  Casual:    <GiDiamonds size={40} />,
};

const categoryColors: Record<string, string> = {
  Action:    '220, 60%, 18%',
  Puzzle:    '280, 55%, 18%',
  Racing:    '15, 70%, 18%',
  Sports:    '140, 55%, 14%',
  Adventure: '40, 65%, 16%',
  Arcade:    '190, 60%, 16%',
  Shooting:  '350, 60%, 18%',
  Strategy:  '260, 50%, 18%',
  Casual:    '310, 50%, 16%',
};

interface GameCardProps {
  game: Game;
  size?: 'normal' | 'large';
}

export default function GameCard({ game, size = 'normal' }: GameCardProps) {
  const isLarge = size === 'large';
  const Icon = categoryIcons[game.category] ?? <IoGameController size={40} />;
  const colorBase = categoryColors[game.category] ?? '200, 60%, 16%';

  return (
    <Link href={game.url} style={{ textDecoration: 'none' }}>
      <div
        className="game-card"
        style={{
          background: 'var(--bg-card)',
          borderRadius: '14px',
          overflow: 'hidden',
          border: '1px solid var(--card-border)',
          cursor: 'pointer',
          transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
          position: 'relative',
        }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.transform = 'translateY(-7px) scale(1.025)';
          el.style.boxShadow = '0 20px 48px rgba(0,0,0,0.35), 0 0 28px color-mix(in srgb, var(--neon-blue) 25%, transparent)';
          el.style.borderColor = 'var(--card-border-hover)';
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.transform = '';
          el.style.boxShadow = '';
          el.style.borderColor = 'var(--card-border)';
        }}
      >
        {/* Thumbnail */}
        <div style={{
          position: 'relative',
          height: isLarge ? '200px' : '140px',
          background: `linear-gradient(135deg, hsl(${colorBase}), hsl(${colorBase.split(',')[0]}, 65%, 10%))`,
          overflow: 'hidden',
        }}>
          {/* Animated grid bg */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 24px, rgba(255,255,255,0.03) 24px, rgba(255,255,255,0.03) 25px), repeating-linear-gradient(90deg, transparent, transparent 24px, rgba(255,255,255,0.03) 24px, rgba(255,255,255,0.03) 25px)',
          }} />
          {/* Glow orb */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80px', height: '80px',
            background: 'radial-gradient(circle, rgba(0,212,255,0.2) 0%, transparent 70%)',
            borderRadius: '50%',
          }} />

          {/* Icon */}
          <div style={{
            width: '100%', height: '100%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'rgba(255,255,255,0.75)',
            filter: 'drop-shadow(0 0 12px rgba(0,212,255,0.4))',
            fontSize: isLarge ? '64px' : '48px',
          }}>
            {Icon}
          </div>

          {/* Play overlay */}
          <div
            style={{
              position: 'absolute', inset: 0,
              background: 'rgba(0,0,0,0.65)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              opacity: 0,
              transition: 'opacity 0.22s',
            }}
            className="play-overlay"
          >
            <div style={{
              width: '56px', height: '56px',
              background: 'linear-gradient(135deg, var(--neon-blue), var(--neon-purple))',
              borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white',
              fontSize: '22px',
              boxShadow: '0 0 24px color-mix(in srgb, var(--neon-blue) 70%, transparent)',
            }}>▶</div>
          </div>

          {/* Badges */}
          <div style={{ position: 'absolute', top: '8px', left: '8px', display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
            {game.isHot && (
              <span style={{
                background: 'linear-gradient(135deg, #ff6b00, #ff2d78)',
                color: 'white', fontSize: '10px', fontWeight: 700,
                padding: '3px 8px', borderRadius: '20px',
                fontFamily: "'Orbitron', monospace", letterSpacing: '0.5px',
                display: 'flex', alignItems: 'center', gap: '3px',
              }}>
                <FaFire size={9} /> HOT
              </span>
            )}
            {game.isNew && (
              <span style={{
                background: 'linear-gradient(135deg, #00ff88, #00d4ff)',
                color: '#06080f', fontSize: '10px', fontWeight: 700,
                padding: '3px 8px', borderRadius: '20px',
                fontFamily: "'Orbitron', monospace", letterSpacing: '0.5px',
                display: 'flex', alignItems: 'center', gap: '3px',
              }}>
                <MdNewReleases size={10} /> NEW
              </span>
            )}
          </div>

          {/* Favorite button */}
          <FavoriteButton gameId={game.id} />

          {/* Category tag */}
          <div style={{ position: 'absolute', bottom: '8px', right: '8px' }}>
            <span style={{
              background: 'var(--badge-bg)',
              backdropFilter: 'blur(8px)',
              color: 'var(--neon-blue)', fontSize: '10px', fontWeight: 600,
              padding: '3px 8px', borderRadius: '4px',
              fontFamily: "'Rajdhani', sans-serif", letterSpacing: '0.5px',
              border: '1px solid var(--card-border)',
            }}>{game.category}</span>
          </div>
        </div>

        {/* Info */}
        <div style={{ padding: isLarge ? '14px 16px' : '11px 12px' }}>
          <h3 style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: isLarge ? '14px' : '12px',
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: '6px',
            letterSpacing: '0.3px',
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          }}>{game.title}</h3>

          {isLarge && (
            <p style={{
              color: 'var(--text-secondary)',
              fontSize: '11px',
              marginBottom: '10px',
              fontFamily: "'Inter', sans-serif",
              lineHeight: 1.45,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}>{game.description}</p>
          )}

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <MdStar size={13} color="#ffd700" />
              <span style={{ color: 'var(--text-primary)', fontSize: '12px', fontWeight: 700 }}>{game.rating}</span>
            </div>
            <span style={{ color: 'var(--text-secondary)', fontSize: '10px', fontFamily: "'Inter', sans-serif" }}>
              {game.plays} plays
            </span>
          </div>
        </div>
      </div>

      <style>{`
        a:hover .play-overlay { opacity: 1 !important; }
        .game-card { will-change: transform; }
      `}</style>
    </Link>
  );
}
