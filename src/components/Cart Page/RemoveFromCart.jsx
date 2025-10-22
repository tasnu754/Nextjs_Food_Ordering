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
      className="text-yellow-500 hover:text-yellow-700 transition-colors"
    >
      <svg
        className="w-6 h-6"
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
