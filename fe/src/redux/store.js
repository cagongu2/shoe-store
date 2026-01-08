import { configureStore } from '@reduxjs/toolkit'
import cartReducer from "./features/carts/cartSlice"
import favoriteReducer from "./features/favorites/favoriteSlice"
import statusReducer from "./features/status/statusSlice"
import authReducer from "./features/auth/authSlice"

import categoriesApi from './features/categories/categoriesApi'
import colorsApi from './features/colors/colorsApi'
import sizesApi from './features/sizes/sizesApi'
import brandsApi from './features/brands/brandsApi'
import productsApi from './features/products/productsApi'
import usersApi from './features/users/userApi'
import cartsApi from './features/carts/cartsApi'
import ordersApi from './features/orders/ordersApi'
import blogsApi from './features/blogs/blogsApi'
import blogCategoriesApi from './features/blogCategories/blogCategoriesApi'
import { authApi } from './features/auth/authApi'
import { adminApi } from './features/admin/adminApi'


export const store = configureStore({
    reducer: {
        cart: cartReducer,
        favorite: favoriteReducer,
        status: statusReducer,
        auth: authReducer,
        [categoriesApi.reducerPath]: categoriesApi.reducer,
        [colorsApi.reducerPath]: colorsApi.reducer,
        [sizesApi.reducerPath]: sizesApi.reducer,
        [brandsApi.reducerPath]: brandsApi.reducer,
        [productsApi.reducerPath]: productsApi.reducer,
        [usersApi.reducerPath]: usersApi.reducer,
        [cartsApi.reducerPath]: cartsApi.reducer,
        [ordersApi.reducerPath]: ordersApi.reducer,
        [blogsApi.reducerPath]: blogsApi.reducer,
        [blogCategoriesApi.reducerPath]: blogCategoriesApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [adminApi.reducerPath]: adminApi.reducer,
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
            blogCategoriesApi.middleware,
            authApi.middleware,
            adminApi.middleware,
        ),
})