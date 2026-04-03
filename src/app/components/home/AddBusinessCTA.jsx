import Link from 'next/link'
import React from 'react'

const AddBusinessCTA = () => {
    return (
        <>
            <section className="pb-20">
                <div className="max-w-5xl mx-auto px-6 text-center bg-indigo-600 text-white rounded-3xl">
                    <div className="py-16">
                        <h2 className="text-3xl font-bold">
                            Are you a service provider?
                        </h2>

                        <p className="mt-4 text-indigo-100">
                            Join Service Markaz today and grow your business
                        </p>

                        <Link href="/add-business" className="inline-block mt-6 px-8 py-3 bg-white text-indigo-600 font-semibold rounded-xl hover:bg-gray-100">
                            Add Your Business
                        </Link>

                    </div>
                </div>
            </section>
        </>
    )
}

export default AddBusinessCTA