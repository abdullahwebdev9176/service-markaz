import HeroSection from "./components/home/HeroSection";
import HowItWorks from "./components/home/HowItWorks";
import FeaturedProviders from "./components/home/FeaturedProviders";
import ChooseUs from "./components/home/ChooseUs";
import AddBusinessCTA from "./components/home/AddBusinessCTA";
import CategoriesSection from "./components/home/CategoriesSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <HowItWorks />
      <FeaturedProviders />
      <ChooseUs />
      <AddBusinessCTA />
    </>
  );
}
