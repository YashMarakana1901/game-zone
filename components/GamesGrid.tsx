'use client';

import { useState, useEffect, useRef } from 'react';
import { games, categories } from '@/lib/games';
import GameCard from './GameCard';
import { useTheme } from '@/components/ThemeContext';
import { FaFire, FaStar, FaTrophy } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi2';
import { IoGameController, IoGridSharp } from 'react-icons/io5';
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md';
import { RiSwordFill, RiPuzzleFill, RiSpeedUpFill, RiFootballFill } from 'react-icons/ri';
import AdBanner from './AdBanner';

/* ── Animated counter ────────────────────────────────────────────── */
function AnimatedCount({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      let v = 0;
      const step = target / 45;
      const t = setInterval(() => {
        v = Math.min(v + step, target);
        setCount(Math.floor(v));
        if (v >= target) clearInterval(t);
      }, 28);
    });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

/* ── Section header ──────────────────────────────────────────────── */
function SectionHeader({ icon, title, accent = '#00d4ff', sub }: {
  icon: React.ReactNode; title: string; accent?: string; sub?: string;
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '22px' }}>
      <div style={{
        width: '36px', height: '36px', borderRadius: '10px', flexShrink: 0,
        background: `linear-gradient(135deg, ${accent}28, ${accent}10)`,
        border: `1px solid ${accent}35`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: accent, boxShadow: `0 0 14px ${accent}22`,
      }}>{icon}</div>
      <div>
        <h2 style={{
          fontFamily: "'Orbitron', monospace", fontSize: '17px', fontWeight: 800,
          color: 'var(--text-primary)', letterSpacing: '1.5px', margin: 0,
        }}>{title}</h2>
        {sub && (
          <p style={{ fontSize: '11px', color: 'var(--text-secondary)', margin: '2px 0 0', fontFamily: "'Rajdhani', sans-serif", letterSpacing: '0.5px' }}>{sub}</p>
        )}
      </div>
      <div style={{ flex: 1, height: '1px', marginLeft: '8px', background: `linear-gradient(90deg, ${accent}40, transparent)` }} />
    </div>
  );
}

/* ── Horizontal scroll row ───────────────────────────────────────── */
function HScrollRow({ items, accent }: { items: typeof games; accent: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: 1 | -1) => ref.current?.scrollBy({ left: dir * 320, behavior: 'smooth' });

  return (
    <div style={{ position: 'relative' }}>
      <button onClick={() => scroll(-1)} className="scroll-arrow" style={{
        position: 'absolute', left: '-18px', top: '45%', transform: 'translateY(-50%)',
        zIndex: 10, background: `${accent}18`, border: `1px solid ${accent}35`,
        borderRadius: '50%', width: '34px', height: '34px', cursor: 'pointer', color: accent,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        backdropFilter: 'blur(12px)', transition: 'all 0.2s',
        boxShadow: `0 4px 16px ${accent}20`,
      }}
        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = `${accent}30`; }}
        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = `${accent}18`; }}
      ><MdKeyboardArrowLeft size={18} /></button>

      <div ref={ref} className="hide-scrollbar" style={{ display: 'flex', gap: '14px', overflowX: 'auto', paddingBottom: '8px' }}>
        {items.map((game, i) => (
          <div key={game.id} style={{ minWidth: '185px', maxWidth: '185px', animation: `fadeUp 0.4s ease ${i * 0.035}s both` }}>
            <GameCard game={game} />
          </div>
        ))}
      </div>

      <button onClick={() => scroll(1)} className="scroll-arrow" style={{
        position: 'absolute', right: '-18px', top: '45%', transform: 'translateY(-50%)',
        zIndex: 10, background: `${accent}18`, border: `1px solid ${accent}35`,
        borderRadius: '50%', width: '34px', height: '34px', cursor: 'pointer', color: accent,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        backdropFilter: 'blur(12px)', transition: 'all 0.2s',
        boxShadow: `0 4px 16px ${accent}20`,
      }}
        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = `${accent}30`; }}
        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = `${accent}18`; }}
      ><MdKeyboardArrowRight size={18} /></button>
    </div>
  );
}

