import { MetadataRoute } from 'next';
import { games, categories } from '@/lib/games';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://yourgamezone.com';

  const gamePages = games.map(game => ({
    url: `${baseUrl}${game.url}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const categoryPages = categories
    .filter(c => c !== 'All')
    .map(cat => ({
      url: `${baseUrl}/category/${cat}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/search`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.5 },
    ...categoryPages,
    ...gamePages,
  ];
}
