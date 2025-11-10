"use client";

import { useState } from "react";
import { Roboto, Lilita_One } from "next/font/google";

import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingBag,
} from "lucide-react";

const roboto = Roboto({
  subsets: ["latin"],
  weight: "400",
});

const lil = Lilita_One({
  subsets: ["latin"],
  weight: "400",
});

const AnalyticsCharts = ({ chartsData }) => {
  const [activeTab, setActiveTab] = useState("revenue");

  // Use real data from API or fallback to empty arrays
  const revenueData = chartsData?.revenue || [];
  const ordersData = chartsData?.orders || [];

  const data = activeTab === "revenue" ? revenueData : ordersData;
  const maxValue = Math.max(...data.map((d) => d.value), 1);

  // Calculate statistics
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const average = data.length > 0 ? total / data.length : 0;
  const peakDay =
    data.length > 0
      ? data.reduce(
          (max, item) => (item.value > max.value ? item : max),
          data[0]
        )
      : { day: "N/A", value: 0 };

  // Calculate trend (compare last day vs average)
  const lastValue = data.length > 0 ? data[data.length - 1].value : 0;
  const trend = lastValue > average ? "up" : "down";
  const trendPercent =
    average > 0
      ? Math.abs(((lastValue - average) / average) * 100).toFixed(1)
      : 0;

  return (
    <div className={`bg-white rounded-xl shadow-md p-6 ${roboto.className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div
            className={`p-2 rounded-lg ${
              activeTab === "revenue" ? "bg-green-100" : "bg-blue-100"
            }`}
          >
            {activeTab === "revenue" ? (
              <DollarSign className="text-green-600" size={24} />
            ) : (
              <ShoppingBag className="text-blue-600" size={24} />
            )}
          </div>
          <div>
            <h2
              className={`text-xl font-bold !text-[#5E0208] ${lil.className}`}
            >
              {activeTab === "revenue" ? "Revenue" : "Orders"} Analytics
            </h2>
            <p className="text-sm text-gray-500">Last 7 days performance</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab("revenue")}
            className={`px-4 py-2 text-sm font-bold !rounded-lg transition-all ${
              activeTab === "revenue"
                ? "bg-[#AE3433] text-white shadow-md"
                : "bg-gray-100 text-[#5E0208] hover:bg-gray-200"
            }`}
          >
            💰 Revenue
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`px-4 py-2 text-sm rounded-lg font-bold transition-all ${
              activeTab === "orders"
                ? "bg-[#AE3433] text-white shadow-md"
                : "bg-gray-100 text-[#5E0208] hover:bg-gray-200"
            }`}
          >
            📦 Orders
          </button>
        </div>
      </div>

      {/* Chart */}
      {data.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-gray-400">
          <ShoppingBag size={48} className="mb-3" />
          <p className="text-lg font-semibold">No data available</p>
          <p className="text-sm">Data will appear once you have orders</p>
        </div>
      ) : (
        <div className="relative bg-gradient-to-b from-gray-50 to-white rounded-lg p-4 mb-6">
          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 bottom-12 flex flex-col justify-between text-xs text-gray-500 font-semibold pr-2">
            <span>${Math.round(maxValue).toLocaleString()}</span>
            <span>${Math.round(maxValue * 0.75).toLocaleString()}</span>
            <span>${Math.round(maxValue * 0.5).toLocaleString()}</span>
            <span>${Math.round(maxValue * 0.25).toLocaleString()}</span>
            <span>$0</span>
          </div>

          {/* Chart area */}
          <div className="ml-12">
            <div className="flex items-end justify-between space-x-3 h-64 border-b-2 border-gray-300">
              {data.map((item, index) => {
                const height = maxValue > 0 ? (item.value / maxValue) * 100 : 0;
                const isHighest = item.value === peakDay.value;

                return (
                  <div
                    key={index}
                    className="flex-1 flex flex-col items-center relative group"
                  >
                    {/* Value label on hover */}
                    <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 shadow-lg">
                      <div className="font-bold">
                        {activeTab === "revenue"
                          ? `$${item.value.toLocaleString()}`
                          : `${item.value} orders`}
                      </div>
                      <div className="text-gray-300 text-xs">{item.day}</div>
                      {/* Arrow */}
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
                    </div>

                    {/* Bar container */}
                    <div className="relative w-full h-full flex items-end">
                      {/* Bar */}
                      <div
                        className={`w-full rounded-t-lg transition-all duration-500 cursor-pointer relative overflow-hidden ${
                          isHighest
                            ? "bg-gradient-to-t from-[#5E0208] to-[#AE3433] shadow-lg"
                            : "bg-gradient-to-t from-[#AE3433] to-[#C9983C]"
                        } hover:shadow-xl transform hover:scale-105`}
                        style={{
                          height: height > 0 ? `${height}%` : "3px",
                          minHeight: item.value > 0 ? "10px" : "3px",
                        }}
                      >
                        {/* Shine effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"></div>

                        {/* Value on top of bar for highest */}
                        {isHighest && height > 20 && (
                          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-white text-xs font-bold">
                            ⭐
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Day label */}
                    <div
                      className={`text-sm mt-3 font-bold transition-colors ${
                        isHighest ? "text-[#AE3433]" : "text-gray-600"
                      }`}
                    >
                      {item.day}
                    </div>

                    {/* Value below */}
                    <div className="text-xs text-gray-500 mt-1 font-semibold">
                      {activeTab === "revenue"
                        ? `$${item.value.toLocaleString()}`
                        : item.value}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Total */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold text-blue-700">Total</p>
            <div className="p-1.5 bg-blue-200 rounded">
              <ShoppingBag size={16} className="text-blue-700" />
            </div>
          </div>
          <p className="text-2xl font-bold text-blue-900">
            {activeTab === "revenue"
              ? `$${total.toLocaleString()}`
              : total.toLocaleString()}
          </p>
          <p className="text-xs text-blue-600 mt-1">Last 7 days</p>
        </div>

        {/* Average */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold text-purple-700">
              Daily Average
            </p>
            <div className="p-1.5 bg-purple-200 rounded">
              <DollarSign size={16} className="text-purple-700" />
            </div>
          </div>
          <p className="text-2xl font-bold text-purple-900">
            {activeTab === "revenue"
              ? `$${Math.round(average).toLocaleString()}`
              : Math.round(average).toLocaleString()}
          </p>
          <p className="text-xs text-purple-600 mt-1">Per day</p>
        </div>

        {/* Peak Day */}
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4 border border-orange-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold text-orange-700">Peak Day</p>
            <div className="p-1.5 bg-orange-200 rounded">⭐</div>
          </div>
          <p className="text-2xl font-bold text-orange-900">{peakDay.day}</p>
          <p className="text-xs text-orange-600 mt-1">
            {activeTab === "revenue"
              ? `$${peakDay.value.toLocaleString()}`
              : `${peakDay.value} orders`}
          </p>
        </div>

        {/* Trend */}
        <div
          className={`bg-gradient-to-br rounded-lg p-4 border ${
            trend === "up"
              ? "from-green-50 to-green-100 border-green-200"
              : "from-red-50 to-red-100 border-red-200"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <p
              className={`text-sm font-semibold ${
                trend === "up" ? "text-green-700" : "text-red-700"
              }`}
            >
              Trend
            </p>
            <div
              className={`p-1.5 rounded ${
                trend === "up" ? "bg-green-200" : "bg-red-200"
              }`}
            >
              {trend === "up" ? (
                <TrendingUp size={16} className="text-green-700" />
              ) : (
                <TrendingDown size={16} className="text-red-700" />
              )}
            </div>
          </div>
          <p
            className={`text-2xl font-bold ${
              trend === "up" ? "text-green-900" : "text-red-900"
            }`}
          >
            {trend === "up" ? "+" : "-"}
            {trendPercent}%
          </p>
          <p
            className={`text-xs mt-1 ${
              trend === "up" ? "text-green-600" : "text-red-600"
            }`}
          >
            vs average
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCharts;
