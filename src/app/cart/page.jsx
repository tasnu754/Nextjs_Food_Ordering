import CartItem from "@/components/Cart Page/CartItem";
import Navbar from "@/components/Home Page/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Oswald } from "next/font/google";

const oswald = Oswald({
  subsets: ["latin"],
  weight: "600",
});

export default function MyCart() {
  const cartItems = [
    {
      id: 1,
      name: "Salmon With Vegetables",
      variation: "Regular",
      price: 30.0,
      quantity: 2,
      image: "/foodSlider-5.jpg",
    },
    {
      id: 2,
      name: "Hawaiian Smoked",
      variation: "Medium",
      price: 12.5,
      quantity: 3,
      image: "/foodSlider-5.jpg",
    },
    {
      id: 3,
      name: "Vegetable Spaghetti",
      variation: "Small",
      price: 27.0,
      quantity: 1,
      image: "/foodSlider-5.jpg",
    },

    {
      id: 4,
      name: "Spring Roll with",
      variation: "Large",
      price: 20.0,
      quantity: 2,
      image: "/foodSlider-5.jpg",
    },
    {
      id: 5,
      name: "Vegetable Spaghetti",
      variation: "Small",
      price: 27.0,
      quantity: 4,
      image: "/foodSlider-5.jpg",
    },

    {
      id: 6,
      name: "Spring Roll with",
      variation: "Large",
      price: 20.0,
      quantity: 2,
      image: "/foodSlider-5.jpg",
    },
  ];

  const total = 20.0;

  return (
    <ProtectedRoute>
      {" "}
      <div
        className={`min-h-screen bg-yellow-50 pb-24 ${oswald.className} text-[#642F21]`}
      >
        <Navbar></Navbar>
        {/* Header */}
        <div className="bg-white px-4 py-6 flex items-center justify-between sticky top-0 z-10 shadow-sm">
          <button className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <h1 className="text-xl font-bold">My Cart</h1>
          <div className="w-10"></div>
        </div>

        {/* Cart Items */}
        <div className="px-4 pt-4 lg:grid grid-cols-2 gap-4 space-y-4 container">
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        {/* Bottom Total Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-white px-4 py-4 shadow-lg ">
          <div className="flex items-center justify-between max-w-md mx-auto">
            <div className="flex items-center gap-2">
              <span className="text-gray-600 md:text-2xl">Total:</span>
              <span className="md:text-2xl font-bold">${total.toFixed(2)}</span>
            </div>
            <button className="bg-[#642F21] md:!text-xl  hover:bg-yellow-600 text-white font-semibold px-3 md:px-8 py-3 !rounded-lg transition-colors duration-300">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
