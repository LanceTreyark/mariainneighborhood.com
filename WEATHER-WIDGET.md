# Weather Widget Live Data Implementation

## Overview

The weather widget displays real-time weather information for La Jolla, California using the wttr.in API. It features live data fetching, graceful error handling, and a responsive design with skeleton loading states.

## Architecture

### Components Structure
```
components/weather-widget.tsx    # Main widget component
hooks/use-weather.ts            # Custom hook for data fetching
app/api/weather/route.ts        # Next.js API route (proxy)
```

## Implementation Details

### 1. API Route (`app/api/weather/route.ts`)

**Purpose**: Proxy server to fetch weather data from wttr.in API

**Features**:
- Fetches from `https://wttr.in/lajolla,California?format=j1`
- 8-second timeout for localhost compatibility
- Proper headers (`User-Agent: curl/7.68.0`, `Accept: application/json`)
- Comprehensive error handling with realistic fallback data
- Generates 5-day forecast with random variations for La Jolla climate

**Fallback Data**:
- Temperature range: 70-77°F (high), 58-65°F (low)
- Realistic hourly temperatures throughout the day
- Proper date formatting for forecast

### 2. Custom Hook (`hooks/use-weather.ts`)

**Purpose**: Manages weather data state and API calls

**Features**:
- Auto-refresh every 30 minutes
- Loading, error, and data states
- Data validation to ensure proper format
- Automatic error recovery

**Return Values**:
```typescript
{
  data: WeatherData | null,
  loading: boolean,
  error: string | null
}
```

### 3. Weather Widget Component (`components/weather-widget.tsx`)

**Purpose**: Renders the complete weather interface

**Sections**:
1. **Current Weather**: Temperature, condition, humidity, precipitation, wind
2. **Hourly Chart**: 8-hour temperature visualization with animations
3. **5-Day Forecast**: Daily highs/lows with weather icons
4. **Neighborhood Info**: Calendar, local spots, Zillow integration

## Data Flow

```
1. Component mounts → useWeather hook triggered
2. Hook calls /api/weather endpoint
3. API route fetches from wttr.in (or returns fallback)
4. Data processed and displayed in widget
5. Auto-refresh every 30 minutes
```

## Loading States

### Skeleton Loader
- Matches exact widget layout
- Animated pulse effects on all placeholders
- Realistic sizing for temperature, icons, and text
- 5 forecast cards with proper spacing
- Sidebar sections with content placeholders

## Error Handling

### Graceful Degradation
1. **API Timeout**: 8-second limit with AbortController
2. **Network Errors**: Automatic fallback to realistic data
3. **Invalid Data**: Validation with fallback on format issues
4. **Display**: Shows "(offline)" indicator when using fallback

## Weather Icons

Dynamic icon selection based on conditions:
- **Sunny/Clear**: Sun icon
- **Windy**: Wind icon  
- **Rain/Drizzle/Shower**: CloudRain icon
- **Default**: Cloud icon

## Data Processing

### Temperature Conversion
- Precipitation: mm to inches (`precipMM * 0.0393701`)
- All temperatures displayed in Fahrenheit
- Hourly data filtered (every 3rd hour, max 8 points)

### Forecast Generation
- Uses current condition for all forecast days
- Proper day name calculation
- "Today" for current day, day names for others

## Configuration

### Refresh Interval
```javascript
const interval = setInterval(fetchWeather, 30 * 60 * 1000); // 30 minutes
```

### Location
Currently hardcoded to La Jolla, California. To change location:
1. Update API route URL: `wttr.in/{new-location}?format=j1`
2. Update fallback data temperature ranges
3. Update display text in widget

## Development Notes

### Localhost Compatibility
- Reduced timeout (8s vs 10s) for local development
- Enhanced fallback system for when external API is unreachable
- Console logging for debugging API calls

### Performance
- Data cached in component state
- Automatic cleanup of intervals on unmount
- Efficient re-renders with proper dependency arrays

## Usage

The widget is automatically included in the homepage:

```tsx
import { WeatherWidget } from "@/components/weather-widget";

export default function Home() {
  return (
    <>
      {/* Other components */}
      <WeatherWidget />
      {/* Other components */}
    </>
  );
}
```

## API Response Format

### wttr.in Response Structure
```json
{
  "current_condition": [{
    "temp_F": "72",
    "weatherDesc": [{"value": "Partly Cloudy"}],
    "humidity": "68",
    "precipMM": "0.0",
    "windspeedMiles": "7"
  }],
  "weather": [{
    "date": "2026-01-08",
    "maxtempF": "75",
    "mintempF": "65",
    "hourly": [{
      "time": "0",
      "tempF": "68"
    }]
  }]
}
```

## Future Enhancements

### Potential Improvements
1. **Location Detection**: Use geolocation or IP-based location
2. **Multiple Locations**: Support for different neighborhoods
3. **Weather Alerts**: Integration with weather warnings
4. **Historical Data**: Show temperature trends
5. **User Preferences**: Celsius/Fahrenheit toggle
6. **Caching**: Redis or database caching for API responses

### Accessibility
- All icons have proper alt text through Lucide React
- Semantic HTML structure
- Proper color contrast ratios
- Keyboard navigation support

## Troubleshooting

### Common Issues
1. **500 Error**: Check console logs, fallback data should still work
2. **No Data**: Verify internet connection and wttr.in availability
3. **Stale Data**: Check 30-minute refresh interval
4. **Layout Issues**: Verify Tailwind CSS classes are properly loaded

### Debug Steps
1. Check browser console for API errors
2. Test `/api/weather` endpoint directly
3. Verify wttr.in accessibility: `curl "https://wttr.in/lajolla,California?format=j1"`
4. Check component state in React DevTools