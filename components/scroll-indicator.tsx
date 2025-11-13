"use client";

export function ScrollIndicator() {
  return (
    <div className="flex flex-col items-center gap-4">
      {/* Scroll bar with animated yellow line */}
      <div className="relative h-8 w-1 overflow-hidden rounded-full bg-gray-700">
        <div className="absolute left-0 top-0 w-full animate-scroll-down bg-[#d4ff00]" />
      </div>

      {/* SCROLL text */}
      <p className="text-sm font-medium uppercase tracking-widest text-gray-600 dark:text-gray-400">
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
    </div>
  );
}
