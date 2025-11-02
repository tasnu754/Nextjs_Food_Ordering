"use client";

import ImageUploader from "./ImageUploader";
import VariantSelector from "./VariantSelector";
import FullDescriptionEditor from "./FullDescriptionEditor";
import { useState } from "react";
import { createFoodItem } from "@/actions/addFoodAction";

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
    </form>
  );
};

export default AddFoodForm;
