"use client";

import { useState, useRef } from "react";
import { Oswald, Roboto } from "next/font/google";
import { Pencil, Trash2, Search, Plus, X } from "lucide-react";
import Image from "next/image";
import DashboardLayout from "@/components/dashboard/shared/DashboardLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import {
  useDeleteFoodItemMutation,
  useGetAllFoodItemsQuery,
  useUpdateFoodItemMutation,
} from "@/redux/features/foodApi";
import { useGetAllCategoriesQuery } from "@/redux/features/categoryApi";
import Swal from "sweetalert2";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500"],
});

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["600", "700"],
});

// VariantSelector Component
const VariantSelector = ({ variants, setVariants }) => {
  const availableVariants = ["small", "regular", "large", "extra large"];

  const toggleVariant = (variant) => {
    if (variants.includes(variant)) {
      setVariants(variants.filter((v) => v !== variant));
    } else {
      setVariants([...variants, variant]);
    }
  };

  return (
    <div className="mb-6 sm:mb-8">
      <label
        className={`block text-md font-semibold text-gray-700 mb-3 ${oswald.className}`}
      >
        Variants
      </label>
      <div className="flex flex-wrap gap-3">
        {availableVariants.map((variant) => (
          <button
            key={variant}
            type="button"
            onClick={() => toggleVariant(variant)}
            className={`px-4 py-2 !rounded-lg border-2 transition capitalize ${
              variants.includes(variant)
                ? "bg-[#AE3433] text-white border-[#AE3433]"
                : "bg-white text-gray-700 border-gray-300 hover:border-[#AE3433]"
            }`}
          >
            {variant}
          </button>
        ))}
      </div>
    </div>
  );
};

