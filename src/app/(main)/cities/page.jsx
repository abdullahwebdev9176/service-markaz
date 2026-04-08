"use client";

import React from 'react'
import IntroSection from '@/app/components/ui/IntroSection'
import SectionHeading from '@/app/components/ui/SectionHeading'
import Link from "next/link";
import { useCities } from '@/hooks/useCities';

const CitiesPage = () => {
  const { data: cities = [], isLoading, error } = useCities();

  const introContent = {
    title: "Browse Services by City",
    subtitle: `Select your city to explore local services and connect with trusted service providers.`
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <IntroSection title={introContent.title} subtitle={introContent.subtitle} />

      {/* Cities Grid */}
      <section className="max-w-6xl mx-auto px-6 py-14">
        <SectionHeading
          title="Available Cities"
          subtitle="Click on your city to browse services near you"
        />

        {isLoading && (
          <div className="flex justify-center py-12">
            <p className="text-gray-600">Loading cities...</p>
          </div>
        )}

        {error && (
          <div className="flex justify-center py-12">
            <p className="text-red-600">Failed to load cities</p>
          </div>
        )}

        {!isLoading && !error && (
          <div className="flex flex-wrap justify-center gap-6">
            {cities.map((city) => (
              <Link
                key={city.slug}
                href={`/cities/${city.slug}`}
                className="bg-white border border-gray-200 shadow-sm rounded-xl px-6 py-4 hover:shadow-md hover:-translate-y-1 transition w-[45%] sm:w-[30%] md:w-[22%] lg:w-[18%] text-center"
              >
                <p className="text-gray-800 font-medium">{city.name}</p>
                {city.businessCount > 0 && (
                  <p className="text-xs text-gray-500 mt-1">{city.businessCount} services</p>
                )}
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default CitiesPage