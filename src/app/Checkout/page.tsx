"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useCart } from "@/Context/CartContext";
import { createCashOrderV2, createOnlineOrder } from "@/api/services/routemisr.service";
import { FaShieldAlt, FaMapMarkerAlt, FaPhone, FaCity, FaLock } from "react-icons/fa";
import { MdDeliveryDining } from "react-icons/md";

const schema = z.object({
  details: z.string().min(10, "Address must be at least 10 characters"),
  phone: z
    .string()
    .regex(/^01[0125][0-9]{8}$/, "Enter a valid Egyptian phone number"),
  city: z.string().min(3, "City must be at least 3 characters"),
});

type FormData = z.infer<typeof schema>;

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [success, setSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "online">("cash");
  const router = useRouter();
  const { cart, clearCart } = useCart();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormData) => {
    if (!cart?._id) { setApiError("Your cart is empty!"); return; }
    setLoading(true);
    setApiError("");
    try {
      if (paymentMethod === "online") {
        const res = await createOnlineOrder(cart._id, values);
        if (res?.session?.url) {
          window.location.href = res.session.url;
        } else {
          setApiError(res?.message || "Something went wrong.");
        }
      } else {
        const res = await createCashOrderV2(cart._id, values);
        if (res?.status === "success") {
          await clearCart();
          setSuccess(true);
          setTimeout(() => router.push("/Home"), 2000);
        } else {
          setApiError(res?.message || "Something went wrong. Try again.");
        }
      }
    } catch {
      setApiError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Left - Form */}
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-1">Checkout</h1>
          <p className="text-gray-500 text-sm mb-6">Fill in your shipping details to complete your order</p>

          {apiError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {apiError}
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-600 text-sm">
              🎉 Order placed successfully! Redirecting...
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Details */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address Details
              </label>
              <div className="relative">
                <FaMapMarkerAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="e.g. 123 Nile Street, Apt 4"
                  {...register("details")}
                  className={`w-full border rounded-lg pl-9 pr-4 py-2.5 text-sm outline-none transition-all
                    ${errors.details
                      ? "border-red-400 focus:ring-2 focus:ring-red-100"
                      : "border-gray-200 focus:border-[#16A34A] focus:ring-2 focus:ring-green-100"
                    }`}
                />
              </div>
              {errors.details && (
                <p className="text-red-500 text-xs mt-1">{errors.details.message}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <div className="relative">
                <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="tel"
                  placeholder="e.g. 01012345678"
                  {...register("phone")}
                  className={`w-full border rounded-lg pl-9 pr-4 py-2.5 text-sm outline-none transition-all
                    ${errors.phone
                      ? "border-red-400 focus:ring-2 focus:ring-red-100"
                      : "border-gray-200 focus:border-[#16A34A] focus:ring-2 focus:ring-green-100"
                    }`}
                />
              </div>
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
              )}
            </div>

            {/* City */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <div className="relative">
                <FaCity className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="e.g. Cairo"
                  {...register("city")}
                  className={`w-full border rounded-lg pl-9 pr-4 py-2.5 text-sm outline-none transition-all
                    ${errors.city
                      ? "border-red-400 focus:ring-2 focus:ring-red-100"
                      : "border-gray-200 focus:border-[#16A34A] focus:ring-2 focus:ring-green-100"
                    }`}
                />
              </div>
              {errors.city && (
                <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>
              )}
            </div>

            {/* Payment Method */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">Payment Method</label>

              {/* Cash */}
              <div
                onClick={() => setPaymentMethod("cash")}
                className={`p-4 border rounded-lg flex items-center gap-3 cursor-pointer transition-all ${
                  paymentMethod === "cash" ? "border-[#16A34A] bg-green-50" : "border-gray-200"
                }`}
              >
                <MdDeliveryDining className="text-[#16A34A] text-2xl" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-700">Cash on Delivery</p>
                  <p className="text-xs text-gray-500">Pay when your order arrives</p>
                </div>
                <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  paymentMethod === "cash" ? "border-[#16A34A]" : "border-gray-300"
                }`}>
                  {paymentMethod === "cash" && <span className="w-2 h-2 rounded-full bg-[#16A34A]" />}
                </span>
              </div>

              {/* Online */}
              <div
                onClick={() => setPaymentMethod("online")}
                className={`p-4 border rounded-lg flex items-center gap-3 cursor-pointer transition-all ${
                  paymentMethod === "online" ? "border-[#16A34A] bg-green-50" : "border-gray-200"
                }`}
              >
                <FaLock className="text-[#16A34A] text-xl" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-700">Online Payment</p>
                  <p className="text-xs text-gray-500">Pay securely with Stripe</p>
                </div>
                <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  paymentMethod === "online" ? "border-[#16A34A]" : "border-gray-300"
                }`}>
                  {paymentMethod === "online" && <span className="w-2 h-2 rounded-full bg-[#16A34A]" />}
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !cart?.products?.length}
              className="w-full bg-[#16A34A] hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-all text-sm disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Placing Order...
                </span>
              ) : paymentMethod === "online" ? "Pay Online 💳" : "Place Order 🛒"}
            </button>
          </form>

          <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t border-gray-100">
            <span className="flex items-center gap-1 text-xs text-gray-400">
              <FaShieldAlt className="text-[#16A34A]" /> SSL Secured
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-400">
              <span className="text-[#16A34A]">✓</span> Safe Checkout
            </span>
          </div>
        </div>

        {/* Right - Order Summary */}
        <div className="bg-white rounded-2xl shadow-sm p-8 h-fit">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>

          {!cart?.products?.length ? (
            <p className="text-gray-400 text-sm text-center py-8">Your cart is empty</p>
          ) : (
            <>
              <div className="space-y-4 mb-6">
                {cart.products.map((item) => (
                  <div key={item._id} className="flex items-center gap-4">
                    <img
                      src={item.product.imageCover}
                      alt={item.product.title}
                      className="w-16 h-16 object-cover rounded-lg border border-gray-100"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">
                        {item.product.title}
                      </p>
                      <p className="text-xs text-gray-400">Qty: {item.count}</p>
                    </div>
                    <p className="text-sm font-semibold text-[#16A34A] whitespace-nowrap">
                      {(item.price * item.count).toLocaleString()} EGP
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-4 space-y-2">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Subtotal</span>
                  <span>{cart.totalCartPrice?.toLocaleString()} EGP</span>
                </div>
                {cart.totalAfterDiscount && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount</span>
                    <span>- {(cart.totalCartPrice - cart.totalAfterDiscount).toLocaleString()} EGP</span>
                  </div>
                )}
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Shipping</span>
                  <span className="text-[#16A34A] font-medium">Free</span>
                </div>
                <div className="flex justify-between text-base font-bold text-gray-800 pt-2 border-t border-gray-100">
                  <span>Total</span>
                  <span className="text-[#16A34A]">
                    {(cart.totalAfterDiscount ?? cart.totalCartPrice)?.toLocaleString()} EGP
                  </span>
                </div>
              </div>
            </>
          )}
        </div>

      </div>
    </div>
  );
}