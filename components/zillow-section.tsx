"use client";

import Link from "next/link";
import { Home, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

export function ZillowSection() {
  return (
    <section className="bg-gray-50 px-6 py-8 dark:bg-zinc-900">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-lg border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-8 dark:border-zinc-700 dark:from-zinc-800 dark:to-zinc-900">
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-[#d4ff00] p-3">
              <Home size={32} className="text-black" />
            </div>
            <div className="flex-1 space-y-4">
              <motion.h2
                initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
                whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-3xl font-bold text-gray-900 dark:text-white"
              >
                Explore La Jolla Homes
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
                whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-base leading-relaxed text-gray-600 dark:text-gray-400"
              >
                Curated Zillow listings and a weekly featured home. Click to see
                the full gallery and sign up for alerts.
              </motion.p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/zillow"
                  className="flex items-center gap-2 rounded-md bg-[#d4ff00] px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-[#c4ef00]"
                >
                  Explore La Jolla Homes
                  <ExternalLink size={16} />
                </Link>
                <Link
                  href="/partner"
                  className="flex items-center gap-2 rounded-md border border-gray-300 bg-transparent px-6 py-3 text-sm font-medium text-gray-700 transition-colors hover:border-[#d4ff00] hover:text-[#d4ff00] dark:border-zinc-600 dark:text-gray-300 dark:hover:border-[#d4ff00] dark:hover:text-[#d4ff00]"
                >
                  Partner with Maria
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
