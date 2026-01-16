"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function AboutMariaHero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/laugh.JPG"
          alt="About Maria"
          fill
          className="object-cover"
          priority
        />
        {/* Pink gradient overlay from left */}
        {/*<div className="absolute inset-0 bg-gradient-to-l from-[#f5e6e3]/80 via-[#f5e6e3]/80 via-10% to-transparent" />*/}
        <div className="absolute inset-0" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 mx-auto flex w-full max-w-6xl items-center px-6 py-12">
        <div className="grid w-full items-center gap-12 lg:grid-cols-2">
          {/* Left Side: Empty Spacer */}
          <div className="space-y-8"></div>
          {/* right Side: Logo and Title */}
          <div className="space-y-8">
            {/* Logo */}
            {/* 
                        <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative h-32 w-full max-w-md md:h-40"
            >
              <Image
                src="/logo.png"
                alt="Maria in the Neighborhood"
                fill
                className="object-contain object-left saturate-200 contrast-100 drop-shadow-[0_2px_2px_rgba(0,0,0,0.30)] display-none"
                priority
              />
            </motion.div>
            */}

            {/* Title with Icon */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
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
              <h1 className="font-sans text-4xl font-bold tracking-tight text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.60)] md:text-5xl">
                About Maria
              </h1>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="space-y-4"
            >
              <p className="text-lg leading-relaxed text-white  md:text-xl drop-shadow-[0_4px_5px_rgba(0,0,0,0.60)] ">
                Born in Rio de Janeiro and now calling La Jolla home, Maria brings warmth, curiosity,
                and a knack for discovering people's stories.
              </p>
            </motion.div>
          </div>

          {/* Right Side: Maria Image */}
          {/*
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative h-80 w-64 overflow-hidden rounded-2xl border-4 border-[#dcbbb4] md:h-96 md:w-80">
              <Image
                src="/mariaProfile.jpg"
                alt="Maria"
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>
           */  }
        </div>
      </div>
    </section>
  );
}
