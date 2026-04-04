import { providers } from "@/data/providers";
import { Star, CheckCircle, Clock, MapPin, Phone, MessageCircle, Mail } from "lucide-react";

const ProfileHeader = ({ provider }) => (
  <div className="bg-white shadow-sm rounded-xl overflow-hidden mb-6">
    {/* Cover Image */}
    <div className="h-32 bg-gradient-to-r from-blue-500 to-blue-600"></div>

    {/* Profile Info */}
    <div className="px-6 py-6 relative">
      {/* Profile Picture */}
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
        <div className="relative -mt-20">
          <img
            src={provider.image}
            alt={provider.name}
            className="w-28 h-28 rounded-full border-4 border-white object-cover"
          />
        </div>

        {/* Name & Badges */}
        <div className="flex-1 mt-2">
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-3xl font-bold text-gray-800">{provider.name}</h1>
            {provider.verification && (
              <CheckCircle size={28} className="text-green-500 fill-green-500" />
            )}
          </div>

          <p className="text-blue-600 font-semibold mb-3">{provider.category.replace("-", " ").toUpperCase()}</p>

          {/* Rating & Reviews */}
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <div className="flex items-center gap-1">
              <Star size={20} className="fill-yellow-400 text-yellow-400" />
              <span className="font-bold text-lg">{provider.rating}</span>
              <span className="text-gray-600">({provider.reviews} reviews)</span>
            </div>

            <div className="flex items-center gap-1 text-gray-600">
              <Clock size={16} />
              {provider.responseTime}
            </div>

            <div className={`px-3 py-1 rounded-full font-medium ${
              provider.availability === "Available"
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-800"
            }`}>
              {provider.availability}
            </div>
          </div>

          {/* Experience & Location */}
          <div className="flex flex-wrap gap-3 text-sm text-gray-600">
            <span>📅 {provider.experience} years experience</span>
            <span>•</span>
            <div className="flex items-center gap-1">
              <MapPin size={14} />
              {provider.city}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const AboutSection = ({ provider }) => (
  <div className="bg-white shadow-sm rounded-xl p-6 mb-6">
    <h2 className="text-2xl font-bold text-gray-800 mb-3">About</h2>
    <p className="text-gray-700 leading-relaxed">{provider.about}</p>
  </div>
);

const ServicesSection = ({ provider }) => (
  <div className="bg-white shadow-sm rounded-xl p-6 mb-6">
    <h2 className="text-2xl font-bold text-gray-800 mb-4">Services</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {provider.services.map((service, index) => (
        <div key={index} className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
          <span className="text-gray-700">{service}</span>
        </div>
      ))}
    </div>
  </div>
);

const ExperienceSection = ({ provider }) => (
  <div className="bg-white shadow-sm rounded-xl p-6 mb-6">
    <h2 className="text-2xl font-bold text-gray-800 mb-4">Experience</h2>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
        <p className="text-gray-600 text-sm">Total Experience</p>
        <p className="text-3xl font-bold text-blue-600">{provider.experience_details.years} <span className="text-lg">years</span></p>
      </div>
      <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg">
        <p className="text-gray-600 text-sm">Completed Projects</p>
        <p className="text-3xl font-bold text-green-600">{provider.experience_details.projects}+</p>
      </div>
      <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg">
        <p className="text-gray-600 text-sm">Specializations</p>
        <p className="text-sm font-semibold text-purple-600">{provider.experience_details.specializations.join(", ")}</p>
      </div>
    </div>
  </div>
);

const ServiceAreasSection = ({ provider }) => (
  <div className="bg-white shadow-sm rounded-xl p-6 mb-6">
    <h2 className="text-2xl font-bold text-gray-800 mb-4">Service Areas</h2>
    <div className="flex flex-wrap gap-2">
      {provider.serviceAreas.map((area, index) => (
        <span key={index} className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-medium">
          {area}
        </span>
      ))}
    </div>
  </div>
);

const PricingSection = ({ provider }) => (
  <div className="bg-white shadow-sm rounded-xl p-6 mb-6">
    <h2 className="text-2xl font-bold text-gray-800 mb-4">Pricing</h2>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="border border-gray-200 p-4 rounded-lg">
        <p className="text-gray-600 text-sm mb-1">Service Call Fee</p>
        <p className="text-xl font-bold text-gray-800">{provider.pricing.calloutFee}</p>
      </div>
      <div className="border border-gray-200 p-4 rounded-lg">
        <p className="text-gray-600 text-sm mb-1">Hourly Rate</p>
        <p className="text-xl font-bold text-gray-800">{provider.pricing.hourlyRate}</p>
      </div>
      <div className="border border-gray-200 p-4 rounded-lg">
        <p className="text-gray-600 text-sm mb-1">Minimum Charge</p>
        <p className="text-xl font-bold text-gray-800">{provider.pricing.minCharge}</p>
      </div>
    </div>
  </div>
);

const ReviewsSection = ({ provider }) => (
  <div className="bg-white shadow-sm rounded-xl p-6 mb-6">
    <h2 className="text-2xl font-bold text-gray-800 mb-4">Reviews</h2>
    <div className="space-y-4">
      {provider.reviews_list.map((review, index) => (
        <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
          <div className="flex items-start justify-between mb-2">
            <div>
              <p className="font-semibold text-gray-800">{review.author}</p>
              <p className="text-sm text-gray-600">{review.date}</p>
            </div>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                />
              ))}
            </div>
          </div>
          <p className="text-gray-700">{review.text}</p>
        </div>
      ))}
    </div>
  </div>
);

const ContactSection = ({ provider }) => (
  <div className="bg-white shadow-sm rounded-xl p-6">
    <h2 className="text-2xl font-bold text-gray-800 mb-4">Get In Touch</h2>
    <div className="space-y-3">
      {/* Phone Button */}
      <a
        href={`tel:${provider.contact.phone}`}
        className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition"
      >
        <Phone size={20} />
        <div>
          <p className="text-sm opacity-90">Call Now</p>
          <p className="font-semibold">{provider.contact.phone}</p>
        </div>
      </a>

      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/${provider.contact.whatsapp.replace(/\D/g, "")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:shadow-lg transition"
      >
        <MessageCircle size={20} />
        <div>
          <p className="text-sm opacity-90">WhatsApp</p>
          <p className="font-semibold">{provider.contact.whatsapp}</p>
        </div>
      </a>

      {/* Email Button */}
      <a
        href={`mailto:${provider.contact.email}`}
        className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition"
      >
        <Mail size={20} />
        <div>
          <p className="text-sm opacity-90">Email</p>
          <p className="font-semibold">{provider.contact.email}</p>
        </div>
      </a>
    </div>
  </div>
);

const page = async ({ params }) => {
  const { id } = await params;
  const provider = providers.find((p) => p.id === parseInt(id));

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
