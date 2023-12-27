import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { MODE } from "../../lib/redux/constants";
import { handleSignOut } from "../layout/helpers";
import { setActiveSection } from "../../lib/redux/slices/sidebarSlice";

export default function Sidebar() {
  const sidebarOpen = useSelector((state) => state.sidebar.isOpen);

  const sidebarMode = useSelector((state) => state.sidebar.mode);
  const activeSection = useSelector((state) => state.sidebar.activeSection);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  return (
    <aside
      className={`flex flex-col w-64 max-w-[256px] h-auto overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l transition-all px-5 py-8   ${
        sidebarMode === MODE.MOBILE
          ? sidebarOpen
            ? "absolute top-0 left-0 bottom-0 translate-x-0 z-[50]"
            : "absolute top-0 left-0 bottom-0 -translate-x-full z-[50]"
          : "relative "
      }`}>
      <a
        onClick={(e) => {
          e.preventDefault();
          navigateTo("user");
          dispatch(setActiveSection("USER"));
          sessionStorage.setItem("activeSection", JSON.stringify("USER"));
        }}>
        <img
          className="w-auto h-8"
          src="https://merakiui.com/images/logo.svg"
          alt=""
        />
      </a>
      <div className="flex flex-col justify-between flex-1 mt-6">
        <nav className="-mx-3 space-y-6 ">
          <div className="space-y-3 ">
            <a
              className={`flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg cursor-pointer  hover:bg-gray-100  hover:text-gray-700 ${
                activeSection === "USER" ? "bg-gray-100" : "bg-transparent"
              }`}
              onClick={(e) => {
                e.preventDefault();
                navigateTo("user");
                dispatch(setActiveSection("USER"));
                sessionStorage.setItem("activeSection", JSON.stringify("USER"));
              }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605"
                />
              </svg>
              <span className="mx-2 text-base font-medium">Users</span>
            </a>
            <a
              className={`flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg cursor-pointer  hover:bg-gray-100 hover:text-gray-700 ${
                activeSection === "COURSE" ? "bg-gray-100" : "bg-transparent"
              }`}
              onClick={(e) => {
                e.preventDefault();
                navigateTo("course");
                dispatch(setActiveSection("COURSE"));
                sessionStorage.setItem(
                  "activeSection",
                  JSON.stringify("COURSE")
                );
              }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6"
                />
              </svg>
              <span className="mx-2 text-base font-medium">Courses</span>
            </a>
            <a
              className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg cursor-pointer dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
              onClick={(e) => {
                e.preventDefault();
                navigateTo("/");
                //
                handleSignOut();
              }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6"
                />
              </svg>
              <span className="mx-2 text-base font-medium">Log out</span>
            </a>
          </div>
        </nav>
      </div>

      {/* <Bars4Icon className="absolute top-0 z-50 w-10 h-10 -right-10"></Bars4Icon> */}
    </aside>
  );
}
