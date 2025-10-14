"use client";

import { Expand, ShoppingCart } from "lucide-react";
import { useState } from "react";

const MainMenuCard = ({ burger, onImageClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div>
      <a
        href={`#burger-${burger.id}`}
        className="block group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
          {/* Image Section */}
          <div className="relative h-64 overflow-hidden">
            <img
              src={burger.image}
              alt={burger.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* Code Badge */}
            <div className="absolute top-4 left-4 bg-black bg-opacity-60 text-white px-3 py-1 rounded text-sm font-semibold">
              CODE: {burger.code}
            </div>

            {/* Expand Icon */}
            <button
              onClick={(e) => {
                e.preventDefault();
                onImageClick();
              }}
              className="absolute bottom-4 right-4 bg-white bg-opacity-90 p-2 rounded-lg hover:bg-opacity-100 transition-all duration-300 hover:scale-110"
            >
              <Expand size={20} className="text-gray-800" />
            </button>
          </div>

          {/* Content Section */}
          <div className="p-6 relative">
            {/* Heart Icon */}
            <button className="absolute top-6 right-6 text-gray-400 hover:text-red-500 transition-colors">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>

            {/* Star Rating */}
            <div className="flex gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-4 h-4 text-gray-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>

            <h3 className="text-2xl font-bold text-amber-900 mb-2">
              {burger.name}
            </h3>
            <p className="text-gray-600 text-sm mb-4 h-12">
              {burger.description}
            </p>

            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-red-600">
                {burger.price}
              </span>
            </div>

            {/* Add to Cart Button - Slides up from bottom */}
            <div
              className={`absolute left-0 right-0 bottom-0 transition-all duration-300 ease-in-out ${
                isHovered
                  ? "translate-y-0 opacity-100"
                  : "translate-y-full opacity-0"
              }`}
            >
              <button className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-6 flex items-center justify-center gap-2 transition-colors">
                <ShoppingCart size={20} />
                Add to cart
              </button>
            </div>

            {/* Spacer when button is hidden */}
            {!isHovered && <div className="h-4"></div>}
          </div>
        </div>
      </a>
    </div>
  );
};

export default MainMenuCard;
