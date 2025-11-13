"use client";

import {
  Play,
  Share2,
  Cloud,
  Calendar,
  MapPin,
  Home,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ShareModal } from "./share-modal";
import { motion } from "framer-motion";

export function IntroSection() {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const episodes = [
    {
      id: 1,
      title: "Bird Rock Fine Wine",
      description: "Maria visits Ken from Bird Rock Fine Wine",
      duration: "8:45",
      thumbnail: "https://img.youtube.com/vi/L5qVYoO5268/default.jpg",
    },
    {
      id: 2,
      title: "Hidden Cove Café",
      description: "Exploring the best coffee in La Jolla",
      duration: "6:30",
      thumbnail: "https://img.youtube.com/vi/L5qVYoO5268/default.jpg",
    },
    {
      id: 3,
      title: "Ocean View Bookshop",
      description: "A tour of the local bookstore",
      duration: "7:15",
      thumbnail: "https://img.youtube.com/vi/L5qVYoO5268/default.jpg",
    },
  ];

  return (
    <section className="relative bg-gray-50 px-6 py-8 dark:bg-zinc-900">
      <div className="mx-auto max-w-7xl">
        {/* Main Content Card */}
        <div className="flex-1">
          <div className="space-y-6 rounded-lg border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-6 dark:border-zinc-700 dark:from-zinc-800 dark:to-zinc-900">
            {/* Intro Text and Social Links */}
            <div className="space-y-4">
              <motion.p
                initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
                whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-lg leading-relaxed text-gray-700 dark:text-gray-300"
              >
                Join Maria and explore the places, people, and local flavor of
                La Jolla!
              </motion.p>

              {/* CTA and Social Links */}
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/latest-episode"
                  className="flex items-center gap-2 rounded-md bg-[#d4ff00] px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-[#c4ef00]"
                >
                  <Play size={16} fill="black" />
                  Watch Latest Episode
                </Link>

                <Link
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-gray-700 transition-colors hover:text-[#d4ff00] dark:text-gray-300 dark:hover:text-[#d4ff00]"
                >
                  Instagram
                </Link>

                <Link
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-gray-700 transition-colors hover:text-[#d4ff00] dark:text-gray-300 dark:hover:text-[#d4ff00]"
                >
                  YouTube
                </Link>

                <Link
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-gray-700 transition-colors hover:text-[#d4ff00] dark:text-gray-300 dark:hover:text-[#d4ff00]"
                >
                  Facebook
                </Link>
              </div>
            </div>

            {/* Video of the Week */}
            <div className="space-y-6">
              <motion.h2
                initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
                whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-3xl font-bold text-gray-900 dark:text-white"
              >
                Video of the Week
              </motion.h2>

              <div className="flex flex-col gap-4 lg:flex-row">
                {/* Video Player and Controls */}
                <div className="flex-1 space-y-4">
                  <div className="aspect-video overflow-hidden rounded-lg bg-black">
                    <iframe
                      width="100%"
                      height="100%"
                      src="https://www.youtube.com/embed/L5qVYoO5268"
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="h-full w-full"
                    />
                  </div>

                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Maria visits Ken from Bird Rock Fine Wine in Bird Rock to
                    explore his beautiful wine shop.
                  </p>

                  <div className="flex flex-wrap gap-3">
                    <Link
                      href="https://www.youtube.com/watch?v=L5qVYoO5268"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-md bg-[#d4ff00] px-6 py-2.5 text-sm font-medium text-black transition-colors hover:bg-[#c4ef00]"
                    >
                      <Play size={16} fill="black" />
                      Watch Full Episode
                    </Link>
                    <button
                      onClick={() => setIsShareModalOpen(true)}
                      className="flex items-center gap-2 rounded-md border border-gray-300 bg-transparent px-6 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:border-[#d4ff00] hover:text-[#d4ff00] dark:border-zinc-600 dark:text-gray-300 dark:hover:border-[#d4ff00] dark:hover:text-[#d4ff00]"
                    >
                      <Share2 size={16} />
                      Share This Video
                    </button>
                  </div>
                </div>

                {/* Episode Playlist Sidebar - Full Height */}
                <div className="w-full lg:w-80">
                  <div className="flex h-full flex-col rounded-lg border border-gray-200 bg-white dark:border-zinc-700 dark:bg-zinc-900">
                    <div className="border-b border-gray-200 p-4 dark:border-zinc-700">
                      <div className="flex items-center gap-2">
                        <div className="rounded-full bg-[#d4ff00] p-1.5">
                          <Play size={14} fill="black" className="text-black" />
                        </div>
                        <h3 className="text-sm font-bold uppercase tracking-wide text-gray-700 dark:text-gray-300">
                          Episode Playlist
                        </h3>
                      </div>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                      {episodes.map((episode, index) => (
                        <button
                          key={episode.id}
                          className="flex w-full gap-3 border-b border-gray-200 p-3 text-left transition-colors hover:bg-gray-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
                        >
                          <div className="relative flex-shrink-0">
                            <img
                              src={episode.thumbnail}
                              alt={episode.title}
                              className="h-16 w-24 rounded object-cover"
                            />
                            <div className="absolute bottom-1 right-1 rounded bg-black/80 px-1 py-0.5 text-[10px] font-medium text-white">
                              {episode.duration}
                            </div>
                          </div>
                          <div className="flex-1 space-y-1">
                            <div className="flex items-start gap-2">
                              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                {index + 1}
                              </span>
                              <div className="flex-1">
                                <h4 className="line-clamp-2 text-xs font-semibold text-gray-900 dark:text-white">
                                  {episode.title}
                                </h4>
                                <p className="mt-0.5 line-clamp-1 text-[10px] text-gray-600 dark:text-gray-400">
                                  {episode.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Share Modal */}
          <ShareModal
            isOpen={isShareModalOpen}
            onClose={() => setIsShareModalOpen(false)}
            videoUrl="https://www.youtube.com/watch?v=L5qVYoO5268"
            videoTitle="Maria visits Ken from Bird Rock Fine Wine in Bird Rock to explore his beautiful wine shop."
          />
        </div>
      </div>
    </section>
  );
}
