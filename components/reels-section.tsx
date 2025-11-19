"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export function ReelsSection() {
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);

  const videos = [
    {
      id: "L5qVYoO5268",
      title: "A taste of France",
      duration: "8:45",
    },
    {
      id: "L5qVYoO5268",
      title: "Pedego Electric Bikes",
      duration: "6:52",
    },
    {
      id: "L5qVYoO5268",
      title: "Eddie from PTC Boxing",
      duration: "10:03",
    },
  ];

  return (
    <section className="bg-gray-50 px-6 py-8">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-lg border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-8">
          <motion.h2
            initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
            whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-6 text-3xl font-bold text-gray-900"
          >
            Latest Videos
          </motion.h2>

          <div className="grid gap-6 md:grid-cols-3">
            {videos.map((video, index) => (
              <div key={`${video.id}-${index}`} className="space-y-3">
                <div className="relative aspect-video overflow-hidden rounded-lg bg-black">
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
                      className="group relative h-full w-full"
                    >
                      <img
                        src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
                        alt={video.title}
                        className="h-full w-full object-cover transition-opacity group-hover:opacity-80"
                      />
                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="rounded-full bg-[#dcbbb4] p-4 transition-transform group-hover:scale-110">
                          <svg
                            width="32"
                            height="32"
                            viewBox="0 0 24 24"
                            fill="black"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                      {/* Duration Badge */}
                      <div className="absolute bottom-3 right-3 rounded bg-black/80 px-2 py-1 text-xs font-medium text-white">
                        {video.duration}
                      </div>
                    </button>
                  )}
                </div>
                <h3 className="text-sm font-medium text-gray-900">
                  {video.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
