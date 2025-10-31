"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, requiredRole = "user" }) => {
  const router = useRouter();
  const { user, accessToken } = useSelector((state) => state.auth);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuthentication = () => {
      const isLoggedIn = !!(user && accessToken);

      if (!isLoggedIn) {
        const currentPath = window.location.pathname + window.location.search;
        sessionStorage.setItem(
          "redirectAfterLogin",
          JSON.stringify({
            path: currentPath,
            action: "route_protection",
          })
        );
        router.push("/login");
        return;
      }

      if (requiredRole && user.role !== requiredRole) {
        router.push("/unauthorized");
        return;
      }

      setIsChecking(false);
    };

    checkAuthentication();
  }, [user, accessToken, requiredRole, router]);

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying access...</p>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
