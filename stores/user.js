//pinia store for user state
//pinia stores act as global state, so can be accessed by any component
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    isMenuOverlay: false,
    isLoading: false,
    cart: [],
    checkout: [],
  }),
  persist: true,
});
