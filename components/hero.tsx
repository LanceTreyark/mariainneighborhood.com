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
          className="object-cover object-[calc(50%_-_75px)_65%] md:object-[center_65%] lg:md:object-[center_65%]"
          priority
        />

        {/* Softer white-to-transparent fade */}
        <div className="absolute inset-0 " />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-center px-6">

        {/* Logo */}

        <div className="flex items-center justify-center text-center -translate-x-[55px] ">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative w-auto h-[10vh] sm:h-[12vh] md:h-[15vh] lg:h-[15vh] "
            style={{ aspectRatio: '1' }}
          >
            <Image
              /*src="/logo.png"*/
              src="/squareLogo.jpeg"
              alt="Maria in the Neighborhood"
              fill
              className="object-contain drop-shadow-[0_2px_2px_rgba(0,0,0,0.30)]"
              priority
            />
          </motion.div>
        </div>

      </div> 
    </section>
  );
}