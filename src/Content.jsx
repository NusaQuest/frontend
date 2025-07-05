import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "./components/fixed/Navbar";
import Home from "./pages/Home";
import Footer from "./components/fixed/Footer";
import NavMenu from "./components/fixed/NavMenu";
import Register from "./pages/Register";
import { useAccount } from "wagmi";
import Quest from "./pages/Quest";
import Redeem from "./pages/Redeem";
import Impact from "./pages/Impact";

const Content = () => {
  const [click, setClick] = useState(false);
  const { address, isConnecting, isDisconnected } = useAccount();
  const navigate = useNavigate();

  const handleClick = () => {
    setClick(!click);
  };

  const handleCurrentPage = (newPage) => {
    setClick(false);
    navigate(`${newPage.destination}`);
  };

  useEffect(() => {}, [click, address]);

  return (
    <div className="relative px-4 bg-background min-h-screen w-screen overflow-y-auto flex flex-col">
      {click && (
        <div className="absolute inset-0 bg-black opacity-70 z-40"></div>
      )}

      {click && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <NavMenu action={handleCurrentPage} />
        </div>
      )}

      <div className="z-50 relative">
        <Navbar click={click} action={handleClick} />
      </div>

      <div className="flex-1 mb-12">
        <Routes>
          <Route path="/" element={<Home address={address} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/quest" element={<Quest />} />
          <Route path="/redeem" element={<Redeem />} />
          <Route path="/impact" element={<Impact />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
};

export default Content;
