import { connectDB } from "@/lib/db/connect";
import Business from "@/models/Business";

/**
 * Normalize a MongoDB Business lean doc to the shape consumed by
 * <ProviderCard> and all profile-components (ProfileHeader, ExperienceSection, etc.)
 */
export function normalizeBusiness(doc) {
  const id = doc._id?.toString() || doc.id?.toString() || "";
  return {
    ...doc,
    _id: id,
    id,
    // ProviderCard expects `image` and `reviews`
    image: doc.profileImage || "",
    reviews: doc.reviewsCount ?? 0,
    rating: doc.rating ?? 0,
    // ExperienceSection expects `experience_details`
    experience_details: {
      years: doc.experience ?? 0,
      projects: doc.completedProjects ?? 0,
      specializations: doc.specializations ?? [],
    },
    // Serialize owner ObjectId so Next.js can pass it as a server component prop
    owner: doc.owner
      ? { ...doc.owner, _id: doc.owner._id?.toString() }
      : null,
  };
}

/**
 * Fetch businesses from MongoDB.
 *
 * @param {{
 *   category?: string,
 *   city?: string,
 *   search?: string,
 *   page?: number,
 *   limit?: number,
 *   onlyActive?: boolean
 * }} opts
 */
export async function getBusinesses({
  category,
  city,
  search,
  page = 1,
  limit = 10,
  onlyActive = true,
} = {}) {
  await connectDB();

  const query = {};
  if (onlyActive) query.status = "active";
  if (category) query.category = category;
  // City stored with original casing (e.g. "Rawalpindi") but URL slug is lowercase
  if (city) query.city = { $regex: new RegExp(`^${city}$`, "i") };
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { title: { $regex: search, $options: "i" } },
      { about: { $regex: search, $options: "i" } },
    ];
  }

  const skip = (page - 1) * limit;

  const [businesses, total] = await Promise.all([
    Business.find(query)
      .sort({ rating: -1, createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    Business.countDocuments(query),
  ]);

  return {
    businesses: businesses.map(normalizeBusiness),
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
}

/**
 * Fetch a single active business by its MongoDB _id string.
 */
export async function getBusinessById(id) {
  if (!id || !/^[a-f\d]{24}$/i.test(id)) return null;
  await connectDB();
  const doc = await Business.findById(id)
    .populate("owner", "name phone email")
    .lean();
  if (!doc) return null;
  return normalizeBusiness(doc);
}
