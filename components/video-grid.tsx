"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { getAllVideos } from "@/lib/videos-data";

export function VideoGrid() {
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const videos = getAllVideos();

  return (
    <section className="bg-gray-50 px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h2 className="mb-4 text-4xl font-bold text-gray-900">All Videos</h2>
          <p className="text-lg text-gray-600">
            Browse through Maria's collection of neighborhood stories
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {videos.map((video, index) => (
            <motion.div
              key={`${video.id}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-lg"
            >
              {/* Video Thumbnail */}
              <div className="relative aspect-video overflow-hidden bg-black">
                {playingVideo === `${video.id}-${index}` ? (
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="h-full w-full"
                  />
                ) : (
                  <button
                    onClick={() => setPlayingVideo(`${video.id}-${index}`)}
                    className="relative h-full w-full"
                  >
                    <img
                      src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
                      alt={video.title}
                      className="h-full w-full object-cover transition-opacity group-hover:opacity-80"
                    />
                    {/* Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="rounded-full bg-[#dcbbb4] p-5 transition-transform group-hover:scale-110">
                        <Play size={28} fill="black" className="text-black" />
                      </div>
                    </div>
                    {/* Duration Badge */}
                    <div className="absolute bottom-3 right-3 rounded-md bg-black/80 px-2 py-1 text-sm font-medium text-white">
                      {video.duration}
                    </div>
                  </button>
                )}
              </div>

              {/* Video Info */}
              <div className="p-6">
                <div className="mb-2 inline-block rounded-full bg-[#f5e6e3] px-3 py-1 text-xs font-medium text-gray-700">
                  {video.category}
                </div>
                <h3 className="mb-2 text-xl font-bold text-gray-900">
                  {video.title}
                </h3>
                <p className="text-sm text-gray-600">{video.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
