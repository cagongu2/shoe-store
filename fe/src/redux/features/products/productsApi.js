import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseUrl from "../../../util/baseUrl";

const baseQuery = fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/v1/products`,
    credentials: 'include',
    prepareHeaders: (Headers) => {
        const token = localStorage.getItem('token');
        if (token) {
            Headers.set('Authorization', `Bearer ${token}`);
        }
        return Headers;
    }
})

const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery,
    tagTypes: ['Products'],
    endpoints: (builder) => ({
        fetchAllProducts: builder.query({
            query: (params) => {
                // If "all" is true (passed from admin dash), append to URL
                if (params?.all) {
                    return "/?all=true";
                }
                return "/";
            },
            providesTags: ["Products"]
        }),
        fetchProductById: builder.query({
            query: (id) => `/${id}`,
            providesTags: (result, error, id) => [{ type: "Products", id }],
        }),
        addProduct: builder.mutation({
            query: (newProduct) => ({
                url: `/`,
                method: "POST",
                body: newProduct
            }),
            invalidatesTags: ["Products"]
        }),
        updateProduct: builder.mutation({
            query: ({ id, ...rest }) => ({
                url: `/${id}`,
                method: "PUT",
                body: rest,
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: ["Products"]
        }),
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Products"]
        }),
        toggleProductStatus: builder.mutation({
            query: (id) => ({
                url: `/${id}/toggle-status`,
                method: "PUT"
            }),
            invalidatesTags: ["Products"]
        }),
        permanentlyDeleteProduct: builder.mutation({
            query: (id) => ({
                url: `/${id}/permanent`,
                method: "DELETE"
            }),
            invalidatesTags: ["Products"]
        })
    })
})

export const {
    useFetchAllProductsQuery,
    useFetchProductByIdQuery,
    useAddProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
    useToggleProductStatusMutation,
    usePermanentlyDeleteProductMutation
} = productsApi;
export default productsApi;