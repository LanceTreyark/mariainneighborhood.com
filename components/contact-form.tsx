"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Instagram, Youtube, Facebook, Mail, Phone, MapPin } from "lucide-react";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<{ type: "idle" | "sending" | "success" | "error"; message?: string }>({ type: "idle" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || "Failed to send message");
      }
      setStatus({ type: "success", message: "Message sent! We'll be in touch soon." });
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err: any) {
      setStatus({ type: "error", message: err?.message || "Something went wrong" });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="bg-gray-50 px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Left Side: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="rounded-2xl bg-white p-8 shadow-sm">
              <h2 className="mb-6 text-3xl font-bold text-gray-900">
                Send a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-[#dcbbb4] focus:outline-none focus:ring-2 focus:ring-[#dcbbb4]/20"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-[#dcbbb4] focus:outline-none focus:ring-2 focus:ring-[#dcbbb4]/20"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-[#dcbbb4] focus:outline-none focus:ring-2 focus:ring-[#dcbbb4]/20"
                  >
                    <option value="">Select a subject</option>
                    <option value="collaboration">Collaboration</option>
                    <option value="story">Share a Story</option>
                    <option value="partnership">Partnership</option>
                    <option value="general">General Inquiry</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-[#dcbbb4] focus:outline-none focus:ring-2 focus:ring-[#dcbbb4]/20"
                    placeholder="Tell us about your idea..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={status.type === "sending"}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#dcbbb4] px-6 py-3 text-base font-medium text-black transition-colors hover:bg-[#ccaaa4] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <Send size={20} />
                  {status.type === "sending" ? "Sending..." : "Send Message"}
                </button>

                {status.type === "success" && (
                  <p className="text-sm text-green-700">{status.message}</p>
                )}
                {status.type === "error" && (
                  <p className="text-sm text-red-700">{status.message}</p>
                )}
              </form>
            </div>
          </motion.div>

          {/* Right Side: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Contact Information */}
            <div className="rounded-2xl bg-white p-8 shadow-sm">
              <h2 className="mb-6 text-3xl font-bold text-gray-900">
                Contact Information
              </h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-[#f5e6e3] p-3">
                    <Mail size={24} className="text-gray-700" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold text-gray-900">Email</h3>
                    <a
                      href="mailto:maria@mariainneighborhood.com"
                      className="text-gray-600 hover:text-[#dcbbb4]"
                    >
                      mariaintheneighborhood@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-[#f5e6e3] p-3">
                    <Phone size={24} className="text-gray-700" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold text-gray-900">Phone</h3>
                    <a
                      href="tel:+15109743886"
                      className="text-gray-600 hover:text-[#dcbbb4]"
                    >
                      (510) 974-3886
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-[#f5e6e3] p-3">
                    <MapPin size={24} className="text-gray-700" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold text-gray-900">
                      Location
                    </h3>
                    <p className="text-gray-600">La Jolla, California</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="rounded-2xl bg-white p-8 shadow-sm">
              <h2 className="mb-6 text-3xl font-bold text-gray-900">
                Follow Along
              </h2>

              <div className="space-y-4">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 rounded-lg border border-gray-200 p-4 transition-colors hover:border-[#dcbbb4] hover:bg-[#f5e6e3]"
                >
                  <Instagram size={24} className="text-gray-700" />
                  <span className="font-medium text-gray-900">Instagram</span>
                </a>

                <a
                  href="https://www.youtube.com/channel/UC1JW75QcwNSsCMAUz5qgUYQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 rounded-lg border border-gray-200 p-4 transition-colors hover:border-[#dcbbb4] hover:bg-[#f5e6e3]"
                >
                  <Youtube size={24} className="text-gray-700" />
                  <span className="font-medium text-gray-900">YouTube</span>
                </a>

                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 rounded-lg border border-gray-200 p-4 transition-colors hover:border-[#dcbbb4] hover:bg-[#f5e6e3]"
                >
                  <Facebook size={24} className="text-gray-700" />
                  <span className="font-medium text-gray-900">Facebook</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
