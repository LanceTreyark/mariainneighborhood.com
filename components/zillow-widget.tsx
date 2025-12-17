"use client";

import { motion } from "framer-motion";
import { ExternalLink, TrendingUp, Home, Star } from "lucide-react";

export default function ZillowWidget() {
  const handleZillowClick = (source: string) => {
    // Analytics tracking as specified in Zillow.md
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'maria_zillow_click', {
        page_location: window.location.href,
        cta_label: source,
        referrer_source: 'zillow_widget'
      });
    }
    
    window.open('https://www.zillow.com/profile/maria%20woodsca', '_blank');
  };

  const stats = [
    { label: "Active Listings", value: "12+" },
    { label: "Avg Days on Market", value: "18" },
    { label: "Client Rating", value: "5.0★" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="rounded-lg border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-6"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-[#dcbbb4] p-2 rounded-full">
          <Home className="w-5 h-5 text-black" />
        </div>
        <div>
          <h3 className="font-bold text-gray-900">Maria Woods</h3>
          <p className="text-sm text-gray-600">La Jolla Real Estate Expert</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="font-bold text-gray-900">{stat.value}</div>
            <div className="text-xs text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* CTA Buttons */}
      <div className="space-y-3">
        <button
          onClick={() => handleZillowClick('widget_view_profile')}
          className="w-full flex items-center justify-center gap-2 rounded-md bg-[#dcbbb4] px-4 py-3 font-medium text-black transition-colors hover:bg-[#ccaaa4]"
        >
          View Full Zillow Profile
          <ExternalLink className="w-4 h-4" />
        </button>
        
        <button
          onClick={() => {
            document.querySelector('#contact-form')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="w-full flex items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-3 font-medium text-gray-700 transition-colors hover:border-[#dcbbb4] hover:text-[#dcbbb4]"
        >
          Get Market Analysis
          <TrendingUp className="w-4 h-4" />
        </button>
      </div>

      {/* Trust Badge */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span>Featured in "Maria in the Neighborhood"</span>
        </div>
      </div>
    </motion.div>
  );
}