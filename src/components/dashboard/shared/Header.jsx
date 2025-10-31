// components/dashboard/shared/Header.jsx
"use client";
import { useState } from "react";

const Header = ({ setSidebarOpen, userRole }) => {
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, text: "New order received", time: "2 min ago", unread: true },
    { id: 2, text: "Payment confirmed", time: "1 hour ago", unread: true },
    { id: 3, text: "Order delivered", time: "3 hours ago", unread: false },
  ];

  const unreadCount = notifications.filter((n) => n.unread).length;

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
        <div className="relative">
          <input
            type="text"
            placeholder="Search orders, menu items..."
            className="w-full px-4 py-2 pl-10 pr-4 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
          <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
        </div>
      </div>

      {/* Right Side Icons */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-gray-600 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-colors"
          >
            <span className="text-xl">🔔</span>
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
              <div className="px-4 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold">
                Notifications
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`px-4 py-3 border-b hover:bg-gray-50 cursor-pointer ${
                      notif.unread ? "bg-orange-50" : ""
                    }`}
                  >
                    <p className="text-sm text-gray-800">{notif.text}</p>
                    <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                  </div>
                ))}
              </div>
              <div className="px-4 py-2 text-center text-sm text-orange-600 hover:bg-orange-50 cursor-pointer font-medium">
                View All Notifications
              </div>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="flex items-center space-x-3 pl-4 border-l">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-400 to-red-400 flex items-center justify-center text-white font-bold shadow-md">
            {userRole === "admin" ? "A" : "U"}
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-gray-800">
              {userRole === "admin" ? "Admin User" : "John Doe"}
            </p>
            <p className="text-xs text-gray-500 capitalize">{userRole}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
