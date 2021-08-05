import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./services/auth";
import authReducer from "./slices/authSlice";
import { registerApi } from "./services/register";

export const store = configureStore({
  reducer: {
    [registerApi.reducerPath]: registerApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(registerApi.middleware, authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
