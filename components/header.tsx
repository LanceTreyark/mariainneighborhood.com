"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Videos", href: "/videos" },
    { label: "Zillow", href: "/zillow" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="fixed left-0 right-0 top-0 z-50 bg-black dark:bg-black">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-6">
        {/* Left side: Mobile Menu Button + Logo */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white lg:hidden"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>

          <Link
            href="/"
            className="font-heading text-2xl font-bold text-[#d4ff00]"
          >
            M-I-N
          </Link>
        </div>

        {/* Center: Desktop Navigation */}
        <nav className="hidden flex-1 items-center justify-center gap-8 lg:flex">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-white transition-colors hover:text-gray-300"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right side: Theme Toggle + CTA Button */}
        <div className="flex items-center gap-2 md:gap-4">
          <ThemeToggle />
          <Link
            href="/latest-episode"
            className="hidden rounded-full bg-white px-6 py-2.5 text-sm font-medium text-black transition-colors hover:bg-gray-200 sm:block"
          >
            Watch Latest Episode
          </Link>
          <Link
            href="/latest-episode"
            className="rounded-full bg-white px-4 py-2 text-xs font-medium text-black transition-colors hover:bg-gray-200 sm:hidden"
          >
            Watch
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-white/10 bg-black dark:bg-black lg:hidden">
          <nav className="flex flex-col px-6 py-4">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="border-b border-white/10 py-4 text-base font-medium text-white transition-colors hover:text-gray-300"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
