import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authApi } from "./services/auth";
import authReducer from "./slices/authSlice";
import { registerApi } from "./services/register";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER,} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const rootReducer = combineReducers({
  [registerApi.reducerPath]: registerApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  auth: authReducer,
})

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: [registerApi.reducerPath, authApi.reducerPath],
  whitelist: ['auth']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }).concat(registerApi.middleware, authApi.middleware),
});

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
