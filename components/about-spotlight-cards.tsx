"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function AboutSpotlightCards() {
  const spotlights = [
    {
      title: "Event Spotlight",
      description: "Sunset Concert at the Pier - family friendly, free entry",
    },
    {
      title: "Local Spotlight",
      description: "Pier Street Tacos - Maria's go-to after a surf",
    },
    {
      title: "People of La Jolla",
      description: "Meet Carlos - Surf instructor and community mentor",
    },
  ];

  return (
    <section className="relative bg-[#f5e6e3] px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left Side: Spotlight Items */}
          <div className="space-y-8">
            {spotlights.map((spotlight, index) => (
              <motion.div
                key={spotlight.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="flex items-start gap-4"
              >
                <div className="relative mt-1 h-8 w-8 flex-shrink-0">
                  <Image
                    src="/asterisk.png"
                    alt=""
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <h3 className="mb-2 text-2xl font-bold text-gray-600 md:text-3xl">
                    {spotlight.title}
                  </h3>
                  <p className="text-base leading-relaxed text-gray-500 md:text-lg">
                    {spotlight.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Side: Rose Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative h-[400px] w-full max-w-lg md:h-[500px]">
              <Image
                src="/rose.png"
                alt="Rose"
                fill
                className="object-contain"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
