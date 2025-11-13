"use client";

import { X, Facebook, Twitter, Linkedin, Link as LinkIcon } from "lucide-react";
import { useState } from "react";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  videoTitle: string;
}

export function ShareModal({
  isOpen,
  onClose,
  videoUrl,
  videoTitle,
}: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(videoUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(videoUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(videoUrl)}&text=${encodeURIComponent(videoTitle)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(videoUrl)}`,
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-md rounded-lg border border-gray-200 bg-white dark:border-zinc-700 dark:bg-zinc-800">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 p-4 dark:border-zinc-700">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            Share Video
          </h2>
          <button
            onClick={onClose}
            className="rounded-full p-1 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-zinc-700 dark:hover:text-gray-300"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">
            {videoTitle}
          </p>

          {/* Social Share Buttons */}
          <div className="mb-6 grid grid-cols-3 gap-3">
            <a
              href={shareLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 rounded-lg border border-gray-200 p-4 transition-colors hover:border-[#d4ff00] hover:bg-gray-50 dark:border-zinc-700 dark:hover:border-[#d4ff00] dark:hover:bg-zinc-700"
            >
              <Facebook size={24} className="text-blue-600" />
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                Facebook
              </span>
            </a>

            <a
              href={shareLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 rounded-lg border border-gray-200 p-4 transition-colors hover:border-[#d4ff00] hover:bg-gray-50 dark:border-zinc-700 dark:hover:border-[#d4ff00] dark:hover:bg-zinc-700"
            >
              <Twitter size={24} className="text-sky-500" />
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                Twitter
              </span>
            </a>

            <a
              href={shareLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 rounded-lg border border-gray-200 p-4 transition-colors hover:border-[#d4ff00] hover:bg-gray-50 dark:border-zinc-700 dark:hover:border-[#d4ff00] dark:hover:bg-zinc-700"
            >
              <Linkedin size={24} className="text-blue-700" />
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                LinkedIn
              </span>
            </a>
          </div>

          {/* Copy Link */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Or copy link
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={videoUrl}
                readOnly
                className="flex-1 rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-700 dark:border-zinc-600 dark:bg-zinc-900 dark:text-gray-300"
              />
              <button
                onClick={handleCopyLink}
                className="flex items-center gap-2 rounded-md bg-[#d4ff00] px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-[#c4ef00]"
              >
                <LinkIcon size={16} />
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
