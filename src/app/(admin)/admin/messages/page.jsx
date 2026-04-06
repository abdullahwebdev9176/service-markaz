import { MessageSquare, Search, Eye, Trash2, Reply } from "lucide-react";

const messages = [
  { id: 1,  name: "Muhammad Ali",     email: "ali@example.com",    subject: "Issue with business listing approval",    preview: "I submitted my listing 5 days ago but it still shows pending…",          date: "Apr 6, 2026",  status: "unread" },
  { id: 2,  name: "Sara Khan",         email: "sara@example.com",   subject: "How to update my profile?",               preview: "I want to change my business phone number but can't find the option…",   date: "Apr 5, 2026",  status: "unread" },
  { id: 3,  name: "Kamran Iqbal",      email: "kamran@example.com", subject: "Payment query",                           preview: "When will the subscription plan feature be available?",                   date: "Apr 4, 2026",  status: "read" },
  { id: 4,  name: "Hina Malik",        email: "hina@example.com",   subject: "Request to remove fake review",           preview: "Someone left a completely fake 1-star review on my listing…",            date: "Apr 4, 2026",  status: "unread" },
  { id: 5,  name: "Asif Qureshi",      email: "asif@example.com",   subject: "Unable to login to my account",           preview: "I reset my password but still getting authentication error…",             date: "Apr 3, 2026",  status: "read" },
  { id: 6,  name: "Nadia Tariq",       email: "nadia@example.com",  subject: "Business listing not showing in search",  preview: "My listing was approved but doesn't appear when searching category…",    date: "Apr 2, 2026",  status: "read" },
  { id: 7,  name: "Bilal Hassan",      email: "bilal@example.com",  subject: "Partnership inquiry",                     preview: "We are a large home services company and want to list multiple…",         date: "Apr 1, 2026",  status: "read" },
];

export default function MessagesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-800">Messages</h2>
        <p className="text-sm text-gray-500 mt-0.5">Support messages from users and providers.</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div className="bg-blue-50 rounded-2xl px-5 py-4">
          <p className="text-2xl font-bold text-blue-600">47</p>
          <p className="text-sm text-gray-600 mt-0.5">Total Messages</p>
        </div>
        <div className="bg-amber-50 rounded-2xl px-5 py-4">
          <p className="text-2xl font-bold text-amber-600">3</p>
          <p className="text-sm text-gray-600 mt-0.5">Unread</p>
        </div>
        <div className="bg-green-50 rounded-2xl px-5 py-4">
          <p className="text-2xl font-bold text-green-600">44</p>
          <p className="text-sm text-gray-600 mt-0.5">Read / Resolved</p>
        </div>
      </div>

      {/* Inbox */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex flex-wrap items-center gap-3 px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 flex-1 min-w-[200px]">
            <Search size={15} className="text-gray-400" />
            <input type="text" placeholder="Search messages…" className="bg-transparent text-sm placeholder-gray-400 outline-none w-full" />
          </div>
          <select className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-600 outline-none">
            <option value="">All Messages</option>
            <option>Unread</option>
            <option>Read</option>
          </select>
        </div>

        <div className="divide-y divide-gray-50">
          {messages.map((m) => (
            <div key={m.id} className={`flex items-start gap-4 px-6 py-4 hover:bg-gray-50 transition-colors ${m.status === "unread" ? "bg-blue-50/30" : ""}`}>
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                {m.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className={`text-sm font-semibold ${m.status === "unread" ? "text-gray-900" : "text-gray-700"}`}>{m.name}</span>
                  <span className="text-xs text-gray-400">{m.email}</span>
                  {m.status === "unread" && (
                    <span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
                  )}
                </div>
                <p className={`text-sm ${m.status === "unread" ? "font-semibold text-gray-800" : "text-gray-600"} truncate`}>{m.subject}</p>
                <p className="text-xs text-gray-400 mt-0.5 truncate">{m.preview}</p>
              </div>
              <div className="flex flex-col items-end gap-2 flex-shrink-0">
                <span className="text-xs text-gray-400">{m.date}</span>
                <div className="flex items-center gap-1">
                  <button className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition" title="View">
                    <Eye size={14} />
                  </button>
                  <button className="p-1.5 rounded-lg text-gray-400 hover:text-green-600 hover:bg-green-50 transition" title="Reply">
                    <Reply size={14} />
                  </button>
                  <button className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition" title="Delete">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
          <p className="text-sm text-gray-500">Showing <span className="font-semibold text-gray-700">7</span> of <span className="font-semibold text-gray-700">47</span> messages</p>
          <div className="flex items-center gap-1">
            <button className="px-3 py-1.5 text-sm rounded-lg text-gray-500 hover:bg-gray-100 transition">Prev</button>
            <button className="px-3 py-1.5 text-sm rounded-lg bg-blue-600 text-white font-semibold">1</button>
            <button className="px-3 py-1.5 text-sm rounded-lg text-gray-500 hover:bg-gray-100 transition">2</button>
            <button className="px-3 py-1.5 text-sm rounded-lg text-gray-500 hover:bg-gray-100 transition">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
