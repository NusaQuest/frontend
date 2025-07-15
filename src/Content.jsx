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
import QuestDetail from "./pages/QuestDetail";
import RedeemDetail from "./pages/RedeemDetail";
import History from "./pages/History";
import { NUSAQUEST_ADDRESS } from "./utils/env";
import { encodeFunctionData } from "viem";
import nusaquest_abi from "./build/nusaquest_abi.json";
import { config } from "./App";
import { writeContract } from "wagmi/actions";

const Content = () => {
  const [click, setClick] = useState(false);
  const { address } = useAccount();
  const navigate = useNavigate();

  const handleClick = () => {
    setClick(!click);
  };

  const handleCurrentPage = (newPage) => {
    setClick(false);
    navigate(`${newPage.destination}`);
  };

  useEffect(() => {}, [click]);

  useEffect(() => {
    const calldata = encodeFunctionData({
      abi: nusaquest_abi,
      functionName: "claimProposerReward",
      args: [address],
    });

    const targets = [NUSAQUEST_ADDRESS];
    const values = [0];
    const calldatas = [calldata];

    const coba = async () => {
      const simulation = await writeContract(config, {
        abi: nusaquest_abi,
        address: NUSAQUEST_ADDRESS,
        functionName: "initiate",
        args: [targets, values, calldatas, "hahaha"],
        account: address,
      });
      console.log(simulation);
    };
    // coba();
  }, []);

  return (
    <div className="relative px-4 bg-background min-h-screen w-screen overflow-y-auto flex flex-col lg:px-8">
      {click && (
        <div className="absolute inset-0 bg-black opacity-70 z-40"></div>
      )}

      {click && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <NavMenu action={handleCurrentPage} />
        </div>
      )}

      <div className="z-50 relative">
        <Navbar click={click} action={handleClick} address={address} />
      </div>

      <div className="flex-1 mb-12">
        <Routes>
          <Route path="/" element={<Home address={address} />} />
          <Route path="/register" element={<Register address={address} />} />
          <Route path="/quest" element={<Quest />} />
          <Route path="/redeem" element={<Redeem address={address} />} />
          <Route path="/impact" element={<Impact address={address} />} />
          <Route path="/history" element={<History address={address} />} />
          <Route
            path="/quest/:id"
            element={<QuestDetail address={address} />}
          />
          <Route
            path="/redeem/:id"
            element={<RedeemDetail address={address} />}
          />
        </Routes>
      </div>

      <Footer />
    </div>
  );
};

export default Content;
