"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FaShieldAlt } from "react-icons/fa";
import { MdDeliveryDining } from "react-icons/md";
import { BsShieldCheck } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { forgotPassword } from "@/api/services/routemisr.service";

const schema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
});

type FormData = z.infer<typeof schema>;

export default function ForgotPasswordPage() {
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
      const res = await forgotPassword(values.email);
      if (res?.message === "success") {
        setSuccess(true);
        localStorage.setItem("resetEmail", values.email);
        setTimeout(() => router.push("/verify-code"), 1500);
      } else {
        setApiError(res?.message || "Something went wrong. Try again.");
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
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-1">Forgot Password?</h2>
          <p className="text-gray-500 text-sm text-center mb-6">
            Enter your email and we will send you a reset code
          </p>

          {apiError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {apiError}
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-600 text-sm">
              Reset code sent! Redirecting...
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">✉</span>
                <input
                  type="email"
                  placeholder="Enter your email"
                  {...register("email")}
                  className={`w-full border rounded-lg pl-9 pr-4 py-2.5 text-sm outline-none transition-all
                    ${errors.email
                      ? "border-red-400 focus:ring-2 focus:ring-red-100"
                      : "border-gray-200 focus:border-[#16A34A] focus:ring-2 focus:ring-green-100"
                    }`}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
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
                  Sending...
                </span>
              ) : (
                "Send Reset Code"
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