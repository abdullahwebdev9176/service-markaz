import React from 'react'

const FeaturedProviders = () => {
    return (
        <>
            <section className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold">Featured Providers</h2>
                    <p className="text-gray-500 mt-2">
                        Top rated professionals in your city
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {[1, 2, 3].map((provider) => (
                        <div
                            key={provider}
                            className="border rounded-2xl overflow-hidden hover:shadow-md transition"
                        >
                            <div className="h-40 bg-gray-200" />

                            <div className="p-6">
                                <h3 className="font-semibold">Provider Name</h3>
                                <p className="text-gray-500 text-sm mt-1">Rawalpindi</p>

                                <button className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-xl hover:bg-indigo-700">
                                    View Profile
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

        </>
    )
}

export default FeaturedProviders