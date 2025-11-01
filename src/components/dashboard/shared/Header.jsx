import { FaSearch } from "react-icons/fa";
import { Roboto, Lilita_One } from "next/font/google";
import Notification from "./Notification";

const lil = Lilita_One({
  subsets: ["latin"],
  weight: "400",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: "600",
});

const Header = ({ setSidebarOpen, user, userRole }) => {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8 bg-white shadow-md">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden p-2 rounded-md text-gray-600 hover:text-orange-500 hover:bg-orange-50 transition-colors"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Search Bar */}
      <div className="flex-1 max-w-2xl mx-4">
        <div className={`relative ${roboto.className} `}>
          <input
            type="text"
            placeholder="Search orders, menu items..."
            className="w-full px-4 py-2 pl-10 pr-4 text-[#5E0208] text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AE3433] focus:border-transparent"
          />
          <span className="absolute left-1 top-2.5 text-gray-400">
            <FaSearch></FaSearch>
          </span>
        </div>
      </div>

      {/* Right Side Icons */}
      <div className="flex items-center space-x-4">
        <Notification></Notification>
        {/* User Profile */}
        <div className="h-16 w-0.5 bg-[#888C94] "></div>
        <div className={`flex items-center space-x-3 pl-4   ${lil.className}`}>
          <div className="w-10 h-10  rounded-full bg-[#AE3433] flex items-center justify-center text-white font-bold shadow-md">
            {userRole === "admin" ? "A" : "U"}
          </div>
          <div className="hidden  sm:block">
            <p className="text-md mt-4 !font-semibold text-[#AE3433]">
              {user?.name}
            </p>
            <p className="text-xs mb-4 text-[#C9983C]  capitalize">
              {userRole}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
