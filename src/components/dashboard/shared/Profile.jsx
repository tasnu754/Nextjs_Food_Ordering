"use client";

import Image from "next/image";
import React, { useRef } from "react";
import { useSelector } from "react-redux";
// import { useUpdateProfileMutation } from "../../api/userApi";
import { Oswald, Roboto, Lilita_One } from "next/font/google";

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

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  //   const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  const fileInputRef = useRef(null);

  const isUpdating = false;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      //   await updateProfile(formData).unwrap();
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8 ${roboto.className}`}
    >
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
            <form onSubmit={handleSubmit}>
              <div className="flex justify-center mb-8">
                <div
                  className="relative group cursor-pointer"
                  onClick={triggerFileInput}
                >
                  <div className="w-32 h-32 ">
                    <Image
                      fill
                      src={user?.profileImage?.url || "/default-avatar.png"}
                      alt="Profile"
                      className="!rounded-full border-4 text-center border-[#C9983C] object-cover group-hover:border-[#AE3433] transition-all duration-300"
                    />
                  </div>

                  <div className="absolute inset-0 bg-[#5E0208] bg-opacity-80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-white font-semibold text-sm px-3 py-1 border-2 border-[#C9983C] rounded-full hover:bg-[#C9983C] hover:text-[#5E0208] transition-colors">
                      Change Photo
                    </span>
                  </div>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  name="profileImage"
                  accept="image/*"
                  onChange={(e) => {
                    // File selection handled by form submission
                  }}
                  className="hidden"
                />
              </div>

              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className={`block text-xl  text-[#5E0208] mb-2 ${lil.className}`}
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    defaultValue={user?.name || ""}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#C9983C] focus:ring-2 focus:ring-[#C9983C] focus:ring-opacity-20 transition-all duration-200 bg-white"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className={`block text-xl font-semibold text-[#5E0208] mb-2 ${lil.className}`}
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={user?.email || ""}
                    disabled
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Email cannot be changed
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="role"
                    className={`block text-xl font-semibold text-[#5E0208] mb-2 ${lil.className}`}
                  >
                    Role
                  </label>
                  <input
                    type="text"
                    id="role"
                    value={
                      user?.role
                        ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
                        : ""
                    }
                    disabled
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
                  />
                </div>

                <button
                  type="submit"
                  //   disabled={isUpdating}
                  className="w-full bg-[#5E0208] !text-xl text-white py-3 px-6 !rounded-lg font-semibold hover:bg-[#AE3433] focus:ring-2 focus:ring-[#C9983C] focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
                >
                  {isUpdating ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Updating...
                    </>
                  ) : (
                    "Update Profile"
                  )}
                </button>
              </div>
            </form>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
            <h3
              className={`text-2xl font-bold !text-[#5E0208] !mb-6 ${lil.className}`}
            >
              Account Statistics
            </h3>

            <div className="grid grid-cols-1 gap-6">
              {/* Login Count */}
              <div className="bg-gradient-to-r from-[#5E0208] to-[#AE3433] p-6 rounded-xl text-white">
                <div className="text-3xl font-bold mb-2">
                  {user?.loginCount || 0}
                </div>
                <div className="text-md opacity-90">Total Logins</div>
              </div>

              <div className="bg-gradient-to-r from-[#C9983C] to-[#E8B75B] p-6 rounded-xl text-[#5E0208]">
                <div className="text-xl font-bold mb-2 flex items-center">
                  <div
                    className={`w-3 h-3 rounded-full mr-2 ${
                      user?.isLoggedIn ? "bg-green-500" : "bg-gray-400"
                    }`}
                  ></div>
                  {user?.isLoggedIn ? "Online" : "Offline"}
                </div>
                <div className="text-sm opacity-90">Current Status</div>
              </div>

              <div className="bg-gray-100 p-6 rounded-xl border border-gray-200">
                <div className="text-lg font-semibold text-gray-800 mb-2">
                  {user?.lastLoginAt
                    ? new Date(user.lastLoginAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "Never"}
                </div>
                <div className="text-sm text-gray-600">Last Login</div>
              </div>

              <div className="bg-gray-100 p-6 rounded-xl border border-gray-200">
                <div className="text-lg font-semibold text-gray-800 mb-2">
                  {user?.createdAt
                    ? new Date(user.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "N/A"}
                </div>
                <div className="text-sm text-gray-600">Member Since</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
