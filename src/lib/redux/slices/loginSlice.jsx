import { createSlice } from "@reduxjs/toolkit";
// import { STATUS } from "../../constants";
const data = JSON.parse(localStorage.getItem("loginAccount"));
const initialState = {
  isLogin: data?.isLogin ? true : false,
};

const LoginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setAccount: (state, action) => {
      state.account = action.payload;
    },
    setLogin: (state, action) => {
      state.isLogin = action.payload;
    },
    saveAccount: (state, action) => {
      state.isRemember = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const { setAccount, setLogin, saveAccount, setStatus } =
  LoginSlice.actions;

export default LoginSlice.reducer;
