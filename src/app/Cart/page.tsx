"use client";

import React, { useState } from "react";
import { useCart } from "@/Context/CartContext";
import Link from "next/link";
import { FaTrash, FaShoppingCart, FaLock, FaTruck } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdLocalShipping } from "react-icons/md";
import { BsShieldCheck, BsArrowRepeat, BsTag } from "react-icons/bs";
import { FaHeadset } from "react-icons/fa";

export default function Cart() {
  const { cart, loading, removeFromCart, updateQuantity, clearCart } = useCart();
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const handleRemove = async (productId: string) => {
    setRemovingId(productId);
    await removeFromCart(productId);
    setRemovingId(null);
  };

  const handleUpdate = async (productId: string, count: number) => {
    setUpdatingId(productId);
    await updateQuantity(productId, count);
    setUpdatingId(null);
  };

  if (loading && !cart) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <AiOutlineLoading3Quarters className="animate-spin text-[#16A34A] text-4xl" />
      </div>
    );
  }

  if (!cart || cart.products.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <FaShoppingCart className="text-gray-300 text-8xl" />
        <h2 className="text-2xl font-bold text-gray-500">Your cart is empty</h2>
        <p className="text-gray-400 text-sm">Add some products to your cart</p>
        <Link href="/Shop" className="bg-[#16A34A] text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-all font-semibold">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="w-[90%] mx-auto">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <Link href="/Home" className="hover:text-[#16A34A]">Home</Link>
          <span>/</span>
          <span className="text-gray-800">Shopping Cart</span>
        </div>

        <div className="flex items-center gap-3 mb-6">
          <FaShoppingCart className="text-[#16A34A] text-2xl" />
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Shopping Cart</h1>
            <p className="text-sm text-gray-500">
              You have <span className="text-[#16A34A] font-semibold">{cart.products.length} items</span> in your cart
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <div className="space-y-3">
              {cart.products.map((item) => (
                <div key={item._id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-4">
                    <img
                      src={item.product.imageCover}
                      alt={item.product.title}
                      className="w-20 h-20 object-cover rounded-lg shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-[#16A34A] font-medium mb-0.5">Women's Fashion</p>
                      <h3 className="font-semibold text-gray-800 line-clamp-1 text-sm">{item.product.title}</h3>
                      <p className="text-xs text-gray-400 mb-1">
                        SKU: {item.product._id?.slice(-6).toUpperCase() || 'N/A'}
                      </p>
                      <span className="text-xs text-[#16A34A] font-medium bg-green-50 px-2 py-0.5 rounded-full border border-green-200">
                        ● In Stock
                      </span>
                    </div>

                    <div className="text-center shrink-0">
                      <p className="text-[#16A34A] font-bold">{item.price} EGP</p>
                      <p className="text-xs text-gray-400">per unit</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleUpdate(item.product._id, item.count - 1)} // ✅ product._id
                        disabled={updatingId === item.product._id}
                        className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-all cursor-pointer font-bold text-gray-600 disabled:opacity-50"
                      >
                        {updatingId === item.product._id ? <AiOutlineLoading3Quarters className="animate-spin text-xs" /> : "−"}
                      </button>
                      <span className="w-6 text-center font-semibold text-sm">{item.count}</span>
                      <button
                        onClick={() => handleUpdate(item.product._id, item.count + 1)} // ✅ product._id
                        disabled={updatingId === item.product._id}
                        className="w-7 h-7 rounded-full bg-[#16A34A] text-white flex items-center justify-center hover:bg-green-700 transition-all cursor-pointer font-bold disabled:opacity-50"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right shrink-0 min-w-[60px]">
                      <p className="text-xs text-gray-400">Total</p>
                      <p className="font-bold text-gray-800">
                        {item.price * item.count}
                        <span className="text-xs text-gray-400 font-normal"> EGP</span>
                      </p>
                    </div>

                    <button
                      onClick={() => handleRemove(item.product._id)} // ✅ product._id
                      disabled={removingId === item.product._id}
                      className="w-8 h-8 rounded-full bg-red-50 text-red-400 hover:bg-red-100 hover:text-red-600 transition-all cursor-pointer flex items-center justify-center shrink-0 disabled:opacity-50"
                    >
                      {removingId === item.product._id ? <AiOutlineLoading3Quarters className="animate-spin text-xs" /> : <FaTrash className="text-xs" />}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center mt-4">
              <Link href="/Shop" className="text-[#16A34A] text-sm hover:underline flex items-center gap-1 font-medium">
                ← Continue Shopping
              </Link>
              <button onClick={clearCart} className="text-gray-400 text-sm hover:text-red-500 transition-all cursor-pointer">
                🗑 Clear all items
              </button>
            </div>
          </div>

          <div className="w-full lg:w-80 shrink-0">
            <div className="bg-[#16A34A] rounded-xl overflow-hidden sticky top-24">
              <div className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <BsTag className="text-white text-lg" />
                  <h2 className="text-lg font-bold text-white">Order Summary</h2>
                </div>
                <p className="text-green-200 text-sm mt-0.5">{cart.products.length} items in your cart</p>
              </div>

              <div className="bg-white mx-4 rounded-xl p-4 mb-4">
                <div className="flex items-center gap-3 bg-green-50 rounded-lg p-3 mb-4 border border-green-100">
                  <div className="w-8 h-8 rounded-full bg-[#16A34A] flex items-center justify-center shrink-0">
                    <MdLocalShipping className="text-white text-sm" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">Free Shipping!</p>
                    <p className="text-xs text-gray-500">You qualify for free delivery</p>
                  </div>
                </div>

                <div className="space-y-2 mb-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Subtotal</span>
                    <span className="font-medium text-gray-800">{cart.totalCartPrice} EGP</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Shipping</span>
                    <span className="font-bold text-[#16A34A]">FREE</span>
                  </div>
                  {cart.totalAfterDiscount && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Discount</span>
                      <span className="text-red-500">-{cart.totalCartPrice - cart.totalAfterDiscount} EGP</span>
                    </div>
                  )}
                </div>

                <div className="border-t border-gray-100 pt-3 mb-4">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-gray-800">Total</span>
                    <div className="text-right">
                      <span className="font-bold text-xl text-gray-800">{cart.totalAfterDiscount || cart.totalCartPrice}</span>
                      <span className="text-xs text-gray-400 ml-1">EGP</span>
                    </div>
                  </div>
                </div>

                <button className="w-full flex items-center justify-center gap-2 border border-dashed border-gray-300 rounded-lg py-2 text-sm text-gray-500 hover:border-[#16A34A] hover:text-[#16A34A] transition-all cursor-pointer mb-4">
                  🏷 Apply Promo Code
                </button>

                <Link href="/Checkout" className="w-full bg-[#16A34A] text-white font-bold py-3 rounded-lg text-center block hover:bg-green-700 transition-all text-sm flex items-center justify-center gap-2">
                  <FaLock className="text-xs" />
                  Secure Checkout
                </Link>

                <div className="flex items-center justify-center gap-4 mt-3">
                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    <BsShieldCheck className="text-[#16A34A]" /> Secure Payment
                  </span>
                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    <FaTruck className="text-[#16A34A]" /> Fast Delivery
                  </span>
                </div>
              </div>

              <div className="px-6 pb-4 text-center">
                <Link href="/Shop" className="text-green-200 text-sm hover:text-white transition-all">
                  ← Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-[90%] mx-auto mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: <MdLocalShipping className="text-xl text-[#16A34A]" />, title: "Free Shipping", desc: "On orders over 500 EGP" },
          { icon: <BsArrowRepeat className="text-xl text-[#16A34A]" />, title: "Easy Returns", desc: "14-day return policy" },
          { icon: <BsShieldCheck className="text-xl text-[#16A34A]" />, title: "Secure Payment", desc: "100% secure checkout" },
          { icon: <FaHeadset className="text-xl text-[#16A34A]" />, title: "24/7 Support", desc: "Contact us anytime" },
        ].map((f, i) => (
          <div key={i} className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="w-9 h-9 rounded-full bg-green-50 flex items-center justify-center shrink-0">
              {f.icon}
            </div>
            <div>
              <p className="font-semibold text-sm text-gray-800">{f.title}</p>
              <p className="text-xs text-gray-500">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}