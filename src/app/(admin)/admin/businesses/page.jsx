import { Building2, Search, Eye, CheckCircle, XCircle, Ban, Clock, Star } from "lucide-react";

const businesses = [
  { id: 1,  name: "Ali Electrical Works",        owner: "Muhammad Ali",    category: "Electricians",  city: "Rawalpindi", status: "pending", rating: 0,   reviews: 0,  submitted: "Apr 6, 2026" },
  { id: 2,  name: "Qureshi Plumbing",            owner: "Asif Qureshi",    category: "Plumbers",      city: "Lahore",     status: "pending", rating: 0,   reviews: 0,  submitted: "Apr 6, 2026" },
  { id: 3,  name: "Cool Breeze AC Repair",        owner: "Saad Chaudhry",   category: "AC Repair",     city: "Islamabad",  status: "pending", rating: 0,   reviews: 0,  submitted: "Apr 5, 2026" },
  { id: 4,  name: "Master Carpentry",             owner: "Kamran Iqbal",    category: "Carpenters",    city: "Karachi",    status: "pending", rating: 0,   reviews: 0,  submitted: "Apr 5, 2026" },
  { id: 5,  name: "Sparkle Home Cleaning",        owner: "Hina Malik",      category: "Home Cleaning", city: "Faisalabad", status: "pending", rating: 0,   reviews: 0,  submitted: "Apr 4, 2026" },
  { id: 6,  name: "Hassan Electrical Services",   owner: "Hassan Raza",     category: "Electricians",  city: "Islamabad",  status: "active",  rating: 4.8, reviews: 34, submitted: "Mar 12, 2026" },
  { id: 7,  name: "CityFix Plumbers",             owner: "Usman Tariq",     category: "Plumbers",      city: "Rawalpindi", status: "active",  rating: 4.5, reviews: 21, submitted: "Mar 10, 2026" },
  { id: 8,  name: "FrostFix AC Solutions",        owner: "Bilal Ahmed",     category: "AC Repair",     city: "Lahore",     status: "active",  rating: 4.7, reviews: 18, submitted: "Mar 8, 2026" },
  { id: 9,  name: "WoodCraft Interiors",          owner: "Junaid Awan",     category: "Carpenters",    city: "Karachi",    status: "active",  rating: 4.3, reviews: 9,  submitted: "Mar 5, 2026" },
  { id: 10, name: "Elite Home Cleaners",          owner: "Amna Baig",       category: "Home Cleaning", city: "Multan",     status: "blocked", rating: 2.1, reviews: 4,  submitted: "Feb 20, 2026" },
];

const statusStyle = {
  active:  "bg-green-50 text-green-700 ring-1 ring-green-200",
  pending: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
  blocked: "bg-red-50 text-red-600 ring-1 ring-red-200",
};

const summaryCards = [
  { label: "Total Listings",     value: "384",  bg: "bg-blue-50",   text: "text-blue-600" },
  { label: "Active",             value: "319",  bg: "bg-green-50",  text: "text-green-600" },
  { label: "Pending Approval",   value: "27",   bg: "bg-amber-50",  text: "text-amber-600" },
  { label: "Blocked",            value: "38",   bg: "bg-red-50",    text: "text-red-600" },
];

export default function BusinessesPage() {
  return (
    <div className="space-y-6">

      <div>
        <h2 className="text-xl font-bold text-gray-800">Businesses</h2>
        <p className="text-sm text-gray-500 mt-0.5">Review and manage all business listings.</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {summaryCards.map((s) => (
          <div key={s.label} className={`${s.bg} rounded-2xl px-5 py-4`}>
            <p className={`text-2xl font-bold ${s.text}`}>{s.value}</p>
            <p className="text-sm text-gray-600 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 flex-1 min-w-[200px]">
            <Search size={15} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search businesses…"
              className="bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none w-full"
            />
          </div>
          <select className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-600 outline-none">
            <option value="">All Categories</option>
            <option>Electricians</option>
            <option>Plumbers</option>
            <option>AC Repair</option>
            <option>Carpenters</option>
            <option>Home Cleaning</option>
            <option>Tutors</option>
            <option>Tailors</option>
          </select>
          <select className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-600 outline-none">
            <option value="">All Cities</option>
            <option>Rawalpindi</option>
            <option>Islamabad</option>
            <option>Lahore</option>
            <option>Karachi</option>
          </select>
          <select className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-600 outline-none">
            <option value="">All Statuses</option>
            <option>pending</option>
            <option>active</option>
            <option>blocked</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-xs text-gray-500 font-medium">
                <th className="px-6 py-3 text-left">Business</th>
                <th className="px-4 py-3 text-left">Category</th>
                <th className="px-4 py-3 text-left">City</th>
                <th className="px-4 py-3 text-left">Rating</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Submitted</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {businesses.map((b) => (
                <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-blue-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                        {b.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{b.name}</p>
                        <p className="text-xs text-gray-400">{b.owner}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-gray-500 text-xs">{b.category}</td>
                  <td className="px-4 py-3.5 text-gray-500 text-xs">{b.city}</td>
                  <td className="px-4 py-3.5">
                    {b.rating > 0 ? (
                      <div className="flex items-center gap-1">
                        <Star size={12} className="text-yellow-400 fill-yellow-400" />
                        <span className="text-xs font-semibold text-gray-700">{b.rating}</span>
                        <span className="text-xs text-gray-400">({b.reviews})</span>
                      </div>
                    ) : (
                      <span className="text-xs text-gray-400">No reviews</span>
                    )}
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full capitalize ${statusStyle[b.status]}`}>{b.status}</span>
                  </td>
                  <td className="px-4 py-3.5 text-gray-400 text-xs">{b.submitted}</td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1.5">
                      <button className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition" title="View">
                        <Eye size={14} />
                      </button>
                      {b.status === "pending" && (
                        <>
                          <button className="p-1.5 rounded-lg text-gray-400 hover:text-green-600 hover:bg-green-50 transition" title="Approve">
                            <CheckCircle size={14} />
                          </button>
                          <button className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition" title="Reject">
                            <XCircle size={14} />
                          </button>
                        </>
                      )}
                      {b.status === "active" && (
                        <button className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition" title="Block">
                          <Ban size={14} />
                        </button>
                      )}
                      {b.status === "blocked" && (
                        <button className="p-1.5 rounded-lg text-gray-400 hover:text-green-600 hover:bg-green-50 transition" title="Unblock">
                          <CheckCircle size={14} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
          <p className="text-sm text-gray-500">Showing <span className="font-semibold text-gray-700">10</span> of <span className="font-semibold text-gray-700">384</span> businesses</p>
          <div className="flex items-center gap-1">
            <button className="px-3 py-1.5 text-sm rounded-lg text-gray-500 hover:bg-gray-100 transition">Prev</button>
            <button className="px-3 py-1.5 text-sm rounded-lg bg-blue-600 text-white font-semibold">1</button>
            <button className="px-3 py-1.5 text-sm rounded-lg text-gray-500 hover:bg-gray-100 transition">2</button>
            <button className="px-3 py-1.5 text-sm rounded-lg text-gray-500 hover:bg-gray-100 transition">3</button>
            <span className="px-2 text-gray-400">…</span>
            <button className="px-3 py-1.5 text-sm rounded-lg text-gray-500 hover:bg-gray-100 transition">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
