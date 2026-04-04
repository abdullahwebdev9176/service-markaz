import Link from "next/link";
import { categories } from "@/data/categories";
import { cities } from "@/data/cities";
import SectionHeading from "@/app/components/ui/SectionHeading";
import IntroSection from "@/app/components/ui/IntroSection";

const page = async ({ params }) => {
  const { category } = await params;

  // Find category details
  const categoryObj = categories.find((cat) => cat.slug === category);

  if (!categoryObj) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">Category not found</h1>
          <Link href="/categories" className="text-blue-600 hover:underline mt-4 inline-block">
            Back to categories
          </Link>
        </div>
      </div>
    );
  }

  const introTitle = `${categoryObj.name} - Choose Your City`;
  const introSubtitle = `Select your city to find trusted ${categoryObj.name.toLowerCase()} service providers.`;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <IntroSection title={introTitle} subtitle={introSubtitle} />

      {/* Cities Grid */}
      <section className="max-w-6xl mx-auto px-6 py-14">
        <SectionHeading
          title={`${categoryObj.name} Available in`}
          subtitle="Click on your city to browse service providers"
        />

        <div className="flex flex-wrap justify-center gap-6">
          {cities.map((city, index) => (
            <Link
              key={index}
              href={`/cities/${city.toLowerCase()}/${categoryObj.slug}`}
              className="bg-white border border-gray-200 shadow-sm rounded-xl px-6 py-4 hover:shadow-md hover:-translate-y-1 transition w-[45%] sm:w-[30%] md:w-[22%] lg:w-[18%] text-center"
            >
              <p className="text-gray-800 font-medium">{city}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Back Link */}
      <section className="bg-white py-8">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <Link href="/categories" className="text-blue-600 hover:underline">
            ← Back to all categories
          </Link>
        </div>
      </section>
    </div>
  );
};

export default page;
