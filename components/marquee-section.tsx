"use client";

export function MarqueeSection() {
  const items1 = [
    "LA JOLLA",
    "COMMUNITY",
    "LOCAL STORIES",
    "NEIGHBORHOOD",
    "PEOPLE & PLACES",
    "DISCOVER",
  ];

  const items2 = [
    "SURF & SUN",
    "MARIA",
    "EXPLORE",
    "LOCAL FLAVOR",
    "STORIES",
    "NEIGHBORS",
  ];

  return (
    <section className="relative overflow-hidden bg-white py-12 dark:bg-black">
      {/* Fade overlays */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-white to-transparent dark:from-black md:w-48" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-white to-transparent dark:from-black md:w-48" />

      <div className="space-y-6">
        {/* First row - moving right */}
        <div className="flex animate-marquee-right whitespace-nowrap">
          {/* First set */}
          {items1.map((item, index) => (
            <span
              key={`row1-first-${index}`}
              className="mx-12 font-heading text-7xl font-bold uppercase text-[#d4ff00] md:text-9xl"
            >
              {item}
            </span>
          ))}
          {/* Duplicate set for seamless loop */}
          {items1.map((item, index) => (
            <span
              key={`row1-second-${index}`}
              className="mx-12 font-heading text-7xl font-bold uppercase text-[#d4ff00] md:text-9xl"
            >
              {item}
            </span>
          ))}
        </div>

        {/* Second row - moving left */}
        <div className="flex animate-marquee-left whitespace-nowrap">
          {/* First set */}
          {items2.map((item, index) => (
            <span
              key={`row2-first-${index}`}
              className="mx-12 font-heading text-7xl font-bold uppercase text-[#d4ff00] md:text-9xl"
            >
              {item}
            </span>
          ))}
          {/* Duplicate set for seamless loop */}
          {items2.map((item, index) => (
            <span
              key={`row2-second-${index}`}
              className="mx-12 font-heading text-7xl font-bold uppercase text-[#d4ff00] md:text-9xl"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee-right {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes marquee-left {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .animate-marquee-right {
          animation: marquee-right 40s linear infinite;
        }

        .animate-marquee-left {
          animation: marquee-left 40s linear infinite;
        }

        .animate-marquee-right:hover,
        .animate-marquee-left:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
