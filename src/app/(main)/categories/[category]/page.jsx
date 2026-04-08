import Link from "next/link";
import { categories } from "@/data/categories";
import { cities } from "@/data/cities";
import {
  MapPin,
  CheckCircle,
  Star,
  ArrowRight,
  ChevronRight,
  Users,
  Shield,
  Clock,
} from "lucide-react";

export async function generateMetadata({ params }) {
  const { category } = await params;
  const categoryObj = categories.find((cat) => cat.slug === category);
  if (!categoryObj) return { title: "Category Not Found" };
  return {
    title: `${categoryObj.name} Services in Pakistan | Service Markaz`,
    description: `Find verified ${categoryObj.name.toLowerCase()} professionals in your city. Browse ratings, reviews and contact service providers directly.`,
  };
}

const steps = [
  { step: "01", title: "Choose Your City", desc: "Select the city where you need the service." },
  { step: "02", title: "Browse Providers", desc: "View verified professionals with ratings and reviews." },
  { step: "03", title: "Contact Directly", desc: "Reach out via phone or WhatsApp — no middlemen." },
];

const features = [
  {
    Icon: Shield,
    title: "Verified Professionals",
    desc: "Every provider is manually reviewed before listing on our platform.",
  },
  {
    Icon: Star,
    title: "Genuine Reviews",
    desc: "Read real reviews from verified customers to make informed decisions.",
  },
  {
    Icon: Clock,
    title: "Fast Response",
    desc: "Connect with available providers who respond within hours.",
  },
];

const CategoryPage = async ({ params }) => {
  const { category } = await params;
  const categoryObj = categories.find((cat) => cat.slug === category);

  if (!categoryObj) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center px-6">
          <h1 className="text-3xl font-bold text-gray-800">Category not found</h1>
          <p className="mt-2 text-gray-500">The category you're looking for doesn't exist.</p>
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 mt-6 text-blue-600 font-medium hover:underline"
          >
            <ArrowRight size={16} className="rotate-180" /> Back to categories
          </Link>
        </div>
      </div>
    );
  }

  const Icon = categoryObj.icon;

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Hero ── */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-5xl mx-auto px-6 pt-10 pb-16">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-blue-200 text-sm mb-10">
            <Link href="/" className="hover:text-white transition">Home</Link>
            <ChevronRight size={14} />
            <Link href="/categories" className="hover:text-white transition">Categories</Link>
            <ChevronRight size={14} />
            <span className="text-white font-medium">{categoryObj.name}</span>
          </nav>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-5 shrink-0">
              <Icon size={52} className="text-white" />
            </div>

            <div>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                {categoryObj.name}
              </h1>
              <p className="mt-2 text-blue-100 text-lg">
                Find verified {categoryObj.name.toLowerCase()} across Pakistan
              </p>

              <div className="flex flex-wrap gap-3 mt-5">
                <span className="flex items-center gap-1.5 bg-white/15 rounded-full px-4 py-1.5 text-sm">
                  <MapPin size={13} /> {cities.length} cities covered
                </span>
                <span className="flex items-center gap-1.5 bg-white/15 rounded-full px-4 py-1.5 text-sm">
                  <CheckCircle size={13} /> Verified professionals
                </span>
                <span className="flex items-center gap-1.5 bg-white/15 rounded-full px-4 py-1.5 text-sm">
                  <Star size={13} /> Rated &amp; reviewed
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── City Selection ── */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Select Your City</h2>
          <p className="mt-2 text-gray-500">
            Choose your city to browse local {categoryObj.name.toLowerCase()}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {cities.map((city) => (
            <Link
              key={city}
              href={`/cities/${city.toLowerCase()}/${categoryObj.slug}`}
              className="group bg-white border border-gray-200 rounded-xl p-5 text-center hover:border-blue-500 hover:shadow-md transition-all duration-200"
            >
              <div className="w-11 h-11 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-100 transition-colors">
                <MapPin size={20} className="text-blue-600" />
              </div>
              <p className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                {city}
              </p>
              <span className="inline-flex items-center gap-1 mt-2 text-xs text-blue-500 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Browse <ArrowRight size={12} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="bg-white border-t border-gray-100 py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-800">How It Works</h2>
            <p className="mt-2 text-gray-500">Find the right professional in 3 simple steps</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {steps.map(({ step, title, desc }) => (
              <div key={step} className="flex flex-col items-center text-center">
                <span className="text-5xl font-black text-blue-100 leading-none">{step}</span>
                <h3 className="mt-2 font-semibold text-gray-800 text-lg">{title}</h3>
                <p className="mt-1 text-gray-500 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust Features ── */}
      <section className="bg-gray-50 border-t border-gray-100 py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-800">Why Service Markaz?</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {features.map(({ Icon: FeatureIcon, title, desc }) => (
              <div key={title} className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm text-center">
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <FeatureIcon size={26} className="text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-800 text-lg">{title}</h3>
                <p className="mt-2 text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-14 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-14 h-14 bg-white/15 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <Users size={30} className="text-white" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold">
            Offer {categoryObj.name} Services?
          </h2>
          <p className="mt-3 text-blue-100 text-lg">
            List your business on Service Markaz and reach thousands of customers in your city — for free.
          </p>
          <Link
            href="/add-business"
            className="inline-flex items-center gap-2 mt-7 bg-white text-blue-600 font-semibold px-7 py-3 rounded-xl hover:bg-blue-50 transition"
          >
            Add Your Business <ArrowRight size={18} />
          </Link>
        </div>
      </section>

    </div>
  );
};

export default CategoryPage;
