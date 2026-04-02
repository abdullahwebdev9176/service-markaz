import React from 'react'

const HowItWorks = () => {
  return (
    <>
      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12">How ServiceMarkaz Works</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              "Search the service you need",
              "Compare service providers",
              "Contact directly and hire easily",
            ].map((step, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-sm"
              >
                <div className="text-indigo-600 text-3xl font-bold mb-4">
                  {index + 1}
                </div>
                <p className="text-gray-600">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </>
  )
}

export default HowItWorks