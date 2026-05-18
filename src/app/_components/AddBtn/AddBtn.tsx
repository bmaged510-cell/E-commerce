"use client";

import React, { useState } from "react";
import { useCart } from "@/Context/CartContext";
import { ProductType } from "@/api/types/routemisr.type";
import { FaPlus, FaMinus } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function AddBtn({ product }: { product: ProductType }) {
  const { cart, addToCart, updateQuantity } = useCart();
  const [localLoading, setLocalLoading] = useState(false);

  const cartItem = cart?.products?.find((item) => item.product._id === product._id);
  const quantity = cartItem?.count || 0;

  const handleAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLocalLoading(true);
    await addToCart(product._id);
    setLocalLoading(false);
  };

  const handleUpdate = async (e: React.MouseEvent, count: number) => {
    e.preventDefault();
    e.stopPropagation();
    if (!cartItem) return;
    setLocalLoading(true);
    await updateQuantity(cartItem._id, count);
    setLocalLoading(false);
  };

  if (localLoading) {
    return (
      <div className="w-8 h-8 flex items-center justify-center">
        <AiOutlineLoading3Quarters className="animate-spin text-[#16A34A]" />
      </div>
    );
  }

  if (quantity === 0) {
    return (
      <button
        onClick={handleAdd}
        className="w-8 h-8 rounded-full bg-[#16A34A] text-white flex items-center justify-center hover:bg-green-700 transition-all cursor-pointer"
      >
        <FaPlus className="text-xs" />
      </button>
    );
  }

  return (
    <div
      className="flex items-center gap-2"
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
    >
      <button
        onClick={(e) => handleUpdate(e, quantity - 1)}
        className="w-7 h-7 rounded-full bg-[#16A34A] text-white flex items-center justify-center hover:bg-green-700 transition-all cursor-pointer"
      >
        <FaMinus className="text-xs" />
      </button>
      <span className="font-semibold text-sm w-4 text-center">{quantity}</span>
      <button
        onClick={(e) => handleUpdate(e, quantity + 1)}
        className="w-7 h-7 rounded-full bg-[#16A34A] text-white flex items-center justify-center hover:bg-green-700 transition-all cursor-pointer"
      >
        <FaPlus className="text-xs" />
      </button>
    </div>
  );
}