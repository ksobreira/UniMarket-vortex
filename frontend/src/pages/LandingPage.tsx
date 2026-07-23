// pages/LandingPage.tsx
import { Hero } from "../components/landing/Hero";
import { FeaturedListings } from "../components/landing/FeaturedListings";

export function LandingPage() {
  return (
    <div>
      <Hero />
      <FeaturedListings />
    </div>
  );
}