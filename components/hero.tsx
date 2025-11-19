"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero.jpg"
          alt="La Jolla aerial view"
          fill
          className="object-cover"
          priority
        /> 
        {/* Pink gradient overlay from left */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#dcbbb4] via-[#dcbbb4]/70 via-40% to-transparent" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 mx-auto flex w-full max-w-5xl items-center px-6 py-12">
        <div className="grid w-full items-center gap-12 lg:grid-cols-2">
          {/* Left Side: Woman Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center lg:justify-start"
          >
            <div className="relative h-64 w-64 overflow-hidden rounded-full border-4 border-[#dcbbb4] md:h-80 md:w-80">
              <Image
                src="/hero-img.jpeg"
                alt="Maria"
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>

          {/* Right Side: Logo */}
          <div className="flex items-center justify-center text-center lg:justify-start lg:text-left">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative h-36 w-96 md:h-56 md:w-[560px]"
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
        </div>
      </div>
    </section>
  );
}
