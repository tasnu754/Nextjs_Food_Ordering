"use client";

import { Trash2, Shield, ShieldOff } from "lucide-react";
import { deleteUser, makeAdmin, removeAdmin } from "@/actions/userActions";
import { Lilita_One } from "next/font/google";
import { useState } from "react";
import Swal from "sweetalert2";

const lil = Lilita_One({
  subsets: ["latin"],
  weight: "400",
});

const UserRow = ({ user }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleDelete = async () => {
    const res = await Swal.fire({
      title: "Are you sure?",
      text: `You want to delete ${user.name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete!",
      cancelButtonText: "Cancel",
    });
    if (res.isConfirmed) {
      try {
        setIsDeleting(true);
        const result = await deleteUser(user._id || user.id);
        setIsDeleting(false);

        console.log(result);

        if (result?.success) {
          Swal.fire({
            title: `${result?.message}`,
            text: `${user.name} have been deleted from the website`,
            icon: "success",
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Error occured!",
          text: `${error?.message}`,
          icon: "info",
        });
      }
    }
  };

  const handleToggleAdmin = async () => {
    const isAdmin = user.role.toLowerCase() === "admin";
    const action = isAdmin ? "remove admin role from" : "promote";

    const res = await Swal.fire({
      title: "Are you sure?",
      text: `You want to ${action} ${user.name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes!",
      cancelButtonText: "Cancel",
    });

    if (res?.isConfirmed) {
      try {
        setIsUpdating(true);
        const result = isAdmin
          ? await removeAdmin(user?._id || user?.id)
          : await makeAdmin(user?._id || user?.id);
        setIsUpdating(false);

        if (result?.success) {
          Swal.fire({
            title: "Success",
            text: `${action} ${user.name} successfully`,
            icon: "success",
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Error occured!",
          text: `${error?.message}`,
          icon: "info",
        });
      }
    }
  };

  return (
    <tr className="hover:bg-gray-50 transition">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center gap-3">
          {user?.profileImage ? (
            <img
              src={user?.profileImage}
              alt={user?.name}
              className="w-10 h-10 rounded-full object-cover border-2 border-[#C9983C]"
            />
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
            user?.role.toLowerCase() === "admin"
              ? "bg-[#AE3433] text-white"
              : "bg-[#C9983C] text-white"
          }`}
        >
          {user?.role}
        </span>
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-right">
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={handleToggleAdmin}
            disabled={isUpdating}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 !rounded-lg font-medium text-xs transition ${
              user?.role.toLowerCase() === "admin"
                ? "bg-orange-100 text-orange-700 hover:bg-orange-200"
                : "bg-green-100 text-green-700 hover:bg-green-200"
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {user?.role.toLowerCase() === "admin" ? (
              <>
                <ShieldOff className="w-3.5 h-3.5" />
                {isUpdating ? "Removing..." : "Remove Admin"}
              </>
            ) : (
              <>
                <Shield className="w-3.5 h-3.5" />
                {isUpdating ? "Promoting..." : "Make Admin"}
              </>
            )}
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="p-2 bg-red-100 text-red-700 !rounded-lg hover:bg-red-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
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
