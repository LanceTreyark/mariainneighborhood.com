export interface Video {
  id: string;
  title: string;
  description?: string;
  url: string;
  category?: string;
  duration?: string;
}

// Extract YouTube video ID from URL
function getYouTubeId(url: string): string {
  const match = url.match(/[?&]v=([^&]+)/);
  return match ? match[1] : "";
}

// Main videos list - easily update this array
export const videos: Video[] = [
  {
    id: getYouTubeId("https://www.youtube.com/watch?v=i_j-QgdRaNk"),
    title: "A Day of Reflection at Mount Soledad Veterans Memorial 🇺🇸✨🌄",
    description: "Honoring our veterans at this iconic La Jolla landmark",
    url: "https://www.youtube.com/watch?v=i_j-QgdRaNk",
    category: "Community",
  },
  {
    id: getYouTubeId("https://www.youtube.com/watch?v=gpQnK3KwsaI"),
    title: "Inside Bessell Design: Tim Bessell's Art, Surfing & Warhol Story 🎨🌊",
    description: "Exploring art, surfing culture, and creative inspiration",
    url: "https://www.youtube.com/watch?v=gpQnK3KwsaI",
    category: "Local Business",
  },
  {
    id: getYouTubeId("https://www.youtube.com/watch?v=WNpn3mlavHg"),
    title: "Inside La Jolla Music with Christen 🎶",
    description: "Discovering the sounds and stories of La Jolla Music",
    url: "https://www.youtube.com/watch?v=WNpn3mlavHg",
    category: "Local Business",
  },
  {
    id: getYouTubeId("https://www.youtube.com/watch?v=iHilBLzCGu0"),
    title: "Sal's Success Story 💡🌊 | Business Wisdom in La Jolla",
    description: "Business insights and entrepreneurial wisdom from Sal",
    url: "https://www.youtube.com/watch?v=iHilBLzCGu0",
    category: "People",
  },
  {
    id: getYouTubeId("https://www.youtube.com/watch?v=kqF67CKKlQo"),
    title: "A Taste of France in La Jolla 🇫🇷🥐",
    description: "Exploring French cuisine and culture in the neighborhood",
    url: "https://www.youtube.com/watch?v=kqF67CKKlQo",
    category: "Food & Dining",
  },
  {
    id: getYouTubeId("https://www.youtube.com/watch?v=AU37iMMNRKs"),
    title: "🚲 Maria in the Neighborhood: Pedego Electric Bikes La Jolla 🌊",
    description: "Discovering eco-friendly transportation options",
    url: "https://www.youtube.com/watch?v=AU37iMMNRKs",
    category: "Local Business",
  },
  {
    id: getYouTubeId("https://www.youtube.com/watch?v=6hH2ERLsXio"),
    title: "Eddie from PTC Boxing in Bird Rock, La Jolla🥊",
    description: "Meet the community fitness leader",
    url: "https://www.youtube.com/watch?v=6hH2ERLsXio",
    category: "People",
  },
  {
    id: getYouTubeId("https://www.youtube.com/watch?v=i5hr9bin4ZQ"),
    title: "Green Light on the Horizon",
    description: "A beautiful moment captured in La Jolla",
    url: "https://www.youtube.com/watch?v=i5hr9bin4ZQ",
    category: "Events",
  },
  {
    id: getYouTubeId("https://www.youtube.com/watch?v=d6QbGWAEGGE"),
    title: "🎬 Maria in the Neighborhood – La Jolla Cove Edition 🏖️🦭",
    description: "Exploring the iconic La Jolla Cove",
    url: "https://www.youtube.com/watch?v=d6QbGWAEGGE",
    category: "Community",
  },
];

// Helper function to get featured video (first video)
export function getFeaturedVideo(): Video {
  return videos[0];
}

// Helper function to get latest videos (first n videos)
export function getLatestVideos(count: number = 3): Video[] {
  return videos.slice(0, count);
}

// Helper function to get all videos
export function getAllVideos(): Video[] {
  return videos;
}
