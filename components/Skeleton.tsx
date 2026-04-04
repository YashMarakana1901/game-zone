'use client';

export function GameCardSkeleton() {
  return (
    <div style={{
      background: '#111827',
      borderRadius: '12px',
      overflow: 'hidden',
      border: '1px solid rgba(0,212,255,0.08)',
    }}>
      <div style={{
        height: '140px',
        background: 'linear-gradient(90deg, #111827 25%, #1a2236 50%, #111827 75%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.5s infinite',
      }} />
      <div style={{ padding: '12px' }}>
        <div style={{
          height: '14px', width: '70%', borderRadius: '4px', marginBottom: '8px',
          background: 'linear-gradient(90deg, #1a2236 25%, #243048 50%, #1a2236 75%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 1.5s infinite',
        }} />
        <div style={{
          height: '11px', width: '45%', borderRadius: '4px',
          background: 'linear-gradient(90deg, #1a2236 25%, #243048 50%, #1a2236 75%)',
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
