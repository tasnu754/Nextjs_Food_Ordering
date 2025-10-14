"use client";

import { Expand, ShoppingCart } from "lucide-react";
import { useState } from "react";
import StarRating from "./StartRating";
import WishlistIcon from "./WishlistIcon";
import { Oswald, Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: "400",
});

const oswald = Oswald({
  subsets: ["latin"],
  weight: "600",
});

const MainMenuCard = ({ item, onImageClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div>
      <a
        href={`#item-${item?.id}`}
        className="block group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className=" rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
          {/* Image Section */}
          <div className="relative h-full rounded overflow-hidden">
            <img
              src={item?.image}
              alt={item?.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* Code Badge */}
            <div className="absolute top-4 left-4 bg-black bg-opacity-60 text-white px-3 py-1 rounded text-sm font-semibold">
              CODE: {item?.code}
            </div>

            {/* Expand Icon */}
            <button
              onClick={(e) => {
                e.preventDefault();
                onImageClick();
              }}
              className="absolute bottom-4 right-4  p-2 rounded-lg hover:bg-opacity-100 transition-all duration-300 hover:scale-110"
            >
              <Expand size={20} className="text-white" />
            </button>
          </div>

          {/* Content Section */}
          <div className="py-6 px-2 relative">
            <div className="flex justify-between">
              {/* Star Rating */}
              <div className="flex gap-1 mb-2">
                <StarRating rating={item?.rating}></StarRating>
              </div>

              {/* Heart Icon */}
              <WishlistIcon></WishlistIcon>
            </div>

            {/* Product Details */}
            <div className="pt-3 sm:pt-4 md:pt-5 text-[#642F21] text-start flex flex-col justify-center gap-2 sm:gap-3 md:gap-4 px-2 sm:px-0">
              <h4
                className={`uppercase ${oswald.className} !no-underline  font-bold sm:text-xl md:text-2xl !text-3xl tracking-wide`}
              >
                Bigti Burger
              </h4>
              <p
                className={`${roboto.className} !no-underline  opacity-70 text-[#642F21] font-light text-sm sm:text-base md:text-xl px-1 sm:px-2 md:px-4`}
              >
                Mushroom patty, vegan cheese, lettuce, tomatoes, avocado ligula
              </p>
              <div
                className={`flex item?s-center justify-between ${oswald.className}`}
              >
                <span className="text-3xl font-bold text-red-600">
                  {item?.price}
                </span>
              </div>
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
