import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { IntroSection } from "@/components/intro-section";
import { WeatherWidget } from "@/components/weather-widget";
import { SpotlightSection } from "@/components/spotlight-section";
import { AboutMaria } from "@/components/about-maria";
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
      <AboutMaria />
      <ReelsSection />
      <ZillowSection />
      <ContactSection />
      <Footer />
    </>
  );
}
