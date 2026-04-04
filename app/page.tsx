import Navbar from '@/components/Navbar';
import HeroBanner from '@/components/HeroBanner';
import AdBanner from '@/components/AdBanner';
import FeaturedRows from '@/components/FeaturedRows';
import GamesGrid from '@/components/GamesGrid';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main style={{ minHeight: '100vh' }}>
      <Navbar />

      {/* Top Leaderboard Ad */}
      <div style={{ padding: '12px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <AdBanner type="leaderboard" />
      </div>

      {/* <HeroBanner /> */}
       <GamesGrid />

      {/* Below hero ad */}
      <div style={{ padding: '4px 24px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <AdBanner type="leaderboard" />
      </div>

      {/* Mid page ad */}
      <div style={{ padding: '0 24px 32px', maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'center' }}>
        <AdBanner type="rectangle" />
      </div>

      <FeaturedRows />

      {/* <GamesGrid /> */}

      {/* Bottom ad */}
      <div style={{ padding: '0 24px 40px', maxWidth: '1200px', margin: '0 auto' }}>
        <AdBanner type="leaderboard" />
      </div>

      <Footer />
    </main>
  );
}
