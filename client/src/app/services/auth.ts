import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

export interface User {
  first_name: string;
  last_name: string;
}

export interface UserResponse {
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
  //rememberMe: boolean;
}

export const authApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://reqres.in/api",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("authentication", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<UserResponse, LoginRequest>({
      query: (credentials) => ({
        url: "login",
        method: "POST",
        body: credentials,
      }),
    }),
    protected: builder.mutation<{ message: string }, void>({
      query: () => "protected",
    }),
  }),
});

export const { useLoginMutation, useProtectedMutation } = authApi;
