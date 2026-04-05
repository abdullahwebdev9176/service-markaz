import mongoose from "mongoose";

const pricingSchema = new mongoose.Schema(
    {
        calloutFee: { type: String, default: "" },
        hourlyRate: { type: String, default: "" },
        minCharge: { type: String, default: "" },
    },
    { _id: false }
);

const businessSchema = new mongoose.Schema(
    {
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true, // one business per user
            index: true,
        },

        // Contact info
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, lowercase: true, trim: true },
        phone: { type: String, required: true, trim: true },
        whatsapp: { type: String, default: "", trim: true },

        // Business details
        title: { type: String, required: true, trim: true },
        category: { type: String, required: true },
        city: { type: String, required: true },
        area: { type: String, required: true, trim: true },
        about: { type: String, required: true },

        // Services & expertise
        services: [{ type: String, trim: true }],
        experience: { type: Number, required: true, min: 0 },
        completedProjects: { type: Number, required: true, min: 0 },
        specializations: [{ type: String, trim: true }],

        // Coverage
        serviceAreas: [{ type: String, trim: true }],

        // Pricing
        pricing: { type: pricingSchema, default: () => ({}) },

        // Availability
        availability: {
            type: String,
            enum: ["Available", "Busy", "Unavailable"],
            default: "Available",
        },
        responseTime: { type: String, default: "" },

        // Images (Cloudinary URLs — stored as WebP)
        profileImage: { type: String, default: "" },
        bannerImage: { type: String, default: "" },

        // Admin-managed fields
        status: {
            type: String,
            enum: ["pending", "active", "blocked"],
            default: "pending",
        },
        rating: { type: Number, default: 0, min: 0, max: 5 },
        reviewsCount: { type: Number, default: 0 },
        verification: { type: Boolean, default: false },
    },
    { timestamps: true }
);

export default mongoose.models.Business ?? mongoose.model("Business", businessSchema);
