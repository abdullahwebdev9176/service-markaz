"use client";

import { useForm } from "react-hook-form";
import { User, Mail, Phone, Lock, UserPlus } from "lucide-react";
import Link from "next/link";
import InputField from "@/app/components/Form/InputField";
import { useSignUp } from "@/app/hooks/useSignUp";

const phonePattern = {
  value: /^03[0-9]{9}$/,
  message: "Enter a valid Pakistani number (03XXXXXXXXX)",
};

export default function SignUpPage() {
  const { mutate: signUp, isPending, isError, isSuccess } = useSignUp();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => signUp(data, { onSuccess: () => reset() });

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-md p-8">

          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-purple-100 rounded-full mb-4">
              <UserPlus size={26} className="text-purple-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Create an Account</h1>
            <p className="text-sm text-gray-500 mt-2">Sign up to get started with Service Markaz</p>
          </div>

          {/* Success Message */}
          {isSuccess && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg text-center">
              Account created successfully! You can now{" "}
              <Link href="/sign-in" className="font-semibold underline">
                sign in
              </Link>
              .
            </div>
          )}

          {/* Error Message */}
          {isError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg text-center">
              Something went wrong. Please try again.
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">

            {/* First Name & Last Name */}
            <div className="grid grid-cols-2 gap-4">
              <InputField
                label="First Name"
                icon={User}
                placeholder="Ali"
                registration={register("firstName", {
                  required: "First name is required",
                  minLength: { value: 2, message: "At least 2 characters" },
                })}
                error={errors.firstName?.message}
              />
              <InputField
                label="Last Name"
                icon={User}
                placeholder="Khan"
                registration={register("lastName", {
                  required: "Last name is required",
                  minLength: { value: 2, message: "At least 2 characters" },
                })}
                error={errors.lastName?.message}
              />
            </div>

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

            {/* Phone */}
            <InputField
              label="Phone Number"
              icon={Phone}
              type="tel"
              placeholder="03001234567"
              registration={register("phone", {
                required: "Phone number is required",
                pattern: phonePattern,
              })}
              error={errors.phone?.message}
            />

            {/* Password */}
            <InputField
              label="Password"
              icon={Lock}
              type="password"
              placeholder="Min. 8 characters"
              registration={register("password", {
                required: "Password is required",
                minLength: { value: 8, message: "Password must be at least 8 characters" },
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d).+$/,
                  message: "Must contain at least one letter and one number",
                },
              })}
              error={errors.password?.message}
            />

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            >
              {isPending ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          {/* Sign In Link */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-purple-600 font-semibold hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
