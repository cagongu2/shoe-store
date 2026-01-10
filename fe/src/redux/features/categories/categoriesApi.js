import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseUrl from "../../../util/baseUrl";

const baseQuery = fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/v1/categories`,
    credentials: 'include',
    prepareHeaders: (Headers) => {
        const token = localStorage.getItem('token');
        if (token) {
            Headers.set('Authorization', `Bearer ${token}`);
        }
        return Headers;
    }
})

const categoriesApi = createApi({
    reducerPath: 'categoriesApi',
    baseQuery,
    tagTypes: ['Categories'],
    endpoints: (builder) => ({
        fetchAllCategories: builder.query({
            query: (params) => ({
                url: "/",
                params
            }),
            providesTags: ["Categories"]
        }),
        fetchCategoryById: builder.query({
            query: (id) => `/${id}`,
            providesTags: (result, error, id) => [{ type: "Categories", id }],
        }),
        addCategory: builder.mutation({
            query: (newCategory) => ({
                url: `/`,
                method: "POST",
                body: newCategory
            }),
            invalidatesTags: ["Categories"]
        }),
        updateCategory: builder.mutation({
            query: ({ id, ...rest }) => ({
                url: `/${id}`,
                method: "PUT",
                body: rest,
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: ["Categories"]
        }),
        deleteCategory: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Categories"]
        })
    })
})

export const { useFetchAllCategoriesQuery, useFetchCategoryByIdQuery, useAddCategoryMutation, useUpdateCategoryMutation, useDeleteCategoryMutation } = categoriesApi;
export default categoriesApi;