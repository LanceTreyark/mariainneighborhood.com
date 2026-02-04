"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

export function VideosHero() {
  return (
    <section className="relative flex min-h-[60vh] items-end overflow-hidden pt-20 pb-16">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/SANLB.jpg"
          alt="Videos Header - An Adobe Style Mansion"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 " />
      </div>

      {/* Content */}
    
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-16">
        <div className="mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center gap-4 mb-6"
          >
            {/*
            <div className="rounded-full bg-[#dcbbb4] p-4">
              <Play size={32} fill="black" className="text-black" />
            </div>
            */}
            <h1 className="text-3xl items-center tracking-tight text-white sm:text-4xl md:text-6xl lg:text-7xl">
              The Neighborhood
            </h1>
          </motion.div>
            {/*
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl leading-relaxed text-gray-700 md:text-2xl"
          >
            Explore La Jolla through Maria's lens. Discover local stories, hidden gems, and the vibrant community that makes this neighborhood special.
          </motion.p>
           */}
        </div>
       
      </div>
      
    </section>
    
  );
}
