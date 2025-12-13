# YouTube Video Scraper Setup

## 1. Get YouTube API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the **YouTube Data API v3**:
   - Go to "APIs & Services" > "Library"
   - Search for "YouTube Data API v3"
   - Click "Enable"
4. Create API Key:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "API Key"
   - Copy the generated key

## 2. Find Maria's Channel ID

**Method 1: From Channel URL**
If the channel URL is like `youtube.com/channel/UC...`, the part after `/channel/` is the ID.

**Method 2: From Custom URL**
If it's like `youtube.com/@mariainneighborhood`:
1. Go to the channel page
2. View page source (Ctrl+U)
3. Search for `"channelId":"` - the ID follows this

**Method 3: Use Online Tool**
- Visit commentpicker.com/youtube-channel-id.php
- Enter the channel URL

## 3. Setup Environment Variables

Create `.env.local` file in your project root:

```bash
YOUTUBE_API_KEY=your_actual_api_key_here
YOUTUBE_CHANNEL_ID=UC1JW75QcwNSsCMAUz5qgUYQ
```

## 4. Run the Scraper

```bash
# Update videos from YouTube
npm run update-videos

# Then build/deploy as usual
npm run build
```

## 5. Automation Options

**Option A: Manual Updates**
Run `npm run update-videos` whenever you want fresh data.

**Option B: GitHub Actions (Recommended)**
Set up scheduled updates that auto-commit new videos.

**Option C: Build-time Updates**
Modify the build script to fetch videos during deployment.

## Notes

- Free tier: 10,000 API requests/day
- Each video fetch uses ~3 requests
- Script automatically categorizes videos based on titles
- Maintains your existing Video interface structure