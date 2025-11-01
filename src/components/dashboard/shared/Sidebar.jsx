// components/dashboard/shared/Sidebar.jsx
"use client";
import Image from "next/image";
import Link from "next/link";
import { CgProfile } from "react-icons/cg";
import { usePathname } from "next/navigation";
import { Lilita_One, Oswald } from "next/font/google";

const lil = Lilita_One({
  subsets: ["latin"],
  weight: "400",
});

const oswald = Oswald({
  subsets: ["latin"],
  weight: "600",
});

const Sidebar = ({ isOpen, setIsOpen, userRole }) => {
  const pathname = usePathname();

  const adminLinks = [
    { name: "Dashboard", href: "/dashboard/admin", icon: "📊" },
    { name: "Orders", href: "/dashboard/admin/orders", icon: "🛒" },
    { name: "Menu Management", href: "/dashboard/admin/menu", icon: "🍕" },
    { name: "Users", href: "/dashboard/admin/users", icon: "👥" },
    { name: "Analytics", href: "/dashboard/admin/analytics", icon: "📈" },
  ];

  const userLinks = [
    { name: "Dashboard", href: "/dashboard/user", icon: "🏠" },
    { name: "My Orders", href: "/dashboard/user/orders", icon: "📦" },
    { name: "Favorites", href: "/dashboard/user/favorites", icon: "❤️" },
    { name: "Profile", href: "/dashboard/user/profile", icon: "👤" },
  ];

  const links = userRole === "admin" ? adminLinks : userLinks;

  return (
    <>
      {/* Desktop Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between  h-16 px-6 bg-gradient-to-r from-[#AE3433] to-[#5E0208]">
            <div className="flex items-center px-5">
              <div className="relative w-20 h-20">
                {" "}
                <Image
                  src="/logo.png"
                  alt="TestoBurger Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden text-white hover:text-gray-200"
            >
              ✕
            </button>
          </div>

          {/* Role Badge */}
          <div className="px-6 py-4  bg-gradient-to-r from-orange-100 to-red-100">
            <div
              className={`inline-flex items-center  px-3 py-1 rounded-full text-md font-semibold bg-white text-[#5E0208] shadow-sm ${oswald.className}`}
            >
              <CgProfile className="mr-2"></CgProfile>
              {userRole === "admin" ? " Admin Panel" : " User Panel"}
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md transform scale-105"
                      : "text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <span className="text-xl mr-3">{link.icon}</span>
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t">
            <button className="w-full flex items-center justify-center px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors">
              <span className="mr-2">🚪</span>
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
