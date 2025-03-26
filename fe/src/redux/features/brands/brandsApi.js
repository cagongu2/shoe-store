import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseUrl from "../../../util/baseUrl";

const baseQuery = fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/v1/brands`,
    credentials: 'include',
    prepareHeaders: (Headers) => {
        const token = localStorage.getItem('token');
        if (token) {
            Headers.set('Authorization', `Bearer ${token}`);
        }
        return Headers;
    }
})

const brandsApi = createApi({
    reducerPath: 'brandsApi',
    baseQuery,
    tagTypes: ['Brands'],
    endpoints: (builder) =>({
        fetchAllBrands: builder.query({
            query: () => "/",
            providesTags: ["Brands"]
        }),
        fetchBrandById: builder.query({
            query: (id) => `/${id}`,
            providesTags: (result, error, id) => [{ type: "Brands", id }],
        }),
        addBrand: builder.mutation({
            query: (newBrand) => ({
                url: `/`,
                method: "POST",
                body: newBrand
            }),
            invalidatesTags: ["Brands"]
        }),
        updateBrand: builder.mutation({
            query: ({id, ...rest}) => ({
                url: `/${id}`,
                method: "PUT",
                body: rest,
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: ["Brands"]
        }),
        deleteBrand: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Brands"]
        })
    })
  })
  
  export const {useFetchAllBrandsQuery, useFetchBrandByIdQuery, useAddBrandMutation, useUpdateBrandMutation, useDeleteBrandMutation} = brandsApi;
  export default brandsApi;