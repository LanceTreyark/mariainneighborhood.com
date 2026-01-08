import { useState, useEffect } from 'react';

interface WeatherData {
  current_condition: Array<{
    temp_F: string;
    weatherDesc: Array<{ value: string }>;
    humidity: string;
    precipMM: string;
    windspeedMiles: string;
  }>;
  weather: Array<{
    date: string;
    maxtempF: string;
    mintempF: string;
    hourly: Array<{
      time: string;
      tempF: string;
      weatherDesc?: Array<{ value: string }>;
    }>;
  }>;
}

export function useWeather() {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchWeather() {
      try {
        setError(null); // Clear previous errors
        const response = await fetch('/api/weather');
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        const weatherData = await response.json();
        
        // Check if we got valid weather data
        if (weatherData && weatherData.current_condition && weatherData.weather) {
          setData(weatherData);
        } else {
          throw new Error('Invalid weather data format');
        }
      } catch (err) {
        console.error('Weather fetch error:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    fetchWeather();
    
    // Refresh every 30 minutes
    const interval = setInterval(fetchWeather, 30 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  return { data, loading, error };
}