"use client";

import { useRouter } from "next/navigation";
import { Loader2, AlertCircle, Plus, Pencil } from "lucide-react";
import Link from "next/link";
import ProfileHeader from "@/app/components/profile-components/ProfileHeader";
import AboutSection from "@/app/components/profile-components/AboutSection";
import ServicesSection from "@/app/components/profile-components/ServicesSection";
import ExperienceSection from "@/app/components/profile-components/ExperienceSection";
import ServiceAreasSection from "@/app/components/profile-components/ServiceAreasSection";
import PricingSection from "@/app/components/profile-components/PricingSection";
import ReviewsSection from "@/app/components/profile-components/ReviewsSection";
import ContactSection from "@/app/components/profile-components/ContactSection";
import { useBusiness } from "@/app/hooks/useBusiness";
import { useAuth } from "@/app/context/AuthContext";

/** Maps the Business DB document to the shape expected by profile components */
function mapBusinessToProvider(business) {
  return {
    name: business.name,
    category: business.category,
    city: business.city,
    area: business.area,
    image: business.profileImage || "",
    bannerImage: business.bannerImage || "",
    rating: business.rating ?? 0,
    reviews: business.reviewsCount ?? 0,
    experience: business.experience,
    availability: business.availability,
    responseTime: business.responseTime,
    verification: business.verification,
    about: business.about,
    services: business.services,
    experience_details: {
      years: business.experience,
      projects: business.completedProjects,
      specializations: business.specializations,
    },
    serviceAreas: business.serviceAreas,
    pricing: {
      calloutFee: business.pricing?.calloutFee ? `Rs ${business.pricing.calloutFee}` : "",
      hourlyRate: business.pricing?.hourlyRate ? `Rs ${business.pricing.hourlyRate}` : "",
      minCharge: business.pricing?.minCharge ? `Rs ${business.pricing.minCharge}` : "",
    },
    reviews_list: [],
    contact: {
      phone: business.phone,
      whatsapp: business.whatsapp || business.phone,
      email: business.email,
    },
  };
}

export default function ProviderProfilePage() {
  const { token } = useAuth();
  const router = useRouter();
  const { data: business, isLoading, isError, error } = useBusiness();

  if (!token) {
    router.replace("/sign-in");
    return null;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-blue-500" />
      </div>
    );
  }

  if (isError) {
    // 404 means no business yet — guide the user to create one
    if (error?.message?.includes("No business")) {
      return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-6 px-4 text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center">
            <Plus size={28} className="text-blue-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">No Business Listing Yet</h2>
            <p className="text-gray-500 text-sm max-w-sm">
              You haven't created a business listing yet. Add your business to start receiving customers.
            </p>
          </div>
          <Link
            href="/add-business"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition"
          >
            Add Your Business
          </Link>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center gap-3 text-red-600">
        <AlertCircle size={22} />
        <span>{error?.message || "Failed to load profile"}</span>
      </div>
    );
  }

  const provider = mapBusinessToProvider(business);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="flex justify-end mb-4">
          <Link
            href="/edit-business"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition"
          >
            <Pencil size={15} />
            Edit Profile
          </Link>
        </div>

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

