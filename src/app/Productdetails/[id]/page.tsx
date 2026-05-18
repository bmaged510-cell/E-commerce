import { ProductType } from "@/api/types/routemisr.type";
import React from "react";
import { FaStar } from "react-icons/fa";
import { getSingleProduct } from "@/api/services/routemisr.service";
import AddToCartBtn from "./AddToCartBtn";
import ReviewForm from "./ReviewForm";
import ReviewsList from "./ReviewsList";

export default async function Productdetails(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const id = params.id;

  const myProduct = await getSingleProduct(id);

  if (!myProduct) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Product not found.</p>
      </div>
    );
  }

  return (
    <div className="w-[80%] mx-auto my-4 py-5 flex gap-8">
      <div className="w-1/3 p-4">
        <img
          src={myProduct.imageCover}
          alt={myProduct.title}
          className="w-full rounded-lg"
        />
        <div className="flex flex-wrap mt-2">
          {myProduct.images.map((src) => (
            <div key={src} className="w-1/3 p-1">
              <img src={src} alt={src} className="rounded-lg cursor-pointer hover:opacity-80 transition-all" />
            </div>
          ))}
        </div>
      </div>

      <div className="w-3/4 p-4">
        <h2 className="text-4xl font-bold">{myProduct.title}</h2>
        <h3 className="my-5 font-bold text-gray-600">{myProduct.description}</h3>

        <div className="flex items-center gap-2 my-3">
          <span>Price:</span>
          {myProduct.priceAfterDiscount ? (
            <>
              <span className="text-[#16A34A] font-bold text-lg">
                {myProduct.priceAfterDiscount} EGP
              </span>
              <span className="text-sm text-slate-400 line-through">
                {myProduct.price} EGP
              </span>
            </>
          ) : (
            <span className="text-[#16A34A] font-bold text-lg">
              {myProduct.price} EGP
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 my-3">
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              className={i < Math.round(myProduct.ratingsAverage) ? "text-yellow-400" : "text-gray-200"}
            />
          ))}
          <span className="text-sm text-gray-500 ml-1">
            {myProduct.ratingsAverage} ({myProduct.ratingsQuantity} reviews)
          </span>
        </div>

        <AddToCartBtn product={myProduct} />
        <ReviewForm productId={id} />
        <ReviewsList productId={id} />
      </div>
    </div>
  );
}