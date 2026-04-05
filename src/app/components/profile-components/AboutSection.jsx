import { FileText } from "lucide-react";

export default function AboutSection({ provider }) {
  return (
    <div className="bg-white shadow-sm rounded-2xl p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 bg-blue-50 rounded-lg">
          <FileText size={18} className="text-blue-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-800">About</h2>
      </div>
      <p className="text-gray-700 leading-relaxed text-sm sm:text-base">{provider.about}</p>
    </div>
  );
}