/* ── Featured hero ───────────────────────────────────────────────── */
function FeaturedCard({ game }: { game: (typeof games)[0] }) {
  const { isDark } = useTheme();
  return (
    <div style={{
      position: 'relative', borderRadius: '22px', overflow: 'hidden',
      background: isDark
        ? 'linear-gradient(145deg, rgba(0,12,44,0.96) 0%, rgba(28,4,56,0.96) 60%, rgba(8,2,28,0.96) 100%)'
        : 'linear-gradient(145deg, rgba(215,225,255,0.95) 0%, rgba(235,215,255,0.95) 100%)',
      border: isDark ? '1px solid rgba(0,212,255,0.16)' : '1px solid rgba(100,80,220,0.16)',
      padding: '36px 36px 32px',
      minHeight: '290px',
      cursor: 'pointer',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      boxShadow: isDark ? '0 4px 60px rgba(0,0,0,0.5)' : '0 4px 40px rgba(80,50,200,0.1)',
    }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.transform = 'scale(1.01)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = isDark
          ? '0 28px 80px rgba(0,60,180,0.35), 0 0 0 1px rgba(0,212,255,0.2)'
          : '0 20px 60px rgba(80,50,200,0.18)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.transform = '';
        (e.currentTarget as HTMLDivElement).style.boxShadow = isDark ? '0 4px 60px rgba(0,0,0,0.5)' : '0 4px 40px rgba(80,50,200,0.1)';
      }}
    >
      {/* Bg orbs */}
      {[
        { top: '-70px', right: '-70px', size: '300px', color: 'rgba(140,60,240,0.28)' },
        { bottom: '-50px', left: '10px', size: '220px', color: 'rgba(0,200,255,0.18)' },
        { top: '40%', left: '42%', size: '150px', color: 'rgba(255,30,100,0.1)' },
      ].map((orb, i) => (
        <div key={i} style={{
          position: 'absolute', borderRadius: '50%', pointerEvents: 'none',
          width: orb.size, height: orb.size,
          background: `radial-gradient(circle, ${orb.color} 0%, transparent 65%)`,
          ...(orb.top ? { top: orb.top } : {}),
          ...(orb.bottom ? { bottom: orb.bottom } : {}),
          ...(orb.left ? { left: orb.left } : {}),
          ...(orb.right ? { right: orb.right } : {}),
        }} />
      ))}

      {/* Grid lines */}
      <div style={{
        position: 'absolute', inset: 0, opacity: isDark ? 0.22 : 0.08, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(0,212,255,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.25) 1px, transparent 1px)',
        backgroundSize: '44px 44px',
      }} />

      {/* Badges */}
      <span style={{
        position: 'absolute', top: '20px', left: '20px', zIndex: 1,
        background: 'linear-gradient(135deg, #00d4ff, #a855f7)',
        color: 'white', fontSize: '10px', fontWeight: 800,
        padding: '4px 14px', borderRadius: '20px',
        fontFamily: "'Orbitron', monospace", letterSpacing: '1.2px',
        boxShadow: '0 4px 20px rgba(0,212,255,0.5)',
      }}>✦ FEATURED</span>
      {game.isHot && (
        <span style={{
          position: 'absolute', top: '20px', right: '20px', zIndex: 1,
          background: 'linear-gradient(135deg, #ff6b00, #ff2d78)',
          color: 'white', fontSize: '10px', fontWeight: 800,
          padding: '4px 12px', borderRadius: '20px',
          fontFamily: "'Orbitron', monospace",
          display: 'flex', alignItems: 'center', gap: '4px',
          boxShadow: '0 4px 16px rgba(255,45,120,0.5)',
        }}>
          <FaFire size={8} /> HOT
        </span>
      )}

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, marginTop: '36px' }}>
        <div style={{
          fontFamily: "'Rajdhani', sans-serif", fontSize: '11px', fontWeight: 700,
          letterSpacing: '2.5px', color: '#00d4ff', marginBottom: '10px', textTransform: 'uppercase',
        }}>{game.category}</div>
        <h3 style={{
          fontFamily: "'Orbitron', monospace", fontSize: '26px', fontWeight: 900,
          color: isDark ? '#fff' : '#17122e', margin: '0 0 10px', letterSpacing: '1px',
        }}>{game.title}</h3>
        <p style={{
          color: isDark ? 'rgba(200,210,255,0.5)' : 'rgba(23,18,46,0.55)',
          fontSize: '13px', margin: '0 0 22px',
          fontFamily: "'Inter', sans-serif", lineHeight: 1.65, maxWidth: '400px',
        }}>{game.description}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <div style={{
            padding: '11px 28px', borderRadius: '12px',
            background: 'linear-gradient(135deg, #00d4ff, #a855f7)',
            color: 'white', fontSize: '13px', fontWeight: 700,
            fontFamily: "'Rajdhani', sans-serif", letterSpacing: '1.5px',
            boxShadow: '0 6px 28px rgba(0,212,255,0.5)',
            cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s',
            display: 'flex', alignItems: 'center', gap: '7px',
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 10px 36px rgba(0,212,255,0.6)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = ''; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 6px 28px rgba(0,212,255,0.5)'; }}
          >
            <IoGameController size={15} /> PLAY NOW
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <FaStar size={14} color="#fbbf24" />
            <span style={{ color: isDark ? '#fff' : '#17122e', fontWeight: 800, fontFamily: "'Rajdhani', sans-serif", fontSize: '15px' }}>{game.rating}</span>
          </div>
          <span style={{ color: isDark ? 'rgba(200,210,255,0.35)' : 'rgba(23,18,46,0.4)', fontSize: '12px' }}>{game.plays} plays</span>
        </div>
      </div>
    </div>
  );
}

