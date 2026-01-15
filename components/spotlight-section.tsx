"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function SpotlightSection() {
  const spotlights = [
    {
      title: "Event Spotlight",
      description: "Art Exhibit - All Shall Be Well -Jan 14th-Mar 7th",
      image: "/art.webp",
    },
    {
      title: "Local Spotlight",
      description: "Pearl Street Tacos - Maria's go-to after a surf",
      image: "/pearl.jpg",
    },
    {
      title: "People of La Jolla",
      description: "Meet Tim Bessell - Surfboard Artist, shaper and local legend",
      image: "/timB.jpg",
    },
  ];

  return (
    <section className="bg-[#f5e6e3] px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 md:grid-cols-3">
          {spotlights.map((spotlight, index) => (
            <motion.div
              key={spotlight.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="overflow-hidden rounded-3xl bg-white p-6"
            >
              {/* Title with Icon */}
              <div className="mb-4 flex items-start gap-3">
                <div className="relative mt-1 h-6 w-6 flex-shrink-0">
                  <Image
                    src="/asterisk.png"
                    alt=""
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-sans text-xl font-semibold tracking-tight text-gray-400">
                    {spotlight.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-500">
                    {spotlight.description}
                  </p>
                </div>
              </div>

              {/* Image */}
              <div className="relative h-48 overflow-hidden rounded-2xl">
                <Image
                  src={spotlight.image}
                  alt={spotlight.title}
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
