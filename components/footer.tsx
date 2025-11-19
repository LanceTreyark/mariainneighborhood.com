import Link from "next/link";
import Image from "next/image";
import { Instagram, Youtube, Facebook, Mail, MapPin } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    explore: [
      { label: "About Maria", href: "/about" },
      { label: "Latest Videos", href: "/videos" },
      { label: "La Jolla Homes", href: "/zillow" },
      { label: "Contact", href: "/contact" },
    ],
    community: [
      { label: "Event Spotlight", href: "/events" },
      { label: "Local Businesses", href: "/businesses" },
      { label: "People of La Jolla", href: "/people" },
      { label: "Partner with Us", href: "/partner" },
    ],
  };

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
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900 transition-colors hover:bg-[#dcbbb4] hover:text-black"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900 transition-colors hover:bg-[#dcbbb4] hover:text-black"
              >
                <Youtube size={20} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900 transition-colors hover:bg-[#dcbbb4] hover:text-black"
              >
                <Facebook size={20} />
              </a>
              <a
                href="mailto:hello@mariaintheighborhood.com"
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
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 rounded-md border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm text-white placeholder-gray-500 focus:border-[#dcbbb4] focus:outline-none focus:ring-2 focus:ring-[#dcbbb4]/20"
              />
              <button
                type="submit"
                className="rounded-md bg-[#dcbbb4] px-6 py-2 text-sm font-medium text-black transition-colors hover:bg-[#ccaaa4]"
              >
                Subscribe
              </button>
            </form>
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
