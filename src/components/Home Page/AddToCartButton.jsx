"use client";

import { HiOutlineShoppingBag } from "react-icons/hi2";
import { Oswald } from "next/font/google";
import { useAddToCartMutation } from "@/redux/features/cartApi";
import Swal from "sweetalert2";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

const oswald = Oswald({
  subsets: ["latin"],
  weight: "600",
});

const AddToCartButton = ({ item }) => {
  const { isAuthenticated } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState("regular");
  const [addToCart, { isLoading }] = useAddToCartMutation();
  const router = useRouter();

  const handleAuthAction = (action, e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      const redirectData = {
        path: window.location.pathname + window.location.search,
        action: action,
        itemId: item?.no,
      };
      sessionStorage.setItem(
        "redirectAfterLogin",
        JSON.stringify(redirectData)
      );
      router.push("/login");
      return;
    }

    if (action === "view_details" && noImageClick === false) {
      onImageClick();
    } else if (action === "add_to_cart") {
      handleAddToCart();
    }
  };

  const handleAddToCart = async () => {
    try {
      const result = await addToCart({
        foodItemId: item?._id,
        quantity,
        variant: selectedVariant,
      }).unwrap();

      Swal.fire({
        icon: "success",
        title: "Added!",
        text: "Item added to cart!",
        confirmButtonColor: "#AE3433",
      });

      setQuantity(1);
    } catch (error) {
      console.error("Add to cart error:", error);
      toast.error(error?.data?.message || "Failed to add item to cart", {
        duration: 3000,
        position: "top-right",
      });
    }
  };

  return (
    <div className="flex justify-center items-center ">
      <button
        onClick={(e) => handleAuthAction("add_to_cart", e)}
        className={`flex justify-center items-center gap-2 py-2 px-6 lg:px-12 ${oswald.className} text-[#642F21] hover:bg-[#642F21] hover:text-white border-2 border-[#642F21] font-semibold rounded-xl transition-colors duration-400`}
      >
        {isLoading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            Adding...
          </>
        ) : (
          <>
            <HiOutlineShoppingBag className="text-2xl" />
            ADD TO CART
          </>
        )}
      </button>
    </div>
  );
};

export default AddToCartButton;
