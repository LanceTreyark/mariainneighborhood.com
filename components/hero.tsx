import Image from "next/image";
import { ScrollIndicator } from "./scroll-indicator";

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center bg-white px-6 pt-20 dark:bg-black">
      <div className="relative z-10 mx-auto max-w-7xl text-center">
        {/* Tagline */}
        <p className="mb-8 text-sm uppercase tracking-widest text-gray-600 dark:text-gray-400">
          La Jolla: People, Place, Possibility
        </p>

        {/* Main Heading with Image */}
        <div className="relative mb-12">
          <h1 className="text-[clamp(4rem,15vw,12rem)] font-bold leading-none tracking-tight text-black dark:text-[#d4ff00]">
            MARIA IN
          </h1>
          <h1 className="text-[clamp(4rem,15vw,12rem)] font-bold leading-none tracking-tight text-black dark:text-[#d4ff00]">
            NEIGHBORHOOD
          </h1>

          {/* Profile Image - Absolute Centered */}
          <div className="absolute left-1/2 top-1/2 h-[clamp(5rem,12.5vw,10rem)] w-[clamp(4rem,10vw,8rem)] -translate-x-1/2 -translate-y-1/2">
            <Image
              src="/mariaProfile.jpg"
              alt="Maria"
              fill
              className="rounded-full object-cover"
              priority
            />
          </div>
        </div>

        {/* Scroll Indicator */}
        <ScrollIndicator />
      </div>
    </section>
  );
}
