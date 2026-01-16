"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

export function AboutSpotlightCards() {
  const spotlights = [
    {
      title: "Event Spotlight",
      description: "Art Exhibit - All Shall Be Well -Jan 14th-Mar 7th",
      image: "/art.webp",
      href: "https://lajollabythesea.com/event-details/?id=art-exhibit-all-shall-be-well",
      target: "_blank",
    },
    {
      title: "Local Spotlight",
      description: "Pearl Street Tacos - Maria's go-to after a surf",
      image: "/pearl.jpg",
      href: "https://www.google.com/search?q=pearl+street+tacos+la+jolla&rlz=1C1ONGR_enUS1085US1085&oq=pearl&gs_lcrp=EgZjaHJvbWUqCAgAEEUYJxg7MggIABBFGCcYOzIKCAEQLhixAxiABDIGCAIQRRhAMhMIAxAuGIMBGK8BGMcBGLEDGIAEMg0IBBAuGK8BGMcBGIAEMg0IBRAuGIMBGLEDGIAEMhAIBhAuGMcBGLEDGNEDGIAEMgYIBxBFGD3SAQgyMzMzajBqN6gCALACAA&sourceid=chrome&ie=UTF-8&lqi=ChtwZWFybCBzdHJlZXQgdGFjb3MgbGEgam9sbGFIoLzW0OeVgIAIWjEQAhADEAQYABgBGAIYAxgEIhtwZWFybCBzdHJlZXQgdGFjb3MgbGEgam9sbGEqAggDkgEKcmVzdGF1cmFudJoBRENpOURRVWxSUVVOdlpFTm9kSGxqUmpsdlQyeG9XV0pWWkZSa1JUVmFWa2R3VFZKdGJHbFZNbVJ2WVVjNVdsZ3hSUkFCugEHCgV0YWNvc-ABAPoBBQiUAhA_#rlimm=519367279425009795",
      target: "_blank",
    },
    {
      title: "People of La Jolla",
      description: "Meet Tim Bessell - Surfboard Artist, shaper and local legend",
      image: "/timB.jpg",
      href: "/videos/",
    },
  ];

  return (
    <section className="relative bg-[#f5e6e3] px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left Side: Spotlight Items */}
          <div className="space-y-8">
            {spotlights.map((spotlight, index) => (
              <Link
                key={spotlight.title}
                href={spotlight.href}
                className="block"
                target={spotlight.href.startsWith("http") ? "_blank" : undefined}
                rel={spotlight.href.startsWith("http") ? "noopener noreferrer" : undefined}
              >
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="flex items-start gap-4"
                >
                  <div className="relative mt-1 h-8 w-8 flex-shrink-0">
                    <Image
                      src="/asterisk.png"
                      alt=""
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="mb-2 text-2xl font-bold text-gray-600 md:text-3xl">
                      {spotlight.title}
                    </h3>
                    <p className="text-base leading-relaxed text-gray-500 md:text-lg">
                      {spotlight.description}
                    </p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>

          {/* Right Side: Rose Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative h-[400px] w-full max-w-lg md:h-[500px]">
              <Image
                src="/rose.png"
                alt="Rose"
                fill
                className="object-contain"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
