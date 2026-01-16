"use client";

import { motion } from "framer-motion";

export function AboutSpotlightText() {
  return (
    <section className="relative bg-[#a19c9c] px-6 py-12 md:py-16">
      {/* Pattern overlay with opacity */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url(/pattrn.png)",
          backgroundRepeat: "repeat-x",
          backgroundPosition: "center",
          backgroundSize: "auto 100%",
          opacity: 0.2,
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl font-bold leading-relaxed text-white md:text-4xl lg:text-5xl"
        >
          Her short-format videos spotlight local makers, neighbors, and the
          places that make the town{" "}
          <span className="font-serif italic">unique.</span>
        </motion.p>
      </div>
    </section>
  );
}
