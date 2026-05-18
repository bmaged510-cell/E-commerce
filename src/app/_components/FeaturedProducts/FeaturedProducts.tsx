import React from "react";
import { getAllProducts } from "@/api/services/routemisr.service";
import ProductCard from "../ProductCard/ProductCard";

export default async function FeaturedProducts() {
  const AllProducts = await getAllProducts();

  if (!AllProducts || AllProducts.length === 0) {
    return (
      <div className="w-[90%] mx-auto my-8 text-center text-gray-500">
        No products found.
      </div>
    );
  }

  return (
    <>
      <h1 className="text-4xl font-bold w-[90%] mx-auto border-s-8 border-[#16A34A] ps-2">
        Featured <span className="text-[#16A34A]">Products</span>
      </h1>
      <div className="w-[90%] mx-auto flex my-8 flex-wrap justify-center">
        {AllProducts.map((product) => (
          <div key={product._id} className="p-2 w-full lg:w-1/4 xl:w-1/5">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </>
  );
}