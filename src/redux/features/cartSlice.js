import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalItems: 0,
  subtotal: 0,
  tax: 0,
  deliveryFee: 0,
  total: 0,
  isOpen: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      const cart = action.payload;
      state.items = cart.items || [];
      state.totalItems = cart.totalItems || 0;
      state.subtotal = cart.subtotal || 0;
      state.tax = cart.tax || 0;
      state.deliveryFee = cart.deliveryFee || 0;
      state.total = cart.total || 0;
    },
    clearLocalCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.subtotal = 0;
      state.tax = 0;
      state.deliveryFee = 0;
      state.total = 0;
    },
    openCart: (state) => {
      state.isOpen = true;
    },
    closeCart: (state) => {
      state.isOpen = false;
    },
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { setCart, clearLocalCart, openCart, closeCart, toggleCart } =
  cartSlice.actions;

export default cartSlice.reducer;
