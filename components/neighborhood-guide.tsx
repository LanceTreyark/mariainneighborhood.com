"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play, ExternalLink } from "lucide-react";
import { getLatestVideos } from "@/lib/videos-data";

export default function NeighborhoodGuide() {
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const videos = getLatestVideos(6); // Get 6 latest videos

  const handleVideoClick = (videoId: string) => {
    if (playingVideo === videoId) {
      setPlayingVideo(null);
    } else {
      setPlayingVideo(videoId);
    }
  };

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
            La Jolla Neighborhood Guide
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover La Jolla through Maria's eyes with her latest neighborhood tours and community insights
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {videos.map((video, index) => (
            <motion.div
              key={`${video.id}-${index}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-3xl bg-white shadow-lg border border-gray-100 hover:shadow-2xl hover:border-[#dcbbb4]/30 transition-all duration-500 transform hover:-translate-y-2 flex flex-col h-full"
            >
              {/* Video Thumbnail */}
              <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 flex-shrink-0">
                {playingVideo === video.id ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1`}
                    title={video.title}
                    className="w-full h-full rounded-t-3xl"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <>
                    <img
                      src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button
                        onClick={() => handleVideoClick(video.id)}
                        className="rounded-full bg-white/10 backdrop-blur-sm p-6 hover:bg-white/20 transition-all duration-300 transform scale-75 group-hover:scale-100 opacity-60 group-hover:opacity-100 border border-white/20"
                      >
                        <Play className="w-10 h-10 text-white ml-1 drop-shadow-lg" />
                      </button>
                    </div>

                    {/* Duration Badge */}
                    {video.duration && (
                      <div className="absolute bottom-3 right-3">
                        <div className="rounded-lg bg-black/80 backdrop-blur-sm px-3 py-1.5 text-xs font-medium text-white border border-white/10">
                          {video.duration}
                        </div>
                      </div>
                    )}

                    {/* Category Badge */}
                    {video.category && (
                      <div className="absolute top-3 left-3">
                        <div className="rounded-full bg-[#dcbbb4]/90 backdrop-blur-sm px-3 py-1.5 text-xs font-semibold text-white border border-white/20">
                          {video.category}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Video Info - Flexible content area */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex-grow">
                  <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 leading-tight text-lg group-hover:text-[#8b6f47] transition-colors duration-300">
                    {video.title}
                  </h3>
                </div>

                {/* Action Buttons - Always at bottom */}
                <div className="flex items-center gap-3 pt-4 mt-auto">
                  <button
                    onClick={() => handleVideoClick(video.id)}
                    className="flex-1 rounded-xl bg-[#dcbbb4] hover:bg-[#ccaaa4] px-4 py-2.5 text-sm font-semibold text-white transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                  >
                    Watch Now
                  </button>
                  
                  <button
                    onClick={() => window.open(video.url, '_blank')}
                    className="rounded-xl border-2 border-gray-200 hover:border-[#dcbbb4] p-2.5 text-gray-600 hover:text-[#8b6f47] transition-all duration-300 transform hover:scale-105 hover:bg-gray-50"
                    title="Open in YouTube"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Subtle glow effect on hover */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#dcbbb4]/0 via-[#dcbbb4]/5 to-[#dcbbb4]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="rounded-lg border border-gray-200 bg-white p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Want to See More of La Jolla?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Subscribe to Maria's YouTube channel for the latest neighborhood tours, market insights, and community highlights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.open('https://www.youtube.com/@MariaInTheNeighborhood', '_blank')}
                className="rounded-md bg-[#dcbbb4] px-6 py-3 font-medium text-black transition-colors hover:bg-[#ccaaa4]"
              >
                Subscribe to YouTube
              </button>
              <button
                onClick={() => {
                  document.querySelector('#contact-form')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="rounded-md border border-gray-300 bg-white px-6 py-3 font-medium text-gray-900 transition-colors hover:bg-gray-50"
              >
                Schedule a Tour
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}