"use client";

import { Cloud, Calendar, MapPin, Home, Sun, CloudRain, Wind } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useWeather } from "@/hooks/use-weather";

const WeatherIcon = ({ condition }: { condition: string }) => {
  const conditionLower = condition.toLowerCase();
  
  if (conditionLower.includes("sunny") || conditionLower.includes("clear")) {
    return <Sun className="h-12 w-12 text-[#dcbbb4]" />;
  }
  if (conditionLower.includes("wind")) {
    return <Wind className="h-12 w-12 text-gray-400" />;
  }
  if (conditionLower.includes("rain") || conditionLower.includes("drizzle") || conditionLower.includes("shower")) {
    return <CloudRain className="h-12 w-12 text-blue-400" />;
  }
  return <Cloud className="h-12 w-12 text-gray-400" />;
};

export function WeatherWidget() {
  const { data, loading, error } = useWeather();

  // Fallback data for loading/error states
  const fallbackData = {
    currentTemp: 72,
    currentCondition: "Sunny",
    humidity: 65,
    precipitation: 0,
    windSpeed: 5,
    forecast: [
      { day: "Thu", high: 72, low: 60, condition: "Clear" },
      { day: "Fri", high: 70, low: 59, condition: "Partly cloudy" },
      { day: "Sat", high: 68, low: 57, condition: "Cloudy" },
      { day: "Sun", high: 69, low: 58, condition: "Sunny" },
      { day: "Mon", high: 71, low: 59, condition: "Clear" },
    ],
    hourlyTemps: [68, 70, 73, 74, 72, 70, 68, 65],
  };

  // Process real weather data
  let weatherData = fallbackData;
  
  if (data && !loading && !error) {
    const current = data.current_condition[0];
    const today = data.weather[0];
    
    // Get hourly temperatures for today (every 3 hours)
    const hourlyTemps = today.hourly
      .filter((_, index) => index % 3 === 0) // Every 3rd hour
      .slice(0, 8)
      .map(hour => parseInt(hour.tempF));

    // Create 5-day forecast
    const forecast = data.weather.slice(0, 5).map((day, index) => {
      const date = new Date(day.date);
      const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      // Use current condition as fallback since hourly might not have weatherDesc
      const dayCondition = current.weatherDesc[0]?.value || "Clear";
      return {
        day: index === 0 ? 'Today' : dayNames[date.getDay()],
        high: parseInt(day.maxtempF),
        low: parseInt(day.mintempF),
        condition: dayCondition
      };
    });

    weatherData = {
      currentTemp: parseInt(current.temp_F),
      currentCondition: current.weatherDesc[0]?.value || "Clear",
      humidity: parseInt(current.humidity),
      precipitation: parseFloat(current.precipMM) * 0.0393701, // Convert mm to inches
      windSpeed: parseInt(current.windspeedMiles),
      forecast,
      hourlyTemps: hourlyTemps.length > 0 ? hourlyTemps : fallbackData.hourlyTemps,
    };
  }

  const currentTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  if (loading) {
    return (
      <section id="weather-section" className="bg-gray-50 px-6 py-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-lg border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
              {/* Current Weather Skeleton */}
              <div className="space-y-3 md:col-span-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 animate-pulse rounded-full bg-gray-200" />
                    <div>
                      <div className="h-12 w-20 animate-pulse rounded bg-gray-200 mb-2" />
                      <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
                    </div>
                  </div>
                  <div className="text-right space-y-2">
                    <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
                    <div className="h-3 w-12 animate-pulse rounded bg-gray-200" />
                    <div className="h-3 w-14 animate-pulse rounded bg-gray-200" />
                  </div>
                </div>
                
                {/* Weather Details Skeleton */}
                <div className="grid grid-cols-3 gap-4 pt-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i}>
                      <div className="h-3 w-16 animate-pulse rounded bg-gray-200 mb-1" />
                      <div className="h-4 w-10 animate-pulse rounded bg-gray-200" />
                    </div>
                  ))}
                </div>

                {/* Temperature Chart Skeleton */}
                <div className="pt-4">
                  <div className="flex items-end justify-between gap-1" style={{ height: "80px" }}>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                      <div key={i} className="flex flex-1 flex-col items-center gap-1">
                        <div className="h-3 w-6 animate-pulse rounded bg-gray-200" />
                        <div 
                          className="w-full animate-pulse rounded-t-sm bg-gray-200"
                          style={{ height: `${20 + (i * 5)}px` }}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 flex justify-between">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                      <div key={i} className="h-2 w-6 animate-pulse rounded bg-gray-200" />
                    ))}
                  </div>
                </div>
              </div>

              {/* 5-Day Forecast Skeleton */}
              <div className="space-y-3 md:col-span-2 lg:col-span-3">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-pulse rounded bg-gray-200" />
                  <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
                </div>
                <div className="grid grid-cols-5 gap-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex flex-col items-center gap-2 rounded-lg bg-white/50 p-3">
                      <div className="h-3 w-8 animate-pulse rounded bg-gray-200" />
                      <div className="h-12 w-12 animate-pulse rounded-full bg-gray-200" />
                      <div className="text-center space-y-1">
                        <div className="h-4 w-6 animate-pulse rounded bg-gray-200" />
                        <div className="h-3 w-6 animate-pulse rounded bg-gray-200" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sidebar Skeletons */}
              {[1, 2, 3].map((section) => (
                <div key={section} className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-pulse rounded bg-gray-200" />
                    <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
                  </div>
                  <div className="space-y-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-4 w-full animate-pulse rounded bg-gray-200" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="weather-section" className="bg-gray-50 px-6 py-8">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-lg border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
            {/* Current Weather */}
            <div className="space-y-3 md:col-span-2">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                <WeatherIcon condition={weatherData.currentCondition} />
                  <div>
                    <p className="text-5xl font-bold text-gray-900">
                      {weatherData.currentTemp}°
                    </p>
                    <p className="text-sm text-gray-500">
                      {weatherData.currentCondition}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    Weather {error && <span className="text-red-500 text-xs">(offline)</span>}
                  </p>
                  <p className="text-xs text-gray-500">
                    {currentTime}
                  </p>
                  <p className="text-xs text-gray-500">
                    La Jolla
                  </p>
                </div>
              </div>
              
              {/* Weather Details */}
              <div className="grid grid-cols-3 gap-4 pt-3">
                <div>
                  <p className="text-xs text-gray-500">
                    Precipitation
                  </p>
                  <p className="text-sm font-medium text-gray-900">
                    {weatherData.precipitation.toFixed(1)}"
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">
                    Humidity
                  </p>
                  <p className="text-sm font-medium text-gray-900">
                    {weatherData.humidity}%
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">
                    Wind
                  </p>
                  <p className="text-sm font-medium text-gray-900">
                    {weatherData.windSpeed} mph
                  </p>
                </div>
              </div>

              {/* Temperature Chart */}
              <div className="pt-4">
                <div className="flex items-end justify-between gap-1" style={{ height: "80px" }}>
                  {weatherData.hourlyTemps.map((temp, index) => {
                    const maxTemp = Math.max(...weatherData.hourlyTemps);
                    const minTemp = Math.min(...weatherData.hourlyTemps);
                    const height = ((temp - minTemp) / (maxTemp - minTemp)) * 60 + 20;
                    return (
                      <div key={index} className="flex flex-1 flex-col items-center gap-1">
                        <span className="text-[10px] text-gray-500">
                          {temp}°
                        </span>
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${height}px` }}
                          transition={{ duration: 0.8, delay: index * 0.1 }}
                          className="w-full rounded-t-sm bg-gradient-to-t from-[#dcbbb4]/30 to-[#dcbbb4]"
                        />
                      </div>
                    );
                  })}
                </div>
                <div className="mt-2 flex justify-between text-[10px] text-gray-500">
                  <span>9AM</span>
                  <span>11AM</span>
                  <span>2PM</span>
                  <span>5PM</span>
                  <span>8PM</span>
                  <span>11PM</span>
                  <span>2AM</span>
                  <span>5AM</span>
                </div>
              </div>
            </div>

            {/* 5-Day Forecast */}
            <div className="space-y-3 md:col-span-2 lg:col-span-3">
              <div className="flex items-center gap-2">
                <Cloud size={16} className="text-[#dcbbb4]" />
                <p className="text-sm uppercase tracking-wide text-gray-500">
                  5-Day Forecast
                </p>
              </div>
              <div className="grid grid-cols-5 gap-3">
                {weatherData.forecast.map((day, index) => (
                  <motion.div
                    key={day.day}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex flex-col items-center gap-2 rounded-lg bg-white/50 p-3"
                  >
                    <p className="text-xs font-medium text-gray-700">
                      {day.day}
                    </p>
                    <WeatherIcon condition={day.condition} />
                    <div className="text-center">
                      <p className="text-sm font-bold text-gray-900">
                        {day.high}°
                      </p>
                      <p className="text-xs text-gray-500">
                        {day.low}°
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Neighborhood Calendar */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-[#dcbbb4]" />
                <p className="text-sm font-semibold uppercase tracking-wide text-gray-700">
                  <a href="https://lajollabythesea.com/events/" target="_blank" rel="noopener noreferrer">Neighborhood Calendar</a>
                </p>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <a href="https://lajollabythesea.com/event-details/?id=art-exhibit-all-shall-be-well" target="_blank" rel="noopener noreferrer"><p>Art Exhibit - All Shall Be Well -Jan 14th-Mar 7th</p></a>
                <a href="https://lajollabythesea.com/event-details/?id=la-jolla-open-aire-market-httpslocalaarporgeventla-jolla-open-aire-market-2025-12-07-la-jolla-cahtml&date=2026-01-18-09-00" target="_blank" rel="noopener noreferrer"><p>La Jolla Open Aire Market - Sun Jan 18th</p></a>
                <a href="https://lajollabythesea.com/event-details/?id=tuesday-night-potluck-2&date=2026-01-20-19-00" target="_blank" rel="noopener noreferrer"><p>Tuesday Night Potluck - Open Mic Comedy - Tue Jan 20th</p></a>
              </div>
            </div>

            {/* Best of La Jolla */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-[#dcbbb4]" />
                <a href="https://lajollamom.com/things-to-do-in-la-jolla/" target="_blank" rel="noopener noreferrer" ><p className="text-sm font-semibold uppercase tracking-wide text-gray-700">
                  Best of La Jolla
                </p></a>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <a href="https://www.opentable.com/dukes-la-jolla" target="_blank" rel="noopener noreferrer"><p>Duke's La Jolla - <i>Restaurants</i></p></a>
                <a href="https://lajollamom.com/things-to-do-la-jolla-shores-beach/" target="_blank" rel="noopener noreferrer"><p>La Jolla Shores Beach - <i>Places</i></p></a>
                <a href="https://www.opentable.com/r/javiers-la-jolla" target="_blank" rel="noopener noreferrer"><p>Javier's - La Jolla - <i>Restaurants</i></p></a>
              </div>
            </div>

            {/* Zillow Home Spotlight */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Home size={16} className="text-[#dcbbb4]" />
                <p className="text-sm font-semibold uppercase tracking-wide text-gray-700">
                  Zillow Home Spotlight
                </p>
              </div>
              <p className="text-sm text-gray-600">
                Featured Home of the Week —{" "}
                <Link
                  href="/real-estate"
                  className="text-[#dcbbb4] underline hover:no-underline"
                >
                  Explore La Jolla Homes
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
