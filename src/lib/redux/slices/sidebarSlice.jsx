import { createSlice } from "@reduxjs/toolkit";
import { MODE } from "../constants";
const sidebarMode = JSON.parse(sessionStorage.getItem("screenMode"));
const section = JSON.parse(sessionStorage.getItem("activeSection"));
const initialState = {
  isOpen: false,
  mode: sidebarMode || MODE.DESKTOP,
  activeSection: section || "USER",
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    openSidebar: (state) => {
      state.isOpen = true;
    },
    closeSidebar: (state) => {
      state.isOpen = false;
    },
    toggleSidebar: (state) => {
      state.isOpen = !state.isOpen;
    },

    setActiveSection: (state, action) => {
      state.activeSection = action.payload;
    },

    setMode: (state, action) => {
      state.mode = action.payload;
    },
  },
});

export const {
  openSidebar,
  closeSidebar,
  setMode,
  toggleSidebar,
  setActiveSection,
} = sidebarSlice.actions;

export default sidebarSlice.reducer;
