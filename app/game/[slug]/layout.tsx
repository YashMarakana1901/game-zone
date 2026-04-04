import { games } from '@/lib/games';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const game = games.find(g => g.url === `/game/${slug}`);
  if (!game) return { title: 'Game Not Found' };
  return {
    title: `Play ${game.title} Free Online`,
    description: `Play ${game.title} for free online. ${game.description} No download required!`,
  };
}

export default function GameLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
