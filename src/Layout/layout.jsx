import { useMediaQuery } from "react-responsive";
import DesktopLayout from "./desktopLayout.jsx";
import MobileLayout from "./mobileLayout.jsx";
import Login from "../components/login.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setMode } from "../../../lib/redux/slices/sidebarSlice.jsx";
import { MODE } from "../../../lib/constants/constants.jsx";
import { handleAutoLogin, handleLogin } from "./helpers.jsx";

const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 777 });
  return isDesktop ? children : null;
};

const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 776.98 });
  return isMobile ? children : null;
};

export default function Layout() {
  const isLogin = useSelector((state) => state.login.isLogin);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("loginAccount"));

    if (data && data.isLogin) {
      const account = { taiKhoan: data.taiKhoan, matKhau: data.matKhau };
      handleAutoLogin(account);
    }
  });
  return isLogin ? (
    <>
      <Desktop>
        <DesktopLayout></DesktopLayout>
      </Desktop>
      <Mobile>
        <MobileLayout></MobileLayout>
      </Mobile>
    </>
  ) : (
    <Login
      action={(account, isRemember) => {
        handleLogin(account, isRemember);
      }}></Login>
  );
}
