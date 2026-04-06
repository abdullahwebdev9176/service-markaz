import {
  Users, Building2, Clock, CheckCircle, Star,
  TrendingUp, MapPin, AlertCircle, Eye, UserCheck,
  ArrowUpRight, ArrowDownRight, Zap, Wrench, Snowflake,
  Hammer, Brush, BookOpen, Scissors,
} from "lucide-react";
import Link from "next/link";

// ─── Mock data ──────────────────────────────────────────────────────────────
const stats = [
  {
    label: "Total Users",
    value: "1,248",
    change: "+12%",
    up: true,
    icon: Users,
    color: "blue",
  },
  {
    label: "Total Businesses",
    value: "384",
    change: "+8%",
    up: true,
    icon: Building2,
    color: "indigo",
  },
  {
    label: "Pending Approvals",
    value: "27",
    change: "+5",
    up: false,
    icon: Clock,
    color: "amber",
    urgent: true,
  },
  {
    label: "Active Providers",
    value: "319",
    change: "+6%",
    up: true,
    icon: CheckCircle,
    color: "green",
  },
  {
    label: "Total Reviews",
    value: "2,910",
    change: "+18%",
    up: true,
    icon: Star,
    color: "yellow",
  },
  {
    label: "Cities Covered",
    value: "8",
    change: "stable",
    up: null,
    icon: MapPin,
    color: "purple",
  },
];

const colorMap = {
  blue:   { bg: "bg-blue-50",   icon: "text-blue-600",   ring: "ring-blue-100" },
  indigo: { bg: "bg-indigo-50", icon: "text-indigo-600", ring: "ring-indigo-100" },
  amber:  { bg: "bg-amber-50",  icon: "text-amber-600",  ring: "ring-amber-100" },
  green:  { bg: "bg-green-50",  icon: "text-green-600",  ring: "ring-green-100" },
  yellow: { bg: "bg-yellow-50", icon: "text-yellow-600", ring: "ring-yellow-100" },
  purple: { bg: "bg-purple-50", icon: "text-purple-600", ring: "ring-purple-100" },
};

const pendingBusinesses = [
  { id: 1, name: "Ali Electrical Works",        category: "Electricians",  city: "Rawalpindi", submitted: "Apr 6, 2026",  avatar: "A" },
  { id: 2, name: "Qureshi Plumbing Services",   category: "Plumbers",      city: "Lahore",     submitted: "Apr 6, 2026",  avatar: "Q" },
  { id: 3, name: "Cool Breeze AC Repair",        category: "AC Repair",     city: "Islamabad",  submitted: "Apr 5, 2026",  avatar: "C" },
  { id: 4, name: "Master Carpentry & Woodwork",  category: "Carpenters",    city: "Karachi",    submitted: "Apr 5, 2026",  avatar: "M" },
  { id: 5, name: "Sparkle Home Cleaning",        category: "Home Cleaning", city: "Faisalabad", submitted: "Apr 4, 2026",  avatar: "S" },
];

const recentUsers = [
  { id: 1, name: "Muhammad Usman",  email: "usman@example.com",   role: "Provider",  status: "active",  joined: "Apr 6, 2026" },
  { id: 2, name: "Sara Khan",        email: "sara@example.com",    role: "Customer",  status: "active",  joined: "Apr 6, 2026" },
  { id: 3, name: "Bilal Ahmad",      email: "bilal@example.com",   role: "Provider",  status: "pending", joined: "Apr 5, 2026" },
  { id: 4, name: "Ayesha Siddiqui",  email: "ayesha@example.com",  role: "Customer",  status: "active",  joined: "Apr 5, 2026" },
  { id: 5, name: "Tariq Mehmood",    email: "tariq@example.com",   role: "Provider",  status: "blocked", joined: "Apr 4, 2026" },
];

const categoryStats = [
  { name: "Electricians", count: 82,  icon: Zap,      color: "bg-yellow-400" },
  { name: "Plumbers",     count: 74,  icon: Wrench,   color: "bg-blue-400" },
  { name: "AC Repair",    count: 61,  icon: Snowflake,color: "bg-cyan-400" },
  { name: "Carpenters",   count: 58,  icon: Hammer,   color: "bg-orange-400" },
  { name: "Cleaning",     count: 49,  icon: Brush,    color: "bg-green-400" },
  { name: "Tutors",       count: 36,  icon: BookOpen, color: "bg-purple-400" },
  { name: "Tailors",      count: 24,  icon: Scissors, color: "bg-pink-400" },
];
const maxCount = Math.max(...categoryStats.map((c) => c.count));

