import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface User {
  first_name: string;
  last_name: string;
}

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

export const registerApi = createApi({
  reducerPath: "registerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
  }),
  endpoints: (builder) => ({
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (registerRequest) => ({
        url: "users/",
        method: "POST",
        body: registerRequest,
      }),
    }),
  }),
});

export const { useRegisterMutation } = registerApi;
