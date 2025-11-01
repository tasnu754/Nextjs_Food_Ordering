// components/dashboard/user/RecommendedItems.jsx
const RecommendedItems = () => {
  const recommendations = [
    {
      id: 1,
      name: "BBQ Chicken Pizza",
      price: 14.99,
      emoji: "🍕",
      rating: 4.8,
    },
    { id: 2, name: "Chocolate Shake", price: 5.99, emoji: "🥤", rating: 4.9 },
    { id: 3, name: "Garlic Bread", price: 4.99, emoji: "🥖", rating: 4.7 },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900">Recommended for You</h2>
        <span className="text-2xl">✨</span>
      </div>

      <div className="space-y-3">
        {recommendations.map((item) => (
          <div
            key={item.id}
            className="flex items-center space-x-3 p-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg hover:from-orange-100 hover:to-red-100 transition-all cursor-pointer"
          >
            <div className="text-3xl">{item.emoji}</div>
            <div className="flex-1">
              <h3 className="font-semibold text-sm text-gray-900">
                {item.name}
              </h3>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-orange-600 font-bold text-sm">
                  ${item.price}
                </span>
                <span className="text-xs text-gray-600">⭐ {item.rating}</span>
              </div>
            </div>
            <button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full w-8 h-8 flex items-center justify-center transition-colors flex-shrink-0">
              +
            </button>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 py-2 text-sm font-medium text-orange-600 hover:text-orange-700 border-2 border-orange-200 hover:border-orange-300 rounded-lg transition-colors">
        See More Recommendations
      </button>
    </div>
  );
};

export default RecommendedItems;
