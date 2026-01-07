import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseUrl from "../../../util/baseUrl";

const baseQuery = fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/v1/blogs`,
    prepareHeaders: (headers) => {
        const token = localStorage.getItem('token');
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    }
})

const blogsApi = createApi({
    reducerPath: 'blogsApi',
    baseQuery,
    tagTypes: ['Blogs'],
    endpoints: (builder) => ({
        fetchAllBlogs: builder.query({
            query: (params) => {
                if (params) {
                    const { categoryId, search } = params;
                    let queryString = [];
                    if (categoryId) queryString.push(`categoryId=${categoryId}`);
                    if (search) queryString.push(`search=${search}`);
                    return `/?${queryString.join('&')}`;
                }
                return '/';
            },
            providesTags: ['Blogs']
        }),
        fetchBlogById: builder.query({
            query: (id) => `/${id}`,
            providesTags: (result, error, id) => [{ type: 'Blogs', id }]
        }),
        addBlog: builder.mutation({
            query: (newBlog) => ({
                url: '/',
                method: 'POST',
                body: newBlog
            }),
            invalidatesTags: ['Blogs']
        }),
        updateBlog: builder.mutation({
            query: ({ id, data }) => ({
                url: `/${id}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['Blogs', (result, error, { id }) => ({ type: 'Blogs', id })]
        }),
        deleteBlog: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Blogs']
        })
    })
})

export const {
    useFetchAllBlogsQuery,
    useFetchBlogByIdQuery,
    useAddBlogMutation,
    useUpdateBlogMutation,
    useDeleteBlogMutation
} = blogsApi;

export default blogsApi;
