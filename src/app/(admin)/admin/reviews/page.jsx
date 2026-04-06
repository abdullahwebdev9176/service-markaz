import { Star, Search, Eye, Trash2, ThumbsUp, ThumbsDown } from "lucide-react";

const reviews = [
  { id: 1,  business: "Hassan Electrical Services", reviewer: "Adnan Shah",      rating: 5, comment: "Excellent work! Fixed the wiring in 2 hours. Very professional and affordable.", date: "Apr 5, 2026",  status: "published" },
  { id: 2,  business: "CityFix Plumbers",           reviewer: "Sara Khan",        rating: 4, comment: "Good service, came on time. Minor issue with communication but overall satisfied.", date: "Apr 4, 2026",  status: "published" },
  { id: 3,  business: "FrostFix AC Solutions",      reviewer: "Bilal Chaudhry",   rating: 5, comment: "AC cooling restored in just one visit. Highly recommend this team!", date: "Apr 4, 2026",  status: "published" },
  { id: 4,  business: "WoodCraft Interiors",        reviewer: "Nadia Malik",      rating: 3, comment: "Work quality was okay but took longer than expected. Needs improvement.", date: "Apr 3, 2026",  status: "published" },
  { id: 5,  business: "Elite Home Cleaners",        reviewer: "Tariq Usman",      rating: 1, comment: "Very disappointing. Didn't finish the job and became rude when asked about it.", date: "Apr 2, 2026",  status: "flagged" },
  { id: 6,  business: "Hassan Electrical Services", reviewer: "Zubair Ahmad",     rating: 5, comment: "Came the same day and fixed everything perfectly. Great pricing too.", date: "Apr 1, 2026",  status: "published" },
  { id: 7,  business: "CityFix Plumbers",           reviewer: "Hira Ali",         rating: 4, comment: "Solved the pipe leakage issue quickly. Clean work area left behind.", date: "Mar 31, 2026", status: "published" },
  { id: 8,  business: "Elite Home Cleaners",        reviewer: "Usman Rana",       rating: 2, comment: "Missed several spots during cleaning. Not worth the price charged.", date: "Mar 29, 2026", status: "flagged" },
];

const ratingColor = (r) => {
  if (r >= 4) return "text-green-600";
  if (r >= 3) return "text-yellow-500";
  return "text-red-500";
};

const stars = (n) =>
  Array.from({ length: 5 }, (_, i) => (
    <Star
      key={i}
      size={11}
      className={i < n ? "text-yellow-400 fill-yellow-400" : "text-gray-200 fill-gray-200"}
    />
  ));

export default function ReviewsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-800">Reviews</h2>
        <p className="text-sm text-gray-500 mt-0.5">Monitor and moderate customer reviews.</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Reviews", value: "2,910", bg: "bg-blue-50",   text: "text-blue-600" },
          { label: "5-star",        value: "1,480", bg: "bg-green-50",  text: "text-green-600" },
          { label: "Avg Rating",    value: "4.3★",  bg: "bg-yellow-50", text: "text-yellow-600" },
          { label: "Flagged",       value: "14",    bg: "bg-red-50",    text: "text-red-600" },
        ].map((s) => (
          <div key={s.label} className={`${s.bg} rounded-2xl px-5 py-4`}>
            <p className={`text-2xl font-bold ${s.text}`}>{s.value}</p>
            <p className="text-sm text-gray-600 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex flex-wrap items-center gap-3 px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 flex-1 min-w-[200px]">
            <Search size={15} className="text-gray-400" />
            <input type="text" placeholder="Search reviews…" className="bg-transparent text-sm placeholder-gray-400 outline-none w-full" />
          </div>
          <select className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-600 outline-none">
            <option value="">All Ratings</option>
            <option>5 stars</option>
            <option>4 stars</option>
            <option>3 stars</option>
            <option>2 stars</option>
            <option>1 star</option>
          </select>
          <select className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-600 outline-none">
            <option value="">All Statuses</option>
            <option>published</option>
            <option>flagged</option>
          </select>
        </div>

        <div className="divide-y divide-gray-50">
          {reviews.map((r) => (
            <div key={r.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1.5">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                      {r.reviewer.charAt(0)}
                    </div>
                    <span className="font-semibold text-sm text-gray-800">{r.reviewer}</span>
                    <span className="text-gray-400 text-xs">on</span>
                    <span className="text-sm text-blue-600 font-medium">{r.business}</span>
                    <div className="flex items-center gap-0.5 ml-1">{stars(r.rating)}</div>
                    {r.status === "flagged" && (
                      <span className="text-xs bg-red-50 text-red-600 ring-1 ring-red-200 px-2 py-0.5 rounded-full font-semibold">Flagged</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">&ldquo;{r.comment}&rdquo;</p>
                  <p className="text-xs text-gray-400 mt-1.5">{r.date}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button className="p-1.5 rounded-lg text-gray-400 hover:text-green-600 hover:bg-green-50 transition" title="Approve">
                    <ThumbsUp size={14} />
                  </button>
                  <button className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition" title="Remove">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
          <p className="text-sm text-gray-500">Showing <span className="font-semibold text-gray-700">8</span> of <span className="font-semibold text-gray-700">2,910</span> reviews</p>
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
