import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseUrl from "../../../util/baseUrl";

const baseQuery = fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/v1/colors`,
    credentials: 'include',
    prepareHeaders: (Headers) => {
        const token = localStorage.getItem('token');
        if (token) {
            Headers.set('Authorization', `Bearer ${token}`);
        }
        return Headers;
    }
})

const colorsApi = createApi({
    reducerPath: 'colorsApi',
    baseQuery,
    tagTypes: ['Colors'],
    endpoints: (builder) =>({
        fetchAllColors: builder.query({
            query: () => "/",
            providesTags: ["Colors"]
        }),
        fetchColorById: builder.query({
            query: (id) => `/${id}`,
            providesTags: (result, error, id) => [{ type: "Colors", id }],
        }),
        addColor: builder.mutation({
            query: (newColor) => ({
                url: `/`,
                method: "POST",
                body: newColor
            }),
            invalidatesTags: ["Colors"]
        }),
        updateColor: builder.mutation({
            query: ({id, ...rest}) => ({
                url: `/${id}`,
                method: "PUT",
                body: rest,
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: ["Colors"]
        }),
        deleteColor: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Colors"]
        })
    })
  })
  
  export const {useFetchAllColorsQuery, useFetchColorByIdQuery, useAddColorMutation, useUpdateColorMutation, useDeleteColorMutation} = colorsApi;
  export default colorsApi;