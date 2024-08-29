import { configureStore } from "@reduxjs/toolkit";
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

import { contactsReducer } from "./contactsSlice";
import { filtersReducer } from "./filtersSlice";
import { notificationReducer } from "./notificationSlice";

const persistContactsConfig = {
  key: "items",
  storage,
};

export const store = configureStore({
  reducer: {
    contacts: persistReducer(persistContactsConfig, contactsReducer),
    filters: filtersReducer,
    notification: notificationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
          "notification/notify",
        ],
        ignoredPaths: ["notification.message"],
      },
    }),
});

export const persistor = persistStore(store);
