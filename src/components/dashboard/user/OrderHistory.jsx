// components/dashboard/user/OrderHistory.jsx
import Link from "next/link";

const OrderHistory = ({ limit }) => {
  const orders = [
    {
      id: "#1234",
      date: "Oct 30, 2025",
      items: "Pizza, Burger",
      total: 25.99,
      status: "Delivered",
      statusColor: "green",
    },
    {
      id: "#1233",
      date: "Oct 28, 2025",
      items: "Pasta, Salad",
      total: 18.99,
      status: "Delivered",
      statusColor: "green",
    },
    {
      id: "#1232",
      date: "Oct 25, 2025",
      items: "Tacos, Wings",
      total: 22.5,
      status: "Delivered",
      statusColor: "green",
    },
    {
      id: "#1231",
      date: "Oct 22, 2025",
      items: "Pizza, Wings, Salad",
      total: 31.99,
      status: "Cancelled",
      statusColor: "red",
    },
    {
      id: "#1230",
      date: "Oct 20, 2025",
      items: "Burger, Fries",
      total: 15.99,
      status: "Delivered",
      statusColor: "green",
    },
  ];

  const displayOrders = limit ? orders.slice(0, limit) : orders;

  const statusStyles = {
    green: "bg-green-100 text-green-700",
    yellow: "bg-yellow-100 text-yellow-700",
    red: "bg-red-100 text-red-700",
    blue: "bg-blue-100 text-blue-700",
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
        {limit && (
          <Link
            href="/dashboard/user/orders"
            className="text-sm text-orange-600 font-medium hover:text-orange-700"
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
                key={order.id}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="py-3 px-2 text-sm font-medium text-gray-900">
                  {order.id}
                </td>
                <td className="py-3 px-2 text-sm text-gray-600">
                  {order.date}
                </td>
                <td className="py-3 px-2 text-sm text-gray-600">
                  {order.items}
                </td>
                <td className="py-3 px-2 text-sm font-semibold text-gray-900">
                  ${order.total}
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
                  <button className="text-sm text-orange-600 hover:text-orange-700 font-medium">
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
