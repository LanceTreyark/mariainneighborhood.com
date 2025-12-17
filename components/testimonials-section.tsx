"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Jeanine Wu",
    location: "Carmel Valley, San Diego, CA",
    rating: 5,
    text: "Efficient and attentive property manager! Maria made the rental process smooth and hassle-free. Quick responses, plus a well-maintained property. Highly recommended!",
    property: "Property managed a Townhouse home I rent"
  },
  {
    name: "maria Guinle",
    location: "CA 92037", 
    rating: 5,
    text: "Maria is very professional, knows well the market and works hard to deliver the best service to her clientele. I highly recommend her. She helped me a lot, looking for th...",
    property: "Showed home in 2021"
  },
  {
    name: "jima uph",
    location: "University Heights, San Diego, CA",
    rating: 5,
    text: "She was very professional thru the whole process of the home sale: she was very efficient and persistent until she found the right buyer. Very smooth to work with...",
    property: "Sold a Single Family home in 2022"
  }
];

export function TestimonialsSection() {
  return (
    <section className="bg-gray-50 px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            What Clients Say About Maria
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Real experiences from families who found their perfect La Jolla home
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="rounded-lg border border-gray-200 bg-white p-8 relative"
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 left-8">
                <div className="bg-[#dcbbb4] rounded-full p-2">
                  <Quote className="w-4 h-4 text-white" />
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.text}"
              </blockquote>

              {/* Client Info */}
              <div className="border-t border-gray-100 pt-4">
                <div className="font-semibold text-gray-900 mb-1">
                  {testimonial.name}
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  {testimonial.location}
                </div>
                <div className="text-xs font-medium text-[#dcbbb4] bg-[#dcbbb4]/10 rounded-full px-3 py-1 inline-block">
                  {testimonial.property}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Zillow Reviews CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="rounded-lg border border-gray-200 bg-white p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Read More Reviews on Zillow
            </h3>
            <p className="text-gray-600 mb-6">
              See what other clients are saying about their experience working with Maria
            </p>
            <button
              onClick={() => {
                if (typeof window !== 'undefined' && window.gtag) {
                  window.gtag('event', 'zillow_reviews_click', {
                    page_location: window.location.href
                  });
                }
                window.open('https://www.zillow.com/profile/maria%20woodsca', '_blank');
              }}
              className="rounded-md bg-[#dcbbb4] px-6 py-3 font-medium text-black transition-colors hover:bg-[#ccaaa4]"
            >
              View Zillow Reviews
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default TestimonialsSection;