/* ── Stats strip ─────────────────────────────────────────────────── */
function StatsStrip() {
  const { isDark } = useTheme();
  const stats = [
    { icon: <IoGameController size={18} />, value: games.length, suffix: '+', label: 'Total Games', accent: '#00d4ff' },
    { icon: <FaFire size={16} />, value: games.filter(g => g.isHot).length, suffix: '', label: 'Hot Games', accent: '#ff4757' },
    { icon: <HiSparkles size={17} />, value: games.filter(g => g.isNew).length, suffix: '', label: 'New Drops', accent: '#00ff88' },
    { icon: <FaTrophy size={16} />, value: 5, suffix: 'M+', label: 'Players', accent: '#fbbf24' },
  ];
  return (
    <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '14px', marginBottom: '48px' }}>
      {stats.map((s, i) => (
        <div key={i} style={{
          background: isDark
            ? `linear-gradient(145deg, rgba(255,255,255,0.034), rgba(255,255,255,0.01))`
            : 'rgba(255,255,255,0.75)',
          border: `1px solid ${s.accent}20`,
          borderRadius: '16px', padding: '20px',
          display: 'flex', alignItems: 'center', gap: '14px',
          transition: 'transform 0.25s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s ease',
          animation: `fadeUp 0.4s ease ${i * 0.08}s both`,
          backdropFilter: isDark ? 'blur(12px)' : 'none',
          boxShadow: isDark ? `inset 0 0 28px ${s.accent}05, 0 1px 0 rgba(255,255,255,0.04)` : '0 2px 14px rgba(0,0,0,0.06)',
          position: 'relative', overflow: 'hidden',
        }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px) scale(1.02)';
            (e.currentTarget as HTMLDivElement).style.boxShadow = `0 14px 36px ${s.accent}28, 0 0 0 1px ${s.accent}28`;
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLDivElement).style.transform = '';
            (e.currentTarget as HTMLDivElement).style.boxShadow = isDark ? `inset 0 0 28px ${s.accent}05, 0 1px 0 rgba(255,255,255,0.04)` : '0 2px 14px rgba(0,0,0,0.06)';
          }}
        >
          <div style={{ position: 'absolute', top: '-22px', right: '-22px', width: '88px', height: '88px', borderRadius: '50%', background: `radial-gradient(circle, ${s.accent}16 0%, transparent 70%)`, pointerEvents: 'none' }} />
          <div style={{
            width: '44px', height: '44px', borderRadius: '12px', flexShrink: 0,
            background: `linear-gradient(135deg, ${s.accent}22, ${s.accent}0c)`,
            border: `1px solid ${s.accent}30`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: s.accent, boxShadow: `0 4px 14px ${s.accent}22`,
          }}>{s.icon}</div>
          <div>
            <div style={{ fontFamily: "'Orbitron', monospace", fontSize: '24px', fontWeight: 900, color: s.accent, lineHeight: 1 }}>
              <AnimatedCount target={s.value} suffix={s.suffix} />
            </div>
            <div style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', letterSpacing: '0.6px', marginTop: '4px' }}>{s.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Category banners ────────────────────────────────────────────── */
