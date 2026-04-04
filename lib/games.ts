export interface Game {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  url: string;
  iframeUrl: string;
  description: string;
  plays: string;
  rating: number;
  isNew?: boolean;
  isHot?: boolean;
  isFeatured?: boolean;
}

export const categories = [
  "All", "Action", "Puzzle", "Racing", "Sports", "Adventure", "Arcade", "Shooting", "Strategy", "Casual"
];

export const games: Game[] = [
  {
    id: "1",
    title: "Slope",
    category: "Arcade",
    thumbnail: "https://img.gamemonetize.com/qdz2yqfhf3e4xbp6vl0emjxwtd5j2yjz/512x384.jpg",
    url: "/game/slope",
    iframeUrl: "https://slope-game.github.io/",
    description: "Roll down the slope, dodge obstacles at high speed!",
    plays: "12.4M",
    rating: 4.8,
    isHot: true,
    isFeatured: true,
  },
  {
    id: "2",
    title: "2048",
    category: "Puzzle",
    thumbnail: "https://img.gamemonetize.com/u4kwhz1ytpf3vf2qhb1r7d0gqpvt9kl3/512x384.jpg",
    url: "/game/2048",
    iframeUrl: "https://play2048.co/",
    description: "Combine tiles to reach 2048. Simple but addictive!",
    plays: "8.2M",
    rating: 4.6,
    isFeatured: true,
  },
  {
    id: "3",
    title: "Subway Surfers",
    category: "Action",
    thumbnail: "https://img.gamemonetize.com/t7nkpxq3yz8vd1c5fh0wsb4r6m2jg9ae/512x384.jpg",
    url: "/game/subway-surfers",
    iframeUrl: "https://subwaysurf.io/",
    description: "Run, dodge and surf through the subway!",
    plays: "25.1M",
    rating: 4.9,
    isHot: true,
  },
  {
    id: "4",
    title: "Moto X3M",
    category: "Racing",
    thumbnail: "https://img.gamemonetize.com/5f8c2a3b7e9d1h4k6j0m/512x384.jpg",
    url: "/game/moto-x3m",
    iframeUrl: "https://www.crazygames.com/embed/moto-x3m",
    description: "Extreme bike racing with insane stunts!",
    plays: "6.7M",
    rating: 4.7,
    isNew: true,
  },
  {
    id: "5",
    title: "Snake Game",
    category: "Casual",
    thumbnail: "https://img.gamemonetize.com/s9p2q7t4u1v6w3x0y8z/512x384.jpg",
    url: "/game/snake",
    iframeUrl: "https://playsnake.org/",
    description: "Classic snake game. Eat, grow, survive!",
    plays: "4.1M",
    rating: 4.4,
  },
  {
    id: "6",
    title: "Tetris",
    category: "Puzzle",
    thumbnail: "https://img.gamemonetize.com/r5n8l2k9j6h3g0f7e4d/512x384.jpg",
    url: "/game/tetris",
    iframeUrl: "https://tetris.com/play-tetris",
    description: "The legendary block stacking puzzle game!",
    plays: "15.3M",
    rating: 4.9,
    isHot: true,
  },
  {
    id: "7",
    title: "Basketball Stars",
    category: "Sports",
    thumbnail: "https://img.gamemonetize.com/b1c4d7e0f3g6h9i2j5/512x384.jpg",
    url: "/game/basketball-stars",
    iframeUrl: "https://www.crazygames.com/embed/basketball-stars",
    description: "Dunk, shoot and dominate the court!",
    plays: "3.9M",
    rating: 4.5,
    isNew: true,
  },
  {
    id: "8",
    title: "Minecraft Classic",
    category: "Adventure",
    thumbnail: "https://img.gamemonetize.com/mc1a2b3c4d5e6f7g8h9/512x384.jpg",
    url: "/game/minecraft-classic",
    iframeUrl: "https://classic.minecraft.net/",
    description: "Build, create and survive in pixel world!",
    plays: "20.5M",
    rating: 4.8,
    isFeatured: true,
    isHot: true,
  },
  {
    id: "9",
    title: "Agar.io",
    category: "Action",
    thumbnail: "https://img.gamemonetize.com/ag9o8n7m6l5k4j3i2h/512x384.jpg",
    url: "/game/agario",
    iframeUrl: "https://agar.io/",
    description: "Eat smaller cells, grow bigger, dominate!",
    plays: "18.7M",
    rating: 4.6,
  },
  {
    id: "10",
    title: "Cut The Rope",
    category: "Puzzle",
    thumbnail: "https://img.gamemonetize.com/ct1r2o3p4e5t6h7r8p/512x384.jpg",
    url: "/game/cut-the-rope",
    iframeUrl: "https://www.crazygames.com/embed/cut-the-rope-remastered",
    description: "Feed the candy to Om Nom by cutting ropes!",
    plays: "7.2M",
    rating: 4.7,
    isNew: true,
  },
  {
    id: "11",
    title: "Drift Boss",
    category: "Racing",
    thumbnail: "https://img.gamemonetize.com/db1o2s3s4r5a6c7i8n/512x384.jpg",
    url: "/game/drift-boss",
    iframeUrl: "https://www.crazygames.com/embed/drift-boss",
    description: "Master the art of drifting on endless roads!",
    plays: "5.5M",
    rating: 4.5,
  },
  {
    id: "12",
    title: "Stickman Hook",
    category: "Arcade",
    thumbnail: "https://img.gamemonetize.com/sh1t2i3c4k5m6a7n8h/512x384.jpg",
    url: "/game/stickman-hook",
    iframeUrl: "https://www.crazygames.com/embed/stickman-hook",
    description: "Swing through levels like a stickman superhero!",
    plays: "9.1M",
    rating: 4.8,
    isHot: true,
  },
];

export const featuredGames = games.filter(g => g.isFeatured);
export const hotGames = games.filter(g => g.isHot);
export const newGames = games.filter(g => g.isNew);
