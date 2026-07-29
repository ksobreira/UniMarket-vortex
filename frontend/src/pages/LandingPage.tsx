import { Hero } from "../components/landing/Hero";
import { Footer } from "../components/layout/Footer";
import { FeaturedListings } from "../components/landing/FeaturedListings";


export function LandingPage() {
  return (
    <div>
      <Hero />
      <FeaturedListings />
      <Footer />
    </div>
  );
}