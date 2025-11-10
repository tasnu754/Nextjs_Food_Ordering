"use client";
import React, { useState } from "react";
import { X } from "lucide-react";
import MainMenuCard from "./MainMenuCard";
import { Oswald } from "next/font/google";
import FullMenuBtn from "./FullMenuBtn";
import { useGetAllFoodItemsQuery } from "@/redux/features/foodApi";
import Image from "next/image";

const oswald = Oswald({
  subsets: ["latin"],
  weight: "600",
});

const MainMenuSkeleton = () => {
  return (
    <section className="py-8 sm:py-12 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Heading Skeleton */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="h-8 w-48 bg-gray-300 rounded mx-auto mb-4 animate-pulse"></div>
          <div className="h-4 w-64 bg-gray-300 rounded mx-auto animate-pulse"></div>
        </div>

        {/* Cards Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse"
            >
              {/* Image Skeleton */}
              <div className="w-full h-48 sm:h-56 bg-gray-300"></div>

              {/* Content Skeleton */}
              <div className="p-4 sm:p-6">
                <div className="flex justify-between items-start mb-3">
                  <div className="h-6 w-32 bg-gray-300 rounded"></div>
                  <div className="h-6 w-16 bg-gray-300 rounded"></div>
                </div>
                <div className="h-4 w-full bg-gray-300 rounded mb-2"></div>
                <div className="h-4 w-3/4 bg-gray-300 rounded mb-4"></div>
                <div className="flex justify-between items-center">
                  <div className="h-8 w-20 bg-gray-300 rounded"></div>
                  <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Button Skeleton */}
        <div className="text-center mt-8 sm:mt-12">
          <div className="h-12 w-40 bg-gray-300 rounded-lg mx-auto animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

const MainMenu = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const isFeatured = false;
  const { data, isLoading, error } = useGetAllFoodItemsQuery({
    isFeatured: isFeatured,
  });

  if (isLoading) {
    return <MainMenuSkeleton />;
  }

  if (error) {
    return (
      <section className="py-8 sm:py-12 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <div className="text-red-500 text-lg">
            Failed to load menu items. Please try again.
          </div>
        </div>
      </section>
    );
  }

  const items = data?.data?.foodItems?.map((item, index) => ({
    ...item,
    no: (index % 6) + 1,
  }));
  return (
    <div className="min-h-screen  p-8">
      <div className="max-w-7xl mx-auto">
        <h1
          className={`!text-4xl md:!text-7xl font-bold !text-[#642F21] !my-12 md:!my-30 text-center uppercase ${oswald.className}`}
        >
          Explore our menu
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20 !no-underline">
          {items?.slice(0, 6).map((item) => (
            <MainMenuCard
              key={item?._id}
              item={item}
              onImageClick={() => setSelectedImage(item?.image)}
            />
          ))}
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X size={36} />
          </button>
          <div className="max-w-full max-h-full">
            <Image
              fill
              sizes="(max-width: 640px) 600px, (max-width: 768px) 700px, (max-width: 1024px) 800px, 900px"
              src={selectedImage}
              alt="Enlarged view"
              className=" object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}

      <FullMenuBtn></FullMenuBtn>
    </div>
  );
};

export default MainMenu;
