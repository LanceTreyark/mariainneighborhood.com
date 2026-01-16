"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";


export function SpotlightSection() {
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
    <section className="bg-[#f5e6e3] px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 md:grid-cols-3">
          {spotlights.map((spotlight, index) => (
            <Link
              href={spotlight.href}
              className="block"
              target={spotlight.href.startsWith("http") ? "_blank" : undefined}
              rel={spotlight.href.startsWith("http") ? "noopener noreferrer" : undefined}
            >
            <motion.div
              //key={spotlight.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="overflow-hidden rounded-3xl bg-white p-6 hover:-translate-y-1 hover:shadow-xl transition"
            >
              {/* Title with Icon */}
              <div className="mb-4 flex items-start gap-3">
                <div className="relative mt-1 h-6 w-6 flex-shrink-0">
                  <Image
                    src="/asterisk.png"
                    alt=""
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-sans text-xl font-semibold tracking-tight text-gray-400">
                    {spotlight.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-500">
                    {spotlight.description}
                  </p>
                </div>
              </div>

              {/* Image */}
              <div className="relative h-48 overflow-hidden rounded-2xl">
                <Image
                  src={spotlight.image}
                  alt={spotlight.title}
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
