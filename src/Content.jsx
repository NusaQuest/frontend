import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/fixed/Navbar";
import Home from "./pages/Home";
import Footer from "./components/fixed/Footer";

const Content = () => {
  const [click, setClick] = useState(false);

  const handleClick = () => {
    setClick(!click);
  };

  useEffect(() => {}, [click]);

  return (
    <div className="px-4 bg-background min-h-screen w-screen overflow-y-auto flex flex-col">
      <Navbar click={click} action={handleClick} />
      <div className="flex-1 mb-12">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default Content;
