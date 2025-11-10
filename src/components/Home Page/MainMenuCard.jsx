"use client";

import React from "react";
import { Expand, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import StarRating from "./StartRating";
import WishlistIcon from "./WishlistIcon";
import { Oswald, Roboto } from "next/font/google";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";
import { useAddToCartMutation } from "@/redux/features/cartApi";
import Swal from "sweetalert2";
import Link from "next/link";

const roboto = Roboto({
  subsets: ["latin"],
  weight: "400",
});

const oswald = Oswald({
  subsets: ["latin"],
  weight: "600",
});

const MainMenuCard = ({ item, onImageClick, noImageClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showFullscreen, setShowFullscreen] = useState(false);
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [quantity] = useState(1);
  const [selectedVariant] = useState("regular");
  const [addToCart, { isLoading }] = useAddToCartMutation();

  const handleExpandClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      handleAuthAction("view_details", e);
      return;
    }

    setShowFullscreen(true);
  };

  const handleCloseFullscreen = () => {
    setShowFullscreen(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      handleCloseFullscreen();
    }
  };

  React.useEffect(() => {
    if (showFullscreen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [showFullscreen]);

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
      await addToCart({
        foodItemId: item?._id,
        quantity,
        variant: selectedVariant,
      }).unwrap();

      Swal.fire({
        icon: "success",
        title: "Added!",
        text: "Item added to cart!",
        confirmButtonColor: "#AE3433",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Add to cart error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error?.data?.message || "Failed to add item to cart",
        confirmButtonColor: "#AE3433",
      });
    }
  };

  const handleItemClick = (e) => {
    if (!isAuthenticated) {
      e.preventDefault();
      handleAuthAction("view_details", e);
    }
  };

  return (
    <div>
      <Link
        href={`/item/${item?._id}`}
        className="block group !no-underline"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={!isAuthenticated ? handleItemClick : undefined}
      >
        <div
          className={`flex flex-col lg:${
            item?.no == 2 || item?.no == 5
              ? " !flex-col-reverse "
              : " !flex-col hover:shadow-2xl "
          }  rounded-2xl overflow-hidden bg-white  transition-all duration-300 hover:-translate-y-1`}
        >
          <div className="relative h-64 rounded overflow-hidden">
            <Image
              src={item?.thumbnail || "/burger.png"}
              alt={item?.foodName || "Food image"}
              fill
              className={` ${
                item?.isFeatured ? "object-contain" : "object-cover"
              } transition-transform duration-500 group-hover:scale-110`}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {!noImageClick && (
              <button
                onClick={handleExpandClick}
                className="absolute bottom-4 right-4 p-2 !rounded-lg bg-black bg-opacity-10 hover:bg-opacity-100 transition-all duration-300 hover:scale-110"
              >
                <Expand size={25} className="text-white" />
              </button>
            )}
          </div>

          <div className="py-6 px-2 relative">
            <div className="flex justify-between">
              <div className="flex gap-1 mb-2">
                <StarRating averageRating={item?.averageRating}></StarRating>
              </div>
              {/* Pass foodItemId to WishlistIcon */}
              <WishlistIcon foodItemId={item?._id} />
            </div>

            <div className="pt-3 sm:pt-4 md:pt-5 text-[#642F21] text-start flex flex-col justify-center gap-2 sm:gap-3 md:gap-4 px-2 sm:px-0">
              <h4
                className={`uppercase ${oswald.className} font-bold sm:text-xl md:text-2xl !text-2xl tracking-wide`}
              >
                {item?.foodName}
              </h4>
              <p
                className={`${roboto.className} opacity-70 text-[#642F21] font-light text-sm sm:text-base md:text-lg px-1 sm:px-2 md:px-4`}
              >
                {item?.shortDescription}
              </p>
              <div
                className={`flex items-center justify-between ${oswald.className}`}
              >
                <span className="text-2xl font-bold text-[#AE3433]">
                  ${item?.price}
                </span>
              </div>

              <div
                className={`absolute right-4 bottom-5 transition-all duration-500 ease-in-out ${
                  isHovered
                    ? "translate-y-0 opacity-100"
                    : "translate-y-full opacity-0"
                }`}
              >
                <button
                  onClick={(e) => handleAuthAction("add_to_cart", e)}
                  className={`w-full rounded bg-[#C9983C] hover:bg-[#5E0208] hover:text-white text-white !font-bold py-1 px-4 flex items-center justify-center gap-2 transition-colors duration-400 ${roboto.className}`}
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Adding...
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={20} />
                      Add to cart
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Spacer when button is hidden */}
            {!isHovered && <div className="h-4"></div>}
          </div>
        </div>
      </Link>

      {/* Fullscreen Image Modal */}
      {showFullscreen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full w-full h-full flex items-center justify-center">
            {/* Close Button */}
            <button
              onClick={handleCloseFullscreen}
              className="absolute top-4 right-4 z-10 p-2 bg-black bg-opacity-50 rounded-full hover:bg-opacity-100 transition-all duration-300 text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Image */}
            <div className="relative w-full h-full max-w-3xl max-h-[80vh]">
              <Image
                src={item?.thumbnail || "/burger.png"}
                alt={item?.foodName || "Food image"}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
              />
            </div>

            {/* Image Info */}
            <div className="absolute bottom-4 left-0 right-0 text-center text-white bg-black bg-opacity-50 py-2">
              <h3 className={`${oswald.className} text-xl font-bold`}>
                {item?.foodName}
              </h3>
              <p className={`${roboto.className} text-sm opacity-90`}>
                {item?.shortDescription}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainMenuCard;
