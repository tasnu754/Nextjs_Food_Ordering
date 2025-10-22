"use client";

import { useState } from "react";

const CartItemQuantity = ({ initialQuantity, itemId }) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  return (
    <div className="bg-gray-100 rounded-full px-3 py-1 flex items-center gap-2 min-w-16">
      <span className="font-semibold text-sm">{quantity}</span>
    </div>
  );
};

export default CartItemQuantity;
