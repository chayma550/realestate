import { create } from "zustand";
import apiRequest from "./apiRequest";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";

const{currentUser}=useContext(AuthContext)

export const useNotificationStore = create((set) => ({
  number: 0,
  fetch: async () => {
    const res = await apiRequest("/users/notification",{
      headers: {
        Authorization: `Bearer ${currentUser.accessToken}` 
      }});
    set({ number: res.data });
  },
  decrease: () => {
    set((prev) => ({ number: prev.number - 1 }));
  },
  reset: () => {
    set({ number: 0 });
  },
}));