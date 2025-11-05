"use client";

import ImageUploader from "./ImageUploader";
import VariantSelector from "./VariantSelector";
import FullDescriptionEditor from "./FullDescriptionEditor";
import { useState, useRef } from "react";
import { Oswald, Roboto } from "next/font/google";
import { useGetAllCategoriesQuery } from "@/redux/features/categoryApi";
import { useCreateFoodItemMutation } from "@/redux/features/foodApi";
import Swal from "sweetalert2";

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

    const formData = new FormData();

    const formElements = formRef.current.elements;
    formData.append("foodName", formElements.foodName?.value || "");
    formData.append("price", formElements.price?.value || "");
    formData.append("weight", formElements.weight?.value || "");
    formData.append("category", formElements.category?.value || "");
    formData.append(
      "shortDescription",
      formElements.shortDescription?.value || ""
    );

    if (thumbnailFile) {
      formData.append("thumbnail", thumbnailFile);
    } else {
      Swal.fire({
        icon: "error",
        title: "Thumbnail Required",
        text: "Please upload a thumbnail image for the food item.",
        confirmButtonColor: "#AE3433",
      });
      setIsSubmitting(false);
      return;
    }

    additionalFiles.forEach((file, index) => {
      formData.append("additionalImages", file);
    });

    formData.append("variants", JSON.stringify(variants));
    formData.append("fullDescription", JSON.stringify(fullDescription));

    try {
      Swal.fire({
        title: "Creating Food Item...",
        text: "Please wait while we create your food item.",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const result = await createFoodItem(formData).unwrap();

      Swal.fire({
        icon: "success",
        title: "Created!",
        text: "Food item has been created successfully.",
        confirmButtonColor: "#AE3433",
      });

      setIsSubmitting(false);
      setMessage({
        type: "success",
        text: result.message || "Food item created successfully!",
      });

      if (result.success) {
        formRef.current.reset();
        setVariants([]);
        setFullDescription({ intro: "", bullets: ["", ""], outro: "" });
        setThumbnailFile(null);
        setAdditionalFiles([]);
      }
    } catch (error) {
      setIsSubmitting(false);

      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error?.data?.message || "Failed to create food item",
        confirmButtonColor: "#AE3433",
      });

      setMessage({
        type: "error",
        text: error?.data?.message || "Failed to create food item",
      });
    }
  };
  const isLoading = isSubmitting || isCreating;

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className={`p-4 sm:p-6 md:p-8 ${roboto.className}`}
    >
      <ImageUploader
        onThumbnailChange={setThumbnailFile}
        onAdditionalChange={setAdditionalFiles}
      />

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
          Short Description (Ingredients){" "}
          <span className={`!text-[#AE3433] ${roboto.className}`}>
            (Please write within 60-65 letters)
          </span>
        </label>
        <textarea
          name="shortDescription"
          required
          maxLength={63}
          rows={2}
          className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-gray-300 rounded-lg focus:border-[#AE3433] focus:outline-none transition resize-none"
          placeholder="Premium beef patty, lettuce, tomato, onions, special sauce..."
        />
      </div>

      <FullDescriptionEditor
        fullDescription={fullDescription}
        setFullDescription={setFullDescription}
      />
      {message && (
        <div
          className={`mb-4 sm:mb-6 p-3 sm:p-4 rounded-lg text-sm sm:text-base ${
            message.type === "success"
              ? "bg-green-100 text-green-800 border border-green-300"
              : "bg-red-100 text-red-800 border border-red-300"
          }`}
        >
          {message?.text}
        </div>
      )}

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
