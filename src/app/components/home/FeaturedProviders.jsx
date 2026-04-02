import { images } from '@/data/assets'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const FeaturedProviders = () => {
    return (
        <>
            <section className="max-w-5xl mx-auto px-6">
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
                            <Link href={`#`} className=''>
                                <Image src={images.profile_picture} alt="Provider" />
                            </Link>

                            <div className="p-6">
                                <h3 className="font-semibold">Provider Name</h3>
                                <p className="text-gray-500 text-sm mt-1">Rawalpindi</p>

                                <Link href={`#`} className="mt-4 w-full inline-block bg-indigo-600 text-white py-2 rounded-xl hover:bg-indigo-700 text-center">
                                    View Profile
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

        </>
    )
}

export default FeaturedProviders