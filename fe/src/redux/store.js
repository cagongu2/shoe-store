import { configureStore } from '@reduxjs/toolkit'
import cartReducer from "./features/carts/cartSlice"
import favoriteReducer from "./features/favorites/favoriteSlice"
import statusReducer from "./features/status/statusSlice"

import categoriesApi from './features/categories/categoriesApi'
import colorsApi from './features/colors/colorsApi'
import sizesApi from './features/sizes/sizesApi'
import brandsApi from './features/brands/brandsApi'
import productsApi from './features/products/productsApi'
import usersApi from './features/users/userApi'
import cartsApi from './features/carts/cartsApi'
import ordersApi from './features/orders/ordersApi'
import blogsApi from './features/blogs/blogsApi'


export const store = configureStore({
    reducer: {
        cart: cartReducer,
        favorite: favoriteReducer,
        status: statusReducer,
        [categoriesApi.reducerPath]: categoriesApi.reducer,
        [colorsApi.reducerPath]: colorsApi.reducer,
        [sizesApi.reducerPath]: sizesApi.reducer,
        [brandsApi.reducerPath]: brandsApi.reducer,
        [productsApi.reducerPath]: productsApi.reducer,
        [usersApi.reducerPath]: usersApi.reducer,
        [cartsApi.reducerPath]: cartsApi.reducer,
        [ordersApi.reducerPath]: ordersApi.reducer,
        [blogsApi.reducerPath]: blogsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            categoriesApi.middleware,
            colorsApi.middleware,
            sizesApi.middleware,
            brandsApi.middleware,
            productsApi.middleware,
            usersApi.middleware,
            cartsApi.middleware,
            ordersApi.middleware,
            blogsApi.middleware,
        ),
})