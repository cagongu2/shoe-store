import { configureStore } from '@reduxjs/toolkit'
import cartReducer from "./features/carts/cartSlice"
import favoriteReducer from "./features/favorites/favoriteSlice"


export const store = configureStore({
    reducer: {
        cart: cartReducer,
        favorite: favoriteReducer
    }
})