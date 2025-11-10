import { useGetUserOrdersQuery } from "@/redux/features/orderApi";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: "500",
});

import Link from "next/link";

const OrderHistory = ({ limit }) => {
  const { data: menuData } = useGetUserOrdersQuery();

  const orders = menuData?.data?.orders || [];

  const formattedOrders = orders.map((order) => {
    const itemsString =
      order.items
        ?.map((item) => item.foodName || item.foodItem?.name || "Unknown Item")
        .join(", ") || "No items";

    const orderDate = order.createdAt
      ? new Date(order.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "N/A";

    const getStatusInfo = (status) => {
      switch (status?.toLowerCase()) {
        case "delivered":
        case "completed":
          return { status: "Delivered", color: "green" };
        case "pending":
          return { status: "Pending", color: "yellow" };
        case "cancelled":
        case "canceled":
          return { status: "Cancelled", color: "red" };
        case "processing":
          return { status: "Processing", color: "blue" };
        default:
          return { status: status || "Pending", color: "yellow" };
      }
    };

    const size = order?.statusHistory?.length;
    const statusInfo = getStatusInfo(order?.statusHistory[size - 1]?.status);

    return {
      _id: order._id || order.orderId || "N/A",
      date: orderDate,
      items: itemsString,
      total: order.totalAmount || order.total || 0,
      status: statusInfo?.status,
      statusColor: statusInfo?.color,
      originalOrder: order,
    };
  });

  const displayOrders = limit
    ? formattedOrders.slice(0, limit)
    : formattedOrders;

  const statusStyles = {
    green: "bg-green-100 text-green-700",
    yellow: "bg-yellow-100 text-yellow-700",
    red: "bg-red-100 text-red-700",
    blue: "bg-blue-100 text-blue-700",
  };

  if (displayOrders.length === 0) {
    return (
      <div className={`bg-white rounded-xl shadow-md p-6 ${roboto.className}`}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold !text-[#5E0208]">Recent Orders</h2>
        </div>
        <div className="text-center py-8 text-gray-500">No orders found</div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-xl shadow-md p-6 ${roboto.className}`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold !text-[#5E0208]">Recent Orders</h2>
        {limit && formattedOrders.length > limit && (
          <Link
            href="/dashboard/user/orders"
            className="text-md !text-[#5E0208] !no-underline font-medium hover:text-orange-700"
          >
            View All →
          </Link>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">
                Order ID
              </th>
              <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">
                Date
              </th>
              <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">
                Items
              </th>
              <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">
                Total
              </th>
              <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">
                Status
              </th>
              <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {displayOrders.map((order) => (
              <tr
                key={order._id}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="py-3 px-2 text-sm font-medium text-gray-900">
                  #{order._id.slice(-6).toUpperCase()}{" "}
                  {/* Show last 6 chars for brevity */}
                </td>
                <td className="py-3 px-2 text-sm text-gray-600">
                  {order.date}
                </td>
                <td
                  className="py-3 px-2 text-sm text-gray-600 max-w-[200px] truncate"
                  title={order.items}
                >
                  {order.items}
                </td>
                <td className="py-3 px-2 text-sm font-semibold text-gray-900">
                  $
                  {typeof order.total === "number"
                    ? order.total.toFixed(2)
                    : "0.00"}
                </td>
                <td className="py-3 px-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      statusStyles[order.statusColor]
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="py-3 px-2">
                  <button className="text-sm text-[#AE3433] hover:text-[#a22424] font-medium">
                    Reorder
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderHistory;
