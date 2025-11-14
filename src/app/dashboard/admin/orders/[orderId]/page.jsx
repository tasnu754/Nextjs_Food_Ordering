"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
  ArrowLeft,
  Package,
  MapPin,
  CreditCard,
  Clock,
  User,
  Mail,
  Phone,
} from "lucide-react";
import {
  useGetOrderByIdQuery,
  useUpdateOrderStatusMutation,
  useUpdatePaymentStatusMutation,
} from "@/redux/features/orderApi";
import { toast } from "react-hot-toast";
import DashboardLayout from "@/components/dashboard/shared/DashboardLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
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

export default function AdminOrderDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.orderId;

  const { data, isLoading } = useGetOrderByIdQuery(orderId);
  const [updateOrderStatus, { isLoading: isUpdatingStatus }] =
    useUpdateOrderStatusMutation();
  const [updatePaymentStatus, { isLoading: isUpdatingPayment }] =
    useUpdatePaymentStatusMutation();

  const order = data?.data;

  const [statusNote, setStatusNote] = useState("");

  const handleStatusUpdate = async (newStatus) => {
    try {
      await updateOrderStatus({
        orderId,
        status: newStatus,
        note: statusNote || undefined,
      }).unwrap();
      toast.success("Order status updated successfully");
      setStatusNote("");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update status");
    }
  };

  const handlePaymentUpdate = async (newPaymentStatus) => {
    try {
      await updatePaymentStatus({
        orderId,
        paymentStatus: newPaymentStatus,
      }).unwrap();
      toast.success("Payment status updated successfully");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update payment status");
    }
  };

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

  if (!order) {
    return (
      <ProtectedRoute requiredRole="admin">
        <DashboardLayout userRole="admin">
          <div className="p-6 text-center">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">
              Order not found
            </h2>
            <button
              onClick={() => router.back()}
              className="text-yellow-600 !no-underline hover:text-yellow-700 font-semibold"
            >
              Go Back
            </button>
          </div>
        </DashboardLayout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute requiredRole="admin">
      <DashboardLayout userRole="admin">
        <div className={`p-6 ${roboto.className}`}>
          {/* Header */}
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-[#C9983C] hover:text-[#AE3433] mb-6"
          >
            <ArrowLeft size={20} />
            Back to Orders
          </button>

          <h1
            className={`text-3xl font-bold !text-[#5E0208] mb-6 ${lil.className}`}
          >
            Order #{order.orderNumber}
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Customer Info */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2
                  className={`text-xl font-bold !text-[#5E0208] mb-4 flex items-center gap-2 ${oswald.className}`}
                >
                  <User size={24} />
                  Customer Information
                </h2>

                <div className="grid grid-cols-1 text-[#AE3433] md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm ">Name</p>
                    <p className="font-semibold ">{order.user?.name}</p>
                  </div>
                  <div>
                    <p className="text-sm ">Email</p>
                    <p className="font-semibold  flex items-center gap-2">
                      <Mail size={16} />
                      {order.user?.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm ">Phone</p>
                    <p className="font-semibold  flex items-center gap-2">
                      <Phone size={16} />
                      {order.shippingAddress.phone}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm ">Order Date</p>
                    <p className="font-semibold ">
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2
                  className={`text-xl font-bold !text-[#5E0208] mb-4 flex items-center gap-2 ${oswald.className}`}
                >
                  <Package size={24} />
                  Order Items
                </h2>

                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div
                      key={item._id}
                      className="flex items-center gap-4 p-2 md:p-4 border border-gray-200 rounded-lg"
                    >
                      <div className="relative w-24 h-20 flex-shrink-0">
                        <Image
                          src={item.thumbnail}
                          alt={item.foodName}
                          fill
                          sizes="(max-width: 640px) 80px, (max-width: 768px) 80px, 80px"
                          className="object-cover rounded"
                        />
                      </div>

                      <div className="flex-grow ">
                        <h3
                          className={`font-bold !text-lg md:!text-2xl !text-[#5E0208] ${lil.className}`}
                        >
                          {item.foodName}
                        </h3>
                        <p className="text-sm text-gray-500 capitalize">
                          Size: {item.variant}
                        </p>
                        <p className="text-sm!text-[#AE3433]">
                          ${item.price.toFixed(2)} x {item.quantity}
                        </p>
                        <p className="font-bold text-lg text-[#AE3433]">
                          ${item.subtotal.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Timeline */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2
                  className={`text-xl font-bold !text-[#5E0208] mb-4 flex items-center gap-2 ${oswald.className}`}
                >
                  <Clock size={24} />
                  Order Timeline
                </h2>

                <div className="!text-[#AE3433] relative">
                  {order.statusHistory.map((history, index) => (
                    <div key={index} className="flex gap-4 pb-6 last:pb-0">
                      <div className="relative flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-white font-bold z-10">
                          {index + 1}
                        </div>
                        {index < order.statusHistory.length - 1 && (
                          <div className="w-0.5 h-full bg-gray-300 absolute top-8"></div>
                        )}
                      </div>

                      <div className="flex-grow pb-4">
                        <p className="font-semibold  capitalize">
                          {history.status.replace(/_/g, " ")}
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Date(history.timestamp).toLocaleString()}
                        </p>
                        {history.note && (
                          <p className="text-sm text-gray-600 mt-1">
                            {history.note}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Order Status Control */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2
                  className={`text-xl font-bold !text-[#5E0208] mb-4 ${oswald.className}`}
                >
                  Update Status
                </h2>

                <div className="text-[#AE3433] space-y-4">
                  <div>
                    <label className="block text-sm font-medium  mb-2">
                      Order Status
                    </label>
                    <select
                      value={order.orderStatus}
                      onChange={(e) => handleStatusUpdate(e.target.value)}
                      disabled={isUpdatingStatus}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="preparing">Preparing</option>
                      <option value="ready_for_delivery">
                        Ready for Delivery
                      </option>
                      <option value="out_for_delivery">Out for Delivery</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium   mb-2">
                      Status Note (Optional)
                    </label>
                    <textarea
                      value={statusNote}
                      onChange={(e) => setStatusNote(e.target.value)}
                      rows={3}
                      placeholder="Add a note about this status update..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium   mb-2">
                      Payment Status
                    </label>
                    <select
                      value={order.paymentStatus}
                      onChange={(e) => handlePaymentUpdate(e.target.value)}
                      disabled={isUpdatingPayment}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    >
                      <option value="pending">Pending</option>
                      <option value="paid">Paid</option>
                      <option value="failed">Failed</option>
                      <option value="refunded">Refunded</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2
                  className={`text-xl font-bold !text-[#5E0208] mb-4 flex items-center gap-2 ${oswald.className}`}
                >
                  <MapPin size={24} />
                  Shipping Address
                </h2>

                <div className="space-y-2 text-[#C9983C]">
                  <p className="font-semibold">
                    {order.shippingAddress.fullName}
                  </p>
                  <p>{order.shippingAddress.phone}</p>
                  <p>{order.shippingAddress.address}</p>
                  <p>
                    {order.shippingAddress.city},{" "}
                    {order.shippingAddress.postalCode}
                  </p>
                  <p>{order.shippingAddress.country}</p>
                </div>
              </div>

              {/* Payment Info */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2
                  className={`text-xl font-bold !text-[#5E0208] mb-4 flex items-center gap-2 ${oswald.className}`}
                >
                  <CreditCard size={24} />
                  Payment
                </h2>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Method:</span>
                    <span className="font-semibold capitalize">
                      {order.paymentMethod.replace(/_/g, " ")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2
                  className={`text-xl font-bold !text-[#5E0208] mb-4 ${oswald.className}`}
                >
                  Order Summary
                </h2>

                <div className="text-[#C9983C] space-y-2">
                  <div className="flex justify-between ">
                    <span>Subtotal</span>
                    <span>${order.subtotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between ">
                    <span>Delivery</span>
                    <span>${order.deliveryFee.toFixed(2)}</span>
                  </div>

                  <div
                    className={`text-[#AE3433] border-t pt-2 mt-2 ${oswald.className}`}
                  >
                    <div className="flex justify-between text-xl font-bold ">
                      <span>Total</span>
                      <span>${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Notes */}
              {order.notes && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-2">
                    Customer Notes
                  </h2>
                  <p className="text-gray-700">{order.notes}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
