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
          background: 'linear-gradient(to bottom, #00d4ff, #b347ff)',
          borderRadius: '2px',
        }} />
        <h2 style={{
          fontFamily: "'Orbitron', monospace",
          fontSize: '20px', fontWeight: 700,
          color: '#f0f4ff', letterSpacing: '1px',
        }}>ALL GAMES</h2>
        <span style={{
          background: 'rgba(0,212,255,0.1)',
          border: '1px solid rgba(0,212,255,0.2)',
          color: '#00d4ff', fontSize: '12px',
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
                background: 'linear-gradient(135deg, #00d4ff, #b347ff)',
                borderColor: 'transparent',
                color: 'white',
                boxShadow: '0 0 16px rgba(0,212,255,0.3)',
              } : {
                background: 'transparent',
                borderColor: 'rgba(0,212,255,0.2)',
                color: '#8899aa',
              }),
            }}
            onMouseEnter={e => {
              if (activeCategory !== cat) {
                e.currentTarget.style.borderColor = 'rgba(0,212,255,0.5)';
                e.currentTarget.style.color = '#f0f4ff';
              }
            }}
            onMouseLeave={e => {
              if (activeCategory !== cat) {
                e.currentTarget.style.borderColor = 'rgba(0,212,255,0.2)';
                e.currentTarget.style.color = '#8899aa';
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
