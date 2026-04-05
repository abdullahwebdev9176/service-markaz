import { MessageSquare, Star, UserCircle2 } from "lucide-react";

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={13}
          className={i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200 fill-gray-200"}
        />
      ))}
    </div>
  );
}

export default function ReviewsSection({ provider }) {
  return (
    <div className="bg-white shadow-sm rounded-2xl p-6 mb-6">
      <div className="flex items-center gap-2 mb-5">
        <div className="p-2 bg-yellow-50 rounded-lg">
          <MessageSquare size={18} className="text-yellow-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-800">Customer Reviews</h2>
        <span className="ml-auto flex items-center gap-1 text-sm font-semibold text-yellow-600 bg-yellow-50 border border-yellow-200 px-2.5 py-1 rounded-full">
          <Star size={13} className="fill-yellow-400 text-yellow-400" />
          {provider.rating} / 5
        </span>
      </div>

      <div className="space-y-4">
        {provider.reviews_list.map((review, index) => (
          <div
            key={index}
            className="bg-gray-50 border border-gray-100 rounded-xl p-4 hover:border-gray-200 transition"
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-white border border-gray-200 rounded-full shadow-sm">
                  <UserCircle2 size={22} className="text-gray-400" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">{review.author}</p>
                  <p className="text-xs text-gray-400">{review.date}</p>
                </div>
              </div>
              <StarRating rating={review.rating} />
            </div>
            <p className="text-gray-700 text-sm leading-relaxed pl-1">{review.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
