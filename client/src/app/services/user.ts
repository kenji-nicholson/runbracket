import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import {
  baseQueryWithReauth,
  CurrentUser,
  LoginRequest,
  User,
  UserResponse,
} from "./auth";
import PaginatedData, { PaginationArguments } from "./pagination";

export type Users = User[];

export interface RegisterResponse {
  token: string;
}

export interface RegisterRequest {
  first_name: string;
  last_name: string;
  display_name: string;
  email: string;
  password: string;
  //rememberMe: boolean;
}

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User", "CurrentUser"],
  endpoints: (build) => ({
    getUsers: build.query<PaginatedData<User>, PaginationArguments>({
      query: (arg) => {
        return {
          url: "users/",
          params: { ...arg },
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.items.map(({ user_id }) => ({
                type: "User" as const,
                user_id,
              })),
              { type: "User", user_id: "LIST" },
            ]
          : [{ type: "User", user_id: "LIST" }],
    }),
    addUser: build.mutation<RegisterResponse, RegisterRequest>({
      query: (registerRequest) => ({
        url: "users/",
        method: "POST",
        body: registerRequest,
      }),
      invalidatesTags: ["User"],
    }),
    getUser: build.query<User, string>({
      query: (id) => `users/${id}`,
      providesTags: (result, error, user_id) => [{ type: "User", user_id }],
    }),
    updateUser: build.mutation<
      CurrentUser,
      Pick<CurrentUser, "user_id"> & Partial<CurrentUser>
    >({
      query: ({ user_id, ...patch }) => ({
        url: `users/${user_id}`,
        method: "PUT",
        body: patch,
      }),
      async onQueryStarted(
        { user_id, ...patch },
        { dispatch, queryFulfilled }
      ) {
        const patchResult = dispatch(
          userApi.util.updateQueryData(
            "getUser",
            user_id.toString(),
            (draft) => {
              Object.assign(draft, patch);
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: (result, error, { user_id }) => [
        { type: "User", user_id },
      ],
    }),
    deleteUser: build.mutation<{ success: boolean; user_id: number }, number>({
      query(user_id) {
        return {
          url: `users/${user_id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (result, error, user_id) => [{ type: "User", user_id }],
    }),
  }),
});

export const {
  useAddUserMutation,
  useDeleteUserMutation,
  useGetUserQuery,
  useGetUsersQuery,
  useUpdateUserMutation,
} = userApi;
