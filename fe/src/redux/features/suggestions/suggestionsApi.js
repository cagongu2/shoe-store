import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import getBaseUrl from '../../../util/baseUrl';

export const suggestionsApi = createApi({
    reducerPath: 'suggestionsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseUrl()}/api/v1/suggestions`,
    }),
    endpoints: (builder) => ({
        getProductRecommendations: builder.query({
            query: ({ type, productId, email }) => ({
                url: '/products',
                params: { type, productId, email },
            }),
        }),
        getBlogRecommendations: builder.query({
            query: ({ type, email }) => ({
                url: '/blogs',
                params: { type, email },
            }),
        }),
    }),
});

export const { useGetProductRecommendationsQuery, useGetBlogRecommendationsQuery } = suggestionsApi;
