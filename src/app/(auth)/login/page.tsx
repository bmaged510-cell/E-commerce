"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FaGoogle, FaFacebook, FaEye, FaEyeSlash, FaShieldAlt } from "react-icons/fa";
import { MdDeliveryDining } from "react-icons/md";
import { BsShieldCheck } from "react-icons/bs";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@/Context/AuthContext";

const loginSchema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const router = useRouter();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (values: LoginFormData) => {
    setLoading(true);
    setApiError("");
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        values
      );
      if (data.message === "success") {
        login(data.token);
        router.push("/Home");
      }
    } catch (error: any) {
      setApiError(
        error?.response?.data?.message || "Something went wrong. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex">
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

      <div className="flex flex-col justify-center w-full lg:w-1/2 px-6 sm:px-12 lg:px-16 py-12">
        <div className="max-w-md w-full mx-auto">
          <h1 className="text-3xl font-bold text-[#16A34A] mb-1 text-center">FreshCart</h1>
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-1">Welcome Back!</h2>
          <p className="text-gray-500 text-sm text-center mb-6">
            Sign in to continue your fresh shopping experience
          </p>

          <div className="flex flex-col gap-3 mb-4">
            <button className="w-full flex items-center justify-center gap-2 border border-gray-200 rounded-lg py-2.5 text-sm font-medium hover:bg-gray-50 transition-all cursor-pointer">
              <FaGoogle className="text-red-500" />
              Continue with Google
            </button>
            <button className="w-full flex items-center justify-center gap-2 border border-gray-200 rounded-lg py-2.5 text-sm font-medium hover:bg-gray-50 transition-all cursor-pointer">
              <FaFacebook className="text-blue-600" />
              Continue with Facebook
            </button>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400 uppercase">or continue with email</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {apiError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {apiError}
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

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <Link href="/forgot-password" className="text-xs text-[#16A34A] hover:underline">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔒</span>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  {...register("password")}
                  className={`w-full border rounded-lg pl-9 pr-10 py-2.5 text-sm outline-none transition-all
                    ${errors.password
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
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
              )}
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="remember"
                className="accent-[#16A34A] w-4 h-4 cursor-pointer"
              />
              <label htmlFor="remember" className="text-sm text-gray-600 cursor-pointer">
                Keep me signed in
              </label>
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
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-4">
            New to FreshCart?{" "}
            <Link href="/register" className="text-[#16A34A] font-semibold hover:underline">
              Create an account
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