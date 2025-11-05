"use client";
import React, { useState } from "react";
import { X } from "lucide-react";
import MainMenuCard from "./MainMenuCard";
import { Oswald } from "next/font/google";
import FullMenuBtn from "./FullMenuBtn";
import { useGetAllFoodItemsQuery } from "@/redux/features/foodApi";

const oswald = Oswald({
  subsets: ["latin"],
  weight: "600",
});

const MainMenu = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const { data } = useGetAllFoodItemsQuery();

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
          <img
            src={selectedImage}
            alt="Enlarged view"
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <FullMenuBtn></FullMenuBtn>
    </div>
  );
};

export default MainMenu;
