import React from "react";
import { getProductReviews } from "@/api/services/routemisr.service";
import ReviewItem from "./ReviewItem";

export default async function ReviewsList({ productId }: { productId: string }) {
  const reviews = await getProductReviews(productId);

  if (!reviews?.length) {
    return (
      <div className="mt-6 border-t border-gray-100 pt-6">
        <h3 className="text-xl font-bold text-gray-800 mb-3">Customer Reviews</h3>
        <p className="text-gray-400 text-sm">No reviews yet. Be the first to review!</p>
      </div>
    );
  }

  return (
    <div className="mt-6 border-t border-gray-100 pt-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">
        Customer Reviews
        <span className="text-sm font-normal text-gray-400 ml-2">({reviews.length})</span>
      </h3>

      <div className="space-y-4">
        {reviews.map((review: any) => (
          <ReviewItem key={review._id} review={review} />
        ))}
      </div>
    </div>
  );
}