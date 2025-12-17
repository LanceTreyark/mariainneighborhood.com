import { Metadata } from "next";
import { Header } from "@/components/header";
import RealEstateHero from "@/components/real-estate-hero";
import PropertySearch from "@/components/property-search";
import FeaturedListings from "@/components/featured-listings";

import NeighborhoodGuide from "@/components/neighborhood-guide";
import MariaExpertise from "@/components/maria-expertise";
import RealEstateForm from "@/components/real-estate-form";
import { TestimonialsSection } from "@/components/testimonials-section";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "La Jolla Real Estate with Maria Woods | Local Expert",
  description: "From neighborhood stories to dream homes - let Maria guide your La Jolla real estate journey. Local expertise you can trust.",
};

export default function RealEstatePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <RealEstateHero />
        <PropertySearch />
        <FeaturedListings />
        <NeighborhoodGuide />
        <MariaExpertise />
        <TestimonialsSection />
        <RealEstateForm />
      </main>
      <Footer />
    </>
  );
}