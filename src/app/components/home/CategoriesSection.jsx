import React from 'react'

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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            "Electrician",
            "Plumber",
            "AC Repair",
            "Painter",
            "Carpenter",
            "Cleaner",
            "Mechanic",
            "Home Tutor",
          ].map((service) => (
            <div
              key={service}
              className="p-6 border rounded-2xl hover:shadow-md transition cursor-pointer text-center"
            >
              <h3 className="font-semibold">{service}</h3>
            </div>
          ))}
        </div>
      </section>

    </>
  )
}

export default CategoriesSection