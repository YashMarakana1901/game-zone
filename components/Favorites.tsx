'use client';

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';

interface FavoritesContextType {
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  toggleFavorite: () => {},
  isFavorite: () => false,
});

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem('gz_favorites');
      if (stored) setFavorites(JSON.parse(stored));
    } catch {}
  }, []);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const next = prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id];
      try { localStorage.setItem('gz_favorites', JSON.stringify(next)); } catch {}
      return next;
    });
  };

  const isFavorite = (id: string) => favorites.includes(id);

  if (!mounted) return <>{children}</>;

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}

// Heart button component
export function FavoriteButton({ gameId }: { gameId: string }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const active = isFavorite(gameId);

  return (
    <button
      onClick={e => { e.preventDefault(); e.stopPropagation(); toggleFavorite(gameId); }}
      title={active ? 'Remove from favorites' : 'Add to favorites'}
      style={{
        position: 'absolute', top: '8px', right: '8px',
        width: '28px', height: '28px',
        background: active ? 'rgba(255,45,120,0.9)' : 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(8px)',
        border: `1px solid ${active ? '#ff2d78' : 'rgba(255,255,255,0.2)'}`,
        borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', fontSize: '13px',
        transition: 'all 0.2s',
        zIndex: 10,
        transform: active ? 'scale(1.1)' : 'scale(1)',
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.2)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = active ? 'scale(1.1)' : 'scale(1)'; }}
    >
      {active ? '❤️' : '🤍'}
    </button>
  );
}
