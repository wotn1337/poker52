import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api";
import usersReducer from "./users";

export const makeStore = () => {
  return configureStore({
    reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer,
      users: usersReducer,
    },
    middleware: (getDefaltMiddleware) =>
      getDefaltMiddleware().concat(apiSlice.middleware),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
