import React, { useEffect } from "react";
import { Sidebar } from "../components";
import { Outlet } from "react-router";
import { setMode } from "../../../lib/redux/slices/sidebarSlice";
import { useDispatch } from "react-redux";
import { MODE } from "../../../lib/constants";

export default function DesktopLayout() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setMode(MODE.DESKTOP));
    sessionStorage.setItem("screenMode", JSON.stringify(MODE.DESKTOP));
  });

  return (
    <div className="relative">
      <div className={`flex flex-row`}>
        <Sidebar></Sidebar>
        <div className="flex-1 bg-[#f3f4f6] h-screen overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
