import { Users, Search, Filter, Eye, Ban, CheckCircle, ArrowUpRight } from "lucide-react";

const users = [
  { id: 1,  name: "Muhammad Usman",   email: "usman@example.com",    phone: "03001234567", role: "Provider",  status: "active",  joined: "Apr 6, 2026" },
  { id: 2,  name: "Sara Khan",         email: "sara@example.com",     phone: "03111234567", role: "Customer",  status: "active",  joined: "Apr 6, 2026" },
  { id: 3,  name: "Bilal Ahmad",       email: "bilal@example.com",    phone: "03211234567", role: "Provider",  status: "pending", joined: "Apr 5, 2026" },
  { id: 4,  name: "Ayesha Siddiqui",   email: "ayesha@example.com",   phone: "03331234567", role: "Customer",  status: "active",  joined: "Apr 5, 2026" },
  { id: 5,  name: "Tariq Mehmood",     email: "tariq@example.com",    phone: "03451234567", role: "Provider",  status: "blocked", joined: "Apr 4, 2026" },
  { id: 6,  name: "Hassan Raza",       email: "hassan@example.com",   phone: "03121234567", role: "Provider",  status: "active",  joined: "Apr 3, 2026" },
  { id: 7,  name: "Nadia Malik",       email: "nadia@example.com",    phone: "03411234567", role: "Customer",  status: "active",  joined: "Apr 3, 2026" },
  { id: 8,  name: "Zubair Sheikh",     email: "zubair@example.com",   phone: "03031234567", role: "Provider",  status: "pending", joined: "Apr 2, 2026" },
  { id: 9,  name: "Fatima Zahra",      email: "fatima@example.com",   phone: "03221234567", role: "Customer",  status: "active",  joined: "Apr 1, 2026" },
  { id: 10, name: "Imran Khan",        email: "imran@example.com",    phone: "03441234567", role: "Provider",  status: "active",  joined: "Mar 31, 2026" },
];

const statusStyle = {
  active:  "bg-green-50 text-green-700 ring-1 ring-green-200",
  pending: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
  blocked: "bg-red-50 text-red-600 ring-1 ring-red-200",
};
const roleStyle = {
  Provider: "bg-blue-50 text-blue-700 ring-1 ring-blue-200",
  Customer: "bg-gray-100 text-gray-600",
};

const summaryCards = [
  { label: "Total Users",     value: "1,248", color: "text-blue-600",   bg: "bg-blue-50" },
  { label: "Providers",       value: "384",   color: "text-indigo-600", bg: "bg-indigo-50" },
  { label: "Customers",       value: "864",   color: "text-purple-600", bg: "bg-purple-50" },
  { label: "Blocked",         value: "12",    color: "text-red-600",    bg: "bg-red-50" },
];

export default function UsersPage() {
  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Users</h2>
          <p className="text-sm text-gray-500 mt-0.5">Manage all registered users on the platform.</p>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {summaryCards.map((s) => (
          <div key={s.label} className={`${s.bg} rounded-2xl px-5 py-4 border border-white`}>
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-sm text-gray-600 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 flex-1 min-w-[200px]">
            <Search size={15} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search users by name or email…"
              className="bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none w-full"
            />
          </div>
          <select className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-600 outline-none">
            <option value="">All Roles</option>
            <option>Provider</option>
            <option>Customer</option>
          </select>
          <select className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-600 outline-none">
            <option value="">All Statuses</option>
            <option>active</option>
            <option>pending</option>
            <option>blocked</option>
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-xs text-gray-500 font-medium">
                <th className="px-6 py-3 text-left">User</th>
                <th className="px-4 py-3 text-left">Phone</th>
                <th className="px-4 py-3 text-left">Role</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Joined</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                        {u.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{u.name}</p>
                        <p className="text-xs text-gray-400">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-gray-500 text-xs">{u.phone}</td>
                  <td className="px-4 py-3.5">
                    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${roleStyle[u.role]}`}>{u.role}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full capitalize ${statusStyle[u.status]}`}>{u.status}</span>
                  </td>
                  <td className="px-4 py-3.5 text-gray-400 text-xs">{u.joined}</td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <button className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition" title="View">
                        <Eye size={15} />
                      </button>
                      {u.status !== "blocked" ? (
                        <button className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition" title="Block">
                          <Ban size={15} />
                        </button>
                      ) : (
                        <button className="p-1.5 rounded-lg text-gray-400 hover:text-green-600 hover:bg-green-50 transition" title="Unblock">
                          <CheckCircle size={15} />
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
          <p className="text-sm text-gray-500">Showing <span className="font-semibold text-gray-700">10</span> of <span className="font-semibold text-gray-700">1,248</span> users</p>
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
