"use client";

import Link from "next/link";
import { categories } from "@/data/categories";
import { useCities } from "@/hooks/useCities";
import {
  MapPin,
  CheckCircle,
  Star,
  ArrowRight,
  ChevronRight,
  Users,
} from "lucide-react";
import { useParams } from "next/navigation";
import HowItWorks from "@/app/components/home/HowItWorks";
import ChooseUs from "@/app/components/home/ChooseUs";
import CitiesCard from "@/app/components/CitiesCard";


const CategoryPage = () => {
  const params = useParams();
  const category = params?.category;
  const { data: cities = [], isLoading, error } = useCities();

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
                  <MapPin size={13} /> {isLoading ? "..." : cities.length} cities covered
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
          {isLoading && (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-600">Loading cities...</p>
            </div>
          )}

          {error && (
            <div className="col-span-full text-center py-12">
              <p className="text-red-600">Failed to load cities</p>
            </div>
          )}

          {!isLoading && !error && cities.length > 0 && cities.map((city) => (

            <CitiesCard key={city.slug} city={city} categoryObj={categoryObj} />

          ))}

          {!isLoading && !error && cities.length === 0 && (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500">No cities available at the moment</p>
            </div>
          )}
        </div>
      </section>

      <HowItWorks />

      {/* ── Trust Features ── */}
      <ChooseUs />

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
