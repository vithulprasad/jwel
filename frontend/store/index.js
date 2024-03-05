// store/index.js
import { defineStore } from "pinia";

export const useStore = defineStore("store", {
  state: () => ({
    partyName: "",
    partyTagline: "",
  }),
  actions: {
    setPartyName(name) {
      this.partyName = name;
    },
    setPartyTagline(tagline) {
      this.partyTagline = tagline;
    },
  },
});
