"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FaGoogle, FaFacebook, FaEye, FaEyeSlash, FaShieldAlt, FaStar } from "react-icons/fa";
import { MdDeliveryDining } from "react-icons/md";
import { BsShieldCheck } from "react-icons/bs";
import axios from "axios";
import { useRouter } from "next/navigation";

const registerSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[0-9]/, "Must contain a number")
      .regex(/[^a-zA-Z0-9]/, "Must contain a symbol"),
    rePassword: z.string().min(1, "Please confirm your password"),
    phone: z
      .string()
      .regex(/^01[0125][0-9]{8}$/, "Enter a valid Egyptian phone number"),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

function getPasswordStrength(password: string) {
  if (!password) return { label: "", color: "", width: "0%" };
  let score = 0;
  if (password.length >= 8) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;
  if (password.length >= 12) score++;
  if (score <= 1) return { label: "Weak", color: "bg-red-400", width: "25%" };
  if (score === 2) return { label: "Fair", color: "bg-yellow-400", width: "50%" };
  if (score === 3) return { label: "Good", color: "bg-blue-400", width: "75%" };
  return { label: "Strong", color: "bg-green-500", width: "100%" };
}

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const passwordValue = watch("password", "");
  const strength = getPasswordStrength(passwordValue);

  const onSubmit = async (values: RegisterFormData) => {
    setLoading(true);
    setApiError("");
    setSuccessMsg("");
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values
      );
      if (data.message === "success") {
        setSuccessMsg("Account created successfully! Redirecting...");
        setTimeout(() => router.push("/login"), 1500);
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
      {/* Left Side */}
      <div className="hidden lg:flex flex-col justify-center w-1/2 bg-gray-50 px-16 py-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Welcome to{" "}
          <span className="text-[#16A34A]">FreshCart</span>
        </h2>
        <p className="text-gray-500 text-sm leading-relaxed mb-8">
          Join thousands of happy customers who enjoy fresh groceries delivered
          right to their doorstep.
        </p>

        {/* Features */}
        <div className="space-y-5 mb-10">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center shrink-0">
              <FaStar className="text-[#16A34A] text-sm" />
            </div>
            <div>
              <p className="font-semibold text-sm text-gray-800">Premium Quality</p>
              <p className="text-xs text-gray-500">
                Premium quality products sourced from trusted suppliers.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center shrink-0">
              <MdDeliveryDining className="text-[#16A34A] text-lg" />
            </div>
            <div>
              <p className="font-semibold text-sm text-gray-800">Fast Delivery</p>
              <p className="text-xs text-gray-500">
                Same-day delivery available in most areas
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center shrink-0">
              <BsShieldCheck className="text-[#16A34A] text-lg" />
            </div>
            <div>
              <p className="font-semibold text-sm text-gray-800">Secure Shopping</p>
              <p className="text-xs text-gray-500">
                Your data and payments are completely secure
              </p>
            </div>
          </div>
        </div>

        {/* Testimonial */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center font-bold text-yellow-600">
              S
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">Sarah Johnson</p>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 text-xs" />
                ))}
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500 italic leading-relaxed">
            "FreshCart has transformed my shopping experience. The quality of
            the products is outstanding, and the delivery is always on time.
            Highly recommend!"
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex flex-col justify-center w-full lg:w-1/2 px-6 sm:px-12 lg:px-16 py-10 overflow-y-auto">
        <div className="max-w-md w-full mx-auto">
          {/* Header */}
          <h2 className="text-2xl font-bold text-gray-800 mb-1">
            Create Your Account
          </h2>
          <p className="text-gray-500 text-sm mb-5">
            Start your fresh journey with us today
          </p>

          {/* Social Buttons */}
          <div className="flex gap-3 mb-4">
            <button className="flex-1 flex items-center justify-center gap-2 border border-gray-200 rounded-lg py-2.5 text-sm font-medium hover:bg-gray-50 transition-all cursor-pointer">
              <FaGoogle className="text-red-500" />
              Google
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 border border-gray-200 rounded-lg py-2.5 text-sm font-medium hover:bg-gray-50 transition-all cursor-pointer">
              <FaFacebook className="text-blue-600" />
              Facebook
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400">or</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* API Messages */}
          {apiError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {apiError}
            </div>
          )}
          {successMsg && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
              {successMsg}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Ali"
                {...register("name")}
                className={`w-full border rounded-lg px-4 py-2.5 text-sm outline-none transition-all
                  ${errors.name
                    ? "border-red-400 focus:ring-2 focus:ring-red-100"
                    : "border-gray-200 focus:border-[#16A34A] focus:ring-2 focus:ring-green-100"
                  }`}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                placeholder="ali@example.com"
                {...register("email")}
                className={`w-full border rounded-lg px-4 py-2.5 text-sm outline-none transition-all
                  ${errors.email
                    ? "border-red-400 focus:ring-2 focus:ring-red-100"
                    : "border-gray-200 focus:border-[#16A34A] focus:ring-2 focus:ring-green-100"
                  }`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="create a strong password"
                  {...register("password")}
                  className={`w-full border rounded-lg px-4 py-2.5 text-sm outline-none transition-all pr-10
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
              {/* Strength Bar */}
              {passwordValue && (
                <div className="mt-2">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-400">
                      Must be at least 8 characters with numbers and symbols
                    </span>
                    <span className={`text-xs font-medium ${
                      strength.label === "Weak" ? "text-red-500" :
                      strength.label === "Fair" ? "text-yellow-500" :
                      strength.label === "Good" ? "text-blue-500" : "text-green-600"
                    }`}>
                      {strength.label}
                    </span>
                  </div>
                  <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${strength.color}`}
                      style={{ width: strength.width }}
                    />
                  </div>
                </div>
              )}
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="confirm your password"
                  {...register("rePassword")}
                  className={`w-full border rounded-lg px-4 py-2.5 text-sm outline-none transition-all pr-10
                    ${errors.rePassword
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
              {errors.rePassword && (
                <p className="text-red-500 text-xs mt-1">{errors.rePassword.message}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                placeholder="+1 234 567 8900"
                {...register("phone")}
                className={`w-full border rounded-lg px-4 py-2.5 text-sm outline-none transition-all
                  ${errors.phone
                    ? "border-red-400 focus:ring-2 focus:ring-red-100"
                    : "border-gray-200 focus:border-[#16A34A] focus:ring-2 focus:ring-green-100"
                  }`}
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
              )}
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="terms"
                required
                className="accent-[#16A34A] w-4 h-4 mt-0.5 cursor-pointer shrink-0"
              />
              <label htmlFor="terms" className="text-sm text-gray-600 cursor-pointer">
                I agree to the{" "}
                <Link href="/terms" className="text-[#16A34A] hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-[#16A34A] hover:underline">
                  Privacy Policy
                </Link>{" "}
                <span className="text-red-500">*</span>
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#16A34A] hover:bg-green-700 text-white font-semibold py-2.5 rounded-lg transition-all text-sm disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Creating account...
                </>
              ) : (
                <>
                  <FaShieldAlt />
                  Create My Account
                </>
              )}
            </button>
          </form>

          {/* Login Link */}
          <p className="text-center text-sm text-gray-500 mt-4">
            Already have an account?{" "}
            <Link href="/login" className="text-[#16A34A] font-semibold hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}