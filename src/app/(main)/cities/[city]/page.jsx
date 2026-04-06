import React from 'react'
import { categories } from "@/data/categories";
import Link from "next/link";
import SectionHeading from '@/app/components/ui/SectionHeading';
import CategoriesGrid from '@/app/components/CategoriesGrid';

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

                <CategoriesGrid 
                    categories={categories}
                    href={(category) => `/cities/${city}/${category.slug}`}
                />
            </section>

        </div>
    )
}

export default page