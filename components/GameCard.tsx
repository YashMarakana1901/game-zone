'use client';

import Link from 'next/link';
import { Game } from '@/lib/games';
import { FavoriteButton } from '@/components/Favorites';
import { useTheme } from '@/components/ThemeContext';
import { FaFire, FaStar } from 'react-icons/fa';
import { MdNewReleases } from 'react-icons/md';
import { IoGameController, IoPlay } from 'react-icons/io5';
import {
  GiPistolGun, GiPuzzle, GiRaceCar, GiSoccerBall,
  GiTreasureMap, GiCardAceDiamonds, GiBulletBill,
  GiChessKnight, GiDiamondHard,
} from 'react-icons/gi';
import { useState } from 'react';
import FullscreenGameModal from './FullscreenGameModal';

const categoryConfig: Record<string, { icon: React.ReactNode; hue: string; accent: string; glow: string }> = {
  Action: { icon: <GiPistolGun size={38} />, hue: '220', accent: '#4d8eff', glow: 'rgba(77,142,255,0.35)' },
  Puzzle: { icon: <GiPuzzle size={38} />, hue: '278', accent: '#c084fc', glow: 'rgba(192,132,252,0.35)' },
  Racing: { icon: <GiRaceCar size={38} />, hue: '25', accent: '#fb923c', glow: 'rgba(251,146,60,0.35)' },
  Sports: { icon: <GiSoccerBall size={38} />, hue: '145', accent: '#4ade80', glow: 'rgba(74,222,128,0.35)' },
  Adventure: { icon: <GiTreasureMap size={38} />, hue: '42', accent: '#fbbf24', glow: 'rgba(251,191,36,0.35)' },
  Arcade: { icon: <GiCardAceDiamonds size={38} />, hue: '185', accent: '#22d3ee', glow: 'rgba(34,211,238,0.35)' },
  Shooting: { icon: <GiBulletBill size={38} />, hue: '354', accent: '#f87171', glow: 'rgba(248,113,113,0.35)' },
  Strategy: { icon: <GiChessKnight size={38} />, hue: '252', accent: '#818cf8', glow: 'rgba(129,140,248,0.35)' },
  Casual: { icon: <GiDiamondHard size={38} />, hue: '320', accent: '#f472b6', glow: 'rgba(244,114,182,0.35)' },
};

interface GameCardProps { game: Game; size?: 'normal' | 'large'; }

