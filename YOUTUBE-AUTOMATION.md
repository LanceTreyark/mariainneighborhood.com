# YouTube Video Automation

Automatically fetches and updates Maria's YouTube videos daily.

## Quick Setup

### 1. Get YouTube API Key
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create project → Enable "YouTube Data API v3"
3. Create API Key → Set restrictions to "None"
4. Copy the API key

### 2. Add GitHub Secrets
Go to: **GitHub repo → Settings → Secrets → Actions**

Add these secrets:
```
YOUTUBE_API_KEY = your_api_key_here
YOUTUBE_CHANNEL_ID = UC1JW75QcwNSsCMAUz5qgUYQ
```

### 3. Done!
- Runs daily at 6 AM UTC
- Auto-commits new videos
- Triggers deployment automatically
- Manual trigger: Actions → "Update YouTube Videos" → Run workflow

## Manual Update
```bash
npm run update-videos
```

## Files
- `.github/workflows/update-videos.yml` - Automation workflow
- `scripts/update-videos-curl.js` - Fetcher script
- `lib/videos-data.ts` - Generated video data

## Troubleshooting
- **API errors**: Check API key restrictions in Google Cloud Console
- **No updates**: Verify secrets are set in GitHub repo settings
- **Failed runs**: Check Actions tab for error details