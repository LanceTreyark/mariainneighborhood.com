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
import { getFeaturedVideo, getLatestVideos } from "@/lib/videos-data";

export function IntroSection() {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const featuredVideo = getFeaturedVideo();
  const episodes = getLatestVideos(3);

  return (
    <section className="relative bg-gray-50 px-6 py-8">
      <div className="mx-auto max-w-7xl">
        {/* Main Content Card */}
        <div className="flex-1">
          <div className="space-y-6 rounded-lg border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-6">
            {/* Intro Text and Social Links */}
            <div className="space-y-4">
              <motion.p
                initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
                whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-lg leading-relaxed text-gray-700"
              >
                Join Maria and explore the places, people, and local flavor of
                La Jolla!
              </motion.p>

              {/* CTA and Social Links */}
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/videos"
                  className="flex items-center gap-2 rounded-md bg-[#dcbbb4] px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-[#ccaaa4]"
                >
                  <Play size={16} fill="black" />
                  Watch Latest Episode
                </Link>

                <Link
                  href="https://www.instagram.com/maria_woods_realtor/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-gray-700 transition-colors hover:text-[#dcbbb4]"
                >
                  Instagram
                </Link>

                <Link
                  href="https://www.youtube.com/@MariaintheNeighborhood"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-gray-700 transition-colors hover:text-[#dcbbb4]"
                >
                  YouTube
                </Link>

                <Link
                  href="www.tiktok.com/@maria.in.the.neig"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-gray-700 transition-colors hover:text-[#dcbbb4]"
                >
                  TikTok
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
                className="text-3xl font-bold text-gray-900"
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
                      src={`https://www.youtube.com/embed/${featuredVideo.id}`}
                      title={featuredVideo.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="h-full w-full"
                    />
                  </div>

                  <p className="text-sm text-gray-600">
                    {featuredVideo.description || featuredVideo.title}
                  </p>

                  <div className="flex flex-wrap gap-3">
                    <Link
                      href={featuredVideo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-md bg-[#dcbbb4] px-6 py-2.5 text-sm font-medium text-black transition-colors hover:bg-[#ccaaa4]"
                    >
                      <Play size={16} fill="black" />
                      Watch Full Episode
                    </Link>
                    <button
                      onClick={() => setIsShareModalOpen(true)}
                      className="flex items-center gap-2 rounded-md border border-gray-300 bg-transparent px-6 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:border-[#dcbbb4] hover:text-[#dcbbb4]"
                    >
                      <Share2 size={16} />
                      Share This Video
                    </button>
                  </div>
                </div>

                {/* Episode Playlist Sidebar - Full Height */}
                <div className="w-full lg:w-80">
                  <div className="flex h-full flex-col rounded-lg border border-gray-200 bg-white">
                    <div className="border-b border-gray-200 p-4">
                      <div className="flex items-center gap-2">
                        <div className="rounded-full bg-[#dcbbb4] p-1.5">
                          <Play size={14} fill="black" className="text-black" />
                        </div>
                        <h3 className="text-sm font-bold uppercase tracking-wide text-gray-700">
                           Latest Episodes
                        </h3>
                      </div>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                      {episodes.map((episode, index) => (
                        <button
                          key={episode.id}
                          className="flex w-full gap-3 border-b border-gray-200 p-3 text-left transition-colors hover:bg-gray-50"
                        >
                          <div className="relative flex-shrink-0">
                            <img
                              src={`https://img.youtube.com/vi/${episode.id}/default.jpg`}
                              alt={episode.title}
                              className="h-16 w-24 rounded object-cover"
                            />
                            {episode.duration && (
                              <div className="absolute bottom-1 right-1 rounded bg-black/80 px-1 py-0.5 text-[10px] font-medium text-white">
                                {episode.duration}
                              </div>
                            )}
                          </div>
                          <div className="flex-1 space-y-1">
                            <div className="flex items-start gap-2">
                              <span className="text-xs font-medium text-gray-500">
                                {index + 1}
                              </span>
                              <div className="flex-1">
                                <h4 className="line-clamp-2 text-xs font-semibold text-gray-900">
                                  {episode.title}
                                </h4>
                                {episode.description && (
                                  <p className="mt-0.5 line-clamp-1 text-[10px] text-gray-600">
                                    {episode.description}
                                  </p>
                                )}
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
            videoUrl={featuredVideo.url}
            videoTitle={featuredVideo.title}
          />
        </div>
      </div>
    </section>
  );
}
