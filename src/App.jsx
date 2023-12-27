import React, { useEffect } from "react";
import "./App.css";
// import { UserPage, CoursePage } from "./app/pages";
import UserPage from "./app/pages/userPage";
import CoursePage from "./app/pages/coursePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./app/layout";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/admin" element={<Layout />}>
            <Route path="user" element={<UserPage />} />
            <Route path="course" element={<CoursePage />} />
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
