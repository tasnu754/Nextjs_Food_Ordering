"use client";

import ImageUploader from "./ImageUploader";
import VariantSelector from "./VariantSelector";
import FullDescriptionEditor from "./FullDescriptionEditor";
import { useState } from "react";
import { createFoodItem } from "@/actions/addFoodAction";
import { Oswald, Roboto, Lilita_One } from "next/font/google";
const roboto = Roboto({
  subsets: ["latin"],
  weight: "400",
});

const oswald = Oswald({
  subsets: ["latin"],
  weight: "600",
});
const lil = Lilita_One({
  subsets: ["latin"],
  weight: "400",
});

const AddFoodForm = () => {
  const [variants, setVariants] = useState([]);
  const [fullDescription, setFullDescription] = useState({
    intro: "",
    bullets: ["", ""],
    outro: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    const formData = new FormData(e.currentTarget);

    // Add variants and fullDescription as JSON strings
    formData.append("variants", JSON.stringify(variants));
    formData.append("fullDescription", JSON.stringify(fullDescription));

    const result = await createFoodItem(formData);

    setIsSubmitting(false);
    setMessage({
      type: result.success ? "success" : "error",
      text: result.message,
    });

    if (result.success) {
      // Reset form
      e.currentTarget.reset();
      setVariants([]);
      setFullDescription({ intro: "", bullets: ["", ""], outro: "" });
    }
  };

  const categories = [
    "Burger",
    "Pizza",
    "Salad",
    "Dessert",
    "Appetizer",
    "Beverage",
    "Main Course",
  ];

  return (
    <form onSubmit={handleSubmit} className="p-4 sm:p-6 md:p-8">
      {/* Success/Error Message */}
      {message && (
        <div
          className={`mb-4 sm:mb-6 p-3 sm:p-4 rounded-lg text-sm sm:text-base ${
            message.type === "success"
              ? "bg-green-100 text-green-800 border border-green-300"
              : "bg-red-100 text-red-800 border border-red-300"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Image Upload Section */}
      <ImageUploader />

      {/* Basic Information */}
      <div
        className={`grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8 ${roboto.className}`}
      >
        <div>
          <label
            className={`block text-md font-semibold text-gray-700 mb-2 ${oswald.className}`}
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            required
            className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-gray-300 rounded-lg focus:border-[#AE3433] focus:outline-none transition"
            placeholder="Classic Beef Burger"
          />
        </div>
        <div>
          <label
            className={`block text-md font-semibold text-gray-700 mb-2 ${oswald.className}`}
          >
            Price ($)
          </label>
          <input
            type="number"
            name="price"
            step="0.01"
            required
            className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-gray-300 rounded-lg focus:border-[#AE3433] focus:outline-none transition"
            placeholder="12.99"
          />
        </div>
      </div>

      <div
        className={`grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8 ${roboto.className}`}
      >
        <div>
          <label
            className={`block text-md font-semibold text-gray-700 mb-2 ${oswald.className}`}
          >
            Weight
          </label>
          <input
            type="text"
            name="weight"
            required
            className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-gray-300 rounded-lg focus:border-[#AE3433] focus:outline-none transition"
            placeholder="250g"
          />
        </div>
        <div>
          <label
            className={`block text-md font-semibold text-gray-700 mb-2 ${oswald.className}`}
          >
            Category
          </label>
          <select
            name="category"
            required
            className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-gray-300 rounded-lg focus:border-[#AE3433] focus:outline-none transition ${roboto.className}`}
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>
    </form>
  );
};

export default AddFoodForm;
