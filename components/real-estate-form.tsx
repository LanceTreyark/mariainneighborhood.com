"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, ExternalLink } from "lucide-react";
import { analytics } from "@/lib/analytics-events";

export default function RealEstateForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "buying",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Analytics tracking using centralized system
    analytics.leadSubmit({
      name: formData.name,
      email: formData.email,
      interest: formData.interest,
      source: 'real_estate_form'
    });

    try {
      const subject = `Real Estate ${formData.interest} — ${formData.name}${formData.phone ? ` (${formData.phone})` : ""}`;
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject,
          message: formData.message || `Interest: ${formData.interest}`,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || "Failed to send message");
      }
      setIsSubmitted(true);
      setErrorMessage("");
    } catch (err: any) {
      setErrorMessage(err?.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleZillowClick = () => {
    // Analytics tracking using centralized system
    analytics.zillowProfileClick('real_estate_form', 'form_section_zillow_link');
    
    window.open('https://www.zillow.com/profile/maria%20woodsca', '_blank');
  };

  if (isSubmitted) {
    return (
      <section className="bg-gray-50 px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center rounded-lg border border-gray-200 bg-white p-8"
          >
            <div className="bg-[#dcbbb4]/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Send className="w-8 h-8 text-[#dcbbb4]" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Thank You!
            </h2>
            <p className="text-gray-600 mb-8">
              Maria will be in touch soon to discuss your La Jolla real estate needs.
            </p>
            <button
              onClick={handleZillowClick}
              className="rounded-md bg-[#dcbbb4] px-6 py-3 font-medium text-black transition-colors hover:bg-[#ccaaa4] inline-flex items-center gap-2"
            >
              View Maria's Zillow Profile
              <ExternalLink className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact-form" className="bg-gray-50 px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Get Personalized La Jolla Market Insights
            </h2>
            <p className="text-lg text-gray-600">
              Connect with Maria for expert guidance on your real estate journey
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="rounded-lg border border-gray-200 bg-white p-8"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="(555) 123-4567"
                  />
                </div>

                <div>
                  <label htmlFor="interest" className="block text-sm font-medium text-gray-700 mb-2">
                    I'm interested in *
                  </label>
                  <select
                    id="interest"
                    required
                    value={formData.interest}
                    onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="buying">Buying a home</option>
                    <option value="selling">Selling my home</option>
                    <option value="both">Both buying and selling</option>
                    <option value="investing">Investment opportunities</option>
                    <option value="market-info">Market information</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Tell me about your needs
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Tell me about your timeline, budget, or any specific questions..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-md bg-[#dcbbb4] px-6 py-4 font-medium text-black transition-colors hover:bg-[#ccaaa4] disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Connect with Maria
                    </>
                  )}
                </button>
                {errorMessage && (
                  <p className="mt-2 text-sm text-red-700">{errorMessage}</p>
                )}
              </form>
            </motion.div>

            {/* Zillow Profile Link */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="rounded-lg border border-gray-200 bg-white p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Ready to Browse Listings?
                </h3>
                <p className="text-gray-600 mb-6">
                  Visit Maria's Zillow profile to see current listings, market insights, and client reviews.
                </p>
                <button
                  onClick={handleZillowClick}
                  className="w-full rounded-md bg-[#dcbbb4] px-6 py-4 font-medium text-black transition-colors hover:bg-[#ccaaa4] flex items-center justify-center gap-2"
                >
                  View Maria's Zillow Profile
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>

              <div className="rounded-lg border border-gray-200 bg-gradient-to-br from-[#dcbbb4] to-[#ccaaa4] p-8 text-black">
                <h3 className="text-xl font-bold mb-4">Local Market Expertise</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                    <span>Exclusive neighborhood insights from "Maria in the Neighborhood"</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                    <span>Deep connections with local businesses and community</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                    <span>Personalized service tailored to your La Jolla dreams</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}