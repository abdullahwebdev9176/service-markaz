import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/connect";
import Business from "@/models/Business";

// GET /api/businesses — Fetch active businesses for customers
// Query params: category, city, search, page, limit
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category")?.trim() || "";
    const city = searchParams.get("city")?.trim() || "";
    const search = searchParams.get("search")?.trim() || "";
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") || "10", 10)));

    await connectDB();

    // Build query - only active businesses
    const query = { status: "active" };

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { title: { $regex: search, $options: "i" } },
        { about: { $regex: search, $options: "i" } },
        { services: { $in: [new RegExp(search, "i")] } },
      ];
    }

    if (category) query.category = category;
    if (city) query.city = city;

    const businesses = await Business.find(query)
      .populate("owner", "name phone")
      .select("-owner.password -owner.favoriteGame")
      .sort({ rating: -1, createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    const total = await Business.countDocuments(query);

    return NextResponse.json({
      success: true,
      data: {
        businesses,
        total,
        page,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("GET /api/businesses error:", error);
    return NextResponse.json({ success: false, message: "Something went wrong" }, { status: 500 });
  }
}
