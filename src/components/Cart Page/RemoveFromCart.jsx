// Delete Button - Client Component
"use client";

const RemoveFromCart = ({ itemId }) => {
  const handleDelete = () => {
    console.log("Delete item:", itemId);
    // Add your delete logic here
  };

  return (
    <button
      onClick={handleDelete}
      className="text-orange-400 hover:text-orange-500 transition-colors"
    >
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
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  );
};

export default RemoveFromCart;
