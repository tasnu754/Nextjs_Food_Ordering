"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Package,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  ChevronRight,
} from "lucide-react";
import DashboardLayout from "@/components/dashboard/shared/DashboardLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import {
  useGetUserOrdersQuery,
  useCancelOrderMutation,
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
  pending: {
    label: "Pending",
    color: "bg-yellow-100 text-yellow-800",
    icon: Clock,
  },
  confirmed: {
    label: "Confirmed",
    color: "bg-blue-100 text-blue-800",
    icon: CheckCircle,
  },
  preparing: {
    label: "Preparing",
    color: "bg-purple-100 text-purple-800",
    icon: Package,
  },
  ready_for_delivery: {
    label: "Ready for Delivery",
    color: "bg-indigo-100 text-indigo-800",
    icon: Package,
  },
  out_for_delivery: {
    label: "Out for Delivery",
    color: "bg-orange-100 text-orange-800",
    icon: Package,
  },
  delivered: {
    label: "Delivered",
    color: "bg-green-100 text-green-800",
    icon: CheckCircle,
  },
  cancelled: {
    label: "Cancelled",
    color: "bg-red-100 text-red-800",
    icon: XCircle,
  },
};

const MyOrders = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");

  const { data, isLoading } = useGetUserOrdersQuery({
    status: statusFilter || undefined,
    page: currentPage,
    limit: 10,
  });

  const [cancelOrder] = useCancelOrderMutation();

  const orders = data?.data?.orders || [];
  const pagination = data?.data?.pagination;

  const handleCancelOrder = async (orderId) => {
    if (
      !window.confirm(
        "Are you sure you want to cancel this order? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      await cancelOrder({
        orderId,
        reason: "Cancelled by user from dashboard",
      }).unwrap();
      toast.success("Order cancelled successfully");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to cancel order");
    }
  };

  const handleViewDetails = (orderId) => {
    router.push(`/orders/${orderId}`);
  };

  if (isLoading) {
    return (
      <ProtectedRoute requiredRole="user">
        <DashboardLayout userRole="user">
          <div className="flex items-center justify-center h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
          </div>
        </DashboardLayout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute requiredRole="user">
      <DashboardLayout userRole="user">
        <div className={`p-6 ${roboto.className}`}>
          <div className="flex justify-between items-center mb-6">
            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 border text-[#5E0208] border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 ${lil.className}`}
            >
              <option value="">All Orders</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="preparing">Preparing</option>
              <option value="out_for_delivery">Out for Delivery</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {orders.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <Package className="mx-auto h-16 w-16 text-gray-400 !mb-4" />
              <h2 className="text-2xl font-semibold text-[#5E0208] !mb-2">
                No orders found
              </h2>
              <p className="text-[#5E0208] !mb-6">
                {statusFilter
                  ? `You don't have any ${statusFilter} orders.`
                  : "You haven't placed any orders yet."}
              </p>
              <button
                onClick={() => router.push("/menu")}
                className="bg-[#5E0208] hover:bg-yellow-600 !no-underline text-white px-6 py-3 !rounded-lg transition"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <>
              {/* Orders List */}
              <div className="space-y-4">
                {orders.map((order) => {
                  const StatusIcon = statusConfig[order.orderStatus].icon;

                  return (
                    <div
                      key={order._id}
                      className="bg-white rounded-lg shadow-sm px-4 py-3 hover:shadow-md transition"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3
                            className={`!text-sm md:!text-xl font-bold !text-[#5E0208] ${lil.className}`}
                          >
                            Order #{order.orderNumber}
                          </h3>
                          <p className="text-sm text-[#C9983C]">
                            Placed on{" "}
                            {new Date(order.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <span
                            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${
                              statusConfig[order.orderStatus].color
                            }`}
                          >
                            <StatusIcon size={16} />
                            {statusConfig[order.orderStatus].label}
                          </span>
                        </div>
                      </div>

                      {/* Order Items */}
                      <div className="border-t border-b !border-[#AE3433] py-2 my-2">
                        <div className="space-y-2">
                          {order.items.slice(0, 2).map((item) => (
                            <div
                              key={item._id}
                              className="flex items-center gap-3"
                            >
                              <div className="relative w-20 h-20 flex-shrink-0">
                                <Image
                                  src={item.thumbnail}
                                  alt={item.foodName}
                                  fill
                                  className="object-cover rounded"
                                />
                              </div>
                              <div className="flex-grow">
                                <p
                                  className={`font-bold md:!text-2xl text-[#AE3433] ${oswald.className}`}
                                >
                                  {item.foodName}
                                </p>
                                <p className="!text-sm md:!text-md text-[#C9983C]">
                                  Qty: {item.quantity} x $
                                  {item.price.toFixed(2)}
                                </p>
                              </div>
                              <p className="font-bold md:!text-xl text-[#5E0208]">
                                ${item.subtotal.toFixed(2)}
                              </p>
                            </div>
                          ))}
                          {order.items.length > 2 && (
                            <p className="!text-sm md:!text-md text-gray-500">
                              +{order.items.length - 2} more items
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Order Total and Actions */}
                      <div className="flex !flex-col md:!flex-row justify-between items-center">
                        <div>
                          <p className="md:text-xl font-bold text-[#5E0208]">
                            Total Amount
                          </p>
                          <p className="md:text-2xl font-bold text-[#AE3433]">
                            ${order.total.toFixed(2)}
                          </p>
                        </div>

                        <div className="flex gap-2">
                          {["pending", "confirmed"].includes(
                            order.orderStatus
                          ) && (
                            <button
                              onClick={() => handleCancelOrder(order._id)}
                              className="px-4 py-2 border !border-[#AE3433] text-[#AE3433] !rounded-lg hover:bg-red-50 transition"
                            >
                              Cancel Order
                            </button>
                          )}

                          <button
                            onClick={() => handleViewDetails(order._id)}
                            className="px-4 py-2 bg-[#AE3433] hover:bg-[#5E0208] text-white !rounded-lg flex items-center gap-2 transition"
                          >
                            <Eye size={18} />
                            View Details
                            <ChevronRight size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Pagination */}
              {pagination && pagination.totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-6">
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
            </>
          )}
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default MyOrders;
