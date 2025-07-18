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
import { getIdentity } from "./server/identity";
import Swal from "sweetalert2";

const Content = () => {
  const [click, setClick] = useState(false);
  const { address } = useAccount();
  const [registered, setRegistered] = useState(false);

  const navigate = useNavigate();

  const handleClick = () => {
    setClick(!click);
  };

  const handleCurrentPage = (newPage) => {
    setClick(false);
    navigate(`${newPage.destination}`);
  };

  const fetchIdentity = async () => {
    if (!address) return;

    const res = await getIdentity(address);
    if (res.status === "success") {
      setRegistered(true);
    } else {
      setRegistered(false);

      await Swal.fire({
        title: "KTP Verification Required",
        text: "You need to verify your KTP before accessing this feature. Please complete the verification first.",
        icon: "warning",
        confirmButtonText: "Verify Now",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate(`/register`);
        }
      });
    }
  };

  useEffect(() => {}, [click]);

  useEffect(() => {
    fetchIdentity();
  }, [address]);

  return (
    <div className="relative px-4 bg-background min-h-screen w-screen overflow-y-auto flex flex-col lg:px-8">
      {click && (
        <div className="absolute inset-0 bg-black opacity-70 z-40"></div>
      )}

      {click && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <NavMenu action={handleCurrentPage} registered={registered} />
        </div>
      )}

      <div className="z-50 relative">
        <Navbar
          click={click}
          action={handleClick}
          address={address}
          registered={registered}
        />
      </div>

      <div className="flex-1 mb-12">
        <Routes>
          <Route
            path="/"
            element={<Home address={address} registered={registered} />}
          />
          <Route path="/register" element={<Register address={address} />} />
          <Route path="/quest" element={<Quest />} />
          <Route path="/redeem" element={<Redeem address={address} />} />
          <Route
            path="/impact"
            element={<Impact address={address} registered={registered} />}
          />
          <Route path="/history" element={<History address={address} />} />
          <Route
            path="/quest/:id"
            element={<QuestDetail address={address} registered={registered} />}
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
