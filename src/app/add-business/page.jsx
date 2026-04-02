import React from 'react'
import SectionHeading from '../components/ui/SectionHeading'
import FormSubmitBtn from '../components/ui/FormSubmitBtn'
import IntroSection from '../components/ui/IntroSection'
import FormHeader from '../components/ui/FormHeader'
import { cities } from '@/data/cities'
import { categories } from '@/data/categories'

const introContent = {
    title: "Add Your Service",
    subtitle: `Grow your business by reaching customers in your city. List your service in just a few minutes.`
}

const AddServicePage = () => {
    return (
        <>
            <div className="min-h-screen bg-gray-50">

                {/* Hero Section */}

                <IntroSection title={introContent.title} subtitle={introContent.subtitle} />


                {/* Form Section */}
                <section className="max-w-4xl mx-auto px-6 py-14">

                    <FormHeader title="Service Details" subtitle="Fill in the information below to list your service" />

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
                                {categories.map((category, index) => (
                                    <option key={index}>{category.name}</option>
                                ))}

                            </select>
                        </div>


                        {/* City */}
                        <div>
                            <label className="block text-gray-800 font-medium mb-2">
                                City
                            </label>

                            <select className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600">

                                <option>Select City</option>
                                {cities.map((city, index) => (
                                    <option key={index}>{city}</option>
                                ))}

                            </select>
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

                            <FormSubmitBtn title="Submit Service" />

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