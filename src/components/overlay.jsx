import React from "react";
import { closeSidebar } from "../../../lib/redux/slices/sidebarSlice";
import { useDispatch, useSelector } from "react-redux";

export default function overlay() {
  const sidebarOpen = useSelector((state) => state.sidebar.isOpen);
  const dispatch = useDispatch();
  return (
    <div
      onClick={() => {
        dispatch(closeSidebar());
      }}
      className={`${
        sidebarOpen ? "block" : "hidden"
      } absolute top-0 right-0 bottom-0 w-screen h-auto bg-black opacity-40 z-[40] transition-all`}></div>
  );
}
