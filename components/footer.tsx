import Link from "next/link";
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
            <Link href="/" className="inline-block">
              <h3 className="font-heading text-4xl font-bold text-[#d4ff00]">
                M-I-N
              </h3>
            </Link>
            <p className="max-w-md text-sm leading-relaxed text-gray-400">
              Exploring the places, people, and local flavor of La Jolla.
              Join Maria as she discovers the stories that make our neighborhood
              unique.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <MapPin size={16} className="text-[#d4ff00]" />
              <span>La Jolla, California</span>
            </div>
          </div>

          {/* Explore Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#d4ff00]">
              Explore
            </h4>
            <ul className="space-y-3">
              {footerLinks.explore.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-[#d4ff00]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#d4ff00]">
              Community
            </h4>
            <ul className="space-y-3">
              {footerLinks.community.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-[#d4ff00]"
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
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#d4ff00]">
              Follow Along
            </h4>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900 transition-colors hover:bg-[#d4ff00] hover:text-black"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900 transition-colors hover:bg-[#d4ff00] hover:text-black"
              >
                <Youtube size={20} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900 transition-colors hover:bg-[#d4ff00] hover:text-black"
              >
                <Facebook size={20} />
              </a>
              <a
                href="mailto:hello@mariaintheighborhood.com"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900 transition-colors hover:bg-[#d4ff00] hover:text-black"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#d4ff00]">
              Stay Updated
            </h4>
            <p className="text-sm text-gray-400">
              Get the latest episodes and neighborhood news.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 rounded-md border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm text-white placeholder-gray-500 focus:border-[#d4ff00] focus:outline-none focus:ring-2 focus:ring-[#d4ff00]/20"
              />
              <button
                type="submit"
                className="rounded-md bg-[#d4ff00] px-6 py-2 text-sm font-medium text-black transition-colors hover:bg-[#c4ef00]"
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
              className="transition-colors hover:text-[#d4ff00]"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="transition-colors hover:text-[#d4ff00]"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
