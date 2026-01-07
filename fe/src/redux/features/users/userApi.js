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
        fetchAllUsers: builder.query({
            query: () => "/",
            providesTags: ["Users"]
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
            query: ({ email, ...rest }) => ({
                url: `/${email}`,
                method: "PUT",
                body: rest,
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
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Users"]
        })
    })
})

export const {
    useFetchUserByEmailQuery,
    useFetchAllUsersQuery,
    useAddUserMutation,
    useUpdateUserMutation,
    useUpdateUserRoleMutation,
    useDeleteUserMutation
} = usersApi;

export default usersApi;