function CategoryBanners() {
  const { isDark } = useTheme();
  const banners = [
    { label: 'Action', icon: <RiSwordFill size={20} />, accent: '#4d8eff', count: games.filter(g => g.category === 'Action').length },
    { label: 'Puzzle', icon: <RiPuzzleFill size={20} />, accent: '#c084fc', count: games.filter(g => g.category === 'Puzzle').length },
    { label: 'Racing', icon: <RiSpeedUpFill size={20} />, accent: '#fb923c', count: games.filter(g => g.category === 'Racing').length },
    { label: 'Sports', icon: <RiFootballFill size={20} />, accent: '#4ade80', count: games.filter(g => g.category === 'Sports').length },
  ];
  return (
    <div className="cat-banners" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '12px', marginBottom: '48px' }}>
      {banners.map((b, i) => (
        <div key={b.label} style={{
          borderRadius: '14px',
          background: isDark
            ? `linear-gradient(145deg, ${b.accent}18 0%, rgba(4,6,18,0.7) 100%)`
            : `linear-gradient(145deg, ${b.accent}14 0%, rgba(255,255,255,0.65) 100%)`,
          border: `1px solid ${b.accent}26`,
          padding: '18px 16px',
          cursor: 'pointer',
          transition: 'transform 0.25s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s ease',
          animation: `fadeUp 0.4s ease ${i * 0.06}s both`,
          display: 'flex', alignItems: 'center', gap: '12px',
          backdropFilter: isDark ? 'blur(10px)' : 'none',
          boxShadow: isDark ? `0 1px 0 rgba(255,255,255,0.03)` : '0 2px 12px rgba(0,0,0,0.05)',
        }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
            (e.currentTarget as HTMLDivElement).style.boxShadow = `0 14px 32px ${b.accent}28, 0 0 0 1px ${b.accent}30`;
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLDivElement).style.transform = '';
            (e.currentTarget as HTMLDivElement).style.boxShadow = isDark ? '0 1px 0 rgba(255,255,255,0.03)' : '0 2px 12px rgba(0,0,0,0.05)';
          }}
        >
          <div style={{
            width: '40px', height: '40px', borderRadius: '10px', flexShrink: 0,
            background: `linear-gradient(135deg, ${b.accent}2c, ${b.accent}12)`,
            border: `1px solid ${b.accent}38`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: b.accent, boxShadow: `0 4px 12px ${b.accent}20`,
          }}>{b.icon}</div>
          <div>
            <div style={{ fontFamily: "'Orbitron', monospace", fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>{b.label}</div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)', fontFamily: "'Rajdhani', sans-serif" }}>{b.count} games</div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Main ────────────────────────────────────────────────────────── */
export default function GamesGrid() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [visibleCount, setVisibleCount] = useState(20);
  const { isDark } = useTheme();

  const filtered = activeCategory === 'All' ? games : games.filter(g => g.category === activeCategory);
  const hotGames = games.filter(g => g.isHot).slice(0, 15);
  const newGames = games.filter(g => g.isNew).slice(0, 15);
  const topRated = [...games].sort((a, b) => Number(b.rating) - Number(a.rating)).slice(0, 15);
  const featured = games.find(g => g.isHot) ?? games[0];

  return (
    <div style={{ padding: '0 24px 80px', maxWidth: '1300px', margin: '0 auto' }}>

      {/* Featured Hero */}
      {/* <div style={{ marginBottom: '60px', animation: 'fadeUp 0.6s ease both' }}>
        <FeaturedCard game={featured} />
      </div> */}

      {/* Stats & Quick Categories */}
      {/* <div style={{ marginBottom: '60px' }}>
        <StatsStrip />
        <CategoryBanners />
      </div> */}

      {/* All Games Grid (Bottom) */}
      <div id="all-games" style={{ animation: 'fadeUp 0.7s ease 0.4s both' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '20px' }}>
          <SectionHeader
            icon={<IoGridSharp size={18} />}
            title="DISCOVER ALL"
            accent="#00d4ff"
            sub={`${filtered.length} games to explore`}
          />

          {/* Filter chips */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {categories.map((cat, i) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => { setActiveCategory(cat); setVisibleCount(20); }}
                  style={{
                    padding: '8px 20px', borderRadius: '30px',
                    fontSize: '13px', fontWeight: 700, cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.2, 0, 0, 1)',
                    fontFamily: "'Rajdhani', sans-serif", letterSpacing: '0.5px',
                    border: '1px solid',
                    ...(isActive ? {
                      background: 'var(--accent-gradient)',
                      borderColor: 'transparent', color: 'white',
                      boxShadow: '0 8px 20px rgba(0,212,255,0.4)',
                      transform: 'translateY(-2px)',
                    } : {
                      background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                      borderColor: 'var(--filter-inactive-border)',
                      color: 'var(--filter-inactive-color)',
                    }),
                  }}
                  onMouseEnter={e => { if (!isActive) { const b = e.currentTarget as HTMLButtonElement; b.style.borderColor = 'var(--neon-blue)'; b.style.color = 'var(--neon-blue)'; b.style.transform = 'translateY(-2px)'; } }}
                  onMouseLeave={e => { if (!isActive) { const b = e.currentTarget as HTMLButtonElement; b.style.borderColor = 'var(--filter-inactive-border)'; b.style.color = 'var(--filter-inactive-color)'; b.style.transform = ''; } }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '24px', marginBottom: '60px' }}>
          {filtered.slice(0, visibleCount).map((game, i) => (
            <div key={game.id} style={{ animation: `fadeUp 0.5s ease ${(i % 20) * 0.03}s both` }}>
              <GameCard game={game} />
            </div>
          ))}
        </div>

        {/* Load more */}
        {visibleCount < filtered.length && (
          <div style={{ textAlign: 'center' }}>
            <button
              onClick={() => setVisibleCount(c => c + 20)}
              style={{
                padding: '14px 48px', borderRadius: '40px',
                background: 'transparent',
                border: '2px solid var(--neon-blue)',
                color: 'var(--neon-blue)', cursor: 'pointer',
                fontFamily: "'Orbitron', monospace",
                fontWeight: 700, fontSize: '14px', letterSpacing: '2px',
                transition: 'all 0.3s ease',
                display: 'inline-flex', alignItems: 'center', gap: '10px',
              }}
              onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = 'var(--neon-blue)'; b.style.color = 'white'; b.style.boxShadow = '0 0 30px rgba(0,212,255,0.4)'; b.style.transform = 'translateY(-3px)'; }}
              onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = 'transparent'; b.style.color = 'var(--neon-blue)'; b.style.boxShadow = ''; b.style.transform = ''; }}
            >
              LOAD MORE GAMES <MdKeyboardArrowRight size={20} />
            </button>
          </div>
        )}
      </div>

      {/* Hot Section */}
      <div id="hot" style={{ marginBottom: '64px', animation: 'fadeUp 0.6s ease 0.1s both' }}>
        <SectionHeader
          icon={<FaFire size={18} />}
          title="TRENDING NOW"
          accent="#ff4757"
          sub="Most played this week"
        />
        <HScrollRow items={hotGames} accent="#ff4757" />
      </div>

      {/* New Section */}
      <div id="new" style={{ marginBottom: '64px', animation: 'fadeUp 0.6s ease 0.2s both' }}>
        <SectionHeader
          icon={<HiSparkles size={20} />}
          title="FRESH DROPS"
          accent="#00ff88"
          sub="Newly added games"
        />
        <HScrollRow items={newGames} accent="#00ff88" />
      </div>



      {/* Mid ad */}
      <div style={{ padding: '0 24px 40px', maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'center' }}>
        <AdBanner type="rectangle" />
      </div>

      {/* Divider */}
      <div style={{
        height: '1px',
        background: 'linear-gradient(90deg, transparent, var(--card-border-hover), transparent)',
        marginBottom: '80px',
        opacity: 0.3
      }} />
      {/* Top Rated Section */}
      <div style={{ marginBottom: '80px', animation: 'fadeUp 0.6s ease 0.3s both' }}>
        <SectionHeader
          icon={<FaStar size={18} />}
          title="TOP RATED"
          accent="#fbbf24"
          sub="Highest scored by community"
        />
        <HScrollRow items={topRated} accent="#fbbf24" />
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .scroll-arrow { display: none !important; }
        }
      `}</style>
    </div>
  );
}