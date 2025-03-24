import { createSlice } from '@reduxjs/toolkit';
import Swal from "sweetalert2";


const initialState = {
    cartItems: []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.cartItems.push(action.payload);
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(item =>
                !(item.product_id === action.payload.product_id &&
                  item.size === action.payload.size &&
                  item.color === action.payload.color)
            );
        },
        clearCart: (state) => {
            state.cartItems = [];
        }
    },
})

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer