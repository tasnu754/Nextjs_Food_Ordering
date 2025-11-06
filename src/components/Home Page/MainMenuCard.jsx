"use client";

import { Expand, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import StarRating from "./StartRating";
import WishlistIcon from "./WishlistIcon";
import { Oswald, Roboto } from "next/font/google";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";

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
  const router = useRouter();
  const { isAuthenticated } = useAuth();

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

  const handleAddToCart = () => {
    // Your add to cart logic here
    // console.log("Adding to cart:", item);
    // dispatch(addToCart(item));
  };

  const handleItemClick = (e) => {
    if (!isAuthenticated) {
      e.preventDefault();
      handleAuthAction("view_details", e);
    }
  };

  return (
    <div>
      <a
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
              src={item?.thumbnail || "/promo.png"}
              alt={item?.foodName || "Food image"}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {!noImageClick && (
              <button
                onClick={(e) => handleAuthAction("view_details", e)}
                className="absolute bottom-4 right-4 p-2 rounded-lg hover:bg-opacity-100 transition-all duration-300 hover:scale-110"
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
              <WishlistIcon></WishlistIcon>
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
                <span className="text-2xl font-bold text-red-600">
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
                  className={`w-full rounded bg-amber-400 hover:bg-[#3A110E] hover:text-white text-[#3A110E] !font-bold py-1 px-4 flex items-center justify-center gap-2 transition-colors duration-400 ${roboto.className}`}
                >
                  <ShoppingCart size={30} />
                  Add to cart
                </button>
              </div>
            </div>

            {/* Spacer when button is hidden */}
            {!isHovered && <div className="h-4"></div>}
          </div>
        </div>
      </a>
    </div>
  );
};

export default MainMenuCard;
