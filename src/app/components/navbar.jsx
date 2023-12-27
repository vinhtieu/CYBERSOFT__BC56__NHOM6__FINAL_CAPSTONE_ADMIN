import React from "react";
import { Bars4Icon } from "@heroicons/react/24/solid";
import { toggleSidebar } from "../../lib/redux/slices/sidebarSlice";
import { useDispatch, useSelector } from "react-redux";
import { MODE } from "../../lib/redux/constants";

export default function Navbar() {
  const sidebarMode = useSelector((state) => state.sidebar.mode);
  const dispatch = useDispatch();
  return (
    <div
      className={`max-[389.98px]:h-16 h-20 px-4 py-2
    ${sidebarMode === MODE.MOBILE ? "flex items-center" : "hidden"}`}>
      <img
        className="w-auto max-[389.98px]:h-6 h-8 inline-block"
        src="https://merakiui.com/images/logo.svg"
        alt=""
      />
      <Bars4Icon
        className="w-auto max-[389.98px]:h-12 h-14 inline-block ml-auto cursor-pointer p-2"
        onClick={() => {
          dispatch(toggleSidebar());
        }}
      />
    </div>
  );
}
