import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

export interface User {
  first_name: string;
  last_name: string;
}

export interface RegisterResponse {
  token: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  //rememberMe: boolean;
}

export const registerApi = createApi({
  reducerPath: "registerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https:/localhost:5000/api",
  }),
  endpoints: (builder) => ({
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (registerRequest) => ({
        url: "register",
        method: "POST",
        body: registerRequest,
      }),
    }),
  }),
});

export const { useRegisterMutation } = registerApi;
