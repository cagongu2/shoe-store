import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseUrl from "../../../util/baseUrl";

const baseQuery = fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/v1/users`,
    credentials: 'include',
    prepareHeaders: (Headers) => {
        const token = localStorage.getItem('token');
        if (token) {
            Headers.set('Authorization', `Bearer ${token}`);
        }
        return Headers;
    }
})

const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery,
    tagTypes: ['Users'],
    endpoints: (builder) => ({
        fetchUserByEmail: builder.query({
            query: (email) => `/${email}`,
            providesTags: (result, error, email) => [{ type: "Users", id: email }],
        }),
        addUser: builder.mutation({
            query: (newUser) => ({
                url: `/`,
                method: "POST",
                body: newUser
            }),
            invalidatesTags: ["Users"]
        }),
        updateUser: builder.mutation({
            query: ({ email, username, photo }) => ({
                url: `/${email}`,
                method: "PUT",
                body: { username, photo },
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: ["Users"]
        }),
        updateUserRole: builder.mutation({
            query: ({ email, role }) => ({
                url: `/${email}/role`,
                method: "PUT",
                body: { role },
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: ["Users"]
        })

    })
})

export const {
    useFetchUserByEmailQuery,
    useAddUserMutation,
    useUpdateUserMutation,
    useUpdateUserRoleMutation } = usersApi;
export default usersApi;