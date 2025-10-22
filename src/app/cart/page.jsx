import CartItem from "@/components/Cart Page/CartItem";

export default function MyCart() {
  const cartItems = [
    {
      id: 1,
      name: "Salmon With Vegetables",
      description: "in Spicy Sauce",
      price: 30.0,
      quantity: 1,
      image: "🍽️",
    },
    {
      id: 2,
      name: "Hawaiian Smoked",
      description: "Chicken Pizza",
      price: 12.5,
      quantity: 0.5,
      image: "🍕",
    },
    {
      id: 3,
      name: "Vegetable Spaghetti",
      description: "with Bacon",
      price: 27.0,
      quantity: 1,
      image: "🍝",
    },
    {
      id: 4,
      name: "Spring Roll with",
      description: "Vegetables",
      price: 20.0,
      quantity: 1,
      image: "🥗",
    },
  ];

  const total = 20.0;

  return (
    <div className="min-h-[80vh] bg-yellow-50 pb-24">
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
      <div className="px-4 pt-4 space-y-4 container">
        {cartItems.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>

      {/* Bottom Total Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white px-4 py-4 shadow-lg ">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <div className="flex items-center gap-2">
            <span className="text-gray-600 text-lg">Total:</span>
            <span className="text-2xl font-bold">${total.toFixed(2)}</span>
          </div>
          <button className="bg-orange-400 hover:bg-orange-500 text-white font-semibold px-8 py-3 rounded-full transition-colors">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
