"use client";

import ImageUploader from "./ImageUploader";
import VariantSelector from "./VariantSelector";
import FullDescriptionEditor from "./FullDescriptionEditor";
import { useState, useRef } from "react";
import { Oswald, Roboto } from "next/font/google";
import { useGetAllCategoriesQuery } from "@/redux/features/categoryApi";
import { useCreateFoodItemMutation } from "@/redux/features/foodApi";

const roboto = Roboto({
  subsets: ["latin"],
  weight: "400",
});

const oswald = Oswald({
  subsets: ["latin"],
  weight: "600",
});

const AddFoodForm = () => {
  const [variants, setVariants] = useState([]);
  const [fullDescription, setFullDescription] = useState({
    intro: "",
    bullets: ["", ""],
    outro: "",
  });
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [additionalFiles, setAdditionalFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  const formRef = useRef(null);

  const {
    data: categoriesData,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useGetAllCategoriesQuery();

  const [createFoodItem, { isLoading: isCreating }] =
    useCreateFoodItemMutation();

  const categories = categoriesData?.data?.categories;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    // Create FormData manually to ensure all data is included
    const formData = new FormData();

    // Add basic form fields
    const formElements = e.currentTarget.elements;
    formData.append("foodName", formElements.foodName?.value || "");
    formData.append("price", formElements.price?.value || "");
    formData.append("weight", formElements.weight?.value || "");
    formData.append("category", formElements.category?.value || "");
    formData.append(
      "shortDescription",
      formElements.shortDescription?.value || ""
    );

    // Add files from ImageUploader
    if (thumbnailFile) {
      formData.append("thumbnail", thumbnailFile);
    } else {
      setMessage({
        type: "error",
        text: "Thumbnail image is required",
      });
      setIsSubmitting(false);
      return;
    }

    // Add additional images
    additionalFiles.forEach((file, index) => {
      formData.append("additionalImages", file);
    });

    // Add variants and fullDescription as JSON strings
    formData.append("variants", JSON.stringify(variants));
    formData.append("fullDescription", JSON.stringify(fullDescription));

    // Debug: Check FormData contents
    console.log("FormData contents:");
    for (let [key, value] of formData.entries()) {
      console.log(key, value instanceof File ? `File: ${value.name}` : value);
    }

    try {
      // Use the RTK Query mutation
      const result = await createFoodItem(formData).unwrap();

      setIsSubmitting(false);
      setMessage({
        type: "success",
        text: result.message || "Food item created successfully!",
      });

      if (result.success) {
        // Reset form
        e.currentTarget.reset();
        setVariants([]);
        setFullDescription({ intro: "", bullets: ["", ""], outro: "" });
        setThumbnailFile(null);
        setAdditionalFiles([]);
      }
    } catch (error) {
      console.error("Error creating food item:", error);
      setIsSubmitting(false);
      setMessage({
        type: "error",
        text: error?.data?.message || "Failed to create food item",
      });
    }
  };

  // Update the loading state
  const isLoading = isSubmitting || isCreating;

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className={`p-4 sm:p-6 md:p-8 ${roboto.className}`}
    >
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

      {/* Image Upload Section - Pass file state setters */}
      <ImageUploader
        onThumbnailChange={setThumbnailFile}
        onAdditionalChange={setAdditionalFiles}
      />

      {/* Rest of your form remains the same */}
      <div
        className={`grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8 ${roboto.className}`}
      >
        <div>
          <label
            className={`block text-md font-semibold text-gray-700 mb-2 ${oswald.className}`}
          >
            Name
          </label>
          <input
            type="text"
            name="foodName"
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
            disabled={categoriesLoading}
            className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-gray-300 rounded-lg focus:border-[#AE3433] focus:outline-none transition ${
              roboto.className
            } ${categoriesLoading ? "bg-gray-100 cursor-not-allowed" : ""}`}
          >
            <option value="">Select a category</option>
            {categoriesLoading ? (
              <option value="" disabled>
                Loading categories...
              </option>
            ) : categoriesError ? (
              <option value="" disabled>
                Error loading categories
              </option>
            ) : categories ? (
              categories?.map((category) => (
                <option key={category?._id} value={category?._id}>
                  {category?.name}
                </option>
              ))
            ) : null}
          </select>
          {categoriesError && (
            <p className="text-red-500 text-sm mt-1">
              Failed to load categories
            </p>
          )}
        </div>
      </div>

      <VariantSelector variants={variants} setVariants={setVariants} />

      <div className="mb-6 sm:mb-8">
        <label
          className={`block text-md font-semibold text-gray-700 mb-2 ${oswald.className}`}
        >
          Short Description (Ingredients)
        </label>
        <textarea
          name="shortDescription"
          required
          rows={3}
          className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-gray-300 rounded-lg focus:border-[#AE3433] focus:outline-none transition resize-none"
          placeholder="Premium beef patty, lettuce, tomato, onions, special sauce..."
        />
      </div>

      <FullDescriptionEditor
        fullDescription={fullDescription}
        setFullDescription={setFullDescription}
      />

      <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 sm:gap-4">
        <button
          type="button"
          className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base bg-gray-200 text-gray-700 font-semibold !rounded-lg hover:bg-gray-300 transition"
          onClick={() => window.history.back()}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base bg-gradient-to-r from-[#5E0208] to-[#AE3433] text-white font-semibold !rounded-lg hover:shadow-xl transition transform !duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isLoading ? "Creating..." : "Add Food Item"}
        </button>
      </div>
    </form>
  );
};

export default AddFoodForm;
