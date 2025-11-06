"use client";

import { useState } from "react";
import { Oswald, Roboto } from "next/font/google";
import { Pencil, Trash2, Search, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import DashboardLayout from "@/components/dashboard/shared/DashboardLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useGetAllFoodItemsQuery } from "@/redux/features/foodApi";
import { useGetAllCategoriesQuery } from "@/redux/features/categoryApi";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500"],
});

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["600", "700"],
});

// Mock data for demonstration
const mockFoodItems = [
  {
    _id: "1",
    foodName: "Classic Beef Burger",
    thumbnail: "/placeholder-food.jpg",
    shortDescription:
      "Premium beef patty, lettuce, tomato, onions, special sauce",
    price: 12.99,
    category: { name: "Burgers" },
    isAvailable: true,
  },
  {
    _id: "2",
    foodName: "Margherita Pizza",
    thumbnail: "/placeholder-food.jpg",
    shortDescription: "Fresh mozzarella, tomato sauce, basil leaves",
    price: 15.99,
    category: { name: "Pizza" },
    isAvailable: true,
  },
  {
    _id: "3",
    foodName: "Caesar Salad",
    thumbnail: "/placeholder-food.jpg",
    shortDescription: "Romaine lettuce, parmesan, croutons, Caesar dressing",
    price: 8.99,
    category: { name: "Salads" },
    isAvailable: false,
  },
];

const AdminDishesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);

  const isFeatured = false;
  const { data: categories } = useGetAllCategoriesQuery();
  console.log(categories?.data?.categories);
  //   const { data, isLoading, error } = useGetAllFoodItemsQuery({ isFeatured: isFeatured });
  // const [deleteFoodItem] = useDeleteFoodItemMutation();

  const foodItems = mockFoodItems;
  const isLoading = false;

  const filteredItems = foodItems.filter((item) => {
    const matchesSearch = item.foodName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || item.category.name === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDeleteClick = (id) => {
    setDeleteItemId(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    // In real implementation:
    // await deleteFoodItem({ id: deleteItemId }).unwrap();
    console.log("Deleting item:", deleteItemId);
    setShowDeleteModal(false);
    setDeleteItemId(null);
  };

  return (
    <ProtectedRoute>
      <DashboardLayout userRole="admin">
        <div className={`min-h-screen bg-gray-50 ${roboto.className}`}>
          {/* Filters */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Search */}
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

                {/* Category Filter */}
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:border-[#AE3433] focus:outline-none transition"
                >
                  <option value="all">All Categories</option>
                  {categories?.data?.categories?.map((category) => (
                    <option key={category?._id} value={category?._id}>
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
                    <div className="relative h-48 bg-gray-200">
                      <Image
                        src={item?.thumbnail}
                        alt={item?.foodName}
                        width={400}
                        height={300}
                        className="w-full h-full object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <div className="mb-3">
                        <h3
                          className={`text-xl font-bold !text-[#5E0208] mb-2 ${oswald.className}`}
                        >
                          {item?.foodName}
                        </h3>
                        <span className="text-md  !text-[#C9983C]">
                          {item?.category.name}
                        </span>
                      </div>

                      <p className="text-gray-600 text-md mb-4 line-clamp-2">
                        {item?.shortDescription}
                      </p>

                      <div className="flex items-center justify-between mb-4">
                        <span
                          className={`text-2xl font-bold text-[#AE3433] ${oswald.className}`}
                        >
                          ${item?.price.toFixed(2)}
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-3">
                        <Link
                          href={`/admin/dishes/edit/${item?._id}`}
                          className="flex-1 !no-underline"
                        >
                          <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#C9983C]  text-white font-semibold !rounded-lg hover:bg-blue-700 transition">
                            <Pencil size={18} />
                            Edit
                          </button>
                        </Link>
                        <button
                          onClick={() => handleDeleteClick(item?._id)}
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

          {/* Delete Confirmation Modal */}
          {showDeleteModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg max-w-md w-full p-6">
                <h3
                  className={`text-2xl font-bold text-gray-900 mb-4 ${oswald.className}`}
                >
                  Confirm Delete
                </h3>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to delete this dish? This action cannot
                  be undone.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="flex-1 px-4 py-2.5 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmDelete}
                    className="flex-1 px-4 py-2.5 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default AdminDishesPage;
