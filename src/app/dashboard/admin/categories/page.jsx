"use client";

import DashboardLayout from "@/components/dashboard/shared/DashboardLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import React, { useEffect, useState } from "react";
import { Plus, Trash2, Package, Search, X, Upload, Edit } from "lucide-react";
import { Oswald, Roboto, Lilita_One } from "next/font/google";
import {
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useGetAllCategoriesQuery,
  useUpdateCategoryMutation,
} from "@/redux/features/categoryApi";
import Swal from "sweetalert2";
import Image from "next/image";

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

const AddCategoryModal = ({ isOpen, onClose, onAdd, editData }) => {
  const [formData, setFormData] = useState(
    editData || {
      name: "",
      description: "",
      image: null,
    }
  );
  console.log(editData);
  const [imagePreview, setImagePreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (editData) {
      setFormData(editData);
      setImagePreview(editData.image || null);
    } else {
      setFormData({ name: "", description: "", image: null });
      setImagePreview(null);
    }
  }, [editData, isOpen]);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5MB");
      return;
    }

    setIsUploading(true);

    try {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);

      setFormData((prev) => ({
        ...prev,
        image: file,
      }));
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error uploading image. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setFormData((prev) => ({
      ...prev,
      image: null,
    }));
  };

  const handleSubmit = () => {
    if (!formData.name.trim()) {
      alert("Category name is required");
      return;
    }
    onAdd(formData);
    setFormData({ name: "", description: "", image: null });
    setImagePreview(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold !text-[#5E0208]">
            {editData ? "Edit Category" : "Add New Category"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#AE3433] mb-2">
              Category Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#AE3433] focus:border-transparent"
              placeholder="Enter category name"
            />
          </div>

          {/* Image Upload Field */}
          <div>
            <label className="block text-sm font-medium text-[#AE3433] mb-2">
              Category Icon
            </label>
            <div className="flex flex-col items-center justify-center">
              {imagePreview ? (
                <div className="relative w-32 h-32 mb-4">
                  <Image
                    fill
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-lg border-2 border-gray-300"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center w-full">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-[#AE3433] mb-2">
                    Upload category icon
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUploading}
                    className="hidden"
                    id="category-image"
                  />
                  <label
                    htmlFor="category-image"
                    className={`inline-flex items-center gap-2 px-4 py-2 bg-[#AE3433] text-white rounded-lg hover:bg-[#5E0208] transition-colors cursor-pointer ${
                      isUploading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {isUploading ? "Uploading..." : "Choose Image"}
                  </label>
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#AE3433] mb-2">
              Description (Please write within 38–40 letters)
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              maxLength={40}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 !rounded-lg focus:ring-2 focus:ring-[#AE3433] focus:border-transparent"
              placeholder="Enter category description"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 !rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isUploading}
              className={`flex-1 px-4 py-2 bg-[#AE3433] text-white !rounded-lg hover:bg-[#5E0208] transition-colors ${
                isUploading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isUploading ? "Uploading..." : editData ? "Update" : "Add"}{" "}
              Category
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CategoriesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { data: categoriesData, isLoading, error } = useGetAllCategoriesQuery();
  const [addCategory, { isLoading: isAdding }] = useAddCategoryMutation();
  const [updateCategory, { isLoading: isUpdating }] =
    useUpdateCategoryMutation();
  const [editData, setEditData] = useState(null);
  const [deleteCategory, { isLoading: isDeleting }] =
    useDeleteCategoryMutation();

  const categories = categoriesData?.data?.categories;
  const analytics = categoriesData?.data?.analytics;

  const handleAddCategory = async (formData) => {
    setIsModalOpen(false);
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description || "");

      if (formData.image && formData.image instanceof File) {
        data.append("image", formData.image);
      }

      if (editData) {
        await updateCategory({ id: editData.id, formData: data }).unwrap();
        Swal.fire("Success!", "Category updated successfully.", "success");
      } else {
        await addCategory(data).unwrap();
        Swal.fire("Success!", "Category created successfully.", "success");
      }

      setEditData(null);
    } catch (error) {
      Swal.fire(
        "Error!",
        error?.data?.message || "Failed to save category.",
        "error"
      );
    }
  };

  const handleEdit = (category) => {
    setEditData({
      id: category.id,
      name: category.name,
      description: category.description,
      image: category.image?.url || null,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `you want to delete this category??`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete!",
    });

    if (result.isConfirmed) {
      try {
        await deleteCategory(id).unwrap();
        Swal.fire("Deleted!", `Category has been deleted.`, "success");
      } catch (error) {
        Swal.fire(
          "Error!",
          error?.data?.message || "Failed to delete Category.",
          "error"
        );
      }
    }
  };

  const filteredCategories = categories?.filter(
    (cat) =>
      cat?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cat?.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <ProtectedRoute>
        <DashboardLayout userRole="admin">
          <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#AE3433] mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading categories...</p>
            </div>
          </div>
        </DashboardLayout>
      </ProtectedRoute>
    );
  }

  if (error) {
    console.error("Error fetching categories:", error);
  }

  return (
    <ProtectedRoute>
      <DashboardLayout userRole="admin">
        <div className={`min-h-screen bg-gray-50 p-6 ${roboto.className}`}>
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div
              className={`bg-gradient-to-r from-[#5E0208] to-[#AE3433] rounded-lg px-4 sm:px-6 md:px-8 py-4 mb-3 sm:py-5 md:py-6 ${oswald.className}`}
            >
              <h2 className="text-xl sm:text-2xl md:text-2xl font-bold text-white">
                Manage your food categories
              </h2>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow p-6 border-l-4 border-[#5E0208]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-md font-bold text-[#5E0208] mb-1">
                      Total Categories
                    </p>
                    <p className="text-2xl font-bold text-[#5E0208]">
                      {categories?.length}
                    </p>
                  </div>
                  <div className="bg-[#F8F0E8] p-3 rounded-lg">
                    <Package className="w-6 h-6 text-[#5E0208]" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6 border-l-4 border-[#C9983C]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-md font-bold text-[#C9983C] mb-1">
                      Total Items
                    </p>
                    <p className="text-2xl font-bold text-[#C9983C]">
                      {analytics?.totalItems}
                    </p>
                  </div>
                  <div className="bg-[#F8F0E8] p-3 rounded-lg">
                    <Package className="w-6 h-6 text-[#C9983C]" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6 border-l-4 border-[#AE3433]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-md font-bold text-[#AE3433] mb-1">
                      Avg Items per Category
                    </p>
                    <p className="text-2xl font-bold text-[#AE3433]">
                      {analytics?.avgItemsPerCategory}
                    </p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-lg">
                    <Package className="w-6 h-6 text-[#AE3433]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Actions Bar */}
            <div className="bg-white rounded-lg shadow mb-6 p-4 border border-gray-200">
              <div className="flex sm:flex-row gap-4 items-center justify-between">
                <div className="relative w-full sm:w-96">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search categories..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#AE3433] focus:border-transparent"
                  />
                </div>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-[#AE3433] text-white !rounded-lg hover:bg-[#5E0208] transition-colors"
                >
                  {isAdding ? (
                    "Adding..."
                  ) : (
                    <>
                      <Plus className="w-5 h-5" /> Add Category
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Categories Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className={`!text-[#5E0208] ${oswald.className}`}>
                    <tr>
                      <th className="px-6 py-3 text-left text-xl font-medium uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xl !font-bold uppercase tracking-wider">
                        Description
                      </th>
                      <th className="px-6 py-3 text-left text-xl !font-bold uppercase tracking-wider">
                        Icon
                      </th>
                      <th className="px-6 py-3 text-left text-xl !font-bold uppercase tracking-wider">
                        Products
                      </th>
                      <th className="px-6 py-3 text-left text-xl !font-bold uppercase tracking-wider">
                        Created
                      </th>
                      <th className="px-6 py-3 text-right text-xl !font-bold uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredCategories?.length === 0 ? (
                      <tr>
                        <td
                          colSpan={6}
                          className="px-6 py-12 text-center text-gray-500"
                        >
                          No categories found
                        </td>
                      </tr>
                    ) : (
                      filteredCategories?.map((category) => (
                        <tr
                          key={category?.id}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div
                              className={`font-medium text-xl text-[#AE3433] ${lil.className}`}
                            >
                              {category?.name}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-md text-gray-600 max-w-xs truncate">
                              {category?.description || "-"}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            {category?.image?.url ? (
                              <img
                                src={category.image.url}
                                alt={category.name}
                                className="w-10 h-10 object-cover rounded-lg"
                              />
                            ) : (
                              <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                                🍽️
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-md font-medium text-[#C9983C]">
                              {category?.itemCount}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {new Date(category?.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right font-medium">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={() => handleEdit(category)}
                                className="text-[#C9983C] hover:text-[#e3a025] p-2 hover:bg-blue-50 rounded transition-colors"
                              >
                                <Edit className="w-5 h-5" />
                              </button>
                              <button
                                onClick={() => handleDelete(category?.id)}
                                className="text-[#AE3433] hover:text-[#5E0208] p-2 hover:bg-red-50 rounded transition-colors"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <AddCategoryModal
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setEditData(null);
            }}
            onAdd={handleAddCategory}
            editData={editData}
          />
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default CategoriesPage;
