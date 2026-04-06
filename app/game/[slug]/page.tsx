'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { games } from '@/lib/games';
import Navbar from '@/components/Navbar';
import AdBanner from '@/components/AdBanner';
import GameCard from '@/components/GameCard';
import Footer from '@/components/Footer';
import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import {
  GiRunningNinja, GiPuzzle, GiSteeringWheel, GiSoccerBall,
  GiTreasureMap, GiBarricade, GiPistolGun, GiChessKnight,
  GiCardboardBox, GiGamepad,
} from "react-icons/gi";
import { IoClose, IoExpand } from 'react-icons/io5';
import { IconType } from "react-icons";
import { FaFire } from 'react-icons/fa';

const categoryIconMap: Record<string, IconType> = {
  Action: GiRunningNinja, Puzzle: GiPuzzle, Racing: GiSteeringWheel,
  Sports: GiSoccerBall, Adventure: GiTreasureMap, Arcade: GiBarricade,
  Shooting: GiPistolGun, Strategy: GiChessKnight, Casual: GiCardboardBox,
};

export function getCategoryIcon(category: string) {
  const Icon = categoryIconMap[category] ?? GiGamepad;
  return <Icon size={24} />;
}

/* ── Fullscreen Modal Portal ─────────────────────────────────────── */
function FullscreenModal({ iframeUrl, title, onClose }: {
  iframeUrl: string;
  title: string;
  onClose: () => void;
}) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = 'hidden';

    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  const goNativeFullscreen = () => {
    const el = iframeRef.current as any;
    if (!el) return;
    (el.requestFullscreen?.() ?? el.webkitRequestFullscreen?.() ?? el.mozRequestFullScreen?.());
  };

  if (!mounted) return null;

  return createPortal(
    <div
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: 'fixed', inset: 0, zIndex: 99999,
        background: 'rgba(0,0,0,0.95)',
        display: 'flex', flexDirection: 'column',
        backdropFilter: 'blur(6px)',
        animation: 'fsIn 0.2s ease',
      }}
    >
      {/* Top bar */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '10px 18px', flexShrink: 0,
        background: '#0d1117',
        borderBottom: '1px solid rgba(0,212,255,0.15)',
      }}>
        <span style={{
          fontFamily: "'Orbitron', monospace",
          fontSize: '14px', fontWeight: 700, color: '#f0f4ff', letterSpacing: '0.5px',
        }}>{title}</span>

        <div style={{ display: 'flex', gap: '8px' }}>
          {/* Native OS fullscreen */}
          <button
            onClick={goNativeFullscreen}
            style={{
              background: 'rgba(0,212,255,0.08)',
              border: '1px solid rgba(0,212,255,0.25)',
              color: '#00d4ff', padding: '7px 14px',
              borderRadius: '8px', cursor: 'pointer',
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: '12px', fontWeight: 600,
              display: 'flex', alignItems: 'center', gap: '5px',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,212,255,0.18)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(0,212,255,0.08)')}
          >
            <IoExpand size={13} /> Native Fullscreen
          </button>

          {/* Close */}
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255,60,60,0.08)',
              border: '1px solid rgba(255,60,60,0.25)',
              color: '#ff6b6b', padding: '7px 14px',
              borderRadius: '8px', cursor: 'pointer',
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: '12px', fontWeight: 600,
              display: 'flex', alignItems: 'center', gap: '5px',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,60,60,0.18)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,60,60,0.08)')}
          >
            <IoClose size={14} /> Close  <span style={{ color: '#ff6b6b66', fontSize: '10px' }}>ESC</span>
          </button>
        </div>
      </div>

      {/* Iframe fills rest of screen */}
      <div style={{ flex: 1, background: '#000', position: 'relative' }}>
        <iframe
          ref={iframeRef}
          src={iframeUrl}
          title={title}
          style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
          allowFullScreen
          allow="autoplay; fullscreen; gamepad"
        />
      </div>

      <style>{`
        @keyframes fsIn {
          from { opacity: 0; transform: scale(0.98); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>,
    document.body
  );
}

/* ── Game Page ───────────────────────────────────────────────────── */
export default function GamePage() {
  const params = useParams();
  const slug = params?.slug as string;
  const game = games.find(g => g.url === `/game/${slug}`);
  const related = games.filter(g => g.id !== game?.id).slice(0, 6);
  const [showModal, setShowModal] = useState(false);   // ← replaces isFullscreen

  if (!game) {
    return (
      <main>
        <Navbar />
        <div style={{ textAlign: 'center', padding: '80px 24px' }}>
          <h2 style={{ fontFamily: "'Orbitron', monospace", color: '#00d4ff', fontSize: '24px' }}>
            Game Not Found
          </h2>
          <Link href="/" style={{ color: '#b347ff', marginTop: '16px', display: 'inline-block' }}>
            ← Back to Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main style={{ minHeight: '100vh' }}>
      <Navbar />

      {/* Fullscreen modal portal */}
      {showModal && (
        <FullscreenModal
          iframeUrl={game.iframeUrl}
          title={game.title}
          onClose={() => setShowModal(false)}
        />
      )}

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '16px 24px' }}>
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <Link href="/" style={{ color: '#8899aa', textDecoration: 'none', fontSize: '13px', fontFamily: "'Rajdhani', sans-serif" }}>
            Home
          </Link>
          <span style={{ color: '#4a5568' }}>›</span>
          <span style={{ color: '#8899aa', fontSize: '13px', fontFamily: "'Rajdhani', sans-serif" }}>{game.category}</span>
          <span style={{ color: '#4a5568' }}>›</span>
          <span style={{ color: '#00d4ff', fontSize: '13px', fontFamily: "'Rajdhani', sans-serif", fontWeight: 600 }}>{game.title}</span>
        </div>

        <AdBanner type="leaderboard" />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 160px', gap: '24px', marginTop: '20px' }}>
          <div>
            {/* Title Bar */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              background: '#111827',
              border: '1px solid rgba(0,212,255,0.15)',
              borderRadius: '12px 12px 0 0',
              padding: '14px 20px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {getCategoryIcon(game.category)}
                <div>
                  <h1 style={{
                    fontFamily: "'Orbitron', monospace",
                    fontSize: '18px', fontWeight: 700, color: '#f0f4ff', letterSpacing: '0.5px',
                  }}>{game.title}</h1>
                  <div style={{ display: 'flex', gap: '12px', marginTop: '4px' }}>
                    <span style={{ color: '#ffd700', fontSize: '12px' }}>★ {game.rating}</span>
                    <span style={{ color: '#8899aa', fontSize: '12px', fontFamily: "'Inter', sans-serif" }}>{game.plays} plays</span>
                    {game.isHot && <span style={{ color: '#ff6b00', fontSize: '12px' }}><FaFire /> Hot</span>}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowModal(true)}      // ← opens modal
                style={{
                  background: 'rgba(0,212,255,0.1)',
                  border: '1px solid rgba(0,212,255,0.3)',
                  color: '#00d4ff', padding: '8px 16px',
                  borderRadius: '6px', cursor: 'pointer',
                  fontFamily: "'Rajdhani', sans-serif",
                  fontSize: '13px', fontWeight: 600,
                  display: 'flex', alignItems: 'center', gap: '6px',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,212,255,0.2)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'rgba(0,212,255,0.1)')}
              >
                <IoExpand size={14} /> Fullscreen
              </button>
            </div>

            {/* Inline iframe — fixed height, no toggle */}
            <div style={{
              background: '#000',
              borderRadius: '0 0 12px 12px',
              overflow: 'hidden',
              border: '1px solid rgba(0,212,255,0.15)',
              borderTop: 'none',
              height: '520px',
            }}>
              <iframe
                src={game.iframeUrl}
                title={game.title}
                style={{ width: '100%', height: '100%', border: 'none' }}
                allowFullScreen
                allow="autoplay; fullscreen; gamepad"
              />
            </div>

            <div style={{ marginTop: '16px' }}>
              <AdBanner type="leaderboard" />
            </div>

            {/* About */}
            <div style={{
              background: '#111827', border: '1px solid rgba(0,212,255,0.1)',
              borderRadius: '12px', padding: '20px', marginTop: '16px',
            }}>
              <h2 style={{
                fontFamily: "'Orbitron', monospace", fontSize: '14px', fontWeight: 700,
                color: '#00d4ff', letterSpacing: '1px', marginBottom: '12px',
              }}>ABOUT THIS GAME</h2>
              <p style={{ color: '#8899aa', fontSize: '15px', fontFamily: "'Inter', sans-serif", lineHeight: 1.7 }}>
                {game.description}
              </p>
              <div style={{ display: 'flex', gap: '16px', marginTop: '16px', flexWrap: 'wrap' }}>
                {[
                  { label: 'Category', value: game.category },
                  { label: 'Rating', value: `⭐ ${game.rating}/5` },
                  { label: 'Total Plays', value: game.plays },
                ].map(info => (
                  <div key={info.label} style={{
                    background: 'rgba(0,212,255,0.05)',
                    border: '1px solid rgba(0,212,255,0.1)',
                    borderRadius: '8px', padding: '8px 16px',
                  }}>
                    <div style={{ color: '#8899aa', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                      {info.label}
                    </div>
                    <div style={{ color: '#f0f4ff', fontSize: '14px', fontWeight: 600, marginTop: '2px', fontFamily: "'Rajdhani', sans-serif" }}>
                      {info.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Related Games */}
            <div style={{ marginTop: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '4px', height: '20px', background: 'linear-gradient(to bottom, #00d4ff, #b347ff)', borderRadius: '2px' }} />
                <h2 style={{ fontFamily: "'Orbitron', monospace", fontSize: '16px', fontWeight: 700, color: '#f0f4ff', letterSpacing: '1px' }}>
                  MORE GAMES
                </h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '14px' }}>
                {related.map(g => <GameCard key={g.id} game={g} />)}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <AdBanner type="sidebar" />
          </div>
        </div>
      </div>

      <div style={{ marginTop: '40px' }}>
        <Footer />
      </div>
    </main>
  );
}