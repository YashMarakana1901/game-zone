'use client';

import { useState } from 'react';
import { games, categories } from '@/lib/games';
import GameCard from './GameCard';

export default function GamesGrid() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? games
    : games.filter(g => g.category === activeCategory);

  return (
    <section id="games" style={{ padding: '0 24px 48px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Section header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
        <div style={{
          width: '4px', height: '24px',
          background: 'linear-gradient(to bottom, var(--neon-blue), var(--neon-purple))',
          borderRadius: '2px',
        }} />
        <h2 style={{
          fontFamily: "'Orbitron', monospace",
          fontSize: '20px', fontWeight: 700,
          color: 'var(--text-primary)', letterSpacing: '1px',
        }}>ALL GAMES</h2>
        <span style={{
          background: 'var(--count-bg)',
          border: '1px solid var(--count-border)',
          color: 'var(--neon-blue)', fontSize: '12px',
          padding: '3px 10px', borderRadius: '20px',
          fontFamily: "'Rajdhani', sans-serif",
          fontWeight: 600,
        }}>{filtered.length} Games</span>
      </div>

      {/* Category Filter */}
      <div id="categories" style={{
        display: 'flex', gap: '8px', flexWrap: 'wrap',
        marginBottom: '32px',
      }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: '7px 18px',
              borderRadius: '20px',
              fontSize: '13px', fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s',
              fontFamily: "'Rajdhani', sans-serif",
              letterSpacing: '0.5px',
              border: '1px solid',
              ...(activeCategory === cat ? {
                background: 'linear-gradient(135deg, var(--neon-blue), var(--neon-purple))',
                borderColor: 'transparent',
                color: 'white',
                boxShadow: '0 0 16px color-mix(in srgb, var(--neon-blue) 30%, transparent)',
              } : {
                background: 'transparent',
                borderColor: 'var(--filter-inactive-border)',
                color: 'var(--filter-inactive-color)',
              }),
            }}
            onMouseEnter={e => {
              if (activeCategory !== cat) {
                e.currentTarget.style.borderColor = 'var(--filter-hover-border)';
                e.currentTarget.style.color = 'var(--filter-hover-color)';
              }
            }}
            onMouseLeave={e => {
              if (activeCategory !== cat) {
                e.currentTarget.style.borderColor = 'var(--filter-inactive-border)';
                e.currentTarget.style.color = 'var(--filter-inactive-color)';
              }
            }}
          >{cat}</button>
        ))}
      </div>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
        gap: '16px',
      }}>
        {filtered.map(game => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </section>
  );
}
