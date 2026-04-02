import Image from "next/image";
import HeroSection from "./components/home/HeroSection";
import CategoriesPage from "./categories/page";
import HowItWorks from "./components/home/HowItWorks";
import FeaturedProviders from "./components/home/FeaturedProviders";
import ChooseUs from "./components/home/ChooseUs";
import AddBusinessCTA from "./components/home/AddBusinessCTA";

export default function Home() {
  return (
    <>
      <HeroSection />
      <CategoriesPage />
      <HowItWorks />
      <FeaturedProviders />
      <ChooseUs />
      <AddBusinessCTA />
    </>
  );
}
