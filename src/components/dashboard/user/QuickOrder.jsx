// components/dashboard/user/QuickOrder.jsx
const QuickOrder = () => {
  const popularItems = [
    {
      id: 1,
      name: "Margherita Pizza",
      price: 12.99,
      emoji: "🍕",
      category: "Pizza",
    },
    {
      id: 2,
      name: "Cheese Burger",
      price: 8.99,
      emoji: "🍔",
      category: "Burger",
    },
    {
      id: 3,
      name: "Caesar Salad",
      price: 7.99,
      emoji: "🥗",
      category: "Salad",
    },
    {
      id: 4,
      name: "Chicken Wings",
      price: 10.99,
      emoji: "🍗",
      category: "Appetizer",
    },
    { id: 5, name: "Spaghetti", price: 11.99, emoji: "🍝", category: "Pasta" },
    {
      id: 6,
      name: "Fish Tacos",
      price: 9.99,
      emoji: "🌮",
      category: "Mexican",
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">Quick Order</h2>
        <button className="text-sm text-orange-600 font-medium hover:text-orange-700">
          View Full Menu →
        </button>
      </div>

      <p className="text-sm text-gray-600 mb-6">
        Order your favorites with one click!
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {popularItems.map((item) => (
          <div
            key={item.id}
            className="border-2 border-gray-200 rounded-xl p-4 hover:border-orange-500 hover:shadow-md transition-all duration-200 cursor-pointer group"
          >
            <div className="text-4xl mb-2 transform group-hover:scale-110 transition-transform">
              {item.emoji}
            </div>
            <h3 className="font-semibold text-gray-900 text-sm mb-1">
              {item.name}
            </h3>
            <p className="text-xs text-gray-500 mb-2">{item.category}</p>
            <div className="flex items-center justify-between">
              <span className="text-orange-600 font-bold">${item.price}</span>
              <button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full w-7 h-7 flex items-center justify-center text-lg transition-colors">
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickOrder;
