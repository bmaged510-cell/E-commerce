"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Slider({
  spaceBetween = 0,
  slidePerview = 1,
  listOfImages,
  heightClass,
}: {
  spaceBetween?: number;
  slidePerview?: number;
  listOfImages: string[];
  heightClass: string;
}) {
  return (
    <>
      <style>{`
        .swiper-pagination-bullet { width: 12px; height: 12px; background: white; opacity: 0.7; }
        .swiper-pagination-bullet-active { width: 24px; height: 12px; border-radius: 6px; background: white; opacity: 1; }
        .swiper-button-next, .swiper-button-prev { color: white; }
      `}</style>
      <Swiper
        modules={[Navigation, Pagination]}
        className={`${heightClass} my-5`}
        spaceBetween={spaceBetween}
        slidesPerView={slidePerview}
        pagination={{ clickable: true }}
        navigation
      >
        {listOfImages.map((src) => (
          <SwiperSlide key={src} className="!h-full">
            <img src={src} alt={src} className="w-full h-full object-cover" />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}