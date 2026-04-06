import Link from "next/link";
import { categories } from "@/data/categories";

import SectionHeading from "@/app/components/ui/SectionHeading";
import IntroSection from "@/app/components/ui/IntroSection";
import PrimaryBtn from "@/app/components/ui/PrimaryBtn";
import CategoriesGrid from "@/app/components/CategoriesGrid";

const introTitle = "Browse Service Categories";
const introSubtitle =
  "Find trusted professionals near you. Select a category to explore verified service providers available in your city.";

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero Section */}
      <IntroSection
        title={introTitle}
        subtitle={introSubtitle}
      />


      {/* Categories Grid */}
      <section className="max-w-6xl mx-auto px-6 lg:pt-4 xl:pt-6 pb-14">

        <SectionHeading
          title="Popular Categories"
          subtitle="Browse through our most popular service categories"
        />

        <CategoriesGrid categories={categories} />

      </section>


      {/* Why ServiceMarkaz Section */}
      <section className="bg-white py-14">

        <div className="max-w-4xl mx-auto px-6 text-center">

          <SectionHeading
            title="Why choose Service Markaz?"
            subtitle="Connect with reliable professionals quickly and easily"
          />

          <p className="text-gray-600">
            Service Markaz helps you explore trusted service providers in your
            area, compare options, and contact professionals directly without
            hassle.
          </p>

        </div>

      </section>


      {/* CTA Section */}
      <section className="bg-blue-400 text-white py-14">

        <div className="max-w-3xl mx-auto px-6 text-center">

          <h2 className="text-2xl font-semibold">
            Can't find your service category?
          </h2>

          <p className="mt-2">
            Add your service today and start reaching more customers.
          </p>

          <div className="mt-6">
            <PrimaryBtn
              href="/add-service"
              title="Add Your Service"
            />
          </div>

        </div>

      </section>

    </div>
  );
}