import { configureStore } from '@reduxjs/toolkit'
import cartReducer from "./features/carts/cartSlice"
import favoriteReducer from "./features/favorites/favoriteSlice"
import categoriesApi from './features/categories/categoriesApi'
import colorsApi from './features/colors/colorsApi'
import sizesApi from './features/sizes/sizesApi'
import brandsApi from './features/brands/brandsApi'
import productsApi from './features/products/productsApi'


export const store = configureStore({
    reducer: {
        cart: cartReducer,
        favorite: favoriteReducer,
        [categoriesApi.reducerPath]: categoriesApi.reducer,
        [colorsApi.reducerPath]: colorsApi.reducer,
        [sizesApi.reducerPath]: sizesApi.reducer,
        [brandsApi.reducerPath]: brandsApi.reducer,
        [productsApi.reducerPath]: productsApi.reducer,


    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            categoriesApi.middleware,
            colorsApi.middleware,
            sizesApi.middleware,
            brandsApi.middleware,
            productsApi.middleware,
        ),
})