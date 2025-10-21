"use client";

const { useState } = require("react");
import { ShoppingCart } from "lucide-react";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: "300",
});
const robotoBold = Roboto({
  subsets: ["latin"],
  weight: "700",
});

export const QuantitySelector = () => {
  const [quantity, setQuantity] = useState(1);

  const increment = () => setQuantity((q) => q + 1);
  const decrement = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  return (
    <div className={`flex items-center gap-4 mb-8 ${roboto.className}`}>
      <div className="flex items-center border border-gray-300 rounded">
        <input
          type="number"
          value={quantity}
          readOnly
          className={`w-16 text-center !text-xl border-x border-gray-300 ${robotoBold.className} py-2 appearance-none`}
        />
        <div className="flex flex-col border-l border-gray-300">
          <button
            onClick={increment}
            className="px-3 py-1 hover:bg-gray-100 border-b border-gray-300 flex items-center justify-center"
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
            onClick={decrement}
            className="px-3 py-1 hover:bg-gray-100 flex items-center justify-center"
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
        className={`bg-yellow-500 hover:bg-yellow-600 ${robotoBold.className} !font-bold py-2 md:py-3 px-3 md:px-6 rounded flex items-center justify-center gap-2 transition`}
      >
        <ShoppingCart size={20} />
        Add to cart
      </button>
    </div>
  );
};
