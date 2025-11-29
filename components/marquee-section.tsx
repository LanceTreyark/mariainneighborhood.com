"use client";

export function MarqueeSection() {
  const items1 = [
    { text: "Surf & Sun", style: "sans" },
    { text: "La Jolla", style: "script" },
    { text: "Local Flavors", style: "sans" },
  ];

  const items2 = [
    { text: "Discover", style: "script" },
    { text: "People & Places", style: "sans" },
    { text: "Neighborhood", style: "script" },
  ];

  return (
    <section className="relative overflow-hidden bg-[#c37173] py-8">
      {/* Pattern overlay with opacity */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url(/pattrn.png)",
          backgroundRepeat: "repeat-x",
          backgroundPosition: "center",
          backgroundSize: "auto 100%",
          opacity: 0.2,
        }}
      />
      
      <div className="relative z-10 space-y-4">
        {/* First row - moving right */}
        <div className="flex animate-marquee-right items-center whitespace-nowrap">
          {/* First set */}
          {items1.map((item, index) => (
            <span
              key={`row1-first-${index}`}
              className={`mx-6 text-5xl text-white md:mx-8 md:text-7xl ${
                item.style === "script"
                  ? "font-serif italic"
                  : "font-sans font-bold"
              }`}
            >
              {item.text}
            </span>
          ))}
          {/* Duplicate set for seamless loop */}
          {items1.map((item, index) => (
            <span
              key={`row1-second-${index}`}
              className={`mx-6 text-5xl text-white md:mx-8 md:text-7xl ${
                item.style === "script"
                  ? "font-serif italic"
                  : "font-sans font-bold"
              }`}
            >
              {item.text}
            </span>
          ))}
        </div>

        {/* Second row - moving left */}
        <div className="flex animate-marquee-left items-center whitespace-nowrap">
          {/* First set */}
          {items2.map((item, index) => (
            <span
              key={`row2-first-${index}`}
              className={`mx-6 text-5xl text-white md:mx-8 md:text-7xl ${
                item.style === "script"
                  ? "font-serif italic"
                  : "font-sans font-bold"
              }`}
            >
              {item.text}
            </span>
          ))}
          {/* Duplicate set for seamless loop */}
          {items2.map((item, index) => (
            <span
              key={`row2-second-${index}`}
              className={`mx-6 text-5xl text-white md:mx-8 md:text-7xl ${
                item.style === "script"
                  ? "font-serif italic"
                  : "font-sans font-bold"
              }`}
            >
              {item.text}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