export default function GameCard({ game, size = 'normal' }: GameCardProps) {
  const isLarge = size === 'large';
  const { isDark } = useTheme();
  const cfg = categoryConfig[game.category] ?? { icon: <IoGameController size={38} />, hue: '200', accent: '#00d4ff', glow: 'rgba(0,212,255,0.35)' };
  const { icon, hue, accent, glow } = cfg;

  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div
        onClick={() => setShowModal(true)}
        style={{ textDecoration: 'none', display: 'block', height: '100%', cursor: 'pointer' }}
      >
        <Link href={game.url} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
          <div
            className="game-card"
            style={{
              borderRadius: '16px',
              overflow: 'hidden',
              border: '1px solid var(--card-border)',
              cursor: 'pointer',
              transition: 'transform 0.28s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.28s ease, border-color 0.28s ease',
              position: 'relative',
              height: '100%',
              background: isDark
                ? `linear-gradient(160deg, hsl(${hue},55%,9%) 0%, hsl(${hue},60%,5%) 100%)`
                : `linear-gradient(160deg, hsl(${hue},45%,96%) 0%, hsl(${hue},50%,92%) 100%)`,
            }}
            onMouseEnter={e => {
              const el = e.currentTarget;
              el.style.transform = 'translateY(-8px) scale(1.022)';
              el.style.boxShadow = `0 24px 50px rgba(0,0,0,0.35), 0 0 0 1px ${accent}55`;
              el.style.borderColor = `${accent}50`;
            }}
            onMouseLeave={e => {
              const el = e.currentTarget;
              el.style.transform = '';
              el.style.boxShadow = '';
              el.style.borderColor = 'var(--card-border)';
            }}
          >
            {/* Thumbnail */}
            <div style={{
              position: 'relative',
              height: isLarge ? '210px' : '148px',
              background: isDark
                ? `linear-gradient(145deg, hsl(${hue},62%,12%) 0%, hsl(${hue},70%,7%) 100%)`
                : `linear-gradient(145deg, hsl(${hue},50%,88%) 0%, hsl(${hue},55%,82%) 100%)`,
              overflow: 'hidden',
            }}>
              {/* Grid lines */}
              <div style={{
                position: 'absolute', inset: 0, opacity: isDark ? 0.4 : 0.25,
                backgroundImage: `linear-gradient(${accent}22 1px, transparent 1px), linear-gradient(90deg, ${accent}22 1px, transparent 1px)`,
                backgroundSize: '28px 28px',
              }} />

              {/* Glow orb */}
              <div className="card-glow" style={{
                position: 'absolute', top: '50%', left: '50%',
                transform: 'translate(-50%,-50%)',
                width: '100px', height: '100px',
                background: `radial-gradient(circle, ${glow} 0%, transparent 68%)`,
                borderRadius: '50%', transition: 'transform 0.3s ease, opacity 0.3s ease',
              }} />

              {/* Corner accent */}
              <div style={{
                position: 'absolute', top: 0, right: 0, width: '70px', height: '70px',
                background: isDark
                  ? `conic-gradient(from 225deg at 100% 0%, ${accent}28, transparent 55%)`
                  : `conic-gradient(from 225deg at 100% 0%, ${accent}20, transparent 55%)`,
              }} />

              {/* Icon */}
              <div className="card-icon" style={{
                width: '100%', height: '100%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: isDark ? accent : `hsl(${hue},55%,35%)`,
                filter: `drop-shadow(0 0 14px ${glow})`,
                fontSize: isLarge ? '56px' : '42px',
                transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1), filter 0.3s ease',
              }}>{icon}</div>

              {/* Play overlay */}
              <div className="play-overlay" style={{
                position: 'absolute', inset: 0,
                background: 'rgba(0,0,0,0.56)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                opacity: 0, transition: 'opacity 0.22s ease',
              }}>
                <div className="play-btn" style={{
                  width: '52px', height: '52px',
                  background: `linear-gradient(135deg, ${accent}, ${accent}99)`,
                  borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: `0 0 28px ${glow}`,
                  transform: 'scale(0.8)',
                  transition: 'transform 0.22s cubic-bezier(0.34,1.56,0.64,1)',
                }}>
                  <IoPlay size={20} color="white" style={{ marginLeft: '3px' }} />
                </div>
              </div>

              {/* Badges */}
              <div style={{ position: 'absolute', top: '10px', left: '10px', display: 'flex', gap: '5px' }}>
                {game.isHot && (
                  <span style={{
                    background: 'linear-gradient(135deg, #ff6b00, #ff2d78)',
                    color: 'white', fontSize: '9px', fontWeight: 800,
                    padding: '3px 8px', borderRadius: '20px',
                    fontFamily: "'Orbitron', monospace", letterSpacing: '0.8px',
                    display: 'flex', alignItems: 'center', gap: '3px',
                    boxShadow: '0 2px 10px rgba(255,45,120,0.45)',
                  }}><FaFire size={8} /> HOT</span>
                )}
                {game.isNew && (
                  <span style={{
                    background: 'linear-gradient(135deg, #00ff88, #00d4ff)',
                    color: '#060a1a', fontSize: '9px', fontWeight: 800,
                    padding: '3px 8px', borderRadius: '20px',
                    fontFamily: "'Orbitron', monospace", letterSpacing: '0.8px',
                    display: 'flex', alignItems: 'center', gap: '3px',
                    boxShadow: '0 2px 10px rgba(0,212,255,0.4)',
                  }}><MdNewReleases size={9} /> NEW</span>
                )}
              </div>

              <FavoriteButton gameId={game.id} />

              {/* Category tag */}
              <div style={{ position: 'absolute', bottom: '10px', right: '10px' }}>
                <span style={{
                  background: isDark ? 'rgba(0,0,0,0.55)' : 'rgba(255,255,255,0.75)',
                  backdropFilter: 'blur(8px)',
                  color: isDark ? accent : `hsl(${hue},55%,32%)`,
                  fontSize: '10px', fontWeight: 700,
                  padding: '3px 9px', borderRadius: '6px',
                  fontFamily: "'Rajdhani', sans-serif",
                  border: `1px solid ${accent}30`, letterSpacing: '0.5px',
                }}>{game.category}</span>
              </div>
            </div>

            {/* Info */}
            <div style={{ padding: isLarge ? '14px 16px' : '11px 13px' }}>
              <h3 style={{
                fontFamily: "'Orbitron', monospace",
                fontSize: isLarge ? '13px' : '11px', fontWeight: 700,
                color: 'var(--text-primary)',
                marginBottom: '7px', letterSpacing: '0.3px',
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
              }}>{game.title}</h3>

              {isLarge && (
                <p style={{
                  color: 'var(--text-secondary)', fontSize: '11px', marginBottom: '10px',
                  fontFamily: "'Inter', sans-serif", lineHeight: 1.5,
                  display: '-webkit-box', WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical', overflow: 'hidden',
                }}>{game.description}</p>
              )}

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <FaStar size={11} color="#fbbf24" />
                  <span style={{ color: 'var(--text-primary)', fontSize: '12px', fontWeight: 700 }}>{game.rating}</span>
                </div>
                <span style={{ color: 'var(--text-secondary)', fontSize: '10px', fontFamily: "'Inter', sans-serif" }}>
                  {game.plays}
                </span>
              </div>
            </div>
          </div>

          <style>{`
        .game-card:hover .play-overlay { opacity: 1 !important; }
        .game-card:hover .play-btn     { transform: scale(1) !important; }
        .game-card:hover .card-icon    { transform: scale(1.1); filter: drop-shadow(0 0 20px currentColor); }
        .game-card:hover .card-glow    { transform: translate(-50%,-50%) scale(1.5); opacity: 1.4; }
        .game-card { will-change: transform; }
      `}</style>
        </Link>
        {/* Fullscreen modal — renders into document.body via portal */}
        {showModal && (
          <FullscreenGameModal
            game={game}
            onClose={() => setShowModal(false)}
          />
        )}
      </div>
    </>
  );
}