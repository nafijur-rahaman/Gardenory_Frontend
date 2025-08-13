import React from "react";
import { Outlet } from "react-router"; 
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-grow pt-18">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default MainLayout;
