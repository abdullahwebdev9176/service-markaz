import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/db/connect";
import Business from "@/models/Business";
import User from "@/models/User";

function verifyToken(request) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) return null;
  try {
    return jwt.verify(authHeader.slice(7), process.env.JWT_SECRET);
  } catch {
    return null;
  }
}

// POST /api/business — Create a new business listing
export async function POST(request) {
  const payload = verifyToken(request);
  if (!payload) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, message: "Invalid JSON body" }, { status: 400 });
  }

  const {
    name, email, phone, whatsapp,
    title, category, city, area, about,
    services, experience, completedProjects, specializations, serviceAreas,
    pricing, availability, responseTime,
    profileImage, bannerImage,
  } = body;

  // Field validation
  const requiredFields = { name, email, phone, title, category, city, area, about, availability, responseTime };
  const missing = Object.keys(requiredFields).filter((key) => !requiredFields[key]);
  if (missing.length) {
    return NextResponse.json(
      { success: false, message: `Required fields missing: ${missing.join(", ")}` },
      { status: 400 }
    );
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json({ success: false, message: "Invalid email format" }, { status: 400 });
  }

  if (!services?.length || services.every((s) => !s)) {
    return NextResponse.json({ success: false, message: "At least one service is required" }, { status: 400 });
  }

  await connectDB();

  // Enforce one business per user
  const existing = await Business.findOne({ owner: payload.id });
  if (existing) {
    return NextResponse.json(
      { success: false, message: "You already have a registered business listing" },
      { status: 409 }
    );
  }

  const business = await Business.create({
    owner: payload.id,
    name: name.trim(),
    email: email.toLowerCase().trim(),
    phone: phone.trim(),
    whatsapp: whatsapp?.trim() || "",
    title: title.trim(),
    category,
    city,
    area: area.trim(),
    about: about.trim(),
    services: services.filter(Boolean).map((s) => s.trim()),
    experience: Number(experience) || 0,
    completedProjects: Number(completedProjects) || 0,
    specializations: specializations?.filter(Boolean).map((s) => s.trim()) || [],
    serviceAreas: serviceAreas?.filter(Boolean).map((s) => s.trim()) || [],
    pricing: {
      calloutFee: pricing?.calloutFee || "",
      hourlyRate: pricing?.hourlyRate || "",
      minCharge: pricing?.minCharge || "",
    },
    availability,
    responseTime,
    profileImage: profileImage || "",
    bannerImage: bannerImage || "",
  });

  // Update user role to provider
  await User.findByIdAndUpdate(payload.id, { role: "provider" });

  return NextResponse.json({ success: true, data: business }, { status: 201 });
}

// GET /api/business — Get the logged-in user's business listing
export async function GET(request) {
  const payload = verifyToken(request);
  if (!payload) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const business = await Business.findOne({ owner: payload.id });
  if (!business) {
    return NextResponse.json({ success: false, message: "No business listing found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, data: business });
}

// PUT /api/business — Update the logged-in user's business listing
export async function PUT(request) {
  const payload = verifyToken(request);
  if (!payload) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, message: "Invalid JSON body" }, { status: 400 });
  }

  const {
    name, email, phone, whatsapp,
    title, category, city, area, about,
    services, experience, completedProjects, specializations, serviceAreas,
    pricing, availability, responseTime,
    profileImage, bannerImage,
  } = body;

  const requiredFields = { name, email, phone, title, category, city, area, about, availability, responseTime };
  const missing = Object.keys(requiredFields).filter((key) => !requiredFields[key]);
  if (missing.length) {
    return NextResponse.json(
      { success: false, message: `Required fields missing: ${missing.join(", ")}` },
      { status: 400 }
    );
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json({ success: false, message: "Invalid email format" }, { status: 400 });
  }

  if (!services?.length || services.every((s) => !s)) {
    return NextResponse.json({ success: false, message: "At least one service is required" }, { status: 400 });
  }

  await connectDB();

  const business = await Business.findOne({ owner: payload.id });
  if (!business) {
    return NextResponse.json({ success: false, message: "No business listing found" }, { status: 404 });
  }

  business.name = name.trim();
  business.email = email.toLowerCase().trim();
  business.phone = phone.trim();
  business.whatsapp = whatsapp?.trim() || "";
  business.title = title.trim();
  business.category = category;
  business.city = city;
  business.area = area.trim();
  business.about = about.trim();
  business.services = services.filter(Boolean).map((s) => s.trim());
  business.experience = Number(experience) || 0;
  business.completedProjects = Number(completedProjects) || 0;
  business.specializations = specializations?.filter(Boolean).map((s) => s.trim()) || [];
  business.serviceAreas = serviceAreas?.filter(Boolean).map((s) => s.trim()) || [];
  business.pricing = {
    calloutFee: pricing?.calloutFee || "",
    hourlyRate: pricing?.hourlyRate || "",
    minCharge: pricing?.minCharge || "",
  };
  business.availability = availability;
  business.responseTime = responseTime;
  if (profileImage) business.profileImage = profileImage;
  if (bannerImage !== undefined) business.bannerImage = bannerImage;

  await business.save();

  return NextResponse.json({ success: true, data: business });
}
