// "use client";
// import * as React from "react";
// import Checkbox from "@mui/material/Checkbox";
// import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
// import Favorite from "@mui/icons-material/Favorite";

// const label = { inputProps: { "aria-label": "Checkbox demo" } };

// export default function WishlistIcon() {
//   return (
//     <div>
//       <Checkbox
//         {...label}
//         icon={<FavoriteBorder />}
//         checkedIcon={<Favorite />}
//         className="!text-red-600"
//       />
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import {
  useToggleWishlistItemMutation,
  useGetWishlistQuery,
} from "@/redux/features/wishlistApi";
import { useAuth } from "@/hooks/useAuth";
import Swal from "sweetalert2";

const WishlistIcon = ({ foodItemId }) => {
  const { isAuthenticated, user } = useAuth();
  const [isInWishlist, setIsInWishlist] = useState(false);

  const userId = user?._id;
  const { data: wishlistData } = useGetWishlistQuery(userId, {
    skip: !isAuthenticated,
  });

  const [toggleWishlist, { isLoading }] = useToggleWishlistItemMutation();

  // Check if item is in wishlist
  useEffect(() => {
    if (isAuthenticated && wishlistData?.data?.items && foodItemId) {
      const inWishlist = wishlistData.data.items.some(
        (item) => item.foodItem?._id === foodItemId
      );
      setIsInWishlist(inWishlist);
    } else {
      // Reset to false when not authenticated
      setIsInWishlist(false);
    }
  }, [wishlistData, foodItemId, isAuthenticated]);

  const handleToggle = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login to add items to your wishlist",
        confirmButtonColor: "#AE3433",
      });
      return;
    }

    if (!foodItemId) {
      console.error("No food item ID provided");
      return;
    }

    try {
      const result = await toggleWishlist({ foodItemId }).unwrap();

      if (result.action === "added") {
        Swal.fire({
          icon: "success",
          title: "Added to Wishlist!",
          text: "Item added to your favorites",
          confirmButtonColor: "#AE3433",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          icon: "info",
          title: "Removed from Wishlist",
          text: "Item removed from your favorites",
          confirmButtonColor: "#AE3433",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error("Wishlist toggle error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error?.data?.message || "Failed to update wishlist",
        confirmButtonColor: "#AE3433",
      });
    }
  };

  return (
    <div onClick={handleToggle}>
      <Checkbox
        checked={isInWishlist}
        disabled={isLoading}
        icon={<FavoriteBorder sx={{ color: "#AE3433" }} />}
        checkedIcon={<Favorite sx={{ color: "#AE3433" }} />}
        inputProps={{ "aria-label": "Add to wishlist" }}
      />
    </div>
  );
};

export default WishlistIcon;
