"use client";
import React, { useState } from "react";
import { X } from "lucide-react";
import MainMenuCard from "./MainMenuCard";
import { Oswald, Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: "400",
});

const oswald = Oswald({
  subsets: ["latin"],
  weight: "600",
});

const MainMenu = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const items = [
    {
      id: 1,
      name: "PANISH BURGER",
      description:
        "Mushroom patty, vegan cheese, lettuce, tomatoes, avocado ligula",
      price: "$8.95",
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&h=400&fit=crop",
      rating: 3.5,
    },
    {
      id: 2,
      name: "CLASSIC BURGER",
      description:
        "Mushroom patty, vegan cheese, lettuce, tomatoes, avocado ligula",
      price: "$7.95",
      image:
        "https://images.unsplash.com/photo-1550547660-d9450f859349?w=500&h=400&fit=crop",
      rating: 5,
    },
    {
      id: 3,
      name: "CRISPY CHICKEN",
      description:
        "Mushroom patty, vegan cheese, lettuce, tomatoes, avocado ligula",
      price: "$8.50",
      image:
        "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=500&h=400&fit=crop",
      rating: 4.5,
    },
    {
      id: 4,
      name: "DELUXE BURGER",
      description:
        "Mushroom patty, vegan cheese, lettuce, tomatoes, avocado ligula",
      price: "$9.95",
      image:
        "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=500&h=400&fit=crop",
      rating: 3,
    },
    {
      id: 5,
      name: "SPICY BURGER",
      description:
        "Mushroom patty, vegan cheese, lettuce, tomatoes, avocado ligula",
      price: "$8.25",
      image:
        "https://images.unsplash.com/photo-1551782450-17144efb9c50?w=500&h=400&fit=crop",
      rating: 4.5,
    },
    {
      id: 6,
      name: "MEGA BURGER",
      description:
        "Mushroom patty, vegan cheese, lettuce, tomatoes, avocado ligula",
      price: "$10.95",
      image:
        "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=500&h=400&fit=crop",
      rating: 4,
    },
  ];

  return (
    <div className="min-h-screen  p-8">
      <div className="max-w-7xl mx-auto">
        <h1
          className={`!text-7xl font-bold !text-amber-950  !my-30 text-center uppercase ${oswald.className}`}
        >
          Explore our menu
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8 !no-underline">
          {items?.map((item) => (
            <MainMenuCard
              key={item?.id}
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
    </div>
  );
};

export default MainMenu;
