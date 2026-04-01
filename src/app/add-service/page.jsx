import React from 'react'
import SectionHeading from '../components/ui/SectionHeading'
import PrimaryBtn from '../components/ui/PrimaryBtn'

const AddServicePage = () => {
    return (
        <>
            <div className="min-h-screen bg-gray-50">

                {/* Hero Section */}
                <section className="bg-white py-14">

                    <div className="max-w-4xl mx-auto px-6 text-center">

                        <h1 className="text-4xl font-bold text-gray-800">
                            Add Your Service
                        </h1>

                        <p className="mt-4 text-gray-600">
                            Grow your business by reaching customers in your city.
                            List your service in just a few minutes.
                        </p>

                    </div>

                </section>


                {/* Form Section */}
                <section className="max-w-4xl mx-auto px-6 py-14">

                    <SectionHeading
                        title="Service Details"
                        subtitle="Fill in the information below to list your service"
                    />

                    <form className="bg-white border border-gray-200 shadow-sm rounded-xl p-8 space-y-6">

                        {/* Service Title */}
                        <div>
                            <label className="block text-gray-800 font-medium mb-2">
                                Service Title
                            </label>

                            <input
                                type="text"
                                placeholder="Example: Professional Electrician Services"
                                className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </div>


                        {/* Category */}
                        <div>
                            <label className="block text-gray-800 font-medium mb-2">
                                Category
                            </label>

                            <select className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600">

                                <option>Select Category</option>
                                <option>Electricians</option>
                                <option>Plumbers</option>
                                <option>AC Repair</option>
                                <option>Carpenters</option>
                                <option>Home Cleaning</option>
                                <option>Tutors</option>
                                <option>Tailors</option>

                            </select>
                        </div>


                        {/* City */}
                        <div>
                            <label className="block text-gray-800 font-medium mb-2">
                                City
                            </label>

                            <input
                                type="text"
                                placeholder="Example: Rawalpindi"
                                className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </div>


                        {/* Phone Number */}
                        <div>
                            <label className="block text-gray-800 font-medium mb-2">
                                Phone Number
                            </label>

                            <input
                                type="tel"
                                placeholder="03XXXXXXXXX"
                                className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </div>


                        {/* Address */}
                        <div>
                            <label className="block text-gray-800 font-medium mb-2">
                                Address
                            </label>

                            <input
                                type="text"
                                placeholder="Street / Area / Location"
                                className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </div>


                        {/* Description */}
                        <div>
                            <label className="block text-gray-800 font-medium mb-2">
                                Description
                            </label>

                            <textarea
                                rows="4"
                                placeholder="Describe your service in detail"
                                className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </div>


                        {/* Image Upload */}
                        <div>
                            <label className="block text-gray-800 font-medium mb-2">
                                Upload Image (Optional)
                            </label>

                            <input
                                type="file"
                                className="w-full border border-gray-200 rounded-lg px-4 py-3 bg-white"
                            />
                        </div>


                        {/* Submit Button */}
                        <div className="text-center pt-4">

                            <PrimaryBtn
                                href="#"
                                title="Submit Service"
                            />

                        </div>

                    </form>

                </section>


                {/* Benefits Section */}
                <section className="bg-white py-14">

                    <div className="max-w-4xl mx-auto px-6 text-center">

                        <SectionHeading
                            title="Why list your service?"
                            subtitle="Join ServiceMarkaz and grow your local business"
                        />

                        <div className="grid md:grid-cols-2 gap-6 mt-6 text-gray-600">

                            <p>✔ Reach more local customers</p>
                            <p>✔ Increase your visibility online</p>
                            <p>✔ Receive direct service inquiries</p>
                            <p>✔ Build trust with your profile</p>

                        </div>

                    </div>

                </section>

            </div>
        </>
    )
}

export default AddServicePage