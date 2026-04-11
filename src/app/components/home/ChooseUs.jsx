import React from 'react'
import {
  Star,
  Shield,
  Clock,
} from "lucide-react";

const ChooseUs = () => {

  const features = [
    {
      Icon: Shield,
      title: "Verified Professionals",
      desc: "Every provider is manually reviewed before listing on our platform.",
    },
    {
      Icon: Star,
      title: "Genuine Reviews",
      desc: "Read real reviews from verified customers to make informed decisions.",
    },
    {
      Icon: Clock,
      title: "Fast Response",
      desc: "Connect with available providers who respond within hours.",
    },
  ];

  return (
    <>
      <section className="bg-gray-50 border-t border-gray-100 py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-800">Why Service Markaz?</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {features.map(({ Icon: FeatureIcon, title, desc }) => (
              <div key={title} className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm text-center">
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <FeatureIcon size={26} className="text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-800 text-lg">{title}</h3>
                <p className="mt-2 text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default ChooseUs