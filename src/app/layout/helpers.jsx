import { STATUS } from "../../../lib/constants";

import store from "../../../lib/redux/store";

import {
  saveAccount,
  setAccount,
  setLogin,
  setStatus,
} from "../../../lib/redux/slices/loginSlice";
import { userService } from "../../../api/service";
import toast from "react-hot-toast";

export const handleLogin = (account, isRemember) => {
  const toastId = toast.loading("Loading...");
  userService
    .login(account)
    .then((res) => {
      toast.success("Login successfully!", {
        id: toastId,
      });
      setTimeout(() => {
        // store.dispatch(setAccount(account));
        if (isRemember) {
          const accountInfo = {
            ...res.data,
            matKhau: account.matKhau,
            remember: isRemember,
            isLogin: true,
          };
          localStorage.setItem("loginAccount", JSON.stringify(accountInfo));
          localStorage.setItem(
            "token",
            JSON.stringify(accountInfo.accessToken)
          );
        } else {
          const accountInfo = {
            ...res.data,
            matKhau: account.matKhau,
            isLogin: true,
          };
          localStorage.setItem("loginAccount", JSON.stringify(accountInfo));
          localStorage.setItem(
            "token",
            JSON.stringify(accountInfo.accessToken)
          );
        }

        store.dispatch(setLogin(true));
      }, 1500);
    })
    .catch((err) => {
      console.log(err);
      store.dispatch(setLogin(false));
      toast.error("Login Failed", {
        id: toastId,
      });
    });
};

export const handleAutoLogin = (account) => {
  userService
    .login(account)
    .then((res) => {
      setTimeout(() => {
        store.dispatch(setLogin(true));
      }, 1500);
    })
    .catch((err) => {
      console.log(err);
      store.dispatch(setLogin(false));
    });
};

export const handleSignOut = () => {
  const data = JSON.parse(localStorage.getItem("loginAccount"));
  const modifiedData = {
    ...data,
    isLogin: false,
  };
  localStorage.setItem("loginAccount", JSON.stringify(modifiedData));
  store.dispatch(setLogin(false));
};
