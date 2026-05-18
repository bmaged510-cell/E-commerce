"use client";

import { ProductType } from '@/api/types/routemisr.type'
import React from 'react'
import { FaStar, FaHeart, FaRegHeart } from 'react-icons/fa'
import AddBtn from '../AddBtn/AddBtn'
import { useWishlist } from '@/Context/WishlistContext'
import Link from 'next/link'

export default function ProductCard({ product }: { product: ProductType }) {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const inWishlist = isInWishlist(product._id);

  const handleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inWishlist) {
      await removeFromWishlist(product._id);
    } else {
      await addToWishlist(product._id);
    }
  };

  return (
    <div className="border rounded-lg p-2 hover:shadow-md transition-all relative">
      {/* Wishlist Button */}
      <button
        onClick={handleWishlist}
        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white shadow flex items-center justify-center hover:scale-110 transition-transform z-10"
      >
        {inWishlist ? (
          <FaHeart className="text-red-500 text-sm" />
        ) : (
          <FaRegHeart className="text-gray-400 text-sm" />
        )}
      </button>

      <Link href={`/Productdetails/${product._id}`}>
        <img
          src={product.imageCover}
          alt={product.title}
          className="w-full rounded-md"
        />
        <h2 className="line-clamp-1 font-medium mt-2">{product.title}</h2>
        <h3 className="line-clamp-1 text-sm text-gray-500">{product.description}</h3>
        <div className="rate flex items-center gap-1 my-1">
          <FaStar className="text-yellow-400 text-sm" />
          <span className="text-sm">{product.ratingsAverage}</span>
          <span className="text-xs text-gray-400">({product.ratingsQuantity} reviews)</span>
        </div>
        <div className="price flex items-center gap-2 justify-between mt-2">
          {product.priceAfterDiscount ? (
            <div className="flex items-center gap-2">
              <span className="text-[#16A34A] font-bold text-lg">
                {product.priceAfterDiscount} EGP
              </span>
              <span className="text-sm text-slate-400 line-through">
                {product.price} EGP
              </span>
            </div>
          ) : (
            <span className="text-[#16A34A] font-bold text-lg">{product.price} EGP</span>
          )}
          <AddBtn product={product} />
        </div>
      </Link>
    </div>
  );
}