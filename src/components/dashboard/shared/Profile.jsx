"use client";

import Image from "next/image";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Camera, User, Mail, Shield, Edit2, X, Check } from "lucide-react";
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

  // State for image preview
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const isUpdating = false;

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size should be less than 5MB");
        return;
      }

      // Validate file type
      const validTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",
        "image/gif",
      ];
      if (!validTypes.includes(file.type)) {
        alert("Please select a valid image file (jpg, jpeg, png, webp, gif)");
        return;
      }

      // Store the selected file
      setSelectedFile(file);

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCancelPreview = () => {
    setPreviewImage(null);
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    // Add the selected file to formData if exists
    if (selectedFile) {
      formData.set("profileImage", selectedFile);
    }

    try {
      //   await updateProfile(formData).unwrap();
      console.log("Updating profile with:", {
        name: formData.get("name"),
        hasImage: !!selectedFile,
      });

      // After successful update, clear preview
      // setPreviewImage(null);
      // setSelectedFile(null);
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const displayImage =
    previewImage || user?.profileImage?.url || "/default-avatar.png";

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8 ${roboto.className}`}
    >
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
            <form onSubmit={handleSubmit}>
              <div className="flex justify-center mb-8">
                <div className="relative">
                  <div
                    className="relative group cursor-pointer"
                    onClick={triggerFileInput}
                  >
                    <div className="relative w-32 h-32 rounded-full border-4 border-[#C9983C] overflow-hidden group-hover:border-[#AE3433] transition-all duration-300">
                      {previewImage ? (
                        <Image
                          fill
                          src={displayImage}
                          alt="Upload Profile"
                          className="object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 flex flex-col gap-2 items-center justify-center text-[#5E0208]">
                          <Camera></Camera>
                          <span className="text-sm font-medium text-center">
                            Upload
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="absolute inset-0 bg-[#5E0208] bg-opacity-80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-white font-semibold text-sm px-3 py-1 border-2 border-[#C9983C] rounded-full hover:bg-[#C9983C] hover:text-[#5E0208] transition-colors">
                        {previewImage ? "Change Again" : "Change Photo"}
                      </span>
                    </div>
                  </div>

                  {/* Cancel Preview Button */}
                  {previewImage && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCancelPreview();
                      }}
                      className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition-colors z-10"
                      title="Remove preview"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  name="Profile"
                  accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                  onChange={handleImageChange}
                  className="hidden "
                />
              </div>

              {/* Preview Indicator */}
              {previewImage && (
                <div className="mb-4 text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-full text-green-700 text-sm">
                    <Check size={16} />
                    <span>New image selected - click Update to save</span>
                  </div>
                </div>
              )}

              <div className="flex justify-center">
                <div className="my-2 flex items-center gap-2 px-4 !py-2 bg-gradient-to-r from-[#5E0208] to-[#AE3433] rounded-full">
                  <Shield size={16} className="text-white " />
                  <span className="text-white font-semibold capitalize">
                    {user?.role}
                  </span>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className={` text-xl !flex items-center gap-2 text-[#5E0208] mb-2 ${lil.className}`}
                  >
                    <User size={18} className="text-[#AE3433]" />
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
                    className={`!flex items-center gap-2 text-xl font-semibold text-[#5E0208] mb-2 ${lil.className}`}
                  >
                    <Mail size={18} className="text-[#AE3433]" />
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

                <button
                  type="submit"
                  disabled={isUpdating}
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
