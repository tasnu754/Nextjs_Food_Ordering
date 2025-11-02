import { MdOutlineStarRate } from "react-icons/md";
import { Oswald } from "next/font/google";

const oswald = Oswald({
  subsets: ["latin"],
  weight: "600",
});

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
        <h2 className={`text-lg font-bold !text-[#C9983C] ${oswald.className}`}>
          Recommended for You
        </h2>
        <span className="text-2xl">
          <MdOutlineStarRate className="text-4xl text-[#5E0208]"></MdOutlineStarRate>
        </span>
      </div>

      <div className={`space-y-3 ${oswald.className}`}>
        {recommendations.map((item) => (
          <div
            key={item.id}
            className="flex items-center space-x-3 p-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg hover:from-[#C9983C] hover:to-amber-100  transition-all cursor-pointer !duration-200"
          >
            <div className="text-3xl">{item.emoji}</div>
            <div className="flex-1">
              <h3 className="font-semibold text-sm text-gray-900">
                {item.name}
              </h3>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-[#C9983C]  font-bold text-sm">
                  ${item.price}
                </span>
                <span className="text-xs text-gray-600">⭐ {item.rating}</span>
              </div>
            </div>
            <button className="bg-[#C9983C] !text-xl hover:bg-[#e7a221] text-white rounded-full w-8 h-8 flex items-center justify-center transition-colors flex-shrink-0">
              +
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedItems;
