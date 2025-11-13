"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex h-10 w-16 items-center rounded-full bg-zinc-800 p-1" />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="flex h-10 w-16 items-center rounded-full bg-zinc-800 p-1 transition-colors"
      aria-label="Toggle theme"
    >
      <div
        className={`flex h-8 w-8 items-center justify-center rounded-full transition-transform ${
          isDark ? "translate-x-6 bg-[#d4ff00]" : "translate-x-0 bg-white"
        }`}
      >
        {isDark ? (
          <Moon size={16} className="text-black" />
        ) : (
          <Sun size={16} className="text-black" />
        )}
      </div>
    </button>
  );
}
