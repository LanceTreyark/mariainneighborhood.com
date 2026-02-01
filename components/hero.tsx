"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden pt-12">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          /*src="/hero.jpg"*/
          src="/mariaHeroV4.JPG"
          alt="La Jolla aerial view"
          fill
          className="object-cover object-[center_65%]"
          priority
        />

        {/* Softer white-to-transparent fade */}
        <div className="absolute inset-0 bg-gradient-to-l from-white/50 via-white/10 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-start px-6">

        {/* Logo */}
        <div className="flex items-center justify-center text-center sm:justify-center lg:justify-start lg:text-left w-full sm:w-2/3 lg:w-1/3">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative w-full 
        h-80 
        sm:h-50 
        md:h-56
        lg:h-72"
          >
            <Image
              /*src="/logo.png"*/
              src="/minLogoV2.jpeg"
              alt="Maria in the Neighborhood"
              fill
              className="object-contain saturate-200 contrast-100 drop-shadow-[0_2px_2px_rgba(0,0,0,0.30)]"
              priority
            />
          </motion.div>
        </div>

      </div> 
    </section>
  );
}