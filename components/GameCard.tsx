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
            className="premium-card"
            style={{
              position: 'relative',
              height: '100%',
              background: isDark
                ? `linear-gradient(160deg, hsl(${hue},45%,8%) 0%, hsl(${hue},50%,4%) 100%)`
                : `linear-gradient(160deg, hsl(${hue},40%,98%) 0%, hsl(${hue},45%,94%) 100%)`,
            }}
          >
            {/* Thumbnail */}
            <div style={{
              position: 'relative',
              height: isLarge ? '210px' : '150px',
              background: isDark
                ? `linear-gradient(145deg, hsl(${hue},55%,12%) 0%, hsl(${hue},65%,7%) 100%)`
                : `linear-gradient(145deg, hsl(${hue},45%,90%) 0%, hsl(${hue},50%,85%) 100%)`,
              overflow: 'hidden',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {/* Bg patterns */}
              <div style={{
                position: 'absolute', inset: 0, opacity: isDark ? 0.35 : 0.15,
                backgroundImage: `radial-gradient(${accent}1a 1px, transparent 1px)`,
                backgroundSize: '16px 16px',
              }} />

              {/* Glow orb */}
              <div className="card-glow" style={{
                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
                width: '120px', height: '120px',
                background: `radial-gradient(circle, ${accent}33 0%, transparent 70%)`,
                borderRadius: '50%', opacity: 0, transition: 'all 0.4s ease',
              }} />

              {/* Icon */}
              <div className="card-icon" style={{
                color: isDark ? accent : `hsl(${hue},60%,40%)`,
                filter: `drop-shadow(0 0 20px ${accent}40)`,
                fontSize: isLarge ? '64px' : '48px',
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              }}>{icon}</div>

              {/* Play overlay */}
              <div className="play-overlay" style={{
                position: 'absolute', inset: 0,
                background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(3px)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                opacity: 0, transition: 'all 0.3s ease',
              }}>
                <div className="play-btn" style={{
                  width: '54px', height: '54px',
                  background: 'white', borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: `0 10px 30px rgba(0,0,0,0.3), 0 0 20px ${accent}`,
                  transform: 'scale(0.8)', transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  color: '#000',
                }}>
                  <IoPlay size={24} style={{ marginLeft: '3px' }} />
                </div>
              </div>

              {/* Badges */}
              <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '6px' }}>
                {game.isHot && (
                  <span style={{
                    background: 'linear-gradient(135deg, #ff6b00, #ff2d78)',
                    color: 'white', fontSize: '9px', fontWeight: 900,
                    padding: '4px 10px', borderRadius: '30px',
                    fontFamily: "'Orbitron', monospace", letterSpacing: '1px',
                    display: 'flex', alignItems: 'center', gap: '4px',
                    boxShadow: '0 4px 12px rgba(255,45,120,0.4)',
                  }}><FaFire size={8} /> HOT</span>
                )}
                {game.isNew && (
                  <span style={{
                    background: 'linear-gradient(135deg, #00ff88, #00d4ff)',
                    color: '#060a1a', fontSize: '9px', fontWeight: 900,
                    padding: '4px 10px', borderRadius: '30px',
                    fontFamily: "'Orbitron', monospace", letterSpacing: '1px',
                    display: 'flex', alignItems: 'center', gap: '4px',
                    boxShadow: '0 4px 12px rgba(0,212,255,0.4)',
                  }}><MdNewReleases size={10} /> NEW</span>
                )}
              </div>

              <FavoriteButton gameId={game.id} />
            </div>

            {/* Info */}
            <div style={{ padding: '14px 16px' }}>
              <div style={{
                fontFamily: "'Rajdhani', sans-serif", fontSize: '10px', fontWeight: 700,
                color: accent, textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '4px',
              }}>{game.category}</div>
              <h3 style={{
                fontFamily: "'Orbitron', monospace",
                fontSize: isLarge ? '14px' : '12px', fontWeight: 800,
                color: 'var(--text-primary)',
                marginBottom: '8px', letterSpacing: '0.5px',
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
              }}>{game.title}</h3>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <FaStar size={12} color="#fbbf24" strokeWidth={2} />
                  <span style={{ color: 'var(--text-primary)', fontSize: '13px', fontWeight: 700 }}>{game.rating}</span>
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '3px' }}>
                  <IoGameController size={12} /> {game.plays}
                </div>
              </div>
            </div>
          </div>

          <style jsx>{`
            .premium-card:hover .play-overlay { opacity: 1; }
            .premium-card:hover .play-btn { transform: scale(1); }
            .premium-card:hover .card-icon { transform: scale(1.15) rotate(5deg); filter: drop-shadow(0 0 30px ${accent}); }
            .premium-card:hover .card-glow { opacity: 1; transform: translate(-50%,-50%) scale(1.4); }
          `}</style>
        </Link>
        {showModal && <FullscreenGameModal game={game} onClose={() => setShowModal(false)} />}
      </div>
    </>
  );
}