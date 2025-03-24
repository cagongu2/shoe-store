import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    favoriteItems: []
}

const favoriteSlice = createSlice({
    name: 'favorite',
    initialState,
    reducers: {
        addToFavorite: (state, action) => {
            const existingItem = state.favoriteItems.find(item => item.product_id === action.payload.product_id);
            if (!existingItem) {
                state.favoriteItems.push(action.payload);
            }
        },
        removeFromFavorite: (state, action) => {
            state.favoriteItems = state.favoriteItems.filter(item => item.product_id !== action.payload.product_id);
        },
        clearFavorite: (state) => {
            state.favoriteItems = [];
        }
    },
})

export const { addToFavorite, removeFromFavorite, clearFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer