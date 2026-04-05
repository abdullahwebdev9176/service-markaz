import { DollarSign, Phone as PhoneIcon, Clock, BadgeDollarSign } from "lucide-react";

const priceCards = [
  {
    key: "calloutFee",
    label: "Service Call Fee",
    icon: PhoneIcon,
    color: "from-blue-50 to-blue-100",
    iconBg: "bg-blue-600",
    textColor: "text-blue-700",
  },
  {
    key: "hourlyRate",
    label: "Hourly Rate",
    icon: Clock,
    color: "from-green-50 to-green-100",
    iconBg: "bg-green-600",
    textColor: "text-green-700",
  },
  {
    key: "minCharge",
    label: "Minimum Charge",
    icon: BadgeDollarSign,
    color: "from-purple-50 to-purple-100",
    iconBg: "bg-purple-600",
    textColor: "text-purple-700",
  },
];

export default function PricingSection({ provider }) {
  return (
    <div className="bg-white shadow-sm rounded-2xl p-6 mb-6">
      <div className="flex items-center gap-2 mb-5">
        <div className="p-2 bg-green-50 rounded-lg">
          <DollarSign size={18} className="text-green-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-800">Pricing</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {priceCards.map(({ key, label, icon: Icon, color, iconBg, textColor }) => (
          <div
            key={key}
            className={`bg-gradient-to-br ${color} p-4 rounded-xl flex flex-col gap-3`}
          >
            <div className={`w-9 h-9 ${iconBg} rounded-lg flex items-center justify-center`}>
              <Icon size={16} className="text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">{label}</p>
              <p className={`text-xl font-bold ${textColor} mt-0.5`}>{provider.pricing[key]}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
