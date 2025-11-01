// components/dashboard/admin/RecentActivity.jsx
const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: "order",
      message: "New order #1234 received",
      time: "2 min ago",
      icon: "🛒",
      color: "green",
    },
    {
      id: 2,
      type: "user",
      message: "New user registered",
      time: "15 min ago",
      icon: "👤",
      color: "blue",
    },
    {
      id: 3,
      type: "payment",
      message: "Payment confirmed for #1230",
      time: "30 min ago",
      icon: "💳",
      color: "purple",
    },
    {
      id: 4,
      type: "delivery",
      message: "Order #1228 delivered",
      time: "1 hour ago",
      icon: "✅",
      color: "green",
    },
    {
      id: 5,
      type: "menu",
      message: "Menu item 'Pizza Deluxe' updated",
      time: "2 hours ago",
      icon: "🍕",
      color: "orange",
    },
    {
      id: 6,
      type: "review",
      message: "New 5-star review received",
      time: "3 hours ago",
      icon: "⭐",
      color: "yellow",
    },
  ];

  const colorClasses = {
    green: "bg-green-100 text-green-600",
    blue: "bg-blue-100 text-blue-600",
    purple: "bg-purple-100 text-purple-600",
    orange: "bg-orange-100 text-orange-600",
    yellow: "bg-yellow-100 text-yellow-600",
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 h-full">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
      <div className="space-y-4 overflow-y-auto max-h-96">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                colorClasses[activity.color]
              }`}
            >
              {activity.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">
                {activity.message}
              </p>
              <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
