"use client";
import React, { useState } from "react";
import { X } from "lucide-react";
import MainMenuCard from "./MainMenuCard";
import { Oswald, Roboto } from "next/font/google";
import FullMenuBtn from "./FullMenuBtn";

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
      no: 1,
      name: "CHOCOLATE LAVA CAKE",
      description:
        "Warm chocolate cake with molten center and vanilla ice cream",
      price: "$7.95",
      image:
        "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=500&h=400&fit=crop",
      rating: 5,
      category: "dessert",
    },
    {
      no: 2,
      name: "PALAK PANEER",
      description: "Fresh cottage cheese in creamy spinach gravy with spices",
      price: "$13.95",
      image:
        "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500&h=400&fit=crop",
      rating: 4.3,
      category: "indian",
    },

    {
      no: 3,
      name: "BEEF TACOS",
      description:
        "Three soft tortillas with seasoned beef, salsa, and guacamole",
      price: "$10.95",
      image:
        "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=500&h=400&fit=crop",
      rating: 4,
      category: "mexican",
    },
    {
      no: 4,
      name: "CLASSIC BURGER",
      description:
        "Angus beef patty, cheddar cheese, lettuce, tomato, special sauce",
      price: "$11.95",
      image:
        "https://images.unsplash.com/photo-1550547660-d9450f859349?w=500&h=400&fit=crop",
      rating: 4.5,
      category: "burger",
    },
    {
      no: 5,
      name: "VEGGIE SUSHI PLATTER",
      description:
        "Assorted vegetable sushi with ginger, wasabi, and soy sauce",
      price: "$16.95",
      image:
        "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=500&h=400&fit=crop",
      rating: 4.5,
      category: "japanese",
    },

    {
      no: 6,
      name: "MARGHERITA PIZZA",
      description: "Fresh mozzarella, tomato sauce, basil leaves, olive oil",
      price: "$12.95",
      image:
        "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=500&h=400&fit=crop",
      rating: 4.5,
      category: "pizza",
    },
  ];

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
              key={item?.no}
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
