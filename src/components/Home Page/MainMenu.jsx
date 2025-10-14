"use client";
import React, { useState } from "react";
import { ShoppingCart, X, Expand } from "lucide-react";
import MainMenuCard from "./MainMenuCard";

const MainMenu = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const burgers = [
    {
      id: 1,
      code: "0844",
      name: "PANISH BURGER",
      description:
        "Mushroom patty, vegan cheese, lettuce, tomatoes, avocado ligula",
      price: "$8.95",
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&h=400&fit=crop",
    },
    {
      id: 2,
      code: "0862",
      name: "CLASSIC BURGER",
      description:
        "Mushroom patty, vegan cheese, lettuce, tomatoes, avocado ligula",
      price: "$7.95",
      image:
        "https://images.unsplash.com/photo-1550547660-d9450f859349?w=500&h=400&fit=crop",
    },
    {
      id: 3,
      code: "0850",
      name: "CRISPY CHICKEN",
      description:
        "Mushroom patty, vegan cheese, lettuce, tomatoes, avocado ligula",
      price: "$8.50",
      image:
        "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=500&h=400&fit=crop",
    },
    {
      id: 4,
      code: "0871",
      name: "DELUXE BURGER",
      description:
        "Mushroom patty, vegan cheese, lettuce, tomatoes, avocado ligula",
      price: "$9.95",
      image:
        "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=500&h=400&fit=crop",
    },
    {
      id: 5,
      code: "0882",
      name: "SPICY BURGER",
      description:
        "Mushroom patty, vegan cheese, lettuce, tomatoes, avocado ligula",
      price: "$8.25",
      image:
        "https://images.unsplash.com/photo-1551782450-17144efb9c50?w=500&h=400&fit=crop",
    },
    {
      id: 6,
      code: "0893",
      name: "MEGA BURGER",
      description:
        "Mushroom patty, vegan cheese, lettuce, tomatoes, avocado ligula",
      price: "$10.95",
      image:
        "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=500&h=400&fit=crop",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-amber-900 mb-12 text-center">
          Our Menu
        </h1>

        {/* First Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {burgers.slice(0, 3).map((burger) => (
            <MainMenuCard
              key={burger.id}
              burger={burger}
              onImageClick={() => setSelectedImage(burger.image)}
            />
          ))}
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {burgers.slice(3, 6).map((burger) => (
            <MainMenuCard
              key={burger.id}
              burger={burger}
              onImageClick={() => setSelectedImage(burger.image)}
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
