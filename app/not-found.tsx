import Link from 'next/link';

export default function NotFound() {
  return (
    <main style={{
      minHeight: '100vh',
      background: '#06080f',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      fontFamily: "'Orbitron', monospace",
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background grid */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: `
          linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Glitch 404 */}
        <div style={{
          fontSize: 'clamp(80px, 20vw, 160px)',
          fontWeight: 900,
          lineHeight: 1,
          background: 'linear-gradient(135deg, #00d4ff, #b347ff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '-4px',
          marginBottom: '8px',
          filter: 'drop-shadow(0 0 30px rgba(0,212,255,0.4))',
        }}>404</div>

        <div style={{
          fontSize: '24px', fontWeight: 700,
          color: '#f0f4ff', letterSpacing: '4px',
          marginBottom: '16px', textTransform: 'uppercase',
        }}>GAME OVER</div>

        <p style={{
          color: '#8899aa', fontSize: '16px',
          fontFamily: "'Inter', sans-serif",
          marginBottom: '40px', maxWidth: '400px',
          lineHeight: 1.6,
        }}>
          This page doesn&apos;t exist. Maybe it was deleted, or you typed the wrong URL.
        </p>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <button style={{
              background: 'linear-gradient(135deg, #00d4ff, #b347ff)',
              color: 'white', border: 'none',
              padding: '14px 32px', borderRadius: '8px',
              fontFamily: "'Orbitron', monospace",
              fontWeight: 700, fontSize: '13px',
              letterSpacing: '1px', cursor: 'pointer',
              textTransform: 'uppercase',
              boxShadow: '0 0 20px rgba(0,212,255,0.3)',
            }}>
              🏠 Back to Home
            </button>
          </Link>
          <Link href="/search" style={{ textDecoration: 'none' }}>
            <button style={{
              background: 'transparent',
              color: '#f0f4ff',
              border: '1px solid rgba(0,212,255,0.3)',
              padding: '14px 32px', borderRadius: '8px',
              fontFamily: "'Orbitron', monospace",
              fontWeight: 600, fontSize: '13px',
              letterSpacing: '1px', cursor: 'pointer',
            }}>
              🔍 Search Games
            </button>
          </Link>
        </div>

        {/* Pixel game character */}
        <div style={{
          marginTop: '60px',
          fontSize: '48px',
          animation: 'float 3s ease-in-out infinite',
        }}>👾</div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-16px) rotate(5deg); }
        }
      `}</style>
    </main>
  );
}
