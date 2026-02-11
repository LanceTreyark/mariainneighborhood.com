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
  const [status, setStatus] = useState<{ type: "idle" | "sending" | "success" | "error"; message?: string }>({ type: "idle" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: "sending" });
    try {
      const subject = `${formData.type} — ${formData.firstName}${formData.phone ? ` (${formData.phone})` : ""}`;
      const message = formData.message;
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.firstName,
          email: formData.email,
          subject,
          message,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || "Failed to send message");
      }
      setStatus({ type: "success", message: "Thanks! We received your message." });
      setFormData({ firstName: "", email: "", phone: "", type: "feature", message: "" });
    } catch (err: any) {
      setStatus({ type: "error", message: err?.message || "Something went wrong" });
    }
  };

  return (
    <section className="bg-gray-50 px-6 py-8">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-lg border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-8">
          <div className="mb-6 space-y-2">
            <motion.h2
              initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
              whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-3xl font-bold text-gray-900"
            >
              Be Part of the Neighborhood
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
              whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base text-gray-600"
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
                className="rounded-md border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-500 transition-colors focus:border-[#dcbbb4] focus:outline-none focus:ring-2 focus:ring-[#dcbbb4]/20"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="rounded-md border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-500 transition-colors focus:border-[#dcbbb4] focus:outline-none focus:ring-2 focus:ring-[#dcbbb4]/20"
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
                className="rounded-md border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-500 transition-colors focus:border-[#dcbbb4] focus:outline-none focus:ring-2 focus:ring-[#dcbbb4]/20"
              />
              <select
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
                className="rounded-md border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 transition-colors focus:border-[#dcbbb4] focus:outline-none focus:ring-2 focus:ring-[#dcbbb4]/20"
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
              className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-500 transition-colors focus:border-[#dcbbb4] focus:outline-none focus:ring-2 focus:ring-[#dcbbb4]/20"
              required
            />

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="submit"
                disabled={status.type === "sending"}
                className="flex items-center gap-2 rounded-md bg-[#dcbbb4] px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-[#ccaaa4] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <Send size={16} />
                {status.type === "sending" ? "Sending..." : "Share Your Story"}
              </button>
              <a
                href="/zillow"
                className="text-sm font-medium text-gray-700 transition-colors hover:text-[#dcbbb4]"
              >
                Explore La Jolla Homes on Zillow
              </a>
            </div>

            {/* Feedback & Email */}
            {status.type === "success" && (
              <p className="text-sm text-green-700">{status.message}</p>
            )}
            {status.type === "error" && (
              <p className="text-sm text-red-700">{status.message}</p>
            )}
            {/* Email */}
            <p className="text-sm text-gray-600">
              Email:{" "}
              <a
                href="mailto:mariaintheneighborhood@gmail.com"
                className="text-[#dcbbb4] hover:underline"
              >
                mariaintheneighborhood@gmail.com
              </a>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
