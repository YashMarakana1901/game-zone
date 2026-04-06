'use client';

import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { IoClose, IoExpand } from 'react-icons/io5';
import { FaStar } from 'react-icons/fa';
import { FaFire } from 'react-icons/fa';
import { Game } from '@/lib/games';

interface Props {
  game: Game;
  onClose: () => void;
}

export default function FullscreenGameModal({ game, onClose }: Props) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Lock body scroll & handle Escape key
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  const goNativeFullscreen = () => {
    iframeRef.current?.requestFullscreen?.();
  };

  return createPortal(
    <div
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: 'rgba(0, 0, 0, 0.92)',
        display: 'flex',
        flexDirection: 'column',
        backdropFilter: 'blur(8px)',
        animation: 'fsIn 0.22s ease',
      }}
    >
      {/* Top bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 20px',
        background: '#0d1117',
        borderBottom: '1px solid rgba(0,212,255,0.15)',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: '15px', fontWeight: 700,
            color: '#f0f4ff', letterSpacing: '0.5px',
          }}>{game.title}</span>

          <span style={{ color: '#ffd700', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '3px' }}>
            <FaStar size={11} /> {game.rating}
          </span>

          {game.isHot && (
            <span style={{
              background: 'linear-gradient(135deg, #ff6b00, #ff2d78)',
              color: 'white', fontSize: '9px', fontWeight: 800,
              padding: '3px 8px', borderRadius: '20px',
              fontFamily: "'Orbitron', monospace",
              display: 'flex', alignItems: 'center', gap: '3px',
            }}>
              <FaFire size={8} /> HOT
            </span>
          )}

          <span style={{
            background: 'rgba(0,212,255,0.1)',
            border: '1px solid rgba(0,212,255,0.2)',
            color: '#00d4ff', fontSize: '10px', fontWeight: 600,
            padding: '2px 10px', borderRadius: '20px',
            fontFamily: "'Rajdhani', sans-serif",
          }}>{game.category}</span>
        </div>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {/* Native fullscreen button */}
          <button
            onClick={goNativeFullscreen}
            title="Native fullscreen (F11 alternative)"
            style={{
              background: 'rgba(0,212,255,0.08)',
              border: '1px solid rgba(0,212,255,0.25)',
              color: '#00d4ff', padding: '7px 14px',
              borderRadius: '8px', cursor: 'pointer',
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: '12px', fontWeight: 600,
              display: 'flex', alignItems: 'center', gap: '6px',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,212,255,0.18)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(0,212,255,0.08)')}
          >
            <IoExpand size={14} /> Fullscreen
          </button>

          {/* Close */}
          <button
            onClick={onClose}
            title="Close (Esc)"
            style={{
              background: 'rgba(255,60,60,0.08)',
              border: '1px solid rgba(255,60,60,0.25)',
              color: '#ff6b6b', padding: '7px 14px',
              borderRadius: '8px', cursor: 'pointer',
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: '12px', fontWeight: 600,
              display: 'flex', alignItems: 'center', gap: '6px',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,60,60,0.18)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,60,60,0.08)')}
          >
            <IoClose size={15} /> Close
          </button>
        </div>
      </div>

      {/* Game iframe — fills all remaining space */}
      <div style={{ flex: 1, position: 'relative', background: '#000' }}>
        <iframe
          ref={iframeRef}
          src={game.iframeUrl}
          title={game.title}
          style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
          allowFullScreen
          allow="autoplay; fullscreen; gamepad"
        />
      </div>

      <style>{`
        @keyframes fsIn {
          from { opacity: 0; transform: scale(0.97); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>,
    document.body
  );
}