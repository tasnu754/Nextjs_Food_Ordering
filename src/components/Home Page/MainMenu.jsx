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

// Skeleton Loading Component
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

  // Show skeleton while loading
  if (isLoading) {
    return <MainMenuSkeleton />;
  }

  // Show error state if needed
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
    <section className="py-8 sm:py-12 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Heading */}
        <div className="text-center mb-8 sm:mb-12">
          <h2
            className={`text-3xl sm:text-4xl font-bold text-gray-900 mb-4 ${oswald.className}`}
          >
            Explore our menu
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our delicious selection of freshly prepared dishes
          </p>
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {items?.slice(0, 6).map((item) => (
            <MainMenuCard
              key={item._id}
              item={item}
              onClick={() => setSelectedImage(item?.image)}
            />
          ))}
        </div>

        {/* View Full Menu Button */}
        <div className="text-center mt-8 sm:mt-12">
          <FullMenuBtn />
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-full w-full">
            <button
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
              onClick={() => setSelectedImage(null)}
            >
              <X size={32} />
            </button>
            <div className="bg-white rounded-lg overflow-hidden">
              <Image
                src={selectedImage}
                alt="Enlarged food item"
                width={800}
                height={600}
                className="w-full h-auto object-contain"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default MainMenu;
