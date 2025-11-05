"use client";

import { useState } from "react";
import { Search, ShoppingCart, Star, Clock, Flame, X } from "lucide-react";
import { Lilita_One, Oswald, Roboto } from "next/font/google";
import MainMenuCard from "@/components/Home Page/MainMenuCard";
import Navbar from "@/components/Home Page/Navbar";
import { useGetAllCategoriesQuery } from "@/redux/features/categoryApi";
import { useGetAllFoodItemsQuery } from "@/redux/features/foodApi";

const lil = Lilita_One({
  subsets: ["latin"],
  weight: "400",
});

const oswald = Oswald({
  subsets: ["latin"],
  weight: "600",
});
const roboto = Roboto({
  subsets: ["latin"],
  weight: "600",
});

export default function FoodMenuPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const { data: categoryItems } = useGetAllCategoriesQuery();
  const { data: foodItems } = useGetAllFoodItemsQuery();

  const menuItems = foodItems?.data?.foodItems;
  const categories = categoryItems?.data?.categories;

  const filteredItems = menuItems?.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" || item?.category?.name === selectedCategory;
    const matchesPrice =
      item?.price >= priceRange[0] && item?.price <= priceRange[1];
    const matchesSearch =
      item?.foodName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item?.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesPrice && matchesSearch;
  });

  console.log(filteredItems);

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="min-h-screen pt-26 bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
        <div className="max-w-[1470px] mx-auto px-4 py-8">
          {/* Hero Section */}
          <div
            className={`bg-gradient-to-r from-[#3A110E] via-[#673929] to-[#A73827] rounded-3xl p-8 mb-8 text-white shadow-2xl ${lil.className}`}
          >
            <h2 className="text-4xl font-bold mb-2">
              Delicious Food, Delivered Fast!
            </h2>
            <p className="text-xl opacity-90">
              Order your favorite meals and get them delivered hot & fresh
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative max-w-2xl mx-auto">
              <Search
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={24}
              />
              <input
                type="text"
                placeholder="Search for dishes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-4 py-4 rounded-2xl border-2 border-gray-200 focus:border-[#A73827] focus:outline-none text-lg shadow-lg"
              />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <aside className="lg:w-72 space-y-6">
              {/* Category Filter */}
              <div className="bg-white rounded-2xl p-6 shadow-xl">
                <h3
                  className={`text-xl !text-[#3A110E] font-bold mb-4  ${oswald.className}`}
                >
                  Categories
                </h3>
                <div className={`space-y-2 ${lil.className}`}>
                  {categories?.map((category) => (
                    <button
                      key={category?.name}
                      onClick={() => setSelectedCategory(category?.name)}
                      className={`w-full text-left px-4 py-3 border-1  !rounded-lg border-gray-50  !text-lg font-medium transition-all ${
                        selectedCategory === category?.name
                          ? "bg-[#3A110E] text-white shadow-lg !rounded-xl transform scale-105"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {category?.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div
                className={`bg-white rounded-2xl p-6 shadow-xl ${oswald.className}`}
              >
                <h3 className="text-xl font-bold mb-4 text-gray-800">
                  Price Range
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([0, parseInt(e.target.value)])
                    }
                    className="w-full h-2 bg-gradient-to-r from-[#3A110E] via-[#673929] to-[#A73827] rounded-lg appearance-none cursor-pointer accent-[#3A110E]"
                  />
                  <div className="text-center mt-4">
                    <span className="bg-orange-100 text-[#3A110E] px-4 py-2 rounded-full font-semibold">
                      Up to ${priceRange[1]}
                    </span>
                  </div>
                </div>
              </div>
            </aside>

            {/* Menu Items Grid */}
            <main className="flex-1">
              <div className="flex justify-between items-center mb-6">
                <h2
                  className={`text-2xl font-bold !text-[#3A110E] ${oswald.className}`}
                >
                  {selectedCategory === "All" ? "All Dishes" : selectedCategory}
                  <span className="text-orange-600 ml-2">
                    ({filteredItems?.length})
                  </span>
                </h2>
              </div>

              {filteredItems?.length === 0 ? (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">😕</div>
                  <p className="text-xl text-gray-600">
                    No items found matching your filters
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredItems?.map((item) => (
                    <MainMenuCard
                      key={item?._id}
                      item={item}
                      onImageClick={() => setSelectedImage(item?.image)}
                    ></MainMenuCard>
                  ))}
                </div>
              )}
            </main>
          </div>
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
      </div>
    </>
  );
}
