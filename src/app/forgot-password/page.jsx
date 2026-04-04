"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Mail, Gamepad2, Lock, KeyRound, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import InputField from "@/app/components/Form/InputField";
import { useForgotPassword } from "@/app/hooks/useForgotPassword";
import { useResetPassword } from "@/app/hooks/useResetPassword";

export default function ForgotPasswordPage() {
  const [step, setStep] = useState(1); // 1 = verify identity, 2 = new password, 3 = done
  const [resetToken, setResetToken] = useState(null);

  // Step 1 form
  const {
    register: registerStep1,
    handleSubmit: handleStep1,
    formState: { errors: errorsStep1 },
  } = useForm();

  // Step 2 form
  const {
    register: registerStep2,
    handleSubmit: handleStep2,
    watch,
    formState: { errors: errorsStep2 },
  } = useForm();

  const {
    mutate: verifyIdentity,
    isPending: isVerifying,
    error: verifyError,
  } = useForgotPassword();

  const {
    mutate: resetPassword,
    isPending: isResetting,
    error: resetError,
  } = useResetPassword();

  const onVerify = (data) => {
    verifyIdentity(data, {
      onSuccess: (res) => {
        setResetToken(res.resetToken);
        setStep(2);
      },
    });
  };

  const onReset = (data) => {
    resetPassword(
      { resetToken, newPassword: data.newPassword },
      { onSuccess: () => setStep(3) }
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-md p-8">

          {/* ─── Step 1: Verify Identity ─── */}
          {step === 1 && (
            <>
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-purple-100 rounded-full mb-4">
                  <KeyRound size={26} className="text-purple-600" />
                </div>
                <h1 className="text-2xl font-bold text-gray-800">Forgot Password?</h1>
                <p className="text-sm text-gray-500 mt-2">
                  Enter your email and the favorite game you registered with
                </p>
              </div>

              {verifyError && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg text-center">
                  {verifyError.message}
                </div>
              )}

              <form onSubmit={handleStep1(onVerify)} noValidate className="space-y-5">
                <InputField
                  label="Email Address"
                  icon={Mail}
                  type="email"
                  placeholder="you@example.com"
                  registration={registerStep1("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Enter a valid email address",
                    },
                  })}
                  error={errorsStep1.email?.message}
                />

                <InputField
                  label="Favorite Game"
                  icon={Gamepad2}
                  placeholder="e.g. Counter Strike, FIFA, GTA"
                  hint="Enter exactly as you registered"
                  registration={registerStep1("favoriteGame", {
                    required: "Favorite game is required",
                  })}
                  error={errorsStep1.favoriteGame?.message}
                />

                <button
                  type="submit"
                  disabled={isVerifying}
                  className="w-full py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isVerifying ? "Verifying..." : "Verify Identity"}
                </button>
              </form>

              <p className="text-center text-sm text-gray-500 mt-6">
                Remember your password?{" "}
                <Link href="/sign-in" className="text-purple-600 font-semibold hover:underline">
                  Sign In
                </Link>
              </p>
            </>
          )}

          {/* ─── Step 2: Set New Password ─── */}
          {step === 2 && (
            <>
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-green-100 rounded-full mb-4">
                  <Lock size={26} className="text-green-600" />
                </div>
                <h1 className="text-2xl font-bold text-gray-800">Set New Password</h1>
                <p className="text-sm text-gray-500 mt-2">
                  Identity verified! Choose a strong new password
                </p>
              </div>

              {resetError && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg text-center">
                  {resetError.message}
                </div>
              )}

              <form onSubmit={handleStep2(onReset)} noValidate className="space-y-5">
                <InputField
                  label="New Password"
                  icon={Lock}
                  type="password"
                  placeholder="Min. 8 characters"
                  registration={registerStep2("newPassword", {
                    required: "New password is required",
                    minLength: { value: 8, message: "Password must be at least 8 characters" },
                    pattern: {
                      value: /^(?=.*[A-Za-z])(?=.*\d).+$/,
                      message: "Must contain at least one letter and one number",
                    },
                  })}
                  error={errorsStep2.newPassword?.message}
                />

                <InputField
                  label="Confirm New Password"
                  icon={Lock}
                  type="password"
                  placeholder="Re-enter new password"
                  registration={registerStep2("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (val) =>
                      val === watch("newPassword") || "Passwords do not match",
                  })}
                  error={errorsStep2.confirmPassword?.message}
                />

                <button
                  type="submit"
                  disabled={isResetting}
                  className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isResetting ? "Resetting..." : "Reset Password"}
                </button>
              </form>
            </>
          )}

          {/* ─── Step 3: Success ─── */}
          {step === 3 && (
            <div className="text-center py-4">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-5">
                <CheckCircle2 size={32} className="text-green-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">Password Reset!</h1>
              <p className="text-sm text-gray-500 mb-8">
                Your password has been reset successfully. You can now sign in with your new password.
              </p>
              <Link
                href="/sign-in"
                className="inline-block w-full py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors text-center"
              >
                Go to Sign In
              </Link>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
