import { Header } from "@/components/header";
import { VideosHero } from "@/components/videos-hero";
import { VideoGrid } from "@/components/video-grid";
import { MarqueeSection } from "@/components/marquee-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";

export default function VideosPage() {
  return (
    <>
      <Header />
      <VideosHero />
      <VideoGrid />
      <MarqueeSection />
      <ContactSection />
      <Footer />
    </>
  );
}
