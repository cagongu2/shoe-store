import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseUrl from "../../../util/baseUrl";

const baseQuery = fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/v1/sizes`,
    credentials: 'include',
    prepareHeaders: (Headers) => {
        const token = localStorage.getItem('token');
        if (token) {
            Headers.set('Authorization', `Bearer ${token}`);
        }
        return Headers;
    }
})

const sizesApi = createApi({
    reducerPath: 'sizesApi',
    baseQuery,
    tagTypes: ['Sizes'],
    endpoints: (builder) =>({
        fetchAllSizes: builder.query({
            query: () => "/",
            providesTags: ["Sizes"]
        }),
        fetchSizeById: builder.query({
            query: (id) => `/${id}`,
            providesTags: (result, error, id) => [{ type: "Sizes", id }],
        }),
        addSize: builder.mutation({
            query: (newSize) => ({
                url: `/`,
                method: "POST",
                body: newSize
            }),
            invalidatesTags: ["Sizes"]
        }),
        updateSize: builder.mutation({
            query: ({id, ...rest}) => ({
                url: `/${id}`,
                method: "PUT",
                body: rest,
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: ["Sizes"]
        }),
        deleteSize: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Sizes"]
        })
    })
  })
  
  export const {useFetchAllSizesQuery, useFetchSizeByIdQuery, useAddSizeMutation, useUpdateSizeMutation, useDeleteSizeMutation} = sizesApi;
  export default sizesApi;