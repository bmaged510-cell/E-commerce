"use client";

import React from "react";
import { useCart } from "@/Context/CartContext";
import Link from "next/link";
import { FaHeart, FaShoppingCart, FaTrash } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useWishlist } from "@/Context/WishlistContext";
export default function Wishlist() {
  const { wishlist, loading, removeFromWishlist } = useWishlist();
  const { addToCart, cart } = useCart();

  const handleAddToCart = async (productId: string) => {
    await addToCart(productId);
  };

  if (loading && wishlist.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <AiOutlineLoading3Quarters className="animate-spin text-[#16A34A] text-4xl" />
      </div>
    );
  }

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <FaHeart className="text-gray-300 text-8xl" />
        <h2 className="text-2xl font-bold text-gray-500">Your wishlist is empty</h2>
        <p className="text-gray-400 text-sm">Save items you love to your wishlist</p>
        <Link
          href="/Shop"
          className="bg-[#16A34A] text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-all font-semibold"
        >
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
          <span className="text-gray-800">Wishlist</span>
        </div>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
            <FaHeart className="text-red-500" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">My Wishlist</h1>
            <p className="text-sm text-gray-500">
              <span className="text-[#16A34A] font-semibold">{wishlist.length} items</span> saved
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-12 px-6 py-3 bg-gray-50 border-b border-gray-100 text-sm text-gray-500 font-medium">
            <span className="col-span-5">Product</span>
            <span className="col-span-2 text-center">Price</span>
            <span className="col-span-2 text-center">Status</span>
            <span className="col-span-3 text-center">Actions</span>
          </div>

          <div className="divide-y divide-gray-50">
            {wishlist.map((item) => (
              <div key={item._id} className="grid grid-cols-12 items-center px-6 py-4 hover:bg-gray-50 transition-all">
                <div className="col-span-12 md:col-span-5 flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg border border-gray-100 overflow-hidden shrink-0">
                    <img
                      src={item.imageCover}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 line-clamp-2 text-sm">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#16A34A] mt-0.5">
                      {item.category?.name}
                    </p>
                  </div>
                </div>

                <div className="col-span-4 md:col-span-2 text-center">
                  <p className="font-bold text-gray-800">
                    {item.priceAfterDiscount || item.price} EGP
                  </p>
                  {item.priceAfterDiscount && (
                    <p className="text-xs text-gray-400 line-through">
                      {item.price} EGP
                    </p>
                  )}
                </div>

                <div className="col-span-4 md:col-span-2 flex justify-center">
                  <span className="text-xs text-[#16A34A] font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] inline-block"></span>
                    In Stock
                  </span>
                </div>

                <div className="col-span-4 md:col-span-3 flex items-center justify-center gap-2">
                  <button
                    onClick={() => handleAddToCart(item._id)}
                    className="flex items-center gap-2 bg-[#16A34A] hover:bg-green-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-all cursor-pointer"
                  >
                    <FaShoppingCart className="text-xs" />
                    Add to Cart
                  </button>
                  <button
                    onClick={() => removeFromWishlist(item._id)}
                    className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-red-50 text-gray-400 hover:text-red-500 flex items-center justify-center transition-all cursor-pointer"
                  >
                    <FaTrash className="text-xs" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <Link
            href="/Shop"
            className="text-[#16A34A] text-sm hover:underline flex items-center gap-1 font-medium"
          >
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}