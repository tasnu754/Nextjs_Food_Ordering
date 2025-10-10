"use client";

import { HiOutlineShoppingBag } from "react-icons/hi2";

const AddToCartButton = () => {
  const handleAddToCart = () => {
    console.log("Added to cart!");
  };

  return (
    <div className="flex justify-center items-center">
      <button
        onClick={handleAddToCart}
        className="flex justify-center items-center gap-2 py-2 px-8 addBtn text-[#642F21] hover:bg-yellow-400 border-2 border-[#642F21] font-semibold rounded-xl transition-colors duration-400"
      >
        <HiOutlineShoppingBag className="text-2xl" />
        ADD TO CART
      </button>
    </div>
  );
};

export default AddToCartButton;
