"use client";

import { BiLogOut } from "react-icons/bi";
import { Lilita_One } from "next/font/google";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/features/authSlice";
import { useRouter } from "next/navigation";
import { useLogoutMutation } from "@/redux/features/authApi";
import Swal from "sweetalert2";

const lil = Lilita_One({
  subsets: ["latin"],
  weight: "400",
});

const Logout = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [logoutApi, { isLoading: isLoggingOut }] = useLogoutMutation();

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out from your account!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, logout!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await logoutApi().unwrap();
        dispatch(logout());

        Swal.fire({
          title: "Logged out!",
          text: "You have been successfully logged out.",
          icon: "success",
        });

        router.push("/");
      } catch (error) {
        console.error("Logout API failed:", error);
        dispatch(logout());

        Swal.fire({
          title: "Logged out locally",
          text: "You have been logged out from this device. There was an issue with the server.",
          icon: "info",
        });

        router.push("/");
      }
    }
  };
  return (
    <div>
      <button
        onClick={handleLogout}
        className={`w-full flex items-center justify-center px-4 py-3 !text-xl font-medium text-[#AE3433] hover:bg-red-50 rounded-lg hover:!rounded-lg transition-colors ${lil.className}`}
      >
        <BiLogOut className="mr-2 text-2xl"></BiLogOut>
        Logout
      </button>
    </div>
  );
};

export default Logout;
