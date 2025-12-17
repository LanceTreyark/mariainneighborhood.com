"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Star, Award, Users, MapPin, Play, ExternalLink } from "lucide-react";

export default function MariaExpertise() {
  const achievements = [
    {
      icon: Star,
      title: "5-Star Reviews",
      description: "Consistently rated 5 stars by clients for exceptional service and market knowledge."
    },
    {
      icon: Award,
      title: "Top Producer",
      description: "Recognized as a top-performing agent in the La Jolla luxury market."
    },
    {
      icon: Users,
      title: "Community Leader",
      description: "Host of 'Maria in the Neighborhood' showcasing local businesses and culture."
    },
    {
      icon: MapPin,
      title: "Local Expert",
      description: "Born and raised in La Jolla with deep roots and insider market knowledge."
    }
  ];

  const handleZillowProfile = () => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'maria_zillow_profile_click', {
        page_location: window.location.href,
        cta_label: 'expertise_section',
        referrer_source: 'maria_expertise'
      });
    }
    
    window.open('https://www.zillow.com/profile/maria%20woodsca', '_blank');
  };

  return (
    <section className="bg-white px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          {/* Left Side: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Why Choose Maria Woods?
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Combining deep local knowledge with professional expertise, Maria brings a unique perspective to La Jolla real estate through her community connections and market insights.
              </p>
            </div>

            {/* Achievements Grid */}
            <div className="grid gap-6 sm:grid-cols-2">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3"
                >
                  <div className="bg-[#dcbbb4]/20 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                    <achievement.icon className="w-5 h-5 text-[#dcbbb4]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {achievement.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {achievement.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleZillowProfile}
                className="flex items-center justify-center gap-2 rounded-md bg-[#dcbbb4] px-6 py-3 font-medium text-black transition-colors hover:bg-[#ccaaa4]"
              >
                View Zillow Profile
                <ExternalLink className="w-4 h-4" />
              </button>
              
              <button
                onClick={() => {
                  window.open('/videos', '_blank');
                }}
                className="flex items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 transition-colors hover:border-[#dcbbb4] hover:text-[#dcbbb4]"
              >
                <Play className="w-4 h-4" />
                Watch Maria's Videos
              </button>
            </div>
          </motion.div>

          {/* Right Side: Image & Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Maria's Photo */}
            <div className="relative">
              <div className="relative h-80 w-full overflow-hidden rounded-2xl border-4 border-[#dcbbb4]">
                <Image
                  src="/mariaProfile.jpg"
                  alt="Maria Woods - La Jolla Real Estate Expert"
                  fill
                  className="object-cover"
                />
              </div>
              
              {/* Floating Stats Card */}
              <div className="absolute -bottom-6 -right-6 rounded-lg border border-gray-200 bg-white p-6 shadow-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">40+</div>
                  <div className="text-sm text-gray-600">Video Episodes</div>
                </div>
              </div>
            </div>

            {/* Quote Card */}
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
              <blockquote className="text-gray-700 italic mb-4">
                "La Jolla isn't just where I work—it's where I live, where I raise my family, and where I've built lasting relationships. I bring that personal connection to every client interaction."
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 overflow-hidden rounded-full">
                  <Image
                    src="/mariaProfile.jpg"
                    alt="Maria Woods"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="font-medium text-gray-900">Maria Woods</div>
                  <div className="text-sm text-gray-600">Real Estate Professional</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}