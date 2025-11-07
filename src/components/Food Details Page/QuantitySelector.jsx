"use client";

import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Roboto } from "next/font/google";
import { useAddToCartMutation } from "@/redux/features/cartApi";
import { toast } from "react-hot-toast";

const roboto = Roboto({
  subsets: ["latin"],
  weight: "300",
});
const robotoBold = Roboto({
  subsets: ["latin"],
  weight: "700",
});

export const QuantitySelector = ({ foodItemId, price, variants = [] }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(
    variants.length > 0 ? variants[0] : "regular"
  );
  const [addToCart, { isLoading }] = useAddToCartMutation();

  const increment = () => setQuantity((q) => q + 1);
  const decrement = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value === "") {
      setQuantity("");
      return;
    }

    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue > 0) {
      setQuantity(numValue);
    }
  };

  const handleBlur = () => {
    if (quantity === "" || quantity < 1) {
      setQuantity(1);
    }
  };

  const handleAddToCart = async () => {
    try {
      const result = await addToCart({
        foodItemId,
        quantity,
        variant: selectedVariant,
      }).unwrap();

      toast.success("Item added to cart!", {
        duration: 3000,
        position: "top-right",
      });

      setQuantity(1);
    } catch (error) {
      console.error("Add to cart error:", error);
      toast.error(error?.data?.message || "Failed to add item to cart", {
        duration: 3000,
        position: "top-right",
      });
    }
  };

  const availableVariants =
    variants.length > 0
      ? variants
      : ["small", "regular", "large", "extra large"];

  return (
    <div className={`space-y-4 mb-8 ${roboto.className}`}>
      {availableVariants.length > 0 && (
        <div className="flex items-center gap-2">
          <span className="text-gray-600 text-xl font-bold">Size:</span>
          <select
            value={selectedVariant}
            onChange={(e) => setSelectedVariant(e.target.value)}
            className="px-3 py-2 border font-semibold text-[#642F21] border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            {availableVariants.map((variant) => (
              <option key={variant} value={variant}>
                {variant.charAt(0).toUpperCase() + variant.slice(1)}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="flex items-center gap-4">
        <div className="flex items-center border border-gray-300 rounded">
          <input
            type="number"
            value={quantity}
            onChange={handleInputChange}
            onBlur={handleBlur}
            min="1"
            className={`w-16 text-center text-xl border-x border-gray-300 ${robotoBold.className} py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`}
          />
          <div className="flex flex-col border-l border-gray-300">
            <button
              type="button"
              onClick={increment}
              disabled={isLoading}
              className="px-3 py-1 hover:bg-gray-100 border-b border-gray-300 flex items-center justify-center transition-colors disabled:opacity-50"
            >
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 15l7-7 7 7"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={decrement}
              disabled={isLoading}
              className="px-3 py-1 hover:bg-gray-100 flex items-center justify-center transition-colors disabled:opacity-50"
            >
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={isLoading}
          className={`bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-400 disabled:cursor-not-allowed ${robotoBold.className} font-bold py-2 md:py-3 px-3 md:px-6 rounded flex items-center justify-center gap-2 transition min-w-[140px]`}
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Adding...
            </>
          ) : (
            <>
              <ShoppingCart size={20} />
              Add to cart
            </>
          )}
        </button>
      </div>
    </div>
  );
};
