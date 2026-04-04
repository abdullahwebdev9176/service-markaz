import { NextResponse } from "next/server";
import { hashPassword } from "@/lib/utils/hash";
import User from "@/models/User";
import { connectDB } from "@/lib/db/connect";

export async function POST(request) {
    try {
        const body = await request.json();

        const { name, email, phone, password } = body;

        // ---------- Validation ----------
        if (!name || !email || !phone || !password) {
            return NextResponse.json(
                { success: false, message: "All fields are required" },
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

        return NextResponse.status(201).json(
            {
                success: true,
                message: "User created successfully",
                data: {
                    id: newUser._id,
                    name: newUser.name,
                    email: newUser.email,
                    phone: newUser.phone,
                },
            }
        );
    } catch (error) {
        console.error("Signup error:", error);

        return NextResponse.status(500).json(
            {
                success: false,
                message: "Something went wrong",
            }
        );
    }
}