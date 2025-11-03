"use client";

import DashboardLayout from "@/components/dashboard/shared/DashboardLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import React, { useState } from "react";
import { Plus, Edit2, Trash2, Package, Search, X } from "lucide-react";
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

const mockCategories = [
  {
    id: 1,
    name: "Burgers",
    description: "Juicy beef and chicken burgers with fresh ingredients",
    productCount: 45,
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    name: "Pizza",
    description: "Italian style pizzas with various toppings",
    productCount: 123,
    createdAt: "2024-01-20",
  },
  {
    id: 3,
    name: "Salad",
    description: "Fresh and healthy salad options",
    productCount: 67,
    createdAt: "2024-02-01",
  },
  {
    id: 4,
    name: "Dessert",
    description: "Sweet treats and delicious desserts",
    productCount: 34,
    isActive: false,
    createdAt: "2024-02-10",
  },
  {
    id: 5,
    name: "Pasta",
    description: "Italian pasta dishes with authentic sauces",
    productCount: 89,
    createdAt: "2024-02-15",
  },
];

const AddCategoryModal = ({ isOpen, onClose, onAdd, editData }) => {
  const [formData, setFormData] = useState(
    editData || {
      name: "",
      description: "",
    }
  );

  React.useEffect(() => {
    if (editData) {
      setFormData(editData);
    } else {
      setFormData({ name: "", description: "" });
    }
  }, [editData, isOpen]);

  const handleSubmit = () => {
    if (!formData.name.trim()) {
      alert("Category name is required");
      return;
    }
    onAdd(formData);
    setFormData({ name: "", description: "" });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className=" text-xl font-semibold !text-[#5E0208]">
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

          <div>
            <label className="block text-sm font-medium text-[#AE3433] mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
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
              className="flex-1 px-4 py-2 bg-[#AE3433] text-white !rounded-lg hover:bg-[#5E0208] transition-colors"
            >
              {editData ? "Update" : "Add"} Category
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CategoriesPage = () => {
  const [categories, setCategories] = useState(mockCategories);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddCategory = (formData) => {
    if (editingCategory) {
      setCategories(
        categories.map((cat) =>
          cat.id === editingCategory.id ? { ...cat, ...formData } : cat
        )
      );
      setEditingCategory(null);
    } else {
      const newCategory = {
        ...formData,
        id: Math.max(...categories.map((c) => c.id)) + 1,
        productCount: 0,
        createdAt: new Date().toISOString().split("T")[0],
      };
      setCategories([...categories, newCategory]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      setCategories(categories.filter((cat) => cat.id !== id));
    }
  };

  const filteredCategories = categories.filter(
    (cat) =>
      cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cat.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                      {categories.length}
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
                      {categories.reduce(
                        (sum, cat) => sum + cat.productCount,
                        0
                      )}
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
                      {categories.filter((c) => c.isActive !== false).length}
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
                  onClick={() => {
                    setEditingCategory(null);
                    setIsModalOpen(true);
                  }}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-[#AE3433] text-white !rounded-lg hover:bg-[#5E0208] transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  Add Category
                </button>
              </div>
            </div>

            {/* Categories Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className={` !text-[#5E0208]  ${oswald.className}`}>
                    <tr>
                      <th className="px-6 py-3 text-left text-xl font-medium  uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xl  !font-bold uppercase tracking-wider">
                        Description
                      </th>
                      <th className="px-6 py-3 text-left text-xl  !font-bold uppercase tracking-wider">
                        Products
                      </th>

                      <th className="px-6 py-3 text-left text-xl  !font-bold uppercase tracking-wider">
                        Created
                      </th>
                      <th className="px-6 py-3 text-right text-xl  !font-bold uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredCategories.length === 0 ? (
                      <tr>
                        <td
                          colSpan={6}
                          className="px-6 py-12 text-center text-gray-500"
                        >
                          No categories found
                        </td>
                      </tr>
                    ) : (
                      filteredCategories.map((category) => (
                        <tr
                          key={category.id}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div
                              className={`font-medium text-xl text-[#AE3433] ${lil.className}`}
                            >
                              {category.name}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-md text-gray-600 max-w-xs truncate">
                              {category.description || "-"}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-md font-medium text-[#C9983C]">
                              {category.productCount}
                            </span>
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {new Date(category.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right font-medium">
                            <div className="flex items-center  justify-center gap-2">
                              <button
                                onClick={() => handleDelete(category.id)}
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
              setEditingCategory(null);
            }}
            onAdd={handleAddCategory}
            editData={editingCategory}
          />
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default CategoriesPage;
