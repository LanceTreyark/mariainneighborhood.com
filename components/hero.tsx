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
        <div className="absolute inset-0 bg-gradient-to-l from-white/50 via-white/10 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-center px-6">

        {/* Logo */}
        <div className="flex items-center justify-center text-center lg:justify-start lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative 
        h-50 w-[260px] 
        
        sm:h-50 sm:w-[500px] 
        md:h-56 md:w-[560px] "
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
    </section>
  );
}