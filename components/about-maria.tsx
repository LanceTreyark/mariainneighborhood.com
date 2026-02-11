"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export function AboutMaria() {
  return (
    <section className="bg-gray-50 px-6 py-8">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-lg border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center">
            {/* Image */}
            <div className="flex-shrink-0 order-1 lg:order-1">
              <div className="relative h-64 w-64 overflow-hidden rounded-lg">
                <Image
                  src="/newAbout.jpeg"
                  alt="Maria"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 space-y-4 order-2 lg:order-2 lg:pl-12">
              <motion.h2
                initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
                whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-3xl font-bold text-gray-900"
              >
                About Maria
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
                whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-base leading-relaxed text-gray-600"
              >
                Born in Rio de Janeiro and now calling La Jolla home, Maria
                brings warmth, curiosity, and a knack for discovering people's
                stories. Her short-format videos spotlight local makers,
                neighbors, and the places that make the town unique.
              </motion.p>
              <Link
                href="/about"
                className="inline-block rounded-md border border-gray-300 bg-transparent px-6 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:border-[#dcbbb4] hover:text-[#dcbbb4]"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
