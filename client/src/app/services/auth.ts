import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

export interface User {
  display_name: string;
  first_name: string;
  last_name: string;
  user_id: number;
}

export interface CurrentUser {
  display_name: string;
  first_name: string;
  last_name: string;
  user_id: number;
  dark_mode: boolean;
  email: string;
}

export interface UserResponse {
  user: CurrentUser;
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
  //rememberMe: boolean;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
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
  }),
});

export const { useLoginMutation } = authApi;
