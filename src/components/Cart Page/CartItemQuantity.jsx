"use client";

import { Minus, Plus } from "lucide-react";
import { useState } from "react";

const CartItemQuantity = ({ initialQuantity, onQuantityChange }) => {
  const [quantity, setQuantity] = useState(initialQuantity);
  const [inputValue, setInputValue] = useState(initialQuantity.toString());

  const onIncrease = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    setInputValue(newQuantity.toString());
  };

  const onDecrease = () => {
    const newQuantity = Math.max(1, quantity - 1);
    setQuantity(newQuantity);
    setInputValue(newQuantity.toString());
  };

  const handleInputChange = (e) => {
    const value = e.target.value;

    // Allow empty string for deletion
    if (value === "") {
      setInputValue("");
      return;
    }

    // Only allow digits
    if (!/^\d*$/.test(value)) {
      return; // Don't update if contains non-digit characters
    }

    // Parse and validate
    const numValue = parseInt(value);

    // Only update if it's a valid positive number
    if (!isNaN(numValue) && numValue > 0) {
      setInputValue(value);
      setQuantity(numValue);
    }
  };
  const handleInputBlur = () => {
    // Reset to last valid quantity if input is invalid
    const numValue = parseInt(inputValue);
    if (isNaN(numValue) || numValue < 1) {
      setInputValue(quantity.toString());
    }
  };

  return (
    <div className="bg-gray-100 rounded-lg px-2 py-2 flex items-center gap-1">
      <button
        onClick={onDecrease}
        className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors"
      >
        <Minus className="w-4 h-4" />
      </button>

      <input
        type="text" // Changed to text to avoid number input issues
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        className="font-semibold text-md w-12 text-center bg-transparent border-none outline-none"
      />

      <button
        onClick={onIncrease}
        className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
};

export default CartItemQuantity;
