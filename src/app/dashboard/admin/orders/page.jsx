"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Package, Eye, Search } from "lucide-react";
import DashboardLayout from "@/components/dashboard/shared/DashboardLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import {
  useGetAllOrdersQuery,
  useGetOrderStatisticsQuery,
  useUpdateOrderStatusMutation,
} from "@/redux/features/orderApi";
import { toast } from "react-hot-toast";
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

const statusConfig = {
  pending: { label: "Pending", color: "bg-yellow-100 text-yellow-800" },
  confirmed: { label: "Confirmed", color: "bg-blue-100 text-blue-800" },
  preparing: { label: "Preparing", color: "bg-purple-100 text-purple-800" },
  ready_for_delivery: {
    label: "Ready",
    color: "bg-indigo-100 text-indigo-800",
  },
  out_for_delivery: {
    label: "Out for Delivery",
    color: "bg-orange-100 text-orange-800",
  },
  delivered: { label: "Delivered", color: "bg-green-100 text-green-800" },
  cancelled: { label: "Cancelled", color: "bg-red-100 text-red-800" },
};

const AdminOrdersPage = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading } = useGetAllOrdersQuery({
    status: statusFilter || undefined,
    paymentStatus: paymentFilter || undefined,
    page: currentPage,
    limit: 20,
  });

  const { data: statsData } = useGetOrderStatisticsQuery("all");
  const [updateOrderStatus] = useUpdateOrderStatusMutation();

  const orders = data?.data?.orders || [];
  const pagination = data?.data?.pagination;
  const stats = statsData?.data?.total;

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus({
        orderId,
        status: newStatus,
        note: `Status updated to ${newStatus} by admin`,
      }).unwrap();
      toast.success("Order status updated successfully");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update status");
    }
  };

  const handleViewDetails = (orderId) => {
    router.push(`/dashboard/admin/orders/${orderId}`);
  };

  // Filter orders by search query
  const filteredOrders = orders.filter(
    (order) =>
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.user?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.user?.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <ProtectedRoute requiredRole="admin">
        <DashboardLayout userRole="admin">
          <div className="flex items-center justify-center h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
          </div>
        </DashboardLayout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute requiredRole="admin">
      <DashboardLayout userRole="admin">
        <div className={`p-6 ${roboto.className}`}>
          <h1
            className={`text-3xl font-bold !text-[#5E0208] mb-6 ${oswald.className}`}
          >
            Order Management
          </h1>

          {/* Filters and Search */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
              {/* Search */}
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by order id, name, email..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 border text-[#AE3433] border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 ${lil.className}`}
              >
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="preparing">Preparing</option>
                <option value="ready_for_delivery">Ready for Delivery</option>
                <option value="out_for_delivery">Out for Delivery</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          {/* Orders Table */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className={`bg-gray-50 border-b ${lil.className}`}>
                  <tr>
                    <th className="px-6 py-3 text-left text-md font-medium text-[#AE3433] uppercase tracking-wider">
                      Order
                    </th>
                    <th className="px-6 py-3 text-left text-md font-medium text-[#AE3433] uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-md font-medium text-[#AE3433] uppercase tracking-wider">
                      Items
                    </th>
                    <th className="px-6 py-3 text-left text-md font-medium text-[#AE3433] uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-3 text-left text-md font-medium text-[#AE3433] uppercase tracking-wider">
                      Payment
                    </th>
                    <th className="px-6 py-3 text-left text-md font-medium text-[#AE3433] uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-md font-medium text-[#AE3433] uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-12 text-center">
                        <Package className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                        <p className="text-gray-500">No orders found</p>
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map((order) => (
                      <tr key={order._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-semibold text-[#C9983C]">
                              #{order.orderNumber}
                            </p>
                            <p className="text-sm text-gray-500">
                              {new Date(order.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <p
                              className={`font-medium text-xl text-[#5E0208] ${lil.className}`}
                            >
                              {order.user?.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              {order.user?.email}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex -space-x-2">
                            {order.items.slice(0, 3).map((item, idx) => (
                              <div
                                key={idx}
                                className="relative w-8 h-8 rounded-full border-2 border-white"
                              >
                                <Image
                                  src={item.thumbnail}
                                  alt={item.foodName}
                                  fill
                                  sizes="(min-resolution: 2dppx) 16px, 32px"
                                  className="object-cover rounded-full"
                                />
                              </div>
                            ))}
                            {order.items.length > 3 && (
                              <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center">
                                <span className="text-xs font-semibold">
                                  +{order.items.length - 3}
                                </span>
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="font-bold text-[#AE3433]">
                            ${order.total.toFixed(2)}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-block !px-3 py-2 rounded-full text-sm font-semibold ${
                              order.paymentStatus === "paid"
                                ? "bg-green-100 text-green-800"
                                : order.paymentStatus === "failed"
                                ? "bg-red-100 text-red-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {order.paymentStatus}
                          </span>
                        </td>
                        <td className="px-0 py-4">
                          <select
                            value={order.orderStatus}
                            onChange={(e) =>
                              handleStatusChange(order._id, e.target.value)
                            }
                            className={`px-3 py-1 rounded-full text-xs font-semibold border-0 cursor-pointer ${
                              statusConfig[order.orderStatus].color
                            }`}
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="preparing">Preparing</option>
                            <option value="ready_for_delivery">
                              Ready for Delivery
                            </option>
                            <option value="out_for_delivery">
                              Out for Delivery
                            </option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleViewDetails(order._id)}
                            className="text-yellow-600 hover:text-yellow-700 font-semibold flex items-center gap-1"
                          >
                            <Eye size={16} />
                            View
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 p-4 border-t">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Previous
                </button>

                <span className="px-4 py-2 text-gray-700">
                  Page {pagination.currentPage} of {pagination.totalPages}
                </span>

                <button
                  onClick={() =>
                    setCurrentPage((p) =>
                      Math.min(pagination.totalPages, p + 1)
                    )
                  }
                  disabled={currentPage === pagination.totalPages}
                  className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default AdminOrdersPage;
