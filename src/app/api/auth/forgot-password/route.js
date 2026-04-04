import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/models/User";
import { connectDB } from "@/lib/db/connect";

export async function POST(request) {
    try {
        const body = await request.json();
        const { email, favoriteGame } = body;

        if (!email || !favoriteGame) {
            return NextResponse.json(
                { success: false, message: "Email and favorite game are required" },
                { status: 400 }
            );
        }

        await connectDB();

        // Explicitly select favoriteGame (select: false in schema)
        const user = await User.findOne({ email }).select("+favoriteGame");

        // Generic message — don't reveal whether email exists
        const invalidMsg = "Email or favorite game did not match";

        if (!user) {
            return NextResponse.json(
                { success: false, message: invalidMsg },
                { status: 401 }
            );
        }

        const isMatch = user.favoriteGame === favoriteGame.trim().toLowerCase();

        if (!isMatch) {
            return NextResponse.json(
                { success: false, message: invalidMsg },
                { status: 401 }
            );
        }

        // Short-lived reset token (15 minutes)
        const resetToken = jwt.sign(
            { id: user._id, purpose: "reset" },
            process.env.JWT_SECRET,
            { expiresIn: "15m" }
        );

        return NextResponse.json(
            {
                success: true,
                message: "Identity verified. You can now reset your password.",
                resetToken,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Forgot password error:", error);
        return NextResponse.json(
            { success: false, message: "Something went wrong" },
            { status: 500 }
        );
    }
}
