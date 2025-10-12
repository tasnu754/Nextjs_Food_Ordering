import Image from "next/image";
import StarRating from "./StartRating";
import AddToCartButton from "./AddToCartButton";
import WishlistIcon from "./WishlistIcon";
import { Oswald, Roboto } from "next/font/google";

const oswald = Oswald({
  subsets: ["latin"],
  weight: "600",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: "300",
});

const SingleCart = () => {
  return (
    <div className="w-full max-w-xs mx-auto sm:max-w-sm md:max-w-md lg:max-w-lg">
      <div className="flex flex-col">
        <div className="relative border border-gray-300 rounded-lg py-3 sm:py-4 md:py-5 flex flex-col justify-center items-center px-2 sm:px-4 md:px-6">
          {/* Wishlist Icon  */}
          <div className="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-3">
            <WishlistIcon />
          </div>

          <div className="relative w-32 h-32 xs:w-36 xs:h-36 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-52 lg:h-52">
            <Image
              src={"/burger_1.png"}
              alt="Burger"
              fill
              className="object-contain"
              sizes="(max-width: 480px) 128px, (max-width: 640px) 144px, (max-width: 768px) 160px, (max-width: 1024px) 192px, 208px"
            />
          </div>

          {/* Price and Rating */}
          <div className="flex flex-col lg:flex-row justify-between items-center w-full mt-3 sm:mt-4 md:mt-5 px-2 sm:px-0 gap-2 sm:gap-3 md:gap-4 md:text-xl">
            <button
              className={`bg-[#642F21] py-2 px-3 sm:py-2 sm:px-4 md:py-3 md:px-5 rounded text-yellow-400 font-bold ${oswald.className} text-sm sm:text-base md:text-lg lg:text-3xl whitespace-nowrap`}
            >
              $10.35
            </button>
            <div className="scale-75 sm:scale-90 md:scale-100 lg:scale-105">
              <StarRating />
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="pt-3 sm:pt-4 md:pt-5 text-[#642F21] text-center flex flex-col justify-center gap-2 sm:gap-3 md:gap-4 px-2 sm:px-0">
          <h4
            className={`uppercase ${oswald.className} font-bold text-lg sm:text-xl md:text-2xl lg:text-2xl tracking-wide`}
          >
            Bigti Burger
          </h4>
          <p
            className={`${roboto.className} opacity-70 text-[#642F21] font-light text-sm sm:text-base md:text-md  
                      px-1 sm:px-2 md:px-4`}
          >
            Mushroom patty, vegan cheese, lettuce, tomatoes, avocado ligula
          </p>
          <div className="pt-1 sm:pt-2 scale-90 sm:scale-95 md:scale-100 lg:scale-105">
            <AddToCartButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleCart;
