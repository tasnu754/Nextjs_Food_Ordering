// import CartItem from "@/components/Cart Page/CartItem";
// import Navbar from "@/components/Home Page/Navbar";
// import ProtectedRoute from "@/components/ProtectedRoute";
// import { Oswald } from "next/font/google";

// const oswald = Oswald({
//   subsets: ["latin"],
//   weight: "600",
// });

// export default function MyCart() {
//   const cartItems = [
//     {
//       id: 1,
//       name: "Salmon With Vegetables",
//       variation: "Regular",
//       price: 30.0,
//       quantity: 2,
//       image: "/foodSlider-5.jpg",
//     },
//     {
//       id: 2,
//       name: "Hawaiian Smoked",
//       variation: "Medium",
//       price: 12.5,
//       quantity: 3,
//       image: "/foodSlider-5.jpg",
//     },
//     {
//       id: 3,
//       name: "Vegetable Spaghetti",
//       variation: "Small",
//       price: 27.0,
//       quantity: 1,
//       image: "/foodSlider-5.jpg",
//     },

//     {
//       id: 4,
//       name: "Spring Roll with",
//       variation: "Large",
//       price: 20.0,
//       quantity: 2,
//       image: "/foodSlider-5.jpg",
//     },
//     {
//       id: 5,
//       name: "Vegetable Spaghetti",
//       variation: "Small",
//       price: 27.0,
//       quantity: 4,
//       image: "/foodSlider-5.jpg",
//     },

//     {
//       id: 6,
//       name: "Spring Roll with",
//       variation: "Large",
//       price: 20.0,
//       quantity: 2,
//       image: "/foodSlider-5.jpg",
//     },
//   ];

//   const total = 20.0;

//   return (
//     <ProtectedRoute>
//       {" "}
//       <div
//         className={`min-h-screen bg-yellow-50 pb-24 ${oswald.className} text-[#642F21]`}
//       >
//         <Navbar></Navbar>
//         {/* Header */}
//         <div className="bg-white px-4 py-6 flex items-center justify-between sticky top-0 z-10 shadow-sm">
//           <button className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full">
//             <svg
//               className="w-5 h-5"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M15 19l-7-7 7-7"
//               />
//             </svg>
//           </button>
//           <h1 className="text-xl font-bold">My Cart</h1>
//           <div className="w-10"></div>
//         </div>

//         {/* Cart Items */}
//         <div className="px-4 pt-4 lg:grid grid-cols-2 gap-4 space-y-4 container">
//           {cartItems.map((item) => (
//             <CartItem key={item.id} item={item} />
//           ))}
//         </div>

//         {/* Bottom Total Bar */}
//         <div className="fixed bottom-0 left-0 right-0 bg-white px-4 py-4 shadow-lg ">
//           <div className="flex items-center justify-between max-w-md mx-auto">
//             <div className="flex items-center gap-2">
//               <span className="text-gray-600 md:text-2xl">Total:</span>
//               <span className="md:text-2xl font-bold">${total.toFixed(2)}</span>
//             </div>
//             <button className="bg-[#642F21] md:!text-xl  hover:bg-yellow-600 text-white font-semibold px-3 md:px-8 py-3 !rounded-lg transition-colors duration-300">
//               Checkout
//             </button>
//           </div>
//         </div>
//       </div>
//     </ProtectedRoute>
//   );
// }

"use client";

import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { Roboto, Oswald } from "next/font/google";
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

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

const oswald = Oswald({
  subsets: ["latin"],
  weight: "600",
});

export default function CartPage() {
  const { data, isLoading } = useGetCartQuery();
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
        <div className="min-h-screen pt-20 flex items-center justify-center">
          <div className="text-center">
            <ShoppingBag className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h2 className={`${oswald.className} text-3xl text-gray-700 mb-2`}>
              Your cart is empty
            </h2>
            <p className={`${roboto.className} text-gray-500 mb-6`}>
              Add some delicious items to get started!
            </p>
            <Link
              href="/menu"
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg transition"
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
      <div className="min-h-screen pt-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className={`${oswald.className} text-4xl text-[#642F21]`}>
              Shopping Cart
            </h1>
            {cart.items.length > 0 && (
              <button
                onClick={handleClearCart}
                className="text-red-500 hover:text-red-600 text-sm font-semibold"
              >
                Clear Cart
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.items.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-lg shadow-sm p-4 flex gap-4"
                >
                  <div className="relative w-24 h-24 flex-shrink-0">
                    <Image
                      src={item.foodItem?.thumbnail || "/placeholder.jpg"}
                      alt={item.foodItem?.foodName}
                      fill
                      className="object-cover rounded"
                    />
                  </div>

                  <div className="flex-grow">
                    <h3
                      className={`${roboto.className} font-bold text-lg text-gray-800`}
                    >
                      {item.foodItem?.foodName}
                    </h3>
                    <p className="text-sm text-gray-500 capitalize">
                      Size: {item.variant}
                    </p>
                    <p className="text-yellow-600 font-bold mt-1">
                      ${item.price.toFixed(2)}
                    </p>

                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center border border-gray-300 rounded">
                        <button
                          onClick={() => handleDecrement(item._id)}
                          className="px-3 py-1 hover:bg-gray-100 transition"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="px-4 py-1 border-x border-gray-300 font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleIncrement(item._id)}
                          className="px-3 py-1 hover:bg-gray-100 transition"
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      <button
                        onClick={() => handleRemove(item._id)}
                        className="text-red-500 hover:text-red-600 transition"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-bold text-lg">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                <h2
                  className={`${oswald.className} text-2xl text-[#642F21] mb-4`}
                >
                  Order Summary
                </h2>

                <div className={`${roboto.className} space-y-3`}>
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({cart.totalItems} items)</span>
                    <span>${cart.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600"></div>
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery Fee</span>
                    <span>
                      {cart.deliveryFee === 0 ? (
                        <span className="text-green-600 font-semibold">
                          FREE
                        </span>
                      ) : (
                        `$${cart.deliveryFee.toFixed(2)}`
                      )}
                    </span>
                  </div>

                  {cart.subtotal > 0 && cart.subtotal < 50 && (
                    <p className="text-sm text-blue-600 bg-blue-50 p-2 rounded">
                      Add ${(50 - cart.subtotal).toFixed(2)} more for free
                      delivery!
                    </p>
                  )}

                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between text-xl font-bold text-gray-800">
                      <span>Total</span>
                      <span>${cart.total.toFixed(2)}</span>
                    </div>
                  </div>

                  <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 rounded-lg mt-4 transition">
                    Proceed to Checkout
                  </button>

                  <Link
                    href="/menu"
                    className="block text-center text-yellow-600 hover:text-yellow-700 font-semibold mt-3"
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
