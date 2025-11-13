import { Calendar, Coffee, Users } from "lucide-react";

export function SpotlightSection() {
  const spotlights = [
    {
      icon: Calendar,
      title: "Event Spotlight",
      description:
        "Sunset Concert at the Pier — family-friendly, free entry.",
    },
    {
      icon: Coffee,
      title: "Local Bite",
      description: "Pier Street Tacos — Maria's go-to after a surf.",
    },
    {
      icon: Users,
      title: "People of La Jolla",
      description: "Meet Carlos — surf instructor and community mentor.",
    },
  ];

  return (
    <section className="bg-gray-50 px-6 py-8 dark:bg-zinc-900">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 md:grid-cols-3">
          {spotlights.map((spotlight) => (
            <div
              key={spotlight.title}
              className="rounded-lg border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-6 dark:border-zinc-700 dark:from-zinc-800 dark:to-zinc-900"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-full bg-[#d4ff00] p-2">
                  <spotlight.icon size={20} className="text-black" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  {spotlight.title}
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                {spotlight.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
