import React from "react";
import "./App.css";
import { QuanLyNguoiDung, QuanLyKhoaHoc } from "./app/admin/pages";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./app/admin/layout";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/admin" element={<Layout />}>
            <Route path="quan-ly-nguoi-dung" element={<QuanLyNguoiDung />} />
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
