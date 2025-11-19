"use client";

import { Cloud, Calendar, MapPin, Home, Sun, CloudRain, Wind } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const WeatherIcon = ({ condition }: { condition: string }) => {
  switch (condition.toLowerCase()) {
    case "sunny":
    case "clear":
    case "calm":
      return <Sun className="h-12 w-12 text-[#dcbbb4]" />;
    case "windy":
      return <Wind className="h-12 w-12 text-gray-400" />;
    case "rainy":
      return <CloudRain className="h-12 w-12 text-blue-400" />;
    default:
      return <Cloud className="h-12 w-12 text-gray-400" />;
  }
};

export function WeatherWidget() {
  const currentTemp = 72;
  const currentCondition = "Sunny";
  const humidity = 65;
  const precipitation = 0;
  const windSpeed = 5;

  const forecast = [
    { day: "Thu", high: 72, low: 60, condition: "Calm" },
    { day: "Fri", high: 70, low: 59, condition: "Windy" },
    { day: "Sat", high: 68, low: 57, condition: "Surf" },
    { day: "Sun", high: 69, low: 58, condition: "Sunny" },
    { day: "Mon", high: 71, low: 59, condition: "Clear" },
  ];

  const hourlyTemps = [68, 70, 73, 74, 72, 70, 68, 65];

  const currentTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <section id="weather-section" className="bg-gray-50 px-6 py-8">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-lg border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
            {/* Current Weather */}
            <div className="space-y-3 md:col-span-2">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <WeatherIcon condition={currentCondition} />
                  <div>
                    <p className="text-5xl font-bold text-gray-900">
                      {currentTemp}°
                    </p>
                    <p className="text-sm text-gray-500">
                      {currentCondition}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    Weather
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
                    {precipitation}%
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">
                    Humidity
                  </p>
                  <p className="text-sm font-medium text-gray-900">
                    {humidity}%
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">
                    Wind
                  </p>
                  <p className="text-sm font-medium text-gray-900">
                    {windSpeed} mph
                  </p>
                </div>
              </div>

              {/* Temperature Chart */}
              <div className="pt-4">
                <div className="flex items-end justify-between gap-1" style={{ height: "80px" }}>
                  {hourlyTemps.map((temp, index) => {
                    const maxTemp = Math.max(...hourlyTemps);
                    const minTemp = Math.min(...hourlyTemps);
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
                {forecast.map((day, index) => (
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
                  Neighborhood Calendar
                </p>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <p>Sat Farmers Market — 9am</p>
                <p>Sun Art Walk — 3pm</p>
                <p>Monthly Beach Cleanup — 8am</p>
              </div>
            </div>

            {/* Best of La Jolla */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-[#dcbbb4]" />
                <p className="text-sm font-semibold uppercase tracking-wide text-gray-700">
                  Best of La Jolla
                </p>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <p>Hidden Cove Café</p>
                <p>Ocean View Bookshop</p>
                <p>Pier Street Tacos</p>
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
                  href="/zillow"
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
