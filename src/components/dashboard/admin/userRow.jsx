"use client";

import { Trash2, Shield, ShieldOff } from "lucide-react";
import Swal from "sweetalert2";
import {
  useDeleteUserMutation,
  useMakeAdminMutation,
  useRemoveAdminMutation,
} from "@/redux/features/usersApi";
import { Oswald, Roboto, Lilita_One } from "next/font/google";
import Image from "next/image";

const roboto = Roboto({
  subsets: ["latin"],
  weight: "400",
});

const oswald = Oswald({
  subsets: ["latin"],
  weight: "600",
});
const lil = Lilita_One({
  subsets: ["latin"],
  weight: "400",
});

const UserRow = ({ user }) => {
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
  const [makeAdmin, { isLoading: isMakingAdmin }] = useMakeAdminMutation();
  const [removeAdmin, { isLoading: isRemovingAdmin }] =
    useRemoveAdminMutation();

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Delete ${user.name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete!",
    });

    if (result.isConfirmed) {
      try {
        await deleteUser(user?._id || user?.id).unwrap();
        Swal.fire("Deleted!", `${user.name} has been deleted.`, "success");
      } catch (error) {
        Swal.fire(
          "Error!",
          error?.data?.message || "Failed to delete user.",
          "error"
        );
      }
    }
  };

  const handleToggleAdmin = async () => {
    const isAdmin = user.role.toLowerCase() === "admin";
    const action = isAdmin ? "remove admin role from" : "make";

    const result = await Swal.fire({
      title: "Are you sure?",
      text: `${action} ${user.name} ${isAdmin ? "a user" : "an admin"}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: isAdmin ? "#f97316" : "#059669",
      cancelButtonColor: "#6b7280",
      confirmButtonText: `Yes, ${action}!`,
    });

    if (result.isConfirmed) {
      try {
        if (isAdmin) {
          await removeAdmin(user?._id || user?.id).unwrap();
        } else {
          await makeAdmin(user?._id || user?.id).unwrap();
        }
        Swal.fire(
          "Success!",
          `${user.name} ${isAdmin ? "demoted" : "promoted"} successfully.`,
          "success"
        );
      } catch (error) {
        Swal.fire(
          "Error!",
          error?.data?.message || "Failed to update role.",
          "error"
        );
      }
    }
  };

  const isAdmin = user.role.toLowerCase() === "admin";
  const isUpdating = isMakingAdmin || isRemovingAdmin;

  return (
    <tr className="hover:bg-gray-50 transition">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center gap-3">
          {user?.profileImage ? (
            <div className="w-10 h-10 rounded-full">
              {" "}
              <Image
                fill
                src={user?.profileImage}
                alt={user?.name}
                className=" object-cover border-2 border-[#C9983C]"
              />
            </div>
          ) : (
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#AE3433] to-[#5E0208] flex items-center justify-center text-white font-bold border-2 border-[#C9983C]">
              {user?.name.charAt(0).toUpperCase()}
            </div>
          )}
          <span
            className={`text-lg font-medium text-[#AE3433] ${lil.className}`}
          >
            {user?.name}
          </span>
        </div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <span className="text-md text-gray-500">{user?.email}</span>
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-md font-medium ${
            isAdmin ? "bg-[#AE3433] text-white" : "bg-[#C9983C] text-white"
          }`}
        >
          {user?.role}
        </span>
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={handleToggleAdmin}
            disabled={isUpdating}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium text-xs transition ${
              isAdmin
                ? "bg-orange-100 text-orange-700 hover:bg-orange-200"
                : "bg-green-100 text-green-700 hover:bg-green-200"
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isAdmin ? (
              <>
                <ShieldOff className="w-3.5 h-3.5" />
                {isRemovingAdmin ? "Removing..." : "Remove Admin"}
              </>
            ) : (
              <>
                <Shield className="w-3.5 h-3.5" />
                {isMakingAdmin ? "Promoting..." : "Make Admin"}
              </>
            )}
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
            title="Delete user"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default UserRow;
