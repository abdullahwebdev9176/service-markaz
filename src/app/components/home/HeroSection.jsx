import { cities } from '@/data/cities'
import React from 'react'
import FormSubmitBtn from '../ui/FormSubmitBtn'
import InputField from '../Form/InputField'
import SelectBox from '../Form/SelectBox'

const HeroSection = () => {

  return (
    <>
      <section className="bg-gradient-to-b from-slate-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Find Trusted Services Near You
          </h1>

          <p className="mt-4 text-gray-600 text-lg">
            Search electricians, plumbers, AC repair experts and more in your city
          </p>

          <div className="mt-8 flex flex-col md:flex-row gap-4 justify-center">
            
            <InputField placeholder="Enter your city" type="text" />
            <SelectBox options={cities} placeholder="Select City" />
            <FormSubmitBtn title="Search" />

          </div>
        </div>
      </section> 
    </>
  )
}

export default HeroSection