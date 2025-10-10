"use client";

const AddToCartButton = () => {
  const handleAddToCart = () => {
    console.log("Added to cart!");
  };

  return (
    <div className="flex justify-center items-center">
      <button
        onClick={handleAddToCart}
        className="py-2 px-4 addBtn text-[#642F21] hover:bg-yellow-500 border-2 border-[#642F21] font-semibold rounded-lg transition-colors duration-400"
      >
        ADD TO CART
      </button>
    </div>
  );
};

export default AddToCartButton;
