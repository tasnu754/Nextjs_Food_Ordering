"use client";

import { Oswald, Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: "400",
});

const oswald = Oswald({
  subsets: ["latin"],
  weight: "600",
});

const VariantSelector = ({ variants, setVariants }) => {
  const variantOptions = ["Small", "Regular", "Large", "Extra Large"];

  const handleToggle = (variant) => {
    setVariants((prev) =>
      prev.includes(variant)
        ? prev.filter((v) => v !== variant)
        : [...prev, variant]
    );
  };

  return (
    <div className="mb-6 sm:mb-8">
      <label
        className={`block text-md font-semibold text-gray-700 mb-2 sm:mb-3 ${oswald.className}`}
      >
        Available Variants
      </label>
      <div className={`flex flex-wrap gap-2 sm:gap-3 ${roboto.className}`}>
        {variantOptions.map((variant) => (
          <button
            key={variant}
            type="button"
            onClick={() => handleToggle(variant)}
            className={`px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 text-xs sm:text-sm md:text-base rounded-lg font-medium transition ${
              variants.includes(variant)
                ? "bg-[#AE3433] text-white shadow-lg"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {variant}
          </button>
        ))}
      </div>
    </div>
  );
};

export default VariantSelector;
