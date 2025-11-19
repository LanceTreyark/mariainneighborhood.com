"use client";

export function ScrollIndicator() {
  const handleScroll = () => {
    const weatherSection = document.getElementById("weather-section");
    if (weatherSection) {
      weatherSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <button
      onClick={handleScroll}
      className="flex flex-col items-center gap-2 transition-opacity hover:opacity-70"
      aria-label="Scroll to content"
    >
      {/* Scroll bar with animated yellow line */}
      <div className="relative h-8 w-1 overflow-hidden rounded-full bg-gray-700">
        <div className="absolute left-0 top-0 w-full animate-scroll-down bg-[#dcbbb4]" />
      </div>

      {/* SCROLL text */}
      <p className="text-xs font-medium uppercase tracking-widest text-gray-600">
        Scroll
      </p>

      <style jsx>{`
        @keyframes scroll-down {
          0% {
            height: 0%;
            top: 0;
          }
          50% {
            height: 40%;
            top: 0;
          }
          100% {
            height: 0%;
            top: 100%;
          }
        }

        .animate-scroll-down {
          animation: scroll-down 2s ease-in-out infinite;
        }
      `}</style>
    </button>
  );
}
