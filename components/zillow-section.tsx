"use client";

import Link from "next/link";
import { Home, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

export function ZillowSection() {
  return (
    <section className="bg-gray-50 px-6 py-8">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-lg border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-8">
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-[#dcbbb4] p-3">
              <Home size={32} className="text-black" />
            </div>
            <div className="flex-1 space-y-4">
              <motion.h2
                initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
                whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-3xl font-bold text-gray-900"
              >
                Explore La Jolla Homes with Maria
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
                whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-base leading-relaxed text-gray-600"
              >
                From neighborhood stories to dream homes - let your local La Jolla expert guide your real estate journey.
              </motion.p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/real-estate"
                  className="flex items-center gap-2 rounded-md bg-[#dcbbb4] px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-[#ccaaa4]"
                  onClick={() => {
                    // Analytics tracking
                    if (typeof window !== 'undefined' && window.gtag) {
                      window.gtag('event', 'homepage_real_estate_click', {
                        page_location: window.location.href,
                        cta_label: 'explore_homes_button',
                        widget_position: 'zillow_section'
                      });
                    }
                  }}
                >
                  Explore La Jolla Homes
                  <ExternalLink size={16} />
                </Link>
                <button
                  onClick={() => {
                    // Analytics tracking
                    if (typeof window !== 'undefined' && window.gtag) {
                      window.gtag('event', 'maria_zillow_profile_click', {
                        page_location: window.location.href,
                        cta_label: 'zillow_profile_button',
                        referrer_source: 'homepage_zillow_section'
                      });
                    }
                    window.open('https://www.zillow.com/profile/maria%20woodsca', '_blank');
                  }}
                  className="flex items-center gap-2 rounded-md border border-gray-300 bg-transparent px-6 py-3 text-sm font-medium text-gray-700 transition-colors hover:border-[#dcbbb4] hover:text-[#dcbbb4]"
                >
                  View Maria's Zillow Profile
                  <ExternalLink size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
