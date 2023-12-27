import { configureStore } from "@reduxjs/toolkit";
import {
  sidebarSlice,
  courseManagementSlice,
  userManagementSlice,
  loginSlice,
} from "./slices";

const store = configureStore({
  reducer: {
    sidebar: sidebarSlice,
    courseManagement: courseManagementSlice,
    userManagement: userManagementSlice,
    login: loginSlice,
  },
});

export default store;
