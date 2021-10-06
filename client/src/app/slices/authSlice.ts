import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { CurrentUser, User } from "../services/auth";

type AuthState = {
  user: CurrentUser | null;
  token: string | null;
  refresh_token: string | null;
};

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, token: null } as AuthState,
  reducers: {
    setCredentials: (
      state,
      {
        payload: { user, token, refresh_token },
      }: PayloadAction<{
        user: CurrentUser;
        token: string;
        refresh_token: string;
      }>
    ) => {
      state.user = user;
      state.token = token;
      state.refresh_token = refresh_token;
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
      state.refresh_token = null;
    },
    setUser: (
      state,
      { payload: { user } }: PayloadAction<{ user: CurrentUser }>
    ) => {
      state.user = user;
    },
    refreshToken: (
      state,
      { payload: { token } }: PayloadAction<{ token: string }>
    ) => {
      state.token = token;
    },
  },
});

export const { setCredentials, logOut, setUser, refreshToken } =
  authSlice.actions;

export default authSlice.reducer;
