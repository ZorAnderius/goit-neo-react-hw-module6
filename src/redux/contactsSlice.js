import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./initialState";

const contactsSlice = createSlice({
  name: "contacts",
  initialState: initialState.contacts,
  reducers: {
    addContact: (state, action) => {
        state.items.push(action.payload);
    },
    deleteContact: (state, action) => {
      state.items = state.items.filter(({ id }) => id !== action.payload.id);
    },
  },
});

export const { addContact, deleteContact } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
export const selectContacts = (state) => state.contacts.items;
