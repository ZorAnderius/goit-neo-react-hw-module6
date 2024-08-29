import { initContact } from "../data/initContact";

export const initialState = {
  contacts: {
    items: initContact,
  },
  filters: {
    name: "",
  },
  notification: {
    message: "",
    toastType: "",
    toastId: "",
  },
};