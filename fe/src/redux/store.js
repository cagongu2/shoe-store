import { configureStore } from '@reduxjs/toolkit'
import cartReducer from "./features/carts/cartSlice"

export const store = configureStore({
    reducer: {
        cart: cartReducer,
    }
})