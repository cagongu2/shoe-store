import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartCount: 0,
  favoriteCount: 0,
};

const statusSlice = createSlice({
  name: "status",
  initialState,
  reducers: {
    setCartCount: (state, action) => {
      state.cartCount = action.payload;
    },
    setFavoriteCount: (state, action) => {
      state.favoriteCount = action.payload;
    },
  },
});

export const { setCartCount, setFavoriteCount } = statusSlice.actions;
export default statusSlice.reducer;
