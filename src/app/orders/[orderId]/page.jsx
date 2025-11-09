"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
  ArrowLeft,
  Package,
  MapPin,
  CreditCard,
  Clock,
  CheckCircle,
} from "lucide-react";
import { useGetOrderByIdQuery } from "@/redux/features/orderApi";
import ProtectedRoute from "@/components/ProtectedRoute";
import Navbar from "@/components/Home Page/Navbar";
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
    icon: CheckCircle,
  },
};

export default function OrderDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.orderId;

  const { data, isLoading } = useGetOrderByIdQuery(orderId);
  const order = data?.data;

  if (isLoading) {
    return (
      <ProtectedRoute>
        <Navbar />
        <div className="min-h-screen pt-20 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
        </div>
      </ProtectedRoute>
    );
  }

  if (!order) {
    return (
      <ProtectedRoute>
        <Navbar />
        <div
          className={`min-h-screen pt-20 flex items-center justify-center ${roboto.className}`}
        >
          <div className="text-center">
            <h2
              className={`text-2xl font-bold text-gray-700 !mb-2 ${lil.className}`}
            >
              Order not found
            </h2>
            <button
              onClick={() => router.back()}
              className="bg-[#5E0208] text-white !no-underline !rounded-lg hover:text-yellow-700 font-semibold"
            >
              Go Back
            </button>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  const StatusIcon = statusConfig[order.orderStatus].icon;

  return (
    <ProtectedRoute>
      <Navbar />
      <div className={`min-h-screen pt-20 bg-gray-50 ${roboto.className}`}>
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-[#C9983C] hover:text-[#AE3433] mb-6"
          >
            <ArrowLeft size={20} />
            Back
          </button>

          <div className="flex justify-between items-start mb-8">
            <div>
              <h1
                className={`!text-xl md:!text-3xl font-bold !text-[#5E0208] mb-2 ${lil.className}`}
              >
                Order #{order.orderNumber}
              </h1>
              <p className="text-[#C9983C]">
                Placed on{" "}
                {new Date(order.createdAt).toLocaleString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>

            <span
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${
                statusConfig[order.orderStatus].color
              }`}
            >
              <StatusIcon size={18} />
              {statusConfig[order.orderStatus].label}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
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
                      className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg"
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
                        <h3
                          className={`!text-md font-bold !text-[#AE3433] ${lil.className}`}
                        >
                          {item.foodName}
                        </h3>
                        <p className="text-sm text-gray-500 capitalize">
                          Size: {item.variant}
                        </p>
                        <p className="text-sm text-gray-600">
                          ${item.price.toFixed(2)} x {item.quantity}
                        </p>
                      </div>

                      <div className="text-right">
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

                <div className="relative">
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
                        <p className="font-semibold !text-[#C9983C] capitalize">
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
              {/* Shipping Address */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2
                  className={`text-xl font-bold !text-[#5E0208] mb-4 flex items-center gap-2 ${oswald.className}`}
                >
                  <MapPin size={24} />
                  Shipping Address
                </h2>

                <div className="space-y-2 text-[#C9983C]">
                  <p className="font-semibold text-[#AE3433]">
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
              <div className="bg-white text-[#AE3433] rounded-lg shadow-sm p-6">
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
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span
                      className={`font-semibold capitalize ${
                        order.paymentStatus === "paid"
                          ? "text-green-600"
                          : order.paymentStatus === "failed"
                          ? "text-red-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {order.paymentStatus}
                    </span>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-white  rounded-lg shadow-sm p-6">
                <h2
                  className={`text-xl font-bold !text-[#5E0208] mb-4 ${oswald.className}`}
                >
                  Order Summary
                </h2>

                <div className="space-y-2 text-yellow-600">
                  <div className="flex justify-between ">
                    <span>Subtotal ({order.totalItems} items)</span>
                    <span>${order.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between ">
                    <span>Tax</span>
                    <span>${order.tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between ">
                    <span>Delivery Fee</span>
                    <span>
                      {order.deliveryFee === 0 ? (
                        <span className="text-green-600 font-semibold">
                          FREE
                        </span>
                      ) : (
                        `$${order.deliveryFee.toFixed(2)}`
                      )}
                    </span>
                  </div>

                  <div className="border-t pt-2 !text-[#AE3433] mt-2">
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
                  <h2
                    className={`text-xl font-bold !text-[#5E0208] mb-2 ${oswald.className}`}
                  >
                    Order Notes
                  </h2>
                  <p className="text-gray-700">{order.notes}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
