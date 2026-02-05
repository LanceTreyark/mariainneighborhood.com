"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";

export function ContactHero() {
  return (
    <section className="relative flex min-h-[60vh] items-center overflow-hidden pt-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images.jpeg"
          alt="Contact"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 " />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-16">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6 flex items-center gap-4"
          >
            <div className="rounded-full bg-[#ffffff] p-4">
              <Mail size={32} className="text-black" />
            </div>
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 md:text-6xl lg:text-7xl">
              Get in Touch
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl leading-relaxed text-gray-700 md:text-2xl"
          >
            Have a story to share? Want to collaborate? Let's connect and explore La Jolla together.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
