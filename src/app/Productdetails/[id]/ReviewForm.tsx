"use client";

import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { createReview } from "@/api/services/routemisr.service";

export default function ReviewForm({ productId }: { productId: string }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) { setError("Please select a rating"); return; }
    if (comment.trim().length < 5) { setError("Comment must be at least 5 characters"); return; }
    setLoading(true);
    setError("");
    try {
      const res = await createReview(productId, { rating, comment });
      if (res?.data?._id) {
        setSuccess(true);
        setRating(0);
        setComment("");
      } else {
        setError(res?.errors?.[0]?.msg || res?.message || "Something went wrong.");
      }
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-10 border-t border-gray-100 pt-8">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Write a Review</h3>

      {success && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-600 text-sm">
          ✅ Review submitted successfully!
        </div>
      )}

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Rating
          </label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                className={`text-2xl cursor-pointer transition-all ${
                  star <= (hover || rating) ? "text-yellow-400" : "text-gray-200"
                }`}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                onClick={() => setRating(star)}
              />
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Your Comment
          </label>
          <textarea
            rows={4}
            placeholder="Write your review here..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none transition-all focus:border-[#16A34A] focus:ring-2 focus:ring-green-100 resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2.5 bg-[#16A34A] hover:bg-green-700 text-white font-semibold rounded-lg transition-all text-sm disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              Submitting...
            </span>
          ) : (
            "Submit Review"
          )}
        </button>
      </form>
    </div>
  );
}