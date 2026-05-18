"use client";

import { useCart } from "@/Context/CartContext";
import { ProductType } from "@/api/types/routemisr.type";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaShoppingCart } from "react-icons/fa";

export default function AddToCartBtn({ product }: { product: ProductType }) {
  const { cart, addToCart, updateQuantity } = useCart();
  const [localLoading, setLocalLoading] = useState(false);

  const cartItem = cart?.products?.find((item) => item.product._id === product._id);
  const quantity = cartItem?.count || 0;

  const handleAdd = async () => {
    setLocalLoading(true);
    await addToCart(product._id);
    setLocalLoading(false);
  };

  const handleUpdate = async (count: number) => {
    if (!cartItem) return;
    setLocalLoading(true);
    await updateQuantity(cartItem._id, count);
    setLocalLoading(false);
  };

  if (localLoading) {
    return (
      <button
        disabled
        className="w-full rounded-lg bg-[#16A34A] text-white font-bold p-4 my-4 flex items-center justify-center gap-2 opacity-80"
      >
        <AiOutlineLoading3Quarters className="animate-spin" />
        Loading...
      </button>
    );
  }

  if (quantity === 0) {
    return (
      <button
        onClick={handleAdd}
        className="w-full rounded-lg bg-[#16A34A] hover:bg-green-700 text-white font-bold p-4 my-4 flex items-center justify-center gap-2 transition-all cursor-pointer"
      >
        <FaShoppingCart />
        Add To Cart
      </button>
    );
  }

  return (
    <div className="flex items-center gap-4 my-4">
      <button
        onClick={() => handleUpdate(quantity - 1)}
        className="w-10 h-10 rounded-full border-2 border-[#16A34A] text-[#16A34A] flex items-center justify-center hover:bg-green-50 transition-all cursor-pointer font-bold text-xl"
      >
        −
      </button>
      <span className="text-xl font-bold w-8 text-center">{quantity}</span>
      <button
        onClick={() => handleUpdate(quantity + 1)}
        className="w-10 h-10 rounded-full bg-[#16A34A] text-white flex items-center justify-center hover:bg-green-700 transition-all cursor-pointer font-bold text-xl"
      >
        +
      </button>
      <span className="text-gray-500 text-sm">in cart</span>
    </div>
  );
}