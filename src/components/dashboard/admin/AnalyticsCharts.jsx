// components/dashboard/admin/AnalyticsCharts.jsx
"use client";
import { useState } from "react";

const AnalyticsCharts = () => {
  const [activeTab, setActiveTab] = useState("revenue");

  const revenueData = [
    { day: "Mon", value: 45 },
    { day: "Tue", value: 52 },
    { day: "Wed", value: 48 },
    { day: "Thu", value: 65 },
    { day: "Fri", value: 78 },
    { day: "Sat", value: 85 },
    { day: "Sun", value: 72 },
  ];

  const ordersData = [
    { day: "Mon", value: 32 },
    { day: "Tue", value: 45 },
    { day: "Wed", value: 38 },
    { day: "Thu", value: 55 },
    { day: "Fri", value: 68 },
    { day: "Sat", value: 75 },
    { day: "Sun", value: 62 },
  ];

  const data = activeTab === "revenue" ? revenueData : ordersData;
  const maxValue = Math.max(...data.map((d) => d.value));

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Analytics Overview</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab("revenue")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "revenue"
                ? "bg-orange-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Revenue
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "orders"
                ? "bg-orange-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Orders
          </button>
        </div>
      </div>

      {/* Simple Bar Chart */}
      <div className="relative">
        <div className="flex items-end justify-between space-x-2 h-64">
          {data.map((item, index) => {
            const height = (item.value / maxValue) * 100;
            return (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="relative w-full group">
                  {/* Tooltip */}
                  <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {activeTab === "revenue"
                      ? `$${item.value}k`
                      : `${item.value} orders`}
                  </div>

                  {/* Bar */}
                  <div
                    className="w-full bg-gradient-to-t from-orange-500 to-red-500 rounded-t-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300 cursor-pointer"
                    style={{ height: `${height}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-600 mt-2 font-medium">
                  {item.day}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t">
        <div className="text-center">
          <p className="text-sm text-gray-600">Total</p>
          <p className="text-xl font-bold text-gray-900">
            {activeTab === "revenue"
              ? `$${data.reduce((sum, item) => sum + item.value, 0)}k`
              : `${data.reduce((sum, item) => sum + item.value, 0)}`}
          </p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600">Average</p>
          <p className="text-xl font-bold text-gray-900">
            {activeTab === "revenue"
              ? `$${(
                  data.reduce((sum, item) => sum + item.value, 0) / data.length
                ).toFixed(1)}k`
              : Math.round(
                  data.reduce((sum, item) => sum + item.value, 0) / data.length
                )}
          </p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600">Peak Day</p>
          <p className="text-xl font-bold text-gray-900">
            {
              data.reduce(
                (max, item) => (item.value > max.value ? item : max),
                data[0]
              ).day
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCharts;
