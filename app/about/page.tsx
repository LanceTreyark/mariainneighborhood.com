import { Header } from "@/components/header";
import { AboutMariaHero2 } from "@/components/about-maria-hero2";
import { AboutSpotlightText } from "@/components/about-spotlight-text";
import { IntroSection } from "@/components/intro-section";
import { AboutSpotlightCards } from "@/components/about-spotlight-cards";
import { MarqueeSection } from "@/components/marquee-section";
import { ReelsSection } from "@/components/reels-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";

export default function AboutPage() {
  return (
    <>
      <Header />
      <AboutMariaHero2 />
      <AboutSpotlightText />
      <IntroSection />
      <AboutSpotlightCards />
      <MarqueeSection />
      <ReelsSection />
      <ContactSection />
      <Footer />
    </>
  );
}
