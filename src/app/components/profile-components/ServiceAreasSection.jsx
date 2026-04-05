import { MapPin, Navigation } from "lucide-react";

export default function ServiceAreasSection({ provider }) {
  return (
    <div className="bg-white shadow-sm rounded-2xl p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 bg-rose-50 rounded-lg">
          <Navigation size={18} className="text-rose-500" />
        </div>
        <h2 className="text-xl font-bold text-gray-800">Service Areas</h2>
      </div>

      <div className="flex flex-wrap gap-2">
        {provider.serviceAreas.map((area, index) => (
          <div
            key={index}
            className="flex items-center gap-1.5 bg-rose-50 border border-rose-200 text-rose-700 px-3 py-2 rounded-full text-sm font-medium hover:bg-rose-100 transition"
          >
            <MapPin size={13} />
            {area}
          </div>
        ))}
      </div>
    </div>
  );
}
