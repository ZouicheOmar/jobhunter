
import { configureStore } from "@reduxjs/toolkit";
import candidsReducer from "@/lib/features/candids/candidsSlice"
import { candidsApi } from "./candidsApi";
import { setupListeners } from "@reduxjs/toolkit/query";

export const makeStore = () => {
  return configureStore({
    reducer: {
      candids: candidsReducer
    },
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([candidsApi.middleware]),
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = ReturnType<AppStore['dispatch']>; 
