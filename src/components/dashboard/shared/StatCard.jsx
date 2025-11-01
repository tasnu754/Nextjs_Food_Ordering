// components/dashboard/shared/StatCard.jsx
const StatCard = ({
  title,
  value,
  icon,
  trend,
  trendValue,
  color = "orange",
}) => {
  const colorClasses = {
    orange: "from-orange-500 to-red-500",
    blue: "from-blue-500 to-indigo-500",
    green: "from-green-500 to-emerald-500",
    purple: "from-purple-500 to-pink-500",
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
            <p className="text-3xl font-bold text-gray-900">{value}</p>
            {trend && (
              <div className="flex items-center mt-2">
                <span
                  className={`text-sm font-semibold ${
                    trend === "up" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {trend === "up" ? "↑" : "↓"} {trendValue}
                </span>
                <span className="text-xs text-gray-500 ml-2">
                  vs last month
                </span>
              </div>
            )}
          </div>
          <div
            className={`w-16 h-16 rounded-full bg-gradient-to-br ${colorClasses[color]} flex items-center justify-center text-3xl shadow-lg`}
          >
            {icon}
          </div>
        </div>
      </div>
      <div className={`h-1 bg-gradient-to-r ${colorClasses[color]}`}></div>
    </div>
  );
};

export default StatCard;
