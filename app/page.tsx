import Navbar from '@/components/Navbar';
import AdBanner from '@/components/AdBanner';
import GamesGrid from '@/components/GamesGrid';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main style={{ minHeight: '100vh' }}>
      <Navbar />

      {/* Top ad */}
      <div style={{ padding: '14px 24px 4px', maxWidth: '1200px', margin: '0 auto' }}>
        <AdBanner type="leaderboard" />
      </div>

      {/* Main content */}
      <div style={{ paddingTop: '32px' }}>
        <GamesGrid />
      </div>

      {/* Mid ad */}
      <div style={{ padding: '0 24px 40px', maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'center' }}>
        <AdBanner type="rectangle" />
      </div>

      {/* Bottom ad */}
      <div style={{ padding: '0 24px 48px', maxWidth: '1200px', margin: '0 auto' }}>
        <AdBanner type="leaderboard" />
      </div>

      <Footer />
    </main>
  );
}