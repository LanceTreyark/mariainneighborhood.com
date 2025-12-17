"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Home, Calendar, DollarSign, BarChart3 } from "lucide-react";

export default function MarketStats() {
  const stats = [
    {
      icon: DollarSign,
      label: "Median Home Price",
      value: "$2.8M",
      change: "+8.2%",
      trend: "up",
      period: "vs last year"
    },
    {
      icon: Calendar,
      label: "Days on Market",
      value: "28",
      change: "-12%",
      trend: "down",
      period: "vs last year"
    },
    {
      icon: Home,
      label: "Homes Sold",
      value: "156",
      change: "+15%",
      trend: "up",
      period: "last 30 days"
    },
    {
      icon: BarChart3,
      label: "Price per Sq Ft",
      value: "$1,247",
      change: "+6.8%",
      trend: "up",
      period: "vs last year"
    }
  ];

  const neighborhoods = [
    { name: "La Jolla Cove", price: "$3.2M", change: "+12%" },
    { name: "Bird Rock", price: "$2.1M", change: "+8%" },
    { name: "Muirlands", price: "$2.8M", change: "+5%" },
    { name: "La Jolla Shores", price: "$2.9M", change: "+10%" }
  ];

  return (
    <section className="bg-white px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            La Jolla Market Insights
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay informed with the latest market trends and data
          </p>
        </motion.div>

        {/* Market Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center"
            >
              <div className="bg-[#dcbbb4]/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-6 h-6 text-[#dcbbb4]" />
              </div>
              
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {stat.value}
              </div>
              
              <div className="text-sm font-medium text-gray-700 mb-2">
                {stat.label}
              </div>
              
              <div className={`flex items-center justify-center gap-1 text-sm ${
                stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.trend === 'up' ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                <span className="font-medium">{stat.change}</span>
                <span className="text-gray-500">{stat.period}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Neighborhood Breakdown */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Neighborhood Prices */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="rounded-lg border border-gray-200 bg-gray-50 p-8"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              Neighborhood Median Prices
            </h3>
            
            <div className="space-y-4">
              {neighborhoods.map((neighborhood, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900">
                      {neighborhood.name}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-900">
                      {neighborhood.price}
                    </div>
                    <div className="text-sm text-green-600 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      {neighborhood.change}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Market Summary */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="rounded-lg border border-gray-200 bg-gradient-to-br from-[#dcbbb4] to-[#ccaaa4] p-8 text-black"
          >
            <h3 className="text-xl font-bold mb-6">
              Market Summary
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm leading-relaxed">
                  <strong>Strong Seller's Market:</strong> Low inventory and high demand continue to drive prices up across all La Jolla neighborhoods.
                </p>
              </div>
              
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm leading-relaxed">
                  <strong>Luxury Segment Growth:</strong> Properties over $3M are seeing the strongest appreciation, particularly ocean-view homes.
                </p>
              </div>
              
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm leading-relaxed">
                  <strong>Quick Sales:</strong> Well-priced homes are selling faster than ever, often with multiple offers.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-black/20">
              <p className="text-sm font-medium">
                Want detailed market analysis for your specific needs?
              </p>
              <button
                onClick={() => {
                  document.querySelector('#contact-form')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="mt-2 text-sm underline hover:no-underline"
              >
                Get personalized market report →
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}