const cityStats = [
  { city: "Rawalpindi", count: 68 },
  { city: "Islamabad",  count: 61 },
  { city: "Lahore",     count: 74 },
  { city: "Karachi",    count: 82 },
  { city: "Faisalabad", count: 38 },
  { city: "Multan",     count: 27 },
  { city: "Peshawar",   count: 21 },
  { city: "Quetta",     count: 13 },
];
const maxCity = Math.max(...cityStats.map((c) => c.count));

const recentActivity = [
  { type: "new_business", text: "Ali Electrical Works submitted a listing", time: "2 hours ago",  dot: "bg-blue-500" },
  { type: "approved",     text: "Hassan Plumbing was approved by admin",   time: "4 hours ago",  dot: "bg-green-500" },
  { type: "new_user",     text: "Sara Khan registered as a customer",       time: "5 hours ago",  dot: "bg-purple-500" },
  { type: "review",       text: "New 5★ review on Cool Breeze AC Repair",  time: "6 hours ago",  dot: "bg-yellow-500" },
  { type: "blocked",      text: "Tariq Mehmood account was blocked",       time: "8 hours ago",  dot: "bg-red-500" },
  { type: "new_business", text: "Sparkle Home Cleaning submitted listing",  time: "1 day ago",   dot: "bg-blue-500" },
];

