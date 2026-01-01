"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden pt-12">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero.jpg"
          alt="La Jolla aerial view"
          fill
          className="object-cover"
          priority
        />

        {/* Softer white-to-transparent fade */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl items-center px-6">

        {/* Maria Image */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 block md:block pointer-events-none"
        >
          <div
            className="
              relative
              -ml-18
              sm:-ml-35
              md:-ml-35
              h-[260px] w-[160px]
              sm:h-[320px] sm:w-[200px]
              md:h-[735px] md:w-[455px]
              lg:h-[875px] lg:w-[525px]
              overflow-hidden
              [mask-image:linear-gradient(to_bottom,black_66%,rgba(0,0,0,0.6)_80%,transparent)]
            "
          >
            <Image
              src="/mariaUmbrella.png"
              alt="Maria"
              fill
              className="object-contain"
              priority
            />
          </div>
        </motion.div>

        {/* Logo */}
        <div className="flex items-center justify-center text-center lg:justify-start lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative h-20 w-80 -ml-18 sm:-ml-35 lg:-ml-0 md:-ml-38 sm:h-50 sm:w-[500px] md:h-56 md:w-[560px]"
          >
            <Image
              src="/logo.png"
              alt="Maria in the Neighborhood"
              fill
              className="object-contain"
              priority
            />
          </motion.div>
        </div>

      </div> {/* ← MISSING CLOSING DIV (fixed) */}
    </section>
  );
}