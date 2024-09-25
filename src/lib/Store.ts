import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import loaderSlice from "./features/loader/Loader.slice";
import profileSlice from "./features/profile/Profile.slice";
import toastSlice from "./features/toast/Toast.slice";
import transactionSlice from "./features/transactions/Transactions.slice";

const appReducers = combineReducers({
  loader: loaderSlice,
  profile: profileSlice,
  toast: toastSlice,
  transaction: transactionSlice,
});

const store = configureStore({
  reducer: appReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["toast/handleOpenToast", "toast/setCloseToast"],
        ignoredPaths: ["toast.onClose", "payload.onClose"],
      },
    }),
});

export default store;

// Infer the type of Store
export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
