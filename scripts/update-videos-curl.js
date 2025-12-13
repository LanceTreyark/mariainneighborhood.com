const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// Load environment variables from .env.local
require("dotenv").config({ path: ".env.local" });

// Configuration
const API_KEY = process.env.YOUTUBE_API_KEY;
const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;
const MAX_RESULTS = 50;

if (!API_KEY || !CHANNEL_ID) {
  console.error(
    "Missing required environment variables: YOUTUBE_API_KEY and YOUTUBE_CHANNEL_ID"
  );
  process.exit(1);
}

// Category mapping based on video titles/descriptions
function categorizeVideo(title, description) {
  const titleLower = title.toLowerCase();
  
  if (titleLower.includes("business") || titleLower.includes("entrepreneur")) {
    return "Local Business";
  }
  if (
    titleLower.includes("food") ||
    titleLower.includes("restaurant") ||
    titleLower.includes("taste")
  ) {
    return "Food & Dining";
  }
  if (
    titleLower.includes("cove") ||
    titleLower.includes("memorial") ||
    titleLower.includes("neighborhood")
  ) {
    return "Community";
  }
  if (
    titleLower.includes("boxing") ||
    titleLower.includes("eddie") ||
    titleLower.includes("sal")
  ) {
    return "People";
  }
  if (titleLower.includes("event") || titleLower.includes("green light")) {
    return "Events";
  }

  return "Community"; // Default category
}

async function fetchChannelVideos() {
  try {
    const url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet&order=date&maxResults=${MAX_RESULTS}&type=video`;
    
    console.log("Fetching videos using curl...");
    const curlCommand = `curl -s "${url}"`;
    const response = execSync(curlCommand, { encoding: 'utf8' });
    
    const data = JSON.parse(response);
    
    if (data.error) {
      throw new Error(`YouTube API error: ${data.error.message}`);
    }
    
    return data.items || [];
  } catch (error) {
    console.error("Error fetching videos:", error.message);
    throw error;
  }
}

async function updateVideosData() {
  console.log("Fetching videos from YouTube...");

  const videos = await fetchChannelVideos();
  console.log(`Found ${videos.length} videos`);

  // Transform YouTube data to our format
  const videoData = videos.map((video) => {
    const videoUrl = `https://www.youtube.com/watch?v=${video.id.videoId}`;

    return {
      id: video.id.videoId,
      title: video.snippet.title,
      description: video.snippet.description,
      url: videoUrl,
      category: categorizeVideo(video.snippet.title, video.snippet.description),
    };
  });

  // Generate the TypeScript file content
  const fileContent = `export interface Video {
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
export const videos: Video[] = ${JSON.stringify(videoData, null, 2)};

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
`;

  // Write to the videos-data.ts file
  const filePath = path.join(__dirname, "../lib/videos-data.ts");
  fs.writeFileSync(filePath, fileContent, "utf8");

  console.log(`✅ Updated ${filePath} with ${videoData.length} videos`);
  console.log("Latest videos:");
  videoData.slice(0, 3).forEach((video) => {
    console.log(`  - ${video.title}`);
  });
}

// Run the update
updateVideosData().catch((error) => {
  console.error("Failed to update videos:", error);
  process.exit(1);
});