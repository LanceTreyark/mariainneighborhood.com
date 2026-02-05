"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function RealEstateHero() {
  const handleZillowClick = () => {
    // Analytics tracking
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'maria_zillow_profile_click', {
        page_location: window.location.href,
        cta_label: 'hero_zillow_button',
        referrer_source: 'real_estate_page'
      });
    }

    window.open('https://www.zillow.com/profile/maria%20woodsca', '_blank');
  };

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero.jpg"
          alt="La Jolla real estate"
          fill
          className="object-cover"
          priority
        />
        {/* Pink gradient overlay from left */}
        { /*<div className="absolute inset-0 bg-gradient-to-r from-[#dcbbb4] via-[#dcbbb4]/70 via-40% to-transparent" /> */}
        <div className="absolute inset-0" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-center px-6 py-12">
         
        <div className="flex flex-col items-center gap-6">
        
          {/* Left Side: Content */}
         {/*}
          <div className="space-y-8">
            */}
            {/* Title with Icon */}
            {/*
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex items-center gap-2"
            >
              <div className="relative h-10 w-10">
                <Image
                  src="/asterisk.png"
                  alt=""
                  fill
                  className="object-contain"
                />
              </div>
              <h1 className="font-sans text-4xl font-bold tracking-tight text-black md:text-5xl">
                Real Estate
              </h1>
            </motion.div>
            */}
            {/* Description */}
            {/*
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="space-y-4"
            >
              <p className="text-lg leading-relaxed text-gray-700 md:text-xl">
                From neighborhood stories to dream homes - let Maria guide your La Jolla real estate journey with local expertise you can trust.
              </p>
            </motion.div>
              */}
          {/*
          </div>
            */}
          {/* Right Side: Maria Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center w-full md:w-auto"
          >
            <div className="relative aspect-[4/5] w-3/4 overflow-hidden rounded-3xl border-4 border-[#dcbbb4] md:h-[600px] md:w-[480px]">
              <Image
                src="/sothebyProfile.jpg"
                alt="Maria Woods - La Jolla Real Estate Expert"
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>
          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <button
              onClick={handleZillowClick}
              className="rounded-md bg-black px-8 py-4 text-lg font-medium text-white transition-colors hover:bg-gray-800"
            >
              Connect with Maria on Zillow
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}