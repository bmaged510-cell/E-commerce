import React, { lazy, Suspense } from 'react'
import FeaturedProducts from '../_components/FeaturedProducts/FeaturedProducts';
import Slider from '../_components/Slider/Slider';
import img1 from "../../assets/images/img1.jpg";
import img2 from "../../assets/images/img2.jpg";
import img3 from "../../assets/images/img3.jpg";
import { getAllReviews } from '@/api/services/routemisr.service';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';

const LazyHomeCategoryComponent = lazy(() => import("../_components/HomeCategories/HomeCategories"))

export default async function Home() {
  const reviews = await getAllReviews();

  const topReviews = reviews
    ?.filter((r: any) => r.comment && r.comment.trim() !== "" && r.ratings > 0)
    ?.slice(0, 6) || [];

  return (
    <>
      <Slider listOfImages={[img1.src, img2.src, img3.src]} heightClass="h-[400px]"/>

      <Suspense fallback={<div className='h-75 text-center flex items-center justify-center text-4xl font-bold py-10'>Loading...</div>}>
        <LazyHomeCategoryComponent/>
      </Suspense>

      <FeaturedProducts/>

      {/* Reviews Section */}
      {topReviews.length > 0 && (
        <section className="py-16 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1 bg-green-50 text-[#16A34A] text-xs font-semibold rounded-full mb-3 uppercase tracking-widest">
                Testimonials
              </span>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">What Our Customers Say</h2>
              <div className="w-16 h-1 bg-[#16A34A] mx-auto rounded-full mt-3" />
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {topReviews.map((review: any, index: number) => (
                <div
                  key={review._id}
                  className={`relative rounded-2xl p-6 flex flex-col gap-4 transition-all hover:-translate-y-1 hover:shadow-lg duration-300
                    ${index % 3 === 0 ? "bg-[#f0fdf4] border border-green-100" :
                      index % 3 === 1 ? "bg-white border border-gray-100 shadow-sm" :
                      "bg-gray-800 border border-gray-700"}`}
                >
                  {/* Quote Icon */}
                  <FaQuoteLeft className={`text-2xl ${index % 3 === 2 ? "text-green-400" : "text-[#16A34A]"} opacity-30`} />

                  {/* Stars */}
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar
                        key={star}
                        className={star <= review.ratings ? "text-yellow-400" : "text-gray-200"}
                      />
                    ))}
                  </div>

                  {/* Comment */}
                  <p className={`text-sm leading-relaxed flex-1 line-clamp-4 ${index % 3 === 2 ? "text-gray-300" : "text-gray-600"}`}>
                    {review.comment}
                  </p>

                  {/* User */}
                  <div className="flex items-center gap-3 pt-3 border-t border-opacity-10 border-gray-300">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold
                      ${index % 3 === 2 ? "bg-green-500" : "bg-[#16A34A]"}`}>
                      {review.user?.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                    <div>
                      <p className={`text-sm font-semibold ${index % 3 === 2 ? "text-white" : "text-gray-800"}`}>
                        {review.user?.name || "Anonymous"}
                      </p>
                      <p className={`text-xs ${index % 3 === 2 ? "text-gray-400" : "text-gray-400"}`}>
                        {new Date(review.createdAt).toLocaleDateString("en-GB")}
                      </p>
                    </div>
                    <div className="ml-auto">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium
                        ${index % 3 === 2 ? "bg-green-900 text-green-400" : "bg-green-50 text-[#16A34A]"}`}>
                        Verified ✓
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}