import React from 'react'
import { categories } from "@/data/categories";
import Link from "next/link";
import SectionHeading from '@/app/components/ui/SectionHeading';

const page = async ({ params }) => {

    const { city } = await params;
    const cityName = city.charAt(0).toUpperCase() + city.slice(1);

    return (
        <div className="min-h-screen bg-gray-50">

            {/* Hero Section */}
            <section className="bg-white py-14 text-center">
                <h1 className="text-4xl font-bold text-gray-800">
                    Services in {cityName}
                </h1>
                <p className="mt-4 text-gray-600">
                    Explore trusted service providers available in {cityName}.
                </p>
            </section>

            {/* Categories Section */}
            <section className="max-w-6xl mx-auto px-6 py-14">
                <SectionHeading
                    title={`Popular Categories in ${cityName}`}
                    subtitle="Select a category to view local service providers"
                />

                <div className="flex flex-wrap justify-center gap-6">
                    {categories.map((category) => {
                        const Icon = category.icon;

                        return (
                            <Link
                                key={category.slug}
                                href={`/cities/${city}/${category.slug}`}
                                className="bg-white border border-gray-200 shadow-sm rounded-xl px-6 py-6 hover:shadow-md hover:-translate-y-1 transition w-[45%] sm:w-[30%] md:w-[22%] lg:w-[18%] text-center"
                            >
                                <Icon size={40} className="mx-auto text-blue-600" />
                                <p className="mt-3 text-gray-700 font-medium">{category.name}</p>
                            </Link>
                        );
                    })}
                </div>
            </section>

        </div>
    )
}

export default page