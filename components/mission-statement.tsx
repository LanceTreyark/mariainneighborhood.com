"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function MissionStatement() {
  return (
    <section className="bg-white py-16 px-6">
      <div className="mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-6 flex justify-center"
        >
          <div className="relative h-14 w-40">
            <Image
              src="/logo.png"
              alt="Maria in the Neighborhood"
              fill
              className="object-contain"
              priority
            />
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg leading-relaxed text-gray-700 md:text-xl"
        >
          Maria in the Neighborhood is a lighthearted local storytelling series
          celebrating the charm, beauty, and everyday magic of La Jolla. From
          coastal walks and hidden cafés to the people who give the village its
          character, Maria explores what makes this seaside community so special.
        </motion.p>
      </div>
    </section>
  );
}
