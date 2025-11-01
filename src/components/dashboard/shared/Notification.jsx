"use client";
import { useState } from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: "600",
});

const Notification = () => {
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, text: "New order received", time: "2 min ago", unread: true },
    { id: 2, text: "Payment confirmed", time: "1 hour ago", unread: true },
    { id: 3, text: "Order delivered", time: "3 hours ago", unread: false },
  ];

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <div>
      <div className={`relative ${roboto.className} `}>
        <button
          onClick={() => setShowNotifications(!showNotifications)}
          className="relative p-2 text-gray-600 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-colors"
        >
          <span className="text-3xl ">
            <IoNotificationsOutline className="text-[#5E0208]"></IoNotificationsOutline>
          </span>
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-5 h-5 text-xs font-bold text-white bg-[#C9983C] rounded-full flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>

        {showNotifications && (
          <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-3 bg-gradient-to-r from-[#AE3433] to-[#5E0208] text-white font-semibold">
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
            <div className="px-4 py-2 text-center text-sm text-[#5E0208] hover:bg-orange-50 cursor-pointer font-medium">
              View All Notifications
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notification;
