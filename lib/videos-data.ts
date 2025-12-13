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
    "id": "CgqT36Bu5Ts",
    "title": "#mariaintheneighborhood#lajolla✨#birdrock#holidayseason ❤️",
    "description": "",
    "url": "https://www.youtube.com/watch?v=CgqT36Bu5Ts",
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
    "id": "ubzIglSmHX0",
    "title": "When You Eat ALL the Leftovers and Try to Exercise in La Jolla 😅#mariaintheneighborhood",
    "description": "",
    "url": "https://www.youtube.com/watch?v=ubzIglSmHX0",
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
    "id": "kSst47aRosg",
    "title": "The legend Tim Bessel ✨🏄‍♂️La Jolla",
    "description": "",
    "url": "https://www.youtube.com/watch?v=kSst47aRosg",
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
    "id": "4olj8ND8fow",
    "title": "Maria from Rio de Janeiro Brazil 🇧🇷 to La Jolla 🇺🇸",
    "description": "",
    "url": "https://www.youtube.com/watch?v=4olj8ND8fow",
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
    "id": "DY7Bx1zdn7A",
    "title": "Speed round ✨La Jolla tips ✨Sal from San Diego!",
    "description": "",
    "url": "https://www.youtube.com/watch?v=DY7Bx1zdn7A",
    "category": "People"
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
    "id": "6McJWZo87Zs",
    "title": "Behind the Scenes at Pedego Electric bikes in La Jolla- Maria in the Neighborhood 🎥✨",
    "description": "",
    "url": "https://www.youtube.com/watch?v=6McJWZo87Zs",
    "category": "Community"
  },
  {
    "id": "Gx1O4WqZxpo",
    "title": "#mariaintheneighborhood #lajolla#pedegoeletricbikes#lajolla",
    "description": "",
    "url": "https://www.youtube.com/watch?v=Gx1O4WqZxpo",
    "category": "Community"
  },
  {
    "id": "SmBk_rLN3io",
    "title": "🎬💃 Life feels lighter when you dance! Just a little joy from Maria in the neighborhood 😄🎶",
    "description": "",
    "url": "https://www.youtube.com/watch?v=SmBk_rLN3io",
    "category": "Community"
  },
  {
    "id": "ZB_cq5Hxasg",
    "title": "Boxing in Bird Rock- La Jolla",
    "description": "",
    "url": "https://www.youtube.com/watch?v=ZB_cq5Hxasg",
    "category": "People"
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
    "id": "rJqAkFz7qks",
    "title": "Green light ✨Maria in the neighborhood",
    "description": "",
    "url": "https://www.youtube.com/watch?v=rJqAkFz7qks",
    "category": "Community"
  },
  {
    "id": "d6QbGWAEGGE",
    "title": "🎬 Maria in the Neighborhood – La Jolla Cove Edition 🏖️🦭",
    "description": "From breathtaking ocean views to playful sea lions and dreamy coastal homes — come along for the tour!",
    "url": "https://www.youtube.com/watch?v=d6QbGWAEGGE",
    "category": "Community"
  },
  {
    "id": "ED8of1b4J_w",
    "title": "🦭 Sea Lions of La Jolla 🌊 - Maria in the Neighborhood ✨",
    "description": "",
    "url": "https://www.youtube.com/watch?v=ED8of1b4J_w",
    "category": "Community"
  },
  {
    "id": "XHmEqSIrltU",
    "title": "🎥  Ali from Iran 🇮🇷 Shares Life Tips from La Jolla 🌴 | Motivation &amp; Culture Blend 💬",
    "description": "Hey everyone! Meet Ali from Iran, now exploring the beauty and inspiration of La Jolla, California! In this video, Ali shares ...",
    "url": "https://www.youtube.com/watch?v=XHmEqSIrltU",
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
    "id": "9msQSDRjIEw",
    "title": "San Diego Local Spotlight ✨  Barre3 Studio Tour + Hidden",
    "description": "Maria in the Neighborhood is back with another amazing local spotlight! This time, I had the pleasure of interviewing Meghan ...",
    "url": "https://www.youtube.com/watch?v=9msQSDRjIEw",
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
    "id": "zKZOYGRKmBc",
    "title": "From Massachusetts to La Jolla: Beauty, Beaches &amp; Best Tips! ✨🌊 #mariaintheneighborhood",
    "description": "Maria had a great conversation with Meghan from Massachusetts, where she shared some amazing La Jolla tips! She also ...",
    "url": "https://www.youtube.com/watch?v=zKZOYGRKmBc",
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
    "id": "buSNIY5wnAA",
    "title": "Discover the Perfect Wine with Ken at Bird Rock Fine Wine🍷✨",
    "description": "Maria interviewed Ken from Bird Rock Fine Wine in Bird Rock! Ken, the owner, is passionate about helping you find the perfect ...",
    "url": "https://www.youtube.com/watch?v=buSNIY5wnAA",
    "category": "Community"
  },
  {
    "id": "zd1JTjI-kkw",
    "title": "🇬🇷 Meet Theo from Greece — owner of L &amp; G Projects, a contemporary art gallery in La Jolla! 🖼️",
    "description": "",
    "url": "https://www.youtube.com/watch?v=zd1JTjI-kkw",
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
    "id": "m3H13ti52-Y",
    "title": "🎥 Phyllis from New Jersey shares her amazing experience in beautiful La Jolla, California! 🌊☀️",
    "description": "From stunning ocean views to unforgettable moments, hear why she fell in love with this coastal paradise 🏖️ Don't miss it – hit ...",
    "url": "https://www.youtube.com/watch?v=m3H13ti52-Y",
    "category": "Community"
  },
  {
    "id": "3LiKrUakvhQ",
    "title": "🎥 Maria in the Neighborhood: Meet Taba from Taba Rug Gallery! 🧡🧿 #lajolla #neighborhoodstories",
    "description": "In this episode, I sit down with Taba, a talented rug expert from Iran who has been part of the La Jolla community for over 30 years!",
    "url": "https://www.youtube.com/watch?v=3LiKrUakvhQ",
    "category": "Community"
  },
  {
    "id": "Z2nRypHcllI",
    "title": "🎥 Maria in the Neighborhood: Meet Taba from Taba Rug Gallery! 🧡🧿 #neighborhoodstories #lajolla",
    "description": "In this episode, I sit down with Taba, a talented rug expert from Iran who has been part of the La Jolla community for over 30 years!",
    "url": "https://www.youtube.com/watch?v=Z2nRypHcllI",
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
    "id": "ANMOOInhG_Y",
    "title": "🎤 Just talked to Chas from Silicon Valley — now a local walking tour guide in La Jolla! 👟💬",
    "description": "He's not just showing people around — he's connecting with the community and sharing amazing local stories ...",
    "url": "https://www.youtube.com/watch?v=ANMOOInhG_Y",
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
    "id": "D5jGrjtjcSw",
    "title": "Maria in the neighborhood in action ✨",
    "description": "",
    "url": "https://www.youtube.com/watch?v=D5jGrjtjcSw",
    "category": "Community"
  },
  {
    "id": "K7qMUIR1B1Y",
    "title": "Chatting with Ana from Mexico: Insider Tips on Visiting La Jolla, California! 🌴",
    "description": "Today on Maria on the Neighborhood, I'm chatting with Ana from Mexico! She recently explored the stunning coastal town of ...",
    "url": "https://www.youtube.com/watch?v=K7qMUIR1B1Y",
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
