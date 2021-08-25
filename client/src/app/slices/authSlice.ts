import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import type { User } from "../services/auth";

type AuthState = {
  user: User | null;
  token: string | null;
};

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, token: null } as AuthState,
  reducers: {
    setCredentials: (
      state,
      { payload: { user, token } }: PayloadAction<{ user: User; token: string }>
    ) => {
      state.user = user;
      state.token = token;
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setCredentials } = authSlice.actions;

export default authSlice.reducer;
