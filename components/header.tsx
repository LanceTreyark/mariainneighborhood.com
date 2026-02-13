"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "Stories", href: "/videos" },
    { label: "Real Estate", href: "/real-estate" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/" || pathname === "";
    }
    return pathname?.startsWith(href);
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-50 bg-black">
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

          <Link href="/" className="relative h-14 w-40 ">
            <Image
              src="/logo.png"
              alt="Maria in Neighborhood"
              fill
              className="object-contain"
              priority
            />
          </Link>
        </div>

        {/* Center: Desktop Navigation */}
        <nav className="hidden flex-1 items-center justify-center gap-4 lg:flex">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                isActive(item.href)
                  ? "bg-[#dcbbb4] text-black"
                  : "text-white hover:bg-white/10"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right side: CTA Button */}
        <div className="flex items-center gap-2 md:gap-4">
          <Link
            href="/videos"
            className="hidden rounded-full bg-[#dcbbb4] px-6 py-2.5 text-sm font-medium text-black transition-colors hover:bg-[#ccaaa4] sm:block"
          >
            Watch Latest Episode
          </Link>
          <Link
            href="/videos"
            className="rounded-full bg-[#dcbbb4] px-4 py-2 text-xs font-medium text-black transition-colors hover:bg-[#ccaaa4] sm:hidden"
          >
            Watch
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-white/10 bg-black lg:hidden">
          <nav className="flex flex-col gap-2 px-6 py-4">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`rounded-full px-4 py-3 text-base font-medium transition-colors ${
                  isActive(item.href)
                    ? "bg-[#dcbbb4] text-black"
                    : "text-white hover:bg-white/10"
                }`}
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
