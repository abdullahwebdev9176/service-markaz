import React from "react";
import Link from "next/link";
import { Star, CheckCircle, Clock, MapPin } from "lucide-react";

const ProviderCard = ({ provider }) => {
  const { id, name, image, rating, reviews, category, experience, availability, responseTime, verification, city } = provider;

  return (
    <Link href={`/provider/${id}`}>
      <div className="bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition cursor-pointer">
        {/* Provider Image */}
        <div className="w-full h-48 overflow-hidden bg-gray-300">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Provider Info */}
        <div className="p-4">
          {/* Name with Verification Badge */}
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-semibold text-gray-800 text-lg flex-1">{name}</h3>
            {verification && (
              <CheckCircle size={20} className="text-green-500 flex-shrink-0" />
            )}
          </div>

          {/* Rating Row */}
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center gap-1">
              <Star size={16} className="fill-yellow-400 text-yellow-400" />
              <span className="font-semibold text-gray-800">{rating}</span>
            </div>
            <span className="text-sm text-gray-600">({reviews} reviews)</span>
          </div>

          {/* Experience & Location */}
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
            <span>{experience} years exp.</span>
            <span>•</span>
            <div className="flex items-center gap-1">
              <MapPin size={14} />
              {city}
            </div>
          </div>

          {/* Availability & Response Time */}
          <div className="flex items-center gap-2 text-xs mb-2">
            <span className={`px-2 py-1 rounded-full ${availability === "Available" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>
              {availability}
            </span>
            <div className="flex items-center gap-1 text-gray-600">
              <Clock size={12} />
              {responseTime}
            </div>
          </div>

          {/* View Profile Button */}
          <button className="w-full mt-3 bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition">
            View Profile
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProviderCard;
