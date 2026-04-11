import React from 'react'

const HowItWorks = () => {

 const steps = [
  { step: "01", title: "Choose Your City", desc: "Select the city where you need the service." },
  { step: "02", title: "Browse Providers", desc: "View verified professionals with ratings and reviews." },
  { step: "03", title: "Contact Directly", desc: "Reach out via phone or WhatsApp — no middlemen." },
];

  return (
    <>
    <section className="bg-white border-t border-gray-100 py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-800">How It Works</h2>
            <p className="mt-2 text-gray-500">Find the right professional in 3 simple steps</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {steps.map(({ step, title, desc }) => (
              <div key={step} className="flex flex-col items-center text-center">
                <span className="text-5xl font-black text-blue-100 leading-none">{step}</span>
                <h3 className="mt-2 font-semibold text-gray-800 text-lg">{title}</h3>
                <p className="mt-1 text-gray-500 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-10 text-gray-900">How Service Markaz Works</h2>

            <div className="grid md:grid-cols-3 gap-8">
              {steps.map((step, index) => (
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
      </section> */}

    </>
  )
}

export default HowItWorks