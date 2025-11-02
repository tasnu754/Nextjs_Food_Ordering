import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: "500",
});

const StatCard = ({ title, value, icon, color }) => {
  const colorClasses = {
    brown: "[#5E0208]",
    orange: "from-blue-500 to-indigo-500",
    green: "from-green-500 to-emerald-500",
    purple: "from-purple-500 to-pink-500",
  };

  return (
    <div
      className={`bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden ${roboto.className}`}
    >
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-bold text-gray-600 mb-1">{title}</p>
            <p className={`text-3xl font-bold text-${color}`}>{value}</p>
          </div>
          <div
            className={`w-16 h-16 rounded-full bg-${color} flex items-center justify-center text-3xl shadow-lg`}
          >
            {icon}
          </div>
        </div>
      </div>
      <div className={`h-1 bg-${color}`}></div>
    </div>
  );
};

export default StatCard;
