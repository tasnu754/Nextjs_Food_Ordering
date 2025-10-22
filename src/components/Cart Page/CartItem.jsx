import Image from "next/image";
import CartItemQuantity from "./CartItemQuantity";
import RemoveFromCart from "./RemoveFromCart";

import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: "400",
});

const CartItem = ({ item }) => {
  return (
    <div className="bg-white rounded-2xl p-3 shadow-sm flex gap-3 ">
      <div className="w-12 h-12 md:w-32  md:h-32 bg-gray-100 rounded-xl overflow-hidden">
        <Image
          src={item.image}
          alt="Item image"
          width={96}
          height={96}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 flex flex-col justify-between py-1">
        <div className="w-full ">
          <h3 className="font-semibold !text-base md:!text-2xl leading-tight">
            {item?.name}
          </h3>
          <p className={`text-gray-500 text-sm ${roboto.className}`}>
            {item?.variation}
          </p>
        </div>
        <p className="font-bold md:text-lg">${item?.price.toFixed(2)}</p>
      </div>

      <div className="flex flex-col justify-center gap-12 items-end py-1">
        <RemoveFromCart itemId={item.id} />
        <CartItemQuantity initialQuantity={item?.quantity} itemId={item?.id} />
      </div>
    </div>
  );
};

export default CartItem;
