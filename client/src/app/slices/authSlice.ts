import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { CurrentUser, User } from "../services/auth";

type AuthState = {
  user: CurrentUser | null;
  token: string | null;
};

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, token: null } as AuthState,
  reducers: {
    setCredentials: (
      state,
      {
        payload: { user, token },
      }: PayloadAction<{ user: CurrentUser; token: string }>
    ) => {
      state.user = user;
      state.token = token;
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
    },
    setUser: (
      state,
      { payload: { user } }: PayloadAction<{ user: CurrentUser }>
    ) => {
      state.user = user;
      state.token = state.token;
    },
  },
});

export const { setCredentials, logOut, setUser } = authSlice.actions;

export default authSlice.reducer;
