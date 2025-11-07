"use client";

import { Trash2, Shield, ShieldOff } from "lucide-react";
import { deleteUser, makeAdmin, removeAdmin } from "@/actions/userActions";
import { useState } from "react";
import { Lilita_One } from "next/font/google";
import Image from "next/image";

const lil = Lilita_One({
  subsets: ["latin"],
  weight: "400",
});

const UserCard = ({ user }) => {
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
    const isAdmin = user?.role.toLowerCase() === "admin";
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
    <div className="bg-white border-2 border-gray-200 rounded-xl p-4 hover:shadow-lg transition">
      <div className="flex items-start gap-4">
        {/* Profile Image */}
        <div className="flex-shrink-0 w-14 h-14">
          {user?.profileImage?.url ? (
            <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-[#C9983C]">
              <Image
                src={user?.profileImage?.url || null}
                alt={user?.name || "Profile"}
                fill
                className="object-cover"
                sizes="40px"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
              {/* Fallback initial */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#AE3433] to-[#5E0208] flex items-center justify-center text-white font-bold hidden">
                {user?.name.charAt(0).toUpperCase()}
              </div>
            </div>
          ) : (
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#AE3433] to-[#5E0208] flex items-center justify-center text-white font-bold text-lg border-2 border-[#C9983C]">
              {user?.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        {/* User Info */}
        <div className="flex-1 min-w-0">
          <h3
            className={`${lil.className} text-base font-semibold text-gray-900 truncate`}
          >
            {user?.name}
          </h3>
          <p className="text-sm text-gray-600 truncate mt-0.5">{user?.email}</p>
          <div className="mt-2">
            <span
              className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                user?.role.toLowerCase() === "admin"
                  ? "bg-[#AE3433] text-white"
                  : "bg-[#C9983C] text-white"
              }`}
            >
              {user?.role}
            </span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200">
        <button
          onClick={handleToggleAdmin}
          disabled={isUpdating}
          className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg font-medium text-sm transition ${
            user?.role.toLowerCase() === "admin"
              ? "bg-orange-100 text-orange-700 hover:bg-orange-200"
              : "bg-green-100 text-green-700 hover:bg-green-200"
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {user?.role.toLowerCase() === "admin" ? (
            <>
              <ShieldOff className="w-4 h-4" />
              {isUpdating ? "Removing..." : "Remove Admin"}
            </>
          ) : (
            <>
              <Shield className="w-4 h-4" />
              {isUpdating ? "Promoting..." : "Make Admin"}
            </>
          )}
        </button>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default UserCard;
