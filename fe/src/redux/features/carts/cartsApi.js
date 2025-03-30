import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseUrl from "../../../util/baseUrl";

const baseQuery = fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/v1/carts`,
    credentials: 'include',
    prepareHeaders: (Headers) => {
        const token = localStorage.getItem('token');
        if (token) {
            Headers.set('Authorization', `Bearer ${token}`);
        }
        return Headers;
    }
})

const cartsApi = createApi({
    reducerPath: 'cartsApi',
    baseQuery,
    tagTypes: ['Carts'],
    endpoints: (builder) =>({
        fetchAllCarts: builder.query({
            query: () => "/",
            providesTags: ["Carts"]
        }),
        
        fetchCartByUserId: builder.query({
            query: (userId) => `/user/${userId}`,
            providesTags: ["Carts"]
        }),
        
        addCart: builder.mutation({
            query: (newCart) => ({
                url: `/`,
                method: "POST",
                body: newCart
            }),
            invalidatesTags: ["Carts"]
        }),
       
        deleteCart: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Carts"]
        })
    })
  })
  
  export const {useFetchAllCartsQuery, useFetchCartByUserIdQuery, useAddCartMutation, useDeleteCartMutation} = cartsApi;
  export default cartsApi;