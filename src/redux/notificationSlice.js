import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./initialState";

export const selectNotify = state => state.notification;

const notificationSlice = createSlice({
  name: "notification",
  initialState: initialState.notification,
  reducers: {
    notify: {
      reducer(_, action) {
        return { ...action.payload };
      },
      prepare({ message, toastType = "info", toastId = "" }) {
        return {
          payload: {
            message,
            toastType,
            toastId,
          },
        };
      },
    },
  },
});

export const { notify } = notificationSlice.actions;
export const notificationReducer = notificationSlice.reducer;