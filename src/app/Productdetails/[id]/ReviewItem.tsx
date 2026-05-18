"use client";

import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { updateReview, deleteReview, getReviewById } from "@/api/services/routemisr.service";
import { jwtDecode } from "jwt-decode";

interface ReviewItemProps {
  review: {
    _id: string;
    user: { name: string };
    createdAt: string;
    ratings?: number;
    rating?: number;
    comment: string;
  };
}

export default function ReviewItem({ review }: ReviewItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [rating, setRating] = useState(review.ratings ?? review.rating ?? 0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState(review.comment);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [currentReview, setCurrentReview] = useState(review);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded: { name: string } = jwtDecode(token);
        setCurrentUserId(decoded.name);
      } catch {
        setCurrentUserId(null);
      }
    }
  }, []);

  const isOwner = currentUserId === review.user?.name;
  const currentRating = currentReview.ratings ?? currentReview.rating ?? 0;

  const handleUpdate = async () => {
    if (rating === 0) { setError("Please select a rating"); return; }
    if (comment.trim().length < 5) { setError("Comment must be at least 5 characters"); return; }
    setLoading(true);
    setError("");
    try {
      const res = await updateReview(currentReview._id, { rating, comment });
      if (res?.status === "success") {
        const updated = await getReviewById(currentReview._id);
        if (updated) setCurrentReview(updated);
        else setCurrentReview({ ...currentReview, ratings: rating, comment });
        setSuccess(true);
        setIsEditing(false);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError(res?.message || "Something went wrong.");
      }
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this review?")) return;
    setLoading(true);
    try {
      await deleteReview(currentReview._id);
      setDeleted(true);
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  if (deleted) return null;

  return (
    <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#16A34A] flex items-center justify-center text-white text-sm font-bold">
            {currentReview.user?.name?.charAt(0).toUpperCase() || "U"}
          </div>
          <span className="text-sm font-semibold text-gray-700">
            {currentReview.user?.name || "Anonymous"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400">
            {new Date(currentReview.createdAt).toLocaleDateString("en-GB")}
          </span>
          {isOwner && !isEditing && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsEditing(true)}
                className="text-xs text-[#16A34A] hover:underline font-medium cursor-pointer"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                disabled={loading}
                className="text-xs text-red-500 hover:underline font-medium cursor-pointer disabled:opacity-70"
              >
                {loading ? "Deleting..." : "Delete"}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Success Message */}
      {success && (
        <div className="mb-3 p-2 bg-green-50 border border-green-200 rounded-lg text-green-600 text-xs">
          ✅ Review updated successfully!
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-3 p-2 bg-red-50 border border-red-200 rounded-lg text-red-600 text-xs">
          {error}
        </div>
      )}

      {isEditing ? (
        <div className="space-y-3">
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                className={`text-xl cursor-pointer transition-all ${
                  star <= (hover || rating) ? "text-yellow-400" : "text-gray-200"
                }`}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                onClick={() => setRating(star)}
              />
            ))}
          </div>

          <textarea
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm outline-none focus:border-[#16A34A] focus:ring-2 focus:ring-green-100 resize-none"
          />

          <div className="flex gap-2">
            <button
              onClick={handleUpdate}
              disabled={loading}
              className="px-4 py-2 bg-[#16A34A] hover:bg-green-700 text-white text-sm font-semibold rounded-lg transition-all disabled:opacity-70 cursor-pointer"
            >
              {loading ? "Saving..." : "Save"}
            </button>
            <button
              onClick={() => { setIsEditing(false); setError(""); setRating(currentRating); setComment(currentReview.comment); }}
              className="px-4 py-2 border border-gray-200 text-gray-600 text-sm font-semibold rounded-lg hover:bg-gray-100 transition-all cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                className={star <= currentRating ? "text-yellow-400" : "text-gray-200"}
              />
            ))}
          </div>
          <p className="text-sm text-gray-600">{currentReview.comment}</p>
        </>
      )}
    </div>
  );
}