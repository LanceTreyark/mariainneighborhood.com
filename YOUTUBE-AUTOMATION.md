# Content Automation

Automatically fetches and updates Maria's YouTube videos and Zillow listings.

## YouTube Videos

### Quick Setup
1. **Get YouTube API Key**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create project → Enable "YouTube Data API v3"
   - Create API Key → Set restrictions to "None"

2. **Add GitHub Secrets**
   ```
   YOUTUBE_API_KEY = your_api_key_here
   YOUTUBE_CHANNEL_ID = UC1JW75QcwNSsCMAUz5qgUYQ
   ```

3. **Manual Update**
   ```bash
   npm run update-videos
   ```

## Zillow Listings

### Quick Setup
1. **Get RapidAPI Key (Optional)**
   - Go to [RapidAPI](https://rapidapi.com/)
   - Subscribe to Zillow API
   - Copy your API key

2. **Add to Environment**
   ```bash
   # Add to .env.local
   RAPIDAPI_KEY=your_rapidapi_key_here
   ```

3. **Manual Update**
   ```bash
   npm run update-listings
   ```

### How Listings Work
- **With API Key**: Fetches real La Jolla listings via RapidAPI
- **Without API Key**: Creates realistic sample listings
- **Always Works**: Falls back gracefully to sample data
- **Updates File**: Generates `lib/zillow-api.ts` automatically

## Automation
- Runs daily at 6 AM UTC via GitHub Actions
- Auto-commits new content when found
- Triggers deployment automatically
- Manual trigger available in Actions tab

## Files
- `scripts/update-videos-curl.js` - YouTube fetcher
- `scripts/update-listings.js` - Zillow fetcher  
- `lib/videos-data.ts` - Generated video data
- `lib/zillow-api.ts` - Generated listing data
- `.github/workflows/update-videos.yml` - Automation workflow

## Troubleshooting
- **API errors**: Check API key restrictions
- **No updates**: Verify secrets in GitHub settings
- **Failed runs**: Check Actions tab for details