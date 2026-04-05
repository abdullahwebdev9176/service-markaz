import ProfileHeader from "@/app/components/profile-components/ProfileHeader";
import AboutSection from "@/app/components/profile-components/AboutSection";
import ServicesSection from "@/app/components/profile-components/ServicesSection";
import ExperienceSection from "@/app/components/profile-components/ExperienceSection";
import ServiceAreasSection from "@/app/components/profile-components/ServiceAreasSection";
import PricingSection from "@/app/components/profile-components/PricingSection";
import ReviewsSection from "@/app/components/profile-components/ReviewsSection";
import ContactSection from "@/app/components/profile-components/ContactSection";

// Placeholder — replace with session/auth data when backend is ready
const mockProfile = {
  name: "Muhammad Usman",
  category: "electricians",
  city: "Rawalpindi",
  area: "Saddar",
  image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
  rating: 4.9,
  reviews: 0,
  experience: 8,
  availability: "Available",
  responseTime: "< 2 hours",
  verification: false,
  about:
    "Experienced electrician offering residential and commercial electrical services across Rawalpindi. Fast, reliable, and affordable with guaranteed quality work.",
  services: ["Residential Wiring", "Fault Detection", "Panel Installation", "LED Lighting"],
  experience_details: {
    years: 8,
    projects: 200,
    specializations: ["Residential", "Commercial"],
  },
  serviceAreas: ["Rawalpindi", "Islamabad"],
  pricing: {
    calloutFee: "Rs 500",
    hourlyRate: "Rs 1500-2000",
    minCharge: "Rs 1000",
  },
  reviews_list: [],
  contact: {
    phone: "+92-300-0000000",
    whatsapp: "+92-300-0000000",
    email: "usman@example.com",
  },
};

export default function ProviderProfilePage() {
  const provider = mockProfile;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <ProfileHeader provider={provider} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <AboutSection provider={provider} />
            <ServicesSection provider={provider} />
            <ExperienceSection provider={provider} />
            <ServiceAreasSection provider={provider} />
            <PricingSection provider={provider} />
            {provider.reviews_list.length > 0 && <ReviewsSection provider={provider} />}
          </div>

          <div className="lg:sticky lg:top-6 lg:h-fit">
            <ContactSection provider={provider} />
          </div>
        </div>
      </div>
    </div>
  );
}
