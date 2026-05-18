"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FaShieldAlt, FaEye, FaEyeSlash } from "react-icons/fa";
import { MdDeliveryDining } from "react-icons/md";
import { BsShieldCheck } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { resetPassword } from "@/api/services/routemisr.service";

const schema = z.object({
  newPassword: z
    .string()
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type FormData = z.infer<typeof schema>;

export default function ResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormData) => {
    setLoading(true);
    setApiError("");
    try {
      const email = localStorage.getItem("resetEmail") || "";
      const res = await resetPassword(email, values.newPassword);
      if (res?.token) {
        localStorage.setItem("token", res.token);
        localStorage.removeItem("resetEmail");
        setSuccess(true);
        setTimeout(() => router.push("/Home"), 1500);
      } else {
        setApiError("Something went wrong. Try again.");
      }
    } catch {
      setApiError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Side */}
      <div className="hidden lg:flex flex-col items-center justify-center w-1/2 bg-[#f0fdf4] px-16 py-12">
        <div className="w-80 h-72 relative mb-6">
          <Image
            src="https://img.freepik.com/free-vector/supermarket-shopping-cart-with-food_1284-6011.jpg"
            alt="FreshCart Shopping"
            fill
            className="object-contain"
          />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">
          FreshCart - Your One-Stop Shop for Fresh Products
        </h2>
        <p className="text-gray-500 text-sm text-center leading-relaxed mb-6">
          Join thousands of happy customers who trust FreshCart for their daily grocery needs.
        </p>
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5 text-sm text-gray-600">
            <MdDeliveryDining className="text-[#16A34A] text-lg" />
            Free Delivery
          </span>
          <span className="flex items-center gap-1.5 text-sm text-gray-600">
            <BsShieldCheck className="text-[#16A34A] text-lg" />
            Secure Payment
          </span>
          <span className="flex items-center gap-1.5 text-sm text-gray-600">
            <FaShieldAlt className="text-[#16A34A]" />
            24/7 Support
          </span>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex flex-col justify-center w-full lg:w-1/2 px-6 sm:px-12 lg:px-16 py-12">
        <div className="max-w-md w-full mx-auto">
          <h1 className="text-3xl font-bold text-[#16A34A] mb-1 text-center">FreshCart</h1>
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-1">Reset Password</h2>
          <p className="text-gray-500 text-sm text-center mb-6">
            Enter your new password below
          </p>

          {apiError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {apiError}
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-600 text-sm">
              Password reset successfully! Redirecting...
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* New Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔒</span>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  {...register("newPassword")}
                  className={`w-full border rounded-lg pl-9 pr-10 py-2.5 text-sm outline-none transition-all
                    ${errors.newPassword
                      ? "border-red-400 focus:ring-2 focus:ring-red-100"
                      : "border-gray-200 focus:border-[#16A34A] focus:ring-2 focus:ring-green-100"
                    }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.newPassword && (
                <p className="text-red-500 text-xs mt-1">{errors.newPassword.message}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔒</span>
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="Confirm new password"
                  {...register("confirmPassword")}
                  className={`w-full border rounded-lg pl-9 pr-10 py-2.5 text-sm outline-none transition-all
                    ${errors.confirmPassword
                      ? "border-red-400 focus:ring-2 focus:ring-red-100"
                      : "border-gray-200 focus:border-[#16A34A] focus:ring-2 focus:ring-green-100"
                    }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  {showConfirm ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#16A34A] hover:bg-green-700 text-white font-semibold py-2.5 rounded-lg transition-all text-sm disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Resetting...
                </span>
              ) : (
                "Reset Password"
              )}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-4">
            Remember your password?{" "}
            <Link href="/login" className="text-[#16A34A] font-semibold hover:underline">
              Sign in
            </Link>
          </p>

          <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t border-gray-100">
            <span className="flex items-center gap-1 text-xs text-gray-400">
              <FaShieldAlt className="text-[#16A34A]" /> SSL Secured
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-400">
              <span className="text-[#16A34A]">✓</span> 60k+ Users
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-400">
              <span className="text-[#16A34A]">★</span> 4.9 Rating
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}