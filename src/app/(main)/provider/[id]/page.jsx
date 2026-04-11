import { providers } from "@/data/providers";
import { findProviderBySlug, extractIdFromSlug } from "@/utils/slug";
import { getBusinessById } from "@/lib/businesses";
import ProfileHeader from "@/app/components/profile-components/ProfileHeader";
import AboutSection from "@/app/components/profile-components/AboutSection";
import ServicesSection from "@/app/components/profile-components/ServicesSection";
import ExperienceSection from "@/app/components/profile-components/ExperienceSection";
import ServiceAreasSection from "@/app/components/profile-components/ServiceAreasSection";
import PricingSection from "@/app/components/profile-components/PricingSection";
import ReviewsSection from "@/app/components/profile-components/ReviewsSection";
import ContactSection from "@/app/components/profile-components/ContactSection";

const page = async ({ params }) => {
  const { id } = await params;

  // Try MongoDB first (slug ends with 24-char ObjectId)
  // Fall back to static data for legacy numeric slugs
  const extracted = extractIdFromSlug(id);
  let provider = null;

  if (extracted?.type === "mongo") {
    provider = await getBusinessById(extracted.id);
  } else {
    provider = findProviderBySlug(id, providers);
  }

  if (!provider) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Provider Not Found</h1>
          <a href="/" className="text-blue-600 hover:underline">
            Back to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-6">
        {/* Profile Header */}
        <ProfileHeader provider={provider} />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2">
            <AboutSection provider={provider} />
            <ServicesSection provider={provider} />
            <ExperienceSection provider={provider} />
            <ServiceAreasSection provider={provider} />
            <PricingSection provider={provider} />
            <ReviewsSection provider={provider} />
          </div>

          {/* Right Column - Sticky Contact */}
          <div className="lg:sticky lg:top-6 lg:h-fit">
            <ContactSection provider={provider} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
