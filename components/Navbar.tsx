'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { games } from '@/lib/games';
import { useFavorites } from '@/components/Favorites';

export default function Navbar() {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const { favorites } = useFavorites();

  const suggestions = query.length > 1
    ? games.filter(g => g.title.toLowerCase().includes(query.toLowerCase())).slice(0, 5)
    : [];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
      setShowSuggestions(false);
      setQuery('');
    }
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const navLinks = [
    { label: '🔥 Hot', href: '/#hot' },
    { label: '✨ New', href: '/#new' },
    { label: '🗂️ Categories', href: '/category/Action' },
    { label: `❤️ Favorites${favorites.length > 0 ? ` (${favorites.length})` : ''}`, href: '/favorites' },
  ];

  return (
    <>
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(6,8,15,0.96)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(0,212,255,0.15)',
        padding: '0 24px',
        height: '64px',
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', gap: '16px',
      }}>
        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
          <div style={{
            width: '36px', height: '36px',
            background: 'linear-gradient(135deg, #00d4ff, #b347ff)',
            borderRadius: '8px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '18px',
            boxShadow: '0 0 16px rgba(0,212,255,0.4)',
          }}>🎮</div>
          <span style={{
            fontFamily: "'Orbitron', monospace",
            fontWeight: 900, fontSize: '20px',
            background: 'linear-gradient(135deg, #00d4ff, #b347ff)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            letterSpacing: '2px',
          }}>GAMEZONE</span>
        </Link>

        {/* Desktop Nav Links */}
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexShrink: 0 }}
             className="desktop-nav">
          {navLinks.map(item => (
            <Link key={item.label} href={item.href} style={{
              textDecoration: 'none', color: pathname === item.href ? '#00d4ff' : '#8899aa',
              fontFamily: "'Rajdhani', sans-serif",
              fontWeight: 600, fontSize: '13px',
              letterSpacing: '0.5px',
              transition: 'color 0.2s', whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#00d4ff')}
            onMouseLeave={e => (e.currentTarget.style.color = pathname === item.href ? '#00d4ff' : '#8899aa')}>
              {item.label}
            </Link>
          ))}
        </div>

        {/* Search */}
        <div style={{ position: 'relative', flex: 1, maxWidth: '320px' }} ref={wrapRef}>
          <form onSubmit={handleSearch}>
            <div style={{
              display: 'flex', alignItems: 'center',
              background: 'rgba(255,255,255,0.05)',
              border: `1px solid ${showSuggestions ? 'rgba(0,212,255,0.5)' : 'rgba(0,212,255,0.2)'}`,
              borderRadius: showSuggestions && suggestions.length > 0 ? '8px 8px 0 0' : '8px',
              padding: '8px 14px', gap: '8px',
              transition: 'border-color 0.2s',
            }}>
              <span style={{ color: '#8899aa', fontSize: '14px', flexShrink: 0 }}>🔍</span>
              <input
                ref={inputRef}
                type="text"
                placeholder="Search games..."
                value={query}
                onChange={e => { setQuery(e.target.value); setShowSuggestions(true); }}
                onFocus={() => setShowSuggestions(true)}
                style={{
                  background: 'none', border: 'none', outline: 'none',
                  color: '#f0f4ff', fontFamily: "'Rajdhani', sans-serif",
                  fontSize: '14px', width: '100%',
                }}
              />
              {query && (
                <button type="button" onClick={() => { setQuery(''); setShowSuggestions(false); }}
                  style={{ background: 'none', border: 'none', color: '#8899aa', cursor: 'pointer', fontSize: '14px', flexShrink: 0 }}>
                  ✕
                </button>
              )}
            </div>
          </form>

          {/* Autocomplete dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div style={{
              position: 'absolute', top: '100%', left: 0, right: 0,
              background: '#0d1117',
              border: '1px solid rgba(0,212,255,0.3)',
              borderTop: 'none', borderRadius: '0 0 8px 8px',
              overflow: 'hidden', zIndex: 200,
              boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
            }}>
              {suggestions.map(game => (
                <Link key={game.id} href={game.url} style={{ textDecoration: 'none' }}
                  onClick={() => { setShowSuggestions(false); setQuery(''); }}>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '12px',
                    padding: '10px 14px', cursor: 'pointer',
                    transition: 'background 0.15s',
                    borderBottom: '1px solid rgba(255,255,255,0.04)',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,212,255,0.08)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                    <span style={{ fontSize: '20px' }}>
                      {['🎮','🕹️','🎯','🏎️','⚽','🗺️','👾','🎱','🔫','🧩'][parseInt(game.id) % 10]}
                    </span>
                    <div>
                      <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: '14px', color: '#f0f4ff' }}>
                        {game.title}
                      </div>
                      <div style={{ fontSize: '11px', color: '#8899aa', fontFamily: "'Inter', sans-serif" }}>
                        {game.category} · ★ {game.rating}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
              <Link href={`/search?q=${encodeURIComponent(query)}`} style={{ textDecoration: 'none' }}
                onClick={() => setShowSuggestions(false)}>
                <div style={{
                  padding: '10px 14px', color: '#00d4ff',
                  fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, fontSize: '13px',
                  cursor: 'pointer', transition: 'background 0.15s',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,212,255,0.08)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                  🔍 See all results for &ldquo;{query}&rdquo;
                </div>
              </Link>
            </div>
          )}
        </div>

        {/* Hamburger (mobile) */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="hamburger"
          style={{
            background: 'none', border: '1px solid rgba(0,212,255,0.2)',
            color: '#00d4ff', cursor: 'pointer', padding: '8px 10px',
            borderRadius: '8px', fontSize: '18px', flexShrink: 0,
            display: 'none',
          }}
        >{menuOpen ? '✕' : '☰'}</button>
      </nav>

      {/* Mobile drawer */}
      {menuOpen && (
        <div style={{
          position: 'fixed', top: '64px', left: 0, right: 0,
          background: 'rgba(13,17,23,0.98)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(0,212,255,0.15)',
          padding: '20px 24px',
          zIndex: 99,
          display: 'flex', flexDirection: 'column', gap: '4px',
          animation: 'slideDown 0.2s ease',
        }}>
          {navLinks.map(item => (
            <Link key={item.label} href={item.href} style={{ textDecoration: 'none' }}>
              <div style={{
                padding: '12px 16px',
                color: '#f0f4ff',
                fontFamily: "'Rajdhani', sans-serif",
                fontWeight: 600, fontSize: '16px',
                borderRadius: '8px',
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,212,255,0.08)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                {item.label}
              </div>
            </Link>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
