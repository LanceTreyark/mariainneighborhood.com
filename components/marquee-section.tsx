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
        <div className="flex animate-marquee-right items-center whitespace-nowrap">
          {/* First set */}
          {items1.map((item, index) => (
            <div key={`row1-first-${index}`} className="flex items-center">
              <span className="font-heading text-7xl font-bold uppercase text-[#d4ff00] md:text-9xl">
                {item}
              </span>
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                className="mx-8 flex-shrink-0 text-gray-300 dark:text-zinc-800 md:mx-12"
              >
                <path
                  d="M24 0L27.708 20.292L48 24L27.708 27.708L24 48L20.292 27.708L0 24L20.292 20.292L24 0Z"
                  fill="currentColor"
                />
              </svg>
            </div>
          ))}
          {/* Duplicate set for seamless loop */}
          {items1.map((item, index) => (
            <div key={`row1-second-${index}`} className="flex items-center">
              <span className="font-heading text-7xl font-bold uppercase text-[#d4ff00] md:text-9xl">
                {item}
              </span>
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                className="mx-8 flex-shrink-0 text-gray-300 dark:text-zinc-800 md:mx-12"
              >
                <path
                  d="M24 0L27.708 20.292L48 24L27.708 27.708L24 48L20.292 27.708L0 24L20.292 20.292L24 0Z"
                  fill="currentColor"
                />
              </svg>
            </div>
          ))}
        </div>

        {/* Second row - moving left */}
        <div className="flex animate-marquee-left items-center whitespace-nowrap">
          {/* First set */}
          {items2.map((item, index) => (
            <div key={`row2-first-${index}`} className="flex items-center">
              <span className="font-heading text-7xl font-bold uppercase text-[#d4ff00] md:text-9xl">
                {item}
              </span>
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                className="mx-8 flex-shrink-0 text-gray-300 dark:text-zinc-800 md:mx-12"
              >
                <path
                  d="M24 0L27.708 20.292L48 24L27.708 27.708L24 48L20.292 27.708L0 24L20.292 20.292L24 0Z"
                  fill="currentColor"
                />
              </svg>
            </div>
          ))}
          {/* Duplicate set for seamless loop */}
          {items2.map((item, index) => (
            <div key={`row2-second-${index}`} className="flex items-center">
              <span className="font-heading text-7xl font-bold uppercase text-[#d4ff00] md:text-9xl">
                {item}
              </span>
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                className="mx-8 flex-shrink-0 text-gray-300 dark:text-zinc-800 md:mx-12"
              >
                <path
                  d="M24 0L27.708 20.292L48 24L27.708 27.708L24 48L20.292 27.708L0 24L20.292 20.292L24 0Z"
                  fill="currentColor"
                />
              </svg>
            </div>
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
