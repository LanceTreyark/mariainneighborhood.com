"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { motion } from "framer-motion";

export function ContactSection() {
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    phone: "",
    type: "feature",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  return (
    <section className="bg-gray-50 px-6 py-8 dark:bg-zinc-900">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-lg border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-8 dark:border-zinc-700 dark:from-zinc-800 dark:to-zinc-900">
          <div className="mb-6 space-y-2">
            <motion.h2
              initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
              whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-3xl font-bold text-gray-900 dark:text-white"
            >
              Be Part of the Neighborhood
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
              whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base text-gray-600 dark:text-gray-400"
            >
              Got a story, business, or event? Reach out and let's feature it.
            </motion.p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* First Row: First Name and Email */}
            <div className="grid gap-4 md:grid-cols-2">
              <input
                type="text"
                placeholder="First name"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                className="rounded-md border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-500 transition-colors focus:border-[#d4ff00] focus:outline-none focus:ring-2 focus:ring-[#d4ff00]/20 dark:border-zinc-600 dark:bg-zinc-900 dark:text-white dark:placeholder-gray-400"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="rounded-md border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-500 transition-colors focus:border-[#d4ff00] focus:outline-none focus:ring-2 focus:ring-[#d4ff00]/20 dark:border-zinc-600 dark:bg-zinc-900 dark:text-white dark:placeholder-gray-400"
                required
              />
            </div>

            {/* Second Row: Phone and Type */}
            <div className="grid gap-4 md:grid-cols-2">
              <input
                type="tel"
                placeholder="Phone (optional)"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="rounded-md border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-500 transition-colors focus:border-[#d4ff00] focus:outline-none focus:ring-2 focus:ring-[#d4ff00]/20 dark:border-zinc-600 dark:bg-zinc-900 dark:text-white dark:placeholder-gray-400"
              />
              <select
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
                className="rounded-md border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 transition-colors focus:border-[#d4ff00] focus:outline-none focus:ring-2 focus:ring-[#d4ff00]/20 dark:border-zinc-600 dark:bg-zinc-900 dark:text-white"
              >
                <option value="feature">Feature / Story</option>
                <option value="business">Business Partnership</option>
                <option value="event">Event Coverage</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Message */}
            <textarea
              placeholder="Tell us a little about the story or partnership..."
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              rows={6}
              className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-500 transition-colors focus:border-[#d4ff00] focus:outline-none focus:ring-2 focus:ring-[#d4ff00]/20 dark:border-zinc-600 dark:bg-zinc-900 dark:text-white dark:placeholder-gray-400"
              required
            />

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="submit"
                className="flex items-center gap-2 rounded-md bg-[#d4ff00] px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-[#c4ef00]"
              >
                <Send size={16} />
                Share Your Story
              </button>
              <a
                href="/zillow"
                className="text-sm font-medium text-gray-700 transition-colors hover:text-[#d4ff00] dark:text-gray-300 dark:hover:text-[#d4ff00]"
              >
                Explore La Jolla Homes on Zillow
              </a>
            </div>

            {/* Email */}
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Email:{" "}
              <a
                href="mailto:hello@mariaintheighborhood.com"
                className="text-[#d4ff00] hover:underline"
              >
                hello@mariaintheighborhood.com
              </a>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
