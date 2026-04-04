"use client";

import { useForm } from "react-hook-form";
import { Mail, Lock, LogIn } from "lucide-react";
import Link from "next/link";
import InputField from "@/app/components/Form/InputField";
import { useSignIn } from "@/app/hooks/useSignIn";

export default function SignInPage() {
  const { mutate: signIn, isPending, isError } = useSignIn();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => signIn(data);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-md p-8">

          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-purple-100 rounded-full mb-4">
              <LogIn size={26} className="text-purple-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Welcome Back</h1>
            <p className="text-sm text-gray-500 mt-2">Sign in to your Service Markaz account</p>
          </div>

          {/* Error Message */}
          {isError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg text-center">
              Invalid email or password. Please try again.
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">

            {/* Email */}
            <InputField
              label="Email Address"
              icon={Mail}
              type="email"
              placeholder="you@example.com"
              registration={register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address",
                },
              })}
              error={errors.email?.message}
            />

            {/* Password */}
            <InputField
              label="Password"
              icon={Lock}
              type="password"
              placeholder="Enter your password"
              registration={register("password", {
                required: "Password is required",
              })}
              error={errors.password?.message}
            />

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            >
              {isPending ? "Signing In..." : "Sign In"}
            </button>
          </form>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="text-purple-600 font-semibold hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
