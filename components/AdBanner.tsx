'use client';

interface AdBannerProps {
  type: 'leaderboard' | 'rectangle' | 'sidebar' | 'mobile';
  className?: string;
}

const adSizes = {
  leaderboard: { width: '100%', height: '90px', label: 'Leaderboard Ad (728×90)' },
  rectangle:   { width: '300px', height: '250px', label: 'Rectangle Ad (300×250)' },
  sidebar:     { width: '160px', height: '600px', label: 'Wide Skyscraper (160×600)' },
  mobile:      { width: '100%', height: '50px', label: 'Mobile Banner (320×50)' },
};

export default function AdBanner({ type, className }: AdBannerProps) {
  const size = adSizes[type];

  return (
    <div
      className={className}
      style={{
        width: size.width,
        height: size.height,
        background: 'var(--ad-bg)',
        border: '1px dashed var(--ad-border)',
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '4px',
        position: 'relative',
        overflow: 'hidden',
        flexShrink: 0,
      }}
    >
      {/* Ad label */}
      <span style={{
        position: 'absolute',
        top: '6px',
        left: '10px',
        fontSize: '9px',
        color: 'var(--text-muted)',
        opacity: 0.5,
        textTransform: 'uppercase',
        letterSpacing: '1px',
        fontFamily: "'Inter', sans-serif",
      }}>Advertisement</span>

      {/* Placeholder text */}
      <span style={{
        fontSize: '11px',
        color: 'var(--text-secondary)',
        opacity: 0.4,
        fontFamily: "'Inter', sans-serif",
      }}>{size.label}</span>
      <span style={{
        fontSize: '10px',
        color: 'var(--text-secondary)',
        opacity: 0.25,
        fontFamily: "'Inter', sans-serif",
      }}>Replace with AdSense / Ad Network Code</span>

      {/* Decorative corner dots */}
      {['topLeft','topRight','bottomLeft','bottomRight'].map(pos => (
        <div key={pos} style={{
          position: 'absolute',
          width: '4px', height: '4px',
          background: 'var(--ad-dot)',
          borderRadius: '50%',
          ...(pos === 'topLeft' ? { top: '8px', left: '8px' } :
              pos === 'topRight' ? { top: '8px', right: '8px' } :
              pos === 'bottomLeft' ? { bottom: '8px', left: '8px' } :
              { bottom: '8px', right: '8px' }),
        }} />
      ))}
    </div>
  );
}