// FullDescriptionEditor Component
const FullDescriptionEditor = ({ fullDescription, setFullDescription }) => {
  const addBulletPoint = () => {
    setFullDescription((prev) => ({
      ...prev,
      bullets: [...prev.bullets, ""],
    }));
  };

  const updateBulletPoint = (index, value) => {
    const newBullets = [...fullDescription.bullets];
    newBullets[index] = value;
    setFullDescription((prev) => ({
      ...prev,
      bullets: newBullets,
    }));
  };

  const removeBulletPoint = (index) => {
    if (fullDescription.bullets.length > 1) {
      const newBullets = fullDescription.bullets.filter((_, i) => i !== index);
      setFullDescription((prev) => ({
        ...prev,
        bullets: newBullets,
      }));
    }
  };

  return (
    <div className="mb-6 sm:mb-8">
      <label
        className={`block text-md font-semibold text-gray-700 mb-3 ${oswald.className}`}
      >
        Full Description
      </label>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Introduction
          </label>
          <textarea
            value={fullDescription.intro}
            onChange={(e) =>
              setFullDescription((prev) => ({ ...prev, intro: e.target.value }))
            }
            rows={3}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-gray-300 rounded-lg focus:border-[#AE3433] focus:outline-none transition resize-none"
            placeholder="Describe the food item in detail..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Key Features
          </label>
          <div className="space-y-2">
            {fullDescription.bullets.map((bullet, index) => (
              <div key={index} className="flex gap-2 items-start">
                <input
                  type="text"
                  value={bullet}
                  onChange={(e) => updateBulletPoint(index, e.target.value)}
                  className="flex-1 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-gray-300 rounded-lg focus:border-[#AE3433] focus:outline-none transition"
                  placeholder={`Feature ${index + 1}`}
                />
                {fullDescription.bullets.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeBulletPoint(index)}
                    className="px-3 py-2 text-red-600 hover:text-red-800 transition"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addBulletPoint}
            className="mt-2 px-4 py-2 text-[#AE3433] border-2 border-[#AE3433] rounded-lg hover:bg-[#AE3433] hover:text-white transition"
          >
            + Add Feature
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Conclusion
          </label>
          <textarea
            value={fullDescription.outro}
            onChange={(e) =>
              setFullDescription((prev) => ({ ...prev, outro: e.target.value }))
            }
            rows={2}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-gray-300 rounded-lg focus:border-[#AE3433] focus:outline-none transition resize-none"
            placeholder="Final remarks or serving suggestions..."
          />
        </div>
      </div>
    </div>
  );
};

// Image Uploader Component
const ImageUploader = ({
  thumbnail,
  additionalImages,
  onThumbnailChange,
  onAdditionalChange,
}) => {
  const [thumbnailPreview, setThumbnailPreview] = useState(thumbnail);
  const [additionalPreviews, setAdditionalPreviews] = useState(
    additionalImages || []
  );

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setThumbnailPreview(previewUrl);
      onThumbnailChange(file);
    }
  };

  const handleAdditionalChange = (e) => {
    const files = Array.from(e.target.files);
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setAdditionalPreviews((prev) => [...prev, ...newPreviews]);
    onAdditionalChange(files);
  };

  const removeThumbnail = () => {
    setThumbnailPreview(null);
    onThumbnailChange(null);
  };

  const removeAdditionalImage = (index) => {
    setAdditionalPreviews((prev) => prev.filter((_, i) => i !== index));
    onAdditionalChange(additionalPreviews.filter((_, i) => i !== index));
  };

  return (
    <div className="mb-6 sm:mb-8">
      <label
        className={`block text-md font-semibold text-gray-700 mb-3 ${oswald.className}`}
      >
        Images
      </label>

      {/* Thumbnail Upload */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Thumbnail *
        </label>
        {thumbnailPreview ? (
          <div className="relative">
            <img
              src={thumbnailPreview}
              alt="Thumbnail preview"
              className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-lg sm:rounded-xl"
            />
            <button
              type="button"
              onClick={removeThumbnail}
              className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-[#AE3433] text-white p-1.5 sm:p-2 rounded-full hover:bg-[#5E0208] transition shadow-lg"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        ) : (
          <div className="border-2 border-dashed border-gray-300 rounded-lg sm:rounded-xl p-6 text-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleThumbnailChange}
              className="hidden"
              id="thumbnail-upload"
            />
            <label
              htmlFor="thumbnail-upload"
              className="cursor-pointer text-[#AE3433] hover:text-[#5E0208] transition"
            >
              <Plus className="w-8 h-8 mx-auto mb-2" />
              <span className="text-sm font-medium">Upload Thumbnail</span>
            </label>
          </div>
        )}
      </div>

      {/* Additional Images */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Additional Images
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {additionalPreviews.map((preview, index) => (
            <div key={index} className="relative">
              <img
                src={preview}
                alt={`Additional ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => removeAdditionalImage(index)}
                className="absolute top-1 right-1 bg-[#AE3433] text-white p-1 rounded-full hover:bg-[#5E0208] transition shadow-lg"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}

          {additionalPreviews.length < 5 && (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleAdditionalChange}
                className="hidden"
                id="additional-upload"
              />
              <label
                htmlFor="additional-upload"
                className="cursor-pointer text-gray-400 hover:text-gray-600 transition"
              >
                <Plus className="w-6 h-6 mx-auto mb-1" />
                <span className="text-xs">Add Image</span>
              </label>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Edit Food Modal Component
const EditFoodModal = ({ item, isOpen, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    foodName: item?.foodName || "",
    price: item?.price || "",
    weight: item?.weight || "",
    category: item?.category?._id || "",
    shortDescription: item?.shortDescription || "",
    isFeatured: item?.isFeatured || false,
  });
  const [variants, setVariants] = useState(item?.variants || []);
  const [fullDescription, setFullDescription] = useState({
    intro: item?.fullDescription?.introduction || "",
    bullets: item?.fullDescription?.bulletPoints || [""],
    outro: item?.fullDescription?.conclusion || "",
  });
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [additionalFiles, setAdditionalFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: categoriesData } = useGetAllCategoriesQuery();
  const [updateFoodItem] = useUpdateFoodItemMutation();

  const categories = categoriesData?.data?.categories;
  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const submitFormData = new FormData();
    submitFormData.append("foodName", formData.foodName);
    submitFormData.append("price", formData.price);
    submitFormData.append("weight", formData.weight);
    submitFormData.append("category", formData.category);
    submitFormData.append("shortDescription", formData.shortDescription);
    submitFormData.append("isFeatured", formData.isFeatured);
    submitFormData.append("variants", JSON.stringify(variants));
    submitFormData.append("fullDescription", JSON.stringify(fullDescription));

    if (thumbnailFile) {
      submitFormData.append("thumbnail", thumbnailFile);
    }

    additionalFiles.forEach((file) => {
      submitFormData.append("additionalImages", file);
    });

    try {
      const result = await updateFoodItem({
        id: item?._id,
        formData: submitFormData,
      }).unwrap();

      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Food item has been updated successfully.",
        confirmButtonColor: "#AE3433",
      });

      onUpdate(result.data);
      onClose();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error?.data?.message || "Failed to update food item",
        confirmButtonColor: "#AE3433",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
          <h2
            className={`text-2xl font-bold text-gray-900 ${oswald.className}`}
          >
            Edit {item?.foodName}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form ref={formRef} onSubmit={handleSubmit} className="p-6">
          <ImageUploader
            thumbnail={item?.thumbnail}
            additionalImages={item?.additionalImages}
            onThumbnailChange={setThumbnailFile}
            onAdditionalChange={setAdditionalFiles}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label
                className={`block text-sm font-semibold text-gray-700 mb-2 ${oswald.className}`}
              >
                Name
              </label>
              <input
                type="text"
                name="foodName"
                value={formData.foodName}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 text-sm border-2 border-gray-300 rounded-lg focus:border-[#AE3433] focus:outline-none transition"
              />
            </div>

            <div>
              <label
                className={`block text-sm font-semibold text-gray-700 mb-2 ${oswald.className}`}
              >
                Price ($)
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                step="0.01"
                required
                className="w-full px-3 py-2 text-sm border-2 border-gray-300 rounded-lg focus:border-[#AE3433] focus:outline-none transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label
                className={`block text-sm font-semibold text-gray-700 mb-2 ${oswald.className}`}
              >
                Weight
              </label>
              <input
                type="text"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 text-sm border-2 border-gray-300 rounded-lg focus:border-[#AE3433] focus:outline-none transition"
              />
            </div>

            <div>
              <label
                className={`block text-sm font-semibold text-gray-700 mb-2 ${oswald.className}`}
              >
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 text-sm border-2 border-gray-300 rounded-lg focus:border-[#AE3433] focus:outline-none transition"
              >
                <option value="">Select a category</option>
                {categories?.map((category) => (
                  <option key={category?._id} value={category?._id}>
                    {category?.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <VariantSelector variants={variants} setVariants={setVariants} />

          <div className="mb-6">
            <label
              className={`block text-sm font-semibold text-gray-700 mb-2 ${oswald.className}`}
            >
              Short Description
              <span className="text-[#AE3433] ml-2">
                (Please write within 60-65 letters)
              </span>
            </label>
            <textarea
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleChange}
              required
              maxLength={63}
              rows={2}
              className="w-full px-3 py-2 text-sm border-2 border-gray-300 rounded-lg focus:border-[#AE3433] focus:outline-none transition resize-none"
            />
          </div>

          <FullDescriptionEditor
            fullDescription={fullDescription}
            setFullDescription={setFullDescription}
          />

          <div className="mb-6">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={handleChange}
                className="w-4 h-4 text-[#AE3433] bg-gray-100 border-gray-300 rounded focus:ring-[#AE3433] focus:ring-2"
              />
              <span
                className={`text-sm font-semibold text-[#AE3433] ${oswald.className}`}
              >
                Feature this item
              </span>
            </label>
          </div>

          {/* Actions */}
          <div className="flex gap-10 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 bg-gray-200 text-gray-700 font-semibold !rounded-lg hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-2.5 bg-[#C9983C] text-white font-semibold !rounded-lg hover:bg-[#b8811b] transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Updating..." : "Update Food Item"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Main AdminDishesPage Component (same as before, just including for completeness)
const AdminDishesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const { data: categories } = useGetAllCategoriesQuery();
  const {
    data: foodItemData,
    isLoading,
    error,
    refetch,
  } = useGetAllFoodItemsQuery();
  const [deleteFoodItem] = useDeleteFoodItemMutation();

  const foodItems = foodItemData?.data?.foodItems;

  const filteredItems = foodItems?.filter((item) => {
    const matchesSearch = item.foodName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || item.category.name === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleEditClick = (item) => {
    setSelectedItem(item);
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setSelectedItem(null);
  };

  const handleUpdateSuccess = () => {
    refetch();
  };

  const handleDeleteClick = async (item) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Delete ${item?.foodName}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete!",
    });

    if (result.isConfirmed) {
      try {
        await deleteFoodItem({ id: item?._id }).unwrap();
        Swal.fire("Deleted!", `${item?.foodName} has been deleted.`, "success");
        refetch();
      } catch (error) {
        Swal.fire(
          "Error!",
          error?.data?.message || "Failed to delete user.",
          "error"
        );
      }
    }
  };

  return (
    <ProtectedRoute requiredRole="admin">
      <DashboardLayout userRole="admin">
        <div className={`min-h-screen bg-gray-50 ${roboto.className}`}>
          {/* Filters and grid remain the same */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="text"
                    placeholder="Search dishes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border-2 border-gray-300 rounded-lg focus:border-[#AE3433] focus:outline-none transition"
                  />
                </div>

                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:border-[#AE3433] focus:outline-none transition"
                >
                  <option value="all">All Categories</option>
                  {categories?.data?.categories?.map((category) => (
                    <option key={category?._id} value={category?.name}>
                      {category?.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {/* Food Items Grid */}
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#AE3433]"></div>
              </div>
            ) : filteredItems?.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <p className="text-gray-500 text-lg">No dishes found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems?.map((item) => (
                  <div
                    key={item?._id}
                    className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                  >
                    {/* Image */}
                    {item?.isFeatured ? (
                      <div className="relative pt-3 h-58 bg-white !rounded-lg">
                        <Image
                          src={item?.thumbnail}
                          alt={item?.foodName}
                          width={400}
                          height={300}
                          className="w-full h-full  object-contain"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    ) : (
                      <div className="relative h-58 bg-white !rounded-lg">
                        <Image
                          src={item?.thumbnail}
                          alt={item?.foodName}
                          width={400}
                          height={300}
                          className="w-full h-full  object-over"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    )}

                    {/* Content */}
                    <div className="px-8 py-3">
                      <div className="mb-3">
                        <h3
                          className={`text-xl font-bold !text-[#5E0208] mb-2 ${oswald.className}`}
                        >
                          {item?.foodName}
                        </h3>
                        <span className="text-md !text-[#C9983C]">
                          {item?.category.name}
                        </span>
                      </div>

                      <p className="text-gray-600 text-md mb-2 line-clamp-2">
                        {item?.shortDescription}
                      </p>

                      <div className="flex items-center justify-between mb-3">
                        <span
                          className={`text-2xl font-bold text-[#AE3433] ${oswald.className}`}
                        >
                          ${item?.price.toFixed(2)}
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleEditClick(item)}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#C9983C] text-white font-semibold !rounded-lg hover:bg-[#b8811b] transition"
                        >
                          <Pencil size={18} />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteClick(item)}
                          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#AE3433] text-white font-semibold !rounded-lg hover:bg-red-700 transition"
                        >
                          <Trash2 size={18} />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Edit Modal */}
          {selectedItem && (
            <EditFoodModal
              item={selectedItem}
              isOpen={editModalOpen}
              onClose={handleCloseEditModal}
              onUpdate={handleUpdateSuccess}
            />
          )}
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default AdminDishesPage;
