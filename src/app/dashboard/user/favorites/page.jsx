"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Heart,
  Trash2,
  ShoppingCart,
  Star,
  Package,
  AlertCircle,
} from "lucide-react";
import DashboardLayout from "@/components/dashboard/shared/DashboardLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import {
  useGetWishlistQuery,
  useRemoveFromWishlistMutation,
  useClearWishlistMutation,
} from "@/redux/features/wishlistApi";
import { useAddToCartMutation } from "@/redux/features/cartApi";
import Swal from "sweetalert2";
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

const UserFavoritesList = () => {
  const router = useRouter();
  const { data, isLoading } = useGetWishlistQuery();
  const [removeFromWishlist] = useRemoveFromWishlistMutation();
  const [clearWishlist] = useClearWishlistMutation();
  const [addToCart] = useAddToCartMutation();

  const wishlist = data?.data;
  const items = wishlist?.items || [];

  const handleRemove = async (foodItemId) => {
    const result = await Swal.fire({
      title: "Remove from Wishlist?",
      text: "Are you sure you want to remove this item from your favorites?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#AE3433",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, remove it",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await removeFromWishlist(foodItemId).unwrap();
        Swal.fire({
          icon: "success",
          title: "Removed!",
          text: "Item removed from wishlist",
          confirmButtonColor: "#AE3433",
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to remove item",
          confirmButtonColor: "#AE3433",
        });
      }
    }
  };

  const handleClearWishlist = async () => {
    const result = await Swal.fire({
      title: "Clear Wishlist?",
      text: "This will remove all items from your wishlist. This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#AE3433",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, clear it",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await clearWishlist().unwrap();
        Swal.fire({
          icon: "success",
          title: "Cleared!",
          text: "Wishlist has been cleared",
          confirmButtonColor: "#AE3433",
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to clear wishlist",
          confirmButtonColor: "#AE3433",
        });
      }
    }
  };

  const handleAddToCart = async (item) => {
    try {
      await addToCart({
        foodItemId: item.foodItem._id,
        quantity: 1,
        variant: "regular",
      }).unwrap();

      Swal.fire({
        icon: "success",
        title: "Added to Cart!",
        text: "Item added to your cart",
        confirmButtonColor: "#AE3433",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error?.data?.message || "Failed to add item to cart",
        confirmButtonColor: "#AE3433",
      });
    }
  };

  const handleViewDetails = (foodItemId) => {
    router.push(`/item/${foodItemId}`);
  };

  if (isLoading) {
    return (
      <ProtectedRoute requiredRole="user">
        <DashboardLayout userRole="user">
          <div className="flex items-center justify-center h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#AE3433]"></div>
          </div>
        </DashboardLayout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute requiredRole="user">
      <DashboardLayout userRole="user">
        <div className={`p-6 ${roboto.className}`}>
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <Heart className="text-[#AE3433]" size={32} />
              <h1
                className={`text-3xl font-bold !text-[#5E0208] ${oswald.className}`}
              >
                My Favorites
              </h1>
            </div>

            {items.length > 0 && (
              <button
                onClick={handleClearWishlist}
                className="text-red-600 hover:text-red-700 text-sm font-semibold flex items-center gap-2"
              >
                <Trash2 size={18} />
                Clear All
              </button>
            )}
          </div>

          {items.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <Heart
                className="mx-auto h-16 w-16 text-gray-400 mb-4"
                strokeWidth={1}
              />
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                No favorites yet
              </h2>
              <p className="text-gray-500 mb-6">
                Start adding items to your wishlist to see them here!
              </p>
              <button
                onClick={() => router.push("/menu")}
                className="bg-[#AE3433] !no-underline hover:bg-[#5E0208] text-white px-6 py-3 !rounded-lg transition"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            <>
              <div className="mb-4">
                <p className="text-gray-600">
                  {items.length} {items.length === 1 ? "item" : "items"} in your
                  wishlist
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items?.map((item) => {
                  const foodItem = item?.foodItem;

                  if (!foodItem) {
                    return null;
                  }

                  return (
                    <div
                      key={item._id}
                      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
                    >
                      {/* Image */}
                      <div className="relative h-48 md:h-70 overflow-hidden">
                        <Image
                          src={foodItem?.thumbnail || "/placeholder.jpg"}
                          alt={foodItem?.foodName}
                          fill
                          className={` ${
                            foodItem?.isFeatured
                              ? "object-contain"
                              : "object-cover"
                          } group-hover:scale-110 transition-transform duration-300`}
                        />
                        {!foodItem?.isAvailable && (
                          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                            <div className="text-white text-center">
                              <AlertCircle size={40} className="mx-auto mb-2" />
                              <p className="font-semibold">Unavailable</p>
                            </div>
                          </div>
                        )}

                        {/* Remove Button */}
                        <button
                          onClick={() => handleRemove(foodItem._id)}
                          className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors group"
                        >
                          <Trash2
                            size={18}
                            className="text-[#AE3433] group-hover:text-red-600"
                          />
                        </button>
                      </div>

                      {/* Content */}
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span
                            className={`text-xs text-[#C9983C] uppercase tracking-wide `}
                          >
                            {foodItem?.category?.name || "Uncategorized"}
                          </span>
                          <div className="flex items-center gap-1">
                            <Star
                              size={16}
                              className="text-[#C9983C] fill-current"
                            />
                            <span className="text-sm font-semibold">
                              {foodItem.averageRating?.toFixed(1) || "0.0"}
                            </span>
                          </div>
                        </div>

                        <h3
                          className={` ${lil.className} text-lg font-bold !text-[#5E0208] mb-2 line-clamp-1`}
                        >
                          {foodItem?.foodName}
                        </h3>

                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          {foodItem?.shortDescription}
                        </p>

                        <div className="flex items-center justify-between mb-4">
                          <span className="text-2xl font-bold text-[#AE3433]">
                            ${foodItem?.price?.toFixed(2)}
                          </span>
                          <span className="text-xs text-gray-400">
                            Added {new Date(item.addedAt).toLocaleDateString()}
                          </span>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleAddToCart(item)}
                            disabled={!foodItem.isAvailable}
                            className="flex-1 bg-[#C9983C] hover:bg-[#b8872d] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-2 px-4 !rounded-lg flex items-center justify-center gap-2 transition"
                          >
                            <ShoppingCart size={18} />
                            Add to Cart
                          </button>
                          <button
                            onClick={() => handleViewDetails(foodItem._id)}
                            className="px-4 py-2 border-2 border-[#AE3433] text-[#AE3433] hover:bg-[#AE3433] hover:text-white font-semibold !rounded-lg transition"
                          >
                            <Package size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default UserFavoritesList;
