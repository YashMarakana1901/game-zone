'use client';

export function GameCardSkeleton() {
  return (
    <div style={{
      background: 'var(--skeleton-base)',
      borderRadius: '12px',
      overflow: 'hidden',
      border: '1px solid var(--card-border)',
    }}>
      <div style={{
        height: '140px',
        background: `linear-gradient(90deg, var(--skeleton-base) 25%, var(--skeleton-shine) 50%, var(--skeleton-base) 75%)`,
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.5s infinite',
      }} />
      <div style={{ padding: '12px' }}>
        <div style={{
          height: '14px', width: '70%', borderRadius: '4px', marginBottom: '8px',
          background: `linear-gradient(90deg, var(--skeleton-shine) 25%, var(--skeleton-shine2) 50%, var(--skeleton-shine) 75%)`,
          backgroundSize: '200% 100%',
          animation: 'shimmer 1.5s infinite',
        }} />
        <div style={{
          height: '11px', width: '45%', borderRadius: '4px',
          background: `linear-gradient(90deg, var(--skeleton-shine) 25%, var(--skeleton-shine2) 50%, var(--skeleton-shine) 75%)`,
          backgroundSize: '200% 100%',
          animation: 'shimmer 1.5s infinite',
        }} />
      </div>
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
}

export function GameGridSkeleton({ count = 12 }: { count?: number }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
      gap: '16px',
    }}>
      {Array.from({ length: count }).map((_, i) => (
        <GameCardSkeleton key={i} />
      ))}
    </div>
  );
}
