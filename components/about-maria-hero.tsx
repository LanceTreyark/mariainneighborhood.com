"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function AboutMariaHero() {
  return (
    <section className="bg-[#f5e6e3] px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left Side: Text Content */}
          <div className="space-y-8">
            {/* Title with Icon */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-3"
            >
              <div className="relative h-10 w-10">
                <Image
                  src="/asterisk.png"
                  alt=""
                  fill
                  className="object-contain"
                />
              </div>
              <h2 className="font-sans text-4xl font-bold tracking-tight text-[#dcbbb4] md:text-5xl">
                About Maria
              </h2>
            </motion.div>

            {/* Description Paragraphs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <p className="text-lg leading-relaxed text-gray-600 md:text-xl">
                Born in Rio de Janeiro and now calling La Jolla home, Maria
                brings warmth, curiosity, and a knack for discovering people's
                stories.
              </p>
              <p className="text-lg leading-relaxed text-gray-600 md:text-xl">
                Her short-format videos spotlight local makers, neighbors, and
                the places that make the town unique.
              </p>
            </motion.div>
          </div>

          {/* Right Side: Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative h-[400px] w-full max-w-md overflow-hidden rounded-2xl md:h-[500px]">
              <Image
                src="/about.jpg"
                alt="Maria"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
