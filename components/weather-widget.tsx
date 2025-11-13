import { Cloud, Calendar, MapPin, Home } from "lucide-react";
import Link from "next/link";

export function WeatherWidget() {
  const forecast = [
    { day: "Thu", high: 72, low: 60, condition: "Calm" },
    { day: "Fri", high: 70, low: 59, condition: "Windy" },
    { day: "Sat", high: 68, low: 57, condition: "Surf" },
    { day: "Sun", high: 69, low: 58, condition: "Sunny" },
    { day: "Mon", high: 71, low: 59, condition: "Clear" },
  ];

  const currentTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <section className="bg-gray-50 px-6 py-8 dark:bg-zinc-900">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-lg border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-6 dark:border-zinc-700 dark:from-zinc-800 dark:to-zinc-900">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
            {/* Local Time */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Cloud size={16} className="text-[#d4ff00]" />
                <p className="text-sm uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Local Time
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {currentTime}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  La Jolla (America/Los_Angeles)
                </p>
              </div>
            </div>

            {/* 5-Day Forecast */}
            <div className="space-y-3 md:col-span-2 lg:col-span-2">
              <div className="flex items-center gap-2">
                <Cloud size={16} className="text-[#d4ff00]" />
                <p className="text-sm uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  5-Day Forecast
                </p>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {forecast.map((day) => (
                  <div
                    key={day.day}
                    className="text-center text-sm text-gray-700 dark:text-gray-300"
                  >
                    <p className="mb-1 font-medium">{day.day}</p>
                    <p className="text-xs">
                      {day.high}°/{day.low}°
                    </p>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      {day.condition}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Neighborhood Calendar */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-[#d4ff00]" />
                <p className="text-sm font-semibold uppercase tracking-wide text-gray-700 dark:text-gray-300">
                  Neighborhood Calendar
                </p>
              </div>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <p>Sat Farmers Market — 9am</p>
                <p>Sun Art Walk — 3pm</p>
                <p>Monthly Beach Cleanup — 8am</p>
              </div>
            </div>

            {/* Best of La Jolla */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-[#d4ff00]" />
                <p className="text-sm font-semibold uppercase tracking-wide text-gray-700 dark:text-gray-300">
                  Best of La Jolla
                </p>
              </div>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <p>Hidden Cove Café</p>
                <p>Ocean View Bookshop</p>
                <p>Pier Street Tacos</p>
              </div>
            </div>
          </div>

          {/* Zillow Home Spotlight - Full Width */}
          <div className="mt-6 space-y-3 border-t border-gray-200 pt-6 dark:border-zinc-700">
            <div className="flex items-center gap-2">
              <Home size={16} className="text-[#d4ff00]" />
              <p className="text-sm font-semibold uppercase tracking-wide text-gray-700 dark:text-gray-300">
                Zillow Home Spotlight
              </p>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Featured Home of the Week —{" "}
              <Link
                href="/zillow"
                className="text-[#d4ff00] underline hover:no-underline dark:text-[#d4ff00]"
              >
                Explore La Jolla Homes
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
