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
        background: 'linear-gradient(135deg, rgba(0,212,255,0.04), rgba(179,71,255,0.04))',
        border: '1px dashed rgba(0,212,255,0.2)',
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
        color: 'rgba(136,153,170,0.4)',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        fontFamily: "'Inter', sans-serif",
      }}>Advertisement</span>

      {/* Placeholder text */}
      <span style={{
        fontSize: '11px',
        color: 'rgba(136,153,170,0.3)',
        fontFamily: "'Inter', sans-serif",
      }}>{size.label}</span>
      <span style={{
        fontSize: '10px',
        color: 'rgba(136,153,170,0.2)',
        fontFamily: "'Inter', sans-serif",
      }}>Replace with AdSense / Ad Network Code</span>

      {/* Decorative corner dots */}
      {['topLeft','topRight','bottomLeft','bottomRight'].map(pos => (
        <div key={pos} style={{
          position: 'absolute',
          width: '4px', height: '4px',
          background: 'rgba(0,212,255,0.2)',
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
