"use client";

import { HiOutlineShoppingBag } from "react-icons/hi2";
import { Oswald } from "next/font/google";

const oswald = Oswald({
  subsets: ["latin"],
  weight: "600",
});

const AddToCartButton = () => {
  const handleAddToCart = () => {
    console.log("Added to cart!");
  };

  return (
    <div className="flex justify-center items-center ">
      <button
        onClick={handleAddToCart}
        className={`flex justify-center items-center gap-2 py-2 px-6 lg:px-12 ${oswald.className} text-[#642F21] hover:bg-[#642F21] hover:text-white border-2 border-[#642F21] font-semibold rounded-xl transition-colors duration-400`}
      >
        <HiOutlineShoppingBag className="text-2xl" />
        ADD TO CART
      </button>
    </div>
  );
};

export default AddToCartButton;
