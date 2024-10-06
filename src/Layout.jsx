import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./components";
import { Toaster } from "react-hot-toast";

function Layout() {
  return (
    <div>
      <Toaster />
      <Header />
      <Outlet />
    </div>
  );
}

export default Layout;
