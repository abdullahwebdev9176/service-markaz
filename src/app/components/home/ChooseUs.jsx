import React from 'react'

const ChooseUs = () => {
  return (
    <>
      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12 text-gray-900">Why Choose Service Markaz</h2>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              "Verified Providers",
              "Easy Search",
              "Direct Contact",
              "Free Listings",
            ].map((item) => (
              <div
                key={item}
                className="bg-white p-6 rounded-2xl shadow-sm text-gray-500"
              >
                <p className="font-semibold">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default ChooseUs