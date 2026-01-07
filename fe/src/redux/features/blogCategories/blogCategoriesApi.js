import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseUrl from "../../../util/baseUrl";

const blogCategoriesApi = createApi({
    reducerPath: 'blogCategoriesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseUrl()}/api/v1/blog-categories`,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['BlogCategories'],
    endpoints: (builder) => ({
        fetchAllBlogCategories: builder.query({
            query: () => "/",
            providesTags: ["BlogCategories"]
        }),
        addBlogCategory: builder.mutation({
            query: (newCategory) => ({
                url: "/",
                method: "POST",
                body: newCategory
            }),
            invalidatesTags: ["BlogCategories"]
        }),
        updateBlogCategory: builder.mutation({
            query: ({ id, ...rest }) => ({
                url: `/${id}`,
                method: "PUT",
                body: rest
            }),
            invalidatesTags: ["BlogCategories"]
        }),
        deleteBlogCategory: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["BlogCategories"]
        })
    })
});

export const {
    useFetchAllBlogCategoriesQuery,
    useAddBlogCategoryMutation,
    useUpdateBlogCategoryMutation,
    useDeleteBlogCategoryMutation
} = blogCategoriesApi;

export default blogCategoriesApi;
