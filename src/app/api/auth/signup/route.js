import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { hashPassword } from "@/lib/utils/hash";
import User from "@/models/User";
import { connectDB } from "@/lib/db/connect";

export async function POST(request) {
    try {
        const body = await request.json();

        const { firstName, lastName, email, phone, password } = body;
        const name = `${firstName ?? ""} ${lastName ?? ""}`.trim();

        // ---------- Validation ----------
        if (!firstName || !lastName || !email || !phone || !password) {
            return NextResponse.json(
                { success: false, message: "All fields are required" },
                { status: 400 }
            );
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { success: false, message: "Invalid email format" },
                { status: 400 }
            );
        }

        if (password.length < 8) {
            return NextResponse.json(
                { success: false, message: "Password must be at least 8 characters" },
                { status: 400 }
            );
        }

        await connectDB();

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return NextResponse.json(
                { success: false, message: "Email already exists" },
                { status: 409 }
            );
        }

        const hashedPassword = await hashPassword(password);

        const newUser = await User.create({
            name,
            email,
            phone,
            password: hashedPassword
        });

        const token = jwt.sign(
            { id: newUser._id, email: newUser.email, role: newUser.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        return NextResponse.json(
            {
                success: true,
                message: "User created successfully",
                token,
                data: {
                    id: newUser._id,
                    name: newUser.name,
                    email: newUser.email,
                    phone: newUser.phone,
                    role: newUser.role,
                },
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Signup error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Something went wrong",
            },
            { status: 500 }
        );
    }
}