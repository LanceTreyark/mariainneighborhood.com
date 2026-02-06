"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Instagram, Youtube, Facebook, Mail, MapPin } from "lucide-react";
import { FaTiktok } from "react-icons/fa";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const [subscriberEmail, setSubscriberEmail] = useState("");
  const [subscribeStatus, setSubscribeStatus] = useState<
    { type: "idle" | "sending" | "success" | "error"; message?: string }
  >({ type: "idle" });

  const footerLinks = {
    explore: [
      { label: "About Maria", href: "/about" },
      { label: "Latest Videos", href: "/videos" },
      { label: "La Jolla Homes", href: "/real-estate" },
      { label: "Contact", href: "/contact" },
    ],
    community: [
      { label: "Event Spotlight", href: "/events" },
      { label: "Local Businesses", href: "/businesses" },
      { label: "People of La Jolla", href: "/people" },
      { label: "Partner with Us", href: "/partner" },
    ],
  };

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!subscriberEmail) {
      setSubscribeStatus({ type: "error", message: "Please enter your email." });
      return;
    }
    setSubscribeStatus({ type: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Newsletter Subscriber",
          email: subscriberEmail,
          subject: "Newsletter Subscription",
          message: "Please add me to the newsletter list (source: footer).",
        }),
      });
      const data = await res.json();
      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || "Subscription failed");
      }
      setSubscribeStatus({ type: "success", message: "Subscribed! Please check your email for confirmation (if applicable)." });
      setSubscriberEmail("");
    } catch (err: any) {
      setSubscribeStatus({ type: "error", message: err?.message || "Something went wrong." });
    }
  }

  return (
    <footer className="bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* Top Section */}
        <div className="grid gap-12 border-b border-zinc-800 pb-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="space-y-4 lg:col-span-2">
            <Link href="/" className="relative inline-block h-16 w-48">
              <Image
                src="/logo.png"
                alt="Maria in Neighborhood"
                fill
                className="object-contain object-left"
              />
            </Link>
            <p className="max-w-md text-sm leading-relaxed text-gray-400">
              Exploring the places, people, and local flavor of La Jolla.
              Join Maria as she discovers the stories that make our neighborhood
              unique.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <MapPin size={16} className="text-[#dcbbb4]" />
              <span>La Jolla, California</span>
            </div>
          </div>

          {/* Explore Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#dcbbb4]">
              Explore
            </h4>
            <ul className="space-y-3">
              {footerLinks.explore.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-[#dcbbb4]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community Links */}
        {/*
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#dcbbb4]">
              Community
            </h4>
            <ul className="space-y-3">
            
              
              {footerLinks.community.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-[#dcbbb4]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          */}
        </div>
            

        {/* Middle Section - Social & Newsletter */}
        <div className="grid gap-8 border-b border-zinc-800 py-12 md:grid-cols-2">
          {/* Social Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#dcbbb4]">
              Follow Along
            </h4>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/maria_woods_realtor/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900 transition-colors hover:bg-[#dcbbb4] hover:text-black"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://www.youtube.com/@MariaintheNeighborhood"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900 transition-colors hover:bg-[#dcbbb4] hover:text-black"
              >
                <Youtube size={20} />
              </a>
              <a
                href="https://www.tiktok.com/@maria.in.the.neig"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900 transition-colors hover:bg-[#dcbbb4] hover:text-black"
              >
                <FaTiktok size={20} />
              </a>
              <a
                href="mailto:mariaintheighborhood@gmail.com"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900 transition-colors hover:bg-[#dcbbb4] hover:text-black"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#dcbbb4]">
              Stay Updated
            </h4>
            <p className="text-sm text-gray-400">
              Get the latest episodes and neighborhood news.
            </p>
            <form className="flex gap-2" onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder="Your email"
                value={subscriberEmail}
                onChange={(e) => setSubscriberEmail(e.target.value)}
                className="flex-1 rounded-md border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm text-white placeholder-gray-500 focus:border-[#dcbbb4] focus:outline-none focus:ring-2 focus:ring-[#dcbbb4]/20"
              />
              <button
                type="submit"
                disabled={subscribeStatus.type === "sending"}
                className="rounded-md bg-[#dcbbb4] px-6 py-2 text-sm font-medium text-black transition-colors hover:bg-[#ccaaa4] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {subscribeStatus.type === "sending" ? "Subscribing..." : "Subscribe"}
              </button>
            </form>
            {subscribeStatus.type === "success" && (
              <p className="mt-2 text-xs text-green-500">{subscribeStatus.message}</p>
            )}
            {subscribeStatus.type === "error" && (
              <p className="mt-2 text-xs text-red-500">{subscribeStatus.message}</p>
            )}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col items-center justify-between gap-4 pt-8 text-sm text-gray-500 md:flex-row">
          <p>
            © {currentYear} Maria in the Neighborhood. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="transition-colors hover:text-[#dcbbb4]"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="transition-colors hover:text-[#dcbbb4]"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
