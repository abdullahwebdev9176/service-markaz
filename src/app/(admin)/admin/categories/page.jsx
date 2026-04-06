import { Zap, Wrench, Snowflake, Hammer, Brush, BookOpen, Scissors, Building2, TrendingUp } from "lucide-react";

const categories = [
  { name: "Electricians",  slug: "electricians",  icon: Zap,       businesses: 82, color: "bg-yellow-100 text-yellow-700",  bar: "bg-yellow-400" },
  { name: "Plumbers",      slug: "plumbers",      icon: Wrench,    businesses: 74, color: "bg-blue-100 text-blue-700",      bar: "bg-blue-400" },
  { name: "AC Repair",     slug: "ac-repair",     icon: Snowflake, businesses: 61, color: "bg-cyan-100 text-cyan-700",      bar: "bg-cyan-400" },
  { name: "Carpenters",    slug: "carpenters",    icon: Hammer,    businesses: 58, color: "bg-orange-100 text-orange-700",  bar: "bg-orange-400" },
  { name: "Home Cleaning", slug: "home-cleaning", icon: Brush,     businesses: 49, color: "bg-green-100 text-green-700",    bar: "bg-green-400" },
  { name: "Tutors",        slug: "tutors",        icon: BookOpen,  businesses: 36, color: "bg-purple-100 text-purple-700",  bar: "bg-purple-400" },
  { name: "Tailors",       slug: "tailors",       icon: Scissors,  businesses: 24, color: "bg-pink-100 text-pink-700",      bar: "bg-pink-400" },
];
const total = categories.reduce((s, c) => s + c.businesses, 0);

export default function CategoriesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-800">Categories</h2>
        <p className="text-sm text-gray-500 mt-0.5">Overview of all service categories on the platform.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-blue-50 rounded-2xl px-5 py-4">
          <p className="text-2xl font-bold text-blue-600">{categories.length}</p>
          <p className="text-sm text-gray-600 mt-0.5">Total Categories</p>
        </div>
        <div className="bg-green-50 rounded-2xl px-5 py-4">
          <p className="text-2xl font-bold text-green-600">{total}</p>
          <p className="text-sm text-gray-600 mt-0.5">Total Businesses</p>
        </div>
        <div className="bg-yellow-50 rounded-2xl px-5 py-4">
          <p className="text-2xl font-bold text-yellow-600">Electricians</p>
          <p className="text-sm text-gray-600 mt-0.5">Most Popular</p>
        </div>
        <div className="bg-pink-50 rounded-2xl px-5 py-4">
          <p className="text-2xl font-bold text-pink-600">Tailors</p>
          <p className="text-sm text-gray-600 mt-0.5">Least Populated</p>
        </div>
      </div>

      {/* Category Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const pct = Math.round((cat.businesses / categories[0].businesses) * 100);
          return (
            <div key={cat.slug} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-11 h-11 rounded-xl ${cat.color} flex items-center justify-center`}>
                  <Icon size={20} />
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <TrendingUp size={12} />
                  <span>+5% this month</span>
                </div>
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">{cat.name}</h3>
              <div className="flex items-center gap-1 text-gray-500 text-sm mb-3">
                <Building2 size={13} />
                <span>{cat.businesses} businesses</span>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className={`h-full ${cat.bar} rounded-full`} style={{ width: `${pct}%` }} />
              </div>
              <p className="text-xs text-gray-400 mt-1.5">{Math.round((cat.businesses / total) * 100)}% of total listings</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
