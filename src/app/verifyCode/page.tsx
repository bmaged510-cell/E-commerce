"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaShieldAlt } from "react-icons/fa";
import { MdDeliveryDining } from "react-icons/md";
import { BsShieldCheck } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { verifyResetCode } from "@/api/services/routemisr.service";

export default function VerifyCodePage() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [success, setSuccess] = useState(false);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; 
    const newCode = [...code];
    newCode[index] = value.slice(-1); 
    setCode(newCode);
    if (value && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const resetCode = code.join("");
    if (resetCode.length < 6) {
      setApiError("Please enter the complete 6-digit code");
      return;
    }
    setLoading(true);
    setApiError("");
    try {
      const res = await verifyResetCode(resetCode);
      if (res?.status === "Success") {
        setSuccess(true);
        setTimeout(() => router.push("/reset-password"), 1500);
      } else {
        setApiError(res?.status || "Invalid code. Please try again.");
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
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-1">Verify Your Code</h2>
          <p className="text-gray-500 text-sm text-center mb-6">
            Enter the 6-digit code sent to your email
          </p>

          {apiError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {apiError}
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-600 text-sm">
              Code verified! Redirecting...
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 6 Digit Inputs */}
            <div className="flex justify-center gap-3">
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => { inputs.current[index] = el; }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className={`w-12 h-12 text-center text-lg font-bold border-2 rounded-lg outline-none transition-all
                    ${digit
                      ? "border-[#16A34A] bg-green-50 text-[#16A34A]"
                      : "border-gray-200 focus:border-[#16A34A] focus:ring-2 focus:ring-green-100"
                    }`}
                />
              ))}
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
                  Verifying...
                </span>
              ) : (
                "Verify Code"
              )}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-4">
            Didn,t receive a code?{" "}
            <Link href="/forgot-password" className="text-[#16A34A] font-semibold hover:underline">
              Resend
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