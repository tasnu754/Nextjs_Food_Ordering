"use client";

import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { Roboto, Oswald, Lilita_One } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import {
  useGetCartQuery,
  useRemoveFromCartMutation,
  useIncrementCartItemMutation,
  useDecrementCartItemMutation,
  useClearCartMutation,
} from "@/redux/features/cartApi";
import { toast } from "react-hot-toast";
import ProtectedRoute from "@/components/ProtectedRoute";
import Navbar from "@/components/Home Page/Navbar";
import { useSelector } from "react-redux";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

const oswald = Oswald({
  subsets: ["latin"],
  weight: "600",
});
const lil = Lilita_One({
  subsets: ["latin"],
  weight: "400",
});

export default function CartPage() {
  const authState = useSelector((state) => state.auth);
  const id = authState?.user?._id;

  const { data, isLoading } = useGetCartQuery({ id });
  const [removeFromCart] = useRemoveFromCartMutation();
  const [incrementItem] = useIncrementCartItemMutation();
  const [decrementItem] = useDecrementCartItemMutation();
  const [clearCart] = useClearCartMutation();

  const cart = data?.data;

  const handleRemove = async (itemId) => {
    try {
      await removeFromCart(itemId).unwrap();
      toast.success("Item removed from cart");
    } catch (error) {
      toast.error("Failed to remove item");
    }
  };

  const handleIncrement = async (itemId) => {
    try {
      await incrementItem(itemId).unwrap();
    } catch (error) {
      toast.error("Failed to update quantity");
    }
  };

  const handleDecrement = async (itemId) => {
    try {
      await decrementItem(itemId).unwrap();
    } catch (error) {
      toast.error("Failed to update quantity");
    }
  };

  const handleClearCart = async () => {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      try {
        await clearCart().unwrap();
        toast.success("Cart cleared");
      } catch (error) {
        toast.error("Failed to clear cart");
      }
    }
  };

  if (isLoading) {
    return (
      <ProtectedRoute>
        <Navbar />
        <div className="min-h-screen pt-20 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
        </div>
      </ProtectedRoute>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <ProtectedRoute>
        <Navbar />
        <div
          className={`min-h-screen pt-20 flex items-center justify-center ${roboto.className}`}
        >
          <div className="text-center">
            <ShoppingBag className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h2 className={`${oswald.className} text-3xl !text-[#5E0208] mb-2`}>
              Your cart is empty
            </h2>
            <p className={`${roboto.className} text-gray-500 !mb-10`}>
              Add some delicious items to get started!
            </p>
            <Link
              href="/menu"
              className="bg-[#5E0208] !no-underline font-bold hover:bg-yellow-600 text-white px-6 py-3 rounded-lg transition"
            >
              Browse Menu
            </Link>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <Navbar />
      <div className={`min-h-screen pt-20 bg-gray-50 ${roboto.className}`}>
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className={`${oswald.className} text-4xl !text-[#642F21]`}>
              Shopping Cart
            </h1>
            {cart?.items.length > 0 && (
              <button
                onClick={handleClearCart}
                className="text-[#AE3433] hover:text-[#941212] !text-xl font-semibold"
              >
                Clear Cart
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart?.items?.map((item) => (
                <div
                  key={item?._id}
                  className="bg-white rounded-lg shadow-sm p-4 flex gap-4"
                >
                  <div className="relative w-14 h-14 md:!w-24 md:!h-24 flex-shrink-0">
                    <Image
                      src={item?.foodItem?.thumbnail || "/placeholder.jpg"}
                      alt={item?.foodItem?.foodName}
                      fill
                      sizes="(max-width: 640px) 96px, (max-width: 768px) 96px, 96px"
                      className="object-cover rounded"
                    />
                  </div>

                  <div className="flex-grow">
                    <h3
                      className={`${lil.className} font-bold !text-sm md:!text-xl !text-[#AE3433]`}
                    >
                      {item?.foodItem?.foodName}
                    </h3>
                    <p className="text-sm md:!text-md text-gray-500 capitalize">
                      Size: {item?.variant || "Regular"}
                    </p>
                    <p className="text-[#C9983C] font-bold mt-1">
                      ${item?.price.toFixed(2)}
                    </p>

                    <div className="flex items-center  gap-2 md:!gap-4 mt-3">
                      <div className="flex items-center  border border-gray-300 rounded">
                        <button
                          onClick={() => handleDecrement(item?._id)}
                          className="px-1 md:px-3 py-1 hover:bg-gray-100 transition"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="px-1 md:px-4 py-1 border-x border-gray-300 font-semibold">
                          {item?.quantity}
                        </span>
                        <button
                          onClick={() => handleIncrement(item?._id)}
                          className="px-1 md:px-3 hover:bg-gray-100 transition"
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      <button
                        onClick={() => handleRemove(item?._id)}
                        className="text-red-500  hover:text-red-600 transition"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-bold pr-4 text-yellow-600 md:text-lg">
                      ${(item?.price * item?.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                <h2
                  className={`${oswald.className} text-2xl !text-[#642F21] mb-4`}
                >
                  Order Summary
                </h2>

                <div className={`${roboto.className} space-y-3`}>
                  <div className="flex justify-between text-[#AE3433]">
                    <span>Subtotal ({cart?.totalItems} items)</span>
                    <span>${cart.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[#AE3433]"></div>
                  <div className="flex justify-between text-[#AE3433]">
                    <span>Delivery Fee</span>
                    <span>
                      {cart?.deliveryFee === 0 ? (
                        <span className="text-green-600 font-semibold">
                          FREE
                        </span>
                      ) : (
                        `$${cart?.deliveryFee.toFixed(2)}`
                      )}
                    </span>
                  </div>

                  {cart?.subtotal > 0 && cart?.subtotal < 200 && (
                    <p className="text-sm text-blue-600 bg-blue-50 p-2 rounded">
                      Add ${(200 - cart?.subtotal).toFixed(2)} more for free
                      delivery!
                    </p>
                  )}

                  <div className={`border-t border-[#AE3433] pt-3 mt-3 `}>
                    <div className="flex justify-between text-xl !font-bold text-[#AE3433]">
                      <span>Total</span>
                      <span className="">${cart?.total.toFixed(2)}</span>
                    </div>
                  </div>

                  <Link href="/checkout">
                    <button className="w-full bg-[#5E0208] !text-lg hover:bg-[#C9983C] text-white font-bold py-3 !rounded-lg mt-4 transition">
                      Proceed to Checkout
                    </button>
                  </Link>

                  <Link
                    href="/menu"
                    className="block text-center text-lg !no-underline !text-yellow-600 hover:!text-yellow-700 font-semibold mt-3"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
