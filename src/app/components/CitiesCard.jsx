import { ArrowRight, MapPin } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const CitiesCard = ({ city, categoryObj }) => {
    return (
        <>
            <Link
                key={city.slug}
                href={`/cities/${city.slug}/${categoryObj.slug}`}
                className="group bg-white border border-gray-200 rounded-xl p-5 text-center hover:border-blue-500 hover:shadow-md transition-all duration-200"
            >
                <div className="w-11 h-11 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-100 transition-colors">
                    <MapPin size={20} className="text-blue-600" />
                </div>
                <p className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                    {city.name}
                </p>
                {city.businessCount > 0 && (
                    <p className="text-xs text-gray-500 mt-1">{city.businessCount} services</p>
                )}
                <span className="inline-flex items-center gap-1 mt-2 text-xs text-blue-500 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Browse <ArrowRight size={12} />
                </span>
            </Link>
        </>
    )
}

export default CitiesCard