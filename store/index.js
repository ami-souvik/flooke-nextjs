/**
 * Company              : Cloudkaptan Consultancy Services Pvt. Ltd.
 * File Name            : index.js
 * Created Date         : 02/01/2023
 * Developed By         : SOUVIK DEY
 * Description          : This is a store for all the reducers
 * Last Modified Date   : 02/01/2023
 * Last Modified By     : WASIM IQBAL
 */

import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import localStorage from 'redux-persist/lib/storage'
import { createWhitelistFilter } from "redux-persist-transform-filter";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import sessionReducer from "./slice/sessionSlice";
import uiReducer from "./slice/uiSlice";

// Combine reducers
const reducers = combineReducers({
  session: sessionReducer,
  ui: uiReducer
});

// Persist config
const persistConf = {
  key: "@session",
  storage: localStorage,
  whitelist: ["session"],
  transforms: [
    createWhitelistFilter("session", [
      "authToken"
    ]),
  ],
};

// Persisted reducer craete for session
const persistedReducer = persistReducer(persistConf, reducers);

// Store config
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Persited store
export const persistor = persistStore(store);
export default store;
