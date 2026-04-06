import { Settings, Globe, Bell, Shield, Database, Save } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h2 className="text-xl font-bold text-gray-800">Settings</h2>
        <p className="text-sm text-gray-500 mt-0.5">Configure platform-wide settings.</p>
      </div>

      {/* General */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100">
          <Globe size={18} className="text-blue-600" />
          <h3 className="font-semibold text-gray-800 text-sm">General</h3>
        </div>
        <div className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Site Name</label>
            <input
              type="text"
              defaultValue="Service Markaz"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Contact Email</label>
            <input
              type="email"
              defaultValue="support@servicemarkaz.com"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Default Language</label>
            <select className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 outline-none">
              <option>English</option>
              <option>Urdu</option>
            </select>
          </div>
        </div>
      </div>

      {/* Business Approvals */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100">
          <Shield size={18} className="text-green-600" />
          <h3 className="font-semibold text-gray-800 text-sm">Business Approval</h3>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm font-medium text-gray-800">Manual approval required</p>
              <p className="text-xs text-gray-500 mt-0.5">New business listings must be reviewed before going live.</p>
            </div>
            <div className="w-11 h-6 bg-blue-600 rounded-full relative cursor-pointer flex-shrink-0">
              <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1 shadow" />
            </div>
          </div>
          <div className="flex items-center justify-between py-2 border-t border-gray-50">
            <div>
              <p className="text-sm font-medium text-gray-800">Email notification on submission</p>
              <p className="text-xs text-gray-500 mt-0.5">Send admin an email when a new listing is submitted.</p>
            </div>
            <div className="w-11 h-6 bg-blue-600 rounded-full relative cursor-pointer flex-shrink-0">
              <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1 shadow" />
            </div>
          </div>
          <div className="flex items-center justify-between py-2 border-t border-gray-50">
            <div>
              <p className="text-sm font-medium text-gray-800">Auto-block after 3 negative reviews</p>
              <p className="text-xs text-gray-500 mt-0.5">Automatically flag listings with consistently low ratings.</p>
            </div>
            <div className="w-11 h-6 bg-gray-200 rounded-full relative cursor-pointer flex-shrink-0">
              <div className="w-4 h-4 bg-white rounded-full absolute left-1 top-1 shadow" />
            </div>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100">
          <Bell size={18} className="text-amber-500" />
          <h3 className="font-semibold text-gray-800 text-sm">Notifications</h3>
        </div>
        <div className="p-6 space-y-4">
          {[
            { label: "New user registration",    sub: "Notify when a new user signs up.", on: false },
            { label: "New business listing",      sub: "Notify when a business is submitted.", on: true },
            { label: "New review submitted",      sub: "Notify when a review is posted.", on: false },
            { label: "Flagged review alert",      sub: "Notify when a review is flagged.", on: true },
          ].map((n, i) => (
            <div key={i} className={`flex items-center justify-between py-2 ${i > 0 ? "border-t border-gray-50" : ""}`}>
              <div>
                <p className="text-sm font-medium text-gray-800">{n.label}</p>
                <p className="text-xs text-gray-500 mt-0.5">{n.sub}</p>
              </div>
              <div className={`w-11 h-6 ${n.on ? "bg-blue-600" : "bg-gray-200"} rounded-full relative cursor-pointer flex-shrink-0`}>
                <div className={`w-4 h-4 bg-white rounded-full absolute top-1 shadow transition-all ${n.on ? "right-1" : "left-1"}`} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Database */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100">
          <Database size={18} className="text-purple-600" />
          <h3 className="font-semibold text-gray-800 text-sm">Data & Maintenance</h3>
        </div>
        <div className="p-6 flex flex-wrap gap-3">
          <button className="px-4 py-2.5 bg-purple-50 hover:bg-purple-100 text-purple-700 text-sm font-semibold rounded-xl transition">
            Export Users CSV
          </button>
          <button className="px-4 py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-700 text-sm font-semibold rounded-xl transition">
            Export Businesses CSV
          </button>
          <button className="px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 text-sm font-semibold rounded-xl transition">
            Clear Cache
          </button>
        </div>
      </div>

      {/* Save */}
      <div className="flex justify-end">
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-xl transition text-sm">
          <Save size={16} />
          Save Settings
        </button>
      </div>
    </div>
  );
}
