import { Wrench, CheckCircle2 } from "lucide-react";

export default function ServicesSection({ provider }) {
  return (
    <div className="bg-white shadow-sm rounded-2xl p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 bg-orange-50 rounded-lg">
          <Wrench size={18} className="text-orange-500" />
        </div>
        <h2 className="text-xl font-bold text-gray-800">Services Offered</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {provider.services.map((service, index) => (
          <div
            key={index}
            className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-xl hover:border-blue-300 transition"
          >
            <CheckCircle2 size={16} className="text-blue-500 flex-shrink-0" />
            <span className="text-gray-700 text-sm font-medium">{service}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
