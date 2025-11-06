import Image from "next/image";
import StarRating from "./StartRating";
import AddToCartButton from "./AddToCartButton";
import WishlistIcon from "./WishlistIcon";
import { Oswald, Roboto } from "next/font/google";
import Link from "next/link";

const oswald = Oswald({
  subsets: ["latin"],
  weight: "600",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: "300",
});

const SingleCart = ({ item }) => {
  return (
    <div className="w-full max-w-xs mx-auto sm:max-w-sm md:max-w-md lg:max-w-lg">
      <div className="flex flex-col">
        <div className="relative border border-gray-300 rounded-lg py-3 sm:py-4 md:py-5 flex flex-col justify-center items-center px-2 sm:px-4 md:px-6">
          {/* Wishlist Icon  */}
          <div className="absolute top-2 z-100 right-2 sm:top-3 sm:right-3 md:top-4 md:right-3">
            <WishlistIcon />
          </div>

          <div className="relative !w-full !h-48 xs:w-52 xs:h-52 sm:w-60 sm:h-60 md:w-72 md:!h-72 lg:!w-70 lg:!h-70">
            <Image
              src={item?.thumbnail}
              alt={item?.foodName}
              fill
              className="object-contain"
              sizes="(max-width: 480px) 208px, (max-width: 640px) 240px, (max-width: 768px) 288px, (max-width: 1024px) 336px, 384px"
            />
          </div>

          {/* Price and Rating */}
          <div className="flex flex-col lg:flex-row justify-between items-center w-full mt-3 sm:mt-4 md:mt-5 px-2 sm:px-0 gap-2 sm:gap-3 md:gap-4 md:text-xl">
            <button
              className={`bg-[#642F21] py-2 px-3 sm:py-2 sm:px-4 md:py-3 md:px-5 rounded text-yellow-400 font-bold ${oswald.className} text-sm sm:text-base md:text-lg lg:text-3xl whitespace-nowrap`}
            >
              ${item?.price}
            </button>
            <div className="scale-75 sm:scale-90 md:scale-100 lg:scale-105">
              <StarRating averageRating={item?.averageRating} />
            </div>
          </div>
        </div>

        {/* Product Details */}
        <Link href={`item/${item?._id}`} className="!no-underline">
          {" "}
          <div className="pt-3 sm:pt-4 md:pt-5  text-[#642F21] text-center flex flex-col justify-center gap-2 sm:gap-3 md:gap-4 px-2 sm:px-0">
            <h4
              className={`uppercase ${oswald.className} font-bold text-lg sm:text-xl md:text-2xl lg:text-2xl tracking-wide`}
            >
              {item?.foodName}
            </h4>
            <p
              className={`${roboto.className} opacity-70 text-[#642F21] font-light text-sm sm:text-base md:text-md  
                      px-1 sm:px-2 md:px-4`}
            >
              {item?.shortDescription}
            </p>
            <div className="pt-1 sm:pt-2 scale-90 sm:scale-95 md:scale-100 lg:scale-105">
              <AddToCartButton />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SingleCart;
