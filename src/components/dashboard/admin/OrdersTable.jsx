// components/dashboard/admin/OrdersTable.jsx
"use client";
import { useState } from "react";

const OrdersTable = () => {
  const [filter, setFilter] = useState("all");

  const orders = [
    {
      id: "#1234",
      customer: "John Doe",
      items: "2 items",
      total: 25.99,
      status: "Pending",
      time: "10 min ago",
    },
    {
      id: "#1233",
      customer: "Jane Smith",
      items: "4 items",
      total: 45.5,
      status: "Preparing",
      time: "25 min ago",
    },
    {
      id: "#1232",
      customer: "Bob Johnson",
      items: "1 item",
      total: 12.99,
      status: "Ready",
      time: "35 min ago",
    },
    {
      id: "#1231",
      customer: "Alice Brown",
      items: "3 items",
      total: 32.0,
      status: "Delivered",
      time: "1 hour ago",
    },
    {
      id: "#1230",
      customer: "Mike Wilson",
      items: "5 items",
      total: 55.99,
      status: "Delivered",
      time: "2 hours ago",
    },
  ];

  const statusStyles = {
    Pending: "bg-yellow-100 text-yellow-700",
    Preparing: "bg-blue-100 text-blue-700",
    Ready: "bg-purple-100 text-purple-700",
    Delivered: "bg-green-100 text-green-700",
    Cancelled: "bg-red-100 text-red-700",
  };

  const filteredOrders =
    filter === "all"
      ? orders
      : orders.filter((o) => o.status.toLowerCase() === filter);

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
        <h2 className="text-xl font-bold text-gray-900">All Orders</h2>

        <div className="flex flex-wrap gap-2">
          {["all", "pending", "preparing", "ready", "delivered"].map(
            (status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                  filter === status
                    ? "bg-orange-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {status}
              </button>
            )
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                Order ID
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                Customer
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                Items
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                Total
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                Status
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                Time
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr
                key={order.id}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="py-4 px-4 text-sm font-medium text-gray-900">
                  {order.id}
                </td>
                <td className="py-4 px-4 text-sm text-gray-700">
                  {order.customer}
                </td>
                <td className="py-4 px-4 text-sm text-gray-600">
                  {order.items}
                </td>
                <td className="py-4 px-4 text-sm font-semibold text-gray-900">
                  ${order.total}
                </td>
                <td className="py-4 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      statusStyles[order.status]
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="py-4 px-4 text-sm text-gray-600">
                  {order.time}
                </td>
                <td className="py-4 px-4">
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      View
                    </button>
                    <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                      Update
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📦</div>
          <p className="text-gray-600">No orders found for this filter.</p>
        </div>
      )}
    </div>
  );
};

export default OrdersTable;
