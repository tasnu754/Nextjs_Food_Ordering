"use client";
import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useSelector } from "react-redux";

const DashboardLayout = ({ children, userRole = "user" }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        userRole={userRole}
      />

      {/* Main Content */}
      <div className="lg:pl-64 flex flex-col flex-1">
        <Header
          setSidebarOpen={setSidebarOpen}
          user={user}
          userRole={userRole}
        />

        <main className="flex-1 py-6 px-4 sm:px-6 lg:px-8">{children}</main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;
