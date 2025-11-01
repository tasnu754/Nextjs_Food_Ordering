// components/dashboard/admin/MenuManager.jsx
"use client";
import { useState } from "react";

const MenuManager = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const menuItems = [
    {
      id: 1,
      name: "Margherita Pizza",
      category: "Pizza",
      price: 12.99,
      emoji: "🍕",
      stock: "In Stock",
      sales: 145,
    },
    {
      id: 2,
      name: "Pepperoni Pizza",
      category: "Pizza",
      price: 14.99,
      emoji: "🍕",
      stock: "In Stock",
      sales: 230,
    },
    {
      id: 3,
      name: "Cheese Burger",
      category: "Burger",
      price: 8.99,
      emoji: "🍔",
      stock: "In Stock",
      sales: 189,
    },
    {
      id: 4,
      name: "Caesar Salad",
      category: "Salad",
      price: 7.99,
      emoji: "🥗",
      stock: "Low Stock",
      sales: 67,
    },
    {
      id: 5,
      name: "Spaghetti",
      category: "Pasta",
      price: 11.99,
      emoji: "🍝",
      stock: "In Stock",
      sales: 123,
    },
    {
      id: 6,
      name: "Chicken Wings",
      category: "Appetizer",
      price: 10.99,
      emoji: "🍗",
      stock: "Out of Stock",
      sales: 201,
    },
  ];

  const categories = ["all", "Pizza", "Burger", "Salad", "Pasta", "Appetizer"];

  const filteredItems =
    selectedCategory === "all"
      ? menuItems
      : menuItems.filter((item) => item.category === selectedCategory);

  const stockStyles = {
    "In Stock": "bg-green-100 text-green-700",
    "Low Stock": "bg-yellow-100 text-yellow-700",
    "Out of Stock": "bg-red-100 text-red-700",
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
        <h2 className="text-xl font-bold text-gray-900">Menu Management</h2>
        <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all shadow-md">
          + Add New Item
        </button>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
              selectedCategory === category
                ? "bg-orange-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="border-2 border-gray-200 rounded-xl p-4 hover:border-orange-500 hover:shadow-lg transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="text-4xl">{item.emoji}</div>
              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  stockStyles[item.stock]
                }`}
              >
                {item.stock}
              </span>
            </div>

            <h3 className="font-bold text-gray-900 mb-1">{item.name}</h3>
            <p className="text-sm text-gray-600 mb-2">{item.category}</p>

            <div className="flex items-center justify-between mb-3">
              <span className="text-xl font-bold text-orange-600">
                ${item.price}
              </span>
              <span className="text-sm text-gray-600">
                📊 {item.sales} sales
              </span>
            </div>

            <div className="flex space-x-2">
              <button className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-600 py-2 rounded-lg text-sm font-medium transition-colors">
                Edit
              </button>
              <button className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 py-2 rounded-lg text-sm font-medium transition-colors">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🍽️</div>
          <p className="text-gray-600">No menu items found in this category.</p>
        </div>
      )}
    </div>
  );
};

export default MenuManager;
