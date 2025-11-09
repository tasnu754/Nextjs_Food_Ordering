import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  itemCount: 0,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setWishlist: (state, action) => {
      const wishlist = action.payload;
      state.items = wishlist.items || [];
      state.itemCount = wishlist.items?.length || 0;
    },
    clearLocalWishlist: (state) => {
      state.items = [];
      state.itemCount = 0;
    },
  },
});

export const { setWishlist, clearLocalWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
