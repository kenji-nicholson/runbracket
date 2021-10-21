import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authApi } from "./services/auth";
import authReducer from "./slices/authSlice";
import tournamentReducer from "./slices/tournamentSlice";
import { userApi } from "./services/user";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { tournamentApi } from "./services/tournament";

const rootReducer = combineReducers({
  [userApi.reducerPath]: userApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [tournamentApi.reducerPath]: tournamentApi.reducer,
  auth: authReducer,
  tournament: tournamentReducer,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: [
    userApi.reducerPath,
    authApi.reducerPath,
    tournamentApi.reducerPath,
  ],
  whitelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(userApi.middleware, authApi.middleware, tournamentApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
