'use client';

import { hotGames, newGames } from '@/lib/games';
import GameCard from './GameCard';
import { GiHotMeal, GiNewShoot } from 'react-icons/gi';

interface GameRowProps {
  title: string;
  emoji: string;
  games: typeof hotGames;
  id?: string;
}

function GameRow({ title, emoji, games, id }: GameRowProps) {
  return (
    <section id={id} style={{ padding: '0 0 40px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px', padding: '0 24px' }}>
        <div style={{
          width: '4px', height: '24px',
          background: 'linear-gradient(to bottom, var(--neon-blue), var(--neon-purple))',
          borderRadius: '2px',
        }} />
        <h2 style={{
          fontFamily: "'Orbitron', monospace",
          fontSize: '20px', fontWeight: 700,
          color: 'var(--text-primary)', letterSpacing: '1px',
        }}>{emoji} {title}</h2>
      </div>

      <div style={{
        display: 'flex', gap: '16px',
        overflowX: 'auto', padding: '4px 24px 12px',
        scrollbarWidth: 'thin',
        scrollbarColor: 'var(--neon-blue) transparent',
      }}>
        {games.map(game => (
          <div key={game.id} style={{ flexShrink: 0, width: '220px' }}>
            <GameCard game={game} size="large" />
          </div>
        ))}
      </div>
    </section>
  );
}

export default function FeaturedRows() {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', paddingTop: '8px' }}>
      <GameRow id="hot" title="HOT GAMES" emoji={<GiHotMeal />} games={hotGames} />
      <GameRow id="new" title="NEW GAMES" emoji={<GiNewShoot />} games={newGames} />
    </div>
  );
}
