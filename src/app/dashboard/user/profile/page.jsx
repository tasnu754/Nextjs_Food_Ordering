import DashboardLayout from "@/components/dashboard/shared/DashboardLayout";
import Profile from "@/components/dashboard/shared/Profile";
import ProtectedRoute from "@/components/ProtectedRoute";
import React from "react";

const UserProfilePage = () => {
  return (
    <ProtectedRoute requiredRole="user">
      <DashboardLayout userRole="user">
        <Profile></Profile>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default UserProfilePage;
