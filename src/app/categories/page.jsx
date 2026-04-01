import Link from "next/link";
import {
  Wrench,
  Zap,
  BookOpen,
  Scissors,
  Brush,
  Hammer,
  Snowflake
} from "lucide-react";

import SectionHeading from "../components/ui/SectionHeading";
import PrimaryBtn from "../components/ui/PrimaryBtn";
import IntroSection from "../components/ui/IntroSection";

const categories = [
  { name: "Electricians", icon: Zap },
  { name: "Plumbers", icon: Wrench },
  { name: "AC Repair", icon: Snowflake },
  { name: "Carpenters", icon: Hammer },
  { name: "Home Cleaning", icon: Brush },
  { name: "Tutors", icon: BookOpen },
  { name: "Tailors", icon: Scissors },
];

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

        <div className="flex flex-wrap justify-center gap-6">

          {categories.map((category, index) => {
            const Icon = category.icon;

            return (
              <Link
                key={index}
                href={`/categories/${category.name.toLowerCase()}`}
                className="w-[45%] sm:w-[30%] md:w-[22%] lg:w-[18%] bg-white border border-gray-200 shadow-sm rounded-xl p-6 text-center hover:shadow-md hover:-translate-y-1 transition"
              >
                <Icon
                  size={40}
                  className="mx-auto text-blue-600"
                />

                <p className="mt-3 font-medium text-gray-700">
                  {category.name}
                </p>

              </Link>
            );
          })}

        </div>

      </section>


      {/* Why ServiceMarkaz Section */}
      <section className="bg-white py-14">

        <div className="max-w-4xl mx-auto px-6 text-center">

          <SectionHeading
            title="Why choose ServiceMarkaz?"
            subtitle="Connect with reliable professionals quickly and easily"
          />

          <p className="text-gray-600">
            ServiceMarkaz helps you explore trusted service providers in your
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