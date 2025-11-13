"use client";

import Image from "next/image";
import { ScrollIndicator } from "./scroll-indicator";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center bg-white px-6 pt-20 dark:bg-black">
      <div className="relative z-10 mx-auto max-w-7xl text-center">
        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="my-12 text-sm uppercase tracking-widest text-gray-600 dark:text-gray-400"
        >
          La Jolla: People, Place, Possibility
        </motion.p>

        {/* Main Heading with Image */}
        <div className="relative mb-12">
          <motion.h1
            initial={{ opacity: 0, filter: "blur(10px)", y: 30 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="font-heading text-[clamp(4rem,15vw,12rem)] font-bold leading-none tracking-tight text-black dark:text-[#d4ff00]"
          >
            MARIA IN
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, filter: "blur(10px)", y: 30 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="font-heading text-[clamp(4rem,15vw,12rem)] font-bold leading-none tracking-tight text-black dark:text-[#d4ff00]"
          >
            NEIGHBORHOOD
          </motion.h1>

          {/* Profile Image - Absolute Centered */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="custom-cursor absolute left-1/2 top-1/2 h-[clamp(5rem,12.5vw,10rem)] w-[clamp(4rem,10vw,8rem)] -translate-x-1/2 -translate-y-1/2"
          >
            <Image
              src="/mariaProfile.jpg"
              alt="Maria"
              fill
              className="rounded-full object-cover"
              priority
            />
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="mb-8 flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <ScrollIndicator />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
