'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { games } from '@/lib/games';
import { useFavorites } from '@/components/Favorites';
import { useTheme } from '@/components/ThemeContext';
import { FaHeart, FaFire, FaHome, FaSun, FaMoon } from 'react-icons/fa';
import { MdGridView } from 'react-icons/md';
import { HiSparkles } from 'react-icons/hi2';
import { IoGameController, IoSearch, IoClose } from 'react-icons/io5';
import { RiMenuFoldLine, RiMenuUnfoldLine } from 'react-icons/ri';

export default function Navbar() {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const { favorites } = useFavorites();
  const { toggleTheme, isDark } = useTheme();

  const suggestions = query.length > 1
    ? games.filter(g => g.title.toLowerCase().includes(query.toLowerCase())).slice(0, 5)
    : [];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) { router.push(`/search?q=${encodeURIComponent(query)}`); setShowSuggestions(false); setQuery(''); }
  };

  useEffect(() => {
    const h = (e: MouseEvent) => { if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setShowSuggestions(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const navLinks = [
    // { label: 'Home',       icon: <FaHome size={13} />,    href: '/',          accent: '#00d4ff' }, 
    { label: 'Hot',        icon: <FaFire size={13} />,    href: '/#hot',          accent: '#ff4757' },
    { label: 'New',        icon: <HiSparkles size={14} />, href: '/#new',          accent: '#00d4ff' },
    { label: 'Categories', icon: <MdGridView size={15} />, href: '/category/Action', accent: '#a855f7' },
    {
      label: `Favorites${favorites.length > 0 ? ` (${favorites.length})` : ''}`,
      icon: <FaHeart size={12} />, href: '/favorites', accent: '#ff2d78',
    },
  ];

  /* Nav background: dark — deep gradient that deepens on scroll */
  const navBg = isDark
    ? scrolled
      ? 'linear-gradient(180deg, rgba(2,4,16,0.96) 0%, rgba(6,4,20,0.92) 100%)'
      : 'linear-gradient(180deg, rgba(4,6,20,0.72) 0%, rgba(6,4,20,0.55) 100%)'
    : scrolled
      ? 'rgba(244,244,255,0.92)'
      : 'rgba(244,244,255,0.75)';

  return (
    <>
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: navBg,
        backdropFilter: 'blur(22px)',
        borderBottom: scrolled
          ? isDark ? '1px solid rgba(0,212,255,0.12)' : '1px solid rgba(100,80,220,0.12)'
          : '1px solid transparent',
        padding: '0 28px',
        height: '66px',
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', gap: '16px',
        transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
        boxShadow: scrolled
          ? isDark
            ? '0 4px 40px rgba(0,0,0,0.6), 0 1px 0 rgba(0,212,255,0.08)'
            : '0 4px 24px rgba(0,0,0,0.08)'
          : 'none',
      }}>

        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
          <div style={{
            width: '42px', height: '42px',
            background: 'var(--accent-gradient)',
            borderRadius: '12px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: isDark ? '0 0 25px rgba(0,212,255,0.45)' : '0 10px 20px rgba(100,80,255,0.25)',
            transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          }}
            onMouseEnter={e => { const d = e.currentTarget as HTMLDivElement; d.style.transform = 'rotate(-12deg) scale(1.15)'; d.style.boxShadow = '0 0 35px rgba(0,212,255,0.7)'; }}
            onMouseLeave={e => { const d = e.currentTarget as HTMLDivElement; d.style.transform = ''; d.style.boxShadow = isDark ? '0 0 25px rgba(0,212,255,0.45)' : '0 10px 20px rgba(100,80,255,0.25)'; }}
          >
            <IoGameController size={24} color="white" />
          </div>
          <span style={{
            fontFamily: "'Orbitron', monospace", fontWeight: 900, fontSize: '20px',
            background: 'var(--accent-gradient)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            letterSpacing: '3px',
            filter: isDark ? 'drop-shadow(0 0 10px rgba(0,212,255,0.3))' : 'none',
          }}>GAMEZONE</span>
        </Link>

        {/* Desktop nav links */}
        <div className="desktop-nav" style={{ display: 'flex', gap: '8px', alignItems: 'center', flexShrink: 0 }}>
          {navLinks.map(item => (
            <Link key={item.label} href={item.href} style={{ textDecoration: 'none' }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '8px 16px', borderRadius: '12px',
                color: pathname === item.href ? 'var(--text-primary)' : 'var(--text-secondary)',
                fontFamily: "'Rajdhani', sans-serif",
                fontWeight: 700, fontSize: '14px', letterSpacing: '0.8px', whiteSpace: 'nowrap',
                transition: 'all 0.3s ease',
                background: pathname === item.href ? (isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)') : 'transparent',
                border: `1px solid ${pathname === item.href ? (isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)') : 'transparent'}`,
              }}
                onMouseEnter={e => { const d = e.currentTarget as HTMLDivElement; d.style.color = 'var(--text-primary)'; d.style.background = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)'; d.style.borderColor = isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.08)'; }}
                onMouseLeave={e => { const d = e.currentTarget as HTMLDivElement; const isActive = pathname === item.href; d.style.color = isActive ? 'var(--text-primary)' : 'var(--text-secondary)'; d.style.background = isActive ? (isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)') : 'transparent'; d.style.borderColor = isActive ? (isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)') : 'transparent'; }}
              >
                <span style={{ color: item.accent }}>{item.icon}</span> {item.label}
              </div>
            </Link>
          ))}
        </div>

        {/* Search */}
        <div style={{ position: 'relative', flex: 1, maxWidth: '320px' }} ref={wrapRef}>
          <form onSubmit={handleSearch}>
            <div style={{
              display: 'flex', alignItems: 'center',
              background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
              border: `1px solid ${showSuggestions ? 'var(--neon-blue)' : (isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)')}`,
              borderRadius: showSuggestions && suggestions.length > 0 ? '16px 16px 0 0' : '16px',
              padding: '10px 16px', gap: '10px',
              transition: 'all 0.3s ease',
              boxShadow: showSuggestions ? `0 0 20px rgba(0,212,255,0.15)` : 'none',
              backdropFilter: 'blur(10px)',
            }}>
              <IoSearch size={16} color="var(--text-secondary)" style={{ flexShrink: 0 }} />
              <input
                ref={inputRef} type="text" placeholder="Search games..."
                value={query}
                onChange={e => { setQuery(e.target.value); setShowSuggestions(true); }}
                onFocus={() => setShowSuggestions(true)}
                style={{
                  background: 'none', border: 'none', outline: 'none',
                  color: 'var(--text-primary)', fontFamily: "'Rajdhani', sans-serif",
                  fontSize: '15px', width: '100%', fontWeight: 600,
                }}
              />
              {query && (
                <button type="button" onClick={() => { setQuery(''); setShowSuggestions(false); }}
                  style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                  <IoClose size={18} />
                </button>
              )}
            </div>
          </form>


          {showSuggestions && suggestions.length > 0 && (
            <div style={{
              position: 'absolute', top: '100%', left: 0, right: 0,
              background: isDark
                ? 'linear-gradient(180deg, rgba(6,8,22,0.99) 0%, rgba(8,5,24,0.99) 100%)'
                : 'rgba(255,255,255,0.99)',
              border: isDark ? '1px solid rgba(0,212,255,0.2)' : '1px solid rgba(100,80,220,0.15)',
              borderTop: 'none', borderRadius: '0 0 12px 12px',
              overflow: 'hidden', zIndex: 200,
              boxShadow: isDark ? '0 18px 48px rgba(0,0,0,0.7)' : '0 16px 40px rgba(0,0,0,0.14)',
            }}>
              {suggestions.map((game, i) => (
                <Link key={game.id} href={game.url} style={{ textDecoration: 'none' }}
                  onClick={() => { setShowSuggestions(false); setQuery(''); }}>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '12px',
                    padding: '10px 14px', cursor: 'pointer',
                    transition: 'background 0.15s',
                    borderBottom: i < suggestions.length - 1 ? `1px solid ${isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.05)'}` : 'none',
                    animation: `fadeSlideIn 0.15s ease ${i * 0.03}s both`,
                  }}
                    onMouseEnter={e => (e.currentTarget.style.background = isDark ? 'rgba(0,212,255,0.06)' : 'rgba(0,120,255,0.04)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                    <div style={{
                      width: '32px', height: '32px', borderRadius: '8px', flexShrink: 0,
                      background: isDark ? 'rgba(0,212,255,0.1)' : 'rgba(100,80,220,0.08)',
                      border: `1px solid ${isDark ? 'rgba(0,212,255,0.18)' : 'rgba(100,80,220,0.12)'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <IoGameController size={14} color={isDark ? '#00d4ff' : '#7055d8'} />
                    </div>
                    <div>
                      <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: '13px', color: 'var(--text-primary)' }}>{game.title}</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{game.category} · ★ {game.rating}</div>
                    </div>
                  </div>
                </Link>
              ))}
              <Link href={`/search?q=${encodeURIComponent(query)}`} style={{ textDecoration: 'none' }} onClick={() => setShowSuggestions(false)}>
                <div style={{
                  padding: '10px 14px', color: isDark ? '#00d4ff' : '#0098d4',
                  fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: '12px',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px',
                  borderTop: `1px solid ${isDark ? 'rgba(0,212,255,0.1)' : 'rgba(0,0,0,0.06)'}`,
                }}
                  onMouseEnter={e => (e.currentTarget.style.background = isDark ? 'rgba(0,212,255,0.07)' : 'rgba(0,120,255,0.04)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                  <IoSearch size={12} /> See all results for &ldquo;{query}&rdquo;
                </div>
              </Link>
            </div>
          )}
        </div>

        {/* Theme toggle */}
        <button onClick={toggleTheme} title={isDark ? 'Light Mode' : 'Dark Mode'}
          style={{
            background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.7)',
            border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(100,80,220,0.15)'}`,
            color: 'var(--text-primary)', cursor: 'pointer',
            padding: '8px 11px', borderRadius: '10px',
            fontSize: '17px', flexShrink: 0,
            transition: 'all 0.2s', lineHeight: 1,
            backdropFilter: 'blur(8px)',
          }}
          onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.borderColor = 'rgba(0,212,255,0.5)'; b.style.boxShadow = '0 0 14px rgba(0,212,255,0.2)'; }}
          onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.borderColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(100,80,220,0.15)'; b.style.boxShadow = 'none'; }}
        >{isDark ? <FaSun /> : <FaMoon />}</button>

        {/* Hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="hamburger"
          style={{
            background: 'none', border: `1px solid ${isDark ? 'rgba(0,212,255,0.28)' : 'rgba(100,80,220,0.18)'}`,
            color: isDark ? '#00d4ff' : '#7055d8', cursor: 'pointer',
            padding: '8px 10px', borderRadius: '10px', flexShrink: 0,
            display: 'none', alignItems: 'center', justifyContent: 'center',
          }}>
          {menuOpen ? <RiMenuFoldLine size={20} /> : <RiMenuUnfoldLine size={20} />}
        </button>
      </nav>

      {/* Mobile drawer */}
      {menuOpen && (
        <div style={{
          position: 'fixed', top: '66px', left: 0, right: 0,
          background: isDark
            ? 'linear-gradient(180deg, rgba(4,6,20,0.98) 0%, rgba(8,5,24,0.98) 100%)'
            : 'rgba(246,246,255,0.98)',
          backdropFilter: 'blur(22px)',
          borderBottom: `1px solid ${isDark ? 'rgba(0,212,255,0.1)' : 'rgba(100,80,220,0.12)'}`,
          padding: '14px 18px 20px', zIndex: 99,
          display: 'flex', flexDirection: 'column', gap: '4px',
          animation: 'slideDown 0.22s cubic-bezier(0.4,0,0.2,1)',
          boxShadow: isDark ? '0 20px 60px rgba(0,0,0,0.7)' : '0 10px 40px rgba(0,0,0,0.1)',
        }}>
          {navLinks.map(item => (
            <Link key={item.label} href={item.href} style={{ textDecoration: 'none' }}>
              <div style={{
                padding: '12px 16px', borderRadius: '10px',
                color: 'var(--text-primary)',
                fontFamily: "'Rajdhani', sans-serif",
                fontWeight: 700, fontSize: '16px',
                display: 'flex', alignItems: 'center', gap: '10px',
                transition: 'all 0.15s',
              }}
                onMouseEnter={e => { const d = e.currentTarget as HTMLDivElement; d.style.background = `${item.accent}14`; d.style.color = item.accent; }}
                onMouseLeave={e => { const d = e.currentTarget as HTMLDivElement; d.style.background = 'transparent'; d.style.color = 'var(--text-primary)'; }}
              >
                {item.icon} {item.label}
              </div>
            </Link>
          ))}
          <div onClick={toggleTheme} style={{
            padding: '12px 16px', borderRadius: '10px',
            color: isDark ? '#00d4ff' : '#0098d4',
            fontFamily: "'Rajdhani', sans-serif",
            fontWeight: 700, fontSize: '16px', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '10px',
          }}>
            {isDark ? <FaSun /> : <FaMoon />}
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger   { display: flex !important; }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateX(-6px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </>
  );
}