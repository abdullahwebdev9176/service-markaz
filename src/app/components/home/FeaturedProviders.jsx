import React from "react";
import ProviderCard from "@/app/components/ProviderCard";
import { getBusinesses } from "@/lib/businesses";

const FeaturedProviders = async () => {
  const { businesses } = await getBusinesses({ limit: 3, onlyActive: true });

  if (!businesses.length) return null;

  return (
    <section className="max-w-5xl mx-auto px-6">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900">Featured Providers</h2>
        <p className="text-gray-500 mt-2">Top rated professionals in your city</p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {businesses.map((provider) => (
          <ProviderCard key={provider.id} provider={provider} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProviders;