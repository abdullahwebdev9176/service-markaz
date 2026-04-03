import { categories } from '@/data/categories'
import React from 'react'
import SectionHeading from '../ui/SectionHeading'

const CategoriesSection = () => {
  return (
    <>
      <section className="max-w-7xl mx-auto px-6">
        
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Popular Services</h2>
          <p className="text-gray-500 mt-2">
            Explore the most searched services near you
          </p>
        </div>

        <div className="max-w-7xl mx-auto flex flex-wrap gap-6 justify-center">
          {categories.map((service, index) => (
            <div
              key={index}
              className="p-6 border border-gray-500 rounded-2xl hover:shadow-md transition cursor-pointer text-center"
            >
              <h3 className="font-semibold">{service.name}</h3>
            </div>
          ))}
        </div>
      </section>

    </>
  )
}

export default CategoriesSection