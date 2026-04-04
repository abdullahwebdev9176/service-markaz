const FormSection = ({ icon: Icon, title, subtitle, children }) => {
  return (
    <div className="bg-white border border-gray-100 shadow-sm rounded-2xl overflow-hidden">
      {/* Section Header */}
      <div className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
        <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
          <Icon size={18} className="text-white" />
        </div>
        <div>
          <h3 className="font-bold text-gray-800 text-base">{title}</h3>
          {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
        </div>
      </div>

      {/* Section Body */}
      <div className="p-6 space-y-5">{children}</div>
    </div>
  );
};

export default FormSection;
