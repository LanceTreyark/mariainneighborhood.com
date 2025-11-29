import { Header } from "@/components/header";
import { ContactHero } from "@/components/contact-hero";
import { ContactForm } from "@/components/contact-form";
import { MarqueeSection } from "@/components/marquee-section";
import { Footer } from "@/components/footer";

export default function ContactPage() {
  return (
    <>
      <Header />
      <ContactHero />
      <ContactForm />
      <MarqueeSection />
      <Footer />
    </>
  );
}
