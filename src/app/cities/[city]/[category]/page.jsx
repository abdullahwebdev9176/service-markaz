import SectionHeading from "@/app/components/ui/SectionHeading";
import ServiceCard from "@/app/components/ui/ServiceCard";
import { categories } from "@/data/categories";
import { cities } from "@/data/cities";
import Link from "next/link";

// Mock services data for demonstration
const services = [
    { id: 1, name: "Qamar Electrician", category: "electricians", city: "rawalpindi" },
    { id: 2, name: "Ali Electrician", category: "electricians", city: "rawalpindi" },
    { id: 3, name: "Sara Tutor", category: "tutors", city: "rawalpindi" },
];

const page = async ({ params }) => {

    const { city, category } = await params;

    // Capitalize city and category nicely
    const cityName = city ? city.charAt(0).toUpperCase() + city.slice(1) : "";
    const categoryObj = categories.find((cat) => cat.slug === category);
    const categoryName = categoryObj ? categoryObj.name : category;

    // Filter services for this city & category
    const filteredServices = services.filter(
        (s) => s.city.toLowerCase() === city.toLowerCase() && s.category === category
    );

    console.log("Filtered Services:", filteredServices);

    return (
        <div className="min-h-screen bg-gray-50">

            {/* Hero Section */}
            <section className="bg-white py-14 text-center">
                <h1 className="text-4xl font-bold text-gray-800">
                    {categoryName} in {cityName}
                </h1>
                <p className="mt-4 text-gray-600">
                    Browse trusted {categoryName} service providers available in {cityName}.
                </p>
            </section>

            {/* Services List */}
            <section className="max-w-6xl mx-auto px-6 py-14">
                <SectionHeading
                    title={`Available ${categoryName} in ${cityName}`}
                    subtitle="Click on a provider to view details"
                />

                {filteredServices.length === 0 ? (
                    <p className="text-center text-gray-600">No services found in this category for {cityName}.</p>
                ) : (
                    <div className="flex flex-wrap justify-center gap-6">
                        {filteredServices.map((s) => (
                            <ServiceCard
                                key={s.id}
                                id={s.id}
                                name={s.name}
                                category={s.category}
                                city={s.city}
                                href={`/special/${s.id}`} // custom link
                            />
                        ))}
                    </div>
                )}
            </section>
        </div>
    )
}

export default page