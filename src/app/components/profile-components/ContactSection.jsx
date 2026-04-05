import { Phone, MessageCircle, Mail, PhoneCall } from "lucide-react";

const contactActions = [
  {
    key: "phone",
    label: "Call Now",
    icon: PhoneCall,
    href: (v) => `tel:${v}`,
    gradient: "from-blue-500 to-blue-600",
    hoverShadow: "hover:shadow-blue-200",
  },
  {
    key: "whatsapp",
    label: "WhatsApp",
    icon: MessageCircle,
    href: (v) => `https://wa.me/${v.replace(/\D/g, "")}`,
    external: true,
    gradient: "from-green-500 to-green-600",
    hoverShadow: "hover:shadow-green-200",
  },
  {
    key: "email",
    label: "Send Email",
    icon: Mail,
    href: (v) => `mailto:${v}`,
    gradient: "from-purple-500 to-purple-600",
    hoverShadow: "hover:shadow-purple-200",
  },
];

export default function ContactSection({ provider }) {
  return (
    <div className="bg-white shadow-sm rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-5">
        <div className="p-2 bg-blue-50 rounded-lg">
          <Phone size={18} className="text-blue-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-800">Get In Touch</h2>
      </div>

      <div className="space-y-3">
        {contactActions.map(({ key, label, icon: Icon, href, external, gradient, hoverShadow }) => {
          const value = provider.contact[key];
          if (!value) return null;
          return (
            <a
              key={key}
              href={href(value)}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              className={`flex items-center gap-3 px-4 py-3.5 bg-gradient-to-r ${gradient} text-white rounded-xl hover:shadow-lg ${hoverShadow} hover:scale-[1.01] transition-all duration-200`}
            >
              <div className="p-1.5 bg-white/20 rounded-lg">
                <Icon size={18} />
              </div>
              <div>
                <p className="text-xs opacity-80 font-medium">{label}</p>
                <p className="font-semibold text-sm">{value}</p>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
