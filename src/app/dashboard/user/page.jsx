import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardLayout from "@/components/dashboard/shared/DashboardLayout";
import StatCard from "@/components/dashboard/shared/StatCard";
import QuickOrder from "@/components/dashboard/user/QuickOrder";
import RecommendedItems from "@/components/dashboard/user/RecommendedItems";
import OrderHistory from "@/components/dashboard/user/OrderHistory";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { CiStar } from "react-icons/ci";
import { Oswald, Roboto } from "next/font/google";
import Link from "next/link";
import { Lilita_One } from "next/font/google";
import UserName from "@/components/dashboard/shared/UserName";

const lil = Lilita_One({
  subsets: ["latin"],
  weight: "400",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: "500",
});
const oswald = Oswald({
  subsets: ["latin"],
  weight: "600",
});

const UserDashboard = () => {
  const stats = [
    { title: "Total Orders", value: "28", icon: "📦", color: "[#AE3433]" },
    { title: "Favorite Items", value: "12", icon: "❤️", color: "[#5E0208]" },
    { title: "Total Cost", value: "$450", icon: "💰", color: "[#C9983C]" },
    { title: "Cart Items", value: "2", icon: "🛒", color: "[#AE3433]" },
  ];

  return (
    <ProtectedRoute>
      <DashboardLayout userRole="user">
        <div className="space-y-6">
          {/* Welcome Banner */}
          <div
            className={`bg-gradient-to-r from-[#5E0208] to-[#5E0208] rounded-xl shadow-lg p-6 md:p-8 text-white relative overflow-hidden ${oswald.className}`}
          >
            <div className="absolute top-5 right-5 opacity-10 text-9xl">🍔</div>
            <div className="relative z-10">
              <UserName></UserName>
              <p className="text-gray-300 mb-4 !font-medium">
                Hungry? Let's get you something delicious!
              </p>
              <Link href="/menu " className="!no-underline">
                {" "}
                <button
                  className={`bg-white flex items-center  gap-2 text-[#5E0208] !font-semibold px-6 py-3 !rounded-lg hover:!bg-[#daaeb1] transition-colors shadow-md ${roboto.className}`}
                >
                  Order Now{" "}
                  <MdOutlineAddShoppingCart className="!font-bold"></MdOutlineAddShoppingCart>
                </button>
              </Link>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Quick Order Section */}
            <div className="lg:col-span-2">
              <QuickOrder />
              <div className="mt-6">
                <OrderHistory limit={3} />
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <RecommendedItems />

              <div
                className={`bg-gradient-to-br from-[#AE3433] to-[#AE3433] rounded-xl shadow-lg p-6 text-white ${lil.className}`}
              >
                <div className="flex">
                  {" "}
                  <CiStar className="text-5xl mb-2"></CiStar>
                  <CiStar className="text-5xl mb-2"></CiStar>
                  <CiStar className="text-5xl mb-2"></CiStar>
                </div>

                <h3 className="text-xl font-bold mb-2">Special Offer!</h3>
                <p className="text-sm mb-4">
                  Get 20% off on your next order. Use code: FOOD20
                </p>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default UserDashboard;
