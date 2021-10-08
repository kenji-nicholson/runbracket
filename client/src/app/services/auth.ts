import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { logOut, refreshToken } from "../slices/authSlice";
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
  refresh_token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
  //rememberMe: boolean;
}

interface RefreshResponse {
  token: string;
}

export const baseAuthQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const refreshQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.refresh_token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseAuthQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshResult = await refreshQuery(
      { url: "token/refresh", method: "POST" },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      console.log(refreshResult.data);
      api.dispatch(refreshToken(refreshResult.data as RefreshResponse));

      // retry the initial query
      result = await baseAuthQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }
  return result;
};

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseAuthQuery,
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
