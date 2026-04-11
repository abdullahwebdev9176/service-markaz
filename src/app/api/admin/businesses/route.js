import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/db/connect";
import Business from "@/models/Business";

function verifyAdmin(request) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) return null;
  try {
    const payload = jwt.verify(authHeader.slice(7), process.env.JWT_SECRET);
    return payload.role === "admin" ? payload : null;
  } catch {
    return null;
  }
}

// GET /api/admin/businesses
export async function GET(request) {
  const payload = verifyAdmin(request);
  if (!payload) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search")?.trim() || "";
    const status = searchParams.get("status") || "";
    const category = searchParams.get("category") || "";
    const city = searchParams.get("city") || "";
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") || "10", 10)));

    await connectDB();

    // Build filter query
    const query = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { title: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
      ];
    }
    if (status) query.status = status;
    if (category) query.category = category;
    if (city) query.city = city;

    const [businesses, total, totalActive, totalPending, totalBlocked] = await Promise.all([
      Business.find(query)
        .populate("owner", "name email phone role")
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      Business.countDocuments(query),
      Business.countDocuments({ status: "active" }),
      Business.countDocuments({ status: "pending" }),
      Business.countDocuments({ status: "blocked" }),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        businesses,
        total,
        page,
        totalPages: Math.ceil(total / limit),
        summary: {
          active: totalActive,
          pending: totalPending,
          blocked: totalBlocked,
        },
      },
    });
  } catch (error) {
    console.error("GET /api/admin/businesses error:", error);
    return NextResponse.json({ success: false, message: "Something went wrong" }, { status: 500 });
  }
}

// PATCH /api/admin/businesses — update status of a business
export async function PATCH(request) {
  const payload = verifyAdmin(request);
  if (!payload) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { businessId, status } = body;

    if (!businessId || !["active", "blocked", "pending"].includes(status)) {
      return NextResponse.json({ success: false, message: "Invalid request" }, { status: 400 });
    }

    await connectDB();

    const business = await Business.findByIdAndUpdate(
      businessId,
      { status },
      { new: true }
    ).populate("owner", "name email phone role");

    if (!business) {
      return NextResponse.json({ success: false, message: "Business not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Business updated", data: business });
  } catch (error) {
    console.error("PATCH /api/admin/businesses error:", error);
    return NextResponse.json({ success: false, message: "Something went wrong" }, { status: 500 });
  }
}
