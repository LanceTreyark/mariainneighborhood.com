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

// Main videos list - automatically updated from YouTube
export const videos: Video[] = [
  {
    "id": "EkOMiKzfft0",
    "title": "rom South Korea to La Jolla 🇰🇷➡️🇺🇸 | Patr",
    "description": "In this episode, Maria sits down with Patrick, the owner of Pearl Street Cleaners located at 454 Pearl St, La Jolla, CA 92037 🧺🏖️ Patrick shares his incredible journey from South Korea to La Jolla 🇰🇷➡️🇺🇸 and how he built his business from the ground up through hard work, dedication, and passion for serving the community. We also dive into Patrick’s personal life, what motivates him, and how he enjoys spending his free time outside of work 🌿☕. This is a heartfelt conversation about perseverance, family, and the true meaning of community.",
    "url": "https://www.youtube.com/watch?v=EkOMiKzfft0",
    "category": "Community"
  },
  {
    "id": "UjWa1l6yHMA",
    "title": "Coffee, Flowers & Community 🌸 Inside La Jolla’s Beloved Flower Pot Café",
    "description": "I had the absolute pleasure of interviewing Gloria & Amanda, the wonderful owners of The Flower Pot Café & Bakery in La Jolla ☕🥐 This charming, community-focused spot is loved for its cozy, floral-filled ambiance, exceptional organic coffee roasted in-house, and fresh, delicious food—from gourmet sandwiches and hearty breakfasts to truly standout pastries 🌿✨ In this episode, Gloria and Amanda share their journey, their favorite local spots, and what makes The Flower Pot such a special part of the La Jolla community 💛",
    "url": "https://www.youtube.com/watch?v=UjWa1l6yHMA",
    "category": "Community"
  },
  {
    "id": "4YDJmU9p840",
    "title": "🌍 From Nigeria to the United States: Father Clement’s Journey of Faith ✝️",
    "description": "🎙️ In this interview, Maria speaks with Father Clement from Nigeria, who shares his inspiring journey to becoming a priest. He talks about his upbringing, his calling to the priesthood, and his path from Nigeria to building his life and ministry in the United States.✨ A heartfelt conversation about faith, purpose, and cultural transition. 👉 Please like, follow, and subscribe for more inspiring stories from the community.",
    "url": "https://www.youtube.com/watch?v=4YDJmU9p840",
    "category": "Community"
  },
  {
    "id": "i_j-QgdRaNk",
    "title": "A Day of Reflection at Mount Soledad Veterans Memorial  🇺🇸✨🌄",
    "description": "Visited the Mount Soledad Veterans Memorial ✨ The views were breathtaking and the stories honored there truly ...",
    "url": "https://www.youtube.com/watch?v=i_j-QgdRaNk",
    "category": "Community"
  },
  {
    "id": "gpQnK3KwsaI",
    "title": "Inside Bessell Design: Tim Bessell’s Art, Surfing &amp; Warhol Story 🎨🌊",
    "description": "I had the absolute pleasure of interviewing the legend Tim Bessel: a master surfboard shaper, successful business owner, ...",
    "url": "https://www.youtube.com/watch?v=gpQnK3KwsaI",
    "category": "Community"
  },
  {
    "id": "WNpn3mlavHg",
    "title": "Inside La Jolla Music with Christen 🎶",
    "description": "Maria stopped by La Jolla Music at 7423 Girard Ave, La Jolla, CA 92037 to chat with Christen, the heart and soul of this local gem.",
    "url": "https://www.youtube.com/watch?v=WNpn3mlavHg",
    "category": "Community"
  },
  {
    "id": "iHilBLzCGu0",
    "title": "Sal’s Success Story 💡🌊 | Business Wisdom in La Jolla | Maria in the Neighborhood",
    "description": "In today's episode, Maria meets Sal from San Diego , an entrepreneur with years of business experience and a passion for ...",
    "url": "https://www.youtube.com/watch?v=iHilBLzCGu0",
    "category": "Local Business"
  },
  {
    "id": "kqF67CKKlQo",
    "title": "A Taste of France in La Jolla 🇫🇷🥐",
    "description": "Maria had the pleasure of interviewing Annie, the inspiring owner of Parisien Gourmandises at 7643 Girard Ave, La Jolla, CA ...",
    "url": "https://www.youtube.com/watch?v=kqF67CKKlQo",
    "category": "Food & Dining"
  },
  {
    "id": "AU37iMMNRKs",
    "title": "🚲 Maria in the Neighborhood: Pedego Electric Bikes La Jolla 🌊",
    "description": "Maria interviewed Tracy from Pedego Electric Bikes in beautiful Bird Rock, La Jolla! ✨ Tracy shared how she started the ...",
    "url": "https://www.youtube.com/watch?v=AU37iMMNRKs",
    "category": "Community"
  },
  {
    "id": "6hH2ERLsXio",
    "title": "Eddie from PTC Boxing in Bird Rock, La Jolla🥊",
    "description": "It was so much fun learning more about the sport and the incredible energy at their gym 5755 La Jolla Blvd, La Jolla, CA ...",
    "url": "https://www.youtube.com/watch?v=6hH2ERLsXio",
    "category": "People"
  },
  {
    "id": "i5hr9bin4ZQ",
    "title": "Green Light on the Horizon",
    "description": "Maria neighborhood here in San Diego I witnessed something magical — the green light in the horizon . It felt surreal, like ...",
    "url": "https://www.youtube.com/watch?v=i5hr9bin4ZQ",
    "category": "Events"
  },
  {
    "id": "d6QbGWAEGGE",
    "title": "🎬 Maria in the Neighborhood – La Jolla Cove Edition 🏖️🦭",
    "description": "From breathtaking ocean views to playful sea lions and dreamy coastal homes — come along for the tour!",
    "url": "https://www.youtube.com/watch?v=d6QbGWAEGGE",
    "category": "Community"
  },
  {
    "id": "GbUtV3FaFoo",
    "title": "🎥  Ali from Iran 🇮🇷 Shares Life Tips from La Jolla 🌴 | Motivation &amp; Culture Blend 💬",
    "description": "Hey everyone! Meet Ali from Iran, now exploring the beauty and inspiration of La Jolla, California! In this video, Ali shares ...",
    "url": "https://www.youtube.com/watch?v=GbUtV3FaFoo",
    "category": "Community"
  },
  {
    "id": "v_v_wROCbZA",
    "title": "What to Do in La Jolla 🏖️ | Local Tips + Barre3 Studio in Bird Rock!",
    "description": "Maria in the Neighborhood is back with another amazing local spotlight! This time, I had the pleasure of interviewing Meghan ...",
    "url": "https://www.youtube.com/watch?v=v_v_wROCbZA",
    "category": "Community"
  },
  {
    "id": "Uy5UNLWVaGk",
    "title": "Hidden Gem in La Jolla! 💇‍♀️ Salon Secrets &amp; Local Tips 🌴",
    "description": "Maria had a great conversation with Meghan from Massachusetts, where she shared some amazing La Jolla tips! She also ...",
    "url": "https://www.youtube.com/watch?v=Uy5UNLWVaGk",
    "category": "People"
  },
  {
    "id": "L5qVYoO5268",
    "title": "Discover the Perfect Wine with Ken at Bird Rock Fine Wine Festival🍷✨",
    "description": "Maria interviewed Ken from Bird Rock Fine Wine in Bird Rock! Ken, the owner, is passionate about helping you find the perfect ...",
    "url": "https://www.youtube.com/watch?v=L5qVYoO5268",
    "category": "Community"
  },
  {
    "id": "00tEfOdhBk0",
    "title": "La Jolla’s Hidden Art Gem 💎✨",
    "description": "Meet Theo from Greece — owner of L & G Projects, a contemporary art gallery bringing global vibes to La Jolla! 🖼️   Just had a ...",
    "url": "https://www.youtube.com/watch?v=00tEfOdhBk0",
    "category": "Community"
  },
  {
    "id": "sb6DIFhgI8U",
    "title": "🎥 Phyllis from New Jersey shares her amazing experience in beautiful La Jolla, California! 🌊☀️",
    "description": "From stunning ocean views to unforgettable moments, hear why she fell in love with this coastal paradise 🏖️ Don't miss it – hit ...",
    "url": "https://www.youtube.com/watch?v=sb6DIFhgI8U",
    "category": "Community"
  },
  {
    "id": "iioR1CdY0pA",
    "title": " 🎥 Meet Taba from Iran at Taba Rug Gallery! 🧡🧿Maria in the Neighborhood",
    "description": "In this episode, I sit down with Taba, a talented rug expert from Iran who has been part of the La Jolla community for over 30 years!",
    "url": "https://www.youtube.com/watch?v=iioR1CdY0pA",
    "category": "Community"
  },
  {
    "id": "Re4hbI9Wve8",
    "title": " Just talked to Chas from Silicon Valley — now a local walking tour guide in La Jolla! 👟💬",
    "description": "He's not just showing people around — he's connecting with the community and sharing amazing local stories ...",
    "url": "https://www.youtube.com/watch?v=Re4hbI9Wve8",
    "category": "Community"
  },
  {
    "id": "gJx-fD2Bjmk",
    "title": "Chatting with Ana from Mexico: Insider Tips on Visiting La Jolla, California!",
    "description": "Today on Maria on the Neighborhood, I'm chatting with Ana from Mexico! She recently explored the stunning coastal town of ...",
    "url": "https://www.youtube.com/watch?v=gJx-fD2Bjmk",
    "category": "Community"
  }
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