// ─── Sub-components ──────────────────────────────────────────────────────────
function StatCard({ label, value, change, up, icon: Icon, color, urgent }) {
  const c = colorMap[color];
  return (
    <div className={`bg-white rounded-2xl p-5 border ${urgent ? "border-amber-200 ring-2 ring-amber-100" : "border-gray-100"} shadow-sm hover:shadow-md transition-shadow`}>
      <div className="flex items-start justify-between">
        <div className={`w-11 h-11 rounded-xl ${c.bg} ring-1 ${c.ring} flex items-center justify-center`}>
          <Icon size={20} className={c.icon} />
        </div>
        {up !== null && (
          <span className={`flex items-center gap-0.5 text-xs font-semibold px-2 py-1 rounded-full ${up ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"}`}>
            {up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
            {change}
          </span>
        )}
        {up === null && (
          <span className="text-xs font-semibold px-2 py-1 rounded-full bg-gray-100 text-gray-500">{change}</span>
        )}
      </div>
      <p className="mt-4 text-2xl font-bold text-gray-800">{value}</p>
      <p className="text-sm text-gray-500 mt-0.5">{label}</p>
    </div>
  );
}

function StatusBadge({ status }) {
  const map = {
    active:  "bg-green-50 text-green-700 ring-1 ring-green-200",
    pending: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
    blocked: "bg-red-50 text-red-600 ring-1 ring-red-200",
  };
  return (
    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full capitalize ${map[status] || "bg-gray-100 text-gray-500"}`}>
      {status}
    </span>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">

      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Overview</h2>
          <p className="text-sm text-gray-500 mt-0.5">Welcome back, Admin — here's what's happening today.</p>
        </div>
        <span className="text-xs text-gray-400 bg-white border border-gray-200 rounded-lg px-3 py-1.5 font-medium">
          Apr 7, 2026
        </span>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      {/* Pending Approvals Banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <AlertCircle size={20} className="text-amber-600 flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold text-amber-800">27 business listings are waiting for approval</p>
            <p className="text-xs text-amber-600 mt-0.5">Review and approve or reject each submission.</p>
          </div>
        </div>
        <Link
          href="/admin/businesses"
          className="flex-shrink-0 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold px-4 py-2 rounded-xl transition"
        >
          Review Now
        </Link>
      </div>

      {/* Main 2-col */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Left — Pending Businesses Table */}
        <div className="xl:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-800 text-sm">Pending Business Listings</h3>
            <Link href="/admin/businesses" className="text-xs text-blue-600 hover:underline font-medium flex items-center gap-1">
              View all <ArrowUpRight size={12} />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-xs text-gray-500 font-medium">
                  <th className="px-6 py-3 text-left">Business</th>
                  <th className="px-4 py-3 text-left">Category</th>
                  <th className="px-4 py-3 text-left">City</th>
                  <th className="px-4 py-3 text-left">Submitted</th>
                  <th className="px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {pendingBusinesses.map((b) => (
                  <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-blue-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                          {b.avatar}
                        </div>
                        <span className="font-medium text-gray-800 truncate max-w-[180px]">{b.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-gray-500">{b.category}</td>
                    <td className="px-4 py-3.5 text-gray-500">{b.city}</td>
                    <td className="px-4 py-3.5 text-gray-400 text-xs">{b.submitted}</td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <button className="text-xs bg-green-50 hover:bg-green-100 text-green-700 font-semibold px-3 py-1.5 rounded-lg transition">
                          Approve
                        </button>
                        <button className="text-xs bg-red-50 hover:bg-red-100 text-red-600 font-semibold px-3 py-1.5 rounded-lg transition">
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right — Activity Feed */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-800 text-sm">Recent Activity</h3>
          </div>
          <ul className="divide-y divide-gray-50">
            {recentActivity.map((a, i) => (
              <li key={i} className="flex items-start gap-3 px-5 py-3.5">
                <span className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${a.dot}`} />
                <div>
                  <p className="text-sm text-gray-700 leading-snug">{a.text}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{a.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Second 2-col */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Recent Users */}
        <div className="xl:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-800 text-sm">Recent Users</h3>
            <Link href="/admin/users" className="text-xs text-blue-600 hover:underline font-medium flex items-center gap-1">
              View all <ArrowUpRight size={12} />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-xs text-gray-500 font-medium">
                  <th className="px-6 py-3 text-left">User</th>
                  <th className="px-4 py-3 text-left">Role</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Joined</th>
                  <th className="px-4 py-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                          {u.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{u.name}</p>
                          <p className="text-xs text-gray-400">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${u.role === "Provider" ? "bg-blue-50 text-blue-700 ring-1 ring-blue-200" : "bg-gray-100 text-gray-600"}`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="px-4 py-3.5"><StatusBadge status={u.status} /></td>
                    <td className="px-4 py-3.5 text-gray-400 text-xs">{u.joined}</td>
                    <td className="px-4 py-3.5">
                      <button className="text-xs text-blue-600 hover:underline font-medium flex items-center gap-1">
                        <Eye size={12} /> View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Businesses by Category */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-800 text-sm">Businesses by Category</h3>
          </div>
          <div className="p-5 space-y-3.5">
            {categoryStats.map((c) => {
              const Icon = c.icon;
              const pct = Math.round((c.count / maxCount) * 100);
              return (
                <div key={c.name}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <Icon size={13} className="text-gray-500" />
                      <span className="text-xs font-medium text-gray-700">{c.name}</span>
                    </div>
                    <span className="text-xs font-semibold text-gray-600">{c.count}</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${c.color} rounded-full`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Businesses by City */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-800 text-sm">Businesses by City</h3>
        </div>
        <div className="px-6 py-5 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {cityStats.map((c) => {
            const pct = Math.round((c.count / maxCity) * 100);
            return (
              <div key={c.city} className="flex flex-col items-center gap-2">
                <div className="w-full bg-gray-100 rounded-xl overflow-hidden h-24 flex items-end">
                  <div
                    className="w-full bg-blue-500 rounded-xl transition-all"
                    style={{ height: `${pct}%` }}
                  />
                </div>
                <p className="text-xs font-medium text-gray-600 text-center">{c.city}</p>
                <p className="text-xs font-bold text-gray-800">{c.count}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Approve Pending",   icon: CheckCircle, href: "/admin/businesses", color: "bg-green-600 hover:bg-green-700" },
          { label: "Manage Users",       icon: UserCheck,   href: "/admin/users",      color: "bg-blue-600 hover:bg-blue-700" },
          { label: "View Reviews",       icon: Star,        href: "/admin/reviews",    color: "bg-yellow-500 hover:bg-yellow-600" },
          { label: "Site Analytics",     icon: TrendingUp,  href: "/admin/settings",   color: "bg-purple-600 hover:bg-purple-700" },
        ].map((qa) => {
          const Icon = qa.icon;
          return (
            <Link
              key={qa.label}
              href={qa.href}
              className={`flex items-center gap-3 ${qa.color} text-white font-semibold text-sm px-5 py-4 rounded-2xl transition shadow-sm`}
            >
              <Icon size={18} />
              {qa.label}
            </Link>
          );
        })}
      </div>

    </div>
  );
}
