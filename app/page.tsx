import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { AboutMariaHero } from "@/components/about-maria-hero";
import { IntroSection } from "@/components/intro-section";
import { WeatherWidget } from "@/components/weather-widget";
import { SpotlightSection } from "@/components/spotlight-section";
import { MarqueeSection } from "@/components/marquee-section";
import { ReelsSection } from "@/components/reels-section";
import { ZillowSection } from "@/components/zillow-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <WeatherWidget />
      <IntroSection />
      <MarqueeSection />
      <SpotlightSection />
      <AboutMariaHero />
      <ReelsSection />
      <ZillowSection />
      <ContactSection />
      <Footer />
    </>
  );
}
