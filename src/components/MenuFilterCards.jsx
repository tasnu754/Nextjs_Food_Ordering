import AddToCartButton from "./AddToCartButton";

const MenuFilterCards = () => {
  const handleAddToCart = () => {
    console.log("Added to cart!");
  };
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-md mx-auto">
        <div className="max-w-sm mx-auto bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
          {/* Price Tag */}
          <div className="bg-yellow-500 text-black px-4 py-2 text-right">
            <span className="text-2xl font-bold">$10.35</span>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Restaurant Name */}
            <div className="mb-4">
              <h2 className="text-3xl font-bold text-gray-800 tracking-tight">
                BIGTI BURGER
              </h2>
            </div>

            {/* Item Name */}
            <div className="mb-2">
              <h3 className="text-xl font-semibold text-gray-900">
                Mushroom Patty Burger
              </h3>
            </div>

            {/* Description */}
            <div className="mb-6">
              <p className="text-gray-600 leading-relaxed">
                Mushroom patty, vegan cheese,
                <br />
                lettuce, tomatoes, avocado ligula
              </p>
            </div>

            <AddToCartButton></AddToCartButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuFilterCards;
