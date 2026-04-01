import React from 'react'
import IntroSection from '../components/ui/IntroSection'
import SectionHeading from '../components/ui/SectionHeading'
import { cities } from '@/data/cities'
import Link from "next/link";

const CitiesPage = () => {

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

        <div className="flex flex-wrap justify-center gap-6">
          {cities.map((city, index) => (
            <Link
              key={index}
              href={`/cities/${city.toLowerCase()}`}
              className="bg-white border border-gray-200 shadow-sm rounded-xl px-6 py-4 hover:shadow-md hover:-translate-y-1 transition w-[45%] sm:w-[30%] md:w-[22%] lg:w-[18%] text-center"
            >
              <p className="text-gray-800 font-medium">{city}</p>
            </Link>
          ))}
        </div>
      </section>

    </div>
  )
}

export default CitiesPage