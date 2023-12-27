import React from "react";
import "./App.css";
import { User, QuanLyKhoaHoc } from "./app/pages";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./app/admin/layout";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/admin" element={<Layout />}>
            <Route path="user" element={<User />} />
            <Route path="quan-ly-khoa-hoc" element={<QuanLyKhoaHoc />} />
          </Route>
        </Routes>
        <Toaster
          toastOptions={{ duration: 1200, style: { minWidth: "250px" } }}
        />
      </BrowserRouter>
    </>
  );
}

export default App;
