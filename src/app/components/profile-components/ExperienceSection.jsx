import { Award, Clock, TrendingUp, Star } from "lucide-react";

export default function ExperienceSection({ provider }) {
  const { years, projects, specializations } = provider.experience_details;

  return (
    <div className="bg-white shadow-sm rounded-2xl p-6 mb-6">
      <div className="flex items-center gap-2 mb-5">
        <div className="p-2 bg-purple-50 rounded-lg">
          <Award size={18} className="text-purple-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-800">Experience & Expertise</h2>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
        <div className="flex items-center gap-4 bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl">
          <div className="p-3 bg-white rounded-xl shadow-sm">
            <Clock size={20} className="text-blue-600" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Total Experience</p>
            <p className="text-2xl font-bold text-blue-700">
              {years} <span className="text-sm font-medium text-blue-500">years</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl">
          <div className="p-3 bg-white rounded-xl shadow-sm">
            <TrendingUp size={20} className="text-green-600" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Completed Projects</p>
            <p className="text-2xl font-bold text-green-700">
              {projects}<span className="text-sm font-medium text-green-500">+</span>
            </p>
          </div>
        </div>
      </div>

      {/* Specializations */}
      <div>
        <div className="flex items-center gap-1.5 mb-3">
          <Star size={14} className="text-yellow-500" />
          <p className="text-sm font-semibold text-gray-700">Specializations</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {specializations.map((spec, i) => (
            <span
              key={i}
              className="bg-purple-50 text-purple-700 border border-purple-200 px-3 py-1.5 rounded-full text-sm font-medium"
            >
              {spec}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
